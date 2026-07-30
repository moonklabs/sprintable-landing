# Early Access Waitlist 극대화 플랜

## Context

랜딩(feat/waitlist-conversion 브랜치)을 early access 방식으로 전환해 **waitlist 등록을 최대화**하는 것이 목표. 커밋 `c197b42`로 전환 인프라는 이미 완성됨:

- Tally 팝업 통합: [waitlist-popup.tsx](app/components/waitlist-popup.tsx) — `data-waitlist-cta` 클릭 위임, unavailable 폴백 다이얼로그, a11y
- 히든 필드 수집: [waitlist.ts](app/lib/waitlist.ts) — originPage/ctaSource/plan + UTM 5종
- CTA 6곳 전환 완료: nav·hero·pricing(plan 태깅)·final CTA·모바일 스티키 → "얼리 액세스 신청 / Join waitlist"
- GA4 퍼널 이벤트: `waitlist_cta_clicked → waitlist_form_opened → waitlist_submitted` ([tracking.ts](app/lib/tracking.ts))
- i18n 라우팅(/ko /en) + sitemap + [docs/waitlist-setup.md](docs/waitlist-setup.md) (Tally 폼 스펙)

**남은 문제**: ① Tally 폼 미발행(form ID 비어있음 — 지금 모든 CTA가 "unavailable" 다이얼로그로 떨어짐) ② 페이지 서사가 여전히 "제품 소개+요금제"라 early access 전환 서사가 약함 ③ 추천(referral) 루프 부재 ④ 운영 루틴 미정.

**확정된 방향** (사용자 결정):
- 혜택: **우선 온보딩 + 파운더 직접 지원 + 로드맵 반영** (할인/무료 없음 — 가격 앵커 보존)
- 오픈소스 셀프호스트 경로(GitHub)는 **그대로 열어둠** (OSS 신뢰 = 브랜드 핵심, OSS 유저가 waitlist 잠재 풀)
- 범위: **코드 + 운영 가이드**

---

## Part A — 코드 작업 (구현)

### A1. Early access 서사 전환 (messages/ko.json · en.json + 히어로/섹션)
콘텐츠 동결 해제 — 이제 카피가 전환 도구. 디자인 시스템(아이보리·네이비·명조·골드)은 유지.

- `hero.badge`: "Beta" → "Early Access", `badgeActive`: "코호트 단위로 초대 중" 류의 정직한 희소성 (가짜 카운터·마감 임박 금지)
- `hero.subheadline` 끝에 waitlist 가치 한 줄 추가 (검증 루프를 먼저 쓰는 팀)
- **신규 `earlyAccess` 섹션 키**: "얼리 액세스로 받는 것" 3개 — ① 우선 온보딩(코호트 초대) ② 파운더 직접 지원 채널 ③ 로드맵 우선 반영. Final CTA 밴드 위 또는 pricing 아래에 컴팩트 3-칩 밴드로 삽입 ([app/[locale]/page.tsx](app/[locale]/page.tsx))
- `pricing.subtitle`에 "얼리 액세스 기간에는 waitlist 승인 후 시작" 컨텍스트 한 줄, pricing CTA 라벨은 이미 waitlist로 전환돼 있음 — 유지
- `finalCta`: "검증된 결과만 배포하세요" 유지 + desc를 waitlist 서사로 조정
- GitHub 링크(nav·hero secondary·footer)는 그대로 유지

### A2. 추천(referral) 루프 최소 구현
- [waitlist.ts](app/lib/waitlist.ts) `buildWaitlistHiddenFields`에 `ref` 파라미터 캡처 추가 (URLSearchParams에서 `ref` → hidden field). [waitlist.test.ts](app/lib/waitlist.test.ts)에 케이스 추가
- Tally 히든 필드에 `ref` 추가 (docs 갱신)
- Tally thank-you 화면에 공유 링크(`https://sprintable.ai/ko?ref=<email-hash-or-code>&utm_source=referral`) 안내 — Tally 설정 영역이므로 운영 가이드에 기재

### A3. 메타데이터/OG 정비 ([app/[locale]/layout.tsx](app/[locale]/layout.tsx))
- title/description을 early access 서사로: "Sprintable — AI 검증 조직 OS, 얼리 액세스" 톤 (로케일별)
- OG 이미지 존재 확인, 없으면 히어로 캡처 기반 정적 OG 1장 추가 (public/)

### A4. 정리
- 남은 `app.sprintable.ai` 링크 1곳 waitlist CTA 또는 GitHub으로 정리
- `npx tsc --noEmit` + waitlist 테스트 통과 확인

## Part B — 운영 가이드 문서화 (docs/waitlist-setup.md 확장 or docs/early-access-playbook.md 신규)

1. **런치 블로킹 체크리스트** (사용자 액션):
   - Tally 폼 발행 (docs 스펙: 2-step, 필수 4필드, 히든 9필드[ref 포함]) → `NEXT_PUBLIC_TALLY_WAITLIST_FORM_ID` 로컬+Cloudflare Pages 설정 → 재배포
   - Tally → Slack 알림 + Google Sheets 연동, 리드 오너·응답 SLA(48h) 지정
   - GA4에서 `waitlist_submitted` 전환 이벤트로 마킹
2. **코호트 운영 루틴**: 주 단위 배치 초대(우선순위: AI 에이전트 활용팀 > 6인 이상 > 나머지 너처), 초대 시 다음 코호트 안내 메일
3. **채널 플레이북**: GitHub README 배지/링크 → waitlist, 커뮤니티(디스콰이엇·GeekNews·HN Show), 파운더 LinkedIn/X 포스팅, Product Hunt 예고 페이지 — 채널별 UTM 규칙표 (`utm_source=github|disquiet|geeknews|linkedin|x|ph`)
4. **주간 측정 루틴**: GA4 퍼널(clicked→opened→submitted) source/plan별 리뷰 → 최저 전환 구간의 카피/위치 반복 개선

## Verification

1. 로컬 `.env`에 테스트 Tally form ID 설정 → dev 서버에서 CTA 6곳 클릭 → 팝업 오픈 → 테스트 제출
2. `/ko?utm_source=test&utm_medium=test&ref=abc`로 진입해 Tally 제출에 히든 필드 9종 도달 확인
3. GA4 DebugView에서 3개 이벤트 발화 확인 (source/plan 파라미터 포함)
4. 브라우저 패널로 ko/en 신규 섹션·뱃지·OG 메타 실측 (reveal 강제 + body-translate 캡처 트릭 사용)
5. `npx tsc --noEmit` + `waitlist.test.ts` 통과
