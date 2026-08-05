import { motion } from "framer-motion";
import { AlertCircle, RotateCcw } from "lucide-react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TypingIndicator } from "@/components/TypingIndicator";
import type { ChatMessage } from "@/types/chat";
import { cn } from "@/utils/cn";

interface MessageProps {
  message: ChatMessage;
  onRetry?: () => void;
}

export function Message({ message, onRetry }: MessageProps) {
  const isUser = message.role === "user";
  const isError = message.status === "error";
  const isPending = message.status === "pending";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3",
          isUser
            ? "bg-ink text-canvas rounded-tr-sm"
            : isError
              ? "bg-surface border border-accent/30 rounded-tl-sm"
              : "bg-surface border border-border rounded-tl-sm"
        )}
      >
        {isUser ? (
          <p className="text-[15px] sm:text-base leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        ) : isPending ? (
          <TypingIndicator />
        ) : isError ? (
          <div className="space-y-2.5">
            <div className="flex items-start gap-2 text-accent">
              <AlertCircle size={17} className="mt-0.5 shrink-0" />
              <p className="text-[14.5px] leading-relaxed text-ink">{message.content}</p>
            </div>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-accent hover:text-accent-soft transition-colors focus-visible:outline-2 focus-visible:outline-accent rounded-md px-1 -mx-1"
              >
                <RotateCcw size={13} />
                Try again
              </button>
            )}
          </div>
        ) : (
          <MarkdownRenderer content={message.content} />
        )}
      </div>
    </motion.div>
  );
}
