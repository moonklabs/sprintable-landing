import { getTranslations } from "next-intl/server";

export async function OrgOsSection() {
  const t = await getTranslations();

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "oklch(65% 0.06 258)" }}
          >
            {t("orgOs.label")}
          </p>
          <h2
            className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
            style={{ color: "oklch(93% 0.02 265)" }}
          >
            {t("orgOs.title")}
          </h2>
          <p className="mt-4 text-base leading-7" style={{ color: "oklch(65% 0.025 265)" }}>
            {t("orgOs.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div
            className="rounded-2xl p-7"
            style={{ border: "1px solid oklch(26% 0.022 265)", backgroundColor: "oklch(17% 0.018 265)" }}
          >
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold" style={{ color: "oklch(93% 0.02 265)" }}>
              {t("orgOs.card1.title")}
            </h3>
            <p className="mt-3 text-sm leading-7" style={{ color: "oklch(65% 0.025 265)" }}>
              {t("orgOs.card1.desc")}
            </p>
          </div>
          <div
            className="rounded-2xl p-7"
            style={{ border: "1px solid oklch(26% 0.022 265)", backgroundColor: "oklch(17% 0.018 265)" }}
          >
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold" style={{ color: "oklch(93% 0.02 265)" }}>
              {t("orgOs.card2.title")}
            </h3>
            <p className="mt-3 text-sm leading-7" style={{ color: "oklch(65% 0.025 265)" }}>
              {t("orgOs.card2.desc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
