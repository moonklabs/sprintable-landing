'use client';

import { useEffect } from 'react';
import { SPRINTABLE_PUBLIC_API_BASE, SPRINTABLE_ORG_PUBLIC_KEY } from '@/lib/sprintable-public-api.config';

/**
 * story 2b4067b5 — Sprintable 자체 조회수 beacon. 계약(PO 확定, 2026-09-03 — story
 * fbcc07b5, 디디군 백엔드 별도 작업): `POST {base}/api/v2/public/pageview` body
 * `{public_key, path, referrer}`(필드명은 story fbcc07b5/PR#3728의
 * `backend/app/routers/public_pageview.py::PageviewBeaconRequest`를 직접 읽어 확認 —
 * `org_public_key` 아님, PO 리뷰 지적) — 쿠키 0, GA4 접근 없이도 유입을 센다.
 * `navigator.sendBeacon`은 안 쓴다(PO 명시, 2026-09-03) — text/plain으로 실려 백엔드가
 * 422를 낸다. fetch(..., {keepalive: true})가 계약.
 *
 * SPRINTABLE_ORG_PUBLIC_KEY가 빈 문자열인 동안(디디군 PR#3728 배포 前) — fetch 자체를
 * 안 부른다. PO가 배포 후 그 상수만 채우는 후속 커밋을 낸다(순서 의존 없음, 이 컴포넌트
 * 자체는 그 스토리를 기다리지 않는다).
 *
 * story c46eeea1(2026-09-05, PO 確定 — sprintable BE #3855 head 62aa0b2a8의
 * `PageviewBeaconRequest`로 필드명 고정): `utm_source`·`utm_medium`·`utm_campaign`·
 * `utm_content` 4개를 URL 쿼리스트링에서 읽어 있는 키만 body에 얹는다(없으면 생략,
 * 가공 0 — 소문자화·trim·길이 캡은 BE가 한다, PO 明示). `location.search`에서 raw
 * 그대로 읽는다 — 이 컴포넌트가 값을 지어내거나 바꾸지 않는다.
 */
export function ViewBeacon({ path }: { path: string }) {
  useEffect(() => {
    if (!SPRINTABLE_ORG_PUBLIC_KEY) return; // no-op — 디디군 백엔드/공개키 배포 前.

    try {
      const params = new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const) {
        const value = params.get(key);
        if (value !== null) utm[key] = value;
      }

      void fetch(`${SPRINTABLE_PUBLIC_API_BASE}/api/v2/public/pageview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_key: SPRINTABLE_ORG_PUBLIC_KEY, path, referrer: document.referrer || null, ...utm }),
        keepalive: true,
      });
    } catch {
      // best-effort — 조회수 beacon 실패가 페이지 렌더에 영향을 주면 안 된다.
    }
  }, [path]);

  return null;
}
