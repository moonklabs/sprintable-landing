"use client";

import Script from "next/script";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { trackWaitlistCtaClick, trackWaitlistFormOpened, trackWaitlistSubmitted } from "../lib/tracking";
import { buildWaitlistHiddenFields, getTallyFormId } from "../lib/waitlist";

type WaitlistContext = {
  source: string;
  plan?: string;
};

type TallyPopupOptions = {
  key: string;
  layout: "modal";
  width: number;
  hideTitle: boolean;
  overlay: boolean;
  doNotShowAfterSubmit: boolean;
  hiddenFields: Record<string, string>;
  onOpen: () => void;
  onSubmit: () => void;
};

declare global {
  interface Window {
    Tally?: {
      openPopup: (formId: string, options: TallyPopupOptions) => void;
    };
  }
}

const TALLY_FORM_ID = getTallyFormId(process.env.NEXT_PUBLIC_TALLY_WAITLIST_FORM_ID);

export function WaitlistPopup() {
  const t = useTranslations("waitlist");
  const queuedContext = useRef<WaitlistContext | null>(null);
  const unavailableDismissRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<"idle" | "opening" | "unavailable">("idle");

  const openPopup = useCallback(
    ({ source, plan }: WaitlistContext) => {
      if (!TALLY_FORM_ID || !window.Tally) return false;

      window.Tally.openPopup(TALLY_FORM_ID, {
        key: "sprintable-waitlist-v1",
        layout: "modal",
        width: 540,
        hideTitle: true,
        overlay: true,
        doNotShowAfterSubmit: true,
        hiddenFields: buildWaitlistHiddenFields({
          pathname: window.location.pathname,
          search: window.location.search,
          source,
          plan,
        }),
        onOpen: () => {
          setStatus("idle");
          trackWaitlistFormOpened({ source, plan });
        },
        onSubmit: () => {
          trackWaitlistSubmitted({ source, plan });
        },
      });

      return true;
    },
    [],
  );

  const requestWaitlist = useCallback(
    (context: WaitlistContext) => {
      trackWaitlistCtaClick(context);

      if (!TALLY_FORM_ID) {
        setStatus("unavailable");
        return;
      }

      if (openPopup(context)) return;

      queuedContext.current = context;
      setStatus("opening");
    },
    [openPopup],
  );

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest<HTMLElement>("[data-waitlist-cta]");
      if (!trigger) return;

      event.preventDefault();
      requestWaitlist({
        source: trigger.dataset.waitlistSource ?? "unknown",
        plan: trigger.dataset.waitlistPlan,
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [requestWaitlist]);

  useEffect(() => {
    if (status !== "unavailable") return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    unavailableDismissRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setStatus("idle");
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [status]);

  const onWidgetLoad = () => {
    const context = queuedContext.current;
    if (!context) return;

    queuedContext.current = null;
    if (!openPopup(context)) setStatus("unavailable");
  };

  return (
    <>
      {TALLY_FORM_ID && status === "opening" && (
        <Script
          src="https://tally.so/widgets/embed.js"
          strategy="afterInteractive"
          onLoad={onWidgetLoad}
          onError={() => setStatus("unavailable")}
        />
      )}

      {status === "opening" && (
        <p className="sr-only" aria-live="polite">
          {t("opening")}
        </p>
      )}

      {status === "unavailable" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="waitlist-unavailable-title"
          aria-describedby="waitlist-unavailable-description"
          className="fixed inset-0 z-[70] flex items-center justify-center p-5"
          style={{ backgroundColor: "oklch(23% 0.03 262 / 0.45)" }}
        >
          <div
            className="w-full max-w-md rounded-2xl p-7 text-center"
            style={{ backgroundColor: "oklch(99.5% 0.002 85)", boxShadow: "0 24px 64px -16px oklch(23% 0.03 262 / 0.32)" }}
          >
            <p className="eyebrow-cross text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: "oklch(48% 0.17 260)" }}>
              {t("eyebrow")}
            </p>
            <h2
              id="waitlist-unavailable-title"
              className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.04em]"
              style={{ color: "oklch(23% 0.03 262)" }}
            >
              {t("unavailable.title")}
            </h2>
            <p id="waitlist-unavailable-description" className="mt-3 text-sm leading-7" style={{ color: "oklch(44% 0.025 262)" }}>
              {t("unavailable.description")}
            </p>
            <button
              type="button"
              ref={unavailableDismissRef}
              onClick={() => setStatus("idle")}
              onKeyDown={(event) => {
                if (event.key === "Tab") event.preventDefault();
              }}
              className="btn-glow mt-6 rounded-[var(--radius)] px-5 py-3 text-sm font-semibold"
              style={{ backgroundColor: "oklch(48% 0.17 260)", color: "oklch(100% 0 0)" }}
            >
              {t("unavailable.dismiss")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
