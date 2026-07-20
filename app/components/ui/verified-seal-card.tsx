import { SealEmblem } from '../brand/seal-emblem';

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
    <div className={`relative ${className ?? ''}`}>
      {/* White certificate card — ink stamp on paper metaphor */}
      <div
        className="cert-double overflow-hidden rounded-2xl"
        style={{
          border: '1px solid oklch(82% 0.015 85)',
          background: 'oklch(99.5% 0.002 85)',
          boxShadow:
            '0 2px 6px oklch(23% 0.04 262 / 0.06), 0 24px 56px -12px oklch(42% 0.12 260 / 0.25)',
        }}
      >
        {/* Header — ledger strip, perforated from the body like a receipt stub */}
        <div
          className="flex items-center gap-2.5 px-4 py-3"
          style={{
            borderBottom: '1px dashed oklch(82% 0.015 85)',
            backgroundColor: 'oklch(96.8% 0.008 80)',
          }}
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
              style={{ backgroundColor: 'oklch(48% 0.17 260)' }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ backgroundColor: 'oklch(48% 0.17 260)' }}
            />
          </span>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em]" style={{ color: 'oklch(57% 0.015 265)' }}>
            {title}
          </span>
        </div>

        {/* Rows */}
        <div className="space-y-2 p-4">
          {/* Animated row — Claimed stamps into Verified.
              seal-row-animated drives background-color: transparent → verified-green-wash */}
          <div
            className="seal-row-animated flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
            style={{ border: '1px solid oklch(82% 0.015 85)' }}
          >
            <span className="relative inline-flex shrink-0" aria-hidden="true">
              <span
                className={`${BADGE_BASE} seal-claim`}
                style={{ backgroundColor: 'oklch(48% 0.17 260 / 0.1)', color: 'oklch(48% 0.17 260)' }}
              >
                {labels.claim}
              </span>
              <span
                className={`${BADGE_BASE} seal-verify absolute left-0 top-0`}
                style={{ backgroundColor: 'oklch(56% 0.13 150 / 0.12)', color: 'oklch(56% 0.13 150)' }}
              >
                {labels.verified}
              </span>
            </span>
            {/* Screen readers get the resolved state, not the animation */}
            <span className="sr-only">{labels.verified}</span>
            <span className="min-w-0 flex-1 truncate" style={{ color: 'oklch(45% 0.02 265)' }}>
              {animatedRow.text}
            </span>
            <span
              className="relative shrink-0 whitespace-nowrap font-mono text-xs"
              style={{ color: 'oklch(57% 0.015 265)' }}
            >
              <span className="seal-claim">{animatedRow.metaClaim}</span>
              <span
                className="seal-verify absolute right-0 top-0 whitespace-nowrap"
                style={{ color: 'oklch(56% 0.13 150)' }}
              >
                {animatedRow.metaVerified}
              </span>
            </span>
          </div>

          {/* Gate row */}
          <div
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
            style={{ border: '1px solid oklch(82% 0.015 85)', backgroundColor: 'oklch(99.5% 0.002 85)' }}
          >
            <span
              className={BADGE_BASE}
              style={{ backgroundColor: 'oklch(70% 0.16 85 / 0.12)', color: 'oklch(55% 0.14 85)' }}
            >
              {labels.gate}
            </span>
            <span className="min-w-0 flex-1 truncate" style={{ color: 'oklch(45% 0.02 265)' }}>
              {gateRow.text}
            </span>
            <span className="shrink-0 font-mono text-xs" style={{ color: 'oklch(57% 0.015 265)' }}>
              {gateRow.meta}
            </span>
          </div>

          {/* Done row */}
          <div
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
            style={{ border: '1px solid oklch(82% 0.015 85)', backgroundColor: 'oklch(99.5% 0.002 85)' }}
          >
            <span
              className={BADGE_BASE}
              style={{ backgroundColor: 'oklch(56% 0.13 150 / 0.12)', color: 'oklch(56% 0.13 150)' }}
            >
              {labels.verified}
            </span>
            <span className="min-w-0 flex-1 truncate" style={{ color: 'oklch(45% 0.02 265)' }}>
              {doneRow.text}
            </span>
            <span className="shrink-0 font-mono text-xs" style={{ color: 'oklch(57% 0.015 265)' }}>
              {doneRow.meta}
            </span>
          </div>
        </div>
      </div>

      {/* Seal emblem — gold foil stamps onto the card corner (1 of 3 permitted gold uses) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -top-6 size-24 sm:-right-6"
        style={{ color: 'oklch(72% 0.09 85)' }}
      >
        <span
          className="seal-ripple absolute inset-0 rounded-full"
          style={{ border: '1.5px solid oklch(72% 0.09 85 / 0.55)' }}
        />
        <SealEmblem
          className="seal-emblem-stamp absolute inset-0"
          spin
        />
      </div>
    </div>
  );
}
