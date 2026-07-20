import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "../motion/scroll-reveal";

const STEP_KEYS = ["step1", "step2", "step3"] as const;

/* Abstract diff strip — evidence, not data: no numbers, no fake metrics */
function DiffObject() {
  const LINES = [
    { w: "62%", tone: "add" },
    { w: "40%", tone: "del" },
    { w: "78%", tone: "add" },
    { w: "52%", tone: "ctx" },
  ] as const;
  const TONES = {
    add: { bar: "oklch(56% 0.13 150 / 0.45)", sign: "+", color: "oklch(56% 0.13 150)" },
    del: { bar: "oklch(55% 0.18 25 / 0.35)", sign: "−", color: "oklch(50% 0.18 25 / 0.9)" },
    ctx: { bar: "oklch(60% 0.03 265 / 0.4)", sign: "·", color: "oklch(57% 0.015 265)" },
  } as const;
  return (
    <div className="flex w-24 flex-col gap-1.5" aria-hidden="true">
      {LINES.map((l, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <span className="w-2 font-mono text-[10px] leading-none" style={{ color: TONES[l.tone].color }}>
            {TONES[l.tone].sign}
          </span>
          <span
            className="h-1 rounded-full"
            style={{ width: l.w, backgroundColor: TONES[l.tone].bar }}
          />
        </div>
      ))}
    </div>
  );
}

/* One-click gate controls — approve solid, reject ghost */
function GateObject() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      <span
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-mono text-[10px] font-bold"
        style={{ backgroundColor: "oklch(56% 0.13 150 / 0.12)", color: "oklch(56% 0.13 150)", border: "1px solid oklch(56% 0.13 150 / 0.3)" }}
      >
        ✓
      </span>
      <span
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-mono text-[10px] font-bold"
        style={{ border: "1px solid oklch(84% 0.012 265)", color: "oklch(57% 0.015 265)" }}
      >
        ↩
      </span>
    </div>
  );
}

/* Human signature — draws itself when the section reveals */
function SignatureObject() {
  return (
    <svg viewBox="0 0 150 44" className="sig-draw h-9 w-28" aria-hidden="true" fill="none">
      <path
        d="M8 32 C 26 4, 38 42, 56 24 S 84 8, 92 26 S 118 40, 128 18 C 132 10, 138 14, 144 22"
        stroke="oklch(48% 0.17 260)"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

const STEP_OBJECTS = [DiffObject, GateObject, SignatureObject] as const;

export async function TrustSection() {
  const t = await getTranslations();

  return (
    <section
      id="trust"
      className="overflow-x-clip py-20 sm:py-28"
      style={{ backgroundColor: "oklch(96.8% 0.008 80)" }}
    >
      {/* Ghost strip — subtle blue outline on canvas-tint, drifting with scroll */}
      <div
        aria-hidden="true"
        className="ghost-strip pointer-events-none select-none mb-14 sm:mb-20"
      >
        <div
          className="ghost-strip-inner whitespace-nowrap font-[family-name:var(--font-display)] font-extrabold uppercase leading-none tracking-[-0.02em]"
          style={{
            fontSize: "clamp(4.5rem, 11vw, 10rem)",
            color: "transparent",
            WebkitTextStroke: "1.5px oklch(48% 0.17 260 / 0.18)",
          }}
        >
          Claimed → Gate → Verified&ensp;·&ensp;Claimed → Gate → Verified
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal className="mx-auto max-w-3xl space-y-4 text-center">
          <p
            className="eyebrow-cross text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "oklch(48% 0.17 260)" }}
          >
            {t("trust.label")}
          </p>
          <h2
            className="whitespace-pre-line font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl"
            style={{ color: "oklch(22% 0.025 265)" }}
          >
            {t("trust.title")}
          </h2>
          <p className="text-base leading-7" style={{ color: "oklch(45% 0.02 265)" }}>
            {t("trust.subtitle")}
          </p>
        </ScrollReveal>

        {/* 승인 전 Review 흐름 — 각 단계가 증거 오브젝트(diff·게이트 버튼·서명)를 품는다 */}
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {STEP_KEYS.map((key, i) => {
            const StepObject = STEP_OBJECTS[i]!;
            return (
              <ScrollReveal
                key={key}
                delay={i * 110}
                className="card-lift rounded-2xl p-7"
                style={{ border: "1px solid oklch(84% 0.012 265)", backgroundColor: "oklch(100% 0 0)" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="inline-flex size-8 items-center justify-center rounded-full font-mono text-xs font-bold"
                    style={{
                      border: "1px solid oklch(48% 0.17 260 / 0.35)",
                      backgroundColor: "oklch(48% 0.17 260 / 0.08)",
                      color: "oklch(48% 0.17 260)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <StepObject />
                </div>
                <h3
                  className="mt-5 font-[family-name:var(--font-display)] text-lg font-bold"
                  style={{ color: "oklch(22% 0.025 265)" }}
                >
                  {t(`trust.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-7" style={{ color: "oklch(45% 0.02 265)" }}>
                  {t(`trust.${key}.desc`)}
                </p>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Advisor — accent-wash bg + accent 20% border */}
        <ScrollReveal
          delay={120}
          className="card-lift mt-4 rounded-2xl p-7"
          style={{
            border: "1px solid oklch(48% 0.17 260 / 0.2)",
            background:
              "linear-gradient(160deg, oklch(48% 0.17 260 / 0.07) 0%, oklch(100% 0 0) 60%)",
          }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <h3
              className="font-[family-name:var(--font-display)] text-lg font-bold"
              style={{ color: "oklch(22% 0.025 265)" }}
            >
              {t("trust.advisor.title")}
            </h3>
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest"
              style={{
                border: "1px solid oklch(48% 0.17 260 / 0.35)",
                backgroundColor: "oklch(48% 0.17 260 / 0.08)",
                color: "oklch(48% 0.17 260)",
              }}
            >
              {t("trust.advisor.badge")}
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-7" style={{ color: "oklch(45% 0.02 265)" }}>
            {t("trust.advisor.desc")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
