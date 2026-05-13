import extractedProducts from "@/scripts/extracted_products.json";
import type { MaterialRangeCard } from "@/components/materials/MaterialsHub";
import fs from "fs";
import path from "path";

type ExtractedSwatch = {
  name?: string;
  image?: string;
  category?: string;
  look?: string;
  brand?: string;
  finish?: string;
};

type ExtractedProduct = {
  title?: string;
  slug?: string;
  category?: string;
  description?: string;
  logo?: string;
  heroImage?: string;
  swatches?: ExtractedSwatch[];
};

const LOCAL_ASSET_DIR = path.join(process.cwd(), "public", "assets", "pg-bison");
const ASSET_ALIASES: Record<string, string> = {
  "3.png": "cappuccino-scaled.webp",
};

export function normalizePgAsset(src?: string) {
  const value = src?.trim() ?? "";
  if (!value || value.startsWith("data:image/svg")) return "";

  if (value.startsWith("/assets/pg-bison/")) return value;

  let fileName = "";
  try {
    fileName = path.basename(new URL(value.startsWith("/wp-content/") ? `https://pgbison.co.za${value}` : value).pathname);
  } catch {
    fileName = path.basename(value);
  }

  if (fileName && fs.existsSync(path.join(LOCAL_ASSET_DIR, fileName))) {
    return `/assets/pg-bison/${fileName}`;
  }

  const alias = ASSET_ALIASES[fileName];
  if (alias && fs.existsSync(path.join(LOCAL_ASSET_DIR, alias))) {
    return `/assets/pg-bison/${alias}`;
  }

  const absoluteValue = value.startsWith("//")
    ? `https:${value}`
    : value.startsWith("/wp-content/")
      ? `https://pgbison.co.za${value}`
      : value;

  if (absoluteValue.startsWith("https://pgbison.co.za/") || absoluteValue.startsWith("http://pgbison.co.za/")) {
    return "";
  }

  if (value.startsWith("//")) return `https:${value}`;
  if (value.startsWith("/wp-content/")) return `https://pgbison.co.za${value}`;
  return value;
}

export function normalizeMaterialRangeAssets(range: MaterialRangeCard): MaterialRangeCard {
  return {
    ...range,
    logo: normalizePgAsset(range.logo),
    heroImage: normalizePgAsset(range.heroImage),
    swatches: (range.swatches ?? [])
      .map((swatch) => ({
        ...swatch,
        image: normalizePgAsset(swatch.image),
      }))
      .filter((swatch) => swatch.name && swatch.image),
  };
}

export function getFallbackMaterialRanges(): MaterialRangeCard[] {
  return (extractedProducts as ExtractedProduct[])
    .map((product) => ({
      _id: product.slug,
      title: product.title,
      category: product.category || "Decorative Board",
      description: product.description,
      logo: normalizePgAsset(product.logo),
      heroImage: normalizePgAsset(product.heroImage),
      swatches: (product.swatches ?? [])
        .map((swatch) => ({
          ...swatch,
          image: normalizePgAsset(swatch.image),
        }))
        .filter((swatch) => swatch.name && swatch.image),
      profiles: [],
    }))
    .filter((range) => range.title);
}

export function getFallbackMaterialRange(id: string): MaterialRangeCard | null {
  const normalizedId = id.trim().toLowerCase();
  return (
    getFallbackMaterialRanges().find(
      (range) =>
        range._id?.toLowerCase() === normalizedId ||
        range.title?.toLowerCase() === normalizedId
    ) ?? null
  );
}
