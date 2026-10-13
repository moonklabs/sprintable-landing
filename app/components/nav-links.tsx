import { useTranslations } from "next-intl";

const NAV_KEYS = ["features", "trust", "customers", "pricing", "faq"] as const;

export function NavLinks() {
  const t = useTranslations("nav");
  return (
    <div className="hidden items-center gap-7 lg:flex">
      {NAV_KEYS.map((key) => (
        <a key={key} href={`#${key}`} className="text-sm text-muted transition hover:text-ink">
          {t(key)}
        </a>
      ))}
    </div>
  );
}
