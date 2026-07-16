import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./components/locale-switcher";
import { NavLinks } from "./components/nav-links";
import { SprintableMarkSvg } from "./components/brand/sprintable-mark-svg";
import { HeroSection } from "./components/sections/hero-section";
import { TrustSection } from "./components/sections/trust-section";
import { AccelerationSection } from "./components/sections/acceleration-section";
import { OrgOsSection } from "./components/sections/org-os-section";
import { FinalCtaSection } from "./components/sections/final-cta-section";

export default function Home() {
  const t = useTranslations();
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
          <a href="/" className="flex shrink-0 items-center gap-2 text-white">
            <SprintableMarkSvg className="size-7" />
            <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.04em]">
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
                backgroundColor: "oklch(72% 0.14 258)",
                color: "oklch(18% 0.06 258)",
              }}
            >
              {t("nav.getStarted")}
            </a>
          </div>
        </div>
      </nav>

      <main className="overflow-x-hidden pt-18">
        <HeroSection />

        <TrustSection />

        <AccelerationSection />

        <OrgOsSection />

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
                style={{ color: "oklch(65% 0.06 258)" }}
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
                      border: "1px solid oklch(72% 0.14 258 / 0.18)",
                      backgroundColor: "oklch(72% 0.14 258 / 0.07)",
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
                style={{ color: "oklch(65% 0.06 258)" }}
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
                  border: "1px solid oklch(72% 0.14 258 / 0.25)",
                  background:
                    "linear-gradient(160deg, oklch(72% 0.14 258 / 0.1) 0%, oklch(16% 0.018 265) 60%)",
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
                      <span style={{ color: "oklch(72% 0.14 258)" }}>✦</span>
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
                border: "1px solid oklch(72% 0.14 258 / 0.16)",
                backgroundColor: "oklch(72% 0.14 258 / 0.05)",
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
                  style={{ color: "oklch(65% 0.06 258)" }}
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
                style={{ color: "oklch(65% 0.06 258)" }}
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
                        ? "1px solid oklch(72% 0.14 258 / 0.35)"
                        : "1px solid oklch(26% 0.022 265)",
                      backgroundColor: isTeam
                        ? "oklch(17% 0.02 265)"
                        : "oklch(16% 0.018 265)",
                      boxShadow: isTeam
                        ? "0 0 60px oklch(72% 0.14 258 / 0.1)"
                        : "none",
                    }}
                  >
                    {isTeam && (
                      <div
                        className="absolute -top-3 left-7 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                        style={{
                          backgroundColor: "oklch(72% 0.14 258)",
                          color: "oklch(18% 0.06 258)",
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
                                ? "oklch(72% 0.14 258)"
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
                      className="mt-8 inline-flex items-center justify-center rounded-[var(--radius)] px-5 py-3 text-sm font-semibold transition"
                      style={
                        isTeam
                          ? {
                              backgroundColor: "oklch(72% 0.14 258)",
                              color: "oklch(18% 0.06 258)",
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

        <FinalCtaSection />
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
            className="flex-1 rounded-[var(--radius)] py-3 text-center text-sm font-semibold"
            style={{
              backgroundColor: "oklch(72% 0.14 258)",
              color: "oklch(18% 0.06 258)",
            }}
          >
            {t("hero.primaryCta")}
          </a>
          <a
            href="#pricing"
            className="flex-1 rounded-[var(--radius)] py-3 text-center text-sm font-medium"
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
