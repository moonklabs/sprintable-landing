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

// 영어 페이지는 참고용 USD로 보여주지만 실제 청구는 원화다. 단순화한 기준: 1,000원 = 1달러 (USD = KRW / 1,000).
// ⛔기준환율을 바꾸면 messages/en.json의 pricing.plans 가격·note·footnote도 함께 바꿔야 한다.
const USD_REFERENCE_RATE = 1_000;

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
    const numeric = Number(String(plan.price).replace(/[^\d]/g, ''));

    if (locale === 'ko') {
      // price 문자열 형식: "29,000원" (formatKrw와 동일 — apps/web pricing-data.ts 참조)
      if (numeric !== expectedKrw) {
        console.error(
          `[pricing-guard] ko.json: ${plan.name} price "${plan.price}" (parsed ${numeric}원) !== canonical ${expectedKrw}원`,
        );
        failed = true;
      }
      continue;
    }

    // en: 참고용 USD 표기 — 환산값과 같아야 하고, 실제 청구 원화 금액을 note에 밝혀야 한다
    const expectedUsd = Math.round(expectedKrw / USD_REFERENCE_RATE);
    if (!String(plan.price).startsWith('$') || numeric !== expectedUsd) {
      console.error(
        `[pricing-guard] en.json: ${plan.name} price "${plan.price}" !== $${expectedUsd} (= ${expectedKrw}원 / ${USD_REFERENCE_RATE})`,
      );
      failed = true;
    }
    if (expectedKrw > 0 && !String(plan.note ?? '').includes(expectedKrw.toLocaleString('en-US'))) {
      console.error(
        `[pricing-guard] en.json: ${plan.name} note must state the KRW billing amount (${expectedKrw.toLocaleString('en-US')}), got "${plan.note ?? ''}"`,
      );
      failed = true;
    }
  }
}

if (failed) {
  console.error('\n[pricing-guard] FAILED — 랜딩 가격이 정본(pricing-policy-v2-3)과 어긋난다.');
  process.exit(1);
}

console.log('[pricing-guard] OK — ko는 정본(원화)과, en은 참고용 USD(환산값 + 원화 청구 안내)와 일치한다.');
