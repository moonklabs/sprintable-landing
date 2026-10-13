import { getTranslations } from "next-intl/server";
import { FeatureScroll } from "../ui/feature-scroll";

export async function FeaturesSection() {
  const t = await getTranslations("features");

  return (
    <section id="features" className="px-5 pt-20 sm:px-8 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-medium tracking-[-0.03em] text-ink sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-lg leading-8 text-muted">{t("subtitle")}</p>
        </div>
        <div className="mt-12 lg:mt-6">
          <FeatureScroll />
        </div>
      </div>
    </section>
  );
}
