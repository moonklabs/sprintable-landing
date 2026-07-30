# Sprintable 개발자 랜딩페이지 콘텐츠 구조 분석

- 작성일: 2026-07-30
- 대상: Sprintable 랜딩페이지
- 레퍼런스: [Orca](https://www.onorca.dev/)
- 목적: 개발자 대상 랜딩페이지의 메시지 구조, 제품 증거, 전환 흐름을 점검하고 향후 개선 우선순위를 정의한다.

## 1. 핵심 결론

Sprintable은 `Claimed → Gate → Verified`라는 명확한 차별화 메시지를 이미 갖고 있다. 현재 가장 큰 문제는 포지셔닝이 아니라 다음 세 가지다.

1. 제품을 지금 실행할 수 있는지, 얼리 액세스만 가능한지 CTA가 명확하지 않다.
2. 핵심 차별점인 Review, Gate, Evidence, Human Signature를 보여주는 실제 제품 화면이 부족하다.
3. GitHub, 문서, 호환성, 기술 사양, 비교표, FAQ 등 개발자가 도입을 판단할 근거가 부족하다.

따라서 Orca의 시각 디자인을 복제하기보다 다음 논증 구조를 적용하는 것이 적합하다.

> 결과 → 실제 개발 워크플로우 → 기술적 증거 → 사회적 증거 → 도입

---

## 2. 현재 Sprintable 콘텐츠 구조

현재 랜딩페이지는 다음 순서로 구성되어 있다.

| 순서 | 섹션 | 역할 |
| --- | --- | --- |
| 1 | Hero | `AI가 했다는 것과 검증된 것은 다르다`는 핵심 차별점 전달 |
| 2 | Trust | 증거 확인 → 승인/반려 → 사람 서명 |
| 3 | How it works | 스토리 → 에이전트 → Gate → Verified |
| 4 | Proof | 실제 UI 스크린샷 3개 |
| 5 | Customers | 개발팀, 프로덕트팀, 창업자 겸 오퍼레이터 |
| 6 | Model | BYOA와 관리형 호스팅 |
| 7 | Pricing | Free, Team, Pro |
| 8 | Final CTA | 얼리 액세스, 설치 명령, 문서 |
| 9 | Footer | GitHub, 문서, 변경 로그 등 |

### 관련 구현 근거

- `app/[locale]/page.tsx:145-154` — Hero, Trust, How it works, Proof 순서
- `app/[locale]/page.tsx:243-607` — Customers, Model, Pricing, Final CTA 순서
- `app/components/sections/hero-section.tsx:202-261` — Waitlist, GitHub, 설치 명령, Verified Seal
- `app/components/sections/trust-section.tsx:117-186` — Evidence, Gate, Human Signature 흐름
- `app/components/sections/how-it-works-section.tsx:34-102` — 4단계 검증 루프

---

## 3. 현재 구조의 강점

### 3.1 차별화된 핵심 메시지

Hero는 AI가 완료했다고 주장하는 작업과 사람이 검증한 결과를 구분한다.

> AI가 했다는 것과 검증된 것은 다릅니다.

승인 Gate와 Review가 `Claimed`를 `Verified`로 바꾼다는 메시지는 일반적인 AI 생산성 도구와 명확히 구분된다.

### 3.2 구체적인 검증 메커니즘

단순히 “신뢰할 수 있는 AI”라고 말하지 않고 다음 과정을 설명한다.

1. diff, 테스트 결과, 로그 확인
2. 승인 또는 반려
3. 사람 서명 기록
4. Verified 결과 저장

### 3.3 이해하기 쉬운 작업 흐름

`스토리 등록 → 에이전트 실행 → Gate 승인 → Verified 기록`이라는 4단계 구조가 제품의 작동 원리를 빠르게 전달한다.

### 3.4 오픈소스에서 관리형으로 이어지는 모델

BYOA와 셀프호스트로 시작하고 필요할 때 관리형 호스팅과 SLA로 전환하는 사업 구조가 존재한다.

### 3.5 개발자 친화적인 초기 요소

- GitHub CTA
- 복사 가능한 `uvx sprintable` 명령
- MCP Native, Programmatic, Self-hostable 표시
- 실제 제품 스크린샷

기본 재료는 이미 마련되어 있으며, 앞으로는 이 요소들의 신뢰도와 구체성을 강화해야 한다.

---

## 4. Orca 랜딩페이지에서 참고할 구조

Orca는 제품을 다음 순서로 설득한다.

1. GitHub 스타와 YC 배킹
2. 결과 중심 Hero
3. 다운로드와 GitHub 즉시 CTA
4. 개발 환경 전체를 보여주는 대형 제품 데모
5. 사용자 회사 로고
6. 개발 루프 설명
7. 지원 에이전트와 구독 호환성
8. ADE라는 제품 카테고리 정의
9. 상세 기능 갤러리
10. 실제 사용자 후기
11. 경쟁 제품 비교표
12. FAQ
13. 최종 설치 CTA

### 참고할 핵심 원칙

- 기능 설명 전에 실제 워크플로우를 보여준다.
- 브랜치, 파일 경로, 코드 변경, 테스트, 터미널 로그처럼 개발자가 신뢰하는 오브젝트를 사용한다.
- 지원 도구와 호환성을 구체적으로 나열한다.
- 스크린샷을 장식이 아닌 제품 증거로 사용한다.
- 후기, 비교표, FAQ로 도입 반론을 해소한다.
- 개발자가 바로 실행하거나 저장소를 확인할 수 있도록 한다.

### 그대로 복제하지 않을 요소

- 근거 없는 `10x`, `100x` 생산성 표현
- 실제 사용 관계가 확인되지 않은 회사 로고
- 검증되지 않은 숫자와 성과 지표
- Sprintable의 핵심 메시지를 가리는 과도한 기능 나열

---

## 5. 주요 문제와 개선 방향

### 5.1 제품 상태와 CTA 불일치

현재 페이지는 `uvx sprintable`로 한 줄 셀프호스트가 가능하다고 말하지만, 주요 CTA와 모든 요금제 CTA는 얼리 액세스 신청으로 연결된다.

개발자는 다음 중 어느 상태인지 판단하기 어렵다.

- 지금 바로 셀프호스트할 수 있는 제품
- 아직 사용할 수 없는 비공개 베타
- 오픈소스는 사용 가능하지만 관리형 서비스만 얼리 액세스인 제품

#### 필요한 결정

| 제품 상태 | Primary CTA | Secondary CTA |
| --- | --- | --- |
| 셀프호스트 사용 가능 | 설치하기 / Quick Start | GitHub |
| 제품 전체 비공개 | 얼리 액세스 신청 | 제품 화면 보기 |
| OSS 공개, 관리형 비공개 | 셀프호스트 시작 | 관리형 얼리 액세스 |

가장 먼저 제품 상태를 확정하고 Hero, Pricing, Final CTA를 동일한 기준으로 정리해야 한다.

### 5.2 Proof가 핵심 차별점을 증명하지 못함

현재 Proof 섹션의 화면은 조직 브리핑, 보드, 현황판이다. 이 화면들은 제품이 존재한다는 사실은 보여주지만 Sprintable을 선택해야 하는 이유까지 증명하지는 못한다.

우선 확보해야 할 실제 화면은 다음과 같다.

1. 에이전트가 제출한 diff
2. 테스트 및 로그 증거
3. 승인 대기 상태
4. 승인과 반려 컨트롤
5. 승인자와 사람 서명
6. Verified 기록 및 감사 로그

Gate/Review 화면을 Hero의 대형 비주얼 또는 Hero 직후 첫 번째 Proof로 배치하는 것이 적합하다.

### 5.3 기술적 도입 정보 부족

현재 Hero에는 기술 키워드가 있지만 실제 도입을 판단할 정보가 부족하다.

향후 Compatibility 또는 Technical Overview 섹션에서 다음을 제공해야 한다.

- 공식 지원 코딩 에이전트
- MCP 연결 과정
- 설치 요구사항
- 로컬과 클라우드에서 실행되는 구성 요소
- GitHub/GitLab 연결 범위
- 데이터 저장 위치
- 인증과 권한 구조
- 최소 실행 예시

지원 여부가 확인되지 않은 제품과 기능은 나열하지 않는다.

### 5.4 OSS 및 사회적 증거 부족

현재 GitHub는 텍스트 링크로만 제공된다. 향후 실제 데이터가 확보되면 다음 신뢰 신호를 추가한다.

- GitHub 스타 수
- 최근 릴리스와 Changelog
- 기여자 수
- 실제 사용자 후기
- 실제 팀의 사용 사례
- 공개 로드맵 또는 커뮤니티

초기에는 과장된 숫자보다 최근 릴리스, 실제 PR, 공개 이슈, 설치 명령을 보여주는 편이 더 신뢰할 수 있다.

### 5.5 도입 반론 해소 부족

현재 페이지는 다음 질문에 답하지 않는다.

- Jira 또는 Linear와 무엇이 다른가?
- 일반 AI Kanban과 무엇이 다른가?
- 승인 Gate가 개발 속도를 늦추지 않는가?
- 누가 승인자가 되는가?
- 셀프호스트 시 데이터는 어디에 저장되는가?
- 기존 Claude Code나 Codex를 교체해야 하는가?
- Free와 Team의 차이는 무엇인가?
- Team `$49`는 사용자당인가, 팀당인가?

Comparison과 FAQ 섹션을 통해 이 질문에 직접 답해야 한다.

---

## 6. 권장 콘텐츠 구조

```text
1. Header
   GitHub Star · Docs · Changelog · 실행/얼리 액세스

2. Hero
   차별화 헤드라인
   한 문장 설명
   Primary CTA + GitHub
   실제 Review Queue / Gate UI

3. Developer Workflow Demo
   PR · diff · tests · logs · approval · signature

4. Claimed → Verified
   왜 검증이 필요한지
   무엇을 어떻게 검증하는지

5. How It Works
   Story → Agent → Gate → Verified

6. Integrations / Compatibility
   지원 에이전트 · MCP · SCM · 실행 환경

7. Feature Deep Dives
   Review · Gate · Audit Record · Team Board

8. Open-source Proof
   GitHub · 설치 · Changelog · 사용자 사례

9. Comparison
   일반 PM 도구 · 에이전트 오케스트레이터 · Sprintable

10. Deployment & Pricing
    Self-host · Managed · Compliance

11. FAQ
    보안 · 데이터 · 호환성 · 도입

12. Final CTA
    지금 실행 또는 관리형 얼리 액세스
```

---

## 7. 실행 우선순위

### P0 — 제품과 메시지 기준 확정

1. 현재 제품 상태와 Primary CTA 확정
2. 핵심 타깃을 개발팀 중심으로 구체화
3. 실제 지원 에이전트와 통합 범위 확인
4. Team `$49` 과금 단위 확정
5. 공개 가능한 Gate/Review 실제 화면 확보

### P1 — 콘텐츠 개편

1. Hero 대형 비주얼을 Gate/Review 화면으로 교체
2. 실행 가능한 Quick Start 추가
3. Compatibility 섹션 추가
4. GitHub, Release, Changelog 신뢰 신호 추가
5. Comparison과 FAQ 작성

### P2 — 전환 구조 개선

1. 모든 버튼을 Waitlist로 보내지 않고 목적별로 분리
2. Docs, GitHub, Self-host, Managed Early Access 경로 제공
3. 얼리 액세스 신청 후 제공 내용과 연락 시점 명시
4. CTA별 전환 이벤트 측정

### P3 — 사용자 검증

1. 개발자 5명을 대상으로 첫 화면 5초 테스트
2. 제품이 무엇인지 이해하는지 확인
3. 지금 사용할 수 있는지 이해하는지 확인
4. Hero CTA와 GitHub/Docs 이동률 측정
5. 모바일 및 한국어/영어 메시지 위계 검증

---

## 8. 완료 기준

개편된 랜딩페이지는 방문자가 첫 화면에서 다음 질문에 답할 수 있어야 한다.

1. Sprintable은 누구를 위한 제품인가?
2. 기존 AI 작업 관리 도구와 무엇이 다른가?
3. 어떤 증거를 어떻게 검증하는가?
4. 내가 사용하는 에이전트 및 개발 환경과 연결되는가?
5. 지금 바로 실행할 수 있는가?
6. 다음 행동은 설치, GitHub 확인, 문서 확인, 얼리 액세스 중 무엇인가?

## 9. 미결정 사항

- 오픈소스 버전의 현재 공개 및 실행 가능 상태
- 관리형 서비스의 출시 단계
- 공식 지원 코딩 에이전트 목록
- Gate/Review 실제 제품 화면 공개 가능 여부
- Team 요금제의 과금 단위
- 공개 가능한 사용자 후기와 도입 사례
- 얼리 액세스 신청 후 연락 시점과 제공 혜택

