import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function HeroSection() {
  const t = await getTranslations();
  const heroAudiences = t.raw("hero.audiences") as string[];

  return (
    <section id="product" className="relative px-5 pb-24 pt-16 sm:px-8 sm:pt-20">
      {/* Background radial — wider, centered, more subtle (D-HR-7) */}
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[800px]"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% 0%, oklch(72% 0.14 258 / 0.08), transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl">
        {/* Hero text — single column, max-w-4xl */}
        <div className="max-w-4xl">
          {/* BETA 배지 단순화 (D-HR-1) */}
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-tight"
            style={{
              border: "1px solid oklch(72% 0.14 258 / 0.3)",
              backgroundColor: "oklch(72% 0.14 258 / 0.08)",
              color: "oklch(78% 0.13 258)",
            }}
          >
            <span className="font-bold uppercase tracking-widest">{t("hero.badge")}</span>
            <span style={{ opacity: 0.6 }}>·</span>
            <span>{t("hero.badgeActive")}</span>
          </div>

          {/* eyebrow 제거 (D-HR-2) */}

          {/* Headline */}
          <h1
            className="font-[family-name:var(--font-display)] text-5xl font-extrabold tracking-[-0.04em] sm:text-6xl xl:text-7xl"
            style={{ color: "oklch(95% 0.015 265)", lineHeight: "1.02" }}
          >
            {t("hero.headline")}
          </h1>

          {/* Subheadline */}
          <p
            className="mt-6 max-w-3xl text-lg leading-8"
            style={{ color: "oklch(72% 0.025 265)" }}
          >
            {t("hero.subheadline")}
          </p>

          {/* Audiences inline (D-HR-3) */}
          <p
            className="mt-3 max-w-3xl text-sm tracking-tight"
            style={{ color: "oklch(65% 0.025 265)" }}
          >
            {heroAudiences.join(" · ")}{t("hero.audiencesFor")}.
          </p>

          {/* CTA 2개 (D-HR-4 — 요금제 CTA 삭제) */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="https://app.sprintable.ai/login"
              className="group inline-flex items-center gap-2 rounded-[var(--radius)] px-7 py-3.5 text-sm font-semibold transition"
              style={{
                backgroundColor: "oklch(72% 0.14 258)",
                color: "oklch(18% 0.06 258)",
                boxShadow: "0 8px 32px oklch(72% 0.14 258 / 0.22)",
              }}
            >
              {t("hero.primaryCta")}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="https://github.com/moonklabs/sprintable"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[var(--radius)] px-7 py-3.5 text-sm font-medium transition"
              style={{
                border: "1px solid oklch(26% 0.022 265)",
                backgroundColor: "oklch(17% 0.018 265)",
                color: "oklch(82% 0.025 265)",
              }}
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              {t("hero.secondaryCta")}
            </a>
          </div>
        </div>

        {/* Spacer */}
        <div className="mt-16 sm:mt-20" />

        {/* Screenshot full-width with brand glow (D-HR-5) */}
        <div className="relative mx-auto max-w-7xl">
          {/* brand glow */}
          <div
            className="absolute inset-x-12 -bottom-6 -top-6 -z-10 rounded-[2rem] opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 50%, oklch(72% 0.14 258 / 0.25), transparent)",
            }}
          />
          <div
            className="overflow-hidden rounded-2xl"
            style={{
              border: "1px solid oklch(26% 0.022 265)",
              boxShadow: "0 24px 64px oklch(13% 0.015 265 / 0.6)",
            }}
          >
            <Image
              src="/screenshots/12-dashboard-activity.png"
              alt="Sprintable dashboard — command center with sprint status and live activity feed"
              width={1920}
              height={1200}
              className="w-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Subtle divider */}
        <div
          className="mx-auto my-16 max-w-3xl border-t sm:my-20"
          style={{ borderColor: "oklch(26% 0.022 265)" }}
        />

        {/* Operating Principle — 스크린샷 아래 spotlight (D-HR-6) */}
        <p
          className="mx-auto max-w-3xl border-l-2 pl-6 font-[family-name:var(--font-display)] text-lg italic leading-relaxed"
          style={{
            borderColor: "oklch(72% 0.14 258)",
            color: "oklch(88% 0.025 265)",
          }}
        >
          {t("hero.operatingPrinciple")}
        </p>
      </div>
    </section>
  );
}
