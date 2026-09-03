/**
 * story 2b4067b5(2026-09-03, PO 확定 — 실 CF 배포 실패 대응 후 재설계) — 글 조회. 실제
 * markdown 파싱(gray-matter/marked, node:fs)은 이 파일이 아니라 `scripts/build-blog.mjs`
 * (package.json prebuild 훅)가 build-time에 미리 구워 `lib/blog-data.json`으로 남긴다.
 *
 * ⚠️이 파일에 node:fs/node:path/gray-matter/marked를 절대 다시 들이지 않는다 — 그 순간
 * app/ko/blog/**가 다시 "fs를 쓰는 라우트"가 되어, 글이 0편일 때 @cloudflare/next-on-pages
 * 가 프리렌더 인스턴스 0개인 그 라우트를 "정적 페이지"가 아니라 "실행돼야 할 edge 함수"로
 * 오인해 빌드를 거부한다(실측 — CF Pages 배포 run 33700034117 실패, 글 1편 있을 때만
 * 통과하던 사각이었다. next build 표는 0편/1편 둘 다 `○`로 찍혀 이 차이가 로컬에서 안
 * 보인다 — 반드시 `npx @cloudflare/next-on-pages`로 0편·1편 두 상태 다 재현할 것).
 * 이 파일은 lib/blog-data.json을 그냥 import하는 순수 데이터 조회만 한다 — 페이지가
 * runtime='edge'(루트 layout 상속, override 불필요)로 남을 수 있는 이유가 이것.
 */
import blogData from './blog-data.json';

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
  /** marked.parse() 출력(build-time, scripts/build-blog.mjs) — 신뢰 소스(사람 승인
   * 게이트를 통과해 커넥터가 커밋한 파일)만 담는 디렉터리라 dangerouslySetInnerHTML로
   * 그대로 렌더한다(임의 사용자 입력 아님). */
  html: string;
}

interface BlogDataEntry extends BlogPostMeta {
  html: string;
}

const DATA = blogData as Record<string, BlogDataEntry[]>;

function postsFor(lang: string): BlogDataEntry[] {
  return DATA[lang] ?? [];
}

export function getAllBlogSlugs(lang: string): string[] {
  return postsFor(lang).map((p) => p.slug);
}

/** 이미 build-blog.mjs가 publishedAt desc로 정렬해둔 채로 저장한다 — 여기서 재정렬 불요. */
export function getAllBlogPosts(lang: string): BlogPostMeta[] {
  return postsFor(lang).map(({ html, ...meta }) => {
    void html;
    return meta;
  });
}

export function getBlogPostBySlug(lang: string, slug: string): BlogPost | null {
  const entry = postsFor(lang).find((p) => p.slug === slug);
  if (!entry) return null;
  const { html, ...meta } = entry;
  return { meta, html };
}
