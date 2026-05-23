import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function HeroSection() {
  const t = await getTranslations();
  const heroAudiences = t.raw("hero.audiences") as string[];

  return (
    <section
      id="product"
      className="relative px-5 pb-24 pt-16 sm:px-8 sm:pt-20"
    >
      {/* Background: single subtle radial, no multi-gradient AI slop */}
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[600px]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 20% 0%, oklch(72% 0.14 258 / 0.12), transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl">
        {/* Badge */}
        <div className="mb-10 inline-flex items-center gap-3 rounded-full px-4 py-2 text-xs"
          style={{
            border: "1px solid oklch(26% 0.022 265)",
            backgroundColor: "oklch(17% 0.018 265)",
          }}
        >
          <span
            className="rounded-full px-2 py-0.5 font-bold uppercase tracking-widest"
            style={{
              backgroundColor: "oklch(78% 0.13 195 / 0.15)",
              color: "oklch(78% 0.13 195)",
              fontSize: "0.6rem",
            }}
          >
            {t("hero.badge")}
          </span>
          <span style={{ color: "oklch(65% 0.025 265)" }}>{t("hero.badgeText")}</span>
        </div>

        <div className="grid gap-16 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
          {/* Left col */}
          <div>
            <p
              className="mb-5 text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: "oklch(65% 0.06 258)" }}
            >
              {t("hero.eyebrow")}
            </p>
            <h1
              className="font-[family-name:var(--font-display)] text-5xl font-extrabold tracking-[-0.04em] sm:text-6xl xl:text-7xl"
              style={{ color: "oklch(95% 0.015 265)", lineHeight: "1.02" }}
            >
              {t("hero.headline")}
            </h1>
            <p
              className="mt-6 max-w-2xl text-lg leading-8"
              style={{ color: "oklch(72% 0.025 265)" }}
            >
              {t("hero.subheadline")}
            </p>

            <p
              className="mt-5 max-w-2xl border-l-2 pl-4 font-[family-name:var(--font-display)] text-base italic leading-7"
              style={{
                borderColor: "oklch(72% 0.14 258)",
                color: "oklch(88% 0.025 265)",
              }}
            >
              {t("hero.operatingPrinciple")}
            </p>

            {/* Audience tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {heroAudiences.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1.5 text-sm font-medium"
                  style={{
                    border: "1px solid oklch(26% 0.022 265)",
                    backgroundColor: "oklch(17% 0.018 265)",
                    color: "oklch(78% 0.03 265)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="https://app.sprintable.ai/login"
                className="inline-flex items-center justify-center rounded-[var(--radius)] px-6 py-3.5 text-sm font-semibold transition"
                style={{
                  backgroundColor: "oklch(72% 0.14 258)",
                  color: "oklch(18% 0.06 258)",
                  boxShadow: "0 8px 32px oklch(72% 0.14 258 / 0.22)",
                }}
              >
                {t("hero.primaryCta")}
              </a>
              <a
                href="https://github.com/moonklabs/sprintable"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-[var(--radius)] px-6 py-3.5 text-sm font-medium transition"
                style={{
                  border: "1px solid oklch(26% 0.022 265)",
                  backgroundColor: "oklch(17% 0.018 265)",
                  color: "oklch(82% 0.025 265)",
                }}
              >
                {t("hero.secondaryCta")}
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-[var(--radius)] px-6 py-3.5 text-sm font-medium transition"
                style={{ color: "oklch(65% 0.025 265)" }}
              >
                {t("hero.pricingCta")} →
              </a>
            </div>
          </div>

          {/* Right col — Chat UI screenshot (AC1: Hero visual) */}
          <div className="relative">
            <div
              className="overflow-hidden rounded-2xl"
              style={{ border: "1px solid oklch(26% 0.022 265)" }}
            >
              <Image
                src="/screenshots/12-dashboard-activity.png"
                alt="Sprintable dashboard — command center with sprint status and live activity feed"
                width={960}
                height={600}
                className="w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
