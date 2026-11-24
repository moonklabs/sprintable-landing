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

/* Built on the taste-skill kit (public/assets, copied unchanged): system.css/js, layout, motion, moments. Palette and type are the dealt ones. */
const PALETTE = `:root {
  --p-bg: #ffffff; --p-surface: #f3f3f3; --p-ink: #232323; --p-muted: #686868;
  --p-accent: #a1ffcb; --p-accent-ink: #232323; --p-action: #232323; --p-action-ink: #ffffff;
  --p-inv-bg: #232323; --p-inv-surface: #303030; --p-inv-ink: #ffffff; --p-inv-muted: #a4a4a4;
  --p-inv-accent: #a1ffcb; --p-inv-accent-ink: #232323; --p-inv-action: #a1ffcb; --p-inv-action-ink: #232323;
  --font-display: "Instrument Sans", system-ui, sans-serif;
  --font-text: "Instrument Sans", system-ui, sans-serif;
  --font-mono: "DM Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  --display-weight: 500;
  --display-tracking: -0.028em;
  --display-tracking-xl: -0.036em;
  --display-stretch: 96%;
  --ly-scale: 1.04;
}`;

/* how the devices connect — every label is a word of the copy (phone, another computer, Claude Code, Codex) */
const DIAGRAM = JSON.stringify({
  layout: "hub",
  alt: "Your computer runs Claude Code and Codex; your phone and another computer connect to it.",
  center: { label: "Your computer", icon: "ui:monitor" },
  spokes: [
    { label: "Phone", icon: "ui:smartphone" },
    { label: "Another computer", icon: "ui:laptop" },
    { label: "Claude Code", icon: "claude-code" },
    { label: "Codex", icon: "openai" },
  ],
  ground: "none",
  motion: { pulse: "none" },
});

/* before the first paint: the page's kind and look on <html>, the hero's entrance guard, the moments guard */
const EARLY = `(function(){var h=document.documentElement;h.setAttribute('data-type','software');h.setAttribute('data-radius','soft');h.setAttribute('data-ground','sky');h.setAttribute('data-buttons','tonal');h.setAttribute('data-motion','');h.classList.add('m-enter');setTimeout(function(){h.classList.add('m-enter-done')},700);h.classList.add('mo-js');setTimeout(function(){h.classList.add('mo-safe')},2500);})();`;

const CSS = ["system.css", "ui/cards.css", "motion/motion.css", "backgrounds/backgrounds.css", "layout/layout.css", "icons/icon.css", "diagrams/diagram.css"];
const JS = ["system.js", "motion/motion.js", "layout/layout.js", "diagrams/mount.js"];

export function HomePage() {
  const t = useTranslations();
  const v = useTranslations("v2");
  const locale = useLocale();
  const homeHref = locale === "ko" ? "/ko" : "/";
  const list = (key: string) => v.raw(key) as string[];
  const pairs = (key: string) => v.raw(key) as { lead: string; rest: string }[];
  const faq = v.raw("faq.items") as { q: string; a: string }[];
  const altDesktop = v("alt.desktop");
  const altPhone = v("alt.phone");
  const dl = <DownloadButton className="btn btn--primary" />;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wdth,wght@75..100,400..700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" precedence="default" />
      {CSS.map((f) => (
        <link key={f} rel="stylesheet" href={`/assets/${f}`} precedence="default" />
      ))}
      <style precedence="default" href="v2-palette" dangerouslySetInnerHTML={{ __html: PALETTE }} />
      <script dangerouslySetInnerHTML={{ __html: EARLY }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(locale as Locale, t("meta.description"))) }}
      />

      {/* ── NAV (nav-cards dealt; no photograph or fragment of its own to put in a panel → plain words, said in the report) ── */}
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
        {/* 1 — hero: collage (dealt) */}
        <section className="hero hero--collage" data-enter aria-labelledby="hero-h">
          <div className="wrap">
            <div className="hero-text grid hero__grid">
              <div className="hero__text span-5">
                <h1 id="hero-h">{v("hero.title")}</h1>
                <p className="hero__lead">{v("hero.sub")}</p>
                <div className="btn-row">
                  {dl}
                  <a className="btn btn--secondary" href="https://github.com/moonklabs/sprintable" target="_blank" rel="noopener noreferrer">{v("hero.github")}</a>
                </div>
                <p className="hero__proof">{v("hero.small")}</p>
              </div>
              <div className="hero__art span-6 start-7">
                <div className="ly-piece ly-piece--main">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/shots/board-1440.jpg" alt={altDesktop} width={1280} height={800} fetchPriority="high" />
                </div>
                <div className="ly-piece ly-piece--note">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/shots/board-390.jpg" alt={altPhone} width={360} height={779} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2 — for whom: split-text-left */}
        <section className="section" id="who" aria-labelledby="who-h">
          <div className="wrap">
            <div className="grid">
              <div className="span-5">
                <div className="section-head"><h2 id="who-h">{v("who.title")}</h2></div>
                <ul className="rows">
                  {pairs("who.items").map((s) => (
                    <li key={s.lead}><p><strong>{s.lead}</strong> {s.rest}</p></li>
                  ))}
                </ul>
              </div>
              <div className="frame frame--split span-6 start-7">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="frame__img shot-cut" src="/shots/chat-approval-1440.jpg" alt={altDesktop} width={1280} height={800} loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* 3 — three steps: the words, and one still diagram of how the devices connect (no capture of a QR scan exists) */}
        <section className="section ground-surface" id="how" aria-labelledby="how-h">
          <div className="wrap">
            <div className="grid">
              <div className="span-5">
                <div className="section-head"><h2 id="how-h">{v("steps.title")}</h2></div>
                <ol className="rows">
                  {list("steps.items").map((text, i) => (
                    <li key={i}><p><span className="step-num">{i + 1}</span> {text}</p></li>
                  ))}
                </ol>
              </div>
              <div className="panel span-6 start-7"><div className="dg" data-diagram={DIAGRAM} /></div>
            </div>
          </div>
        </section>

        {/* 4 — what you do from the phone */}
        <section className="section" id="phone" aria-labelledby="phone-h">
          <div className="wrap">
            <div className="grid">
              <div className="span-5">
                <div className="section-head"><h2 id="phone-h">{v("anywhere.title")}</h2></div>
                <ul className="rows">
                  {list("anywhere.items").map((text, i) => (
                    <li key={i}><p>{text}</p></li>
                  ))}
                </ul>
              </div>
              <div className="frame frame--lit frame--split span-6 start-7">
                <div className="stage">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="at-rise phone-shot" style={{ "--ax": "calc(50% - 165px)", "--ay": "40px" } as React.CSSProperties} src="/shots/chat-approval-390.jpg" alt={altPhone} width={700} height={1515} loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5 — sealed: the iris moment (a section on a new ground; the panel holds heading, paragraph and picture) */}
        <section className="section ground-surface" id="sealed" data-moment="iris-opens" data-moment-opts='{"from": "base"}' aria-labelledby="sealed-h">
          <div className="wrap">
            <div className="grid">
              <div className="span-5">
                <div className="section-head"><h2 id="sealed-h">{v("sealed.title")}</h2></div>
                <p className="t-lead">{v("sealed.body")}</p>
              </div>
              <div className="frame frame--lit frame--split span-6 start-7">
                <div className="stage">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="at-rise phone-shot" style={{ "--ax": "calc(50% - 165px)", "--ay": "40px" } as React.CSSProperties} src="/shots/approval-390.jpg" alt={altPhone} width={700} height={1515} loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 — yours */}
        <section className="section" id="own" aria-labelledby="own-h">
          <div className="wrap">
            <div className="grid">
              <div className="span-12">
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

        {/* 7 — three systems */}
        <section className="section ground-surface" id="os" aria-labelledby="os-h">
          <div className="wrap">
            <div className="section-head"><h2 id="os-h">{v("os.title")}</h2><p>{v("os.body")}</p></div>
            <div className="grid">
              {([["mac", "apple", true, "Apple"], ["windows", "windows", false, "Windows"], ["linux", "linux-tux", false, "Linux"]] as const).map(([os, icon, ink, label]) => (
                <article className="card card--open span-4" key={os}>
                  <span className="ic-tile" style={{ "--tile": "160px" } as React.CSSProperties}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={`ic${ink ? " ic-ink" : ""}`} src={`/assets/icons/${icon}.svg`} alt={label} width={40} height={40} loading="lazy" />
                  </span>
                  <DownloadButton os={os} className="link" />
                </article>
              ))}
            </div>
            <p className="t-small v2-notice">{v("os.windows")}</p>
          </div>
        </section>

        {/* 8 — open source: the letters moment (a statement of its own) */}
        <section className="section" id="oss" data-moment="letters-assemble" aria-labelledby="oss-h">
          <div className="wrap">
            <h2 id="oss-h" className="mo-la__type">{v("oss.title")}</h2>
            <p className="mo-la__sub">{v("oss.body")}</p>
            <div className="btn-row">
              <a className="btn btn--secondary" href="https://github.com/moonklabs/sprintable" target="_blank" rel="noopener noreferrer"><img className="ic ic-24 ic-ink" src="/assets/icons/github.svg" alt="" width={24} height={24} loading="lazy" />{v("oss.button")}</a>
            </div>
          </div>
        </section>

        {/* tail — questions, every answer open */}
        <section className="section ground-surface" id="faq" aria-labelledby="faq-h">
          <div className="wrap">
            <div className="grid">
              <div className="span-5">
                <div className="section-head"><h2 id="faq-h">{v("faq.title")}</h2></div>
                <div className="mark-row">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="ic ic-40 ic-land" src="/assets/icons/claude-code.svg" alt="Claude Code" width={40} height={25} loading="lazy" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="ic ic-40 ic-ink" src="/assets/icons/openai.svg" alt="OpenAI" width={39} height={40} loading="lazy" />
                </div>
              </div>
              <div className="faq span-6 start-7">
                {faq.map((f) => (
                  <div className="faq__item" key={f.q}>
                    <h3>{f.q}</h3>
                    <p>{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── CLOSE + FOOTER (close-type · footer-statement dealt) ── */}
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
                <p className="footer__lede">{t("footer.desc")}</p>
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
              <span>{t("footer.copyright")} · {v("trademarks")} · <LocaleSwitcher /></span>
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
