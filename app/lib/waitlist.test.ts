import assert from "node:assert/strict";
import test from "node:test";
import { buildWaitlistHiddenFields, getTallyFormId } from "./waitlist.ts";

test("accepts a published Tally form ID", () => {
  assert.equal(getTallyFormId("mRoDv3"), "mRoDv3");
});

test("rejects an invalid Tally form ID", () => {
  assert.equal(getTallyFormId("https://tally.so/r/mRoDv3"), null);
  assert.equal(getTallyFormId(""), null);
  assert.equal(getTallyFormId(undefined), null);
});

test("preserves campaign attribution and CTA context for Tally hidden fields", () => {
  assert.deepEqual(
    buildWaitlistHiddenFields({
      pathname: "/",
      search: "?utm_source=linkedin&utm_medium=paid&utm_campaign=launch&ignored=value",
      source: "hero",
      plan: "Team",
    }),
    {
      originPage: "/",
      ctaSource: "hero",
      plan: "Team",
      utm_source: "linkedin",
      utm_medium: "paid",
      utm_campaign: "launch",
    },
  );
});
