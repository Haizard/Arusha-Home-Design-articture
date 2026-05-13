import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const componentSource = readFileSync("components/materials/MaterialsHub.tsx", "utf8");
const storefrontCss = readFileSync("app/storefront.css", "utf8");

test("compact materials page uses a PG-style product archive grid", () => {
  assert.match(componentSource, /function ProductArchiveCard/);
  assert.match(componentSource, /function hasProductArchiveImage/);
  assert.match(componentSource, /\.filter\(hasProductArchiveImage\)/);
  assert.match(componentSource, /materials-product-archive/);
  assert.match(componentSource, /materials-product-grid/);
  assert.match(componentSource, /Material Library/);
  assert.match(componentSource, /Surfaces That Shape Beautiful Homes/);
});

test("product archive tiles keep stable wide banner proportions", () => {
  assert.match(storefrontCss, /\.materials-product-tile/);
  assert.match(storefrontCss, /aspect-ratio:\s*1000\s*\/\s*446/);
  assert.match(storefrontCss, /font-family:\s*var\(--font-playfair\)/);
  assert.match(storefrontCss, /font-family:\s*var\(--font-outfit\)/);
});
