import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { DEFAULT_LOCALE, isLocale } from '../app/lib/locale';

/* 언어는 주소로 정해지고(middleware.ts가 x-locale 헤더로 전달), 매칭되지 않는 경로는 영어다. */
async function getLocale(): Promise<string> {
  const fromPath = (await headers()).get('x-locale');
  return isLocale(fromPath) ? fromPath : DEFAULT_LOCALE;
}

export default getRequestConfig(async ({ requestLocale }) => {
  // story 2b4067b5 — requestLocale은 명시 오버라이드(예: getTranslations({locale:'ko',...}),
  // app/ko/blog/**)일 때만 값이 있다(next-intl 실측: getConfig.js가 override 없으면
  // Promise<undefined>를 준다) — 그 경우 그 값을 최우선으로 쓴다. 오버라이드가 없는
  // 기존 호출(getTranslations() 무인자, 사이트 나머지 전체)은 그대로 cookie/
  // Accept-Language 기반 getLocale()로 폴백 — 회귀 0.
  const overrideLocale = await requestLocale;
  const locale =
    isLocale(overrideLocale) ? overrideLocale : await getLocale();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
