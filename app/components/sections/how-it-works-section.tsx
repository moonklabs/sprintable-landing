import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "../motion/scroll-reveal";

const STEP_KEYS = ["step1", "step2", "step3", "step4"] as const;

export async function HowItWorksSection() {
  const t = await getTranslations();

  return (
    <section
      id="how"
      className="flow-timeline px-5 py-20 sm:px-8 sm:py-28"
      style={{ backgroundColor: "oklch(100% 0 0)" }}
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl space-y-4 text-center">
          <p
            className="eyebrow-cross text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "oklch(48% 0.17 260)" }}
          >
            {t("howItWorks.label")}
          </p>
          <h2
            className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
            style={{ color: "oklch(22% 0.025 265)" }}
          >
            {t("howItWorks.title")}
          </h2>
          <p className="text-base leading-7" style={{ color: "oklch(45% 0.02 265)" }}>
            {t("howItWorks.subtitle")}
          </p>
        </ScrollReveal>

        <div className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Loop flow — dashes march along the connector; where scrubbing is
              supported, an accent-blue → verified-green fill completes with scroll (lg only) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-9 z-10 hidden h-px lg:block">
            <div className="flow-line absolute inset-0" />
            <div
              className="flow-fill absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, oklch(48% 0.17 260 / 0.9), oklch(56% 0.13 150 / 0.9))",
                boxShadow: "0 0 14px oklch(48% 0.17 260 / 0.35)",
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
                    ? "1px solid oklch(48% 0.17 260 / 0.4)"
                    : "1px solid oklch(84% 0.012 265)",
                  backgroundColor: isGate
                    ? "oklch(48% 0.17 260 / 0.05)"
                    : "oklch(100% 0 0)",
                  boxShadow: isGate
                    ? "0 4px 24px oklch(48% 0.17 260 / 0.08)"
                    : "none",
                }}
              >
                <span className="relative z-20 flex items-center gap-2">
                  {/* Step node — white circle + accent border + blue shadow */}
                  <span
                    className="inline-flex size-9 items-center justify-center rounded-full font-mono text-sm font-bold"
                    style={{
                      border: "1px solid oklch(48% 0.17 260 / 0.4)",
                      backgroundColor: isGate
                        ? "oklch(48% 0.17 260 / 0.1)"
                        : "oklch(100% 0 0)",
                      color: "oklch(48% 0.17 260)",
                      boxShadow: "0 2px 8px oklch(48% 0.17 260 / 0.15)",
                    }}
                  >
                    {`0${i + 1}`}
                  </span>
                  {isGate && (
                    <span
                      className="gate-breathe inline-block size-1.5 rounded-full"
                      style={{ backgroundColor: "oklch(60% 0.16 85)" }}
                      aria-hidden="true"
                    />
                  )}
                </span>
                <h3
                  className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold"
                  style={{ color: "oklch(22% 0.025 265)" }}
                >
                  {t(`howItWorks.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "oklch(45% 0.02 265)" }}>
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
