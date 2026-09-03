/**
 * story 15a18511(2026-09-03, PO 확定 — 선생님 «글 1편=커밋 1건은 구조적으로 틀림» 지적
 * 뒤 재설계) — 글 조회는 이제 파일(md/prebuild)이 아니라 Sprintable 공개 site-posts API
 * (story e5731937, 디디군 백엔드)에서 읽는다. 발행=서버 chokepoint(승인 게이트 통과 →
 * 행 1건)일 뿐 배포·커밋 0 — 이 파일은 그 API를 fetch하는 순수 클라이언트, node:fs는
 * 애초에 없다(app/ko/blog/**가 이제 정말로 edge-safe한 이유).
 *
 * 계약(PO 확定 본문 그대로, sprintable/e5731937·sprintable-landing/15a18511 두 스토리
 * 본문의 "공개 API 계약" 절이 이 문서와 정본):
 *   GET {SPRINTABLE_PUBLIC_API_BASE}/api/v2/public/site-posts?public_key=&lang=
 *     → {"posts": [{slug,title,summary|null,tags[],lang,published_at}]}(published_at desc,
 *       본문 없음) — 모르는 public_key → 404, lang 누락 → 400.
 *   GET {SPRINTABLE_PUBLIC_API_BASE}/api/v2/public/site-posts/{slug}?public_key=&lang=
 *     → {slug,title,summary,tags,lang,published_at,body_md,source_story_id} — 없으면 404.
 *   응답 헤더 Cache-Control: public, s-maxage=60 — CF의 fetch cf.cacheTtl로 그 60초를
 *   존중한다(발행 후 최대 60초 내 반영, 재배포 불요).
 *
 * ⚠️SPRINTABLE_ORG_PUBLIC_KEY가 빈 문자열인 동안(디디군 PR#3728/e5731937 배포 前)은
 * 실 호출이 항상 404/400을 받는다 — throw로 페이지를 죽이지 않고 빈 목록/null로
 * 조용히 폴백한다(PO 처방 "API 오류/빈 목록 → 빈 상태 문구, throw 0").
 */
import { marked } from 'marked';
import { SPRINTABLE_PUBLIC_API_BASE, SPRINTABLE_ORG_PUBLIC_KEY } from './sprintable-public-api.config';

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
  /** marked.parse() 출력 — 신뢰 소스(사람 승인 게이트를 통과한 글만 이 API에 실린다)만
   * 렌더하므로 dangerouslySetInnerHTML로 그대로 쓴다(임의 사용자 입력이 아니다). */
  html: string;
}

interface SitePostListEntry {
  slug: string;
  title: string;
  summary: string | null;
  tags: string[];
  lang: string;
  published_at: string;
}

interface SitePostDetail extends SitePostListEntry {
  body_md: string;
  source_story_id: string | null;
}

// Cloudflare Workers fetch 확장(cf.cacheTtl) — 표준 RequestInit엔 없어 로컬 타입으로 얹는다.
type CfFetchInit = RequestInit & { cf?: { cacheTtl?: number } };

function buildUrl(path: string, lang: string): string {
  const url = new URL(`${SPRINTABLE_PUBLIC_API_BASE}${path}`);
  url.searchParams.set('public_key', SPRINTABLE_ORG_PUBLIC_KEY);
  url.searchParams.set('lang', lang);
  return url.toString();
}

function metaFromEntry(entry: SitePostListEntry): BlogPostMeta {
  return {
    title: entry.title,
    slug: entry.slug,
    lang: entry.lang,
    publishedAt: entry.published_at,
    summary: entry.summary ?? undefined,
    tags: entry.tags.length > 0 ? entry.tags : undefined,
  };
}

/** 목록 — public_key 미설정·API 오류·네트워크 실패 전부 빈 배열로 조용히 폴백한다(throw 0,
 * PO 처방). 개별 글 파싱 결함이 목록 전체를 죽이지 않는다는 이전 원칙과 동형. */
export async function getAllBlogPosts(lang: string): Promise<BlogPostMeta[]> {
  if (!SPRINTABLE_ORG_PUBLIC_KEY) return [];
  try {
    const res = await fetch(buildUrl('/api/v2/public/site-posts', lang), { cf: { cacheTtl: 60 } } as CfFetchInit);
    if (!res.ok) return [];
    const body = (await res.json()) as { posts: SitePostListEntry[] };
    return body.posts.map(metaFromEntry);
  } catch {
    return [];
  }
}

/** 본문 — public_key 미설정·404·네트워크 실패 전부 null(호출부가 notFound()로 이어간다). */
export async function getBlogPostBySlug(lang: string, slug: string): Promise<BlogPost | null> {
  if (!SPRINTABLE_ORG_PUBLIC_KEY) return null;
  try {
    const res = await fetch(buildUrl(`/api/v2/public/site-posts/${encodeURIComponent(slug)}`, lang), {
      cf: { cacheTtl: 60 },
    } as CfFetchInit);
    if (!res.ok) return null;
    const entry = (await res.json()) as SitePostDetail;
    return {
      meta: { ...metaFromEntry(entry), sourceStory: entry.source_story_id ?? undefined },
      html: marked.parse(entry.body_md, { async: false }) as string,
    };
  } catch {
    return null;
  }
}
