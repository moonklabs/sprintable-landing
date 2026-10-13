import { ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { HeroBackdrop } from "../ui/hero-backdrop";
import { HeroRun } from "../ui/hero-run";
import { ProductDemo } from "../ui/product-demo";

export async function HeroSection() {
  const t = await getTranslations();

  return (
    <section id="product" className="relative isolate px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20">
      <HeroBackdrop />

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink">
            <ShieldCheck className="size-3.5 text-ok" aria-hidden="true" />
            {t("hero.badge")}
          </p>
          <h1 className="mt-6 text-4xl font-medium leading-[1.12] tracking-[-0.035em] text-ink sm:text-5xl lg:text-[3.5rem]">
            {t("hero.headline")}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted">{t("hero.subheadline")}</p>

          <HeroRun />

          <p className="mt-5 text-sm text-muted">
            <a
              href="https://app.sprintable.ai/login"
              className="font-medium text-ink underline decoration-line underline-offset-4 transition hover:decoration-ink"
            >
              {t("hero.primaryCta")}
            </a>
            <span className="mx-3 text-faint" aria-hidden="true">
              /
            </span>
            <a
              href="https://github.com/moonklabs/sprintable"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink underline decoration-line underline-offset-4 transition hover:decoration-ink"
            >
              {t("hero.secondaryCta")}
            </a>
          </p>
          <p className="mt-2 text-sm text-faint">{t("hero.note")}</p>
        </div>

        <div className="mt-14 sm:mt-16">
          <ProductDemo />
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-faint">
          <span>{t("hero.worksWith.label")}</span>
          {(t.raw("hero.worksWith.items") as string[]).map((name) => (
            <span key={name} className="font-medium text-muted">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
