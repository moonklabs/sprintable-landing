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
      className="text-sm text-muted transition hover:text-ink"
      aria-label="Switch language"
    >
      {t("switch")}
    </button>
  );
}
