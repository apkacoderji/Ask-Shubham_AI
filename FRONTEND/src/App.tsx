import { useState } from "react";
import { ChatWindow } from "@/components/ChatWindow";
import { Composer } from "@/components/Composer";
import { Header } from "@/components/Header";
import { useChat } from "@/hooks/useChat";
import { useTheme } from "@/hooks/useTheme";

const PROFILE_LINKS = {
  linkedin: "https://linkedin.com/in/shubham-negi-profile",
  github: "https://github.com/apkacoderji",
  resume: "/Resume.pdf",
};

export default function App() {
  const { messages, isGenerating, sendMessage, retryLastMessage, startNewChat } = useChat();
  const { theme, toggleTheme } = useTheme();
  const [draft, setDraft] = useState("");

  const handleSend = () => {
    if (!draft.trim()) return;
    sendMessage(draft);
    setDraft("");
  };

  const handleSelectPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="flex h-screen flex-col bg-canvas">
      <Header
        onNewChat={startNewChat}
        linkedinUrl={PROFILE_LINKS.linkedin}
        githubUrl={PROFILE_LINKS.github}
        resumeUrl={PROFILE_LINKS.resume}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex flex-1 flex-col overflow-hidden">
        <ChatWindow messages={messages} onSelectPrompt={handleSelectPrompt} onRetry={retryLastMessage} />

        <div className="border-t border-border bg-canvas px-4 py-4 sm:px-6">
          <div className="mx-auto max-w-chat">
            <Composer
              value={draft}
              onChange={setDraft}
              onSubmit={handleSend}
              disabled={isGenerating}
            />
            <p className="mt-2 text-center text-[12px] text-ink-soft/80">
              This assistant answers questions about Shubham's candidacy only.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
