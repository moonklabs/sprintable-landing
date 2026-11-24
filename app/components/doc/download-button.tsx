"use client";

import { useSyncExternalStore } from "react";

type Os = "mac" | "windows" | "linux";

const DOORS: Record<Os, string> = {
  mac: "https://app.sprintable.ai/desktop/get/macos",
  windows: "https://app.sprintable.ai/desktop/get/windows",
  linux: "https://app.sprintable.ai/desktop/get/linux",
};

function osOf(ua: string): Os {
  if (/Windows/i.test(ua)) return "windows";
  if (/Linux/i.test(ua) && !/Android/i.test(ua)) return "linux";
  return "mac"; // Mac is the default (phones and unknown browsers too)
}

const subscribe = () => () => {};
const clientOs = (): Os => osOf(navigator.userAgent);
const serverOs = (): Os => "mac";

/* The main action: the door for the visitor's own OS. Server render and first paint say Mac; the client swaps to Windows or Linux. */
export function DownloadButton({
  labels,
  className,
  short,
}: {
  labels: Record<Os, string>;
  className?: string;
  short?: string; // the closing's plain «Download» label (the door still follows the OS)
}) {
  const os = useSyncExternalStore(subscribe, clientOs, serverOs);
  return (
    <a href={DOORS[os]} className={className} data-os={os}>
      {short ?? labels[os]}
    </a>
  );
}
