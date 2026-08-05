import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

/**
 * Renders assistant markdown (bold, lists, links, code blocks) with
 * editorial-friendly typography. Memoized so it only re-renders when the
 * underlying text actually changes, which matters while streaming.
 */
function MarkdownRendererBase({ content }: MarkdownRendererProps) {
  return (
    <div className="prose-assistant text-[15px] sm:text-base">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ children, ...props }) => (
            <a target="_blank" rel="noopener noreferrer" {...props}>
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export const MarkdownRenderer = memo(MarkdownRendererBase);
