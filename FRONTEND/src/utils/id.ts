/**
 * Generates a reasonably unique id for chat messages. Falls back to a
 * manual implementation if crypto.randomUUID isn't available (older
 * mobile browsers / non-secure contexts).
 */
export function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
