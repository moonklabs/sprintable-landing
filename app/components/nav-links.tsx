'use client';

import { useTranslations } from "next-intl";

const NAV_KEYS = ["product", "customers", "model", "proof", "pricing", "training"] as const;

export function NavLinks() {
  const t = useTranslations();
  return (
    <div className="hidden items-center gap-7 lg:flex">
      {NAV_KEYS.map((key) => (
        <a
          key={key}
          href={`#${key}`}
          className="text-sm font-medium transition"
          style={{ color: "oklch(65% 0.025 265)" }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.color = "oklch(88% 0.03 265)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.color = "oklch(65% 0.025 265)")
          }
        >
          {t(`nav.${key}`)}
        </a>
      ))}
    </div>
  );
}
