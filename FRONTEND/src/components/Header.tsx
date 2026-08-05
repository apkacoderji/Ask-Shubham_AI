import { FileText, Github, Linkedin, SquarePen } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

interface HeaderProps {
  onNewChat: () => void;
  linkedinUrl: string;
  githubUrl: string;
  resumeUrl: string;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export function Header({
  onNewChat,
  linkedinUrl,
  githubUrl,
  resumeUrl,
  theme,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-canvas/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-chat items-center justify-between px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-2.5">
          <Logo size={30} />
          <div>
            <h1 className="font-serif text-[18px] leading-none tracking-tight text-ink">
              Shubham
            </h1>
            <p className="mt-0.5 text-[11.5px] uppercase tracking-wide text-ink-soft">
              AI Hiring Assistant
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-1 sm:gap-1.5" aria-label="Profile links">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
            aria-label="LinkedIn profile"
          >
            <Linkedin size={16} />
            <span className="hidden md:inline">LinkedIn</span>
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
            aria-label="GitHub profile"
          >
            <Github size={16} />
            <span className="hidden md:inline">GitHub</span>
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
            aria-label="View resume"
          >
            <FileText size={16} />
            <span className="hidden md:inline">Resume</span>
          </a>

          <span className="mx-1 hidden h-5 w-px bg-border sm:inline-block" aria-hidden="true" />

          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          <button
            type="button"
            onClick={onNewChat}
            className="ml-1 flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-[13px] font-medium text-ink transition-colors hover:border-accent/40 hover:bg-accent-muted/40 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <SquarePen size={15} />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
