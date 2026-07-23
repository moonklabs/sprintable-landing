import type { MetadataRoute } from "next";
import { routing } from "../i18n/routing";

const SITE_URL = "https://sprintable.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    en: `${SITE_URL}/en`,
    ko: `${SITE_URL}/ko`,
    "x-default": SITE_URL,
  };

  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages },
  }));
}
