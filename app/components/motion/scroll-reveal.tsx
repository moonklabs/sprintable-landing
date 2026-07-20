'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** transition-delay in ms — stagger siblings with 80~120ms steps */
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale' | 'none';
  style?: CSSProperties;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    // Anything at or above the reveal line counts — including content the user
    // jumped past via anchor links; it must not stay hidden when they scroll back.
    const inViewport = () =>
      el.getBoundingClientRect().top < window.innerHeight * 0.92;

    let done = false;
    // Scroll fallback backs up the observer — IO starves in non-rendering
    // documents (prerender/hidden tab); all paths share one cleanup.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) reveal();
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    const onScroll = () => {
      if (inViewport()) reveal();
    };
    const reveal = () => {
      if (done) return;
      done = true;
      setVisible(true);
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
    const initial = setTimeout(() => {
      if (prefersReduced || inViewport()) reveal();
    }, 0);

    io.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(initial);
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal-${direction}${visible ? ' is-visible' : ''} ${className ?? ''}`}
      style={delay ? { transitionDelay: `${delay}ms`, ...style } : style}
    >
      {children}
    </div>
  );
}
