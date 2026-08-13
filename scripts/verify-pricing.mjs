#!/usr/bin/env node
// story #2605 — 랜딩 노출 가격 ↔ 청구 SSOT(pricing-policy-v2-3, apps/web의
// TIER_DEFINITIONS) 불일치 가드. 랜딩(sprintable-landing)과 실 청구 코드
// (sprintable/apps/web)는 별도 레포라 런타임에 같은 모듈을 import할 수 없다 —
// 이 스크립트는 그 대신 정본 값을 여기 고정해 놓고 messages/*.json의 pricing.plans
// 가격이 그 값과 어긋나면 CI를 실패시킨다(진짜 SSOT는 pricing-policy-v2-3 doc).
//
// ⛔값을 바꿀 때: 이 파일의 CANONICAL_KRW_MONTHLY도 같이 갱신하지 않으면 이 가드가
// 스스로 빨개진다(의도된 동작 — 정본과 다시 대조하라는 신호).
//
// 실행: node scripts/verify-pricing.mjs (CI: .github/workflows/pricing-guard.yml)

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');

// pricing-policy-v2-3(doc 8a943a0e) Part 3 표 · apps/web TIER_DEFINITIONS(pricing-data.ts)와
// 동일한 월 공급가(원, VAT 별도) — 2026-08-13 확定.
const CANONICAL_KRW_MONTHLY = {
  Free: 0,
  Starter: 29_000,
  Team: 59_000,
  Business: 219_000,
};

const LOCALES = ['ko', 'en'];
let failed = false;

for (const locale of LOCALES) {
  const messagesPath = path.join(REPO_ROOT, 'messages', `${locale}.json`);
  const messages = JSON.parse(readFileSync(messagesPath, 'utf8'));
  const plans = messages?.pricing?.plans;

  if (!Array.isArray(plans)) {
    console.error(`[pricing-guard] ${locale}.json: pricing.plans missing or not an array`);
    failed = true;
    continue;
  }

  const expectedNames = Object.keys(CANONICAL_KRW_MONTHLY);
  const actualNames = plans.map((p) => p.name);
  if (JSON.stringify(actualNames) !== JSON.stringify(expectedNames)) {
    console.error(
      `[pricing-guard] ${locale}.json: tier name/order mismatch — expected ${JSON.stringify(expectedNames)}, got ${JSON.stringify(actualNames)}`,
    );
    failed = true;
    continue;
  }

  for (const plan of plans) {
    const expectedKrw = CANONICAL_KRW_MONTHLY[plan.name];
    // price 문자열 형식: "29,000원" (formatKrw와 동일 — apps/web pricing-data.ts 참조)
    const numeric = Number(String(plan.price).replace(/[^\d]/g, ''));
    if (numeric !== expectedKrw) {
      console.error(
        `[pricing-guard] ${locale}.json: ${plan.name} price "${plan.price}" (parsed ${numeric}원) !== canonical ${expectedKrw}원`,
      );
      failed = true;
    }
  }
}

if (failed) {
  console.error('\n[pricing-guard] FAILED — 랜딩 가격이 정본(pricing-policy-v2-3)과 어긋난다.');
  process.exit(1);
}

console.log('[pricing-guard] OK — 랜딩 가격이 정본과 일치한다 (ko/en 둘 다).');
