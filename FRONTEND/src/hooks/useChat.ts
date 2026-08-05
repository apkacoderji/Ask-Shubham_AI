import { useCallback, useRef, useState } from "react";
import { ApiError, streamChatMessage } from "@/services/api";
import type { ChatMessage } from "@/types/chat";
import { generateId } from "@/utils/id";

interface UseChatReturn {
  messages: ChatMessage[];
  isGenerating: boolean;
  errorMessageId: string | null;
  sendMessage: (text: string) => void;
  retryLastMessage: () => void;
  startNewChat: () => void;
}

/**
 * Owns the full lifecycle of a conversation: sending a user message,
 * streaming the assistant's reply token-by-token, surfacing errors with
 * retry, and resetting back to the welcome state.
 */
export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessageId, setErrorMessageId] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const lastUserMessageRef = useRef<string | null>(null);

  const runAssistantTurn = useCallback((userText: string) => {
    lastUserMessageRef.current = userText;
    setErrorMessageId(null);

    const assistantId = generateId();
    const assistantMessage: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
      status: "pending",
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsGenerating(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    streamChatMessage(userText, {
      signal: controller.signal,
      onChunk: (chunk) => {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  content: message.content + chunk,
                  status: "streaming",
                }
              : message
          )
        );
      },
    })
      .then(() => {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId ? { ...message, status: "complete" } : message
          )
        );
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;

        const description =
          error instanceof ApiError
            ? error.message
            : "Something went wrong while generating a response.";

        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId
              ? { ...message, content: description, status: "error" }
              : message
          )
        );
        setErrorMessageId(assistantId);
      })
      .finally(() => {
        setIsGenerating(false);
        abortControllerRef.current = null;
      });
  }, []);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isGenerating) return;

      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        content: trimmed,
        status: "complete",
        createdAt: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      runAssistantTurn(trimmed);
    },
    [isGenerating, runAssistantTurn]
  );

  const retryLastMessage = useCallback(() => {
    if (!lastUserMessageRef.current || isGenerating) return;

    // Drop the failed assistant message before retrying.
    setMessages((prev) => {
      const errored = [...prev].reverse().find((m) => m.status === "error");
      if (!errored) return prev;
      return prev.filter((m) => m.id !== errored.id);
    });

    runAssistantTurn(lastUserMessageRef.current);
  }, [isGenerating, runAssistantTurn]);

  const startNewChat = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    lastUserMessageRef.current = null;
    setMessages([]);
    setIsGenerating(false);
    setErrorMessageId(null);
  }, []);

  return {
    messages,
    isGenerating,
    errorMessageId,
    sendMessage,
    retryLastMessage,
    startNewChat,
  };
}
