import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getBlogPostBySlug } from '@/lib/site-posts';
import { ViewBeacon } from '@/app/components/blog/view-beacon';
import { BlogBrandBar } from '@/app/components/blog/blog-brand-bar';

/**
 * story 15a18511(PO 확定 2026-09-03, 선생님 «글 1편=커밋 1건은 구조적으로 틀림» 지적 뒤
 * 재설계) — `/ko/blog/{slug}` 본문. 이전엔 build-time에 알려진 slug만 정적 프리렌더했으나
 * (generateStaticParams+dynamicParams=false), 이제 Sprintable 공개 site-posts API(story
 * e5731937)를 요청마다 fetch한다 — build 시점에 어떤 slug가 존재할지 알 필요가 없다(발행
 * =서버 DB 행 1건, 배포 0). 모르는 slug는 API가 404를 주고 그대로 notFound()로 이어간다
 * (lib/site-posts.ts 상단 주석의 계약 참고).
 *
 * fetch를 쓰므로 자동 동적 렌더(루트 layout의 runtime='edge' 상속 — `/`와 동형 평범한
 * Edge Function). node:fs는 이 파일 어디에도 없다.
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug('ko', slug);
  if (!post) return {};
  return {
    title: `${post.meta.title} — Sprintable`,
    description: post.meta.summary,
    openGraph: { title: post.meta.title, description: post.meta.summary, type: 'article' },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug('ko', slug);
  if (!post) notFound();
  const t = await getTranslations({ locale: 'ko', namespace: 'blog' });

  return (
    <>
      <BlogBrandBar maxWidthClassName="max-w-2xl" />
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
          // story 15a18511 — 신뢰 소스(사람 승인 게이트를 통과한 글만 site-posts API에
          // 실린다)만 렌더한다 — 임의 사용자 입력이 아니다(lib/site-posts.ts 상단 주석 참고).
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </main>
    </>
  );
}
