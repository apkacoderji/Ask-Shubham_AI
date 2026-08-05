import type { SuggestedPrompt } from "@/types/chat";

const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  { id: "projects", label: "Tell me about his projects", prompt: "Tell me about his projects" },
  {
    id: "stack",
    label: "What technologies does he know?",
    prompt: "What technologies does he know?",
  },
  { id: "resume", label: "Show resume highlights", prompt: "Show me his resume highlights" },
  { id: "education", label: "Education", prompt: "What is his educational background?" },
  { id: "experience", label: "Experience", prompt: "What experience does he have?" },
];

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  return (
    <div
      className="flex flex-wrap justify-center gap-2.5"
      role="group"
      aria-label="Suggested questions"
    >
      {SUGGESTED_PROMPTS.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item.prompt)}
          className="rounded-full border border-border bg-surface px-4 py-2 text-[13.5px] font-medium text-ink-soft hover:text-ink hover:border-accent/40 hover:bg-accent-muted/25 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
