import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getAllBlogPosts } from '@/lib/site-posts';
import { BlogBrandBar } from '@/app/components/blog/blog-brand-bar';

/**
 * story 15a18511(PO 확定 2026-09-03, 선생님 «글 1편=커밋 1건은 구조적으로 틀림» 지적 뒤
 * 재설계) — `/ko/blog` 목록. 이전엔 markdown 파일(prebuild)에서 읽었으나, 이제 Sprintable
 * 공개 site-posts API(story e5731937)를 매 요청마다 fetch한다 — 발행=서버 DB 행 1건이라
 * 배포 없이 최대 60초 내 반영된다(lib/site-posts.ts 상단 주석의 계약 참고).
 *
 * 이 라우트는 fetch를 쓰므로 자동으로 동적 렌더(루트 layout의 runtime='edge' 그대로
 * 상속 — 평범한 Edge Function, `/`와 동형). node:fs는 이 파일 어디에도 없다.
 *
 * cookie 기반 next-intl 로직과 독립(getTranslations({locale:'ko', ...})로 명시 오버라이드
 * — 이 레포에 기존 `/ko` URL-prefix 라우팅 메커니즘 자체가 없다, 그라운딩 확認).
 *
 * 색상: 이 레포는 Tailwind 컬러 유틸리티 클래스가 아니라 인라인 style={{color: 'oklch(...)'}}
 * 관례를 쓴다(app/page.tsx 전체와 footer 실측 — 색상 토큰 클래스는 어디서도 안 씀).
 * globals.css의 --color-text-secondary/--color-text-muted 값을 그대로 재사용한다
 * (h1/h2는 body의 기본 텍스트색을 상속하므로 별도 지정 불요).
 *
 * BlogBrandBar — 유나 design 라이브 시각 검토 채택안(evidence ed66add5) — 로고→홈 링크
 * 하나(풀 nav 아님), blog-brand-bar.tsx 참고.
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'ko', namespace: 'blog' });
  return { title: `${t('title')} — Sprintable`, description: t('description') };
}

export default async function BlogListPage() {
  const t = await getTranslations({ locale: 'ko', namespace: 'blog' });
  const posts = await getAllBlogPosts('ko');

  return (
    <>
      <BlogBrandBar maxWidthClassName="max-w-3xl" />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="mt-2 text-base" style={{ color: 'oklch(72% 0.025 265)' }}>
          {t('description')}
        </p>

        {posts.length === 0 ? (
          <p className="mt-12 text-sm" style={{ color: 'oklch(55% 0.02 265)' }}>
            {t('empty')}
          </p>
        ) : (
          <ul className="mt-12 flex flex-col gap-8">
            {posts.map((post) => (
              <li key={post.slug} className="border-b pb-8" style={{ borderColor: 'oklch(26% 0.022 265)' }}>
                <Link href={`/ko/blog/${post.slug}`} className="block">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  {post.summary ? (
                    <p className="mt-2 text-sm" style={{ color: 'oklch(72% 0.025 265)' }}>
                      {post.summary}
                    </p>
                  ) : null}
                  {post.publishedAt ? (
                    <p className="mt-3 text-xs" style={{ color: 'oklch(55% 0.02 265)' }}>
                      {t('publishedOn')} {new Date(post.publishedAt).toLocaleDateString('ko-KR')}
                    </p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
