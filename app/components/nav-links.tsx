import { useTranslations } from "next-intl";

/* Variant B: Product → the phone block, Trust → the sealed block, FAQ → the questions. Labels are the existing nav strings (kit nav: plain words). */
const LINKS = [
  { key: "product", href: "#phone" },
  { key: "trust", href: "#sealed" },
  { key: "faq", href: "#faq" },
] as const;

export function NavLinks() {
  const t = useTranslations("nav");
  return (
    <nav className="nav__links" aria-label="Main">
      {LINKS.map(({ key, href }) => (
        <div className="nav__item" key={key}>
          <a className="nav__link" href={href}>{t(key)}</a>
        </div>
      ))}
      <div className="nav__item">
        <a className="nav__link" href="https://github.com/moonklabs/sprintable" target="_blank" rel="noopener noreferrer">{t("github")}</a>
      </div>
    </nav>
  );
}
