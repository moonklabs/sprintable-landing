# Design

## Source of truth
- **Status:** Active — refreshed 2026-07-23. This document governs product, UI, and frontend decisions for the marketing landing page.
- **Primary product surfaces:** The `/en` and `/ko` marketing landing pages; `/` is a language-negotiating entry point. Both locales support responsive desktop and mobile layouts.
- **Evidence reviewed:** `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `app/components/**`, `messages/en.json`, `messages/ko.json`, `public/screenshots/**`, `.omc/plans/light-premium-redesign-brief.md`, `.omc/plans/2026-07-21-landing-content-plan.md`, `.omc/plans/2026-07-21-redesign-prompt.md`, and `.impeccable.md`.
- **Evidence hierarchy:** The current UI code and localization files describe the implemented experience. The latest “Certificate Luxury” brief describes the intended visual system. Older dark-theme guidance in `.impeccable.md` and the earlier redesign prompt is historical context only where it conflicts with the current light implementation.

## Brand
- **Personality:** Precise, accountable, technical, editorial, and quietly confident. Sprintable should feel like a rigorous operating document rather than a high-energy AI pitch.
- **Trust signals:** Real product screenshots, a copyable self-hosting command, open-source/GitHub access, explicit human approval gates, logged evidence, and human signatures.
- **Avoid:** Generic AI neon, purple/cyan gradients, invented metrics or customer proof, stock illustration, glass-card repetition, ornamental effects without a product-evidence role, and unqualified claims about unreleased features.

## Product goals
- **Goals:**
  - Explain Sprintable’s core differentiation: AI work is not accepted until a human reviews evidence and marks it verified.
  - Help development leads, PMs, and teams already using AI agents evaluate the product with credible implementation evidence.
  - Convert qualified visitors into a measured early-access/waitlist funnel instead of routing every visitor straight to self-serve sign-in.
- **Non-goals:**
  - Present Sprintable as a generic task manager or an autonomous-AI hype product.
  - Sacrifice legibility, accuracy, or accessibility for visual novelty or form completion rate.
  - Build a separate design-system abstraction when the existing Tailwind v4 and CSS-token patterns can be extended.
- **Success signals:** Clear understanding of “Claimed → Gate → Verified”; CTA click-through and completed waitlist registrations; attribution by campaign and CTA position; a usable qualification signal for prioritizing follow-up.

## Personas and jobs
- **Primary personas:**
  - Development leads accountable for reviewing agent-generated work and merging it safely.
  - Product managers coordinating people, agents, evidence, and delivery decisions.
  - AI-native teams already using, or actively evaluating, coding and workflow agents.
- **User jobs:**
  - Decide whether Sprintable makes AI-assisted delivery more auditable and manageable.
  - Understand the approval, review, and evidence workflow before committing a team.
  - Register interest with enough context to receive appropriate early access or follow-up.
- **Key contexts of use:** Desktop evaluation during a focused work session; mobile campaign/referral traffic; English or Korean browsing; technical buyers who will inspect GitHub and product screenshots before engaging.

## Information architecture
- **Primary navigation:** Brand home, `#product`, `#trust`, `#pricing`, locale switcher, GitHub, and a primary conversion CTA.
- **Core routes/screens:** Locale-specific App Router landing routes at `/en` and `/ko`. The `/` entry point uses the saved language choice, then `Accept-Language`, and redirects to a locale URL. Product-app routes are redirected to `app.sprintable.ai`; the landing must not imply that it hosts product functionality.
- **Content hierarchy:**
  1. Hero: the Claimed-vs-Verified promise, a review-queue seal, product screenshot, self-hosting command, and primary action.
  2. Trust/review surface: evidence, gate decision, and human signature.
  3. How it works: story → agent execution → approval gate → verified record.
  4. Product proof: real UI screenshots.
  5. Audience, operating model, pricing, then final conversion CTA.
- **Current conversion state:** All primary commercial actions open a configured Tally waitlist popup. The flow keeps visitors on the landing, preserves campaign/CTA attribution, and emits GA4 funnel events. A published Tally form ID is required before it can accept registrations.

## Design principles
- **Evidence is the visual identity:** Show gates, signatures, review queues, commands, and product UI instead of generic AI imagery.
- **Document-like warmth, software-grade precision:** Ivory paper, navy ink, hairlines, registration marks, and a certificate seal make verification feel tangible without becoming decorative theater.
- **One argument per section:** Heading, supporting copy, and proof must reinforce a single decision rather than repeat generic benefits.
- **Progressive disclosure for conversion:** The landing earns the registration request with proof first; the eventual waitlist form must ask only for information needed to qualify and contact the visitor.
- **Tradeoffs:** Rich motion and tactile detail are acceptable only when they preserve content hierarchy, work with reduced motion, and do not conceal usable controls on narrow screens.

## Visual language
- **Color:** Warm ivory canvas (`--color-canvas`), white paper cards, deep navy ink, deep signature blue, verified green for semantic success, restrained teal, and gold limited to seal/rule/CTA-watermark details. Values are defined in `app/globals.css`.
- **Typography:** Bricolage Grotesque for display hierarchy; Barlow for readable technical body copy; Instrument Serif only as a controlled editorial accent. Korean headlines retain a robust non-italic fallback.
- **Spacing/layout rhythm:** Centered `max-w-7xl` content; generous vertical bands (`py-20`/`sm:py-28`); 20–32 px responsive page gutters; thin section rules with a centered registration tick; intentional asymmetry in Hero rather than per-section novelty.
- **Shape/radius/elevation:** Mostly 10 px token radius and 16 px cards. Paper cards use warm hairlines and blue-tinted shadows; hover elevation is subtle and deliberate. The final CTA is the one full-bleed, rounded dark-blue climax.
- **Motion:** Intersection-observer reveal, small parallax, one product-meaningful `Claimed → Verified` seal cycle, and scroll-driven progressive enhancement where supported. Transform/opacity are preferred; motion is removed or resolved to a stable state for `prefers-reduced-motion`.
- **Imagery/iconography:** Use real Sprintable screenshots in light browser frames, brand SVGs, guilloché/security-paper pattern, and functional Lucide icons. Images and ornaments never substitute for evidence.

## Components
- **Existing components to reuse:** `HeroSection`, `TrustSection`, `HowItWorksSection`, `FinalCtaSection`, `VerifiedSealCard`, `CommandChip`, `ScrollReveal`, `Parallax`, `SealEmblem`, `Guilloche`, `LocaleSwitcher`, and `NavLinks`.
- **New/changed components:** `WaitlistPopup` is the single conversion surface shared by all commercial CTAs. It lazily loads the Tally popup only when a published form ID is configured, passes attribution as hidden fields, tracks click/open/submit, and provides an accessible configuration-error fallback.
- **Variants and states:** Primary blue CTA; secondary bordered CTA; final-CTA inverted primary; disabled/submitting/success/error states for the future form; submitted visitors must not be prompted repeatedly.
- **Token/component ownership:** `app/globals.css` owns tokens and reusable visual effects. Page sections own composition. Small UI components own interaction semantics. Translation keys in both `messages/*.json` own all visible product and conversion copy.

## Accessibility
- **Target standard:** WCAG 2.1 AA for text contrast, controls, focus indication, and error feedback.
- **Keyboard/focus behavior:** Maintain the global visible focus outline. The local configuration-error dialog moves focus to its close button, supports Escape, constrains Tab to its only action, and restores focus to the trigger. The Tally form owns focus management and validation when opened.
- **Contrast/readability:** Deep navy body copy on ivory/white surfaces; white copy only on the dark final CTA; text must not rely on verified green, gold, or motion alone.
- **Screen-reader semantics:** Keep decorative grain, grids, patterns, and seal imagery `aria-hidden`; preserve section/headline structure and meaningful image alt text. Status changes in the form require an announced success/error message.
- **Reduced motion and sensory considerations:** Preserve the current global reduced-motion fallback and do not make form completion or a CTA’s meaning depend on animated state.

## Responsive behavior
- **Supported breakpoints/devices:** Mobile at 375–390 px, tablet, and desktop at 1280 px+. Locale switching must be verified for English and Korean at the same breakpoints.
- **Layout adaptations:** Desktop nav links can collapse, but the primary conversion action must remain fully visible and reachable. Cards stack before they become too narrow; form controls must fit their viewport without horizontal clipping. The mobile bottom CTA is a primary conversion affordance, not an extra competing destination.
- **Touch/hover differences:** Hover lifts/glows are enhancements only. Mobile actions use large touch targets and no hover-dependent disclosure. Exit-intent patterns must not be used as a mobile conversion dependency.
- **Mobile validation baseline:** A true 390 px browser emulation has a 390 px document width, with the Hero and top CTA fully visible. Retain this as the narrow-screen baseline for future CTA changes.

## Interaction states
- **Loading:** The landing renders useful server content before client animation. Future waitlist submission must show an inline submitting state without removing entered content.
- **Empty:** No data-dependent content is required for the landing. A form should not open as an empty shell if its provider or configuration is unavailable.
- **Error:** Form-level and field-level actionable errors; retry without losing form input; a fallback contact path if the external form cannot load.
- **Success:** Confirm registration, set an expectation for follow-up, prevent duplicate prompting, and offer an optional next action such as GitHub or docs.
- **Disabled:** Prevent duplicate form submission while preserving an obvious explanation.
- **Offline/slow network:** Keep the CTA visible; delay third-party loading until explicit click where possible; render a non-JavaScript fallback link to the hosted form if required.

## Content voice
- **Tone:** Machine-precise, human-legible, and opinionated; calm enough for B2B evaluation.
- **Terminology:** Use `Claimed`, `Gate`, `Review`, `Verified`, `evidence`, and `human signature` consistently. Retain meaningful technical terms such as MCP and BYOA only when paired with clear context.
- **Microcopy rules:** Lead with the user’s outcome, then state the mechanism. Use concrete evidence over superlatives. For waitlist conversion, state what will happen after submitting and why each required question is needed. Keep Korean and English messages semantically aligned rather than translating word-for-word.

## Implementation constraints
- **Framework/styling system:** Next.js 16.2.4 App Router with an Edge root layout, React 19, TypeScript strict mode, Tailwind CSS v4, CSS OKLCH tokens, `next-intl`, and `next/image` with unoptimized images for Cloudflare Pages.
- **Design-token constraints:** Extend `app/globals.css` tokens and existing utility/class patterns; avoid a second token layer. Current inline color styles should converge on documented CSS variables when changed opportunistically.
- **Performance constraints:** Preserve server-rendered landing content; avoid heavy client dependencies; load third-party form code only when needed; retain transform/opacity motion and existing reduced-motion behavior.
- **Compatibility constraints:** Deployed to Cloudflare Pages; product-app paths redirect to `app.sprintable.ai`; locale is encoded in the `/en` or `/ko` path. `proxy.ts` negotiates only the root entry point and remembers explicit language changes in `NEXT_LOCALE`.
- **Test/screenshot expectations:** Run ESLint and TypeScript checks after changes. Verify first viewport and full conversion flow at 1280 px+ and 375–390 px in both locales; capture screenshots and inspect console errors, interaction states, focus behavior, and horizontal overflow.

## Open questions
- [x] Use a Tally popup/embed for the waitlist. **Owner:** Product/marketing. **Impact:** A published form ID, lead-routing configuration, and privacy copy are still required.
- [ ] Approve the qualification schema and which questions are required versus optional. **Owner:** Product/marketing. **Impact:** completion rate and lead quality.
- [ ] Decide submission destination, retention period, access control, and consent/privacy copy. **Owner:** Operations/legal. **Impact:** form provider and compliance obligations.
- [ ] Define the follow-up promise, prioritization criteria, and responsible owner after registration. **Owner:** Go-to-market. **Impact:** thank-you copy and campaign credibility.
- [x] Establish implementation event names: `waitlist_cta_clicked`, `waitlist_form_opened`, and `waitlist_submitted`. **Owner:** Growth/engineering. **Impact:** configure the GA4 report and qualified-follow-up event separately.
- [x] Verify narrow-screen Hero/CTA layout and set a 390 px mobile baseline. **Owner:** Frontend. **Impact:** preserve this baseline for future conversion changes.
