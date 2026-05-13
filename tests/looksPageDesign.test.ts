import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const looksPageSource = readFileSync("app/looks/page.tsx", "utf8");
const storefrontCss = readFileSync("app/storefront.css", "utf8");

test("looks page uses the polished editorial heading copy", () => {
  assert.match(looksPageSource, /Curated Look Library/);
  assert.match(looksPageSource, /Find the Feeling Before the Finish/);
  assert.match(looksPageSource, /Mood-led palettes/);
});

test("looks page uses premium local typography and refined card styling", () => {
  assert.match(storefrontCss, /\.looks-page/);
  assert.match(storefrontCss, /\.look-card/);
  assert.match(storefrontCss, /font-family:\s*var\(--font-playfair\)/);
  assert.match(storefrontCss, /font-family:\s*var\(--font-outfit\)/);
});
