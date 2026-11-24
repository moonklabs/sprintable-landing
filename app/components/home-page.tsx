import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { LocaleSwitcher } from "./locale-switcher";
import { NavLinks } from "./nav-links";
import { DownloadButton } from "./v2/download-button";
import { buildJsonLd } from "../lib/seo";
import type { Locale } from "../lib/locale";
import "./v2/page.css";

// 전자상거래법 표시의무 + PG(토스페이먼츠) 심사 요구 항목 — 로케일 무관 법정 표기
const BUSINESS_INFO = {
  companyName: "주식회사 뭉클랩",
  ceo: "윤도선",
  regNo: "488-88-02579",
  mailOrderNo: "제2023-고양일산동-1337호",
  address: "경기도 고양시 일산동구 무궁화로 20-38, 5층 502호",
  supportTel: "070-8098-5775",
};

/* Variant C. Built on the taste-skill kit (public/assets, copied unchanged): system.css/js, layout (hero-centred), motion, moments.
   Palette and type are the dealt ones (cool-grey-cobalt · Mona Sans); the dark values below are the palette's own inverse set. */
const PALETTE = `:root {
  --p-bg: #eef0f3; --p-surface: #e2e5ea; --p-ink: #0b0c0e; --p-muted: #5d6470;
  --p-accent: #1f2de6; --p-accent-ink: #ffffff; --p-action: #1f2de6; --p-action-ink: #ffffff;
  --p-inv-bg: #0b0c0e; --p-inv-surface: #17181a; --p-inv-ink: #eef0f3; --p-inv-muted: #8e8f92;
  --p-inv-accent: #eef0f3; --p-inv-accent-ink: #0b0c0e; --p-inv-action: #eef0f3; --p-inv-action-ink: #0b0c0e;
  --font-display: "Mona Sans", system-ui, sans-serif;
  --font-text: "Mona Sans", system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  --display-weight: 500;
  --display-tracking: -0.03em;
  --display-tracking-xl: -0.04em;
  --display-stretch: 104%;
  --ly-scale: 0.96;
}
@media (prefers-color-scheme: dark) {
  :root {
    --p-bg: #0b0c0e; --p-surface: #17181a; --p-ink: #eef0f3; --p-muted: #8e8f92;
    --p-accent: #eef0f3; --p-accent-ink: #0b0c0e; --p-action: #eef0f3; --p-action-ink: #0b0c0e;
    --p-inv-bg: #1d1f23; --p-inv-surface: #272a30; --p-inv-ink: #eef0f3; --p-inv-muted: #9a9ca1;
    --p-inv-accent: #eef0f3; --p-inv-accent-ink: #0b0c0e; --p-inv-action: #eef0f3; --p-inv-action-ink: #0b0c0e;
  }
}`;

/* before the first paint: the page's kind and look on <html>, the hero's entrance guard, the moments guard */
const EARLY = `(function(){var h=document.documentElement;h.setAttribute('data-type','software');h.setAttribute('data-radius','soft');h.setAttribute('data-ground','sky');h.setAttribute('data-buttons','pill');h.setAttribute('data-motion','');h.classList.add('m-enter');setTimeout(function(){h.classList.add('m-enter-done')},700);h.classList.add('mo-js');setTimeout(function(){h.classList.add('mo-safe')},2500);})();`;

const CSS = ["system.css", "ui/cards.css", "motion/motion.css", "backgrounds/backgrounds.css", "layout/layout.css", "icons/icon.css"];
const JS = ["system.js", "motion/motion.js", "layout/layout.js"];

export function HomePage() {
  const t = useTranslations();
  const v = useTranslations("v2");
  const locale = useLocale();
  const homeHref = locale === "ko" ? "/ko" : "/";
  const shots = `/shots/${locale === "ko" ? "ko" : "en"}`;
  const list = (key: string) => v.raw(key) as string[];
  const core = v.raw("core.items") as { head: string; line: string }[];
  const faq = v.raw("faq.items") as { q: string; a: string }[];
  const dl = <DownloadButton className="btn btn--primary" />;
  const github = "https://github.com/moonklabs/sprintable";

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Mona+Sans:wdth,wght@75..125,400..600&family=Geist+Mono:wght@400..500&display=swap" rel="stylesheet" precedence="default" />
      {CSS.map((f) => (
        <link key={f} rel="stylesheet" href={`/assets/${f}`} precedence="default" />
      ))}
      <style precedence="default" href="v3-palette" dangerouslySetInnerHTML={{ __html: PALETTE }} />
      <script dangerouslySetInnerHTML={{ __html: EARLY }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(locale as Locale, t("meta.description"))) }}
      />

      {/* ── NAV (the dealt nav-mega needs a menu of words the copy does not give → plain words, the site's existing nav strings) ── */}
      <header className="nav">
        <div className="wrap nav__bar">
          <a className="skip-link" href="#top">{locale === "ko" ? "본문으로 건너뛰기" : "Skip to content"}</a>
          <a className="nav__logo" href={homeHref}><span className="mark mark--initial" aria-hidden="true">S</span>Sprintable</a>
          <NavLinks />
          <div className="nav__actions">
            <span className="nav__loc"><LocaleSwitcher /></span>
            <a className="nav__link" href="https://app.sprintable.ai/login">{t("nav.login")}</a>
            {dl}
          </div>
          <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
        </div>
      </header>

      <main id="top">
        {/* 1 — hero (dealt: centred): the headline, the two buttons, then the desktop picture and the phone-width picture as one composition */}
        <section className="hero hero--centred" data-enter aria-labelledby="hero-h">
          <div className="wrap">
            <div className="hero-text">
              <div className="hero__c">
                <h1 id="hero-h">{v("hero.title")}</h1>
                <p className="hero__lead">{v("hero.sub")}</p>
                <div className="btn-row">
                  {dl}
                  <a className="btn btn--secondary" href={github} target="_blank" rel="noopener noreferrer">{v("hero.github")}</a>
                </div>
                <p className="hero__proof">{v("hero.small")}</p>
              </div>
              <div className="hero__window">
                <div className="ly-piece hero-comp">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="hero-comp__desk" src={`${shots}/board-1440.jpg`} alt="" width={1600} height={1000} fetchPriority="high" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="hero-comp__phone" src={`${shots}/chat-approval-390.jpg`} alt="" width={560} height={1212} fetchPriority="high" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2 — three core cards: icon and two lines each (v1.1 sentences) */}
        <section className="section v3-fill" id="who" aria-labelledby="who-h">
          <div className="wrap">
            <div className="section-head"><h2 id="who-h">{v("who.title")}</h2></div>
            <div className="grid v3-cards">
              {([["ui-monitor", "claude-code"], ["ui-smartphone", "openai"], ["ui-lock", "ui-shield-check"]] as const).map(([glyph, mark], i) => (
                <article className="card span-4 v3-core" key={glyph}>
                  <div className="v3-core__tile">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="ic ic-ink v3-core__glyph" src={`/assets/icons/${glyph}.svg`} alt="" width={40} height={40} loading="lazy" />
                    {i < 2 && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className={`ic v3-core__mark${mark === "openai" ? " ic-ink" : " ic-land"}`} src={`/assets/icons/${mark}.svg`} alt="" width={40} height={40} loading="lazy" />
                    )}
                  </div>
                  <h3>{core[i].head}</h3>
                  <p>{core[i].line}</p>
                </article>
              ))}
            </div>
            <ul className="grid v3-who">
              {(v.raw("who.items") as { lead: string; rest: string }[]).map((w) => (
                <li className="span-4" key={w.lead}><p><strong>{w.lead}</strong> {w.rest}</p></li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3 — three steps, across: the install page and the pairing area are real captures of the web side; the third is real glyphs (the QR screen lives inside the desktop app window and is not available) */}
        <section className="section ground-surface v3-fill" id="how" aria-labelledby="how-h">
          <div className="wrap">
            <div className="section-head"><h2 id="how-h">{v("steps.title")}</h2></div>
            <ol className="grid fill v3-steps">
              {list("steps.items").map((text, i) => (
                <li className={`card span-4 v3-step${i === 2 ? " v3-step--text" : ""}`} key={i}>
                  <span className="step-num">{i + 1}</span>
                  <p>{text}</p>
                  {i < 2 && <div className="v3-step__visual">
                    {i === 0 && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`${shots}/step-install.jpg`} alt="" width={1100} height={570} loading="lazy" />
                    )}
                    {i === 1 && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`${shots}/step-pair.jpg`} alt="" width={1100} height={630} loading="lazy" />
                    )}
                  </div>}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4a — what you do from the phone: text left, the phone-width pictures right */}
        <section className="section v3-fill" id="phone" aria-labelledby="phone-h">
          <div className="wrap">
            <div className="grid fill v3-feature">
              <div className="span-5">
                <div className="section-head"><h2 id="phone-h">{v("anywhere.title")}</h2></div>
                <ul className="rows">
                  {list("anywhere.items").map((text, i) => (
                    <li key={i}><p>{text}</p></li>
                  ))}
                </ul>
              </div>
              <div className="frame frame--lit span-6 start-7 v3-phones">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="v3-phones__a" src={`${shots}/approval-390.jpg`} alt="" width={560} height={1212} loading="lazy" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="v3-phones__b" src={`${shots}/board-390.jpg`} alt="" width={560} height={1212} loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* 4b — your accounts, your computers: the big capture left, the words right */}
        <section className="section v3-fill" id="own" aria-labelledby="own-h">
          <div className="wrap">
            <div className="grid fill v3-feature v3-feature--flip">
              <div className="span-7 v3-card-shot v3-card-shot--policy">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${shots}/policies-1440.jpg`} alt="" width={1300} height={690} loading="lazy" />
              </div>
              <div className="span-4 start-9">
                <div className="section-head"><h2 id="own-h">{v("own.title")}</h2></div>
                <ul className="rows">
                  {list("own.items").map((text, i) => (
                    <li key={i}><p>{text}</p></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5 — the dark band: sealed (moment: line-carries-colour), one picture */}
        <section className="section ground-inverse v3-fill" id="sealed" data-moment="line-carries-colour" aria-labelledby="sealed-h">
          <div className="wrap">
            <div className="grid fill v3-feature">
              <div className="span-5">
                <div className="section-head"><h2 id="sealed-h">{v("sealed.title")}</h2></div>
                <p className="t-lead">{v("sealed.body")}</p>
              </div>
              <div className="span-6 start-7 v3-card-shot v3-card-shot--dark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${shots}/approval-card-1440.jpg`} alt="" width={1300} height={987} loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* 6 — three systems (B's cards) */}
        <section className="section v3-fill v3-os-section" id="os" aria-labelledby="os-h">
          <div className="wrap">
            <div className="section-head"><h2 id="os-h">{v("os.title")}</h2><p>{v("os.body")}</p></div>
            <div className="grid v3-oscards">
              {([["mac", "apple", true, "Apple"], ["windows", "windows", false, "Windows"], ["linux", "linux-tux", false, "Linux"]] as const).map(([os, icon, ink, label]) => (
                <article className="card span-4 v3-os" key={os}>
                  <span className="v3-os__head">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={`ic${ink ? " ic-ink" : ""}`} src={`/assets/icons/${icon}.svg`} alt="" width={40} height={40} loading="lazy" />
                    <h3>{label === "Apple" ? "Mac" : label}</h3>
                  </span>
                  <DownloadButton os={os} className="btn btn--secondary" />
                </article>
              ))}
            </div>
            <p className="t-small v3-notice">{v("os.windows")}</p>
          </div>
        </section>

        {/* 7 — open source (the letters moment, a statement of its own; smaller) */}
        <section className="section ground-surface v3-fill" id="oss" data-moment="letters-assemble" aria-labelledby="oss-h">
          <div className="wrap">
            <div className="grid fill v3-oss">
              <div className="span-8">
                <h2 id="oss-h" className="mo-la__type">{v("oss.title")}</h2>
                <p className="mo-la__sub">{v("oss.body")}</p>
                <div className="btn-row">
                  <a className="btn btn--secondary" href={github} target="_blank" rel="noopener noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="ic ic-24 ic-ink" src="/assets/icons/github.svg" alt="" width={24} height={24} loading="lazy" />{v("oss.button")}
                  </a>
                </div>
              </div>
              <a className="span-4 v3-oss__mark" href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="ic ic-ink" src="/assets/icons/github.svg" alt="" width={160} height={160} loading="lazy" />
              </a>
            </div>
          </div>
        </section>

        {/* 8 — questions: open on load, each one can be closed (details) */}
        <section className="section v3-fill" id="faq" aria-labelledby="faq-h">
          <div className="wrap">
            <div className="grid fill v3-faqgrid">
              <div className="span-4">
                <div className="section-head"><h2 id="faq-h">{v("faq.title")}</h2></div>
                <div className="mark-row">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="ic ic-40 ic-land" src="/assets/icons/claude-code.svg" alt="Claude Code" width={40} height={25} loading="lazy" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="ic ic-40 ic-ink" src="/assets/icons/openai.svg" alt="OpenAI" width={39} height={40} loading="lazy" />
                </div>
              </div>
              <div className="faq v3-faq span-7 start-6">
                {faq.map((f) => (
                  <details className="faq__item" key={f.q} open>
                    <summary><h3>{f.q}</h3></summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── 9 — the last download band + footer (close-type · footer-statement dealt) ── */}
      <footer className="footer footer--statement closing" aria-labelledby="close-h">
        <div className="wrap">
          <div className="closing__cta close--type">
            <div className="section-head"><h2 id="close-h">{v("last.line")}</h2></div>
            <DownloadButton className="btn btn--primary btn--xl btn--wide" />
          </div>
          <div className="closing__links">
            <div className="grid">
              <div className="span-4 stack-4">
                <a className="nav__logo" href="#top"><span className="mark mark--initial" aria-hidden="true">S</span>Sprintable</a>
                <p className="footer__lede">{v("hero.small")}</p>
              </div>
              <div className="span-2 start-7 footer__col">
                <h3>{t("footer.product")}</h3>
                <ul>
                  <li><a href="#phone">{t("footer.overview")}</a></li>
                  <li><a href="#sealed">{t("footer.proof")}</a></li>
                  <li><a href="https://github.com/moonklabs/sprintable/releases" target="_blank" rel="noopener noreferrer">{t("footer.changelog")}</a></li>
                </ul>
              </div>
              <div className="span-2 footer__col">
                <h3>{t("footer.resources")}</h3>
                <ul>
                  <li><a href="https://github.com/moonklabs/sprintable#readme" target="_blank" rel="noopener noreferrer">{t("footer.docs")}</a></li>
                  <li><Link href="/ko/blog">{t("footer.blog")}</Link></li>
                  <li><a href="https://discord.gg/sprintable" target="_blank" rel="noopener noreferrer">{t("footer.community")}</a></li>
                </ul>
              </div>
              <div className="span-2 footer__col">
                <h3>{t("footer.businessTitle")}</h3>
                <ul>
                  <li><a href="https://app.sprintable.ai/terms">{t("footer.legalTerms")}</a></li>
                  <li><a href="https://app.sprintable.ai/privacy">{t("footer.legalPrivacy")}</a></li>
                  <li><a href="https://app.sprintable.ai/refund-policy">{t("footer.legalRefund")}</a></li>
                </ul>
              </div>
            </div>
            {/* 법정 표기: 사업자 정보 (PG 심사 요구 항목 — 문구는 main 그대로) */}
            <div className="footer__legal">
              <span>{t("footer.copyright")} · <LocaleSwitcher /></span>
              <span>
                {BUSINESS_INFO.companyName} · {t("footer.businessCeo")} : {BUSINESS_INFO.ceo} · {t("footer.businessRegNo")} : {BUSINESS_INFO.regNo} · {t("footer.businessMailOrderNo")} : {BUSINESS_INFO.mailOrderNo} · {t("footer.businessAddress")} : {BUSINESS_INFO.address} · {t("footer.businessSupport")} :{" "}
                <a href={`tel:${BUSINESS_INFO.supportTel.replace(/-/g, "")}`}>{BUSINESS_INFO.supportTel}</a>
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* the phone's action bar: the main action at the foot (system.js shows it once the hero's button has scrolled away) */}
      <nav className="actionbar" aria-label="Quick actions">
        <DownloadButton className="btn btn--primary" />
      </nav>

      {/* module scripts keep their order (system.js, then motion, then layout): deliberately not async */}
      {JS.map((f) => (
        // eslint-disable-next-line @next/next/no-sync-scripts
        <script key={f} type="module" src={`/assets/${f}`} />
      ))}
    </>
  );
}
