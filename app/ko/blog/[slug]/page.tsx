import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getAllBlogSlugs, getBlogPostBySlug } from '@/lib/blog';
import { ViewBeacon } from '@/app/components/blog/view-beacon';

/**
 * story 2b4067b5(PO 확定 2026-09-03) — `/ko/blog/{slug}` 본문. generateStaticParams()가
 * 빌드 시점에 content/blog/ko/*.md 전부를 프리렌더한다(lib/blog.ts 상단 주석 참고 —
 * Edge runtime 상속 + CF Pages 정적 산출물 제약상 request-time fs 읽기는 쓸 수 없다).
 * dynamicParams=false — 빌드 시점에 없던 slug는 그대로 404(빌드 후 늦게 생긴 파일을
 * request-time에 즉석 렌더하는 폴백 0, 다음 배포까지 정직하게 404).
 *
 * runtime='nodejs' — app/ko/blog/page.tsx와 동일 이유(lib/blog.ts의 node:fs/node:path,
 * Turbopack의 edge-runtime 모듈 검사가 build-time 전용 사용도 정적으로 막는다). 완전
 * 정적(force-static+generateStaticParams)이라 override가 안전하다.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllBlogSlugs('ko').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug('ko', slug);
  if (!post) return {};
  return {
    title: `${post.meta.title} — Sprintable`,
    description: post.meta.summary,
    openGraph: { title: post.meta.title, description: post.meta.summary, type: 'article' },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug('ko', slug);
  if (!post) notFound();
  const t = await getTranslations({ locale: 'ko', namespace: 'blog' });

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <ViewBeacon path={`/ko/blog/${slug}`} />
      <Link href="/ko/blog" className="text-sm" style={{ color: 'oklch(72% 0.14 258)' }}>
        ← {t('backToList')}
      </Link>
      <h1 className="mt-6 text-3xl font-bold">{post.meta.title}</h1>
      {post.meta.publishedAt ? (
        <p className="mt-3 text-xs" style={{ color: 'oklch(55% 0.02 265)' }}>
          {t('publishedOn')} {new Date(post.meta.publishedAt).toLocaleDateString('ko-KR')}
        </p>
      ) : null}
      {post.meta.tags && post.meta.tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.meta.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 text-xs"
              style={{ backgroundColor: 'oklch(20% 0.02 265)', color: 'oklch(72% 0.025 265)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <article
        className="prose prose-invert mt-10 max-w-none"
        // story 2b4067b5 — 신뢰 소스(사람 승인 게이트를 통과해 발행 커넥터가 커밋한 파일)만
        // 담는 디렉터리를 렌더한다 — 임의 사용자 입력이 아니다(lib/blog.ts 상단 주석 참고).
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </main>
  );
}
