type ContentViewParams = {
  persona: "founder" | "agent";
  tier: "daily" | "weekly" | "milestone";
  channel: string;
};

type CtaClickParams = {
  persona: "founder" | "agent";
  tier: "daily" | "weekly" | "milestone";
  channel: string;
  destination: "landing" | "signup" | "docs" | "github_repo";
};

type SignupCompleteParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

type ActivationCompleteParams = {
  first_project_type?: string;
};

type FeatureEngageParams = {
  feature_name: string;
};

type RetentionVisitParams = {
  cohort_day: "d1" | "d7" | "d30";
};

type WaitlistEventParams = {
  source: string;
  plan?: string;
};

function sendEvent(name: string, params: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}

/* Meta Pixel 브리지 — 광고 최적화용. GA4와 별개로 waitlist 퍼널을 Pixel에도 흘린다.
   'Lead'는 Meta 표준 전환 이벤트라 광고 세트가 직접 최적화 대상으로 잡을 수 있다. */
function sendMetaEvent(kind: "track" | "trackCustom", name: string, params: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq(kind, name, params);
}

export function trackContentView(params: ContentViewParams) {
  sendEvent("content_view", params);
}

export function trackCtaClick(params: CtaClickParams) {
  sendEvent("cta_click", params);
}

export function trackSignupComplete(params: SignupCompleteParams = {}) {
  sendEvent("signup_complete", params);
}

export function trackActivationComplete(params: ActivationCompleteParams = {}) {
  sendEvent("activation_complete", params);
}

export function trackFeatureEngage(params: FeatureEngageParams) {
  sendEvent("feature_engage", params);
}

export function trackRetentionVisit(params: RetentionVisitParams) {
  sendEvent("retention_visit", params);
}

export function trackWaitlistCtaClick(params: WaitlistEventParams) {
  sendEvent("waitlist_cta_clicked", params);
  sendMetaEvent("trackCustom", "WaitlistCTAClick", params);
}

export function trackWaitlistFormOpened(params: WaitlistEventParams) {
  sendEvent("waitlist_form_opened", params);
  sendMetaEvent("trackCustom", "WaitlistFormOpened", params);
}

export function trackWaitlistSubmitted(params: WaitlistEventParams) {
  sendEvent("waitlist_submitted", params);
  sendMetaEvent("track", "Lead", {
    content_name: "waitlist",
    content_category: params.source,
    ...(params.plan ? { content_type: params.plan } : {}),
  });
}
