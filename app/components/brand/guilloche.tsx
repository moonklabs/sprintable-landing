/**
 * Guilloche — security-paper wavy line pattern (pure SVG, no client JS).
 * Renders concentric sinusoidal wave paths at low opacity for certificate texture.
 * Usage: <Guilloche className="absolute inset-0 opacity-[0.05]" />
 */
export function Guilloche({
  className,
  waveCount = 12,
}: {
  className?: string;
  waveCount?: number;
}) {
  const W = 500;
  const H = 420;
  const paths: string[] = [];

  for (let i = 0; i < waveCount; i++) {
    const y = (H / (waveCount + 1)) * (i + 1);
    // Slight amplitude variation: 7–13px
    const amp = 7 + (i % 5) * 1.4;
    // Period variation: 5–7 full cycles
    const periods = 5 + (i % 3);
    const segs = periods * 4;
    const segW = W / segs;

    let d = `M 0,${y.toFixed(1)}`;
    for (let s = 0; s < segs; s++) {
      const x0 = s * segW;
      const x1 = (s + 1) * segW;
      const mx = x0 + segW / 2;
      const dir = s % 2 === 0 ? 1 : -1;
      d += ` Q ${mx.toFixed(1)},${(y + dir * amp).toFixed(1)} ${x1.toFixed(1)},${y.toFixed(1)}`;
    }
    paths.push(d);
  }

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth={0.65}
          strokeOpacity={0.6}
          fill="none"
        />
      ))}
    </svg>
  );
}
