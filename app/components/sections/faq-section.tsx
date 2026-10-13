import { Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";

/* 별도 스크립트 없이 <details>로 여닫는다 */
export async function FaqSection() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <section id="faq" className="bg-paper-2 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <h2 className="text-3xl font-medium tracking-[-0.03em] text-ink sm:text-4xl">{t("title")}</h2>
          <a
            href="https://app.sprintable.ai/login"
            className="mt-7 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-[oklch(30%_0.012_265)]"
          >
            {t("cta")}
          </a>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {items.map((item, i) => (
            <details key={item.q} className="group" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[17px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus className="faq-icon size-4 shrink-0 text-muted transition-transform duration-200" aria-hidden="true" />
              </summary>
              <p className="max-w-2xl pb-6 text-[15px] leading-7 text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
