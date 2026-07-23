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
- `ref`
- `fbclid`

The landing populates these automatically. `ctaSource` identifies the hero, navigation, pricing card, final CTA, or mobile sticky CTA; `plan` is set only from a pricing card. `ref` carries a referral code from shared links (`?ref=<code>`); `fbclid` is the Meta ad click ID, kept for ad attribution and future Conversions API matching.

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

## 5. Meta Pixel (Facebook ads)

Facebook 광고 집행 시 전환 최적화를 위해 Pixel을 함께 켠다.

1. [Meta Events Manager](https://business.facebook.com/events_manager2)에서 데이터 소스(Pixel)를 만들고 ID를 복사한다.
2. 빌드 환경변수를 설정하고 재배포한다 (`NEXT_PUBLIC_*`는 빌드 타임 임베드):

   ```bash
   NEXT_PUBLIC_META_PIXEL_ID=<PIXEL_ID>
   ```

3. 랜딩이 자동으로 보내는 이벤트:
   - `PageView` — 모든 페이지·라우트 전환
   - `WaitlistCTAClick` (custom) — CTA 클릭
   - `WaitlistFormOpened` (custom) — 팝업 오픈
   - **`Lead` (standard)** — Tally 제출 완료. `content_category`=ctaSource, `content_type`=plan
4. 광고 세트의 전환 목표를 **Lead**로 지정한다. Events Manager의 이벤트 테스트 도구로 `Lead` 수신을 확인한 뒤 집행한다.
5. UTM 규칙: 광고 URL에 `?utm_source=facebook&utm_medium=paid&utm_campaign=<캠페인명>`을 붙인다. `fbclid`는 자동으로 히든 필드에 수집된다.
6. (추후) 볼륨이 생기면 Conversions API 서버 이벤트를 추가해 iOS/광고차단 손실을 보전한다 — 수집된 `fbclid`가 매칭 키가 된다.

## Conversion guardrails

- Use one primary label throughout: **Join waitlist** / **얼리 액세스 신청**.
- Keep the popup only on an explicit CTA click; no auto-open or exit-intent interruption.
- Test the hero CTA and mobile sticky CTA first because they are the highest-intent campaign entry points.
- Evaluate campaign quality using submitted forms and qualified follow-up—not only CTA clicks.

References: [Tally popup widget docs](https://developers.tally.so/widgets/popups), [Tally widget events](https://developers.tally.so/widgets/events), and [Tally embed help](https://tally.so/help/embed-your-form).
