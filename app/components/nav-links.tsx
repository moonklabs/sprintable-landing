'use client';

import { useTranslations } from "next-intl";

const NAV_KEYS = ["product", "trust", "pricing"] as const;

export function NavLinks() {
  const t = useTranslations();
  return (
    <div className="hidden items-center gap-7 lg:flex">
      {NAV_KEYS.map((key) => (
        <a key={key} href={`#${key}`} className="nav-link text-sm font-medium">
          {t(`nav.${key}`)}
        </a>
      ))}
    </div>
  );
}
