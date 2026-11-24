export const runtime = "edge";

import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Suspense } from "react";
import { GoogleAnalytics } from "./components/google-analytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-latin",
  subsets: ["latin"],
  display: "swap",
});

const notoKr = Noto_Sans_KR({
  variable: "--font-kr",
  weight: ["400", "500", "600"],
  preload: false,
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sprintable.ai"),
  title: "Sprintable — Your agents keep working on your computer. Stay connected from anywhere.",
  description:
    "Claude Code and Codex work on your own computer — with your projects, your files and your accounts. Pair your phone or another computer once, then hand out work, approve requests and follow along from wherever you are.",
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
      suppressHydrationWarning
      className={`${inter.variable} ${notoKr.variable}`}
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
