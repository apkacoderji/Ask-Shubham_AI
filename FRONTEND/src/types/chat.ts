export type MessageRole = "user" | "assistant";

export type MessageStatus = "pending" | "streaming" | "complete" | "error";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  status: MessageStatus;
  createdAt: number;
}

export interface ChatRequestPayload {
  message: string;
}

export interface SuggestedPrompt {
  id: string;
  label: string;
  prompt: string;
}
