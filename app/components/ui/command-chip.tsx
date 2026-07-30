'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CommandChipProps {
  command: string;
  copiedLabel: string;
  className?: string;
}

/**
 * Terminal command chip — intentionally dark on the light page.
 * The ink-dark bg is the page's only small-scale dark object: a terminal
 * lives in the dark, and that contrast makes it feel authentically runnable.
 */
export function CommandChip({ command, copiedLabel, className }: CommandChipProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable (insecure context) — chip stays copy-less
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`card-lift inline-flex cursor-pointer items-center gap-3 rounded-[var(--radius)] px-4 py-2.5 font-mono text-sm ${className ?? ''}`}
      style={{
        border: '1px solid oklch(32% 0.025 265)',
        backgroundColor: 'oklch(22% 0.025 265)', /* ink — terminal dark */
        color: 'oklch(85% 0.025 265)',
      }}
      aria-label={`Copy: ${command}`}
    >
      <span aria-hidden="true" style={{ color: 'oklch(72% 0.14 260)' }}>$</span>
      {command}
      {copied ? (
        <span
          className="inline-flex items-center gap-1 text-xs font-semibold"
          style={{ color: 'oklch(70% 0.15 145)' }}
        >
          <Check className="size-3.5" aria-hidden="true" />
          {copiedLabel}
        </span>
      ) : (
        <Copy className="size-3.5" aria-hidden="true" style={{ color: 'oklch(55% 0.02 265)' }} />
      )}
    </button>
  );
}
