import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Spotlight } from "../ui/spotlight";

/* 두 운영 방식을 "내 에이전트 → MCP → Sprintable" 연결 도식과 같은 행 구조로 나란히 비교한다 */
export async function ModelSection() {
  const t = await getTranslations();
  const columns = [
    { key: "byoa", bullets: t.raw("model.byoa.bullets") as string[], target: t("model.diagram.self") },
    { key: "serving", bullets: t.raw("model.serving.bullets") as string[], target: t("model.diagram.cloud") },
  ];

  return (
    <section id="model" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">{t("model.title")}</h2>
          <p className="mt-4 text-lg leading-8 text-muted">{t("model.subtitle")}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {columns.map(({ key, bullets, target }, i) => (
            <Spotlight
              key={key}
              radius={340}
              className={`rounded-2xl border p-7 ${
                i === 1 ? "border-ink bg-ink text-white" : "border-line bg-white"
              }`}
              color={i === 1 ? "oklch(100% 0 0 / 0.10)" : "oklch(50% 0.17 255 / 0.08)"}
            >
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium">
                <span className={`rounded-full border px-3 py-1.5 ${i === 1 ? "border-white/25" : "border-line bg-paper"}`}>
                  {t("model.diagram.agents")}
                </span>
                <ArrowRight className="size-3.5 opacity-50" aria-hidden="true" />
                <span className={`rounded-full border px-3 py-1.5 ${i === 1 ? "border-white/25" : "border-line bg-paper"}`}>
                  {t("model.diagram.mcp")}
                </span>
                <ArrowRight className="size-3.5 opacity-50" aria-hidden="true" />
                <span className={`rounded-full px-3 py-1.5 ${i === 1 ? "bg-white text-ink" : "bg-ink text-white"}`}>{target}</span>
              </div>

              <h3 className="mt-7 text-2xl font-medium tracking-[-0.025em]">{t(`model.${key}.title`)}</h3>
              <p className={`mt-2 text-[15px] leading-7 ${i === 1 ? "text-white/70" : "text-muted"}`}>{t(`model.${key}.desc`)}</p>
              <ul className="mt-6">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className={`border-t py-3 text-sm leading-6 ${i === 1 ? "border-white/15 text-white/90" : "border-line text-ink"}`}
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </Spotlight>
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-7 text-muted">{t("model.bridge")}</p>
      </div>
    </section>
  );
}
