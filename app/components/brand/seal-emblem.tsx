import { useId } from "react";

interface SealEmblemProps {
  className?: string;
  /** continuous ring-text rotation — disable for static watermark use */
  spin?: boolean;
}

/**
 * Circular verification seal — the brand's core evidence object.
 * Colors flow from `currentColor` so callers pick the semantic
 * (verified green for seal states, brand blue for watermarks).
 */
export function SealEmblem({ className, spin = true }: SealEmblemProps) {
  const id = useId();
  const ringPathId = `${id}-ring`;

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill="none">
      {/* outer + inner rings */}
      <circle cx="60" cy="60" r="57.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="53.5" stroke="currentColor" strokeWidth="0.5" opacity="0.55" />
      <circle
        cx="60"
        cy="60"
        r="34"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2.5 4"
        opacity="0.7"
      />
      {/* rotating ring text */}
      <g className={spin ? "seal-ring-spin" : undefined}>
        <defs>
          <path
            id={ringPathId}
            d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
          />
        </defs>
        <text
          fontSize="8.5"
          letterSpacing="2.2"
          fill="currentColor"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
          fontWeight="700"
        >
          <textPath href={`#${ringPathId}`}>
            VERIFIED · SPRINTABLE · HUMAN SIGNED ·
          </textPath>
        </text>
      </g>
      {/* center check */}
      <path
        d="M45 61 L55.5 71.5 L76 48.5"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
