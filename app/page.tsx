import Image from "next/image";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./components/locale-switcher";
import { NavLinks } from "./components/nav-links";

export default function Home() {
  const t = useTranslations();
  const heroAudiences = t.raw("hero.audiences") as string[];
  const valueCards = t.raw("value.cards") as { eyebrow: string; title: string; desc: string }[];
  const customerCards = t.raw("customers.cards") as {
    title: string;
    desc: string;
    fit: string;
  }[];
  const modelBulletsByoa = t.raw("model.byoa.bullets") as string[];
  const modelBulletsServing = t.raw("model.serving.bullets") as string[];
  const proofSteps = t.raw("proof.steps") as {
    eyebrow: string;
    title: string;
    desc: string;
  }[];
  const pricingPlans = t.raw("pricing.plans") as {
    name: string;
    price: string;
    period: string;
    audience: string;
    features: string[];
  }[];
  const howItWorksSteps = t.raw("howItWorks.steps") as { eyebrow: string; title: string; desc: string; imgAlt: string }[];
  const featureCards = t.raw("features.cards") as { title: string; desc: string; imgAlt: string }[];
  const howItWorksImages = [
    '/screenshots/07-settings.png',
    '/screenshots/01-chat-detail.png',
    '/screenshots/09-board-overview.png',
  ] as const;
  const featureImages = [
    '/screenshots/01-chat-detail.png',
    '/screenshots/08-thread-detail.png',
    '/screenshots/04-kanban-board.png',
    '/screenshots/11-epic-detail.png',
    '/screenshots/13-activity-log.png',
    '/screenshots/10-agents.png',
  ] as const;

  return (
    <div
      style={{
        backgroundColor: "oklch(13% 0.015 265)",
        color: "oklch(93% 0.02 265)",
        fontFamily: "var(--font-body), system-ui, sans-serif",
      }}
      className="min-h-screen selection:bg-[oklch(72%_0.14_265/0.25)]"
    >
      {/* ── NAV ── */}
      <nav
        style={{
          backgroundColor: "oklch(13% 0.015 265 / 0.88)",
          borderBottom: "1px solid oklch(26% 0.022 265)",
        }}
        className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          {/* Wordmark */}
          <a href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/brand/sprintable-logo-square.png"
              alt="Sprintable"
              width={28}
              height={28}
              className="size-7"
              priority
            />
            <span
              className="font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.04em]"
              style={{ color: "oklch(93% 0.02 265)" }}
            >
              Sprintable
            </span>
          </a>

          <NavLinks />

          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <a
              href="https://github.com/moonklabs/sprintable"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-sm font-medium transition sm:inline-flex"
              style={{ color: "oklch(65% 0.025 265)" }}
            >
              {t("nav.github")}
            </a>
            <a
              href="https://app.sprintable.ai/login"
              className="rounded-lg px-4 py-2 text-sm font-semibold transition"
              style={{
                backgroundColor: "oklch(72% 0.14 265)",
                color: "oklch(18% 0.06 265)",
              }}
            >
              {t("nav.getStarted")}
            </a>
          </div>
        </div>
      </nav>

      <main className="overflow-x-hidden pt-18">
        {/* ── HERO ── */}
        <section
          id="product"
          className="relative px-5 pb-24 pt-16 sm:px-8 sm:pt-20"
        >
          {/* Background: single subtle radial, no multi-gradient AI slop */}
          <div
            className="absolute inset-x-0 top-0 -z-10 h-[600px]"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 20% 0%, oklch(72% 0.14 265 / 0.12), transparent)",
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
                  style={{ color: "oklch(65% 0.06 265)" }}
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
                    borderColor: "oklch(72% 0.14 265)",
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
                    className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold transition"
                    style={{
                      backgroundColor: "oklch(72% 0.14 265)",
                      color: "oklch(18% 0.06 265)",
                      boxShadow: "0 8px 32px oklch(72% 0.14 265 / 0.22)",
                    }}
                  >
                    {t("hero.primaryCta")}
                  </a>
                  <a
                    href="https://github.com/moonklabs/sprintable"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-medium transition"
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
                    className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-medium transition"
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

        {/* ── VALUE PROPOSITION ── */}
        <section id="value" className="px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-end">
              <div>
                <p
                  className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]"
                  style={{ color: "oklch(65% 0.06 265)" }}
                >
                  {t("value.eyebrow")}
                </p>
                <h2
                  className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
                  style={{ color: "oklch(93% 0.02 265)" }}
                >
                  {t("value.title")}
                </h2>
              </div>
              <p
                className="text-base leading-8 lg:max-w-xl lg:text-right"
                style={{ color: "oklch(65% 0.025 265)" }}
              >
                {t("value.subtitle")}
              </p>
            </div>

            {/* Asymmetric layout: large card + two stacked */}
            <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
              {/* Primary card */}
              <div
                className="rounded-2xl p-8"
                style={{
                  border: "1px solid oklch(26% 0.022 265)",
                  backgroundColor: "oklch(17% 0.018 265)",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "oklch(78% 0.13 195)", fontSize: "0.65rem" }}
                >
                  {valueCards[0]?.eyebrow}
                </p>
                <h3
                  className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold"
                  style={{ color: "oklch(93% 0.02 265)" }}
                >
                  {valueCards[0]?.title}
                </h3>
                <p
                  className="mt-4 max-w-md text-sm leading-7"
                  style={{ color: "oklch(65% 0.025 265)" }}
                >
                  {valueCards[0]?.desc}
                </p>
              </div>
              {/* Secondary cards */}
              <div className="flex flex-col gap-4">
                {valueCards.slice(1).map((card) => (
                  <div
                    key={card.title}
                    className="flex-1 rounded-2xl p-6"
                    style={{
                      border: "1px solid oklch(26% 0.022 265)",
                      backgroundColor: "oklch(17% 0.018 265)",
                    }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: "oklch(78% 0.13 195)", fontSize: "0.65rem" }}
                    >
                      {card.eyebrow}
                    </p>
                    <h3
                      className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold"
                      style={{ color: "oklch(93% 0.02 265)" }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="mt-2 text-sm leading-6"
                      style={{ color: "oklch(65% 0.025 265)" }}
                    >
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section
          id="how-it-works"
          className="px-5 py-20 sm:px-8 sm:py-28"
          style={{ backgroundColor: "oklch(15% 0.016 265)" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "oklch(65% 0.06 265)" }}>
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

        {/* ── FEATURE DEEP-DIVE ── */}
        <section id="features" className="px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "oklch(65% 0.06 265)" }}>
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

        {/* ── CUSTOMERS ── */}
        <section
          id="customers"
          className="px-5 py-20 sm:px-8 sm:py-28"
          style={{ backgroundColor: "oklch(15% 0.016 265)" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-14">
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]"
                style={{ color: "oklch(65% 0.06 265)" }}
              >
                {t("customers.eyebrow")}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <h2
                  className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
                  style={{ color: "oklch(93% 0.02 265)" }}
                >
                  {t("customers.title")}
                </h2>
                <p
                  className="max-w-sm text-sm leading-7 sm:text-right"
                  style={{ color: "oklch(65% 0.025 265)" }}
                >
                  {t("customers.subtitle")}
                </p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {customerCards.map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col rounded-2xl p-7"
                  style={{
                    border: "1px solid oklch(26% 0.022 265)",
                    backgroundColor: "oklch(13% 0.015 265)",
                  }}
                >
                  <h3
                    className="font-[family-name:var(--font-display)] text-xl font-bold"
                    style={{ color: "oklch(93% 0.02 265)" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="mt-3 flex-1 text-sm leading-7"
                    style={{ color: "oklch(65% 0.025 265)" }}
                  >
                    {card.desc}
                  </p>
                  <div
                    className="mt-6 rounded-xl p-4 text-sm leading-6"
                    style={{
                      border: "1px solid oklch(72% 0.14 265 / 0.18)",
                      backgroundColor: "oklch(72% 0.14 265 / 0.07)",
                      color: "oklch(80% 0.05 265)",
                    }}
                  >
                    {card.fit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MODEL ── */}
        <section id="model" className="px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14">
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]"
                style={{ color: "oklch(65% 0.06 265)" }}
              >
                {t("model.eyebrow")}
              </p>
              <h2
                className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
                style={{ color: "oklch(93% 0.02 265)" }}
              >
                {t("model.title")}
              </h2>
              <p
                className="mt-4 max-w-2xl text-base leading-7"
                style={{ color: "oklch(65% 0.025 265)" }}
              >
                {t("model.subtitle")}
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {/* BYOA card */}
              <div
                className="rounded-2xl p-7"
                style={{
                  border: "1px solid oklch(26% 0.022 265)",
                  backgroundColor: "oklch(16% 0.018 265)",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "oklch(65% 0.025 265)", fontSize: "0.65rem" }}
                >
                  {t("model.byoa.eyebrow")}
                </p>
                <h3
                  className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold"
                  style={{ color: "oklch(93% 0.02 265)" }}
                >
                  {t("model.byoa.title")}
                </h3>
                <p
                  className="mt-3 text-sm leading-7"
                  style={{ color: "oklch(65% 0.025 265)" }}
                >
                  {t("model.byoa.desc")}
                </p>
                <ul className="mt-6 space-y-3">
                  {modelBulletsByoa.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-6">
                      <span style={{ color: "oklch(78% 0.13 195)" }}>✦</span>
                      <span style={{ color: "oklch(78% 0.03 265)" }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Premium card */}
              <div
                className="rounded-2xl p-7"
                style={{
                  border: "1px solid oklch(72% 0.14 265 / 0.25)",
                  background:
                    "linear-gradient(160deg, oklch(72% 0.14 265 / 0.1) 0%, oklch(16% 0.018 265) 60%)",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "oklch(65% 0.025 265)", fontSize: "0.65rem" }}
                >
                  {t("model.serving.eyebrow")}
                </p>
                <h3
                  className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold"
                  style={{ color: "oklch(93% 0.02 265)" }}
                >
                  {t("model.serving.title")}
                </h3>
                <p
                  className="mt-3 text-sm leading-7"
                  style={{ color: "oklch(65% 0.025 265)" }}
                >
                  {t("model.serving.desc")}
                </p>
                <ul className="mt-6 space-y-3">
                  {modelBulletsServing.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-6">
                      <span style={{ color: "oklch(72% 0.14 265)" }}>✦</span>
                      <span style={{ color: "oklch(78% 0.03 265)" }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bridge note */}
            <div
              className="mt-4 rounded-2xl p-6"
              style={{
                border: "1px solid oklch(72% 0.14 265 / 0.16)",
                backgroundColor: "oklch(72% 0.14 265 / 0.05)",
              }}
            >
              <p
                className="text-sm leading-7"
                style={{ color: "oklch(75% 0.04 265)" }}
              >
                {t("model.bridge")}
              </p>
            </div>
          </div>
        </section>

        {/* ── PROOF ── */}
        <section
          id="proof"
          className="px-5 py-20 sm:px-8 sm:py-28"
          style={{ backgroundColor: "oklch(15% 0.016 265)" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p
                  className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]"
                  style={{ color: "oklch(65% 0.06 265)" }}
                >
                  {t("proof.eyebrow")}
                </p>
                <h2
                  className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
                  style={{ color: "oklch(93% 0.02 265)" }}
                >
                  {t("proof.title")}
                </h2>
                <p
                  className="mt-5 text-base leading-8"
                  style={{ color: "oklch(65% 0.025 265)" }}
                >
                  {t("proof.subtitle")}
                </p>
              </div>

              <div className="space-y-4">
                {proofSteps.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-2xl p-6"
                    style={{
                      border: "1px solid oklch(26% 0.022 265)",
                      backgroundColor: "oklch(13% 0.015 265)",
                    }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: "oklch(78% 0.13 195)", fontSize: "0.65rem" }}
                    >
                      {step.eyebrow}
                    </p>
                    <h3
                      className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold"
                      style={{ color: "oklch(93% 0.02 265)" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="mt-2 text-sm leading-7"
                      style={{ color: "oklch(65% 0.025 265)" }}
                    >
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14">
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]"
                style={{ color: "oklch(65% 0.06 265)" }}
              >
                {t("pricing.eyebrow")}
              </p>
              <h2
                className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
                style={{ color: "oklch(93% 0.02 265)" }}
              >
                {t("pricing.title")}
              </h2>
              <p
                className="mt-4 max-w-xl text-base leading-7"
                style={{ color: "oklch(65% 0.025 265)" }}
              >
                {t("pricing.subtitle")}
              </p>
            </div>

            {/* Annual discount badge */}
            <div className="mb-8 flex justify-center">
              <span
                className="rounded-full px-4 py-1.5 text-sm font-semibold"
                style={{
                  border: "1px solid oklch(78% 0.13 195 / 0.3)",
                  backgroundColor: "oklch(78% 0.13 195 / 0.1)",
                  color: "oklch(78% 0.13 195)",
                }}
              >
                {t("pricing.annualDiscount")}
              </span>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
              {pricingPlans.map((plan, i) => {
                const isTeam = i === 1;
                return (
                  <div
                    key={plan.name}
                    className="relative flex flex-col rounded-2xl p-7"
                    style={{
                      border: isTeam
                        ? "1px solid oklch(72% 0.14 265 / 0.35)"
                        : "1px solid oklch(26% 0.022 265)",
                      backgroundColor: isTeam
                        ? "oklch(17% 0.02 265)"
                        : "oklch(16% 0.018 265)",
                      boxShadow: isTeam
                        ? "0 0 60px oklch(72% 0.14 265 / 0.1)"
                        : "none",
                    }}
                  >
                    {isTeam && (
                      <div
                        className="absolute -top-3 left-7 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                        style={{
                          backgroundColor: "oklch(72% 0.14 265)",
                          color: "oklch(18% 0.06 265)",
                        }}
                      >
                        {t("pricing.popular")}
                      </div>
                    )}

                    <div>
                      <h3
                        className="font-[family-name:var(--font-display)] text-xl font-bold"
                        style={{ color: "oklch(93% 0.02 265)" }}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className="mt-2 text-sm"
                        style={{ color: "oklch(60% 0.025 265)" }}
                      >
                        {plan.audience}
                      </p>
                      <div className="mt-5 flex items-end gap-1">
                        <span
                          className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em]"
                          style={{ color: "oklch(93% 0.02 265)" }}
                        >
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span
                            className="mb-1 text-sm"
                            style={{ color: "oklch(55% 0.02 265)" }}
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
                                ? "oklch(72% 0.14 265)"
                                : "oklch(65% 0.025 265)",
                            }}
                          >
                            ✓
                          </span>
                          <span style={{ color: "oklch(78% 0.02 265)" }}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={i === 2 ? "mailto:dev1@moonklabs.com" : "https://app.sprintable.ai/login"}
                      className="mt-8 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition"
                      style={
                        isTeam
                          ? {
                              backgroundColor: "oklch(72% 0.14 265)",
                              color: "oklch(18% 0.06 265)",
                            }
                          : {
                              border: "1px solid oklch(30% 0.025 265)",
                              backgroundColor: "oklch(20% 0.02 265)",
                              color: "oklch(78% 0.025 265)",
                            }
                      }
                    >
                      {i === 0
                        ? t("pricing.startFree")
                        : i === 1
                          ? t("pricing.startTrial")
                          : t("pricing.contactSales")}
                    </a>
                  </div>
                );
              })}
            </div>

            <p
              className="mt-6 text-xs leading-6"
              style={{ color: "oklch(50% 0.02 265)" }}
            >
              {t("pricing.footnote")}
            </p>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="px-5 py-20 sm:px-8 sm:py-28">
          <div
            className="mx-auto max-w-4xl rounded-2xl p-10 text-center sm:p-16"
            style={{
              border: "1px solid oklch(72% 0.14 265 / 0.2)",
              background:
                "radial-gradient(ellipse 100% 80% at 50% 0%, oklch(72% 0.14 265 / 0.12), oklch(16% 0.018 265) 70%)",
            }}
          >
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: "oklch(65% 0.06 265)" }}
            >
              {t("finalCta.eyebrow")}
            </p>
            <h2
              className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
              style={{ color: "oklch(93% 0.02 265)" }}
            >
              {t("finalCta.title")}
            </h2>
            <p
              className="mx-auto mt-5 max-w-xl text-base leading-8"
              style={{ color: "oklch(65% 0.025 265)" }}
            >
              {t("finalCta.desc")}
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://app.sprintable.ai/login"
                className="inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm font-semibold transition"
                style={{
                  backgroundColor: "oklch(72% 0.14 265)",
                  color: "oklch(18% 0.06 265)",
                  boxShadow: "0 8px 32px oklch(72% 0.14 265 / 0.22)",
                }}
              >
                {t("finalCta.primary")}
              </a>
              <a
                href="https://github.com/moonklabs/sprintable#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm font-medium transition"
                style={{
                  border: "1px solid oklch(26% 0.022 265)",
                  backgroundColor: "oklch(17% 0.018 265)",
                  color: "oklch(72% 0.025 265)",
                }}
              >
                {t("finalCta.secondary")}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer
        className="px-5 py-16 sm:px-8"
        style={{ borderTop: "1px solid oklch(22% 0.018 265)" }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div className="md:col-span-1">
            <span
              className="font-[family-name:var(--font-display)] text-base font-bold tracking-[-0.03em]"
              style={{ color: "oklch(88% 0.025 265)" }}
            >
              Sprintable
            </span>
            <p
              className="mt-3 max-w-xs text-sm leading-7"
              style={{ color: "oklch(50% 0.02 265)" }}
            >
              {t("footer.desc")}
            </p>
            <div className="mt-5 flex gap-4 text-sm font-medium">
              <a
                href="https://github.com/moonklabs/sprintable"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "oklch(60% 0.025 265)" }}
              >
                {t("footer.github")}
              </a>
              <a
                href="https://github.com/moonklabs/sprintable#readme"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "oklch(60% 0.025 265)" }}
              >
                {t("footer.docs")}
              </a>
            </div>
          </div>

          {[
            {
              label: t("footer.product"),
              links: [
                { label: t("footer.overview"), href: "#value" },
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
                  // TODO: 어윈군 마케팅 채널 결정 hook — 마케팅 자산 전용 채널 분리 시 갱신
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
                style={{ color: "oklch(75% 0.025 265)" }}
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
                    style={{ color: "oklch(50% 0.02 265)" }}
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
          style={{ borderTop: "1px solid oklch(22% 0.018 265)" }}
        >
          <p style={{ color: "oklch(45% 0.02 265)" }}>{t("footer.copyright")}</p>
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{
              border: "1px solid oklch(26% 0.022 265)",
              color: "oklch(55% 0.025 265)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "oklch(78% 0.13 195)" }}
            />
            {t("footer.operational")}
          </div>
        </div>
      </footer>

      {/* ── MOBILE BOTTOM NAV ── */}
      <div className="fixed inset-x-0 bottom-4 z-40 px-4 md:hidden">
        <div
          className="mx-auto flex max-w-sm items-center gap-3 rounded-2xl p-3 backdrop-blur-xl"
          style={{
            border: "1px solid oklch(26% 0.022 265)",
            backgroundColor: "oklch(14% 0.015 265 / 0.95)",
            boxShadow: "0 16px 48px oklch(10% 0.01 265 / 0.5)",
          }}
        >
          <a
            href="https://app.sprintable.ai/login"
            className="flex-1 rounded-xl py-3 text-center text-sm font-semibold"
            style={{
              backgroundColor: "oklch(72% 0.14 265)",
              color: "oklch(18% 0.06 265)",
            }}
          >
            {t("hero.primaryCta")}
          </a>
          <a
            href="#pricing"
            className="flex-1 rounded-xl py-3 text-center text-sm font-medium"
            style={{
              border: "1px solid oklch(26% 0.022 265)",
              color: "oklch(72% 0.025 265)",
            }}
          >
            {t("hero.pricingCta")}
          </a>
        </div>
      </div>
    </div>
  );
}
