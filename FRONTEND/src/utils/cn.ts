/**
 * Lightweight class name combiner. Filters out falsy values so
 * conditional classes can be expressed inline without extra deps.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
