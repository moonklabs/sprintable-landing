# Sprintable 랜딩 — 개발자 타깃 재포지셔닝 + Orca 부착 전략

- 작성일: 2026-07-30
- 대상: Sprintable 랜딩페이지
- 레퍼런스: [Orca](https://onorca.dev)
- 선행 문서: [Sprintable 개발자 랜딩페이지 콘텐츠 구조 분석](./2026-07-30-developer-landing-content-analysis.md)
- 목적: 위 분석 문서가 남긴 미결정 사항을 실제 소스(GitHub API·PyPI·`sprintable` 로컬 저장소·onorca.dev 실측)로 검증하고, 실행 가능한 Phase별 구현 계획으로 확정한다.

## Context

Sprintable 랜딩페이지를 개발자 대상으로 재구성한다. 레퍼런스는 [Orca](https://onorca.dev) — 결과 → 실제 워크플로우 → 기술적 증거 → 사회적 증거 → 도입 순의 설득 구조.

현재 Hero는 "AI가 했다는 것과 검증된 것은 다릅니다"로, 방문자가 이미 AI 신뢰 문제에 관심이 있다고 전제하는 추상적 명제다. 개발자에게는 **아는 것에 앵커링하는** 구체적 훅이 필요하다.

조사 중 네 가지가 드러났다.

1. **랜딩에 실행되지 않는 명령어가 Primary 기술 증거로 박혀 있다.** 개발자는 명령어를 복사해 실행하므로, 이 하나가 구조 개선보다 큰 신뢰 손실을 만든다.
2. **필요한 콘텐츠 대부분이 repo에 이미 정확하게 쓰여 있다.** 특히 `README.ko.md`는 현재 랜딩보다 개발자 포지셔닝이 낫다 — 발명이 아니라 이식 작업이다.
3. **Orca 사용자가 Sprintable의 최적 유입원이다.** Orca 사용자는 이미 병렬 에이전트를 돌리고 있어 Sprintable이 푸는 문제의 전제조건을 충족한 유일한 고밀도 집단이다. 단 대체가 아니라 **부착**이어야 한다.
4. **Orca Hero의 "인터랙티브 데모"는 실제로는 클릭 상호작용이 아니다.** onorca.dev를 두 차례 재조사한 결과, Hero의 제품 시각화는 실제 파일 경로·테스트명·diff 라인 수까지 갖춘 정교한 **정적 워크스루**이고, 진짜 클릭 인터랙션("Click to inspect")은 Hero가 아니라 그 아래 Feature 섹션에 있다. Orca가 신뢰를 만드는 방식은 클릭이 아니라 **압도적으로 사실적인 디테일**이다 — Sprintable도 이 방식을 그대로 따른다. 대신 Sprintable 자체의 핵심 차별점(Gate)을 기능별 시나리오로 나눠 보여주는 전용 섹션을 별도로 둔다.

### 확정된 결정

- **Hero 훅**: Linear를 발판(foil)으로 — "에이전트 하나는 Linear로도 됩니다"
- **Hero 데모 스타일**: Orca처럼 **사실적 정적 워크스루** — 클릭 인터랙션이 아니라 실제 화면처럼 보이는 디테일로 신뢰를 만든다. **지어낸 목업이 아니라 실제 운영 중인 소스(`/Users/moonklabs/workspace-moonklabs/sprintable`)의 실제 화면을 캡처해서 쓴다.** Hero의 기존 대형 대시보드 스크린샷(`hero-section.tsx`의 `dashboardShot`)을 Gate/Review 실제 화면으로 교체 — 이게 원래 `docs/plans/2026-07-30-developer-landing-content-analysis.md` §5.2가 지적했던 문제(Proof 화면이 핵심 차별점을 증명 못함)의 직접적인 해결이다. `VerifiedSealCard`(작은 양식화 카드)는 그대로 유지
- **기능 시나리오 섹션**: Hero는 축약판, Phase 3(Trust 직후)가 전체판. **3개 시나리오** 탭 — 전부 실제 캡처 화면 — ① Gate 승인/반려 상세 화면 ② Cross-vendor 리뷰(채팅 스레드) ③ 감사 로그 조회. 모바일 탭은 이번 범위에서 제외(앱 소스 미확보)
- **제품 상태**: 셀프호스트 지금 가능(Docker Compose) · 관리형은 얼리 액세스 → Primary CTA = Quick Start
- **Gate 증빙**: 스크린샷이 아니라 **코드로 구현한 Gate 패널**
- **Orca 전략**: **부착(보완 레이어)** — "Orca에서 돌리고, Sprintable이 판정한다". 신규 개발 0
- **Orca 유입 경로**: 메인 페이지 진입 블록 **+** 전용 `/orca` 페이지 둘 다
- **모바일 앱**: iOS TestFlight + Android 베타/APK로 실존 → 링크 가능. **Gate 승인은 부분 구현** — 푸시 알림 → 웹뷰 승인 화면 경로는 레포 근거로 확인됨(아래 §4). 네이티브 전용 승인 UI는 아니다
- **데스크톱 앱**: 범위 밖 (없음)
- **OSS 신호**: AGPL-3.0 명시 · MCP 도구 수 95로 통일 (스타 10개는 노출 안 함)
- **범위**: 기존 8섹션 순서 유지, 사이에 삽입 + `/orca` 신규 라우트

---

## 검증된 사실오류 (P0 — 최우선)

### 1. `uvx sprintable`은 셀프호스트가 아니다 — 가장 심각

랜딩 2곳이 이 명령을 "한 줄 셀프호스트"로 설명한다 (`hero.commandHint`, `finalCta.desc`).

실제 PyPI `sprintable` v0.1.1:
> Sprintable MCP server — BYO agent toolset **over the Sprintable API** (stdio).

**이미 존재하는 Sprintable API에 에이전트를 연결하는 MCP 클라이언트**다. 실행에 `SPRINTABLE_API_URL`과 `AGENT_API_KEY=sk_live_...`가 필수 → **계정 없는 신규 방문자는 실행 자체가 불가능하다.**

진짜 셀프호스트 (`README.md:143-167`):
```bash
git clone https://github.com/moonklabs/sprintable.git
cd sprintable
cp .env.example .env
docker compose up -d --build
# → http://localhost:3108
```

`uvx sprintable`은 Compatibility 섹션과 `/orca` 페이지에서 **정확한 맥락**(기존 계정 + 에이전트 연결)으로 쓴다 — 오히려 Orca 부착의 핵심 도구다.

### 2. MCP 도구 수가 소스마다 다르다

랜딩 `70+` / `public/llms.txt` `89` / repo README(3곳) **`95`** → **95로 통일.** README가 가장 최근(2026-07-29 푸시)이고 카테고리 표와 일치.

### 3. AGPL-3.0이 어디에도 없다

라이선스는 AGPL-3.0. 랜딩은 "Open Source"만 표시. 도입 판단에 직결되고 나중에 발견되면 신뢰를 잃는다. README에 좋은 설명이 있다 — 내부 도구·개인 프로젝트 자유, SaaS/embedded는 상용(GitLab·Plane·Mattermost 모델).

### 4. 앱 관련 표현 — 정정된 사실관계 (2차 수정)

앞선 조사에서 "앱이 없다"고 판정했으나 이는 **OSS repo만 검색한 결과**였다. 앱 프로젝트는 별도로 존재하고 iOS TestFlight · Android 베타/APK로 배포된다. 랜딩에서 링크 가능.

이후 "앱 내 Gate 승인은 미구현"이라고 다시 판정했으나, 이 또한 정정됐다 — **부분적으로 구현되어 있다.** 앱은 React Native로 웹을 래핑하고 네이티브로는 채팅·알림만 노출한다. 승인·반려가 되는지는 레포에서 직접 확인했다.

**레포 근거로 확인된 것:**
- `backend/app/services/gate_service.py:360-373`, `:454-467` — Gate가 `pending` 상태로 열리거나 재오픈될 때 `dispatch_notification(event_type="gate.pending_approval", reference_type="gate", reference_id=gate.id, ...)` 를 호출한다. `workflow_sla_processor.py:158,183`에는 `gate_escalated` · `gate_reminder` 이벤트도 있다
- `apps/web/src/app/(authenticated)/gates/[id]/page.tsx`가 `GateSignatureApproval`(`apps/web/src/components/cage/gate-signature-approval.tsx`)을 렌더한다 — 근거 열람 체크박스 + 사유 텍스트 필수 입력 후 승인/반려. 코드 주석(story #1954 P1a-S4)에 "풀스크린 페이지 내 섹션(시트/팝오버 아님, AC 준수)"라 명시되어 있고, 버튼이 전부 `min-h-12`(48px) 터치 타깃이라 웹뷰에서 그대로 쓸 수 있게 만들어져 있다

**확인하지 못한 것**: 이 RN 앱 자체는 별도 프로젝트라 이 레포에 없다. 알림을 탭했을 때 실제로 `/gates/[id]`로 딥링크되는지는 직접 못 봤다 — 사용자 설명("채팅·알림만 네이티브, 승인반려증거는 시스템 내에 있음")과 위 백엔드·웹 근거가 정확히 들어맞는다는 점에서 정합적이라고 판단했다.

| 항목 | 현재 상태 | 랜딩 표현 |
| --- | --- | --- |
| iOS TestFlight | 실존 | 링크 가능 |
| Android 베타/APK | 실존 | 링크 가능 |
| **Gate 승인 알림** | 구현됨(백엔드) | 오늘 작동하는 기능으로 표현 가능 |
| **Gate 승인 화면** | 구현됨(웹, 웹뷰에서 동작) | "네이티브 전용 UI"라고는 쓰지 않는다 — "알림 → 웹 승인 화면"으로 정확히 |
| 데스크톱 앱 | 없음 | 언급하지 않는다 |

**전략적으로 중요한 함의**: 모바일 승인이 Orca 컴패니언 앱(상태 조회 전용)에는 없는 진짜 차별점이 됐다 — 이 사실 자체는 FAQ·로드맵 카피에 그대로 쓴다. 다만 이번 라운드에서는 **시각 데모 탭으로 만들지 않는다** — 모바일 앱 소스가 이 워크스페이스에 없어 실제 화면을 캡처할 방법이 없고, 실캡처 없이 재현 목업을 만드는 건 이번 개편의 원칙(§Context 4번, 실제 화면 우선)과 정면으로 충돌한다. Phase 3는 웹에서 실제로 캡처 가능한 3개 시나리오로 진행하고, 모바일은 앱 소스가 확보되면 별도로 추가한다.

### 5. 8개 CTA 전부가 Waitlist인데 가입할 이유가 없다

`nav` · `hero` · `pricing`×3 · `final_cta` · `mobile_sticky` 모두 `data-waitlist-cta`. 셀프호스트가 가능한데 실행 경로가 없고, 특히 **Free `$0` 셀프호스트 요금제 CTA가 "얼리 액세스 신청"** 인 것은 자기모순.

Waitlist의 목적을 **관리형 호스팅 얼리 액세스**로 재정의하고 셀프호스트는 Quick Start로, 앱은 TestFlight·Android 베타 실링크로 각각 분리한다. Gate 승인은 앱에서 이미 되므로 "얼리 액세스" 대상이 아니다.

---

## 포지셔닝 소스: `README.ko.md`

한국어 README가 현재 랜딩보다, 그리고 영문 README보다도 개발자 포지셔닝이 낫다.

**한 줄 포지셔닝** (`README.ko.md:3`):
> 코딩 에이전트 팀을 위한 delivery ledger — 에이전트 작업이 정말 끝났는지, 병합해도 안전한지 알 수 있게 합니다.

현재 랜딩의 "오픈소스 조직 OS"보다 dev-native. `metadata` · `footer.desc` · `hero.subheadline`에 반영.

**비교 대상 선정** (`README.ko.md:21`) — 영문판은 `PM tools / Human org OS(Rippling) / AI-workforce(Workday)`로 HR 색이 짙지만, 한국어판 3개는 개발자가 실제로 다 시도해본 것들이다:

| | Linear / Jira | n8n + webhooks | 터미널 래퍼 · 에이전트 시각화 도구 | **Sprintable** |
| --- | --- | --- | --- | --- |
| 병합 전 완료 판정 게이트 | 없음 — 상태 필드일 뿐 | 직접 구현 | 없음 — 보여줄 뿐 막지 않음 | **`done` 전이는 사람이 해소** |
| 병합 안전 게이트 | 모델링 안 됨 | 직접 구현 | 모델링 안 됨 | **감사 가능한 1급 `Gate` 객체** |
| Cross-vendor 상호 리뷰 | 수동/글루 코드 | PM 데이터 모델 없음 | 모델링 안 됨 | **Claude Code가 짜고 Codex가 리뷰** |
| 감사 원장 | 부분적(이슈 히스토리) | PM 도구 아님 | 터미널 스크롤백은 기록이 아님 | **전 액션 로그 · MCP 조회** |

세 번째 열이 정확히 Orca 카테고리다. Orca식 체크마크 우월표가 아니라 **"각 도구가 한 조각씩 갖고 아무도 전체를 갖지 못했다"** 는 원문 논증을 유지한다.

---

## Orca 부착 전략

### 왜 부착이고 대체가 아닌가

Orca는 MIT · 32.9k stars · YC 배킹 · 데스크톱 네이티브 · 매일 배포다. Sprintable은 AGPL · 10 stars · 웹 · 릴리스 1개다. **기능 경쟁은 불가능하고 불필요하다.** 두 제품은 축이 다르다.

```
Orca      = 에이전트가 실행되는 곳   (로컬 · 단일 개발자 · IDE/터미널/워크트리)
Sprintable = 그 결과가 판정되는 곳   (서버 · 팀 · 원장/게이트)
```

Orca 사용자는 이미 병렬 에이전트를 돌린다 — Sprintable이 푸는 문제("셋이 같은 레포를 건드리면")의 전제조건을 충족한 가장 고밀도 집단이다. 이미 그 고통을 겪었다.

### 검증된 틈 (onorca.dev 실측)

| Orca에 있는 것 | Orca에 없는 것 |
| --- | --- |
| 병렬 워크트리 · 25+ 에이전트 · 터미널 · 임베디드 Chromium | **판정 도구** — 자사 카피가 "fan one prompt across 5 agents, compare, merge the winner"라고 하면서 그 판정을 위한 도구는 문서화되어 있지 않다 |
| GitHub PR in-app 리뷰·승인 | **강제되는 게이트** — 전이를 막는 상태기계가 아니다 |
| 로컬 단일 개발자 워크플로우 | **팀/서버 개념** — 공유 워크스페이스·팀 권한 없음 |
| 터미널 스크롤백 검색 | **감사 원장** — 스크롤백은 기록이 아니다 |
| 에이전트 자율성 강조 | **자기 인증 차단** — 에이전트가 자기 작업을 done으로 표시하는 것을 막는 장치가 없다 |

### 정확성 제약 — 반드시 지킨다

**Orca에 "승인이 없다"고 쓰면 안 된다.** Orca는 GitHub PR을 in-app에서 리뷰·승인할 수 있다. 정확한 차이는 이것이다.

- Orca의 승인 = GitHub PR 리뷰 액션, 개발자 본인이, IDE 안에서
- Sprintable의 Gate = 전이를 **막는** 감사된 상태기계(`pending → approved | rejected`), 에이전트 자기 승인 불가, PR뿐 아니라 모든 consequential 결정에 적용

32.9k 커뮤니티가 보는 페이지다. 부정확한 한 줄이 전체 신뢰를 무너뜨린다. **Orca의 기능을 축소 서술하지 않고, 축이 다르다는 점만 말한다.**

### 연결은 신규 개발 0

Orca는 Claude Code · Codex 등 표준 에이전트 CLI를 구동하고, 이들은 표준 MCP 설정을 읽는다. Sprintable MCP를 그 설정에 추가하면 **Orca 워크트리 안의 에이전트가 스토리를 claim하고 게이트에 걸린다.** 커넥터를 새로 만들 필요가 없다.

`connectors/`에 9종 어댑터가 이미 있으나(codex · cursor · gemini · grok · hermes · openclaw · opencode · pi) **Orca 전용 커넥터는 불필요하다** — Orca는 런타임이 아니라 런타임을 담는 그릇이다.

---

## 작업 계획

### Phase 0 — 사실오류 수정 (카피만, 단독 배포 가능)

- `messages/{en,ko}.json`
  - `hero.command` → `docker compose up -d --build`
  - `hero.commandHint` → clone 후 로컬 실행이라는 사실대로, Quick Start 앵커 유도
  - `finalCta.desc` → "한 줄" 삭제, Docker 셀프호스트로 정정
  - `pricing.plans[0].features` → `MCP 서버 액세스 (95개 도구)`
  - `hero.stats.stat1` → `Open Source` → `AGPL-3.0`
  - `pricing.startFree` → "셀프호스트 시작"
  - `metadata` · `footer.desc` → delivery ledger 포지셔닝 반영
- `public/llms.txt` → `89 tools` → `95 tools`

### Phase 1 — Hero 재작성 (새 훅 + CTA 분리)

`app/components/sections/hero-section.tsx` · `messages/{en,ko}.json`

```
에이전트 하나는 Linear로도 됩니다.
셋이 같은 레포를 건드리면 —
어떤 "done"을 믿을 수 있습니까?

[Quick Start]  [GitHub에서 보기]
$ docker compose up -d --build
```

- EN: `One agent is fine on Linear.\nWhen three touch the same repo —\nwhich <g>"done"</g> can you trust?`
- 강조어는 **`"done"`** — 기존 `t.rich("hero.headline", { g: ... })` 기법 그대로. 라틴 단어라 KO에서도 Instrument Serif italic이 받고 Noto Serif KR 폴백 분기를 안 타서 오히려 깔끔하다
- **Orca 사용자에게도 이 훅이 유효하다** — Orca는 "GitHub & Linear Native"를 제공하므로 Orca 사용자는 대개 Linear를 이미 루프에 갖고 있다. 발판이 겹친다
- CTA 위계: Primary = **Quick Start**(`#quickstart`) / Secondary = GitHub / 3순위 = 관리형 얼리 액세스 텍스트 링크
- **`VerifiedSealCard`는 그대로 유지 — 신규 컴포넌트 없음.** claim/gate/verified 행이 순환하는 양식화된 작은 카드라 실 스크린샷을 사칭하지 않는다는 원칙에 이미 맞다. 헤드라인 옆의 즉시 눈에 띄는 축약 미리보기 역할 — 아래 대형 리플레이(더 상세한 증거)로 이어지는 점진적 공개(progressive disclosure) 구조
- **대형 대시보드 스크린샷(`dashboardShot`)을 "스크립트 리플레이"로 교체한다** — 단순 이미지 교체가 아니라 신규 컴포넌트다. 상세는 아래 "Hero 인터랙티브 리플레이" 참고
- Aurora orb · Guilloche 등 나머지 시각 시스템은 건드리지 않는다

**Hero 인터랙티브 리플레이 — Orca 메커니즘을 실제 소스 기반 DOM 재현으로 이식**

onorca.dev를 `claude-in-chrome`으로 직접 열어 6장 연속 캡처하며 실제 동작을 확인했다 — 정적 워크스루가 아니라, 여러 장면이 자동 롤링되고 그중 한 장면(임베디드 체크아웃 미리보기)에서 **호버 툴팁 → 클릭 선택(포커스 링 + 배너 문구 전환) → 입력창 타이핑**이 스크립트로 재생된다. 이게 가능한 이유는 Orca가 UI를 실제 동작하는 컴포넌트로 재구현해뒀기 때문이다.

**결정**: 실캡처 스크린샷 위에 커서를 얹는 방식(오버레이)이 아니라, Orca와 같은 메커니즘 — **실제 소스의 구조·클래스·i18n 카피를 그대로 이식한 DOM 재현** — 을 쓴다. 완전 창작이 아니라 아래 두 파일을 실제로 읽고 그대로 옮기는 이식이라 드리프트 위험이 낮고, 로그인·캡처 세션 없이 지금 바로 만들 수 있다.

- `apps/web/src/components/cage/gate-signature-approval.tsx` (180줄, 전문 확인) — 근거 열람 체크박스(`sigEvidenceViewedLabel`) + 사유 textarea(`sigReasonLabel`/`sigReasonPlaceholder`) + 반려(`sigRequestChanges`)/승인(`sigApproveAndSign`) 버튼. `canSign = evidenceViewed && reason.trim().length>0 && !resolving`
- `apps/web/src/components/cage/gate-evidence.tsx` (전문 확인) — `GateSignatureApproval`이 상단에 직접 렌더하는 실제 증거 표시. **README 서사(diff·리뷰 코멘트)와 다르다** — 실제 필드는 결정 배지(`auto_merge`/`ask_human`/`block`, 각각 Check/Pause/Ban 아이콘) + CI 통과·실패(`CheckCircle`/`XCircle`) + 신뢰도 %(`TrustValue`) + PR 칩. 리뷰 코멘트 스레드는 이 컴포넌트에 없다("리뷰 증거는 gate 응답에 미노출이라 v1 제외" — 코드 주석) → Hero 스크립트를 실제 필드에 맞춰 재설계

신규 클라이언트 컴포넌트 `app/components/ui/gate-approval-demo.tsx` — 두 실제 컴포넌트의 구조를 랜딩 디자인 토큰(OKLCH 색상, `card-lift`, 기존 라운드·타이포)으로 이식하고 스크립트 상태 머신을 얹는다. **Phase 3 탭 ①에서도 이 컴포넌트를 그대로 재사용**(정적 재생 없이 최종 상태로 렌더 — 아래 참고).

확정된 타임라인 (실제 필드 기준, 4단계):

| 시점 | 동작 | 렌더 상태 |
| --- | --- | --- |
| 0s | 초기 상태 | 결정 배지 "확인 필요"(ask_human/Pause) + CI 통과(CheckCircle) + 신뢰도 82% — `GateEvidence`의 실제 State C(납품\|판단 2열) 레이아웃 |
| 1.5s | 커서가 CI·신뢰도 라인으로 이동, 호버 | 살짝 강조(밑줄/배경) — 이 사실들을 "확인 중"이라는 시각적 신호 |
| 3.0s | 클릭 애니메이션 | `☐` → `☑` "근거 확인함"(`sigEvidenceViewedLabel`) 체크 토글 |
| 4.5s | 커서가 사유란으로 이동 | textarea에 사유 타이핑(CommandChip과 같은 폰트) — 정확한 문구는 구현 시 확정, README SPR-142 톤 유지 |
| 6.5s | 커서가 버튼으로 이동 | `sigApproveAndSign` 버튼 글로우 → 전체가 Verified 배지로 크로스페이드, 최종 상태에서 정지(반복 재생 안 함) |

- **커서 디자인**: 작은 글로우 도트, 시그니처 블루(`oklch(48% 0.17 260)`) — 화살표 아이콘이 아니라 브랜드 톤에 맞는 추상 점. 실제 DOM 엘리먼트 기준으로 좌표를 잡으므로 반응형에서도 깨지지 않는다(스크린샷 오버레이 방식의 좌표 고정 문제가 없어짐)
- **`prefers-reduced-motion`**: 시퀀스 재생 없이 최종 상태(체크됨·사유 텍스트 표시됨·Verified 배지)로 바로 렌더 — 기존 `globals.css` 리듀스모션 정책과 동일
- **정직성 표기**: 이 데모는 스크린샷이 아니라 재현이므로, `BrowserChrome` 같은 "이게 실제 캡처"라는 신호를 주는 장식을 두르지 않는다 — `VerifiedSealCard`와 같은 급의 "양식화된 컴포넌트"로 명확히 분리되어 보이게 한다

### Phase 2 — Quick Start 블록

Hero 직후. 신규 `app/components/ui/code-block.tsx` 필요 — 기존 `CommandChip`은 `command: string` 단일행 `inline-flex`라 3단계를 담을 수 없다. CommandChip의 ink 다크 토큰(`oklch(22% 0.025 265)`)을 재사용한 멀티라인 + 복사 버전.

`git clone` → `cp .env.example .env` → `docker compose up -d --build` → `http://localhost:3108`. 요구사항 Docker Desktop 4.x+.

### Phase 3 — 기능 시나리오 섹션 (Gate Walkthrough, 3-tab)

신규 `app/components/sections/gate-walkthrough-section.tsx`, **Trust 섹션 직후**. Hero가 축약판이라면 이 섹션이 전체판 — **3개 시나리오를 탭으로 전환**하며, 지어낸 터미널 시퀀스가 아니라 **실제 운영 중인 소스(`/Users/moonklabs/workspace-moonklabs/sprintable`)에 기반**한다 — 탭 ①은 실제 소스 구조를 이식한 DOM 재현(`gate-approval-demo.tsx`), 탭 ②·③은 실행 중인 서비스를 캡처한 화면이다.

**구조**: 서버 컴포넌트 셸(제목·설명) + 신규 클라이언트 컴포넌트 `app/components/ui/scenario-tabs.tsx`(`'use client'`, `useState`로 3개 패널 전환, ARIA `tablist`/`tab`/`tabpanel` 패턴, 화살표 키 이동). 탭 ①은 `gate-approval-demo.tsx`(정적 최종 상태), 탭 ②·③은 `BrowserChrome`(기존 `app/[locale]/page.tsx:15`에서 추출) + `next/image`로 실 캡처 스크린샷을 담는다 — 기존 "Proof" 섹션과 같은 패턴이라 신규 시각 언어를 만들 필요가 없다.

**실 캡처 계획 (구현 착수 시 최우선 선행 작업)**

로그인이 필요한 실제 서비스(`app.sprintable.ai`)라 자격증명은 사용자가 직접 입력한다 — 사용자가 로그인 후 브라우저 탭을 넘겨주면 `claude-in-chrome`으로 다음 화면을 찾아 캡처한다.

**탭 ①(Gate 승인/반려)은 이 표에서 빠진다** — Hero용으로 만드는 `gate-approval-demo.tsx`(실제 소스 기반 DOM 재현, 위 "Hero 인터랙티브 리플레이" 참고)를 정적 최종 상태로 재사용한다. 로그인·캡처 세션이 필요 없다.

| 탭 | 캡처 대상 | 확인된 실제 경로/컴포넌트 |
| --- | --- | --- |
| ② Cross-vendor 리뷰 | 서로 다른 벤더 에이전트(또는 에이전트+사람)가 같은 스레드에서 주고받는 채팅 | `apps/web/src/components/chat/embed-card.tsx` 계열 채팅 뷰 |
| ③ 감사 로그 | Gate 관련 이벤트가 보이는 활동 로그 필터 상태 | 기존 `public/screenshots/05-activity-log.png`와 동일 화면(랜딩 자체 자산, 조직 다름) — 이번엔 같은 화면을 **현재 조직**에서 다시 캡처 |

→ 실 캡처 세션이 필요한 대상이 **3개에서 2개로 줄었다.**

**클린 데이터가 없을 경우의 원칙**: `docs/screenshots`의 기존 5장은 내부 dogfooding 데이터(테스트 카드 `[TEST] control test delete me`, 내부 PR 코드네임)가 그대로 노출돼 있어 이번 라운드에서 재사용하지 않기로 했다 — 같은 기준을 새 캡처에도 적용한다. 캡처 시점에 결재 대기 중인 Gate·정리된 리뷰 스레드가 조직에 없으면:
1. 먼저 기존 데이터 중 내부 정보 노출이 없는 예시를 찾는다
2. 없으면 **사용자에게 먼저 확인** 후 데모용 스토리를 하나 만들어 흐름을 재현한다 — 실 프로덕션 데이터에 쓰기 작업을 하는 것이므로 에이전트가 임의로 하지 않는다
3. 캡처 후에도 내부 코드네임·PR 번호·실명이 노출되면 배포 전 크롭/블러 처리한다

**공통 사항**
- 탭 ①은 `gate-approval-demo.tsx`를 **정적 최종 상태**(체크됨·사유 표시·Verified)로 렌더 — Hero에서는 재생되고 여기서는 결과만 보여줘 중복을 피한다
- 탭 ②·③은 실캡처 정적 이미지 — 탭 전환 자체는 클라이언트 컴포넌트가 필요하지만 무거운 상태·애니메이션 라이브러리는 불필요
- **이 섹션이 `/orca` 페이지에서도 재사용된다** → props로 카피를 받도록 설계한다(Phase 7 참고, 탭 ①(`gate-approval-demo.tsx`)만 재사용 예정)
- 모바일 시나리오는 앱 소스가 이 워크스페이스에 없어 이번 범위에서 제외 — 확보되면 탭 ④로 추가

### Phase 4 — Compatibility 섹션

신규 `app/components/sections/compatibility-section.tsx`, How it works 직후.

- **지원 런타임 9종** (`README.md:126` 검증된 목록만): Claude Code, Codex, Cursor, Gemini, Grok, Hermes, OpenClaw, OpenCode, Pi
- **에이전트 연결 2경로**: 로컬 stdio(`uvx sprintable`) / 호스티드 Streamable HTTP(`mcp.sprintable.ai/mcp`, per-connection bearer)
- **Orca 진입 블록** — "Orca·터미널 래퍼에서 돌리는 에이전트를 그대로 연결" + `/orca` 상세 페이지 링크. 여기가 메인 페이지의 Orca 유입구다
- **기존 도구 MCP 연결** — `apps/web/src/components/settings/mcp-connection-settings.tsx:15`의 실재 기능: `provider: 'github' | 'linear' | 'jira'`, tool catalog 검증 + allowlist. Hero가 Linear를 발판으로 썼으니 여기서 **"쓰던 Linear/Jira도 연결된다"** 로 회수해 대립 구도를 완화한다
- 95개 도구 카테고리 표 (`README.md:407-419`)
- 기술 스택: FastAPI · PostgreSQL · Next.js · SSE EventBus
- Orca식 로고 그리드는 쓰지 않는다 — 사용권이 없고 텍스트 칩으로 충분

### Phase 5 — Comparison + FAQ

**Comparison** — 신규 `comparison-section.tsx`, Customers 직후. 위 `README.ko.md:21` 4-way 표.
4열 × 6행이라 **390px에서 표로 성립하지 않는다** → `overflow-x-auto` 컨테이너 + `min-width` + 스크롤 어포던스. 페이지 본문은 절대 가로 스크롤되지 않아야 한다.

**FAQ** — 신규 `faq-section.tsx`, Pricing 직후. 네이티브 `<details>`/`<summary>` — 클라이언트 JS 0, 접근성 기본 제공, `DESIGN.md`의 "서버 렌더 콘텐츠 보존" 제약과 일치.

1. Linear / Jira와 무엇이 다른가
2. **Orca·터미널 래퍼를 이미 쓰는데 왜 필요한가** (→ 축이 다름, 부착 가능)
3. 승인 Gate가 속도를 늦추지 않는가 (→ 증거 있는 `in-review→done`만 막힌다)
4. 누가 승인자가 되는가
5. 셀프호스트 시 데이터는 어디 저장되는가 (→ 본인 PostgreSQL)
6. 기존 Claude Code / Codex를 교체해야 하는가 (→ 아니오, BYOA)
7. Free와 Team의 차이
8. Team `$49` 과금 단위 — **미결정**
9. 요구사항 (→ Docker Desktop 4.x+)
10. AGPL-3.0이면 사내에서 써도 되는가
11. 폰에서도 승인할 수 있는가 (→ 알림 탭 → 웹 승인 화면. 텍스트로만 답변, 별도 시각 자료 없음 — §검증된 사실오류 4번 참고)

### Phase 6 — 로드맵 밴드 + CTA 목적별 분리

**로드맵 밴드** — Final CTA 직전.

| 항목 | 표기 |
| --- | --- |
| iOS TestFlight · Android 베타 (알림 → 승인 포함) | 실링크 — 지금 받을 수 있다 |
| 관리형 호스팅 | 얼리 액세스 |
| 데스크톱 앱 | **표기하지 않는다** |

앱 내 Gate 승인은 "곧 제공" 배지를 달지 않는다 — 오늘 실제로 되는 기능이기 때문이다(§검증된 사실오류 4번). 다만 시각 데모는 없으므로 로드맵 밴드에는 텍스트로만 언급하고 자리를 차지하지 않는다.

- `app/[locale]/page.tsx` — Pricing: Free → 셀프호스트 시작 / Team·Pro → 얼리 액세스
- `app/components/sections/final-cta-section.tsx` — 트리플 CTA: 셀프호스트(지금) / 앱(TestFlight·Android 베타, 지금) / 관리형 얼리 액세스
- `app/components/nav-links.tsx` — `#compatibility`, `#faq` 추가 (현재 3개라 여유)
- `app/lib/tracking.ts` — `CtaClickParams.destination`에 `quickstart` · `orca_page` · `app_beta` 추가(현재 `landing|signup|docs|github_repo`)

### Phase 7 — `/orca` 전용 페이지

신규 `app/[locale]/orca/page.tsx`. `localePrefix: "always"`이므로 `/en/orca` · `/ko/orca`로 나온다. `next.config.ts`의 `APP_PATHS`에 `/orca`가 없어 **리다이렉트 충돌 없음**(확인 완료).

구성:

1. **훅** — Orca 자체 약속을 인용해 되묻는다
   > 5개 워크트리를 병렬로 돌렸습니다. 5개 브랜치가 전부 "done"이라고 합니다.
   > 어느 걸 먼저 머지합니까?
2. **축이 다르다** — Orca=실행 / Sprintable=판정 다이어그램. Orca를 축소 서술하지 않는다
3. **연결 방법** — MCP 설정 블록(`code-block.tsx` 재사용). 신규 개발 0이라는 점 강조
4. **무엇이 바뀌는가** — `gate-approval-demo.tsx`(Hero·Phase 3 탭 ①과 동일 컴포넌트) 재사용, 카피만 Orca 맥락으로
5. **"Orca를 계속 쓰십시오"** 명시 — 대체 의도가 없다는 것을 페이지에 박아둔다. 신뢰의 핵심
6. **CTA** — Quick Start + GitHub

부수 작업:
- `app/sitemap.ts` — 현재 로케일 루트만 나열한다. `/orca`를 `alternates.languages`와 함께 추가
- `messages/{en,ko}.json`에 `orca.*` 네임스페이스 신설
- 메타데이터(title/description) — 검색 유입이 목적이므로 별도 작성

### 재사용할 기존 자산

`ScrollReveal` · `Parallax` · `CommandChip`(단일행 유지, ink 다크 토큰은 `gate-approval-demo.tsx`에도 재사용) · `VerifiedSealCard`(Hero 축약 미리보기) · `globals.css`의 `card-lift`/`corner-ticks`/`rule-ticks`/`eyebrow-lead`/`eyebrow-cross`/`btn-glow`. 새 토큰 레이어를 만들지 않는다(`DESIGN.md` 제약). `BrowserChrome`는 `app/[locale]/page.tsx:15` 로컬 함수 — Phase 3 탭 ②·③·`/orca`에서 쓰므로 `app/components/ui/`로 추출. 기존 `public/screenshots/05-activity-log.png`·`docs/screenshots/*`는 내부 데이터 노출 문제로 **재사용하지 않는다** — Phase 3 탭 ③은 새 캡처로 대체.

**실제 소스 이식 대상**: `apps/web/src/components/cage/gate-signature-approval.tsx` · `apps/web/src/components/cage/gate-evidence.tsx`(둘 다 전문 확인 완료) — `gate-approval-demo.tsx`가 이 두 컴포넌트의 구조·클래스·i18n 카피 키(`sigEvidenceLabel`·`sigReasonLabel`·`sigApproveAndSign` 등)를 랜딩 토큰으로 옮겨 짓는다.

### 신규 컴포넌트 목록 (전체)

`code-block.tsx`(Phase 2·7) · `gate-approval-demo.tsx`(Hero + Phase 3 탭 ① 공유, 실제 소스 이식) · `scenario-tabs.tsx`(Phase 3, 클라이언트, 3패널) · `gate-walkthrough-section.tsx` · `compatibility-section.tsx` · `comparison-section.tsx` · `faq-section.tsx`. 신규 라이브러리 의존성은 없다 — 전부 기존 스택(React `useState`, Tailwind, `next-intl`, `next/image`)으로 만든다.

---

## 하지 않을 것

- **Orca 기능을 축소·부정확하게 서술** — 특히 "Orca엔 승인이 없다"는 거짓이다(GitHub PR 승인 있음). 축이 다르다는 것만 말한다
- **Orca 대체·이주 유도 프레임** — 기능 경쟁에서 이길 수 없고, 부착이 더 큰 시장이다
- **모바일 Gate 승인을 "네이티브 전용 UI"처럼 표현** — 실제로는 알림 → 웹뷰 승인 화면 경로다. FAQ에서 정확히 그렇게 쓴다
- **근거 없이 지어낸 UI를 만들기** — `gate-approval-demo.tsx`는 예외가 아니라 이 원칙의 적용이다: 상상이 아니라 실제 컴포넌트 파일을 읽고 이식한 것이라 근거가 있다. **모바일은 이 근거(실제 앱 소스)가 없어서 이번 라운드에서 제외한 것** — 소스 없이 "그럴듯하게" 만들지 않는다는 기준은 동일하게 유지된다
- **`docs/screenshots`의 기존 내부 데이터를 그대로 배포** — 테스트 카드·내부 코드네임 노출. Phase 3 탭 ③은 반드시 새로 캡처한다
- **사용자 승인 없이 실 프로덕션에 데모 데이터 생성** — 캡처용 스토리가 필요하면 먼저 사용자에게 확인한다
- **데스크톱 앱 언급** — 존재하지 않는다
- "Linear에 붙이는 제품"이라는 문자적 표현 — Sprintable은 자체 칸반·에픽·스프린트를 가진 대체품이다. Linear는 **발판**으로만
- 근거 없는 `10x` / `100x`, 미확인 회사 로고
- **GitHub 스타 수** — 현재 10개. Orca 32.9k와 나란히 놓이는 순간 역효과
- 후기 섹션 — 공개 가능한 실제 후기 없음
- 전체 IA 재구성

---

## 미결정 — 확정 필요

- **Phase 3 실 캡처 세션 일정** — `app.sprintable.ai` 로그인 후 탭을 넘겨주는 시점. 탭 ②·③ 2개만 필요(탭 ①은 `gate-approval-demo.tsx`로 대체돼 로그인 불필요, §Phase 3 실 캡처 계획)
- **캡처 시점에 클린한 예시가 조직에 없을 경우 데모 데이터 생성 여부** — 발생하면 그때 확인
- **Hero `gate-approval-demo.tsx`의 정확한 사유 문구** — README SPR-142 톤을 유지하되 실제 `gate-evidence.tsx`의 필드(결정 배지·CI·신뢰도)에 맞춰 구현 시 확정
- **모바일 앱 소스 위치** — 확보되면 탭 ④로 추가 검토
- **Team `$49` 과금 단위** (사용자당/팀당) — FAQ 7·8번
- **관리형 호스팅 출시 시점** — 로드맵 밴드
- TestFlight · Android 베타의 **공개 링크 URL**
- 얼리 액세스 신청 후 연락 시점·제공 내용 — `DESIGN.md` 미해결 항목과 동일

---

## 검증

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm dev
```

브라우저 확인 (`claude-in-chrome`):

1. `/ko`·`/en` 양쪽 — 신규 섹션 5개 + `/orca`가 두 로케일 모두 렌더되는지 (`messages/*.json` 키 누락은 next-intl 런타임 에러)
2. **1280px과 390px** — `DESIGN.md:79` 모바일 기준선. Comparison 표와 Gate 시퀀스가 **자체 컨테이너 안에서만** 가로 스크롤되고 본문은 안 밀리는지
3. 새 Hero 헤드라인 — KO/EN 각각 `"done"` 강조어의 세리프·브러시 밑줄, 3줄이 390px에서 넘치지 않는지
4. `hero.command` 칩 복사 → 붙여넣기 실제 문자열 확인
5. **Quick Start 명령 실전 검증** — 깨끗한 디렉터리에서 clone → `docker compose up -d --build` → `localhost:3108` 도달. 이번 개편의 존재 이유가 정확성이므로 반드시 직접 실행한다
6. `/en/orca` · `/ko/orca` 라우팅 — `APP_PATHS` 리다이렉트에 안 걸리는지 실제 확인. `sitemap.xml`에 `/orca`가 `alternates`와 함께 나오는지
7. **Orca 서술 정확성 최종 검토** — 페이지의 Orca 관련 모든 문장을 onorca.dev 현재 카피와 1:1 대조. 부정확한 축소 서술 0건
8. **Phase 3 시나리오 탭** — `scenario-tabs.tsx`의 키보드 동작(화살표 키로 탭 이동, Tab으로 패널 진입), 스크린리더가 `tablist`/`tab`/`tabpanel` role을 올바르게 읽는지. **탭 ②·③ 캡처 2장**에서 내부 코드네임·PR 번호·실명·이메일이 노출되지 않는지 배포 직전 육안 재확인(§Phase 3 실 캡처 계획 3번)
9. **`gate-approval-demo.tsx` 리플레이** — Hero에서 4단계 타임라인이 의도한 순서·타이밍으로 재생되는지, `prefers-reduced-motion`에서 최종 상태로 즉시 렌더되는지, Phase 3 탭 ①에서는 정적 최종 상태만 보이는지(재생 안 됨)
10. `<details>` FAQ — 키보드 접근, `prefers-reduced-motion`
11. 콘솔 에러 0 · 신규 앵커 점프 (`overflow-x-clip` 유지 확인)
12. `pnpm exec next build` — Cloudflare Pages 배포 전

`app/lib/waitlist.test.ts`가 유일한 테스트이고 CTA 소스 문자열을 바꾸지 않으므로 영향 없음. `tracking.ts`의 `destination` 유니온 확장은 타입 체크로 커버된다.

## 완료 후 문서 갱신

- `DESIGN.md` — 정보 구조에 신규 5섹션 + `/orca` 라우트 반영, Hero 포지셔닝을 새 훅으로, CTA 상태를 "전부 Waitlist"에서 "목적별 분리"로. `Core routes/screens`에 `/orca` 추가
- `docs/plans/2026-07-30-developer-landing-content-analysis.md` — §9 미결정 중 검증된 항목(OSS 실행 가능 여부, 지원 에이전트 목록, Gate 화면 확보 방식, 앱 존재 여부) 해소 표시
