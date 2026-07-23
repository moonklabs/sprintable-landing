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
}

export function trackWaitlistFormOpened(params: WaitlistEventParams) {
  sendEvent("waitlist_form_opened", params);
}

export function trackWaitlistSubmitted(params: WaitlistEventParams) {
  sendEvent("waitlist_submitted", params);
}
