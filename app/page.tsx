import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./components/locale-switcher";
import { NavLinks } from "./components/nav-links";
import { SprintableMarkSvg } from "./components/brand/sprintable-mark-svg";
import { HeroSection } from "./components/sections/hero-section";
import { TrustSection } from "./components/sections/trust-section";
import { AccelerationSection } from "./components/sections/acceleration-section";
import { OrgOsSection } from "./components/sections/org-os-section";
import { FinalCtaSection } from "./components/sections/final-cta-section";

// 전자상거래법 표시의무 + PG(토스페이먼츠) 심사 요구 항목 — 로케일 무관 법정 표기
const BUSINESS_INFO = {
  companyName: "주식회사 뭉클랩",
  ceo: "윤도선",
  regNo: "488-88-02579",
  mailOrderNo: "제2023-고양일산동-1337호",
  address: "경기도 고양시 일산동구 무궁화로 20-38, 5층 502호",
  supportTel: "070-8098-5775",
};

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
          <Link href="/" className="flex shrink-0 items-center gap-[11px] text-white">
            <SprintableMarkSvg className="size-[26px]" style={{ color: "oklch(72% 0.14 258)" }} />
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

        {/* ── PROOF (실 UI 증빙 band — 유나 큐레이션: primary wide + supporting 2-up, 히어로 이미지 스타일 재사용) ── */}
        <section
          id="proof"
          className="px-5 py-20 sm:px-8 sm:py-28"
          style={{ backgroundColor: "oklch(15% 0.016 265)" }}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
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
              <p className="mt-4 text-base leading-8" style={{ color: "oklch(65% 0.025 265)" }}>
                {t("proof.subtitle")}
              </p>
            </div>

            {/* primary — org briefing (wide) */}
            {proofShots[0] && (
              <div className="mx-auto mt-12 max-w-5xl">
                <div
                  className="relative overflow-hidden rounded-2xl"
                  style={{ border: "1px solid oklch(26% 0.022 265)", boxShadow: "0 24px 64px oklch(13% 0.015 265 / 0.6)" }}
                >
                  <div
                    className="absolute inset-x-12 -bottom-6 -top-6 -z-10 rounded-[2rem] opacity-40 blur-3xl"
                    style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, oklch(72% 0.14 258 / 0.25), transparent)" }}
                  />
                  <Image
                    src={PROOF_SHOT_IMAGES[0]!}
                    alt={proofShots[0].alt}
                    width={1600}
                    height={1000}
                    className="w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold" style={{ color: "oklch(93% 0.02 265)" }}>
                  {proofShots[0].title}
                </h3>
                <p className="mt-1 text-sm leading-7" style={{ color: "oklch(65% 0.025 265)" }}>
                  {proofShots[0].desc}
                </p>
              </div>
            )}

            {/* supporting — board + glance (2-up) */}
            <div className="mx-auto mt-8 grid max-w-5xl gap-8 sm:grid-cols-2">
              {proofShots.slice(1).map((shot, i) => (
                <div key={shot.title}>
                  <div
                    className="overflow-hidden rounded-2xl"
                    style={{ border: "1px solid oklch(26% 0.022 265)", boxShadow: "0 16px 40px oklch(13% 0.015 265 / 0.5)" }}
                  >
                    <Image
                      src={PROOF_SHOT_IMAGES[i + 1] ?? PROOF_SHOT_IMAGES[0]}
                      alt={shot.alt}
                      width={1600}
                      height={1000}
                      className="w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-base font-bold" style={{ color: "oklch(93% 0.02 265)" }}>
                    {shot.title}
                  </h3>
                  <p className="mt-1 text-sm leading-7" style={{ color: "oklch(65% 0.025 265)" }}>
                    {shot.desc}
                  </p>
                </div>
              ))}
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

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {pricingPlans.map((plan, i) => {
                const isTeam = i === 2;
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
                      href={i === 3 ? "mailto:dev1@moonklabs.com" : "https://app.sprintable.ai/login"}
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
                        : i === 3
                          ? t("pricing.contactSales")
                          : t("pricing.startTrial")}
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
          className="mx-auto mt-12 max-w-7xl pt-6"
          style={{ borderTop: "1px solid oklch(22% 0.018 265)" }}
        >
          <h3
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "oklch(75% 0.025 265)" }}
          >
            {t("footer.businessTitle")}
          </h3>
          <div
            className="mt-4 flex flex-col gap-x-5 gap-y-2 text-xs leading-6 sm:flex-row sm:flex-wrap"
            style={{ color: "oklch(50% 0.02 265)" }}
          >
            <span style={{ color: "oklch(62% 0.025 265)" }}>
              {BUSINESS_INFO.companyName}
            </span>
            <span>
              {t("footer.businessCeo")} : {BUSINESS_INFO.ceo}
            </span>
            <span>
              {t("footer.businessRegNo")} : {BUSINESS_INFO.regNo}
            </span>
            <span>
              {t("footer.businessMailOrderNo")} : {BUSINESS_INFO.mailOrderNo}
            </span>
            <span>
              {t("footer.businessAddress")} : {BUSINESS_INFO.address}
            </span>
            <span>
              {t("footer.businessSupport")} :{" "}
              <a
                href={`tel:${BUSINESS_INFO.supportTel.replace(/-/g, "")}`}
                style={{ color: "oklch(62% 0.025 265)" }}
              >
                {BUSINESS_INFO.supportTel}
              </a>
            </span>
          </div>

          {/* story #2616 — 앱 웹 공개 페이지(/terms·/privacy·/refund-policy)로의 공개 도달.
              법적 고지 계열이라 사업자 정보 행 바로 아래 응집(PO 판정). 셋 다 실재 라우트
              확認 후 링크(없는 페이지에 링크 금지) — refund-policy는 story #2740에서
              apps/web develop→main 프로모션 완료(라이브 200 실측) 확認 후 추가. */}
          <div
            className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs"
            style={{ color: "oklch(50% 0.02 265)" }}
          >
            <a href="https://app.sprintable.ai/terms" className="transition" style={{ color: "oklch(62% 0.025 265)" }}>
              {t("footer.legalTerms")}
            </a>
            <a href="https://app.sprintable.ai/privacy" className="transition" style={{ color: "oklch(62% 0.025 265)" }}>
              {t("footer.legalPrivacy")}
            </a>
            <a href="https://app.sprintable.ai/refund-policy" className="transition" style={{ color: "oklch(62% 0.025 265)" }}>
              {t("footer.legalRefund")}
            </a>
          </div>
        </div>

        <div
          className="mx-auto mt-8 flex max-w-7xl flex-col gap-4 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"
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
