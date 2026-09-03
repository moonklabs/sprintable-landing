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

- `lib/blog.ts` reads/parses those files at **build time only** — every route in this app
  inherits `runtime = "edge"` from the root layout, and `@cloudflare/next-on-pages` rejects
  any Node `fs` access reachable from an Edge Function (confirmed by running the actual CF
  build, not just `next build` — see `feedback-cf-pages-runtime-verify-wrangler` discipline).
  `app/ko/blog/page.tsx` and `app/ko/blog/[slug]/page.tsx` both override with
  `export const runtime = "nodejs"` — safe only because both are fully static
  (`dynamic = "force-static"`, `[slug]` uses `generateStaticParams` + `dynamicParams = false`),
  so no Edge Function is actually deployed for either route — verified via
  `npx @cloudflare/next-on-pages`, which places both under "Prerendered Routes", not
  "Edge Function Routes".
- View-count beacon (`app/components/blog/view-beacon.tsx`) — `fetch(..., {keepalive: true})`
  (not `navigator.sendBeacon`, which sends `text/plain` and the backend 422s on that) to
  `POST {NEXT_PUBLIC_SPRINTABLE_API}/api/v2/public/pageview` (story fbcc07b5, separate backend
  work) — no-op if `NEXT_PUBLIC_SPRINTABLE_API`/`NEXT_PUBLIC_SPRINTABLE_ORG_PUBLIC_KEY` aren't
  set, so this repo has no ordering dependency on that story landing first.
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
