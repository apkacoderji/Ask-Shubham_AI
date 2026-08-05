import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Message } from "@/components/Message";
import { SuggestedPrompts } from "@/components/SuggestedPrompts";
import type { ChatMessage } from "@/types/chat";

interface ChatWindowProps {
  messages: ChatMessage[];
  onSelectPrompt: (prompt: string) => void;
  onRetry: () => void;
}

export function ChatWindow({ messages, onSelectPrompt, onRetry }: ChatWindowProps) {
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          <span className="text-[11px] font-medium uppercase tracking-wider text-ink-soft">
            Shubham's AI Hiring Assistant
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="max-w-lg font-serif text-[32px] leading-[1.15] text-ink sm:text-[40px]"
        >
          What would you like to know about{" "}
          <span className="relative inline-block whitespace-nowrap">
            Shubham
            <svg
              className="absolute -bottom-1 left-0 h-2.5 w-full text-accent/70"
              viewBox="0 0 120 10"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path
                d="M2 6.5C24 2 78 1.5 118 5"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
              />
            </svg>
          </span>
          ?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-4 max-w-sm text-[14.5px] text-ink-soft"
        >
          Ask about skills, projects, education or experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-8 max-w-xl"
        >
          <SuggestedPrompts onSelect={onSelectPrompt} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6" role="log" aria-live="polite">
      <div className="mx-auto flex max-w-chat flex-col gap-4">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            onRetry={message.status === "error" ? onRetry : undefined}
          />
        ))}
        <div ref={scrollAnchorRef} />
      </div>
    </div>
  );
}
