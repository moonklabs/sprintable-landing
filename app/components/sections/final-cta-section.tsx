import { getTranslations } from "next-intl/server";
import { CopyCommand } from "../ui/copy-command";
import { Spotlight } from "../ui/spotlight";

export async function FinalCtaSection() {
  const t = await getTranslations();
  const steps = t.raw("finalCta.steps") as { title: string; desc: string }[];

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <Spotlight
        radius={520}
        color="oklch(50% 0.17 255 / 0.10)"
        className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-line bg-white px-6 py-16 shadow-[0_40px_90px_-50px_oklch(30%_0.04_265/0.4)] sm:px-14 sm:py-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-medium tracking-[-0.035em] text-ink sm:text-5xl">{t("finalCta.title")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-muted">{t("finalCta.desc")}</p>

          <div className="mt-9">
            <CopyCommand command={t("finalCta.command")} />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="https://app.sprintable.ai/login"
              className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-[oklch(30%_0.012_265)]"
            >
              {t("finalCta.primary")}
            </a>
            <a
              href="https://github.com/moonklabs/sprintable#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-line bg-white px-6 py-3 text-sm font-medium text-ink transition hover:bg-paper-2"
            >
              {t("finalCta.secondary")}
            </a>
          </div>
        </div>

        <ol className="relative mt-16 grid gap-8 border-t border-line pt-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line text-xs font-medium tabular-nums text-ink">
                {i + 1}
              </span>
              <div>
                <h3 className="text-[15px] font-medium text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Spotlight>
    </section>
  );
}
