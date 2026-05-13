import assert from "node:assert/strict";
import test from "node:test";
import { withTimeout } from "../lib/withTimeout";

test("withTimeout returns fallback when work exceeds timeout", async () => {
  const started = Date.now();
  const result = await withTimeout(new Promise<string>(() => undefined), 25, "fallback");

  assert.equal(result, "fallback");
  assert.ok(Date.now() - started < 500);
});

test("withTimeout returns resolved value before timeout", async () => {
  const result = await withTimeout(Promise.resolve("database"), 100, "fallback");

  assert.equal(result, "database");
});
