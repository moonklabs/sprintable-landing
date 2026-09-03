/**
 * story 2b4067b5(2026-09-03, PO 확定) — 글 파일 읽기(build-time only). 발행 커넥터
 * (sprintable-agent-plugins·story a32c9f1a·connectors/site_git.ts)가 커밋하는 파일과
 * 계약을 공유한다(README §자사 사이트 발행 계약과 동일 문서 — 이 파일 자체가 그 계약의
 * 소비 측 구현):
 *
 *   경로: `content/blog/{lang}/{slug}.md`
 *   frontmatter(YAML): title·slug·lang·publishedAt(ISO8601) + 선택 summary·tags·source_story
 *   본문: 순수 markdown
 *
 * ⚠️이 파일의 함수는 build-time(generateStaticParams·정적 페이지 렌더)에서만 부른다 —
 * 이 레포 전 라우트가 Edge runtime을 상속하고(app/layout.tsx), CF Pages는 정적
 * 산출물(wrangler.toml pages_build_output_dir)만 배포한다. request-time에 이 fs 호출이
 * 실행되면(예: 이 함수를 동적 라우트 핸들러에서 직접 부르면) Edge 환경엔 임의 파일시스템
 * 접근이 없어 실패한다(#b60a6c2 CF 배포실패 전례와 동일 클래스 — next build는 통과시키고
 * 실 배포에서만 걸러진다). 반드시 generateStaticParams()로 빌드 시점에 전부 프리렌더.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'blog');

export interface BlogPostMeta {
  title: string;
  slug: string;
  lang: string;
  publishedAt: string;
  summary?: string;
  tags?: string[];
  sourceStory?: string;
}

export interface BlogPost {
  meta: BlogPostMeta;
  /** marked.parse() 출력 — 신뢰 소스(사람 승인 게이트를 통과해 커넥터가 커밋한 파일)만
   * 담는 디렉터리라 dangerouslySetInnerHTML로 그대로 렌더한다(임의 사용자 입력 아님). */
  html: string;
}

function postsDir(lang: string): string {
  return path.join(CONTENT_ROOT, lang);
}

function readSlugFile(lang: string, slug: string): string | null {
  const file = path.join(postsDir(lang), `${slug}.md`);
  try {
    return fs.readFileSync(file, 'utf-8');
  } catch {
    return null;
  }
}

function metaFromFrontmatter(data: Record<string, unknown>, fallbackSlug: string, lang: string): BlogPostMeta {
  return {
    title: String(data.title ?? fallbackSlug),
    slug: String(data.slug ?? fallbackSlug),
    lang: String(data.lang ?? lang),
    publishedAt: String(data.publishedAt ?? ''),
    summary: data.summary ? String(data.summary) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    sourceStory: data.source_story ? String(data.source_story) : undefined,
  };
}

/** 존재하지 않는 lang 디렉터리는 빈 배열(디렉터리 자체가 아직 없을 수 있다 — 발행
 * 커넥터가 첫 글을 커밋하기 전) — 지어내지 않는다, throw도 안 한다(build 자체가 깨지면
 * 안 됨). */
export function getAllBlogSlugs(lang: string): string[] {
  try {
    return fs
      .readdirSync(postsDir(lang))
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.slice(0, -'.md'.length));
  } catch {
    return [];
  }
}

/** 최신순(publishedAt desc) — 파싱 실패한 개별 파일은 건너뛴다(한 파일의 frontmatter
 * 결함이 목록 페이지 전체를 죽이면 안 된다). */
export function getAllBlogPosts(lang: string): BlogPostMeta[] {
  const posts: BlogPostMeta[] = [];
  for (const slug of getAllBlogSlugs(lang)) {
    const raw = readSlugFile(lang, slug);
    if (raw === null) continue;
    try {
      posts.push(metaFromFrontmatter(matter(raw).data, slug, lang));
    } catch {
      continue;
    }
  }
  return posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getBlogPostBySlug(lang: string, slug: string): BlogPost | null {
  const raw = readSlugFile(lang, slug);
  if (raw === null) return null;
  const { data, content } = matter(raw);
  const meta = metaFromFrontmatter(data, slug, lang);
  return { meta, html: marked.parse(content, { async: false }) as string };
}
