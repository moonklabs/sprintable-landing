# 경쟁사 랜딩 비주얼 감사 (브라우저 실측)

- 일자: 2026-07-21, 인앱 브라우저로 8개 사이트 직접 방문 — 스크린샷 + JS 실측(computed style, DOM 구조)
- 후속: [2026-07-21-landing-competitive-research.md](./2026-07-21-landing-competitive-research.md)의 미해결 과제 ①·② 해소

## ⚡ 신규 시장 인텔 (리서치 보고서 업데이트)

1. **"멀티카" = Multica (multica.ai) 확정** — 타이틀 "Project Management for Human + Agent Teams". **한국어(ko-KR) 랜딩**, 오픈소스, BYOA(Claude Code·Codex·Gemini CLI·OpenClaw·OpenCode), "코딩 AI 에이전트를 진짜 팀원으로". **우리와 가장 직접적인 경쟁자** (같은 언어권, 같은 혼성팀 포지셔닝). 단, 서사는 위임→추적→스킬 축적이며 **승인 Gate/검증 서사는 부재** → Claimed vs Verified 니치는 여전히 비어 있고, 한국 시장 직접 경쟁 때문에 선점 시급성이 높아짐. 프라이싱 페이지 없음(404) — 무료 + "영업팀에 문의" 구조.
2. **Vibe Kanban 선셋 중** — 상단 배너 "Vibe Kanban is sunsetting. The project will continue as open source and community maintained." 리뷰 병목 내러티브의 상업적 점유가 비어가는 중.
3. **Conductor는 Conductor Cloud 출시 배너** — 로컬 Mac 앱에서 클라우드로 확장 중. 히어로 스크린샷이 리뷰/머지 UI("Ready to merge", diff 목록)라는 점 주목 — 코드 레벨 리뷰 표면을 증빙으로 쓰는 실례.

## 실측 매트릭스

| 사이트 | 테마 | body 배경(실측) | H1 폰트/크기/무게/자간 | 히어로 증빙 | 비고 |
|---|---|---|---|---|---|
| Paperclip | 다크(웜 블랙) | rgb(20,20,19), 텍스트 크림 rgb(243,230,196) | Inter Tight 60px/600/-2.1px | 그레인 그라디언트 필 아트 | 크림-온-블랙, npm/claude 설치 토글, 애니메이션 요소 149개, 이미지 60장 |
| Linear /agents | 다크(순흑) | rgb(8,9,10) | Inter Variable 72px/510/-1.6px | 실제 Linear 미니 창 3개(실 프롬프트 예시) | 극도의 절제: 그라디언트·오브·컬러 액센트 전무, 좌정렬, CTA 1개("Watch example") |
| Factory | 다크(완전 흑) | rgb(2,2,2) | Geist 72px/400 | 대시보드 지표 UI 목업(앰버 액센트) | 산업 미학: 모노스페이스 요소 166개, 대문자 네비, 각진 버튼, 앰버 글로우 |
| Devin | **라이트** | rgb(247,246,245) | NB International Pro 68px/500 | 없음(텍스트 중심, 즉시 Nubank 케이스로) | 조용한 미니멀, 중앙정렬, 배지 "Introducing Security Swarm" |
| Sculptor (Imbue) | **라이트(웜 크림)** | rgb(207,199,179) | Caslon Ionic(세리프) 54px/400, 본문 ABC Diatype Semi-Mono | 실 앱 스크린샷 | 에디토리얼 블로그형(바이라인·읽기시간), 반-SaaS |
| Vibe Kanban | **라이트(페이퍼+그리드)** | rgb(249,246,244) | IBM Plex Sans, 디스플레이 블랙+러스트 키워드 | GitHub ★27.5k 뱃지 + `$ NPX VIBE-KANBAN` 커맨드 버튼 | 픽셀 로고, **선셋 배너** |
| Conductor | 라이트(화이트) | 흰색 | 전체 모노스페이스, 좌정렬 소형 | 리뷰/머지 실 UI 대형 스크린샷 | 올-모노 아이덴티티, 픽셀 아트 |
| **Multica** | 라이트 페이지 + 다크 히어로 밴드 | oklch(0.988) | **Instrument Serif 102px/400 (세리프!)** | (미확인 — 히어로 하단 UI 프레임) | 헤드라인 "다음에 합류할 10명은 사람이 아닐지도 모릅니다." 감성 세리프 후킹. CTA: 무료/데스크톱 다운로드/영업 문의 |

Multica 섹션 구조(H2 실측): 동료에게 맡기듯 이슈 위임 → 담당자 목록에 함께 표시 → 스스로 남기는 작업 기록 → 팀 타임라인 → 끝까지 추적 → 막히면 먼저 알림 → 반복 노하우의 스킬화 → 런타임 패널 → "첫 AI 팀원을 한 시간 안에 합류".

## 도출 패턴

1. **"70% 다크"는 이 카테고리 실측에선 거짓** — 8곳 중 다크 3(Paperclip·Linear·Factory), 라이트 5. Linear Look(다크+글로우)이 포화되자 신생 제품들이 라이트·에디토리얼·모노로 이탈 중.
2. **세리프 디스플레이 무브** — Sculptor(Caslon Ionic), Multica(Instrument Serif 102px). 감성·에디토리얼 차별화 수단.
3. **모노스페이스 아이덴티티** — Conductor(전면), Factory(166 요소), Vibe Kanban(버튼·뱃지). "엔지니어링 진정성" 신호.
4. **OSS 신호의 실전 형태** — GitHub 스타 수를 히어로에(★27.5k), 설치 커맨드를 버튼으로(`npx ...`), 네비에 GitHub 버튼(Multica·Paperclip). 추상 뱃지가 아니라 실행 가능한 오브젝트.
5. **히어로 증빙 스펙트럼** — 실 UI(Linear 미니창·Conductor 리뷰 UI·Factory 대시보드) > 아트(Paperclip 그레인) > 무증빙(Devin, 대신 즉시 정량 케이스). 실 UI 진영이 다수.
6. **카피는 전부 짧고 단정적** — 최장이 Multica의 감성 문장. 아무도 기능 나열로 시작하지 않음.

## Sprintable 디자인 방향 권고 (초안 v2 — 실측 반영)

- **다크 유지 + "증거의 미학"으로 차별화**: 현 다크+인디고는 Linear Look 포화 지대이므로, 글로우가 아니라 **Verified/Gate UI 자체를 히어로 증빙**으로. Factory식 허수 지표 밴드 대신 Claimed→Gate→Verified 씰 흐름(이미 Trust 섹션에 존재)을 히어로로 승격.
- **그린 "Verified" 시그니처**: 실측상 액센트 컬러가 브랜드 기억을 좌우(Factory=앰버, Vibe Kanban=러스트). 우리의 검증 그린(✓)을 신뢰 시그니처로 승격해 "그린 체크 = Sprintable" 연상 구축.
- **OSS 신호를 실행 오브젝트로**: 히어로에 GitHub 스타 뱃지 + 복사 가능한 `uvx sprintable` 커맨드 칩(현 터미널 목업과 일관).
- **타이포 차별**: Multica가 한국어 세리프 감성을 선점 — Bricolage Grotesque(기하 그로테스크) 유지가 오히려 변별. 세리프 추종 금지.
- **모노스페이스는 부분 채용**: 터미널·씰 메타(사람 서명·증거 3 등)에 한정해 엔지니어링 진정성 신호로.
- **피할 것**: Paperclip식 장식 아트 히어로(증빙 없음), Factory식 데이터 없는 지표 밴드, Linear 글로우 문법의 정면 모방.

## 남은 것
- Multica 데스크톱 앱/실 UI 심층 분석(제품 내부 검증·게이트 표면 보유 여부 — 랜딩 서사엔 없으나 제품엔 있을 수 있음)
- Multica의 GitHub 저장소·스타·라이선스 확인
- Vibe Kanban 선셋 공지 전문 확인(자산 인수/포크 기회?)
