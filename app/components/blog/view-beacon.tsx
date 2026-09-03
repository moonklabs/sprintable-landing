'use client';

import { useEffect } from 'react';
import { PAGEVIEW_BEACON_ENDPOINT, PAGEVIEW_ORG_PUBLIC_KEY } from '@/lib/pageview.config';

/**
 * story 2b4067b5 — Sprintable 자체 조회수 beacon. 계약(PO 확定, 2026-09-03 — story
 * fbcc07b5, 디디군 백엔드 별도 작업): `POST {endpoint}/api/v2/public/pageview` body
 * `{org_public_key, path, referrer}` — 쿠키 0, GA4 접근 없이도 유입을 센다.
 * `navigator.sendBeacon`은 안 쓴다(PO 명시, 2026-09-03) — text/plain으로 실려 백엔드가
 * 422를 낸다. fetch(..., {keepalive: true})가 계약.
 *
 * PAGEVIEW_ORG_PUBLIC_KEY가 빈 문자열인 동안(디디군 PR#3728 배포 前) — fetch 자체를
 * 안 부른다. PO가 배포 후 그 상수만 채우는 후속 커밋을 낸다(순서 의존 없음, 이 컴포넌트
 * 자체는 그 스토리를 기다리지 않는다).
 */
export function ViewBeacon({ path }: { path: string }) {
  useEffect(() => {
    if (!PAGEVIEW_ORG_PUBLIC_KEY) return; // no-op — 디디군 백엔드/공개키 배포 前.

    try {
      void fetch(PAGEVIEW_BEACON_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ org_public_key: PAGEVIEW_ORG_PUBLIC_KEY, path, referrer: document.referrer || null }),
        keepalive: true,
      });
    } catch {
      // best-effort — 조회수 beacon 실패가 페이지 렌더에 영향을 주면 안 된다.
    }
  }, [path]);

  return null;
}
