"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { usePointer } from "../../lib/use-pointer";

type Props = {
  children: ReactNode;
  className?: string;
  /** 기울기 최대 각도(deg). 0이면 기울지 않고 빛만 따라온다 */
  tilt?: number;
  /** 커서를 따라다니는 빛의 색 */
  color?: string;
  radius?: number;
  style?: CSSProperties;
};

/* 마우스를 올리면 커서 위치에 빛이 번지고, 선택적으로 카드가 살짝 기운다 */
export function Spotlight({
  children,
  className = "",
  tilt = 0,
  color = "oklch(50% 0.17 255 / 0.10)",
  radius = 320,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  usePointer(ref, tilt);

  return (
    <div
      ref={ref}
      className={`group/spot relative ${className}`}
      style={{
        ...(tilt
          ? {
              transform: "perspective(1100px) rotateX(var(--ry, 0deg)) rotateY(var(--rx, 0deg))",
              transition: "transform 220ms ease-out",
            }
          : null),
        ...style,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{ background: `radial-gradient(${radius}px circle at var(--x, 50%) var(--y, 50%), ${color}, transparent 70%)` }}
      />
      {children}
    </div>
  );
}
