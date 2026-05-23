export type TerminalLine =
  | { type: 'prompt'; text: string }
  | { type: 'progress'; text: string; status?: 'pending' | 'done' }
  | { type: 'result'; text: string }
  | { type: 'blank' }
  | { type: 'cursor' };

interface TerminalMockProps {
  title?: string;
  lines: TerminalLine[];
  className?: string;
}

export function TerminalMock({
  title = 'sprintable — zsh — 80×24',
  lines,
  className,
}: TerminalMockProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius)] ${className ?? ''}`}
      style={{
        border: '1px solid oklch(72% 0.14 258 / 0.25)',
        backgroundColor: 'oklch(13% 0.015 265)',
        boxShadow:
          '0 24px 64px oklch(13% 0.015 265 / 0.6), 0 0 80px oklch(72% 0.14 258 / 0.12)',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-3 border-b px-4 py-2.5"
        style={{
          borderColor: 'oklch(26% 0.022 265)',
          backgroundColor: 'oklch(15% 0.016 265)',
        }}
      >
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full" style={{ backgroundColor: 'oklch(60% 0.17 25)' }} />
          <span className="size-3 rounded-full" style={{ backgroundColor: 'oklch(75% 0.16 80)' }} />
          <span className="size-3 rounded-full" style={{ backgroundColor: 'oklch(70% 0.16 145)' }} />
        </div>
        <span className="font-mono text-xs" style={{ color: 'oklch(55% 0.02 265)' }}>
          {title}
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4 font-mono text-sm leading-7" style={{ color: 'oklch(85% 0.025 265)' }}>
        {lines.map((line, idx) => {
          if (line.type === 'blank') {
            return <div key={idx} className="h-3" />;
          }

          if (line.type === 'cursor') {
            return (
              <div key={idx} className="flex items-center gap-2">
                <span style={{ color: 'oklch(72% 0.14 258)' }}>$</span>
                <span
                  className="inline-block h-4 w-2 animate-pulse"
                  style={{ backgroundColor: 'oklch(72% 0.14 258)' }}
                />
              </div>
            );
          }

          if (line.type === 'prompt') {
            return (
              <div key={idx} className="flex items-center gap-2">
                <span style={{ color: 'oklch(72% 0.14 258)' }}>$</span>
                <span style={{ color: 'oklch(92% 0.025 265)' }}>{line.text}</span>
              </div>
            );
          }

          if (line.type === 'progress') {
            const isDone = line.status === 'done';
            return (
              <div key={idx} className="flex items-center gap-2">
                <span
                  style={{
                    color: isDone ? 'oklch(70% 0.16 145)' : 'oklch(72% 0.14 258)',
                  }}
                >
                  {isDone ? '✓' : '·'}
                </span>
                <span style={{ color: 'oklch(72% 0.025 265)' }}>{line.text}</span>
              </div>
            );
          }

          if (line.type === 'result') {
            return (
              <div key={idx} style={{ color: 'oklch(78% 0.13 258)' }}>
                {line.text}
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
