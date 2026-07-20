import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "../motion/scroll-reveal";
import { Parallax } from "../motion/parallax";
import { CommandChip } from "../ui/command-chip";
import { SealEmblem } from "../brand/seal-emblem";

export async function FinalCtaSection() {
  const t = await getTranslations();

  return (
    <section className="relative px-5 py-20 sm:px-8 sm:py-28">
      {/* Ambient orb — slow parallax drift behind the CTA card */}
      <Parallax speed={0.14} className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
        <div
          aria-hidden="true"
          className="aurora-orb h-[28rem] w-[42rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, oklch(72% 0.14 258 / 0.12), transparent 70%)" }}
        />
      </Parallax>

      <ScrollReveal direction="scale">
        <div
          className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl p-10 text-center sm:p-16"
          style={{
            border: "1px solid oklch(72% 0.14 258 / 0.2)",
            background:
              "radial-gradient(ellipse 100% 80% at 50% 0%, oklch(72% 0.14 258 / 0.12), oklch(16% 0.018 265) 70%)",
          }}
        >
          {/* Document-seal watermark — the certificate closes the Claimed→Verified arc */}
          <div
            aria-hidden="true"
            className="seal-scrub pointer-events-none absolute -bottom-16 -right-12 size-64 opacity-[0.07] sm:-bottom-20 sm:-right-14 sm:size-80"
            style={{ color: "oklch(78% 0.1 258)" }}
          >
            <SealEmblem className="size-full" />
          </div>
          <div className="relative">
            <p
              className="eyebrow-cross mb-4 text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: "oklch(65% 0.06 258)" }}
            >
              {t("finalCta.eyebrow")}
            </p>
            <h2
              className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
              style={{ color: "oklch(93% 0.02 265)" }}
            >
              {t("finalCta.title")}
            </h2>
            <p
              className="mx-auto mt-5 max-w-xl text-base leading-8"
              style={{ color: "oklch(65% 0.025 265)" }}
            >
              {t("finalCta.desc")}
            </p>
            <div className="mt-8 flex justify-center">
              <CommandChip command={t("hero.command")} copiedLabel={t("hero.commandCopied")} />
            </div>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://app.sprintable.ai/login"
                className="btn-glow inline-flex items-center justify-center rounded-[var(--radius)] px-7 py-3.5 text-sm font-semibold"
                style={{
                  backgroundColor: "oklch(72% 0.14 258)",
                  color: "oklch(18% 0.06 258)",
                  boxShadow: "0 8px 32px oklch(72% 0.14 258 / 0.22)",
                }}
              >
                {t("finalCta.primary")}
              </a>
              <a
                href="https://github.com/moonklabs/sprintable#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift inline-flex items-center justify-center rounded-[var(--radius)] px-7 py-3.5 text-sm font-medium"
                style={{
                  border: "1px solid oklch(26% 0.022 265)",
                  backgroundColor: "oklch(17% 0.018 265)",
                  color: "oklch(72% 0.025 265)",
                }}
              >
                {t("finalCta.secondary")}
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
