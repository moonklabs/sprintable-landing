This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Blog (`/ko/blog`, story 15a18511 — supersedes the file-based 2b4067b5 approach)

Posts are **not** files in this repo. They live as rows in the Sprintable backend, served by
a public read API (story e5731937) — `/ko/blog` and `/ko/blog/{slug}` `fetch()` that API on
every request. Publishing a post is a server-side write behind an approval gate; it never
touches this repo, never triggers a deploy, never needs a commit — a new post shows up here
within the API's cache TTL (60s), not on the next `git push`.

This replaced an earlier design (story 2b4067b5) that treated `content/blog/{lang}/{slug}.md`
committed by a GitHub connector as the source of truth — reverted per PO/선생님 decision
("글 1편=커밋 1건은 구조적으로 틀림", 2026-09-03): a commit-per-post model doesn't scale, and
ties every publish to this repo's deploy pipeline for no reason once posts are just data.

- **Contract** (`lib/site-posts.ts`, canonical text lives in both `sprintable/e5731937` and
  `sprintable-landing/15a18511` story bodies — identical, either is authoritative):
  - `GET {SPRINTABLE_PUBLIC_API_BASE}/api/v2/public/site-posts?public_key=&lang=` →
    `{"posts": [{slug, title, summary|null, tags[], lang, published_at}]}` (published_at desc,
    no body) — unknown `public_key` → 404, missing `lang` → 400.
  - `GET {SPRINTABLE_PUBLIC_API_BASE}/api/v2/public/site-posts/{slug}?public_key=&lang=` →
    `{slug, title, summary, tags, lang, published_at, body_md, source_story_id}` — not found →
    404. `body_md` is rendered to HTML with `marked` at request time (no `node:fs` anywhere in
    this path — that's what makes these two routes safe as ordinary Edge Functions, see below).
  - Response carries `Cache-Control: public, s-maxage=60, stale-while-revalidate=300`; the
    fetch calls pass Cloudflare's `{ cf: { cacheTtl: 60 } }` extension to respect it.
  - `getAllBlogPosts`/`getBlogPostBySlug` never throw on a missing `public_key`, a non-2xx
    response, or a network failure — they resolve to `[]`/`null`, so the list page falls back
    to its empty-state copy and the detail page 404s via `notFound()`, exactly like a real
    empty/missing state would (PO instruction: "API 오류/빈 목록 → 빈 상태 문구, throw 0").
- **Why both routes are plain Edge Functions, not statically prerendered** — this was worked
  out the hard way on the previous (file-based) design and the reasoning still applies now
  that both routes fetch instead of reading files: every route here inherits
  `runtime = "edge"` from the root layout, and Next 16 (Turbopack) flatly disables static
  generation for any page under edge runtime. An earlier attempt overrode
  `runtime = "nodejs"` to regain static generation — `next build` looked fine (`○ /ko/blog`),
  but `@cloudflare/next-on-pages` rejects a `nodejs`-runtime page with **zero** prerendered
  instances as "must be a live function", which only surfaces when the post count is actually
  0 — exactly the state this repo shipped in before the first post existed. **Real incident**:
  CF Pages deploy run `33700034117` failed on `main` this way, verified only after running the
  real `npx @cloudflare/next-on-pages` build (not just `next build`, whose route table looks
  identical for the working and the broken version — see `feedback-cf-pages-runtime-verify-wrangler`
  discipline) against both the 0-post and 1-post case. Both routes now render as ordinary Edge
  Functions (like `/` already does) — trivially fast since there's no I/O beyond the one
  upstream fetch.
- View-count beacon (`app/components/blog/view-beacon.tsx`) — `fetch(..., {keepalive: true})`
  (not `navigator.sendBeacon`, which sends `text/plain` and the backend 422s on that) to
  `POST {SPRINTABLE_PUBLIC_API_BASE}/api/v2/public/pageview`, body `{public_key, path, referrer}`
  (field name confirmed directly against
  `backend/app/routers/public_pageview.py::PageviewBeaconRequest` in story fbcc07b5/PR#3728,
  separate backend work). Config is a plain constants file (`lib/sprintable-public-api.config.ts`,
  PO decision — not env vars: neither value is a secret, and the beacon and site-posts API
  share the same base URL and public key) — `SPRINTABLE_ORG_PUBLIC_KEY` ships as an empty
  string until the backend stories above deploy, and both consumers no-op (skip the fetch
  entirely, or resolve to empty/`null`) while it's empty, so this repo has no ordering
  dependency on either backend story landing first.
- Locale: this repo has no existing `/ko`-prefixed routing (next-intl here is a cookie/
  `Accept-Language`-based single-tree, no middleware, no `[locale]` segment) — `/ko/blog` is a
  standalone folder, independent of that cookie logic.
  `getTranslations({locale: 'ko', ...})` needed a real fix to `i18n/request.ts` to actually
  work: `getRequestConfig`'s callback previously ignored `requestLocale` entirely and always
  resolved from cookies, so an explicit override was silently dropped — the callback now reads
  `requestLocale` first, falling back to the existing cookie/header logic exactly as before
  when no override is given (zero behavior change for the rest of the site).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
