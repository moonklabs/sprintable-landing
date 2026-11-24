"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { useTranslations } from "next-intl";

/* The OS comes from the user agent: Mac is the default (server render and unknown); Windows and Linux when the browser says so.
   The doors are public 302s on the app host. */
export type Os = "mac" | "windows" | "linux";
const DOOR: Record<Os, string> = {
  mac: "https://app.sprintable.ai/desktop/get/macos",
  windows: "https://app.sprintable.ai/desktop/get/windows",
  linux: "https://app.sprintable.ai/desktop/get/linux",
};

function detectOs(): Os {
  const ua = navigator.userAgent;
  if (/Windows/i.test(ua)) return "windows";
  if (/Linux/i.test(ua) && !/Android|aarch64|arm/i.test(ua)) return "linux";
  return "mac";
}
const subscribe = () => () => {};

export function DownloadButton({ os: forced, className = "btn btn--primary", children }: { os?: Os; className?: string; children?: ReactNode }) {
  const t = useTranslations("v2.dl");
  const detected = useSyncExternalStore(subscribe, detectOs, () => "mac" as Os);
  const os = forced ?? detected;
  return (
    <a href={DOOR[os]} className={className} data-os={os}>
      {t(os)}
      {children}
    </a>
  );
}
