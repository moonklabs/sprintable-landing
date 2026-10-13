"use client";

import { useRef } from "react";
import { usePointer } from "../../lib/use-pointer";

/* 점 무늬 배경. 커서 주변의 점만 진하게 켜진다 */
export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  usePointer(ref, 0, "parent");

  const dots = (color: string) => `radial-gradient(${color} 1px, transparent 1px)`;
  const fade = "radial-gradient(ellipse 70% 100% at 50% 0%, black 20%, transparent 75%)";

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem]">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: dots("oklch(84% 0.008 265)"), backgroundSize: "22px 22px", maskImage: fade, WebkitMaskImage: fade }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: dots("oklch(45% 0.17 255)"),
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(180px circle at var(--x, -999px) var(--y, -999px), black, transparent)",
          WebkitMaskImage: "radial-gradient(180px circle at var(--x, -999px) var(--y, -999px), black, transparent)",
        }}
      />
    </div>
  );
}
