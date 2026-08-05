import axios from "axios";
import type { ChatRequestPayload } from "@/types/chat";

const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "http://localhost:8000";

const CHAT_ENDPOINT = `${API_BASE_URL}/chat`;

/**
 * Shared axios instance, kept for any future non-streaming endpoints
 * (health checks, resume metadata, analytics, etc). The /chat call itself
 * uses `fetch` directly below because streaming a response body chunk by
 * chunk in the browser is not something axios supports well.
 */
export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface StreamChatOptions {
  /** Called with each new text chunk as it arrives from the server. */
  onChunk: (chunk: string) => void;
  /** Allows the caller to cancel an in-flight request (e.g. New Chat, unmount). */
  signal?: AbortSignal;
}

/**
 * Sends a message to POST /chat and streams the plain-text response body
 * back to the caller chunk by chunk via `onChunk`. Returns the fully
 * assembled reply once the stream ends.
 *
 * The backend currently streams raw text (not SSE/JSON events), so we read
 * the response body directly as a ReadableStream and decode it as UTF-8.
 */
export async function streamChatMessage(
  message: string,
  { onChunk, signal }: StreamChatOptions
): Promise<string> {
  const payload: ChatRequestPayload = { message };

  let response: Response;
  try {
    response = await fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal,
    });
  } catch {
    throw new ApiError(
      "Couldn't reach the assistant. Check that the backend is running and reachable."
    );
  }

  if (!response.ok) {
    throw new ApiError(
      `The assistant responded with an error (${response.status}).`,
      response.status
    );
  }

  if (!response.body) {
    // Fallback for environments without a readable stream body: read the
    // whole payload at once so the UI still works, just without streaming.
    const text = await response.text();
    onChunk(text);
    return text;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    if (chunk) {
      fullText += chunk;
      onChunk(chunk);
    }
  }

  return fullText;
}
