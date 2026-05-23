import Image from "next/image";
import { getTranslations } from "next-intl/server";

const featureImages = [
  '/screenshots/01-chat-detail.png',
  '/screenshots/08-thread-detail.png',
  '/screenshots/04-kanban-board.png',
  '/screenshots/11-epic-detail.png',
  '/screenshots/13-activity-log.png',
  '/screenshots/10-agents.png',
] as const;

export async function FeaturesSection() {
  const t = await getTranslations();
  const featureCards = t.raw("features.cards") as { title: string; desc: string; imgAlt: string }[];

  return (
    <section id="features" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "oklch(65% 0.06 258)" }}>
            {t("features.eyebrow")}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl" style={{ color: "oklch(93% 0.02 265)" }}>
              {t("features.title")}
            </h2>
            <p className="max-w-sm text-sm leading-7 sm:text-right" style={{ color: "oklch(65% 0.025 265)" }}>
              {t("features.subtitle")}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((card, i) => (
            <div key={card.title} className="flex flex-col rounded-2xl overflow-hidden" style={{ border: "1px solid oklch(26% 0.022 265)", backgroundColor: "oklch(17% 0.018 265)" }}>
              <div className="overflow-hidden" style={{ borderBottom: "1px solid oklch(22% 0.018 265)" }}>
                <Image
                  src={featureImages[i] ?? featureImages[0]}
                  alt={card.imgAlt}
                  width={960}
                  height={600}
                  className="w-full object-cover"
                  style={{ maxHeight: 160, objectFit: "cover", objectPosition: "top" }}
                />
              </div>
              <div className="flex-1 p-5">
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold" style={{ color: "oklch(93% 0.02 265)" }}>{card.title}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "oklch(65% 0.025 265)" }}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
