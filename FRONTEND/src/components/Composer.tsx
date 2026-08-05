import { ArrowUp } from "lucide-react";
import { useRef, type KeyboardEvent } from "react";
import { cn } from "@/utils/cn";

interface ComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

const MAX_TEXTAREA_HEIGHT = 200;

export function Composer({ value, onChange, onSubmit, disabled }: ComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!disabled && value.trim()) {
        onSubmit();
      }
    }
  };

  const handleSubmitClick = () => {
    if (!disabled && value.trim()) {
      onSubmit();
    }
  };

  return (
    <div className="flex items-end gap-2 rounded-2xl border border-border bg-surface px-3 py-2.5 shadow-[0_1px_2px_rgba(43,42,40,0.04)] focus-within:border-accent/40 transition-colors">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          autoResize();
        }}
        onKeyDown={handleKeyDown}
        placeholder="Ask about Shubham's skills, projects or experience..."
        disabled={disabled}
        rows={1}
        aria-label="Message"
        className="max-h-[200px] flex-1 resize-none bg-transparent px-1.5 py-1.5 text-[15px] leading-relaxed text-ink placeholder:text-ink-soft/70 outline-none disabled:opacity-60"
      />
      <button
        type="button"
        onClick={handleSubmitClick}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-accent",
          disabled || !value.trim()
            ? "bg-border text-ink-soft/60 cursor-not-allowed"
            : "bg-accent text-canvas hover:bg-accent-soft"
        )}
      >
        <ArrowUp size={17} strokeWidth={2.25} />
      </button>
    </div>
  );
}
