/**
 * story 2b4067b5 — 조회수 beacon 설정(PO 지시, 2026-09-03: env var 대신 상수 파일 하나로).
 * 값 자체는 비밀이 아니다(공개 페이지가 브라우저에서 그대로 부르는 endpoint·조직 공개키) —
 * env로 뺄 이유가 없다.
 *
 * endpoint는 우리 조직의 **dev** 백엔드다(prod 아님, PO 명시) — story fbcc07b5(디디군)의
 * `POST /api/v2/public/pageview`가 아직 그 백엔드에 없다. orgPublicKey는 지금 빈 문자열 —
 * ViewBeacon은 빈 키면 fetch 자체를 안 부르는 가드를 가진다(view-beacon.tsx). 그 스토리
 * 배포 후 PO가 후속 커밋으로 실 키를 채운다.
 */
export const PAGEVIEW_BEACON_ENDPOINT =
  'https://sprintable-backend-dev-787818285179.asia-northeast3.run.app/api/v2/public/pageview';

export const PAGEVIEW_ORG_PUBLIC_KEY = '';
