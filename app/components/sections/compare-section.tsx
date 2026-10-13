import { getTranslations } from "next-intl/server";
import { Spotlight } from "../ui/spotlight";

/* 에이전트만 돌릴 때 vs Sprintable — 같은 행에서 왼쪽 문제, 오른쪽 해결을 짝지어 읽게 한다 */
export async function CompareSection() {
  const t = await getTranslations("compare");
  const rows = t.raw("rows") as { l: string; r: string }[];

  return (
    <section id="trust" className="bg-paper-2 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">{t("title")}</h2>
          <p className="mt-4 text-lg leading-8 text-muted">{t("subtitle")}</p>
        </div>

        <Spotlight
          radius={380}
          className="mt-12 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_70px_-40px_oklch(30%_0.04_265/0.35)]"
        >
          <div className="grid grid-cols-2 border-b border-line text-sm font-medium">
            <p className="px-5 py-4 text-faint sm:px-7">{t("left")}</p>
            <p className="border-l border-line bg-[oklch(97.5%_0.012_255)] px-5 py-4 text-ink sm:px-7">{t("right")}</p>
          </div>
          {rows.map((row) => (
            <div key={row.l} className="grid grid-cols-2 border-b border-line last:border-b-0">
              <p className="flex gap-3 px-5 py-5 text-[15px] leading-6 text-faint sm:px-7 sm:py-6">
                <span aria-hidden="true" className="mt-0.5 shrink-0 text-faint">
                  &minus;
                </span>
                {row.l}
              </p>
              <p className="flex gap-3 border-l border-line bg-[oklch(97.5%_0.012_255)] px-5 py-5 text-[15px] font-medium leading-6 text-ink sm:px-7 sm:py-6">
                <span aria-hidden="true" className="mt-0.5 shrink-0 text-ok">
                  &#10003;
                </span>
                {row.r}
              </p>
            </div>
          ))}
        </Spotlight>
      </div>
    </section>
  );
}
