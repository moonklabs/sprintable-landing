interface SealLabels {
  claim: string;
  verified: string;
  gate: string;
}

interface VerifiedSealCardProps {
  title: string;
  labels: SealLabels;
  /** row that stamps Claimed → Verified on a loop */
  animatedRow: { text: string; metaClaim: string; metaVerified: string };
  gateRow: { text: string; meta: string };
  doneRow: { text: string; meta: string };
  className?: string;
}

const BADGE_BASE = 'shrink-0 whitespace-nowrap rounded-full px-2 py-1 text-xs font-bold';

export function VerifiedSealCard({
  title,
  labels,
  animatedRow,
  gateRow,
  doneRow,
  className,
}: VerifiedSealCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className ?? ''}`}
      style={{
        border: '1px solid oklch(72% 0.14 258 / 0.25)',
        backgroundColor: 'oklch(15% 0.016 265)',
        boxShadow:
          '0 24px 64px oklch(13% 0.015 265 / 0.6), 0 0 80px oklch(72% 0.14 258 / 0.12)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2.5 border-b px-4 py-3"
        style={{
          borderColor: 'oklch(26% 0.022 265)',
          backgroundColor: 'oklch(13% 0.015 265)',
        }}
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
            style={{ backgroundColor: 'oklch(72% 0.14 258)' }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ backgroundColor: 'oklch(72% 0.14 258)' }}
          />
        </span>
        <span className="font-mono text-xs" style={{ color: 'oklch(60% 0.025 265)' }}>
          {title}
        </span>
      </div>

      {/* Rows */}
      <div className="space-y-2 p-4">
        {/* Animated row — Claimed stamps into Verified */}
        <div
          className="seal-row-animated flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
          style={{ border: '1px solid oklch(22% 0.018 265)' }}
        >
          <span className="relative inline-flex shrink-0" aria-hidden="true">
            <span
              className={`${BADGE_BASE} seal-claim`}
              style={{ backgroundColor: 'oklch(65% 0.18 250 / 15%)', color: 'oklch(65% 0.18 250)' }}
            >
              {labels.claim}
            </span>
            <span
              className={`${BADGE_BASE} seal-verify absolute left-0 top-0`}
              style={{ backgroundColor: 'oklch(65% 0.15 145 / 15%)', color: 'oklch(65% 0.15 145)' }}
            >
              {labels.verified}
            </span>
          </span>
          {/* Screen readers get the resolved state, not the animation */}
          <span className="sr-only">{labels.verified}</span>
          <span className="flex-1 truncate" style={{ color: 'oklch(72% 0.025 265)' }}>
            {animatedRow.text}
          </span>
          <span className="relative shrink-0 whitespace-nowrap text-xs" style={{ color: 'oklch(50% 0.02 265)' }}>
            <span className="seal-claim">{animatedRow.metaClaim}</span>
            <span className="seal-verify absolute right-0 top-0 whitespace-nowrap" style={{ color: 'oklch(65% 0.15 145)' }}>
              {animatedRow.metaVerified}
            </span>
          </span>
        </div>

        {/* Gate row */}
        <div
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
          style={{ border: '1px solid oklch(22% 0.018 265)', backgroundColor: 'oklch(13% 0.015 265)' }}
        >
          <span
            className={BADGE_BASE}
            style={{ backgroundColor: 'oklch(70% 0.16 85 / 15%)', color: 'oklch(70% 0.16 85)' }}
          >
            {labels.gate}
          </span>
          <span className="flex-1 truncate" style={{ color: 'oklch(65% 0.025 265)' }}>
            {gateRow.text}
          </span>
          <span className="shrink-0 text-xs" style={{ color: 'oklch(50% 0.02 265)' }}>
            {gateRow.meta}
          </span>
        </div>

        {/* Done row */}
        <div
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
          style={{ border: '1px solid oklch(22% 0.018 265)', backgroundColor: 'oklch(13% 0.015 265)' }}
        >
          <span
            className={BADGE_BASE}
            style={{ backgroundColor: 'oklch(65% 0.15 145 / 15%)', color: 'oklch(65% 0.15 145)' }}
          >
            {labels.verified}
          </span>
          <span className="flex-1 truncate" style={{ color: 'oklch(65% 0.025 265)' }}>
            {doneRow.text}
          </span>
          <span className="shrink-0 text-xs" style={{ color: 'oklch(50% 0.02 265)' }}>
            {doneRow.meta}
          </span>
        </div>
      </div>
    </div>
  );
}
