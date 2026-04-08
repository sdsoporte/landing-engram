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
    let textArea: HTMLTextAreaElement | null = null;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers or non-HTTPS contexts
      console.error('Failed to copy:', error);
      textArea = document.createElement('textarea');
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
    } finally {
      // Always cleanup the textarea if it was created
      if (textArea && textArea.parentNode) {
        textArea.parentNode.removeChild(textArea);
      }
    }
  };

  return (
    <div className={cn('relative rounded-lg overflow-hidden', className)}>
      {filename && (
        <div className="bg-[--color-surface1] px-4 py-2 text-sm text-[--color-subtext0] border-b border-[--color-surface0]">
          {filename}
        </div>
      )}
      <div className="relative bg-[--color-crust] p-4 overflow-x-auto">
        <pre className="text-sm text-[--color-text] font-mono">
          <code className={`language-${language}`}>{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className={cn(
            'absolute top-2 right-2 p-2 rounded-md',
            'bg-[--color-surface0] hover:bg-[--color-surface1]',
            'text-[--color-subtext0] hover:text-[--color-text]',
            'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-mauve]'
          )}
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? <Check className="h-4 w-4 text-[--color-green]" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
