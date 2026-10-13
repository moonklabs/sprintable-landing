"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { trackFeatureEngage } from "../../lib/tracking";

/* 시작 명령을 한 번에 복사한다 */
export function CopyCommand({ command }: { command: string }) {
  const t = useTranslations("finalCta");
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      trackFeatureEngage({ feature_name: "cta_copy_command" });
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* 클립보드를 쓸 수 없으면 아무것도 하지 않는다 — 명령은 화면에 그대로 보인다 */
    }
  }

  return (
    <div className="mx-auto flex w-fit max-w-full items-center gap-4 rounded-xl bg-ink py-2.5 pl-5 pr-2.5 font-mono text-sm text-white shadow-[0_20px_40px_-20px_oklch(20%_0.03_265/0.6)]">
      <span className="text-[oklch(70%_0.14_258)]" aria-hidden="true">
        $
      </span>
      <code className="truncate">{command}</code>
      <button
        type="button"
        onClick={copy}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 font-sans text-xs font-medium transition hover:bg-white/20"
      >
        {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
        <span aria-live="polite">{copied ? t("copied") : t("copy")}</span>
      </button>
    </div>
  );
}
