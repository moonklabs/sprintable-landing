import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { GitBranch, Plug, Code, Shield, Server } from "lucide-react";
import { VerifiedSealCard } from "../ui/verified-seal-card";
import { CommandChip } from "../ui/command-chip";
import { ScrollReveal } from "../motion/scroll-reveal";
import { Parallax } from "../motion/parallax";

const HERO_STATS = [
  { icon: GitBranch, labelKey: 'stat1' },
  { icon: Plug, labelKey: 'stat2' },
  { icon: Code, labelKey: 'stat3' },
  { icon: Shield, labelKey: 'stat4' },
  { icon: Server, labelKey: 'stat5' },
] as const;

export async function HeroSection() {
  const t = await getTranslations();
  const locale = await getLocale();
  const heroTrustStrip = t.raw("hero.trustStrip") as string[];
  const dashboardShot = locale === "en" ? "/screenshots/12-dashboard-activity-en.png" : "/screenshots/12-dashboard-activity.png";

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
      {/* Dot grid — fades out toward the fold */}
      <div className="bg-grid-dots absolute inset-x-0 top-0 -z-10 h-[640px]" aria-hidden="true" />
      {/* Aurora orbs — parallax at different depths for a layered backdrop */}
      <Parallax speed={0.18} className="absolute left-[8%] top-24 -z-10 hidden lg:block">
        <div
          aria-hidden="true"
          className="aurora-orb h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(72% 0.14 258 / 0.14), transparent 70%)" }}
        />
      </Parallax>
      <Parallax speed={0.1} className="absolute right-[4%] top-64 -z-10 hidden lg:block">
        <div
          aria-hidden="true"
          className="aurora-orb aurora-orb--late h-96 w-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(78% 0.13 195 / 0.1), transparent 70%)" }}
        />
      </Parallax>

      <div className="mx-auto max-w-7xl">
        {/* Hero grid — text left, verified seal card right */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="max-w-2xl">
          {/* BETA 배지 단순화 (D-HR-1) */}
          <ScrollReveal delay={0}>
            <div
              className="mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-tight"
              style={{
                border: "1px solid oklch(72% 0.14 258 / 0.3)",
                backgroundColor: "oklch(72% 0.14 258 / 0.08)",
                color: "oklch(78% 0.13 258)",
              }}
            >
              <span
                className="relative flex h-1.5 w-1.5"
                aria-hidden="true"
              >
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ backgroundColor: "oklch(78% 0.13 258)" }}
                />
                <span
                  className="relative inline-flex h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: "oklch(78% 0.13 258)" }}
                />
              </span>
              <span className="font-bold uppercase tracking-widest">{t("hero.badge")}</span>
              <span style={{ opacity: 0.6 }}>·</span>
              <span>{t("hero.badgeActive")}</span>
            </div>
          </ScrollReveal>

          {/* Headline — Claimed vs Verified 단일 후킹(경쟁 무점유 니치), <g> 구간만 브랜드 그라디언트 */}
          <ScrollReveal delay={80}>
            <h1
              className="whitespace-pre-line font-[family-name:var(--font-display)] text-5xl font-extrabold tracking-[-0.04em] sm:text-6xl xl:text-7xl"
              style={{ color: "oklch(95% 0.015 265)", lineHeight: "1.02" }}
            >
              {t.rich("hero.headline", {
                g: (chunks) => (
                  <span
                    style={{
                      background: "linear-gradient(90deg, oklch(80% 0.1 258), oklch(72% 0.14 258))",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {chunks}
                  </span>
                ),
              })}
            </h1>
          </ScrollReveal>

          {/* Subheadline */}
          <ScrollReveal delay={160}>
            <p
              className="mt-6 max-w-3xl text-lg leading-8"
              style={{ color: "oklch(72% 0.025 265)" }}
            >
              {t("hero.subheadline")}
            </p>
          </ScrollReveal>

          {/* Stat chips row (A2A3) */}
          <ScrollReveal delay={240}>
            <div className="mt-6 flex flex-wrap gap-2">
              {HERO_STATS.map(({ icon: Icon, labelKey }) => (
                <span
                  key={labelKey}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    border: "1px solid oklch(26% 0.022 265)",
                    backgroundColor: "oklch(17% 0.018 265)",
                    color: "oklch(82% 0.025 265)",
                  }}
                >
                  <Icon className="size-3" style={{ color: "oklch(78% 0.13 258)" }} aria-hidden="true" />
                  {t(`hero.stats.${labelKey}`)}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* Trust strip — Task→Trust 포지셔닝의 3개 증거점 */}
          <ScrollReveal delay={300}>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: "oklch(65% 0.025 265)" }}>
              {heroTrustStrip.map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span style={{ color: "oklch(70% 0.15 145)" }}>✓</span> {item}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* CTA 2개 + OSS 실행 오브젝트(복사 가능한 셀프호스트 커맨드) */}
          <ScrollReveal delay={360}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="https://app.sprintable.ai/login"
                className="btn-glow group inline-flex items-center gap-2 rounded-[var(--radius)] px-7 py-3.5 text-sm font-semibold"
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
                className="card-lift inline-flex items-center gap-2 rounded-[var(--radius)] px-7 py-3.5 text-sm font-medium"
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
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <CommandChip command={t("hero.command")} copiedLabel={t("hero.commandCopied")} />
              <span className="text-xs" style={{ color: "oklch(55% 0.02 265)" }}>
                {t("hero.commandHint")}
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* Verified seal card — 제품의 핵심 약속(Claimed → Verified)을 증빙으로 */}
        <ScrollReveal delay={200} direction="right" className="w-full max-w-xl lg:ml-auto">
          <VerifiedSealCard
            title={t("hero.seal.title")}
            labels={{
              claim: t("hero.seal.claim"),
              verified: t("hero.seal.verified"),
              gate: t("hero.seal.gate"),
            }}
            animatedRow={{
              text: t("hero.seal.row1"),
              metaClaim: t("hero.seal.row1MetaClaim"),
              metaVerified: t("hero.seal.row1MetaVerified"),
            }}
            gateRow={{ text: t("hero.seal.row2"), meta: t("hero.seal.row2Meta") }}
            doneRow={{ text: t("hero.seal.row3"), meta: t("hero.seal.row3Meta") }}
          />
        </ScrollReveal>

        </div>{/* end grid */}

        {/* Spacer */}
        <div className="mt-16 sm:mt-20" />

        {/* Screenshot full-width with brand glow (D-HR-5) — counter-scroll parallax for depth */}
        <ScrollReveal direction="scale">
          <Parallax speed={-0.05}>
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
                className="shimmer-frame overflow-hidden rounded-2xl"
                style={{
                  border: "1px solid oklch(26% 0.022 265)",
                  boxShadow: "0 24px 64px oklch(13% 0.015 265 / 0.6)",
                }}
              >
                <Image
                  src={dashboardShot}
                  alt="Sprintable dashboard — command center with sprint status and live activity feed"
                  width={1920}
                  height={1200}
                  className="w-full object-cover"
                  priority
                />
              </div>
            </div>
          </Parallax>
        </ScrollReveal>

        {/* Subtle divider */}
        <div
          className="mx-auto my-16 max-w-3xl border-t sm:my-20"
          style={{ borderColor: "oklch(26% 0.022 265)" }}
        />

        {/* Operating Principle — 스크린샷 아래 spotlight (D-HR-6) */}
        <ScrollReveal>
          <p
            className="mx-auto max-w-3xl border-l-2 pl-6 font-[family-name:var(--font-display)] text-lg italic leading-relaxed"
            style={{
              borderColor: "oklch(72% 0.14 258)",
              color: "oklch(88% 0.025 265)",
            }}
          >
            {t("hero.operatingPrinciple")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
