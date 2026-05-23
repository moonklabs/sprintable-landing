import Image from "next/image";
import { getTranslations } from "next-intl/server";

const howItWorksImages = [
  '/screenshots/07-settings.png',
  '/screenshots/01-chat-detail.png',
  '/screenshots/09-board-overview.png',
] as const;

export async function HowItWorksSection() {
  const t = await getTranslations();
  const howItWorksSteps = t.raw("howItWorks.steps") as { eyebrow: string; title: string; desc: string; imgAlt: string }[];

  return (
    <section
      id="how-it-works"
      className="px-5 py-20 sm:px-8 sm:py-28"
      style={{ backgroundColor: "oklch(15% 0.016 265)" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "oklch(65% 0.06 258)" }}>
            {t("howItWorks.eyebrow")}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl" style={{ color: "oklch(93% 0.02 265)" }}>
            {t("howItWorks.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7" style={{ color: "oklch(65% 0.025 265)" }}>
            {t("howItWorks.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {howItWorksSteps.map((step, i) => (
            <div key={step.title} className="flex flex-col rounded-2xl overflow-hidden" style={{ border: "1px solid oklch(26% 0.022 265)", backgroundColor: "oklch(13% 0.015 265)" }}>
              <div className="overflow-hidden" style={{ borderBottom: "1px solid oklch(22% 0.018 265)" }}>
                <Image
                  src={howItWorksImages[i] ?? howItWorksImages[0]}
                  alt={step.imgAlt}
                  width={960}
                  height={600}
                  className="w-full object-cover"
                  style={{ maxHeight: 200, objectFit: "cover", objectPosition: "top" }}
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "oklch(78% 0.13 195)", fontSize: "0.65rem" }}>{step.eyebrow}</p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold" style={{ color: "oklch(93% 0.02 265)" }}>{step.title}</h3>
                <p className="mt-2 text-sm leading-7" style={{ color: "oklch(65% 0.025 265)" }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
