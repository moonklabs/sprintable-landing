"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Spotlight } from "./spotlight";
import { VerifyScene } from "./verify-scene";

type Item = { key: string; title: string; desc: string; bullets: string[]; alt: string };

const SCENES: Record<string, { src?: string; path: string }> = {
  briefing: { src: "/screenshots/shot1-orgbriefing-en.png", path: "org-briefing" },
  board: { src: "/screenshots/shot3-board-en.png", path: "board" },
  glance: { src: "/screenshots/shot4-glance-en.png", path: "glance" },
  verify: { path: "review" },
};

function Chrome({ path }: { path: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-line px-3.5 py-2" aria-hidden="true">
      <span className="flex gap-1.5">
        <span className="size-2.5 rounded-full bg-[oklch(85%_0.005_265)]" />
        <span className="size-2.5 rounded-full bg-[oklch(85%_0.005_265)]" />
        <span className="size-2.5 rounded-full bg-[oklch(85%_0.005_265)]" />
      </span>
      <span className="flex-1 truncate rounded-md bg-paper-2 px-3 py-1 text-center text-[11px] text-muted">
        app.sprintable.ai/{path}
      </span>
    </div>
  );
}

function Scene({ item }: { item: Item }) {
  const scene = SCENES[item.key] ?? SCENES.briefing!;
  return scene.src ? (
    <Image src={scene.src} alt={item.alt} width={1600} height={1000} className="w-full" />
  ) : (
    <div className="aspect-[1.6/1] w-full">
      <VerifyScene />
    </div>
  );
}

/* 큰 화면: 섹션이 길어지는 동안 화면이 고정(sticky)되고, 스크롤 위치에 따라 기능과 제품 화면이 바뀐다.
   작은 화면: 고정 없이 기능마다 설명과 화면을 차례로 쌓는다. */
export function FeatureScroll() {
  const t = useTranslations("features");
  const items = t.raw("items") as Item[];
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (window.innerWidth < 1024) return;
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight + 64;
      const progress = Math.min(Math.max(-(rect.top - 64) / Math.max(scrollable, 1), 0), 0.9999);
      const next = Math.floor(progress * items.length);
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActive(next);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items.length]);

  function jump(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight + 64;
    const top = window.scrollY + rect.top - 64 + ((i + 0.5) / items.length) * scrollable;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  }

  const path = (SCENES[items[active]?.key ?? "briefing"] ?? SCENES.briefing!).path;

  return (
    <>
      {/* ── lg 이상: sticky 스크롤 ── */}
      <div ref={trackRef} className="relative hidden lg:block" style={{ height: `${items.length * 85 + 40}vh` }}>
        <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center">
          <div className="grid w-full grid-cols-[0.78fr_1.22fr] items-center gap-x-14">
            <div>
              <ul className="relative">
                <span aria-hidden="true" className="absolute bottom-2 left-0 top-2 w-px bg-line" />
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-2 w-px bg-ink transition-[height] duration-500 ease-out"
                  style={{ height: `calc((100% - 1rem) * ${(active + 1) / items.length})` }}
                />
                {items.map((item, i) => {
                  const on = i === active;
                  return (
                    <li key={item.key} className="pl-6">
                      <button
                        type="button"
                        onClick={() => jump(i)}
                        aria-current={on ? "true" : undefined}
                        className="w-full py-3 text-left"
                      >
                        <span
                          className={`block text-2xl font-medium leading-snug tracking-[-0.025em] transition-colors duration-300 ${
                            on ? "text-ink" : "text-faint hover:text-muted"
                          }`}
                        >
                          {item.title}
                        </span>
                      </button>
                      <div
                        className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
                        style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
                      >
                        <div className="overflow-hidden">
                          <p className="max-w-md pb-2 text-[15px] leading-7 text-muted">{item.desc}</p>
                          <ul className="space-y-2 pb-4">
                            {item.bullets.map((b) => (
                              <li key={b} className="flex items-start gap-2.5 text-sm leading-6 text-ink">
                                <Check className="mt-1 size-4 shrink-0 text-ok" aria-hidden="true" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <Spotlight
              tilt={2.5}
              radius={420}
              className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_70px_-30px_oklch(30%_0.04_265/0.4)]"
            >
              <Chrome path={path} />
              <div className="relative">
                {items.map((item, i) => (
                  <div
                    key={item.key}
                    aria-hidden={i !== active}
                    className={`transition-all duration-500 ease-out ${
                      i === active ? "relative translate-y-0 opacity-100" : "pointer-events-none absolute inset-0 translate-y-3 opacity-0"
                    }`}
                  >
                    <Scene item={item} />
                  </div>
                ))}
              </div>
            </Spotlight>
          </div>
        </div>
      </div>

      {/* ── lg 미만: 차례로 쌓기 ── */}
      <div className="space-y-14 lg:hidden">
        {items.map((item) => {
          const scene = SCENES[item.key] ?? SCENES.briefing!;
          return (
            <div key={item.key}>
              <h3 className="text-xl font-medium tracking-[-0.025em] text-ink">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-muted">{item.desc}</p>
              <div className="mt-5 overflow-hidden rounded-xl border border-line bg-white shadow-[0_20px_50px_-28px_oklch(30%_0.04_265/0.4)]">
                <Chrome path={scene.path} />
                <Scene item={item} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
