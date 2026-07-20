import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "../motion/scroll-reveal";
import { Parallax } from "../motion/parallax";
import { CommandChip } from "../ui/command-chip";
import { SealEmblem } from "../brand/seal-emblem";
import { Guilloche } from "../brand/guilloche";

export async function FinalCtaSection() {
  const t = await getTranslations();

  return (
    /* Full-bleed deep blue band — the page's only dark moment, a climax.
       rounded-t-[2.5rem] creates the "card lifting from canvas" effect. */
    <section
      className="relative isolate overflow-hidden rounded-t-[2.5rem] px-5 py-20 sm:px-8 sm:py-28"
      style={{
        background: "linear-gradient(160deg, oklch(28% 0.1 262), oklch(20% 0.04 265))",
      }}
    >
      {/* Paper grain — the dark band keeps the same tactile texture */}
      <div className="grain-layer" aria-hidden="true" />

      {/* Guilloche security-paper texture — warm cream at near-zero opacity on dark band */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-[0.06]"
        style={{ color: "oklch(95% 0.005 85)" }}
      >
        <Guilloche className="h-full w-full" />
      </div>

      {/* Ambient mesh orb — slow parallax drift behind content */}
      <Parallax speed={0.14} className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
        <div
          aria-hidden="true"
          className="aurora-orb h-[28rem] w-[42rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, oklch(48% 0.17 260 / 0.22), transparent 70%)" }}
        />
      </Parallax>

      <ScrollReveal direction="scale">
        <div className="relative mx-auto max-w-4xl text-center">
          {/* Document-seal watermark — white/light-blue ink, the certificate closes Claimed→Verified */}
          <div
            aria-hidden="true"
            className="seal-scrub pointer-events-none absolute -bottom-16 -right-12 size-64 opacity-[0.12] sm:-bottom-20 sm:-right-14 sm:size-80"
            style={{ color: "oklch(72% 0.09 85)" }}
          >
            <SealEmblem className="size-full" />
          </div>

          <div className="relative">
            <p
              className="eyebrow-cross mb-4 text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: "oklch(65% 0.08 260)" }}
            >
              {t("finalCta.eyebrow")}
            </p>
            <h2
              className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
              style={{ color: "oklch(97% 0.01 265)" }}
            >
              {t("finalCta.title")}
            </h2>
            <p
              className="mx-auto mt-5 max-w-xl text-base leading-8"
              style={{ color: "oklch(72% 0.025 265)" }}
            >
              {t("finalCta.desc")}
            </p>
            <div className="mt-8 flex justify-center">
              {/* CommandChip + white/20 ring — separates the dark chip from the dark band */}
              <div
                className="inline-block rounded-[0.625rem]"
                style={{ boxShadow: "0 0 0 1px oklch(100% 0 0 / 0.2)" }}
              >
                <CommandChip command={t("hero.command")} copiedLabel={t("hero.commandCopied")} />
              </div>
            </div>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              {/* Primary CTA — white button + deep blue text (反転: light on dark band) */}
              <a
                href="https://app.sprintable.ai/login"
                className="btn-glow inline-flex items-center justify-center rounded-[var(--radius)] px-7 py-3.5 text-sm font-semibold"
                style={{
                  backgroundColor: "oklch(100% 0 0)",
                  color: "oklch(28% 0.1 262)",
                  boxShadow: "0 1px 2px oklch(10% 0.02 265 / 0.25), 0 8px 24px -6px oklch(10% 0.02 265 / 0.3)",
                }}
              >
                {t("finalCta.primary")}
              </a>
              {/* Secondary CTA — ghost on dark band */}
              <a
                href="https://github.com/moonklabs/sprintable#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift inline-flex items-center justify-center rounded-[var(--radius)] px-7 py-3.5 text-sm font-medium"
                style={{
                  border: "1px solid oklch(100% 0 0 / 0.3)",
                  backgroundColor: "oklch(100% 0 0 / 0.06)",
                  color: "oklch(100% 0 0)",
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
