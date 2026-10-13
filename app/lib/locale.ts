/* 언어 선택 로직 — middleware(엣지)에서만 쓰는 순수 함수. 외부 의존 없음. */

export const SUPPORTED_LOCALES = ["en", "ko"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

/* Accept-Language를 가중치(q)와 순서대로 읽어, 사용자가 가장 선호하는 지원 언어를 고른다.
   "ko-KR,ko;q=0.9,en-US;q=0.8"은 ko, "en-US,en;q=0.9,ko;q=0.8"은 en, 지원하지 않는 언어만 있으면 null. */
export function pickFromAcceptLanguage(header: string): Locale | null {
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag = "", ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return { lang: tag.trim().toLowerCase().split("-")[0] ?? "", q: q ? Number.parseFloat(q.slice(2)) : 1 };
    })
    .filter(({ lang, q }) => lang && Number.isFinite(q) && q > 0)
    .sort((a, b) => b.q - a.q); // 같은 q는 원래 순서 유지(안정 정렬)
  const hit = ranked.find(({ lang }) => isLocale(lang));
  return hit ? (hit.lang as Locale) : null;
}

/* 검색엔진·AI 크롤러·링크 미리보기는 언어 설정과 무관하게 주소 그대로의 페이지를 받아야 한다.
   (자동 이동하면 / 가 색인되지 않거나 미리보기가 엉뚱한 언어로 나온다) */
const CRAWLER_UA =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|whatsapp|telegram|discord|slack|lighthouse|headless|yeti|daum|naver|gptbot|claudebot|perplexity|ccbot|bytespider|ahrefs|semrush/i;

export function isCrawler(userAgent: string | null): boolean {
  return !userAgent || CRAWLER_UA.test(userAgent);
}
