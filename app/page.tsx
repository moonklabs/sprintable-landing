import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./components/locale-switcher";
import { NavLinks } from "./components/nav-links";
import { SprintableMarkSvg } from "./components/brand/sprintable-mark-svg";
import { HeroSection } from "./components/sections/hero-section";
import { FeaturesSection } from "./components/sections/features-section";
import { CompareSection } from "./components/sections/compare-section";
import { AccelerationSection } from "./components/sections/acceleration-section";
import { CustomersSection } from "./components/sections/customers-section";
import { ModelSection } from "./components/sections/model-section";
import { PricingSection } from "./components/sections/pricing-section";
import { FaqSection } from "./components/sections/faq-section";
import { FinalCtaSection } from "./components/sections/final-cta-section";

export default function Home() {
  const t = useTranslations();

  const footerColumns = [
    {
      label: t("footer.product"),
      links: [
        { label: t("footer.overview"), href: "#product" },
        { label: t("footer.proof"), href: "#trust" },
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
  ];

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-[oklch(50%_0.17_255/0.18)]">
      {/* ── NAV ── */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <a href="/" className="flex shrink-0 items-center gap-2.5 text-ink">
            <SprintableMarkSvg className="size-[24px]" style={{ color: "oklch(50% 0.17 255)" }} />
            <span className="text-[17px] font-semibold tracking-[-0.04em]">Sprintable</span>
          </a>

          <NavLinks />

          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <a
              href="https://app.sprintable.ai/login"
              className="hidden text-sm text-muted transition hover:text-ink sm:inline-flex"
            >
              {t("nav.login")}
            </a>
            <a
              href="https://app.sprintable.ai/login"
              className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-[oklch(30%_0.012_265)]"
            >
              {t("nav.getStarted")}
            </a>
          </div>
        </div>
      </nav>

      <main className="overflow-x-clip pt-16">
        <HeroSection />
        <FeaturesSection />
        <CompareSection />
        <AccelerationSection />
        <CustomersSection />
        <ModelSection />
        <PricingSection />
        <FaqSection />
        <FinalCtaSection />
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-line px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
          <div>
            <span className="text-base font-semibold tracking-[-0.03em] text-ink">Sprintable</span>
            <p className="mt-3 max-w-xs text-sm leading-7 text-muted">{t("footer.desc")}</p>
            <div className="mt-5 flex gap-4 text-sm">
              <a
                href="https://github.com/moonklabs/sprintable"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition hover:text-ink"
              >
                {t("footer.github")}
              </a>
              <a
                href="https://github.com/moonklabs/sprintable#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition hover:text-ink"
              >
                {t("footer.docs")}
              </a>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.label}>
              <h3 className="text-sm font-medium text-ink">{col.label}</h3>
              <div className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="text-sm text-muted transition hover:text-ink"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-4 border-t border-line pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="text-faint">{t("footer.copyright")}</p>
          <p className="inline-flex items-center gap-2 text-muted">
            <span className="size-1.5 rounded-full bg-ok" aria-hidden="true" />
            {t("footer.operational")}
          </p>
        </div>
      </footer>

      {/* ── MOBILE BOTTOM NAV ── */}
      <div className="fixed inset-x-0 bottom-4 z-40 px-4 md:hidden">
        <div className="mx-auto flex max-w-sm items-center gap-3 rounded-full border border-line bg-white/95 p-2 shadow-[0_12px_36px_-12px_oklch(30%_0.04_265/0.35)] backdrop-blur-xl">
          <a
            href="https://app.sprintable.ai/login"
            className="flex-1 rounded-full bg-ink py-2.5 text-center text-sm font-medium text-white"
          >
            {t("hero.primaryCta")}
          </a>
          <a href="#pricing" className="flex-1 rounded-full py-2.5 text-center text-sm font-medium text-ink">
            {t("hero.pricingCta")}
          </a>
        </div>
      </div>
    </div>
  );
}
