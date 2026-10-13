"use client";

import { useLocale, useTranslations } from "next-intl";

/* 언어별 실제 주소로 이동하는 링크 — 크롤러도 따라갈 수 있고, 눌렀을 때만 선택을 쿠키로 기억한다 */
export function LocaleSwitcher() {
  const t = useTranslations("locale");
  const current = useLocale();
  const next = current === "en" ? "ko" : "en";

  return (
    <a
      href={next === "ko" ? "/ko" : "/"}
      hrefLang={next}
      lang={next}
      onClick={() => {
        document.cookie = `locale=${next}; path=/; max-age=31536000; SameSite=Lax`;
      }}
      className="text-sm text-muted transition hover:text-ink"
      aria-label={next === "ko" ? "한국어로 보기" : "View in English"}
    >
      {t("switch")}
    </a>
  );
}
