#!/usr/bin/env node
// story 2b4067b5(PO 확定 2026-09-03, 실 CF 배포 실패 원인 대응) — content/blog/{lang}/*.md
// 를 프리빌드 시점에 읽어 lib/blog-data.json(순수 데이터)으로 미리 구워둔다.
//
// 왜: app/ko/blog/page.tsx·app/ko/blog/[slug]/page.tsx가 lib/blog.ts를 통해 직접
// node:fs를 부르면(이전 구현) 그 페이지 모듈 자체가 "fs를 쓰는 nodejs 런타임 라우트"가
// 되고, 글이 0편이라 generateStaticParams()가 []를 돌려 프리렌더된 인스턴스가 하나도
// 없으면 @cloudflare/next-on-pages가 "정적으로 완결된 페이지"가 아니라 "실행돼야 할
// 함수"로 오인해 edge-runtime 미준수로 빌드를 거부한다(실측: CF Pages 배포 run
// 33700034117 실패, 글 1편 있을 때만 통과하던 사각 — next build 표는 0편이든 1편이든
// `○`(정적)로 똑같이 찍혀 로컬에서 이 차이가 안 보인다).
//
// 처방: fs 접근을 이 프리빌드 스크립트로만 격리(package.json prebuild 훅) → 결과를
// 순수 JSON으로 굽는다 → 페이지는 그 JSON을 그냥 import(어떤 node: 모듈도 안 씀) →
// runtime='edge'로 복귀(루트 layout과 동일, override 자체가 불필요해진다) → CF가 두
// 페이지를 온전한 정적 산출물로 본다(0편이어도 "빈 정적 페이지"일 뿐 함수가 아니다).
//
// 실행: node scripts/build-blog.mjs (package.json "prebuild" 훅 — pnpm build 전 자동).
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const CONTENT_ROOT = path.join(REPO_ROOT, 'content', 'blog');
const OUT_FILE = path.join(REPO_ROOT, 'lib', 'blog-data.json');

// 계약(sprintable-agent-plugins/plugins/sprintable/README.md §File path / frontmatter
// contract가 정본) — 지원 lang은 그 계약이 열어둔 값이 늘어날 때 여기도 갱신.
const SUPPORTED_LANGS = ['ko'];

function buildLang(lang) {
  const dir = path.join(CONTENT_ROOT, lang);
  if (!existsSync(dir)) return [];

  const posts = [];
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    const slugFromFile = file.slice(0, -'.md'.length);
    const raw = readFileSync(path.join(dir, file), 'utf-8');
    let parsed;
    try {
      parsed = matter(raw);
    } catch (err) {
      console.warn(`[build-blog] skip ${lang}/${file} — frontmatter parse failed:`, err.message);
      continue;
    }
    const { data, content } = parsed;
    posts.push({
      title: String(data.title ?? slugFromFile),
      slug: String(data.slug ?? slugFromFile),
      lang: String(data.lang ?? lang),
      publishedAt: String(data.publishedAt ?? ''),
      summary: data.summary ? String(data.summary) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
      sourceStory: data.source_story ? String(data.source_story) : undefined,
      html: marked.parse(content, { async: false }),
    });
  }
  posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  return posts;
}

const data = Object.fromEntries(SUPPORTED_LANGS.map((lang) => [lang, buildLang(lang)]));
writeFileSync(OUT_FILE, JSON.stringify(data, null, 2) + '\n');

const counts = Object.entries(data).map(([lang, posts]) => `${lang}=${posts.length}`).join(', ');
console.log(`[build-blog] wrote ${OUT_FILE} (${counts})`);
