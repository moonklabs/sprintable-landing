'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

interface ParallaxProps {
  children: ReactNode;
  /**
   * Scroll-linked drift. Positive = drifts down slower than scroll
   * (background depth), negative = counter-scrolls (foreground pop).
   * Keep within ±0.25 — this is seasoning, not the dish.
   */
  speed?: number;
  className?: string;
  style?: CSSProperties;
}

export function Parallax({
  children,
  speed = 0.12,
  className,
  style,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let applied = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // rect includes the transform we applied — subtract it to get the natural position
      const naturalCenter = rect.top - applied + rect.height / 2;
      const offset = (naturalCenter - window.innerHeight / 2) * speed;
      applied = offset;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
      el.style.transform = '';
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform', ...style }}>
      {children}
    </div>
  );
}
