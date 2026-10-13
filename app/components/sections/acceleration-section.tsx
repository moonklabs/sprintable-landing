import { getTranslations } from "next-intl/server";
import { Spotlight } from "../ui/spotlight";

const FEED = [
  { key: "closed", tone: "text-ok" },
  { key: "measuring", tone: "text-brand" },
  { key: "stalled", tone: "text-warn" },
] as const;

/* 목표 → 가설 → 스토리 → 검증 → 학습이 다시 가설로 돌아오는 루프를 도식으로 보여주고, 아래에 실제 피드를 둔다 */
export async function AccelerationSection() {
  const t = await getTranslations();
  const loop = t.raw("acceleration.loop") as string[];

  return (
    <section id="acceleration" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-x-16 gap-y-4 lg:grid-cols-2 lg:items-end">
          <h2 className="text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">{t("acceleration.title")}</h2>
          <p className="max-w-md text-lg leading-8 text-muted">{t("acceleration.subtitle")}</p>
        </div>

        {/* 루프 도식 */}
        <div className="relative mt-14">
          <div aria-hidden="true" className="absolute left-0 right-0 top-[1.4rem] hidden h-px bg-line md:block" />
          <div
            aria-hidden="true"
            className="loop-pulse absolute top-[1.4rem] hidden h-px w-24 bg-gradient-to-r from-transparent via-brand to-transparent md:block"
          />
          <ol className="relative grid gap-4 md:grid-cols-5">
            {loop.map((label, i) => (
              <li key={label} className="group flex items-center gap-4 md:flex-col md:items-start md:gap-3">
                <span
                  className={`relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border bg-white text-sm font-medium tabular-nums transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_24px_-10px_oklch(50%_0.17_255/0.5)] ${
                    i === loop.length - 2 ? "border-ok text-ok" : "border-line text-ink group-hover:border-brand"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-base font-medium tracking-[-0.01em] text-ink">{label}</span>
              </li>
            ))}
          </ol>
          <p aria-hidden="true" className="mt-4 hidden text-right text-sm text-faint md:block">
            &#8635; {loop[4]} &rarr; {loop[1]}
          </p>
        </div>

        {/* 실제 루프 피드 */}
        <div className="mt-12 grid gap-x-16 gap-y-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <Spotlight
            radius={360}
            className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_24px_60px_-34px_oklch(30%_0.04_265/0.35)]"
          >
            <ol>
              {FEED.map(({ key, tone }) => (
                <li key={key} className="border-b border-line px-5 py-4 last:border-b-0">
                  <div className="flex items-center gap-4 text-[15px]">
                    <span className={`w-24 shrink-0 text-xs font-medium ${tone}`}>{t(`acceleration.feed.${key}Title`)}</span>
                    <span className="min-w-0 flex-1 text-ink">{t(`acceleration.feed.${key}Row`)}</span>
                    <span className="shrink-0 text-xs tabular-nums text-faint">{t(`acceleration.feed.${key}Meta`)}</span>
                  </div>
                  {key === "closed" && <p className="mt-2 pl-28 text-sm text-muted">{t("acceleration.feed.learned")}</p>}
                </li>
              ))}
            </ol>
          </Spotlight>

          <div className="max-w-md">
            <h3 className="text-xl font-medium tracking-[-0.02em] text-ink">{t("acceleration.card.title")}</h3>
            <p className="mt-2 text-[15px] leading-7 text-muted">{t("acceleration.card.desc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
