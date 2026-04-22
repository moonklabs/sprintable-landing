"use client";

import { useTranslations } from "next-intl";

export function LocaleSwitcher() {
  const t = useTranslations("locale");

  function handleSwitch() {
    const current = document.cookie.match(/(?:^|;\s*)locale=([^;]*)/)?.[1] ?? "en";
    const next = current === "en" ? "ko" : "en";
    document.cookie = `locale=${next}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.reload();
  }

  return (
    <button
      onClick={handleSwitch}
      className="text-sm font-medium text-[oklch(65%_0.02_265)] transition hover:text-[oklch(88%_0.04_265)]"
      aria-label="Switch language"
    >
      {t("switch")}
    </button>
  );
}
