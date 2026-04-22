import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("landing.hero");

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{t("headline")}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">{t("subheadline")}</p>
      <div className="mt-10">
        <a
          href="#"
          className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
        >
          {t("cta")}
        </a>
      </div>
    </main>
  );
}
