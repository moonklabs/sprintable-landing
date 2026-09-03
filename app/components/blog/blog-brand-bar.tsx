import Link from 'next/link';
import { SprintableMarkSvg } from '@/app/components/brand/sprintable-mark-svg';

/**
 * story 15a18511 — 유나 design 라이브 시각 검토(evidence ed66add5) 채택 1건: 글 목록/본문
 * 페이지 상단에 «최소 브랜드 바»(로고→홈 링크 하나, 풀 nav 아님). 랜딩 헤더(app/page.tsx의
 * `<nav>`)의 워드마크 조각만 그대로 재사용 — NavLinks/LocaleSwitcher/GitHub 링크는 이
 * 바에 없다(전체 nav는 그 자체로 별개 컴포넌트가 아니라 app/page.tsx에 인라인이라 재사용
 * 불가 — 로고 마크업만 손으로 옮겼다, 새 디자인 발명 0).
 *
 * maxWidthClassName — 목록(max-w-3xl)·본문(max-w-2xl) 페이지가 각자 컨텐츠 폭에 맞춰
 * 바 폭도 맞출 수 있게(둘 다 하드코딩 하나로 고정하면 본문 아래 콘텐츠와 폭이 안 맞는다).
 */
export function BlogBrandBar({ maxWidthClassName }: { maxWidthClassName: string }) {
  return (
    <div style={{ borderBottom: '1px solid oklch(26% 0.022 265)' }}>
      <div className={`mx-auto flex items-center px-6 py-6 ${maxWidthClassName}`}>
        <Link href="/" className="flex shrink-0 items-center gap-[11px] text-white">
          <SprintableMarkSvg className="size-[22px]" style={{ color: 'oklch(72% 0.14 258)' }} />
          <span className="font-[family-name:var(--font-display)] text-base font-bold tracking-[-0.04em]">
            Sprintable
          </span>
        </Link>
      </div>
    </div>
  );
}
