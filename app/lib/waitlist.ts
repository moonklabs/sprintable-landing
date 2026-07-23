const TALLY_FORM_ID = /^[A-Za-z0-9]{6}$/;
const CAMPAIGN_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

type WaitlistContext = {
  pathname: string;
  search: string;
  source: string;
  plan?: string;
};

export function getTallyFormId(value: string | undefined): string | null {
  const formId = value?.trim();
  return formId && TALLY_FORM_ID.test(formId) ? formId : null;
}

export function buildWaitlistHiddenFields({
  pathname,
  search,
  source,
  plan,
}: WaitlistContext): Record<string, string> {
  const params = new URLSearchParams(search);
  const fields: Record<string, string> = {
    originPage: pathname,
    ctaSource: source,
  };

  if (plan) fields.plan = plan;

  for (const key of CAMPAIGN_FIELDS) {
    const value = params.get(key);
    if (value) fields[key] = value;
  }

  return fields;
}
