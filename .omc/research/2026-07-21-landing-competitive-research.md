# Sprintable 랜딩 경쟁 리서치 보고서

- 일자: 2026-07-21 (소스 페치 기준 2026-07-20)
- 방법: deep-research 워크플로 — 5개 검색 각도 → 22개 소스 페치 → 105개 주장 추출 → 상위 25개 3표 적대적 검증 (24 확정 / 1 반박)
- 맥락: Sprintable = "Linear + Multi-Agent BYOM" 오픈소스 조직 OS. 차별점 후보: 승인 Gate(HITL), 승인 전 쉬운 Review(Claimed vs Verified), Advisor. 현 메시지 "AI의 실행을 조직의 성장으로". 프라이싱 $0/$49/$149.

## 1. 경쟁사 지형 (검증 확정분)

### Paperclip (paperclip.ing) — 사용자가 말한 "페이퍼클립" 확정 [신뢰도 高]
- 히어로: "A team of agents for every person." MIT 오픈소스, 셀프호스트, ~31k GitHub 스타
- 조직도(회사) 메타포 — 에이전트를 CEO/CTO/엔지니어로 "고용". 스프린트/스토리 루프 아님
- BYOA: "Any agent, any runtime, one org chart. If it can receive a heartbeat, it's hired." — Claude, Codex, Gemini, Cursor, Hermes, OpenClaw, Pi, OpenCode
- 승인 게이트 이미 보유: "Agents can't hire new agents without your approval... Pause. Resume. Override. Reassign. Terminate." / "Autonomy is a privilege you grant, not a default"
  - 단, 프레임은 "에이전트만의 회사에 대한 거버넌스" — 혼성팀 검증 표면 아님
- 가격: 완전 $0. 유료 티어·관리형 클라우드 없음 (pricing 페이지 404). 서드파티 호스트(PaperclipCloud)가 관리형 수요 존재를 방증
- 출처: paperclip.ing, github.com/paperclipai/paperclip

### Linear for Agents [신뢰도 高]
- 헤드라인: "Artificial colleagues. Natural collaboration." / "Deploy AI teammates inside Linear"
- 에이전트 = 워크스페이스 정식 멤버 (할당·@멘션·프로젝트 추가). 디렉터리에 26개 서드파티 에이전트 (Cursor, Codex, Copilot, Devin, Factory, Charlie, Sentry, Tembo 등) = 사실상 Linear 안의 BYOA 마켓플레이스
- Accountability 각도 선점: "Delegate issues, but not accountability" — 사람이 primary assignee, 에이전트는 contributor. "Agents act on your behalf, but never in the dark"
- 뉘앙스: 메커니즘은 할당 시맨틱+투명성이지, 사전 승인 Gate가 아님. (Linear가 리뷰/HITL을 완전히 방치했다는 주장은 검증에서 반박됨 — 부분적으로 커버 중)
- 출처: linear.app/agents, linear.app/integrations/agents

### Factory 2.0 (2026-06-15 발표) [신뢰도 高]
- 히어로: "Build Your Software Factory... A self-improving system for your SDLC" (SIGNAL→TRIAGE→CODE GEN→VALIDATE→RELEASE→DOCUMENT→MONITOR)
- 다중 에이전트 "Missions"(수시간~수일) + "Automations", 조직 전체 생산성 내러티브
- HITL도 선점: "Autonomy is a maturation process that is gradual and specific to every organization's readiness" — 단 프레임은 자율성 성숙, 태스크별 검증 아님
- 신뢰 신호: 로고(NVIDIA, Adobe, Palo Alto, EY, Adyen, Blackstone...) + 지표 밴드(36/day, 57k LoC/day, 98.7% validation 등 — 벤더 수치) + SOC 2 Type I, ISO 42001, GDPR (Vanta)
- 가격: Pro $20 / Plus $100 / Max $200 flat 개인 티어. 무료 티어 없음. SSO/SAML/SCIM/감사로그/ZDR = Business(커스텀 가격), SLA = Enterprise
- 출처: factory.ai, factory.ai/news/software-factory, factory.ai/enterprise, docs.factory.ai/pricing

### Devin (Cognition) [신뢰도 高]
- "Devin, the AI software engineer" — 고용된 엔지니어 페르소나. "built for engineering teams with complex, multi-repo projects", "a team of Devins"
- 신뢰 신호: Nubank 정량 케이스(8-12x 효율, 20x 비용 절감 — 벤더 수치) + 고객 로고. 오픈소스/셀프호스트 신호 전무
- PM/조직 레이어가 아니므로 직접 충돌보다는 메시징 대비군

### Sculptor (Imbue) + Vibe Kanban [신뢰도 高]
- Sculptor: "the missing UI for parallel coding agents" — 컨테이너 샌드박스, Pairing Mode로 마음에 드는 것만 로컬로 머지. 리뷰는 코드/git 레벨, 스프린트/조직 워크플로 없음
- Vibe Kanban 히어로: "Your Engineering Bottleneck Has Shifted — Accelerate the human planning and review your coding agents are waiting on" — 휴먼 리뷰 병목 내러티브 선점. 단 프레임은 리뷰의 '속도'지 결과의 '신뢰성'이 아님

### 미확정/미검증
- "멀티카": 미확정. 단서 — flowtivity.ai에 "Multica vs Paperclip vs Claude Managed Agents" 비교 글 존재 → "Multica"라는 실제 제품일 가능성 높음. 후속 확인 필요
- Conductor, Terragon, Charlie Labs, Omnara, Dart, Height: 검증 생존 주장 없음 — Claimed-vs-Verified 니치를 이들이 잡고 있는지 확인 필요

## 2. 메시지 검증 결론

현재 축의 선점 현황:
- "AI를 정식 팀원처럼" → Linear·Paperclip 선점
- "승인 Gate/HITL" → Paperclip(거버넌스 프레임)·Factory(자율성 성숙 프레임) 선점
- "리뷰 병목" → Vibe Kanban 선점 (속도 프레임)
- "Accountability" → Linear 선점
- "AI의 실행을 조직의 성장으로" → 추상적, Factory의 조직 생산성 서사와 충돌

**빈 니치 (검증된 전 랜딩에서 무점유): Claimed vs Verified — "AI가 했다고 주장하는 것"과 "검증된 것"의 간극을 제품의 핵심 약속으로.** [신뢰도 中 — 부재 주장이므로 검증된 경쟁사 범위에 한정]

### 후킹 메시지 후보
1. "AI가 했다는 것과, 검증된 것은 다릅니다 — Claimed와 Verified를 구분하는 오픈소스 조직 OS" (빈 니치 직접 점유)
2. "Ship what's verified, not what's claimed. The open-source org OS where agents work sprints and humans approve merges of trust" (EN)
3. "AI 팀원은 많아졌습니다. 믿을 수 있는 결과는요? — 승인 Gate와 Review로 Task를 Trust로 바꾸는 오픈소스 조직 OS" (Vibe Kanban 대비 '속도'가 아닌 '신뢰' 약속)

## 3. 프라이싱 검증

- Free $0 / Team $49 / Pro $149 구조는 대체로 방어 가능 [Factory·Paperclip 데이터 기준]
- 우위: Factory는 무료 티어 없음 + SSO/감사/SLA를 세일즈 게이트 → 우리는 $149에 투명 구매. **"컴플라이언스에 talk-to-sales 없음" = 프라이싱 페이지 웨지**
- 압박: Paperclip 완전 $0 → Free 티어 경합. 관리형 호스팅($49)·컴플라이언스($149)는 무경합
- 한계: Linear/Devin/Height/GitLab/Cal.com/Plane 가격은 검증 미통과 (Devin 검색 스니펫: Free/Pro $20/Max $200/Teams $80+$40/seat — 미검증). Team 티어 per-seat vs flat 명시 필요

## 4. 디자인 방향 초안 [신뢰도 低 — 비주얼 감사 미완]

신뢰 신호 2진영:
- 클로즈드 엔터프라이즈(Devin, Factory): 정량 케이스/지표 밴드 + 고객 로고 + SOC 2/ISO 42001
- OSS(Paperclip, Sculptor): MIT 뱃지 + 원라인 설치(npx) + "fork it, audit it" 제품-진실 프레임

Sprintable 권고 (OSS 진영 리드):
- 히어로 증빙 = Claimed vs Verified 리뷰 표면 실 UI 스크린샷 (제품이 메시지의 증거)
- 원라인 셀프호스트 설치 블록 + GitHub 링크/스타 (현 터미널 목업 방향과 일치)
- 실데이터 없이 Factory식 지표 밴드 모방 금지
- Paperclip식 "에이전트만의 회사" 연출 회피 (우리 서사는 사람+AI 혼성팀)
- 컴플라이언스 신호는 Pro 티어 내러티브에만
- 참고(미검증 수집 자료): "Linear Look"(다크 배경, 글로우/스펙큘러 보더, 그리드 패턴, 블러 글래스)이 카테고리 지배적. 상위 랜딩 ~70% 다크 배경, 히어로에 일러스트 대신 실 스크린샷/데모 우세

## 5. 미해결 과제
1. "멀티카" 정체 확정 (Multica 가설 확인)
2. 경쟁사 랜딩 브라우저 비주얼 감사 (다크/라이트, 타이포, 모션, 터미널 목업 실측)
3. Conductor/Terragon/Charlie/Omnara/Dart/Height 현황 + 니치 점유 여부
4. 프라이싱 비교군 확장 검증 (Linear, Devin, GitLab, Cal.com, Plane) + Team 티어 과금 단위 결정

## 부록: 주요 출처
- paperclip.ing / github.com/paperclipai/paperclip
- linear.app/agents / linear.app/integrations/agents
- factory.ai / factory.ai/news/software-factory / factory.ai/enterprise / docs.factory.ai/pricing
- devin.ai / devin.ai/customers/nubank
- imbue.com/sculptor / vibekanban.com
- 디자인 참고(미검증): frontend.horse "The Linear Look", framiq.app, theswiftk.it.com
- 주의: Devin/Factory의 정량 수치는 벤더 마케팅 수치로서 "게시됨"만 검증됨. 이 시장은 변화가 빨라(Factory 2.0이 리서치 1개월 전 출시) 유효기간이 짧음.
