import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getAllBlogPosts } from '@/lib/blog';

/**
 * story 2b4067b5(PO 확定 2026-09-03) — `/ko/blog` 목록. cookie 기반 next-intl 로직과
 * 독립(getTranslations({locale:'ko', ...})로 명시 오버라이드 — 이 레포에 기존 `/ko`
 * URL-prefix 라우팅 메커니즘 자체가 없다, 그라운딩 확認). 전 사이트가 Edge runtime을
 * 상속하고(app/layout.tsx) markdown은 build-time에만 읽을 수 있어(lib/blog.ts 상단
 * 주석 참고) 이 페이지는 완전 정적(force-static) — request-time fs 읽기 0.
 *
 * 색상: 이 레포는 Tailwind 컬러 유틸리티 클래스가 아니라 인라인 style={{color: 'oklch(...)'}}
 * 관례를 쓴다(app/page.tsx 전체와 footer 실측 — 색상 토큰 클래스는 어디서도 안 씀).
 * globals.css의 --color-text-secondary/--color-text-muted 값을 그대로 재사용한다
 * (h1/h2는 body의 기본 텍스트색을 상속하므로 별도 지정 불요).
 *
 * runtime='nodejs' — 루트 layout이 전 라우트에 'edge'를 상속시키는데, 이 페이지가 부르는
 * lib/blog.ts는 node:fs/node:path를 쓴다. Turbopack의 edge-runtime 모듈 검사는
 * "build-time에만 실행되는가"를 안 가리고 import 자체를 정적으로 막는다(실측 — next build
 * 자체가 에러로 죽는다, #b60a6c2류 배포-시점 실패보다 이른 시점에 걸림). 이 라우트는
 * force-static+generateStaticParams로 완전 정적이라 배포되는 함수 자체가 없으므로
 * runtime override가 안전하다.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-static';

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
