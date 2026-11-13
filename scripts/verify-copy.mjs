#!/usr/bin/env node
// story 4918 — 랜딩의 «한 줄 설명»이 선생님이 정한 문구(맥에서 일하는 에이전트 · 폰에서 대화와 승인 · 혼자 또는 작은 팀)로 고정돼 있는지 지키는 가드.
// 랜딩은 단위 시험 도구가 없는 레포라(verify-pricing.mjs와 같은 방식) 글자를 여기 고정해 두고, 어긋나면 CI를 빨갛게 한다.
// ⛔문구를 바꿀 때: 아래 DESCRIPTION과 세 곳(messages/*.json finalCta.desc · meta.description, app/layout.tsx description)을 같이 고친다 — 웹 앱(sprintable/apps/web)의 로그인 부제 · 링크 미리보기 · 설치 설명도 같은 결정을 따른다.
//
// 실행: node scripts/verify-copy.mjs (CI: .github/workflows/copy-guard.yml)

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(path.join(REPO_ROOT, p), 'utf8');

const DESCRIPTION = {
  ko: '에이전트가 맥에서 일하는 동안, 대화와 승인은 폰에서. 혼자 또는 작은 팀으로 일하는 사람을 위한 작업 공간.',
  en: 'While your agents work on your Mac, chat and approve from your phone. A workspace for people who work solo or in small teams.',
};
// 옛 포지셔닝 문구가 이 자리들에 다시 들어오지 않게(메시지의 한 줄 설명 자리 한정 — 히어로 · 제목 · 푸터는 별건).
const OLD_PHRASES = ['조직 OS', 'The operating system where humans and AI deliver together', 'Open-source PM surface for teams shipping with AI. Start with BYOA'];

const problems = [];
for (const lang of ['ko', 'en']) {
  const m = JSON.parse(read(`messages/${lang}.json`));
  if (m.finalCta?.desc !== DESCRIPTION[lang]) problems.push(`messages/${lang}.json finalCta.desc 가 정한 문구가 아니다: «${m.finalCta?.desc}»`);
  if (m.meta?.description !== DESCRIPTION[lang]) problems.push(`messages/${lang}.json meta.description(홈 메타 · og · twitter · JSON-LD)이 정한 문구가 아니다: «${m.meta?.description}»`);
}
const layout = read('app/layout.tsx');
if (!layout.includes(JSON.stringify(DESCRIPTION.en))) problems.push('app/layout.tsx 기본 description 이 정한 영어 문구가 아니다');
for (const file of ['messages/ko.json', 'messages/en.json', 'app/layout.tsx']) {
  const text = read(file);
  for (const phrase of OLD_PHRASES) if (text.includes(phrase)) problems.push(`${file} 에 옛 문구가 남아 있다: «${phrase}»`);
}

if (problems.length) {
  console.error('FAIL: 랜딩 한 줄 설명(story 4918):');
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log('OK: 랜딩 한 줄 설명(finalCta.desc · meta.description · layout 기본 description) ko/en이 정한 문구와 같고 옛 문구 0.');
