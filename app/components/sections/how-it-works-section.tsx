import { getTranslations } from "next-intl/server";

const WORKFLOW_STEPS = [
  { num: '1', labelKey: 'label1', textKey: 'text1' },
  { num: '2', labelKey: 'label2', textKey: 'text2' },
  { num: '3', labelKey: 'label3', textKey: 'text3' },
  { num: '4', labelKey: 'label4', textKey: 'text4' },
  { num: '5', labelKey: 'label5', textKey: 'text5' },
] as const;

export async function HowItWorksSection() {
  const t = await getTranslations();

  return (
    <section
      id="how-it-works"
      className="px-5 py-20 sm:px-8 sm:py-28"
      style={{ backgroundColor: "oklch(15% 0.016 265)" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <span
            className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: "oklch(72% 0.14 258 / 0.12)",
              color: "oklch(78% 0.13 258)",
            }}
          >
            {t("howItWorks.eyebrow")}
          </span>
          <h2
            className="mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
            style={{ color: "oklch(93% 0.02 265)" }}
          >
            {t("howItWorks.title")}
          </h2>
        </div>

        {/* Horizontal flow */}
        <div className="flex flex-col items-stretch gap-6 lg:flex-row lg:items-center lg:justify-between">
          {WORKFLOW_STEPS.map((step, idx) => (
            <div key={step.num} className="flex items-center gap-4 lg:flex-col lg:items-center lg:gap-3 lg:text-center">
              <div className="flex items-center gap-3 lg:flex-col lg:items-center lg:gap-3">
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-display)] text-base font-bold"
                  style={{
                    backgroundColor: "oklch(72% 0.14 258 / 0.15)",
                    border: "1px solid oklch(72% 0.14 258 / 0.4)",
                    color: "oklch(78% 0.13 258)",
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "oklch(92% 0.025 265)" }}>
                    {t(`howItWorks.steps.${step.labelKey}`)}
                  </p>
                  <p className="text-xs" style={{ color: "oklch(65% 0.025 265)" }}>
                    {t(`howItWorks.steps.${step.textKey}`)}
                  </p>
                </div>
              </div>
              {idx < WORKFLOW_STEPS.length - 1 && (
                <span
                  className="hidden text-lg lg:block"
                  style={{ color: "oklch(72% 0.14 258 / 0.4)" }}
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Manifesto quote */}
        <p
          className="mx-auto mt-14 max-w-2xl text-center text-sm italic leading-7"
          style={{ color: "oklch(65% 0.025 265)" }}
        >
          {t("howItWorks.quote")}
        </p>
      </div>
    </section>
  );
}
