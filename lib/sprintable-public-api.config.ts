/**
 * story 15a18511/2b4067b5(PO 확定, 2026-09-03 — 선생님 «글 1편=커밋 1건은 구조적으로
 * 틀림» 지적 뒤 재설계) — Sprintable 공개 API 설정(조회수 beacon + site-posts 목록/본문
 * 둘 다 같은 백엔드·같은 공개키를 쓴다). 상수 파일 하나(PO 지시 — env 아님, 값 자체가
 * 비밀이 아니다: 공개 페이지가 브라우저/edge에서 그대로 부르는 endpoint·조직 공개키).
 *
 * BASE는 우리 조직의 **dev** 백엔드다(prod 아님, PO 명시). PUBLIC_KEY는 story
 * fbcc07b5/PR#3728(조회수 beacon)·story e5731937(site-posts 공개 API) 둘 다 같은 조직
 * 공개키를 쓴다(PO 확定: "공개키=#3728 metering key와 같은 값") — 둘 다 dev 배포 완료 후
 * PO가 이 값을 직접 줬다(2026-09-03, 비밀 아님·조직 공개키). 값이 비어 있던 동안
 * 소비부(view-beacon.tsx·site-posts.ts)는 빈 키를 만나면 fetch 자체를 안 부르거나
 * (beacon) 빈 상태로 조용히 폴백했다(site-posts) — throw 0, 순서 의존 없이 여기까지 왔다.
 */
export const SPRINTABLE_PUBLIC_API_BASE = 'https://sprintable-backend-dev-787818285179.asia-northeast3.run.app';

export const SPRINTABLE_ORG_PUBLIC_KEY = '4vmvmNi5B3BEWbcFoVZTA5ys_hs9y-gUy8UNGc6biqg';
