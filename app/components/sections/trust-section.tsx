import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "../motion/scroll-reveal";

const STEP_KEYS = ["step1", "step2", "step3"] as const;

export async function TrustSection() {
  const t = await getTranslations();

  return (
    <section id="trust" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-3xl space-y-4 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "oklch(65% 0.06 258)" }}
          >
            {t("trust.label")}
          </p>
          <h2
            className="whitespace-pre-line font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
            style={{ color: "oklch(93% 0.02 265)" }}
          >
            {t("trust.title")}
          </h2>
          <p className="text-base leading-7" style={{ color: "oklch(65% 0.025 265)" }}>
            {t("trust.subtitle")}
          </p>
        </ScrollReveal>

        {/* 승인 전 Review 흐름 — 증거 확인 → 원클릭 승인 → 사람 서명 */}
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {STEP_KEYS.map((key, i) => (
            <ScrollReveal
              key={key}
              delay={i * 110}
              className="card-lift rounded-2xl p-7"
              style={{ border: "1px solid oklch(26% 0.022 265)", backgroundColor: "oklch(17% 0.018 265)" }}
            >
              <span
                className="inline-flex size-8 items-center justify-center rounded-full font-mono text-xs font-bold"
                style={{
                  border: "1px solid oklch(72% 0.14 258 / 0.35)",
                  backgroundColor: "oklch(72% 0.14 258 / 0.1)",
                  color: "oklch(78% 0.13 258)",
                }}
              >
                {i + 1}
              </span>
              <h3
                className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold"
                style={{ color: "oklch(93% 0.02 265)" }}
              >
                {t(`trust.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-7" style={{ color: "oklch(65% 0.025 265)" }}>
                {t(`trust.${key}.desc`)}
              </p>
            </ScrollReveal>
          ))}
        </div>

        {/* Advisor — 보강 중 기능은 '곧 제공'으로 정직하게 */}
        <ScrollReveal
          delay={120}
          className="card-lift mt-4 rounded-2xl p-7"
          style={{
            border: "1px solid oklch(72% 0.14 258 / 0.2)",
            background:
              "linear-gradient(160deg, oklch(72% 0.14 258 / 0.08) 0%, oklch(16% 0.018 265) 60%)",
          }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <h3
              className="font-[family-name:var(--font-display)] text-lg font-bold"
              style={{ color: "oklch(93% 0.02 265)" }}
            >
              {t("trust.advisor.title")}
            </h3>
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest"
              style={{
                border: "1px solid oklch(72% 0.14 258 / 0.35)",
                backgroundColor: "oklch(72% 0.14 258 / 0.1)",
                color: "oklch(78% 0.13 258)",
              }}
            >
              {t("trust.advisor.badge")}
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-7" style={{ color: "oklch(65% 0.025 265)" }}>
            {t("trust.advisor.desc")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
