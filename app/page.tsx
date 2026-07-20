import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./components/locale-switcher";
import { NavLinks } from "./components/nav-links";
import { SprintableMarkSvg } from "./components/brand/sprintable-mark-svg";
import { ScrollReveal } from "./components/motion/scroll-reveal";
import { Parallax } from "./components/motion/parallax";
import { HeroSection } from "./components/sections/hero-section";
import { TrustSection } from "./components/sections/trust-section";
import { HowItWorksSection } from "./components/sections/how-it-works-section";
import { FinalCtaSection } from "./components/sections/final-cta-section";

/** Minimal white browser chrome — wraps dark app screenshots for contrast */
function BrowserChrome({ url = "app.sprintable.ai" }: { url?: string }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2"
      style={{
        borderBottom: "1px solid oklch(84% 0.012 265)",
        backgroundColor: "oklch(100% 0 0)",
      }}
    >
      <span className="flex gap-1.5" aria-hidden="true">
        {["oklch(72% 0.2 25)", "oklch(76% 0.18 85)", "oklch(68% 0.17 145)"].map((bg, d) => (
          <span key={d} className="size-2 rounded-full" style={{ backgroundColor: bg }} />
        ))}
      </span>
      <span
        className="mx-auto rounded px-3 py-0.5 font-mono text-[10px]"
        style={{
          backgroundColor: "oklch(96.9% 0.007 258)",
          color: "oklch(57% 0.015 265)",
          border: "1px solid oklch(84% 0.012 265)",
        }}
      >
        {url}
      </span>
      <span className="w-8" aria-hidden="true" />
    </div>
  );
}

export default function Home() {
  const t = useTranslations();
  const customerCards = t.raw("customers.cards") as {
    title: string;
    desc: string;
    fit: string;
  }[];
  const modelBulletsByoa = t.raw("model.byoa.bullets") as string[];
  const modelBulletsServing = t.raw("model.serving.bullets") as string[];
  const proofShots = t.raw("proof.shots") as {
    title: string;
    desc: string;
    alt: string;
  }[];
  const PROOF_SHOT_IMAGES = [
    "/screenshots/shot1-orgbriefing-en.png",
    "/screenshots/shot3-board-en.png",
    "/screenshots/shot4-glance-en.png",
  ];
  const pricingPlans = t.raw("pricing.plans") as {
    name: string;
    price: string;
    period: string;
    audience: string;
    features: string[];
  }[];

  return (
    <div
      style={{
        backgroundColor: "oklch(98.5% 0.003 265)",
        color: "oklch(22% 0.025 265)",
        fontFamily: "var(--font-body), system-ui, sans-serif",
      }}
      className="min-h-screen selection:bg-[oklch(51%_0.19_258/0.15)]"
    >
      {/* Verification gauge — scroll progress as a hairline over the nav.
          Inline scaleX(0) doubles as the no-support fallback (stays hidden). */}
      <div
        aria-hidden="true"
        className="scroll-progress fixed inset-x-0 top-0 z-[60] h-0.5 origin-left"
        style={{
          transform: "scaleX(0)",
          background:
            "linear-gradient(90deg, oklch(51% 0.19 258), oklch(55% 0.11 195))",
        }}
      />

      {/* ── NAV — white glass: canvas/0.8 + backdrop-blur-xl + hairline bottom ── */}
      <nav
        style={{
          backgroundColor: "oklch(98.5% 0.003 265 / 0.8)",
          borderBottom: "1px solid oklch(84% 0.012 265)",
        }}
        className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          {/* Wordmark */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-[11px]"
            style={{ color: "oklch(22% 0.025 265)" }}
          >
            <SprintableMarkSvg className="size-[26px]" style={{ color: "oklch(51% 0.19 258)" }} />
            <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.04em]">
              Sprintable
            </span>
          </Link>

          <NavLinks />

          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <a
              href="https://github.com/moonklabs/sprintable"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link hidden text-sm font-medium sm:inline-flex"
            >
              {t("nav.github")}
            </a>
            <a
              href="https://app.sprintable.ai/login"
              className="btn-glow rounded-lg px-4 py-2 text-sm font-semibold"
              style={{
                backgroundColor: "oklch(51% 0.19 258)",
                color: "oklch(100% 0 0)",
              }}
            >
              {t("nav.getStarted")}
            </a>
          </div>
        </div>
      </nav>

      {/* overflow-x-clip — hidden would create a y-scroll container that hijacks anchor jumps */}
      <main className="overflow-x-clip pt-18">
        <HeroSection />

        <TrustSection />

        <HowItWorksSection />

        {/* ── PROOF (실 UI 증빙 band) ── */}
        <section id="proof" className="px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="mx-auto max-w-2xl text-center">
              <p
                className="eyebrow-cross mb-3 text-xs font-semibold uppercase tracking-[0.3em]"
                style={{ color: "oklch(51% 0.19 258)" }}
              >
                {t("proof.eyebrow")}
              </p>
              <h2
                className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
                style={{ color: "oklch(22% 0.025 265)" }}
              >
                {t("proof.title")}
              </h2>
              <p className="mt-4 text-base leading-8" style={{ color: "oklch(45% 0.02 265)" }}>
                {t("proof.subtitle")}
              </p>
            </ScrollReveal>

            {/* primary — org briefing (wide), with light browser chrome for contrast */}
            {proofShots[0] && (
              <ScrollReveal direction="none" className="mx-auto mt-12 max-w-5xl">
                <Parallax speed={-0.04}>
                  <div
                    className="corner-ticks shimmer-frame tilt-in relative isolate overflow-hidden rounded-2xl"
                    style={{
                      border: "1px solid oklch(84% 0.012 265)",
                      boxShadow: "0 24px 64px -16px oklch(35% 0.08 258 / 0.25)",
                    }}
                  >
                    <div
                      className="absolute inset-x-12 -bottom-6 -top-6 -z-10 rounded-[2rem] opacity-30 blur-3xl"
                      style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, oklch(51% 0.19 258 / 0.12), transparent)" }}
                    />
                    <BrowserChrome />
                    <Image
                      src={PROOF_SHOT_IMAGES[0]!}
                      alt={proofShots[0].alt}
                      width={1600}
                      height={1000}
                      className="w-full object-cover"
                    />
                  </div>
                </Parallax>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold" style={{ color: "oklch(22% 0.025 265)" }}>
                  {proofShots[0].title}
                </h3>
                <p className="mt-1 text-sm leading-7" style={{ color: "oklch(45% 0.02 265)" }}>
                  {proofShots[0].desc}
                </p>
              </ScrollReveal>
            )}

            {/* supporting — board + glance (2-up) */}
            <div className="mx-auto mt-8 grid max-w-5xl gap-8 sm:grid-cols-2">
              {proofShots.slice(1).map((shot, i) => (
                <ScrollReveal key={shot.title} delay={i * 120}>
                  <div
                    className="card-lift overflow-hidden rounded-2xl"
                    style={{
                      border: "1px solid oklch(84% 0.012 265)",
                      boxShadow: "0 1px 2px oklch(25% 0.04 265 / 0.05), 0 8px 24px -6px oklch(35% 0.06 258 / 0.10)",
                    }}
                  >
                    <BrowserChrome />
                    <Image
                      src={PROOF_SHOT_IMAGES[i + 1] ?? PROOF_SHOT_IMAGES[0]}
                      alt={shot.alt}
                      width={1600}
                      height={1000}
                      className="w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-base font-bold" style={{ color: "oklch(22% 0.025 265)" }}>
                    {shot.title}
                  </h3>
                  <p className="mt-1 text-sm leading-7" style={{ color: "oklch(45% 0.02 265)" }}>
                    {shot.desc}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CUSTOMERS ── */}
        <section
          id="customers"
          className="px-5 py-20 sm:px-8 sm:py-28"
          style={{ backgroundColor: "oklch(96.9% 0.007 258)" }}
        >
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="mb-14">
              <p
                className="eyebrow-lead mb-3 text-xs font-semibold uppercase tracking-[0.3em]"
                style={{ color: "oklch(51% 0.19 258)" }}
              >
                {t("customers.eyebrow")}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <h2
                  className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
                  style={{ color: "oklch(22% 0.025 265)" }}
                >
                  {t("customers.title")}
                </h2>
                <p
                  className="max-w-sm text-sm leading-7 sm:text-right"
                  style={{ color: "oklch(45% 0.02 265)" }}
                >
                  {t("customers.subtitle")}
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-4 lg:grid-cols-3">
              {customerCards.map((card, i) => (
                <ScrollReveal
                  key={card.title}
                  delay={i * 100}
                  className="card-lift flex flex-col rounded-2xl p-7"
                  style={{
                    border: "1px solid oklch(84% 0.012 265)",
                    backgroundColor: "oklch(100% 0 0)",
                  }}
                >
                  <h3
                    className="font-[family-name:var(--font-display)] text-xl font-bold"
                    style={{ color: "oklch(22% 0.025 265)" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="mt-3 flex-1 text-sm leading-7"
                    style={{ color: "oklch(45% 0.02 265)" }}
                  >
                    {card.desc}
                  </p>
                  <div
                    className="mt-6 rounded-xl p-4 text-sm leading-6"
                    style={{
                      border: "1px solid oklch(51% 0.19 258 / 0.18)",
                      backgroundColor: "oklch(51% 0.19 258 / 0.07)",
                      color: "oklch(45% 0.02 265)",
                    }}
                  >
                    {card.fit}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── MODEL ── */}
        <section id="model" className="px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="mb-14">
              <p
                className="eyebrow-lead mb-3 text-xs font-semibold uppercase tracking-[0.3em]"
                style={{ color: "oklch(51% 0.19 258)" }}
              >
                {t("model.eyebrow")}
              </p>
              <h2
                className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
                style={{ color: "oklch(22% 0.025 265)" }}
              >
                {t("model.title")}
              </h2>
              <p
                className="mt-4 max-w-2xl text-base leading-7"
                style={{ color: "oklch(45% 0.02 265)" }}
              >
                {t("model.subtitle")}
              </p>
            </ScrollReveal>

            <div className="grid gap-4 lg:grid-cols-2">
              {/* BYOA card — white + hairline */}
              <ScrollReveal
                direction="left"
                className="card-lift rounded-2xl p-7"
                style={{
                  border: "1px solid oklch(84% 0.012 265)",
                  backgroundColor: "oklch(100% 0 0)",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "oklch(57% 0.015 265)", fontSize: "0.65rem" }}
                >
                  {t("model.byoa.eyebrow")}
                </p>
                <h3
                  className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold"
                  style={{ color: "oklch(22% 0.025 265)" }}
                >
                  {t("model.byoa.title")}
                </h3>
                <p
                  className="mt-3 text-sm leading-7"
                  style={{ color: "oklch(45% 0.02 265)" }}
                >
                  {t("model.byoa.desc")}
                </p>
                <ul className="mt-6 space-y-3">
                  {modelBulletsByoa.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-6">
                      <span style={{ color: "oklch(55% 0.11 195)" }}>✦</span>
                      <span style={{ color: "oklch(45% 0.02 265)" }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              {/* Premium card — accent border + accent-wash gradient */}
              <ScrollReveal
                direction="right"
                delay={120}
                className="card-lift rounded-2xl p-7"
                style={{
                  border: "1px solid oklch(51% 0.19 258 / 0.35)",
                  background:
                    "linear-gradient(160deg, oklch(51% 0.19 258 / 0.07) 0%, oklch(100% 0 0) 60%)",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "oklch(57% 0.015 265)", fontSize: "0.65rem" }}
                >
                  {t("model.serving.eyebrow")}
                </p>
                <h3
                  className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold"
                  style={{ color: "oklch(22% 0.025 265)" }}
                >
                  {t("model.serving.title")}
                </h3>
                <p
                  className="mt-3 text-sm leading-7"
                  style={{ color: "oklch(45% 0.02 265)" }}
                >
                  {t("model.serving.desc")}
                </p>
                <ul className="mt-6 space-y-3">
                  {modelBulletsServing.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-6">
                      <span style={{ color: "oklch(51% 0.19 258)" }}>✦</span>
                      <span style={{ color: "oklch(45% 0.02 265)" }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>

            {/* Bridge note */}
            <ScrollReveal
              delay={200}
              className="mt-4 rounded-2xl p-6"
              style={{
                border: "1px solid oklch(51% 0.19 258 / 0.16)",
                backgroundColor: "oklch(51% 0.19 258 / 0.05)",
              }}
            >
              <p
                className="text-sm leading-7"
                style={{ color: "oklch(45% 0.02 265)" }}
              >
                {t("model.bridge")}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="mb-14">
              <p
                className="eyebrow-lead mb-3 text-xs font-semibold uppercase tracking-[0.3em]"
                style={{ color: "oklch(51% 0.19 258)" }}
              >
                {t("pricing.eyebrow")}
              </p>
              <h2
                className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
                style={{ color: "oklch(22% 0.025 265)" }}
              >
                {t("pricing.title")}
              </h2>
              <p
                className="mt-4 max-w-xl text-base leading-7"
                style={{ color: "oklch(45% 0.02 265)" }}
              >
                {t("pricing.subtitle")}
              </p>
            </ScrollReveal>

            {/* Annual discount badge — teal wash */}
            <div className="mb-8 flex justify-center">
              <span
                className="rounded-full px-4 py-1.5 text-sm font-semibold"
                style={{
                  border: "1px solid oklch(55% 0.11 195 / 0.3)",
                  backgroundColor: "oklch(55% 0.11 195 / 0.1)",
                  color: "oklch(55% 0.11 195)",
                }}
              >
                {t("pricing.annualDiscount")}
              </span>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
              {pricingPlans.map((plan, i) => {
                const isTeam = i === 1;
                return (
                  <ScrollReveal
                    key={plan.name}
                    delay={i * 100}
                    className="card-lift relative flex flex-col rounded-2xl p-7"
                    style={{
                      border: isTeam
                        ? "1px solid oklch(51% 0.19 258 / 0.35)"
                        : "1px solid oklch(84% 0.012 265)",
                      background: isTeam
                        ? "linear-gradient(160deg, oklch(51% 0.19 258 / 0.07), oklch(100% 0 0) 60%)"
                        : "oklch(100% 0 0)",
                      boxShadow: isTeam
                        ? "0 0 60px oklch(51% 0.19 258 / 0.08)"
                        : "none",
                    }}
                  >
                    {isTeam && (
                      <div
                        className="absolute -top-3 left-7 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                        style={{
                          backgroundColor: "oklch(51% 0.19 258)",
                          color: "oklch(100% 0 0)",
                        }}
                      >
                        {t("pricing.popular")}
                      </div>
                    )}

                    <div>
                      <h3
                        className="font-[family-name:var(--font-display)] text-xl font-bold"
                        style={{ color: "oklch(22% 0.025 265)" }}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className="mt-2 text-sm"
                        style={{ color: "oklch(57% 0.015 265)" }}
                      >
                        {plan.audience}
                      </p>
                      <div className="mt-5 flex items-end gap-1">
                        <span
                          className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em]"
                          style={{ color: "oklch(22% 0.025 265)" }}
                        >
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span
                            className="mb-1 text-sm"
                            style={{ color: "oklch(57% 0.015 265)" }}
                          >
                            {plan.period}
                          </span>
                        )}
                      </div>
                    </div>

                    <ul className="mt-7 flex-1 space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex gap-3 text-sm leading-6">
                          <span
                            style={{
                              color: isTeam
                                ? "oklch(51% 0.19 258)"
                                : "oklch(57% 0.015 265)",
                            }}
                          >
                            ✓
                          </span>
                          <span style={{ color: "oklch(45% 0.02 265)" }}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={i === 2 ? "mailto:dev1@moonklabs.com" : "https://app.sprintable.ai/login"}
                      className="mt-8 inline-flex items-center justify-center rounded-[var(--radius)] px-5 py-3 text-sm font-semibold transition"
                      style={
                        isTeam
                          ? {
                              backgroundColor: "oklch(51% 0.19 258)",
                              color: "oklch(100% 0 0)",
                            }
                          : {
                              border: "1px solid oklch(84% 0.012 265)",
                              backgroundColor: "oklch(98.5% 0.003 265)",
                              color: "oklch(45% 0.02 265)",
                            }
                      }
                    >
                      {i === 0
                        ? t("pricing.startFree")
                        : i === 1
                          ? t("pricing.startTrial")
                          : t("pricing.contactSales")}
                    </a>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* 컴플라이언스 웨지 */}
            <ScrollReveal
              delay={120}
              className="mt-6 rounded-2xl p-5 text-center"
              style={{
                border: "1px solid oklch(51% 0.19 258 / 0.2)",
                backgroundColor: "oklch(51% 0.19 258 / 0.06)",
              }}
            >
              <p className="text-sm font-semibold" style={{ color: "oklch(44% 0.19 258)" }}>
                {t("pricing.wedge")}
              </p>
            </ScrollReveal>

            <p
              className="mt-6 text-xs leading-6"
              style={{ color: "oklch(57% 0.015 265)" }}
            >
              {t("pricing.footnote")}
            </p>
          </div>
        </section>

        <FinalCtaSection />
      </main>

      {/* ── FOOTER — canvas bg, hairline top, ink-muted text ── */}
      <footer
        className="px-5 py-16 sm:px-8"
        style={{ borderTop: "1px solid oklch(90% 0.008 265)" }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div className="md:col-span-1">
            <span
              className="font-[family-name:var(--font-display)] text-base font-bold tracking-[-0.03em]"
              style={{ color: "oklch(22% 0.025 265)" }}
            >
              Sprintable
            </span>
            <p
              className="mt-3 max-w-xs text-sm leading-7"
              style={{ color: "oklch(57% 0.015 265)" }}
            >
              {t("footer.desc")}
            </p>
            <div className="mt-5 flex gap-4 text-sm font-medium">
              <a
                href="https://github.com/moonklabs/sprintable"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "oklch(57% 0.015 265)" }}
              >
                {t("footer.github")}
              </a>
              <a
                href="https://github.com/moonklabs/sprintable#readme"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "oklch(57% 0.015 265)" }}
              >
                {t("footer.docs")}
              </a>
            </div>
          </div>

          {[
            {
              label: t("footer.product"),
              links: [
                { label: t("footer.overview"), href: "#product" },
                { label: t("footer.proof"), href: "#proof" },
                { label: t("footer.changelog"), href: "https://github.com/moonklabs/sprintable/releases", external: true },
              ],
            },
            {
              label: t("footer.resources"),
              links: [
                { label: t("footer.docs"), href: "https://github.com/moonklabs/sprintable#readme", external: true },
                { label: t("footer.pricing"), href: "#pricing" },
                {
                  label: t("footer.community"),
                  href: "https://discord.gg/sprintable",
                  external: true,
                },
              ],
            },
          ].map((col) => (
            <div key={col.label}>
              <h3
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "oklch(45% 0.02 265)" }}
              >
                {col.label}
              </h3>
              <div className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="text-sm transition"
                    style={{ color: "oklch(57% 0.015 265)" }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mx-auto mt-12 flex max-w-7xl flex-col gap-4 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: "1px solid oklch(90% 0.008 265)" }}
        >
          <p style={{ color: "oklch(57% 0.015 265)" }}>{t("footer.copyright")}</p>
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{
              border: "1px solid oklch(84% 0.012 265)",
              color: "oklch(45% 0.02 265)",
            }}
          >
            {/* operational dot — verified green */}
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "oklch(56% 0.13 150)" }}
            />
            {t("footer.operational")}
          </div>
        </div>
      </footer>

      {/* ── MOBILE BOTTOM NAV — white glass + hairline + blue-tint shadow ── */}
      <div className="fixed inset-x-0 bottom-4 z-40 px-4 md:hidden">
        <div
          className="mx-auto flex max-w-sm items-center gap-3 rounded-2xl p-3 backdrop-blur-xl"
          style={{
            border: "1px solid oklch(84% 0.012 265)",
            backgroundColor: "oklch(100% 0 0 / 0.92)",
            boxShadow: "0 -2px 24px oklch(35% 0.08 258 / 0.12)",
          }}
        >
          <a
            href="https://app.sprintable.ai/login"
            className="flex-1 rounded-[var(--radius)] py-3 text-center text-sm font-semibold"
            style={{
              backgroundColor: "oklch(51% 0.19 258)",
              color: "oklch(100% 0 0)",
            }}
          >
            {t("hero.primaryCta")}
          </a>
          <a
            href="#pricing"
            className="flex-1 rounded-[var(--radius)] py-3 text-center text-sm font-medium"
            style={{
              border: "1px solid oklch(84% 0.012 265)",
              color: "oklch(45% 0.02 265)",
            }}
          >
            {t("hero.pricingCta")}
          </a>
        </div>
      </div>
    </div>
  );
}
