import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "./locale";

export const SITE_URL = "https://sprintable.ai";

const PATH: Record<Locale, string> = { en: "/", ko: "/ko" };

/* 언어별 고정 주소, 서로를 가리키는 hreflang, 자기 자신을 가리키는 canonical */
export async function buildHomeMetadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: PATH[locale],
      languages: { en: PATH.en, ko: PATH.ko, "x-default": PATH.en },
    },
    openGraph: {
      type: "website",
      siteName: "Sprintable",
      url: PATH[locale],
      title,
      description,
      locale: locale === "ko" ? "ko_KR" : "en_US",
      alternateLocale: locale === "ko" ? ["en_US"] : ["ko_KR"],
    },
    twitter: { card: "summary", title, description },
  };
}

/* AI 검색(GEO)과 검색엔진이 제품이 무엇인지 사실로 읽을 수 있게 하는 구조화 데이터 */
export function buildJsonLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "Moonklabs",
        url: SITE_URL,
        sameAs: ["https://github.com/moonklabs/sprintable"],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#app`,
        name: "Sprintable",
        url: `${SITE_URL}${PATH[locale]}`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description,
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#org` },
        isAccessibleForFree: true,
      },
    ],
  };
}
