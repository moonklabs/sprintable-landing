# Waitlist setup (Tally)

The landing uses a **Tally popup**, rather than a native form. It keeps the visitor on the campaign page, avoids a new backend and data-retention surface, and gives marketing a fast way to change questions, routing, and thank-you copy.

## 1. Build the published Tally form

Use a concise two-step form. The first step should collect only the fields needed to contact and route the lead; this is the best balance between campaign completion and qualification.

### Required fields

1. **Work email** — validate as email.
2. **Your role** — Development lead, Product manager, Engineering manager, Founder, Other.
3. **How is your team using AI agents today?** — Actively using, Evaluating, Exploring.
4. **Team size** — 1–5, 6–20, 21–100, 100+.

### Optional fields

- Company or product URL.
- “What would you like to make more reliable about AI-assisted delivery?”

Do **not** add phone, budget, a long free-text brief, or mandatory consent questions to the first step. Ask those only in a follow-up once the lead is qualified.

### Recommended copy

- **Title:** `Request early access`
- **Intro:** `Tell us a little about your team. We’ll prioritize teams already putting AI agents into delivery workflows.`
- **Thank-you:** `You’re on the list. We’ll review your team context and follow up with early-access timing.`

Include the approved privacy-policy link and any required consent language in Tally before publishing. This repository does not store submitted personal data.

## 2. Add the hidden fields

Create these hidden text fields in Tally using the names exactly as written:

- `originPage`
- `ctaSource`
- `plan`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`

The landing populates these automatically. `ctaSource` identifies the hero, navigation, pricing card, final CTA, or mobile sticky CTA; `plan` is set only from a pricing card.

## 3. Connect lead routing

Use Tally’s native Google Sheets, Notion, Slack, or webhook integration. Add a lead owner and a response-time target before driving paid traffic. Suggested prioritization:

1. Development lead or PM **actively using** AI agents.
2. Teams of 6+ with a clear review/approval challenge.
3. Other interested teams for a lighter nurture sequence.

Keep raw submissions restricted to the people responsible for follow-up. Document the retention period and deletion process outside this repository.

## 4. Configure each environment

1. Publish the Tally form and copy the ID from `https://tally.so/r/<FORM_ID>` (for example, `mRoDv3`).
2. Set the following build-time environment variable locally and in Cloudflare Pages:

   ```bash
   NEXT_PUBLIC_TALLY_WAITLIST_FORM_ID=mRoDv3
   ```

3. Rebuild and deploy. `NEXT_PUBLIC_*` variables are embedded into the client bundle, so changing the form ID requires a new build.
4. Test one submission with UTM parameters, for example:

   ```text
   /ko?utm_source=linkedin&utm_medium=paid&utm_campaign=waitlist-launch
   ```

5. Confirm the Tally submission includes all hidden fields and that GA4 receives:
   - `waitlist_cta_clicked`
   - `waitlist_form_opened`
   - `waitlist_submitted`

## Conversion guardrails

- Use one primary label throughout: **Join waitlist** / **얼리 액세스 신청**.
- Keep the popup only on an explicit CTA click; no auto-open or exit-intent interruption.
- Test the hero CTA and mobile sticky CTA first because they are the highest-intent campaign entry points.
- Evaluate campaign quality using submitted forms and qualified follow-up—not only CTA clicks.

References: [Tally popup widget docs](https://developers.tally.so/widgets/popups), [Tally widget events](https://developers.tally.so/widgets/events), and [Tally embed help](https://tally.so/help/embed-your-form).
