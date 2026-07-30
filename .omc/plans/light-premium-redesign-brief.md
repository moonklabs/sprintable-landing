# Design Brief — "Proof, in Daylight" (feat/light-premium-redesign)

## 미션
Sprintable 랜딩을 **콘텐츠 변경 없이** 완전히 새로운 **라이트 테마 프리미엄 디자인**으로 재구축한다.
목표 감성: Stripe/Attio/Clay급의 밝고 신뢰도 높은 AI SaaS. "종이 위에 찍히는 파란 잉크 도장" — Verified 씰 메타포는 흰 종이(증서) 위에서 완성된다.

## 절대 규칙
1. `messages/ko.json`, `messages/en.json` **절대 수정 금지** (콘텐츠 동결).
2. 콘텐츠 구조(섹션 순서, 문구, 링크)는 유지. 스타일/레이아웃/모션만 재설계.
3. Next.js API 변경 금지 — 스타일링 작업만. `layout.tsx`의 폰트(Bricolage Grotesque + Barlow)는 유지.
4. 기존의 `@supports (animation-timeline: view())` 프로그레시브 인핸스먼트 구조와 `prefers-reduced-motion` 블록은 **구조 유지, 색만 교체**.
5. 모든 텍스트 대비 WCAG AA 이상. 본문 ink는 흰 배경 위 4.5:1 이상.
6. `overflow-x-clip` 유지 (hidden 금지 — 앵커 점프 하이재킹 이슈).

## 디자인 토큰 (globals.css @theme 전면 교체)

```css
/* Canvas — 쿨 뉴트럴 화이트, 블루 언더톤 */
--color-canvas:        oklch(98.5% 0.003 265);  /* 페이지 기본 배경 */
--color-canvas-tint:   oklch(96.9% 0.007 258);  /* 섹션 교차용 블루틴트 패널 */
--color-card:          oklch(100% 0 0);          /* 카드 = 순백 종이 */

/* Ink */
--color-ink:           oklch(22% 0.025 265);
--color-ink-secondary: oklch(45% 0.02 265);
--color-ink-muted:     oklch(57% 0.015 265);

/* Hairlines */
--color-line:          oklch(90% 0.008 265);
--color-line-strong:   oklch(84% 0.012 265);

/* Signature blue — 라이트 대비용 딥 블루 */
--color-accent:        oklch(51% 0.19 258);
--color-accent-strong: oklch(44% 0.19 258);      /* hover */
--color-accent-wash:   oklch(51% 0.19 258 / 0.07);
--color-accent-soft:   oklch(88% 0.055 258);     /* 메시/장식용 페리윙클 */

/* Secondary */
--color-teal:          oklch(55% 0.11 195);
--color-verified:      oklch(56% 0.13 150);      /* verified 잉크 그린 */
```

### 섀도우 시스템 (Stripe식 블루틴트 레이어드)
- 카드 기본: `0 1px 2px oklch(25% 0.04 265 / 0.05), 0 8px 24px -6px oklch(35% 0.06 258 / 0.10)`
- 카드 hover-lift: `translateY(-4px)` + `0 2px 4px oklch(25% 0.04 265 / 0.06), 0 20px 48px -12px oklch(45% 0.12 258 / 0.22)` + border → accent 40%
- 스크린샷 프레임: `0 24px 64px -16px oklch(35% 0.08 258 / 0.25)`
- CTA 버튼: `0 1px 2px oklch(25% .1 258/.2), 0 8px 24px -6px oklch(51% .19 258 / 0.45)` (glow는 blur가 아니라 컬러 섀도우로)

## 섹션별 아트 디렉션

### NAV
화이트 글라스: `oklch(98.5% 0.003 265 / 0.8)` + backdrop-blur-xl + 하단 헤어라인 `--color-line`. 워드마크·링크는 ink, 마크 SVG는 accent. CTA는 딥블루 솔리드 필 + 화이트 텍스트. nav-link 언더라인은 accent.

### HERO (머니샷 — 가장 공들일 것)
- 배경: 화이트 위 라이트 그라디언트 메시 — 좌상 페리윙클 `oklch(88% 0.06 258 / 0.55)`, 우상 스카이 `oklch(92% 0.045 220 / 0.5)`, 하단 민트 `oklch(93% 0.05 190 / 0.4)` radial 3개 + 기존 aurora-drift 애니메이션 유지. 위에 dot grid (`oklch(55% 0.03 258 / 0.35)` 1px 도트, 기존 mask 유지).
- grain-layer는 opacity 0.025로 낮춰 종이 질감으로.
- 헤드라인: ink 컬러, `<g>` 하이라이트 워드는 accent 블루 + 형광펜 워시(뒤에 `--color-accent-soft / 0.5` 라운드 하이라이트 박스 또는 밑줄 스트로크).
- 씰 카드(verified-seal-card): **흰 증서 카드**로 재해석 — 순백 bg, 헤어라인 보더, 강한 블루틴트 섀도우, 도장(emblem)은 accent 블루 잉크, verified 행 글로우는 `oklch(56% 0.13 150 / 0.07)`. 도장 스탬프 애니메이션 유지.
- 커맨드 칩: 라이트 테마 터미널 — 아주 연한 ink 배경(`oklch(96% 0.008 265)`) 또는 반전 다크 칩 중 **반전 다크 칩** 선택(터미널은 다크가 진짜같음): `oklch(22% 0.025 265)` bg + 밝은 텍스트. 페이지에서 유일한 소형 다크 오브젝트로 포인트.
- trust strip 칩: 화이트 필 + 헤어라인 + ink-secondary.

### TRUST 섹션
`--color-canvas-tint` 패널 배경으로 미세하게 구분. 스텝 카드는 순백. 넘버·아이콘은 accent. Advisor 카드는 accent-wash 배경 + accent 20% 보더.

### HOW IT WORKS
화이트 배경. 루프 커넥터(flow-line) 대시는 accent 50%, flow-fill은 accent→verified 그라디언트. 스텝 노드는 흰 원 + accent 보더 + 블루 섀도우.

### PROOF (스크린샷)
스크린샷은 다크 앱 화면이므로 **밝은 브라우저 크롬 프레임**(상단에 dot 3개 있는 화이트 바)으로 감싸 대비를 만들 것. corner-ticks는 accent 55%. shimmer는 라이트에선 과하니 제거하거나 opacity 절반.

### CUSTOMERS / MODEL / PRICING
- 카드: 순백 + 헤어라인 + hover-lift.
- fit 박스: accent-wash bg + accent 18% 보더.
- Premium/Team(인기) 카드: accent 35% 보더 + `linear-gradient(160deg, accent-wash, white 60%)` + 블루 섀도우. popular 뱃지는 accent 솔리드 + 화이트 텍스트.
- annual discount 뱃지: teal wash.

### FINAL CTA — 페이지의 클라이맥스, 유일한 다크 모먼트
풀블리드 딥블루 밴드: `linear-gradient(160deg, oklch(35% 0.13 260), oklch(22% 0.05 265))` + 은은한 메시 오브 + grain. 텍스트 화이트, primary CTA는 **화이트 버튼 + 딥블루 텍스트** (반전). 씰 스크럽 애니메이션 유지, 씰은 화이트/라이트 블루 잉크로. 라운드 상단 코너(rounded-t-[2.5rem])와 max-w 컨테이너로 "카드처럼 떠오르는 밴드" 연출 권장.

### FOOTER
canvas 배경, 헤어라인 top, ink-muted 텍스트. operational 도트는 verified 그린.

### MOBILE BOTTOM NAV
화이트 글라스(`oklch(100% 0 0 / 0.92)`) + 헤어라인 + 블루틴트 섀도우.

### 스크롤 프로그레스 바
`linear-gradient(90deg, oklch(51% 0.19 258), oklch(55% 0.11 195))` — 라이트 배경에서 보이도록 딥 톤.

## 수정 대상 파일
- `app/globals.css` — 토큰/효과 전면 교체 (구조·키프레임 이름은 유지해도 됨)
- `app/page.tsx` — 인라인 oklch 다크 값 전부 라이트 값으로. **가능하면 인라인 style 색상을 CSS 변수 참조로 정리** (`var(--color-ink)` 등) — 유지보수성.
- `app/components/sections/hero-section.tsx`
- `app/components/sections/trust-section.tsx`
- `app/components/sections/how-it-works-section.tsx`
- `app/components/sections/final-cta-section.tsx`
- `app/components/ui/verified-seal-card.tsx`
- `app/components/ui/command-chip.tsx`
- `app/components/brand/seal-emblem.tsx` (색상만)
- `app/components/nav-links.tsx`, `locale-switcher.tsx` (색상만)
- motion 컴포넌트(`scroll-reveal.tsx`, `parallax.tsx`)는 로직 변경 금지.

## 완료 기준 (셀프 체크)
1. `grep -rn "oklch(1[0-9]%\|oklch(2[0-6]%" app/` 로 다크 배경 잔재 없는지 확인 (Final CTA 밴드·커맨드 칩·스크린샷 프레임 제외는 주석으로 명시).
2. 헤드라인/본문/뮤트 텍스트 모두 흰 배경 대비 AA.
3. `npx tsc --noEmit` 통과 (또는 `npm run build`가 아닌 가벼운 타입체크).
4. 모든 hover/모션이 라이트 톤에 맞게 재조정됨 (다크용 글로우 잔재 금지).

---

# Phase 2 — "Certificate Luxury" 고급화 라운드

## 문제 진단 (디렉터)
Phase 1 결과는 깔끔하지만 고급스럽지 않다. 이유: 일반 SaaS 문법(흰 카드+헤어라인+파란 버튼)만 있고 소재감·개성이 없음. Phase 2는 "고급 인쇄물 / 공증 증서 / 프라이빗 뱅킹" 소재 언어를 입힌다.

## 2-1. 타이포그래피 — 에디토리얼 세리프 도입
- `layout.tsx`에 Google Font **Instrument Serif** (400, italic 포함) 추가 → `--font-serif`.
- 히어로 헤드라인의 `<g>` 하이라이트 단어("verified"/"검증된 것")를 **이탤릭 세리프**로 — 하이라이트 박스 대신 세리프 이탤릭 + accent 컬러 + 손그림 언더라인 스트로크(SVG). 대비되는 산세리프/세리프 혼용이 고급 인쇄물의 핵심.
- operatingPrinciple 인용구, 섹션 서브타이틀 중 감성 문장에도 세리프 이탤릭 적용.
- 아이브로우: 대문자 + tracking 0.25em + 양옆 헤어라인 룰 (기존 eyebrow-cross 유지하되 세련되게).
- 한국어 로케일: 세리프는 라틴 글리프에만 적용됨 — 한글은 fallback으로 기존 폰트 유지 (font-family 체인에 --font-serif 먼저, 문제 없음). 단 한글 하이라이트 단어는 이탤릭 없이 컬러+언더라인만.

## 2-2. 컬러 온도 — 아이보리 페이퍼 + 네이비 잉크 + 골드 힌트
```css
--color-canvas:      oklch(98.6% 0.005 85);   /* 아이보리 페이퍼 (웜) */
--color-canvas-tint: oklch(96.8% 0.008 80);   /* 웜 틴트 패널 */
--color-card:        oklch(99.5% 0.002 85);
--color-ink:         oklch(23% 0.03 262);      /* 딥 네이비 잉크 */
--color-ink-secondary: oklch(44% 0.025 262);
--color-line:        oklch(89% 0.01 85);       /* 웜 헤어라인 */
--color-line-strong: oklch(82% 0.015 85);
--color-accent:      oklch(48% 0.17 260);      /* 잉크빛 네이비-블루 (기존보다 딥) */
--color-gold:        oklch(72% 0.09 85);       /* 골드 포일 — 씰 링·디테일 전용, 절제 */
--color-gold-soft:   oklch(72% 0.09 85 / 0.35);
```
- 골드는 **딱 3곳만**: ① 씰 엠블럼 외곽 링 ② 아이브로우 룰 끝 마이크로 틱 ③ Final CTA 밴드의 씰 워터마크 라인. 남용 금지 — 절제가 고급.
- 히어로 메시: 페리윙클+스카이 유지하되 웜 캔버스와 어울리게 채도 미세 조정, 우하단에 아주 옅은 골드-샴페인 오브 1개 추가.

## 2-3. 증서 소재 언어
- **씰 카드 = 증서**: 카드 안쪽에 1px 이중 괘선(외곽 보더 + 6px 안쪽 헤어라인 인셋 보더, ::before로), 모서리에 미니 코너 오너먼트. 헤더 타이틀은 레터스페이스 대문자.
- **길로쉐 패턴**(SVG, 증권 문양 곡선): 히어로 우측 배경과 Final CTA 밴드에 opacity 0.04~0.07로. 가는 스트로크 동심 곡선 웨이브 — 컴포넌트 `app/components/brand/guilloche.tsx` 신규 생성 (순수 SVG, 클라이언트 JS 불필요).
- 스크린샷 프레임: 브라우저 크롬 대신 **매트 프레임**(액자) — 카드 패딩 안에 이미지, 하단에 세리프 이탤릭 캡션. 갤러리에 걸린 증거 사진처럼.

## 2-4. 마이크로 디테일
- Primary CTA: 딥 네이비-블루 그라디언트(위가 살짝 밝음) + inset 상단 1px 화이트 하이라이트 + 확산 블루 섀도우 — 유리 단추 질감.
- 카드 hover: lift + 보더 accent 전환은 유지하되 transition 0.4s로 여유있게.
- 섹션 사이 rule-ticks(센터 틱 헤어라인) 적극 사용 — 인쇄물의 장 구분선.
- 뱃지/칩: 라운드 풀 → 살짝 각진 rounded-md 통일감, 대문자 마이크로 타이포.
- grain 유지 (종이 질감).

## 2-5. 금지
- 골드 남용, 화려한 그라디언트 텍스트, 네온, 다크 패널 추가 금지. Final CTA만 다크 유지 (네이비로 통일, 길로쉐 워터마크 추가).
- 콘텐츠(messages/*.json) 동결 유지.
