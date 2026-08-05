/**
 * A quiet, three-dot pulse shown while the assistant hasn't produced its
 * first token yet. Intentionally subtle — no bounce, no color shift.
 */
export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-1" role="status" aria-label="Assistant is typing">
      <span className="h-1.5 w-1.5 rounded-full bg-ink-soft/50 animate-blink1" />
      <span className="h-1.5 w-1.5 rounded-full bg-ink-soft/50 animate-blink2" />
      <span className="h-1.5 w-1.5 rounded-full bg-ink-soft/50 animate-blink3" />
    </div>
  );
}
