"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "../../i18n/navigation";

export function LocaleSwitcher() {
  const t = useTranslations("locale");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function handleSwitch() {
    const href = `${pathname}${window.location.search}${window.location.hash}`;
    router.replace(href, { locale: locale === "en" ? "ko" : "en" });
  }

  return (
    <button
      onClick={handleSwitch}
      className="text-sm font-medium leading-none text-[oklch(57%_0.015_265)] transition hover:text-[oklch(22%_0.025_265)]"
      aria-label="Switch language"
    >
      {t("switch")}
    </button>
  );
}
