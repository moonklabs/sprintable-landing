"use client";

import { useEffect, type RefObject } from "react";

/* 마우스 위치를 CSS 변수(--x, --y, --rx, --ry)로 노출한다.
   터치 기기와 "모션 줄이기" 설정에서는 아무것도 하지 않는다. */
export function usePointer(ref: RefObject<HTMLElement | null>, tilt = 0, target?: "parent") {
  useEffect(() => {
    const el = ref.current;
    const host = target === "parent" ? el?.parentElement : el;
    if (!el || !host) return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = host.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        el.style.setProperty("--x", `${x}px`);
        el.style.setProperty("--y", `${y}px`);
        if (tilt) {
          el.style.setProperty("--rx", `${(x / r.width - 0.5) * tilt * 2}deg`);
          el.style.setProperty("--ry", `${-(y / r.height - 0.5) * tilt * 2}deg`);
        }
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [ref, tilt, target]);
}
