import { getTranslations } from "next-intl/server";

export async function TrustSection() {
  const t = await getTranslations();

  return (
    <section id="trust" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]"
          style={{ color: "oklch(65% 0.06 258)" }}
        >
          {t("trust.label")}
        </p>
        <h2
          className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
          style={{ color: "oklch(93% 0.02 265)" }}
        >
          {t("trust.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7" style={{ color: "oklch(65% 0.025 265)" }}>
          {t("trust.subtitle")}
        </p>

        <div
          className="mx-auto mt-10 max-w-xl rounded-2xl p-8 text-left"
          style={{ border: "1px solid oklch(26% 0.022 265)", backgroundColor: "oklch(17% 0.018 265)" }}
        >
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold" style={{ color: "oklch(93% 0.02 265)" }}>
            {t("trust.card.title")}
          </h3>
          <p className="mt-3 text-sm leading-7" style={{ color: "oklch(65% 0.025 265)" }}>
            {t("trust.card.desc")}
          </p>
        </div>
      </div>
    </section>
  );
}
