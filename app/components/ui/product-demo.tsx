"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import {
  ClipboardList,
  FlaskConical,
  Inbox,
  Layers,
  Map as MapIcon,
  Newspaper,
  Pause,
  Play,
  RotateCcw,
  SquareKanban,
} from "lucide-react";
import { trackFeatureEngage } from "../../lib/tracking";

type View = "briefing" | "board" | "activity";
type ColumnKey = "backlog" | "inProgress" | "inReview" | "done";

const VIEW_PATH: Record<View, string> = { briefing: "org-briefing", board: "board", activity: "activity-log" };

const LAST_STEP = 4;
const REVIEW_STEP = 3;
/* 각 스텝이 기본으로 보여주는 화면 — 본앱 사이드바 메뉴명과 1:1 */
const STEP_VIEW: View[] = ["board", "board", "board", "briefing", "activity"];
/* 스텝 체류 시간(ms). 검토 스텝은 방문자가 직접 누를 시간을 준다 */
const STEP_MS = [3200, 3000, 3200, 7000];

const COLUMNS: { key: ColumnKey; dot: string }[] = [
  { key: "backlog", dot: "oklch(70% 0.02 265)" },
  { key: "inProgress", dot: "oklch(75% 0.15 85)" },
  { key: "inReview", dot: "oklch(58% 0.15 150)" },
  { key: "done", dot: "oklch(50% 0.17 255)" },
];

const STATUS_COLOR: Record<ColumnKey, string> = {
  backlog: "oklch(58% 0.13 70)",
  inProgress: "oklch(50% 0.2 265)",
  inReview: "oklch(58% 0.15 55)",
  done: "oklch(50% 0.13 150)",
};

/* 본앱 라이트 테마 토큰 — 데모 창 안에서만 쓴다 */
const APP_THEME = {
  "--d-bg": "oklch(99.5% 0.001 265)",
  "--d-side": "oklch(96.5% 0.003 265)",
  "--d-line": "oklch(91% 0.005 265)",
  "--d-text": "oklch(21% 0.012 265)",
  "--d-muted": "oklch(50% 0.012 265)",
  "--d-blue": "oklch(50% 0.17 255)",
  "--d-green": "oklch(50% 0.13 150)",
} as CSSProperties;

function storyColumn(id: number, step: number): ColumnKey {
  if (id === 2) return step >= 1 ? "inProgress" : "backlog";
  if (id === 4) return step >= LAST_STEP ? "done" : step >= 2 ? "inReview" : "inProgress";
  if (id === 5) return "inReview";
  return "backlog";
}

export function ProductDemo() {
  const t = useTranslations("demo");
  const [step, setStep] = useState(0);
  const [view, setView] = useState<View>("board");
  const [playing, setPlaying] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef(new Map<number, HTMLElement>());
  const prevRects = useRef(new Map<number, { x: number; y: number }>());
  const reducedMotion = useRef(false);

  const steps = t.raw("steps") as { title: string; caption: string }[];

  function goTo(next: number) {
    setStep(next);
    setView(STEP_VIEW[next] ?? "board");
    if (next >= LAST_STEP) setPlaying(false);
  }

  /* 화면에 들어왔을 때 한 번만 재생. 모션 줄이기 설정이면 완성 상태를 바로 보여준다 */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        if (reducedMotion.current) {
          setStep(LAST_STEP);
          setView("activity");
        } else {
          setPlaying(true);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* 히어로의 "데모 실행" 버튼이 처음부터 다시 재생시킨다 */
  useEffect(() => {
    const run = () => {
      setStep(0);
      setView(STEP_VIEW[0] ?? "board");
      setPlaying(true);
    };
    window.addEventListener("sprintable:demo-run", run);
    return () => window.removeEventListener("sprintable:demo-run", run);
  }, []);

  useEffect(() => {
    if (!playing || step >= LAST_STEP) return;
    const timer = window.setTimeout(() => goTo(step + 1), STEP_MS[step]);
    return () => window.clearTimeout(timer);
  }, [playing, step]);

  /* 카드가 컬럼을 옮길 때 이전 위치에서 미끄러져 오게 한다(FLIP) */
  useLayoutEffect(() => {
    const board = boardRef.current;
    if (view !== "board" || !board) {
      prevRects.current.clear();
      return;
    }
    const origin = board.getBoundingClientRect();
    cardRefs.current.forEach((el, id) => {
      const rect = el.getBoundingClientRect();
      const pos = { x: rect.left - origin.left + board.scrollLeft, y: rect.top - origin.top };
      const prev = prevRects.current.get(id);
      prevRects.current.set(id, pos);
      if (!prev || reducedMotion.current) return;
      const dx = prev.x - pos.x;
      const dy = prev.y - pos.y;
      if (dx === 0 && dy === 0) return;
      el.animate(
        [
          { transform: `translate(${dx}px, ${dy}px)`, boxShadow: "0 12px 28px oklch(21% 0.012 265 / 0.18)" },
          { transform: "none", boxShadow: "0 0 0 oklch(21% 0.012 265 / 0)" },
        ],
        { duration: 620, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
      );
    });
  }, [step, view]);

  function selectStep(next: number) {
    setPlaying(false);
    goTo(next);
  }

  function selectView(next: View) {
    setPlaying(false);
    setView(next);
  }

  function togglePlay() {
    if (step >= LAST_STEP) {
      goTo(0);
      setPlaying(true);
    } else {
      setPlaying((p) => !p);
    }
  }

  function review() {
    trackFeatureEngage({ feature_name: "hero_demo_review" });
    goTo(LAST_STEP);
  }

  const stories = [
    { id: 3, title: t("app.story3") },
    { id: 2, title: t("app.story2") },
    { id: 4, title: t("app.story4") },
    { id: 5, title: t("app.story5") },
  ];

  const terminalLines: { key: string; kind: "prompt" | "call" | "ok" | "pending" | "result"; text: string }[] = [
    { key: "prompt", kind: "prompt", text: t("terminal.prompt") },
    { key: "auth", kind: "ok", text: t("terminal.auth") },
    { key: "project", kind: "ok", text: t("terminal.project") },
    { key: "tools", kind: "ok", text: t("terminal.tools") },
    { key: "bridge", kind: "result", text: t("terminal.bridge") },
  ];
  if (step >= 1) {
    terminalLines.push(
      { key: "c1", kind: "call", text: "claim_story(2)" },
      { key: "c1ok", kind: "ok", text: t("terminal.claimOk") },
      { key: "c2", kind: "call", text: 'update_story_status(2, "in_progress")' },
      { key: "c2ok", kind: "ok", text: t("terminal.statusOk") },
    );
  }
  if (step >= 2) {
    terminalLines.push(
      { key: "c3", kind: "call", text: 'update_story_status(4, "in_review")' },
      { key: "c3ok", kind: "ok", text: t("terminal.reviewOk") },
    );
  }
  if (step === REVIEW_STEP) {
    terminalLines.push({ key: "wait", kind: "pending", text: t("terminal.waiting") });
  }
  if (step >= LAST_STEP) {
    terminalLines.push(
      { key: "verified", kind: "ok", text: t("terminal.verified") },
      { key: "next", kind: "result", text: t("terminal.next") },
    );
  }

  const activity = [
    { key: "connect", who: "AL", by: t("app.byAgent"), text: t("app.logConnect"), from: 0 },
    { key: "claim", who: "AL", by: t("app.byAgent"), text: t("app.logClaim"), from: 1 },
    { key: "submit", who: "AL", by: t("app.byAgent"), text: t("app.logSubmit"), from: 2 },
    { key: "waiting", who: "", by: t("app.bySystem"), text: t("app.logWaiting"), from: 3 },
    { key: "verified", who: "LD", by: t("app.byHuman"), text: t("app.logVerified"), from: 4 },
  ]
    .filter((row) => step >= row.from)
    .reverse();

  const tabs: { view: View; label: string; icon: typeof Inbox; badge?: boolean }[] = [
    { view: "briefing", label: t("app.briefing"), icon: Newspaper, badge: step === REVIEW_STEP },
    { view: "board", label: t("app.board"), icon: SquareKanban },
    { view: "activity", label: t("app.activity"), icon: ClipboardList },
  ];
  const tabFor = (v: View) => tabs.find((tab) => tab.view === v)!;

  function renderTab(v: View) {
    const tab = tabFor(v);
    const Icon = tab.icon;
    const selected = view === v;
    return (
      <button
        type="button"
        role="tab"
        id={`demo-tab-${v}`}
        aria-selected={selected}
        aria-controls="demo-panel"
        onClick={() => selectView(v)}
        className="flex shrink-0 items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-[13px] font-medium transition-colors hover:bg-[oklch(93%_0.005_265)]"
        style={{ backgroundColor: selected ? "oklch(92% 0.006 265)" : undefined }}
      >
        <Icon className="size-3.5" aria-hidden="true" />
        <span className="flex-1">{tab.label}</span>
        {tab.badge && (
          <span
            className="rounded-full px-1.5 text-[11px] font-semibold text-white"
            style={{ backgroundColor: "var(--d-blue)" }}
          >
            1
          </span>
        )}
      </button>
    );
  }

  function renderIdle(label: string, Icon: typeof Inbox) {
    return (
      <span
        aria-hidden="true"
        className="hidden items-center gap-2 px-2.5 py-1.5 text-[13px] text-[var(--d-muted)] lg:flex"
      >
        <Icon className="size-3.5" />
        {label}
      </span>
    );
  }

  function renderGroup(label: string) {
    return (
      <span aria-hidden="true" className="hidden px-2.5 pb-1 pt-3 text-[11px] text-[var(--d-muted)] lg:block">
        {label}
      </span>
    );
  }

  return (
    <div id="demo" ref={rootRef} role="group" aria-label={t("label")} className="scroll-mt-24">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,1fr)]">
        {/* ── 에이전트 쪽: 터미널 ── */}
        <div className="flex min-w-0 flex-col">
          <p className="mb-2 text-sm text-muted">
            {t("agentPane")}
          </p>
          <div
            className="flex h-44 flex-1 flex-col overflow-hidden rounded-xl lg:h-auto"
            style={{ border: "1px solid oklch(26% 0.022 265)", backgroundColor: "oklch(10.5% 0.012 265)" }}
          >
            <div
              className="flex items-center gap-3 border-b px-4 py-2.5"
              style={{ borderColor: "oklch(22% 0.018 265)" }}
            >
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: "oklch(32% 0.02 265)" }} />
                <span className="size-2.5 rounded-full" style={{ backgroundColor: "oklch(32% 0.02 265)" }} />
                <span className="size-2.5 rounded-full" style={{ backgroundColor: "oklch(32% 0.02 265)" }} />
              </div>
              <span className="font-mono text-xs" style={{ color: "oklch(55% 0.02 265)" }}>
                {t("terminal.title")}
              </span>
            </div>
            <div
              className="flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-4 py-3 font-mono text-[12.5px] leading-6"
              style={{ color: "oklch(72% 0.025 265)" }}
            >
              {terminalLines.map((line) => (
                <div key={line.key} className="demo-line flex gap-2">
                  {line.kind === "prompt" && <span style={{ color: "oklch(72% 0.14 258)" }}>$</span>}
                  {line.kind === "call" && <span style={{ color: "oklch(72% 0.14 258)" }}>›</span>}
                  {line.kind === "ok" && <span style={{ color: "oklch(70% 0.16 145)" }}>✓</span>}
                  {line.kind === "result" && <span style={{ color: "oklch(55% 0.02 265)" }}>·</span>}
                  {line.kind === "pending" && (
                    <span className="demo-blink" style={{ color: "oklch(78% 0.15 85)" }}>
                      ●
                    </span>
                  )}
                  <span
                    className="min-w-0 break-words"
                    style={{
                      color:
                        line.kind === "prompt" || line.kind === "call"
                          ? "oklch(92% 0.025 265)"
                          : line.kind === "pending"
                            ? "oklch(82% 0.1 85)"
                            : undefined,
                    }}
                  >
                    {line.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 팀 쪽: 본앱 화면 ── */}
        <div className="flex min-w-0 flex-col">
          <p className="mb-2 text-sm text-muted">
            {t("teamPane")}
          </p>
          <div
            className="flex flex-1 flex-col overflow-hidden rounded-xl border border-line bg-white text-[var(--d-text)] shadow-[0_24px_60px_-28px_oklch(30%_0.04_265/0.35)]"
            style={APP_THEME}
          >
            <div className="flex items-center gap-3 border-b border-[var(--d-line)] px-3.5 py-2" aria-hidden="true">
              <span className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[oklch(85%_0.005_265)]" />
                <span className="size-2.5 rounded-full bg-[oklch(85%_0.005_265)]" />
                <span className="size-2.5 rounded-full bg-[oklch(85%_0.005_265)]" />
              </span>
              <span className="flex-1 truncate rounded-md bg-[var(--d-side)] px-3 py-1 text-center text-[11px] text-[var(--d-muted)]">
                app.sprintable.ai/{VIEW_PATH[view]}
              </span>
            </div>
            <div className="flex min-h-0 flex-1 flex-col bg-[var(--d-side)] lg:flex-row">
            <div className="shrink-0 border-b border-[var(--d-line)] p-2 lg:w-44 lg:border-b-0 lg:p-3">
              <div className="hidden items-center gap-2 px-1 pb-2 lg:flex">
                <span
                  className="flex size-5 items-center justify-center rounded-md text-[10px] font-bold text-white"
                  style={{ backgroundColor: "var(--d-blue)" }}
                  aria-hidden="true"
                >
                  N
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-[12px] font-semibold">{t("app.org")}</span>
                  <span className="block truncate text-[10.5px] text-[var(--d-muted)]">{t("app.project")}</span>
                </span>
              </div>
              <div role="tablist" aria-label={t("teamPane")} className="flex gap-1 overflow-x-auto lg:flex-col lg:gap-0.5">
                {renderGroup(t("app.groupHome"))}
                {renderTab("briefing")}
                {renderIdle(t("app.inbox"), Inbox)}
                {renderGroup(t("app.groupWork"))}
                {renderTab("board")}
                {renderIdle(t("app.goals"), Layers)}
                {renderIdle(t("app.glance"), MapIcon)}
                {renderIdle(t("app.lab"), FlaskConical)}
                {renderGroup(t("app.groupTrust"))}
                {renderTab("activity")}
              </div>
            </div>

            <div
              id="demo-panel"
              role="tabpanel"
              aria-labelledby={`demo-tab-${view}`}
              className="min-h-[26.5rem] min-w-0 flex-1 lg:m-1.5 lg:rounded-lg"
              style={{ backgroundColor: "var(--d-bg)", border: "1px solid var(--d-line)" }}
            >
              {view === "board" && (
                <div className="flex h-full flex-col">
                  <p className="border-b border-[var(--d-line)] px-4 py-2.5 text-[13px] font-semibold">
                    {t("app.boardTitle")}
                  </p>
                  <div ref={boardRef} className="flex flex-1 gap-3 overflow-x-auto p-3">
                    {COLUMNS.map((col) => {
                      const cards = stories.filter((s) => storyColumn(s.id, step) === col.key);
                      return (
                        <div key={col.key} className="w-40 shrink-0 lg:w-auto lg:min-w-0 lg:flex-1 lg:basis-0">
                          <div className="mb-2 flex items-center gap-1.5 px-1 text-[12px] font-semibold">
                            <span className="size-1.5 rounded-full" style={{ backgroundColor: col.dot }} aria-hidden="true" />
                            <span className="flex-1">{t(`app.${col.key}`)}</span>
                            <span className="font-normal text-[var(--d-muted)]">{cards.length}</span>
                          </div>
                          <div className="space-y-2">
                            {cards.length === 0 && (
                              <p className="py-5 text-center text-[12px] text-[var(--d-muted)]">{t("app.noStories")}</p>
                            )}
                            {cards.map((story) => {
                              const isAgent = story.id === 2 && step >= 1;
                              const claimed = story.id === 4 && col.key === "inReview";
                              const verified = story.id === 4 && col.key === "done";
                              return (
                                <div
                                  key={story.id}
                                  ref={(el) => {
                                    if (el) cardRefs.current.set(story.id, el);
                                    else cardRefs.current.delete(story.id);
                                  }}
                                  className="relative rounded-md bg-white p-2.5 text-[12px]"
                                  style={{
                                    border: "1px solid var(--d-line)",
                                    borderLeft: `3px solid ${STATUS_COLOR[col.key]}`,
                                  }}
                                >
                                  <p className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: STATUS_COLOR[col.key] }}>
                                    <span className="size-1 rounded-full bg-current" aria-hidden="true" />
                                    {t(`app.${col.key}`)}
                                  </p>
                                  <p className="mt-1 font-semibold leading-snug">
                                    #{story.id} {story.title}
                                  </p>
                                  <p className="mt-1.5 truncate text-[11px] text-[var(--d-muted)]">{t("app.goal")}</p>
                                  {(claimed || verified) && (
                                    <p
                                      className="demo-line mt-2 rounded px-1.5 py-1 text-[11px] font-medium leading-snug"
                                      style={
                                        verified
                                          ? { backgroundColor: "oklch(95% 0.04 150)", color: "oklch(40% 0.12 150)" }
                                          : { backgroundColor: "oklch(95% 0.03 255)", color: "oklch(42% 0.15 255)" }
                                      }
                                    >
                                      {verified ? t("app.verifiedChip") : t("app.claimChip")}
                                    </p>
                                  )}
                                  {story.id === 5 && (
                                    <p className="mt-2 flex items-center gap-1.5 text-[11px] text-[var(--d-muted)]">
                                      <span
                                        className="flex size-5 items-center justify-center rounded-full text-[9px] font-semibold"
                                        style={{ backgroundColor: "oklch(93% 0.006 265)", color: "var(--d-muted)" }}
                                        aria-hidden="true"
                                      >
                                        LD
                                      </span>
                                      Landing Demo
                                    </p>
                                  )}
                                  {(story.id === 4 || isAgent) && (
                                    <p className="mt-2 flex items-center gap-1.5 text-[11px] text-[var(--d-muted)]">
                                      <span
                                        className="flex size-5 items-center justify-center rounded-full text-[9px] font-semibold"
                                        style={{ backgroundColor: "oklch(93% 0.03 200)", color: "oklch(38% 0.08 200)" }}
                                        aria-hidden="true"
                                      >
                                        AL
                                      </span>
                                      Alex, {t("app.agentTag")}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {view === "briefing" && (
                <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
                  <p className="text-[15px] font-semibold">{t("app.briefingTitle")}</p>
                  <p className="mt-1 text-[12.5px] text-[var(--d-muted)]">{t("app.briefingSub")}</p>

                  <div className="mt-5 flex items-center gap-2 text-[13px] font-semibold">
                    <span
                      className="rounded px-1.5 py-0.5 text-[10.5px] font-bold"
                      style={{ backgroundColor: "oklch(94% 0.03 255)", color: "var(--d-blue)" }}
                    >
                      {t("app.now")}
                    </span>
                    <span className="flex-1">{t("app.requests")}</span>
                    <span className="text-[11.5px] font-normal text-[var(--d-muted)]">
                      {t("app.toReview", { count: step === REVIEW_STEP ? 1 : 0 })}
                    </span>
                  </div>

                  {step === REVIEW_STEP ? (
                    <div
                      className="demo-line mt-2 flex flex-wrap items-center gap-3 rounded-xl p-3"
                      style={{ border: "1px solid var(--d-line)" }}
                    >
                      <span
                        className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                        style={{ border: "1px solid oklch(80% 0.08 255)", color: "var(--d-blue)" }}
                      >
                        {t("app.decisionWaiting")}
                      </span>
                      <span className="min-w-0 flex-1 basis-40">
                        <span className="block text-[13px] font-medium">{t("app.story4")}</span>
                        <span className="block text-[11.5px] text-[var(--d-muted)]">{t("app.needsReview")}</span>
                      </span>
                      <button
                        type="button"
                        onClick={review}
                        className="demo-attention rounded-md px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--d-blue)] active:scale-[0.98]"
                        style={{ backgroundColor: "var(--d-blue)" }}
                      >
                        {t("app.review")}
                      </button>
                    </div>
                  ) : (
                    <p
                      className="mt-2 rounded-xl p-3 text-[12.5px] text-[var(--d-muted)]"
                      style={{ border: "1px dashed var(--d-line)" }}
                    >
                      {t("app.nothingWaiting")}
                    </p>
                  )}
                  <p className="mt-2 hidden text-[11.5px] text-[var(--d-muted)] sm:block">{t("app.requestsNote")}</p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl p-3.5" style={{ border: "1px solid var(--d-line)" }}>
                      <p className="flex items-baseline gap-2 border-b border-[var(--d-line)] pb-2 text-[13px] font-semibold">
                        {t("app.lab")}
                        <span className="text-[11px] font-normal text-[var(--d-muted)]">{t("app.labSub")}</span>
                      </p>
                      <p className="mt-2.5 text-[12.5px] leading-snug">{t("app.hypothesis")}</p>
                      <span
                        className="mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium"
                        style={{ border: "1px solid oklch(80% 0.08 255)", color: "var(--d-blue)" }}
                      >
                        {t("app.testing")}
                      </span>
                      <div className="mt-2.5 h-1 overflow-hidden rounded-full" style={{ backgroundColor: "oklch(93% 0.005 265)" }}>
                        <div
                          className="h-full rounded-full transition-[width] duration-700"
                          style={{ width: step >= LAST_STEP ? "46%" : "20%", backgroundColor: "var(--d-blue)" }}
                        />
                      </div>
                    </div>
                    <div className="rounded-xl p-3.5" style={{ border: "1px solid var(--d-line)" }}>
                      <p className="flex items-baseline gap-2 border-b border-[var(--d-line)] pb-2 text-[13px] font-semibold">
                        {t("app.workforce")}
                        <span className="text-[11px] font-normal text-[var(--d-muted)]">{t("app.workforceSub")}</span>
                      </p>
                      <p className="mt-2.5 text-[12.5px] leading-snug">{t("app.goal")}</p>
                      <p className="mt-2 flex items-center gap-2 text-[11.5px] text-[var(--d-muted)]">
                        <span className="flex" aria-hidden="true">
                          {["A", "L"].map((initial) => (
                            <span
                              key={initial}
                              className="-ml-1 flex size-5 items-center justify-center rounded-full text-[9px] font-semibold first:ml-0"
                              style={{ backgroundColor: "oklch(94% 0.03 255)", color: "var(--d-blue)", border: "1px solid white" }}
                            >
                              {initial}
                            </span>
                          ))}
                        </span>
                        {t("app.workingTogether")}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {view === "activity" && (
                <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
                  <p className="text-[15px] font-semibold">{t("app.activityTitle")}</p>
                  <p className="mt-1 text-[12.5px] text-[var(--d-muted)]">{t("app.activitySub")}</p>
                  <ol className="mt-4">
                    {activity.map((row) => {
                      const verified = row.key === "verified";
                      return (
                        <li
                          key={row.key}
                          className="demo-line flex items-center gap-3 border-b border-[var(--d-line)] py-2.5 text-[12.5px] last:border-b-0"
                        >
                          <span
                            className="flex size-6 shrink-0 items-center justify-center rounded-full text-[9.5px] font-semibold"
                            style={
                              verified
                                ? { backgroundColor: "oklch(93% 0.05 150)", color: "oklch(38% 0.12 150)" }
                                : { backgroundColor: "oklch(94% 0.006 265)", color: "var(--d-muted)" }
                            }
                            aria-hidden="true"
                          >
                            {row.who || "–"}
                          </span>
                          <span className={`min-w-0 flex-1 leading-snug ${verified ? "font-semibold" : ""}`}>{row.text}</span>
                          <span className="shrink-0 text-[11px] text-[var(--d-muted)]">{row.by}</span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 스텝 컨트롤 ── */}
      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:bg-paper-2"
            aria-label={step >= LAST_STEP ? t("replay") : playing ? t("pause") : t("play")}
          >
            {step >= LAST_STEP ? (
              <RotateCcw className="size-4" aria-hidden="true" />
            ) : playing ? (
              <Pause className="size-4" aria-hidden="true" />
            ) : (
              <Play className="size-4" aria-hidden="true" />
            )}
          </button>
          <ol className="flex flex-wrap gap-1">
            {steps.map((s, i) => {
              const current = i === step;
              return (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => selectStep(i)}
                    aria-current={current ? "step" : undefined}
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                      current
                        ? "bg-ink text-white"
                        : i < step
                          ? "text-ink hover:bg-paper-2"
                          : "text-faint hover:text-ink"
                    }`}
                  >
                    <span className="tabular-nums">{i + 1}</span>
                    {s.title}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <p aria-live="polite" className="min-h-12 max-w-2xl text-sm leading-6 text-muted sm:pl-11">
          {steps[step]?.caption}
        </p>
      </div>
    </div>
  );
}
