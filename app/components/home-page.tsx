/* eslint-disable @next/next/no-css-tags, @next/next/no-page-custom-font -- the taste-skill kit is loaded as plain files, in its own order, on this page only */
import Link from "next/link";
import Script from "next/script";
import { useLocale, useTranslations } from "next-intl";
import { LocaleSwitcher } from "./locale-switcher";
import { DownloadButton } from "./doc/download-button";
import { buildJsonLd } from "../lib/seo";
import type { Locale } from "../lib/locale";
import "./doc/page.css";

// 전자상거래법 표시의무 + PG(토스페이먼츠) 심사 요구 항목 — 로케일 무관 법정 표기
const BUSINESS_INFO = {
  companyName: "주식회사 뭉클랩",
  ceo: "윤도선",
  regNo: "488-88-02579",
  mailOrderNo: "제2023-고양일산동-1337호",
  address: "경기도 고양시 일산동구 무궁화로 20-38, 5층 502호",
  supportTel: "070-8098-5775",
};

const GITHUB = "https://github.com/moonklabs/sprintable";

/* the kit's pre-paint guard: the hero's words wait for motion.js (m-enter on <html>, layout.tsx) and show at 700 ms if the script is late; a dealt moment's guard */
const GUARD = `document.documentElement.classList.add('m-enter');setTimeout(function(){document.documentElement.classList.add('m-enter-done')},700);document.documentElement.classList.add('mo-js');setTimeout(function(){document.documentElement.classList.add('mo-safe')},2500)`;

const PALETTE = `:root {
  --p-bg: #eef0f3; --p-surface: #e2e5ea; --p-ink: #0b0c0e; --p-muted: #5d6470;
  --p-accent: #1f2de6; --p-accent-ink: #ffffff; --p-action: #1f2de6; --p-action-ink: #ffffff;
  --p-inv-bg: #0b0c0e; --p-inv-surface: #17181a; --p-inv-ink: #eef0f3; --p-inv-muted: #8e8f92;
  --p-inv-accent: #eef0f3; --p-inv-accent-ink: #0b0c0e; --p-inv-action: #eef0f3; --p-inv-action-ink: #0b0c0e;
  --font-display: "Instrument Sans", system-ui, sans-serif;
  --font-text: "Instrument Sans", system-ui, sans-serif;
  --font-mono: "DM Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  --display-weight: 500;
  --display-tracking: -0.028em;
  --display-tracking-xl: -0.036em;
  --display-stretch: 96%;
  --ly-scale: 1.04;
}`;

const SHOT = (name: string) => `/shots/${name}.png`;

export function HomePage() {
  const t = useTranslations("doc");
  const tf = useTranslations("footer");
  const tn = useTranslations("nav");
  const tm = useTranslations("meta");
  const locale = useLocale();
  const homeHref = locale === "ko" ? "/ko" : "/";
  const labels = { mac: t("hero.ctaMac"), windows: t("hero.ctaWindows"), linux: t("hero.ctaLinux") };
  const skip = locale === "ko" ? "본문으로 건너뛰기" : "Skip to content";

  const footerColumns = [
    {
      label: tf("product"),
      links: [
        { label: tf("overview"), href: "#top" },
        { label: tf("proof"), href: "#sealed" },
        { label: tf("changelog"), href: `${GITHUB}/releases`, external: true },
      ],
    },
    {
      label: tf("resources"),
      links: [
        { label: tf("docs"), href: `${GITHUB}#readme`, external: true },
        // /ko/blog 신설로 footer.blog에 처음 연결 (main #34)
        { label: tf("blog"), href: "/ko/blog" },
        {
          // TODO: 어윈군 마케팅 채널 결정 hook — 마케팅 자산 전용 채널 분리 시 갱신
          label: tf("community"),
          href: "https://discord.gg/sprintable",
          external: true,
        },
      ],
    },
  ];

  return (
    <>
      {/* the kit, in its own order (taste-skill 6c0b5c78 assets/, unchanged copies in public/assets) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wdth,wght@75..100,400..700&family=DM+Mono:wght@400;500&display=swap"
        precedence="kit"
      />
      <link rel="stylesheet" href="/assets/system.css" precedence="kit" />
      <link rel="stylesheet" href="/assets/ui/cards.css" precedence="kit" />
      <link rel="stylesheet" href="/assets/motion/motion.css" precedence="kit" />
      <link rel="stylesheet" href="/assets/backgrounds/backgrounds.css" precedence="kit" />
      <link rel="stylesheet" href="/assets/layout/layout.css" precedence="kit" />
      <link rel="stylesheet" href="/assets/icons/icon.css" precedence="kit" />
      <style href="kit-palette" precedence="kit-palette" dangerouslySetInnerHTML={{ __html: PALETTE }} />
      <link rel="stylesheet" href="/assets/ui/base.css" precedence="kit-palette" />
      <link rel="modulepreload" href="/assets/moments/moments.js" />
      <link rel="modulepreload" href="/assets/moments/lib.js" />
      <link rel="modulepreload" href="/assets/moments/word-highlight/moment.js" />
      <script dangerouslySetInnerHTML={{ __html: GUARD }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(locale as Locale, tm("description"))) }}
      />

      {/* type: software · deal: hero statement (dealt triptych, collage, split, centred all carry a product window: see skill-run/02-plan.md), nav centre-less (no one-word nouns in the copy),
          close close-word, footer footer-dark, rhythm space, buttons tonal, mark stack, palette cool-grey-cobalt, pairing instrument, radius sharp ·
          moments: word-highlight in the open-source section */}
      <header className="nav">
        <div className="wrap nav__bar">
          <a className="skip-link" href="#top">{skip}</a>
          <Link className="nav__logo" href={homeHref}>
            <span className="mark" data-mark="stack" aria-hidden="true" />
            Sprintable
          </Link>
          <div className="nav__actions">
            <LocaleSwitcher />
            <a className="nav__link" href="https://app.sprintable.ai/login">{tn("login")}</a>
            <DownloadButton labels={labels} className="btn btn--primary" />
          </div>
        </div>
      </header>

      <main id="top">
        {/* 1 · first screen — the statement hero, alone, no picture */}
        <section className="hero hero--statement" data-enter="" aria-labelledby="hero-h">
          <div className="wrap">
            <div className="hero-text hero__in">
              <div>
                <h1 id="hero-h">{t("hero.title")}</h1>
                <p className="hero__lead">{t("hero.sub")}</p>
                <div className="btn-row">
                  <DownloadButton labels={labels} className="btn btn--primary" />
                  <a className="btn btn--secondary" href={GITHUB} target="_blank" rel="noopener noreferrer">{t("hero.github")}</a>
                </div>
                <p className="t-small hero__note">{t("hero.note")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2 · who it is for — split: the list, the board */}
        <section className="section" id="people" aria-labelledby="people-h">
          <div className="wrap">
            <div className="section-head"><h2 id="people-h">{t("people.title")}</h2></div>
            <div className="grid grid--top fill">
              <ul className="rows span-6">
                {(["s1", "s2", "s3"] as const).map((k) => (
                  <li key={k}>
                    <span className="rows__name">{t(`people.${k}Lead`)}</span>
                    <p>{t(`people.${k}Rest`)}</p>
                  </li>
                ))}
              </ul>
              <div className="frame frame--photo frame--board span-6 start-7">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="shot" src={SHOT("board-1440")} srcSet={`${SHOT("board-1440-sm")} 700w, ${SHOT("board-1440")} 1300w`} sizes="(max-width: 639px) 342px, 628px" width={1300} height={813} alt="" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* 3 · three steps — the calm, picture-less section between two pictured ones */}
        <section className="section" id="steps" aria-labelledby="steps-h">
          <div className="wrap">
            <div className="section-head"><h2 id="steps-h">{t("steps.title")}</h2></div>
            <div className="grid"><ol className="rows span-6">
              {(["s1", "s2", "s3"] as const).map((k, i) => (
                <li key={k}>
                  <span className="rows__name">{t(`steps.${k}`)}</span>
                  <span className="rows__value">{i + 1}</span>
                </li>
              ))}
            </ol></div>
          </div>
        </section>

        {/* 4 · what you do from anywhere — split: the six lines, the phone */}
        <section className="section" id="anywhere" aria-labelledby="anywhere-h">
          <div className="wrap">
            <div className="section-head"><h2 id="anywhere-h">{t("anywhere.title")}</h2></div>
            <div className="grid grid--top fill">
              <ul className="rows span-6">
                {(["i1", "i2", "i3", "i4", "i5", "i6"] as const).map((k) => (
                  <li key={k}><span className="rows__name">{t(`anywhere.${k}`)}</span></li>
                ))}
              </ul>
              <div className="frame frame--photo frame--pair span-6 start-7">
                <div className="pair">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={SHOT("approval-390")} srcSet={`${SHOT("approval-390-sm")} 280w, ${SHOT("approval-390")} 480w`} sizes="(max-width: 639px) 139px, 232px" width={480} height={1039} alt="" loading="lazy" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={SHOT("chat-approval-390")} srcSet={`${SHOT("chat-approval-390-sm")} 280w, ${SHOT("chat-approval-390")} 480w`} sizes="(max-width: 639px) 139px, 232px" width={480} height={1039} alt="" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5 · sealed */}
        <section className="section" id="sealed" aria-labelledby="sealed-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="sealed-h">{t("sealed.title")}</h2>
              <p className="measure">{t("sealed.body")}</p>
            </div>
          </div>
        </section>

        {/* 6 · yours — split: the four lines, an approval in the project room */}
        <section className="section" id="yours" aria-labelledby="yours-h">
          <div className="wrap">
            <div className="section-head"><h2 id="yours-h">{t("yours.title")}</h2></div>
            <div className="grid grid--top fill">
              <ul className="rows span-6">
                {(["i1", "i2", "i3", "i4"] as const).map((k) => (
                  <li key={k}><span className="rows__name">{t(`yours.${k}`)}</span></li>
                ))}
              </ul>
              <div className="frame frame--photo frame--room span-6 start-7">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="shot" src={SHOT("chat-approval-1440")} srcSet={`${SHOT("chat-approval-1440-sm")} 700w, ${SHOT("chat-approval-1440")} 1300w`} sizes="(max-width: 639px) 342px, 628px" width={1300} height={813} alt="" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* 7 · three operating systems */}
        <section className="section" id="platforms" aria-labelledby="platforms-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="platforms-h">{t("platforms.title")}</h2>
              <p className="measure">{t("platforms.body")}</p>
              <p className="t-small muted measure">{t("platforms.windows")}</p>
            </div>
          </div>
        </section>

        {/* 8 · open source — the dealt moment: word-highlight (a statement of 12 to 40 words in its own section, one strong word) */}
        <section className="section statement" id="open" data-moment="word-highlight" aria-label={t("open.title")}>
          <div className="wrap">
            <p className="t-label">{t("open.title")}</p>
            <p className="mo-wh__text">{t.rich("open.body", { b: (c) => <strong>{c}</strong> })}</p>
            <div className="btn-row">
              <a className="btn btn--secondary" href={GITHUB} target="_blank" rel="noopener noreferrer">{t("open.button")}</a>
            </div>
          </div>
        </section>

        {/* tail · questions, every answer open */}
        <section className="section" id="faq" aria-label="FAQ">
          <div className="wrap">
            <div className="grid"><dl className="faq span-6">
              {([1, 2, 3, 4, 5] as const).map((i) => (
                <div className="faq__item" key={i}>
                  <dt><h3>{t(`faq.q${i}`)}</h3></dt>
                  <dd><p>{t(`faq.a${i}`)}</p></dd>
                </div>
              ))}
            </dl></div>
          </div>
        </section>
      </main>

      {/* the close and the footer, one last screen */}
      <footer className="footer closing footer--dark ground-inverse" id="contact" aria-labelledby="close-h">
        <div className="wrap">
          <div className="closing__cta close--word">
            <div className="section-head--split">
              <div><h2 id="close-h">{t("last.line")}</h2></div>
              <DownloadButton labels={labels} short={t("last.button")} className="btn btn--primary" />
            </div>
            <p className="close__word" aria-hidden="true">Sprintable</p>
          </div>
          <div className="closing__links">
            <div className="grid">
              <div className="span-4 stack-4">
                <Link className="nav__logo" href={homeHref}>
                  <span className="mark" data-mark="stack" aria-hidden="true" />
                  Sprintable
                </Link>
                <p className="footer__lede">{tf("desc")}</p>
              </div>
              {footerColumns.map((col) => (
                <div className="span-2 footer__col" key={col.label}>
                  <h3>{col.label}</h3>
                  <ul>
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}>{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {/* 법정 표기: 사업자 정보 + 약관/개인정보/환불정책 (PG 심사 요구 항목 — 문구와 링크는 main 그대로) */}
            <div className="legal-info">
              <h3>{tf("businessTitle")}</h3>
              <ul className="legal-inline">
                <li>{BUSINESS_INFO.companyName}</li>
                <li>{tf("businessCeo")} : {BUSINESS_INFO.ceo}</li>
                <li>{tf("businessRegNo")} : {BUSINESS_INFO.regNo}</li>
                <li>{tf("businessMailOrderNo")} : {BUSINESS_INFO.mailOrderNo}</li>
                <li>{tf("businessAddress")} : {BUSINESS_INFO.address}</li>
                <li>
                  {tf("businessSupport")} :{" "}
                  <a href={`tel:${BUSINESS_INFO.supportTel.replace(/-/g, "")}`}>{BUSINESS_INFO.supportTel}</a>
                </li>
              </ul>
              <ul className="legal-inline">
                <li><a href="https://app.sprintable.ai/terms">{tf("legalTerms")}</a></li>
                <li><a href="https://app.sprintable.ai/privacy">{tf("legalPrivacy")}</a></li>
                <li><a href="https://app.sprintable.ai/refund-policy">{tf("legalRefund")}</a></li>
              </ul>
            </div>
            <div className="footer__legal">
              <span>{tf("copyright")}</span>
              <span className="muted">{tf("operational")}</span>
            </div>
          </div>
        </div>
      </footer>

      <Script type="module" src="/assets/system.js" strategy="afterInteractive" />
      <Script type="module" src="/assets/motion/motion.js" strategy="afterInteractive" />
      <Script type="module" src="/assets/layout/layout.js" strategy="afterInteractive" />
    </>
  );
}
