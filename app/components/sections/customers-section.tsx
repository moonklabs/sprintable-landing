import { getTranslations } from "next-intl/server";
import { Spotlight } from "../ui/spotlight";

/* 팀 유형마다 작은 샘플 화면을 붙여 "우리 팀이 쓰면 이렇게 보인다"를 바로 읽게 한다 */
function FounderScene({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }) {
  return (
    <div className="space-y-2.5 p-5">
      <p className="text-xs font-medium text-ink">{t("demo.app.requests")}</p>
      <div className="flex items-center gap-3 rounded-lg border border-line bg-white p-3">
        <span className="rounded-full border border-[oklch(80%_0.08_255)] px-2 py-0.5 text-[11px] text-brand">
          {t("demo.app.decisionWaiting")}
        </span>
        <span className="min-w-0 flex-1 truncate text-xs text-ink">{t("demo.app.story4")}</span>
        <span className="rounded-md bg-brand px-2.5 py-1 text-[11px] font-medium text-white">{t("demo.app.review")}</span>
      </div>
      <p className="text-[11px] text-faint">{t("demo.app.requestsNote")}</p>
    </div>
  );
}

function TeamScene({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }) {
  const cols = [
    { key: "backlog", cards: 1, dot: "bg-[oklch(70%_0.02_265)]" },
    { key: "inProgress", cards: 2, dot: "bg-[oklch(75%_0.15_85)]" },
    { key: "inReview", cards: 1, dot: "bg-ok" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2.5 p-5">
      {cols.map((c) => (
        <div key={c.key}>
          <p className="flex items-center gap-1.5 text-[11px] font-medium text-ink">
            <span className={`size-1.5 rounded-full ${c.dot}`} />
            {t(`demo.app.${c.key}`)}
          </p>
          <div className="mt-2 space-y-2">
            {Array.from({ length: c.cards }).map((_, i) => (
              <div key={i} className="rounded-md border border-line bg-white p-2">
                <div className="h-1.5 w-4/5 rounded-full bg-[oklch(90%_0.005_265)]" />
                <div className="mt-1.5 h-1.5 w-3/5 rounded-full bg-[oklch(94%_0.005_265)]" />
                <span className="mt-2 flex size-4 items-center justify-center rounded-full bg-[oklch(93%_0.03_200)] text-[8px] font-semibold text-[oklch(38%_0.08_200)]">
                  {i === 0 ? "AL" : "LD"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function StudioScene({ names }: { names: string[] }) {
  return (
    <div className="space-y-2 p-5">
      {names.map((name, i) => (
        <div
          key={name}
          className={`flex items-center gap-3 rounded-lg border bg-white p-3 ${i === 0 ? "border-brand" : "border-line"}`}
        >
          <span className="flex size-6 items-center justify-center rounded-md bg-ink text-[10px] font-semibold text-white">
            {name.charAt(0)}
          </span>
          <span className="flex-1 text-xs font-medium text-ink">{name}</span>
          <span className="flex">
            {["AL", "LD"].slice(0, i === 2 ? 1 : 2).map((x) => (
              <span
                key={x}
                className="-ml-1 flex size-5 items-center justify-center rounded-full border border-white bg-[oklch(93%_0.03_200)] text-[8px] font-semibold text-[oklch(38%_0.08_200)] first:ml-0"
              >
                {x}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

export async function CustomersSection() {
  const t = await getTranslations();
  const cards = t.raw("customers.cards") as { title: string; desc: string; fit: string }[];
  const names = t.raw("customers.scenes.workspaces") as string[];

  return (
    <section id="customers" className="bg-paper-2 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-xl text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">{t("customers.title")}</h2>
          <p className="max-w-sm text-[15px] leading-7 text-muted">{t("customers.subtitle")}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {cards.map((card, i) => (
            <Spotlight
              key={card.title}
              tilt={3}
              radius={300}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_20px_50px_-32px_oklch(30%_0.04_265/0.35)]"
            >
              <div className="flex h-48 flex-col justify-center border-b border-line bg-paper">
                {i === 0 && <FounderScene t={t} />}
                {i === 1 && <TeamScene t={t} />}
                {i === 2 && <StudioScene names={names} />}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-medium tracking-[-0.025em] text-ink">{card.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-ink">{card.desc}</p>
                <p className="mt-3 text-sm leading-6 text-muted">{card.fit}</p>
              </div>
            </Spotlight>
          ))}
        </div>
      </div>
    </section>
  );
}
