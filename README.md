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

## Blog (`/ko/blog`, story 2b4067b5)

Posts are markdown files at `content/blog/{lang}/{slug}.md`, committed by the
`sprintable-agent-plugins` repo's `site_git` publish connector (story a32c9f1a) — the
canonical file-path/frontmatter contract lives in **that repo's `plugins/sprintable/README.md`,
§"File path / frontmatter contract"** (PO 확定, 2026-09-03); this repo only implements the
reader side (`lib/blog.ts`, `app/ko/blog/`), it does not redefine the contract.

- **`scripts/build-blog.mjs` (a `prebuild`/`predev` hook) is the only place that touches
  `content/blog/**` or `node:fs`.** It parses every post (gray-matter + marked) and writes
  `lib/blog-data.json` (gitignored, regenerated every build) — `lib/blog.ts` and the two
  page components only ever `import` that JSON, never the filesystem. This two-step split
  exists because of two conflicting constraints that had to be found the hard way (both by
  actually running `npx @cloudflare/next-on-pages`, not just `next build` — see
  `feedback-cf-pages-runtime-verify-wrangler` discipline; `next build`'s route table looks
  identical — `○`/static — for both the working and the broken version, so it cannot tell
  them apart):
  1. Every route here inherits `runtime = "edge"` from the root layout, and Next 16 (Turbopack)
     flatly disables static generation for any page under edge runtime — so an
     `export const runtime = "nodejs"` override (which *does* support static generation) looks
     like the fix, and does make `next build` show `○ /ko/blog`.
  2. But `@cloudflare/next-on-pages` treats a `nodejs`-runtime page with **zero** prerendered
     instances as "must be a live function", not "a static page with nothing in it yet" — and
     rejects the whole deploy with "routes not configured to run with the Edge Runtime". This
     only shows up when the post count is actually 0, which is exactly the state this repo
     ships in before the first post exists — a build verified with one scratch post in
     `content/blog/ko/` (as an earlier pass here did) never hits it. **Real incident**: CF
     Pages deploy run `33700034117` failed on `main` this way.
  The fix: don't touch `node:fs` from the page at all, don't override `runtime`, and accept
  that these two routes render as ordinary Edge Functions (like `/` already does) — instant,
  since there's no I/O, just a JSON lookup. Verified both the 0-post and 1-post case through
  the real CF build; both land under "Edge Function Routes", neither errors.
- View-count beacon (`app/components/blog/view-beacon.tsx`) — `fetch(..., {keepalive: true})`
  (not `navigator.sendBeacon`, which sends `text/plain` and the backend 422s on that) to
  `POST {endpoint}/api/v2/public/pageview`, body `{public_key, path, referrer}` (field name
  confirmed directly against `backend/app/routers/public_pageview.py::PageviewBeaconRequest` in
  story fbcc07b5/PR#3728, separate backend work). Config is a plain constants file
  (`lib/pageview.config.ts`, PO decision — not env vars: neither value is a secret) — the
  endpoint is fixed, `PAGEVIEW_ORG_PUBLIC_KEY` ships as an empty string until PR#3728 deploys,
  and the beacon no-ops (skips the fetch entirely) while it's empty, so this repo has no
  ordering dependency on that story landing first.
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
