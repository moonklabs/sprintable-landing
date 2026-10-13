"use client";

import { Check, FileText, FlaskConical, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { trackFeatureEngage } from "../../lib/tracking";

const ICONS = [FlaskConical, FileText, MessageSquare];

/* 승인 버튼을 누르면 주장이 검증됨으로 바뀐다 — 직접 눌러볼 수 있는 작은 검토 화면 */
export function VerifyScene() {
  const t = useTranslations();
  const evidence = t.raw("features.scene.evidence") as string[];
  const [approved, setApproved] = useState(false);

  function toggle() {
    if (!approved) trackFeatureEngage({ feature_name: "features_verify_approve" });
    setApproved((v) => !v);
  }

  return (
    <div className="flex h-full flex-col bg-white p-5 text-[var(--d-text)] sm:p-8" style={{ ["--d-muted" as string]: "oklch(50% 0.012 265)" }}>
      <p className="text-[13px] font-semibold">{t("features.scene.header")}</p>

      <div className="mt-4 rounded-xl border border-line p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <p className="min-w-0 flex-1 basis-48 text-[15px] font-semibold leading-snug">#4 {t("demo.app.story4")}</p>
          <span
            key={approved ? "ok" : "claim"}
            className="demo-line rounded-full px-2.5 py-1 text-xs font-medium"
            style={
              approved
                ? { backgroundColor: "oklch(95% 0.04 150)", color: "oklch(40% 0.12 150)" }
                : { backgroundColor: "oklch(95% 0.03 255)", color: "oklch(42% 0.15 255)" }
            }
          >
            {approved ? t("demo.app.verifiedChip") : t("demo.app.claimChip")}
          </span>
        </div>

        <p className="mt-5 text-xs text-[var(--d-muted)]">{t("features.scene.evidenceTitle")}</p>
        <ul className="mt-2 divide-y divide-line rounded-lg border border-line">
          {evidence.map((item, i) => {
            const Icon = ICONS[i] ?? FileText;
            return (
              <li key={item} className="flex items-center gap-3 px-3.5 py-2.5 text-[13px]">
                <Icon className="size-4 shrink-0 text-faint" aria-hidden="true" />
                <span className="flex-1">{item}</span>
                <Check className="size-4 text-ok" aria-hidden="true" />
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            className={`rounded-full px-5 py-2 text-[13px] font-medium transition active:scale-[0.97] ${
              approved ? "border border-line bg-white text-ink hover:bg-paper-2" : "demo-attention bg-brand text-white hover:brightness-110"
            }`}
          >
            {approved ? t("features.scene.reset") : t("features.scene.approve")}
          </button>
          <p className="text-xs text-[var(--d-muted)]" aria-live="polite">
            {approved ? t("features.scene.approved") : t("features.scene.hint")}
          </p>
        </div>
      </div>
    </div>
  );
}
