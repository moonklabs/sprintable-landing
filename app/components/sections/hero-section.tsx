import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { GitBranch, Plug, Code, Shield, Server } from "lucide-react";
import { VerifiedSealCard } from "../ui/verified-seal-card";
import { CommandChip } from "../ui/command-chip";
import { ScrollReveal } from "../motion/scroll-reveal";
import { Parallax } from "../motion/parallax";
import { Guilloche } from "../brand/guilloche";

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
    /* isolate — 네거티브 z 오브가 페이지 래퍼의 불투명 배경 뒤로 빠지지 않도록 스태킹 컨텍스트 고정 */
    <section id="product" className="relative isolate px-5 pb-24 pt-16 sm:px-8 sm:pt-20">
      {/* Aurora mesh — 3 explicit orbs: periwinkle left-top, sky right-top, mint bottom-center.
          Stronger chroma + higher alpha + 100px+ blur → visible pastel gradient on white canvas. */}
      <div
        aria-hidden="true"
        className="aurora-orb pointer-events-none absolute -z-10 h-[620px] w-[620px] rounded-full"
        style={{
          top: "-80px",
          left: "-96px",
          background: "radial-gradient(circle, oklch(85% 0.09 260 / 0.7), transparent 65%)",
          filter: "blur(100px)",
        }}
      />
      <div
        aria-hidden="true"
        className="aurora-orb aurora-orb--late pointer-events-none absolute -z-10 h-[580px] w-[580px] rounded-full"
        style={{
          top: "-32px",
          right: "-64px",
          background: "radial-gradient(circle, oklch(89% 0.06 220 / 0.6), transparent 65%)",
          filter: "blur(100px)",
        }}
      />
      <div
        aria-hidden="true"
        className="aurora-orb pointer-events-none absolute -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full"
        style={{
          bottom: "-80px",
          left: "50%",
          background: "radial-gradient(circle, oklch(90% 0.07 185 / 0.5), transparent 65%)",
          filter: "blur(120px)",
          animationDelay: "-5s",
        }}
      />
      {/* Gold-champagne orb — right-bottom, very subtle warm accent balancing ivory canvas */}
      <div
        aria-hidden="true"
        className="aurora-orb aurora-orb--late pointer-events-none absolute -z-10 h-[500px] w-[500px] rounded-full"
        style={{
          bottom: "-40px",
          right: "-60px",
          background: "radial-gradient(circle, oklch(88% 0.065 80 / 0.45), transparent 65%)",
          filter: "blur(110px)",
          animationDelay: "-12s",
        }}
      />
      {/* Guilloche watermark — right-side certificate texture, opacity 0.05 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2 opacity-[0.05] lg:opacity-[0.06]"
        style={{ color: "oklch(48% 0.17 260)" }}
      >
        <Guilloche className="h-full w-full" waveCount={14} />
      </div>
      {/* Dot grid — strong blue dots, fades out toward the fold */}
      <div className="bg-grid-dots absolute inset-x-0 top-0 -z-10 h-[640px]" aria-hidden="true" />
      {/* Film grain — light paper texture, scoped to hero */}
      <div className="grain-layer -z-10" aria-hidden="true" />

      <div className="mx-auto max-w-7xl">
        {/* Hero grid — text left, verified seal card right */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="min-w-0 max-w-2xl">
          {/* BETA badge */}
          <ScrollReveal delay={0}>
            <div
              className="mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-tight"
              style={{
                border: "1px solid oklch(48% 0.17 260 / 0.3)",
                backgroundColor: "oklch(48% 0.17 260 / 0.07)",
                color: "oklch(42% 0.17 260)",
              }}
            >
              <span
                className="relative flex h-1.5 w-1.5"
                aria-hidden="true"
              >
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ backgroundColor: "oklch(48% 0.17 260)" }}
                />
                <span
                  className="relative inline-flex h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: "oklch(48% 0.17 260)" }}
                />
              </span>
              <span className="font-bold uppercase tracking-widest">{t("hero.badge")}</span>
              <span style={{ opacity: 0.6 }}>·</span>
              <span>{t("hero.badgeActive")}</span>
            </div>
          </ScrollReveal>

          {/* Headline — ink color; <g> highlighted word gets accent blue + highlighter wash */}
          <ScrollReveal delay={80}>
            <h1
              className="whitespace-pre-line font-[family-name:var(--font-display)] text-5xl font-extrabold tracking-[-0.04em] sm:text-6xl xl:text-7xl"
              style={{ color: "oklch(23% 0.03 262)", lineHeight: "1.02" }}
            >
              {t.rich("hero.headline", {
                g: (chunks) => (
                  /* Editorial serif — EN: Instrument Serif italic / KO: Noto Serif KR 700 upright
                     세리프 체인: 라틴은 Instrument Serif가 받고, 한글은 Noto Serif KR이 받는다. */
                  <span
                    className="relative inline-block pb-1.5"
                    style={{
                      color: "oklch(48% 0.17 260)",
                      fontStyle: locale === "en" ? "italic" : "normal",
                      fontFamily: "var(--font-serif), var(--font-serif-kr), 'Georgia', serif",
                      fontWeight: locale === "ko" ? "700" : undefined,
                      /* 한글 명조는 자간이 넓어 보이므로 획 무게에 맞게 압축 */
                      letterSpacing: locale === "ko" ? "-0.01em" : undefined,
                    }}
                  >
                    {chunks}
                    {/* Hand-drawn brush underline — strokeWidth 2.6 (한글 획 무게에 안 눌리도록) */}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 200 8"
                      preserveAspectRatio="none"
                      className="absolute bottom-0 left-0 h-[6px] w-full"
                    >
                      <path
                        d="M 2,4 C 30,2 60,6 100,4 C 140,2 175,6 198,3"
                        stroke="oklch(48% 0.17 260)"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                ),
              })}
            </h1>
          </ScrollReveal>

          {/* Subheadline */}
          <ScrollReveal delay={160}>
            <p
              className="mt-6 max-w-3xl text-lg leading-8"
              style={{ color: "oklch(44% 0.025 262)" }}
            >
              {t("hero.subheadline")}
            </p>
          </ScrollReveal>

          {/* Stat chips row — white fill + hairline + ink-secondary */}
          <ScrollReveal delay={240}>
            <div className="mt-6 flex flex-wrap gap-2">
              {HERO_STATS.map(({ icon: Icon, labelKey }) => (
                <span
                  key={labelKey}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    border: "1px solid oklch(82% 0.015 85)",
                    backgroundColor: "oklch(100% 0 0)",
                    color: "oklch(44% 0.025 262)",
                  }}
                >
                  <Icon className="size-3" style={{ color: "oklch(48% 0.17 260)" }} aria-hidden="true" />
                  {t(`hero.stats.${labelKey}`)}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* Trust strip — verified-green check + ink-muted text */}
          <ScrollReveal delay={300}>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: "oklch(57% 0.015 265)" }}>
              {heroTrustStrip.map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span style={{ color: "oklch(56% 0.13 150)" }}>✓</span> {item}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* CTA buttons + OSS command chip */}
          <ScrollReveal delay={360}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                type="button"
                data-waitlist-cta
                data-waitlist-source="hero"
                className="btn-glow glass-btn group inline-flex items-center gap-2 rounded-[var(--radius)] px-7 py-3.5 text-sm font-semibold"
                style={{
                  backgroundColor: "oklch(48% 0.17 260)",
                  color: "oklch(100% 0 0)",
                  boxShadow: "0 1px 2px oklch(23% 0.1 260 / 0.2), 0 8px 24px -6px oklch(48% 0.17 260 / 0.45)",
                }}
              >
                {t("hero.primaryCta")}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </button>
              <a
                href="https://github.com/moonklabs/sprintable"
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift inline-flex items-center gap-2 rounded-[var(--radius)] px-7 py-3.5 text-sm font-medium"
                style={{
                  border: "1px solid oklch(82% 0.015 85)",
                  backgroundColor: "oklch(100% 0 0)",
                  color: "oklch(44% 0.025 262)",
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
              <span className="text-xs" style={{ color: "oklch(57% 0.015 265)" }}>
                {t("hero.commandHint")}
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* Verified seal card — white certificate card with accent blue stamp */}
        <ScrollReveal delay={200} direction="right" className="w-full min-w-0 max-w-xl lg:ml-auto">
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

        {/* Dashboard screenshot — light browser chrome frames dark app for contrast */}
        <ScrollReveal direction="none">
          <Parallax speed={-0.05}>
            <div className="tilt-in relative isolate mx-auto max-w-7xl">
              {/* Brand glow — strengthened so screenshot visually lifts off the canvas */}
              <div
                className="absolute inset-x-8 -bottom-10 -top-10 -z-10 rounded-[2rem] opacity-70 blur-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse 85% 55% at 50% 50%, oklch(48% 0.17 260 / 0.22), transparent)",
                }}
              />
              {/* Mat frame — ivory mounting + serif caption, gallery-of-evidence aesthetic */}
              <div
                className="corner-ticks relative rounded-2xl"
                style={{
                  border: "1px solid oklch(82% 0.015 85)",
                  boxShadow: "0 4px 16px oklch(30% 0.08 262 / 0.12), 0 32px 80px -16px oklch(38% 0.14 260 / 0.38)",
                  background: "oklch(98.6% 0.005 85)",
                  padding: "14px 14px 10px",
                }}
              >
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={dashboardShot}
                    alt="Sprintable dashboard — command center with sprint status and live activity feed"
                    width={1920}
                    height={1200}
                    className="w-full object-cover"
                    priority
                  />
                </div>
                {/* Serif caption — EN: Instrument Serif italic / KO: Noto Serif KR 600 upright */}
                <p
                  className="pb-0.5 pt-3 text-center text-xs leading-none"
                  style={{
                    fontFamily: "var(--font-serif), var(--font-serif-kr), 'Georgia', serif",
                    fontStyle: locale === "en" ? "italic" : "normal",
                    fontWeight: locale === "ko" ? "600" : undefined,
                    color: "oklch(44% 0.025 262)",
                    letterSpacing: locale === "ko" ? "-0.01em" : "0.02em",
                  }}
                >
                  {locale === "ko"
                    ? "Sprintable — AI 검증 프로젝트 인텔리전스"
                    : "Sprintable — Verified Project Intelligence"}
                </p>
              </div>
            </div>
          </Parallax>
        </ScrollReveal>

        {/* Measure rule — hairline with center registration tick */}
        <div className="rule-ticks mx-auto my-16 max-w-3xl sm:my-20" aria-hidden="true" />

        {/* Operating Principle — accent border-left quote */}
        <ScrollReveal>
          {/* EN: Instrument Serif italic / KO: Noto Serif KR 600 upright — 합성 오블리크 금지 */}
          <p
            className="mx-auto max-w-3xl border-l-2 pl-6 text-lg leading-relaxed"
            style={{
              fontFamily: "var(--font-serif), var(--font-serif-kr), 'Georgia', serif",
              fontStyle: locale === "en" ? "italic" : "normal",
              fontWeight: locale === "ko" ? "600" : undefined,
              letterSpacing: locale === "ko" ? "-0.01em" : undefined,
              borderColor: "oklch(48% 0.17 260)",
              color: "oklch(44% 0.025 262)",
            }}
          >
            {t("hero.operatingPrinciple")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
