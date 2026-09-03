import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

const SUPPORTED_LOCALES = ['en', 'ko'];
const DEFAULT_LOCALE = 'en';

async function getLocale(): Promise<string> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('locale')?.value;
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) return cookieLocale;

  const headerStore = await headers();
  const acceptLang = headerStore.get('accept-language') ?? '';
  for (const locale of SUPPORTED_LOCALES) {
    if (acceptLang.includes(locale)) return locale;
  }

  return DEFAULT_LOCALE;
}

export default getRequestConfig(async ({ requestLocale }) => {
  // story 2b4067b5 — requestLocale은 명시 오버라이드(예: getTranslations({locale:'ko',...}),
  // app/ko/blog/**)일 때만 값이 있다(next-intl 실측: getConfig.js가 override 없으면
  // Promise<undefined>를 준다) — 그 경우 그 값을 최우선으로 쓴다. 오버라이드가 없는
  // 기존 호출(getTranslations() 무인자, 사이트 나머지 전체)은 그대로 cookie/
  // Accept-Language 기반 getLocale()로 폴백 — 회귀 0.
  const overrideLocale = await requestLocale;
  const locale =
    overrideLocale && SUPPORTED_LOCALES.includes(overrideLocale) ? overrideLocale : await getLocale();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
