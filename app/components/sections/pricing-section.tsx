import { Check, Minus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Spotlight } from "../ui/spotlight";

type Plan = { name: string; price: string; period: string; audience: string; features: string[]; note?: string };
type Row = { label: string; has: boolean[] };

/* 요금제 — 플랜, 가격, 기능 내용은 원본 그대로. 구조만 바꿨다:
   추천 플랜을 띄운 카드 3개 + 같은 내용을 한 표로 모은 비교표 */
export async function PricingSection() {
  const t = await getTranslations();
  const plans = t.raw("pricing.plans") as Plan[];
  const rows = t.raw("pricingMatrix.rows") as Row[];
  const hasNotes = plans.some((p) => p.note); // 영어는 원화 청구 안내 줄이 있어 다른 플랜도 같은 높이를 확보한다

  return (
    <section id="pricing" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">{t("pricing.title")}</h2>
            <p className="mt-4 text-lg leading-8 text-muted">{t("pricing.subtitle")}</p>
          </div>
          <p className="w-fit rounded-full border border-line bg-white px-3.5 py-1.5 text-sm text-ink">
            {t("pricing.annualDiscount")}
          </p>
        </div>

        <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, i) => {
            const featured = i === 2;
            return (
              <Spotlight
                key={plan.name}
                tilt={featured ? 2.5 : 2}
                radius={320}
                color={featured ? "oklch(100% 0 0 / 0.12)" : "oklch(50% 0.17 255 / 0.08)"}
                className={`flex flex-col rounded-2xl border p-7 ${
                  featured
                    ? "border-ink bg-ink text-white shadow-[0_40px_80px_-36px_oklch(20%_0.03_265/0.6)] xl:-my-3 xl:py-10"
                    : "border-line bg-white"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-xl font-medium tracking-[-0.02em]">{plan.name}</h3>
                  {featured && (
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-ink">{t("pricing.popular")}</span>
                  )}
                </div>
                <p className={`mt-1 text-sm ${featured ? "text-white/65" : "text-muted"}`}>{plan.audience}</p>
                <p className="mt-6 flex flex-wrap items-end gap-x-1.5">
                  <span className="text-4xl font-medium tracking-[-0.04em] tabular-nums">{plan.price}</span>
                  {plan.period && <span className={`mb-1 whitespace-nowrap text-sm ${featured ? "text-white/55" : "text-faint"}`}>{plan.period}</span>}
                </p>
                {hasNotes && (
                  <p className={`mt-1 min-h-4 text-xs ${featured ? "text-white/55" : "text-faint"}`}>{plan.note ?? ""}</p>
                )}

                <ul className="mt-7 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2.5 border-t py-2.5 text-sm leading-6 ${
                        featured ? "border-white/15 text-white/90" : "border-line text-ink"
                      }`}
                    >
                      <Check className={`mt-1 size-4 shrink-0 ${featured ? "text-white/70" : "text-ok"}`} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={i === plans.length - 1 ? "mailto:dev1@moonklabs.com" : "https://app.sprintable.ai/login"}
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition ${
                    featured ? "bg-white text-ink hover:bg-paper-2" : "border border-line bg-white text-ink hover:bg-paper-2"
                  }`}
                >
                  {i === 0 ? t("pricing.startFree") : i === plans.length - 1 ? t("pricing.contactSales") : t("pricing.startTrial")}
                </a>
              </Spotlight>
            );
          })}
        </div>

        {/* 같은 내용을 한 표로 모은 비교표 */}
        <div className="mt-20">
          <h3 className="text-2xl font-medium tracking-[-0.03em] text-ink sm:text-3xl">{t("pricingMatrix.title")}</h3>
          <p className="mt-2 text-[15px] text-muted">{t("pricingMatrix.subtitle")}</p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className="w-[36%] pb-4" />
                  {plans.map((plan, i) => (
                    <th
                      key={plan.name}
                      scope="col"
                      className={`pb-4 pt-5 text-center align-bottom font-medium ${i === 2 ? "rounded-t-xl bg-[oklch(96%_0.015_255)]" : ""}`}
                    >
                      <span className="block text-base text-ink">{plan.name}</span>
                      <span className="block text-sm font-normal tabular-nums text-muted">
                        {plan.price}
                        {plan.period}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={row.label} className="border-t border-line">
                    <th scope="row" className="py-3.5 pr-4 font-normal text-ink">
                      {row.label}
                    </th>
                    {row.has.map((included, ci) => (
                      <td
                        key={plans[ci]?.name ?? ci}
                        className={`py-3.5 text-center ${ci === 2 ? "bg-[oklch(96%_0.015_255)]" : ""} ${
                          ci === 2 && ri === rows.length - 1 ? "rounded-b-xl" : ""
                        }`}
                      >
                        {included ? (
                          <Check className="mx-auto size-4 text-ok" aria-label="included" />
                        ) : (
                          <Minus className="mx-auto size-4 text-[oklch(80%_0.005_265)]" aria-label="not included" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-8 text-xs leading-6 text-faint">{t("pricing.footnote")}</p>
      </div>
    </section>
  );
}
