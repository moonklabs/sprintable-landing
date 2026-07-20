export const runtime = "edge";

import type { Metadata } from "next";
import { Bricolage_Grotesque, Barlow, Instrument_Serif, Noto_Serif_KR } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Suspense } from "react";
import { GoogleAnalytics } from "./components/google-analytics";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Sprintable — Ship with AI agents",
  description:
    "Open-source PM surface for teams shipping with AI. Start with BYOA, upgrade to managed orchestration.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${bricolage.variable} ${barlow.variable} ${instrumentSerif.variable} ${notoSerifKr.variable}`}
    >
      <body>
        <Suspense>
          <GoogleAnalytics />
        </Suspense>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
