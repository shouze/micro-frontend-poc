import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github.css';
import { useState } from 'react';
import React from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

const CodeBlock = ({ children, className }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const codeContent = React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string') return child;
      if (React.isValidElement(child) && child.props.children) {
        return React.Children.toArray(child.props.children)
          .map((subChild) => (typeof subChild === 'string' ? subChild : ''))
          .join('');
      }
      return '';
    })
    .join('')
    .trim();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper">
      <pre className={className}>
        <code>{children}</code>
      </pre>
      <button
        className={`copy-button ${copied ? 'copied' : ''}`}
        onClick={handleCopy}
        aria-label="Copier le code"
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
            />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M16 1H4C3 1 2 2 2 3v14h2V3h12V1zm3 4H8C7 5 6 6 6 7v14c0 1 1 2 2 2h11c1 0 2-1 2-2V7c0-1-1-2-2-2zm0 16H8V7h11v14z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeHighlight]}
      remarkPlugins={[remarkGfm]}
      components={{
        code: ({ className, children, ...props }) => {
          return (
            <CodeBlock className={className} {...props}>
              {children}
            </CodeBlock>
          );
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
