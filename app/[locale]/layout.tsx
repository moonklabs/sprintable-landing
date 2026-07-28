export const runtime = "edge";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { routing } from "../../i18n/routing";
import { GoogleAnalytics } from "../components/google-analytics";
import { MetaPixel } from "../components/meta-pixel";
import { WaitlistPopup } from "../components/waitlist-popup";
import "../globals.css";

/* Pretendard — 단일 가변 폰트. 라틴+한글 전체 굵기(45~920)를 한 파일로 커버.
   display/body/serif 전부 이 하나로 통일. */
const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
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
      className={pretendard.variable}
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
