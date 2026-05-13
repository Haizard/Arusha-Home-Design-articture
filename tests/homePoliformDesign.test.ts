import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const homeSource = readFileSync("app/page.tsx", "utf8");
const storefrontCss = readFileSync("app/storefront.css", "utf8");

test("home page follows the Poliform-inspired editorial layout", () => {
  assert.match(homeSource, /home-poliform/);
  assert.match(homeSource, /Contemporary/);
  assert.match(homeSource, /Modern Minimalist/);
  assert.match(homeSource, /Explore Our Proudly Collection/);
  assert.match(homeSource, /Engage with Us in Conversation/);
});

test("home page includes reference-style fonts, rounded media, stats, and dark footer band", () => {
  assert.match(storefrontCss, /\.home-poliform/);
  assert.match(storefrontCss, /\.home-poliform-hero-card/);
  assert.match(storefrontCss, /\.home-poliform-stats/);
  assert.match(storefrontCss, /\.home-poliform-collection/);
  assert.match(storefrontCss, /\.home-poliform-conversation/);
  assert.match(storefrontCss, /font-family:\s*var\(--font-outfit\)/);
});
