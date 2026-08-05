interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * A small hand-drawn "S" signature mark — a single continuous pen stroke,
 * echoing the idea of a signed resume rather than a generic AI orb/spark.
 * Colors come from the accent CSS variables, so it adapts automatically
 * between light and dark themes.
 */
export function Logo({ size = 30, className = "" }: LogoProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-[9px] bg-accent-muted text-accent ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size * 0.56}
        height={size * 0.56}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 7.4c0-1.9 1.7-3.1 3.9-3.1 2.2 0 3.9 1.3 3.9 3 0 1.8-1.8 2.7-4.1 3.3-2.5.7-4.7 1.7-4.7 3.9 0 2 2.1 3.4 4.9 3.4 2.2 0 4.1-1 4.7-2.9"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
}
