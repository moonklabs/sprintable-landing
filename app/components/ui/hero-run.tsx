"use client";

import { Play, Target } from "lucide-react";
import { useTranslations } from "next-intl";
import { trackFeatureEngage } from "../../lib/tracking";

/* 예시 목표와 "데모 실행" 버튼. 입력창처럼 보이지만 고정된 시나리오를 재생한다 */
export function HeroRun() {
  const t = useTranslations("hero");

  function run() {
    trackFeatureEngage({ feature_name: "hero_demo_run" });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("demo")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    window.dispatchEvent(new CustomEvent("sprintable:demo-run"));
  }

  return (
    <div className="mx-auto mt-9 flex max-w-lg items-center gap-3 rounded-full border border-line bg-white p-1.5 pl-5 shadow-[0_6px_24px_-12px_oklch(30%_0.04_265/0.25)]">
      <Target className="size-4 shrink-0 text-faint" aria-hidden="true" />
      <span className="min-w-0 flex-1 truncate text-left text-[15px] text-muted">{t("goalExample")}</span>
      <button
        type="button"
        onClick={run}
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[oklch(30%_0.012_265)]"
      >
        <Play className="size-3.5" aria-hidden="true" />
        {t("run")}
      </button>
    </div>
  );
}
