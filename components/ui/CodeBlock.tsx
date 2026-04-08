'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, language = 'bash', filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers or non-HTTPS contexts
      console.error('Failed to copy:', error);
      const textArea = document.createElement('textarea');
      textArea.value = code;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className={cn('relative rounded-lg overflow-hidden', className)}>
      {filename && (
        <div className="bg-[var(--color-surface1)] px-4 py-2 text-sm text-[var(--color-subtext0)] border-b border-[var(--color-surface0)]">
          {filename}
        </div>
      )}
      <div className="relative bg-[var(--color-crust)] p-4 overflow-x-auto">
        <pre className="text-sm text-[var(--color-text)] font-mono">
          <code className={`language-${language}`}>{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className={cn(
            'absolute top-2 right-2 p-2 rounded-md',
            'bg-[var(--color-surface0)] hover:bg-[var(--color-surface1)]',
            'text-[var(--color-subtext0)] hover:text-[var(--color-text)]',
            'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mauve)]'
          )}
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? <Check className="h-4 w-4 text-[var(--color-green)]" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
