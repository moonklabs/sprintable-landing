export const runtime = "edge";

import type { Metadata } from "next";
import { Bricolage_Grotesque, Barlow, Instrument_Serif, Noto_Serif_KR } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { routing } from "../../i18n/routing";
import { GoogleAnalytics } from "../components/google-analytics";
import { MetaPixel } from "../components/meta-pixel";
import { WaitlistPopup } from "../components/waitlist-popup";
import "../globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

/* Noto Serif KR — 한글 명조. 영문 Instrument Serif의 등가물.
   CJK 폰트는 파일이 크므로 preload: false로 LCP 충돌 방지. */
const notoSerifKr = Noto_Serif_KR({
  variable: "--font-serif-kr",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  preload: false,
});

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://sprintable.ai"),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ko: "/ko",
        "x-default": "/",
      },
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
      ],
    },
  };
}

export default async function RootLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${bricolage.variable} ${barlow.variable} ${instrumentSerif.variable} ${notoSerifKr.variable}`}
    >
      <body>
        <Suspense>
          <GoogleAnalytics />
        </Suspense>
        <MetaPixel />
        <NextIntlClientProvider messages={messages}>
          {children}
          <WaitlistPopup />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
