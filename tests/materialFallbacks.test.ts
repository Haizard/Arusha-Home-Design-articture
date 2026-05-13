import assert from "node:assert/strict";
import test from "node:test";
import { getFallbackMaterialRange, getFallbackMaterialRanges, normalizePgAsset } from "../lib/materialFallbacks";

test("fallback material ranges include migrated swatches", () => {
  const ranges = getFallbackMaterialRanges();
  const melawood = ranges.find((range) => range._id === "melawood");

  assert.ok(ranges.length >= 15);
  assert.equal(melawood?.swatches?.length, 40);
});

test("fallback material lookup works by slug", () => {
  const range = getFallbackMaterialRange("formica-lifeseal-worktops");

  assert.equal(range?.title, "Formica Lifeseal Worktops");
  assert.equal(range?.swatches?.length, 27);
});

test("fallback image URLs prefer downloaded local assets", () => {
  const image = normalizePgAsset("https://pgbison.co.za/wp-content/uploads/2025/04/Farasan_1000x1500mm-72dpi--scaled.jpg");

  assert.equal(image, "/assets/pg-bison/Farasan_1000x1500mm-72dpi--scaled.jpg");
});

test("fallback ranges do not emit remote PG Bison image URLs", () => {
  const ranges = getFallbackMaterialRanges();
  const images = ranges.flatMap((range) => [
    range.logo,
    range.heroImage,
    ...(range.swatches ?? []).map((swatch) => swatch.image),
  ]);

  assert.equal(images.some((image) => image?.startsWith("https://pgbison.co.za")), false);
});
