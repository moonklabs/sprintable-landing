import { getTranslations } from "next-intl/server";

export async function AccelerationSection() {
  const t = await getTranslations();

  return (
    <section
      id="acceleration"
      className="px-5 py-20 sm:px-8 sm:py-28"
      style={{ backgroundColor: "oklch(15% 0.016 265)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "oklch(65% 0.06 258)" }}
          >
            {t("acceleration.label")}
          </p>
          <h2
            className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
            style={{ color: "oklch(93% 0.02 265)" }}
          >
            {t("acceleration.title")}
          </h2>
          <p className="text-base leading-7" style={{ color: "oklch(65% 0.025 265)" }}>
            {t("acceleration.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-center">
          {/* 조직 가속 loop 데모 — 목업 원 디자인(feed) */}
          <div
            className="space-y-2 rounded-2xl p-4"
            style={{ border: "1px solid oklch(26% 0.022 265)", backgroundColor: "oklch(17% 0.018 265)" }}
          >
            <div
              className="rounded-xl px-3 py-2.5 text-sm"
              style={{ border: "1px solid oklch(22% 0.018 265)", backgroundColor: "oklch(13% 0.015 265)" }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="shrink-0 rounded-full px-2 py-1 text-xs font-bold"
                  style={{ backgroundColor: "oklch(65% 0.15 145 / 15%)", color: "oklch(65% 0.15 145)" }}
                >
                  {t("acceleration.feed.closedTitle")}
                </span>
                <span className="flex-1 truncate" style={{ color: "oklch(65% 0.025 265)" }}>{t("acceleration.feed.closedRow")}</span>
                <span className="shrink-0 text-xs" style={{ color: "oklch(50% 0.02 265)" }}>{t("acceleration.feed.closedMeta")}</span>
              </div>
              <p className="mt-2 pl-2 text-xs" style={{ color: "oklch(55% 0.02 265)" }}>{t("acceleration.feed.learned")}</p>
            </div>
            <div
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
              style={{ border: "1px solid oklch(22% 0.018 265)", backgroundColor: "oklch(13% 0.015 265)" }}
            >
              <span
                className="shrink-0 rounded-full px-2 py-1 text-xs font-bold"
                style={{ backgroundColor: "oklch(65% 0.18 250 / 15%)", color: "oklch(65% 0.18 250)" }}
              >
                {t("acceleration.feed.measuringTitle")}
              </span>
              <span className="flex-1 truncate" style={{ color: "oklch(65% 0.025 265)" }}>{t("acceleration.feed.measuringRow")}</span>
              <span className="shrink-0 text-xs" style={{ color: "oklch(50% 0.02 265)" }}>{t("acceleration.feed.measuringMeta")}</span>
            </div>
            <div
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
              style={{ border: "1px solid oklch(22% 0.018 265)", backgroundColor: "oklch(13% 0.015 265)" }}
            >
              <span
                className="shrink-0 rounded-full px-2 py-1 text-xs font-bold"
                style={{ backgroundColor: "oklch(70% 0.16 85 / 15%)", color: "oklch(70% 0.16 85)" }}
              >
                {t("acceleration.feed.stalledTitle")}
              </span>
              <span className="flex-1 truncate" style={{ color: "oklch(65% 0.025 265)" }}>{t("acceleration.feed.stalledRow")}</span>
              <span className="shrink-0 text-xs" style={{ color: "oklch(50% 0.02 265)" }}>{t("acceleration.feed.stalledMeta")}</span>
            </div>
          </div>

          <div
            className="rounded-2xl p-7"
            style={{ border: "1px solid oklch(26% 0.022 265)", backgroundColor: "oklch(17% 0.018 265)" }}
          >
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold" style={{ color: "oklch(93% 0.02 265)" }}>
              {t("acceleration.card.title")}
            </h3>
            <p className="mt-3 text-sm leading-7" style={{ color: "oklch(65% 0.025 265)" }}>
              {t("acceleration.card.desc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
