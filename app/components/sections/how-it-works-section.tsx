import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "../motion/scroll-reveal";

const STEP_KEYS = ["step1", "step2", "step3", "step4"] as const;

export async function HowItWorksSection() {
  const t = await getTranslations();

  return (
    <section
      id="how"
      className="flow-timeline px-5 py-20 sm:px-8 sm:py-28"
      style={{ backgroundColor: "oklch(15% 0.016 265)" }}
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl space-y-4 text-center">
          <p
            className="eyebrow-cross text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "oklch(65% 0.06 258)" }}
          >
            {t("howItWorks.label")}
          </p>
          <h2
            className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
            style={{ color: "oklch(93% 0.02 265)" }}
          >
            {t("howItWorks.title")}
          </h2>
          <p className="text-base leading-7" style={{ color: "oklch(65% 0.025 265)" }}>
            {t("howItWorks.subtitle")}
          </p>
        </ScrollReveal>

        <div className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Loop flow — dashes march along the connector; where scrubbing is
              supported, a Claimed-blue → Verified-green fill completes with scroll (lg only) */}
          <div aria-hidden="true" className="absolute inset-x-8 top-9 hidden h-px lg:block">
            <div className="flow-line absolute inset-0" />
            <div
              className="flow-fill absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, oklch(72% 0.14 258 / 0.9), oklch(65% 0.15 145 / 0.9))",
                boxShadow: "0 0 14px oklch(72% 0.14 258 / 0.45)",
              }}
            />
          </div>
          {STEP_KEYS.map((key, i) => {
            const isGate = key === "step3";
            return (
              <ScrollReveal
                key={key}
                delay={i * 110}
                className="card-lift relative rounded-2xl p-6"
                style={{
                  border: isGate
                    ? "1px solid oklch(72% 0.14 258 / 0.4)"
                    : "1px solid oklch(26% 0.022 265)",
                  backgroundColor: isGate ? "oklch(17% 0.02 265)" : "oklch(13% 0.015 265)",
                  boxShadow: isGate ? "0 0 40px oklch(72% 0.14 258 / 0.1)" : "none",
                }}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="inline-flex size-9 items-center justify-center rounded-full font-mono text-sm font-bold"
                    style={{
                      border: "1px solid oklch(72% 0.14 258 / 0.35)",
                      backgroundColor: isGate ? "oklch(72% 0.14 258 / 0.18)" : "oklch(72% 0.14 258 / 0.1)",
                      color: "oklch(78% 0.13 258)",
                    }}
                  >
                    {`0${i + 1}`}
                  </span>
                  {isGate && (
                    <span
                      className="gate-breathe inline-block size-1.5 rounded-full"
                      style={{ backgroundColor: "oklch(70% 0.16 85)" }}
                      aria-hidden="true"
                    />
                  )}
                </span>
                <h3
                  className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold"
                  style={{ color: "oklch(93% 0.02 265)" }}
                >
                  {t(`howItWorks.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "oklch(65% 0.025 265)" }}>
                  {t(`howItWorks.${key}.desc`)}
                </p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
