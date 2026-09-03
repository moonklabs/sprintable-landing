import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getAllBlogPosts } from '@/lib/blog';

/**
 * story 2b4067b5(PO 확定 2026-09-03) — `/ko/blog` 목록. cookie 기반 next-intl 로직과
 * 독립(getTranslations({locale:'ko', ...})로 명시 오버라이드 — 이 레포에 기존 `/ko`
 * URL-prefix 라우팅 메커니즘 자체가 없다, 그라운딩 확認). runtime override 없음 — 루트
 * layout의 'edge'를 그대로 상속한다(lib/blog.ts가 더 이상 node:fs를 안 쓰므로 override
 * 자체가 불필요 — scripts/build-blog.mjs가 build-time에 미리 구운 lib/blog-data.json을
 * import만 한다, lib/blog.ts 상단 주석 참고. 이전엔 runtime='nodejs'로 override했었으나
 * 그 상태에서 글 0편일 때 CF Pages 실배포가 거부됐다 — "정적 페이지"가 아니라 "실행돼야
 * 할 함수"로 오인식, 실측 CF Pages run 33700034117). 이 페이지는 force-static이라
 * request-time fs 읽기 자체가 없다(애초에 fs를 안 씀).
 *
 * 색상: 이 레포는 Tailwind 컬러 유틸리티 클래스가 아니라 인라인 style={{color: 'oklch(...)'}}
 * 관례를 쓴다(app/page.tsx 전체와 footer 실측 — 색상 토큰 클래스는 어디서도 안 씀).
 * globals.css의 --color-text-secondary/--color-text-muted 값을 그대로 재사용한다
 * (h1/h2는 body의 기본 텍스트색을 상속하므로 별도 지정 불요).
 */
// dynamic='force-static' 명시는 안 쓴다 — 이 라우트는 루트 layout에서 상속한
// runtime='edge'와 그 값이 공존 불가(실측: next build가 "runtime='edge'... incompatible
// with dynamic='force-static'" 경고를 내고 라우트를 ƒ(완전 동적)로 강등시킨다). 이 페이지는
// 동적 API를 안 써서 Next가 별도 선언 없이도 자동으로 정적 최적화한다.

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'ko', namespace: 'blog' });
  return { title: `${t('title')} — Sprintable`, description: t('description') };
}

export default async function BlogListPage() {
  const t = await getTranslations({ locale: 'ko', namespace: 'blog' });
  const posts = getAllBlogPosts('ko');

  return (
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
  );
}
