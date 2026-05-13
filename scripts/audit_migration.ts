import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

const CLONE_PATH = process.env.PGBISON_CLONE_PATH || "D:\\clone pgbson\\pgbison.co.za";
const PRODUCTS_FILE = path.join(process.cwd(), "scripts", "extracted_products.json");
const LOOKS_FILE = path.join(process.cwd(), "scripts", "extracted_looks.json");

type ProductSwatch = {
  name?: string;
  image?: string;
};

type ExtractedProduct = {
  slug: string;
  title?: string;
  swatches?: ProductSwatch[];
};

type ExtractedLook = {
  slug: string;
  categories?: {
    name?: string;
    coverImage?: string;
    coloursDesignsUsed?: { name?: string; image?: string; images?: string[] }[];
    productRange?: { name?: string; image?: string; images?: string[] }[];
    gallery?: { image?: string }[];
  }[];
};

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function sourceSwatchCount(rangeSlug: string) {
  const filePath = path.join(CLONE_PATH, "product", rangeSlug, "index.html");
  if (!fs.existsSync(filePath)) return 0;

  const $ = cheerio.load(fs.readFileSync(filePath, "utf8"));
  const hrefs = new Set<string>();
  $(".products-colors-container, .color-selector-container")
    .find('a[href*="/products/"]')
    .each((_, element) => {
      const href = $(element).attr("href")?.trim();
      if (href) hrefs.add(href);
    });

  return hrefs.size;
}

function hasUsableImage(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 && !value.startsWith("data:image/svg");
}

function main() {
  const products = readJson<ExtractedProduct[]>(PRODUCTS_FILE);
  const looks = readJson<ExtractedLook[]>(LOOKS_FILE);
  const failures: string[] = [];

  for (const product of products) {
    const expectedSwatches = sourceSwatchCount(product.slug);
    const swatches = product.swatches ?? [];

    if (expectedSwatches > 0 && swatches.length !== expectedSwatches) {
      failures.push(
        `${product.slug}: expected ${expectedSwatches} swatches from source, found ${swatches.length}`
      );
    }

    const badSwatches = swatches.filter((swatch) => {
      const name = swatch.name?.trim().toLowerCase();
      return !name || name === "colour" || name === "color" || name === "product" || !hasUsableImage(swatch.image);
    });
    if (badSwatches.length > 0) {
      failures.push(`${product.slug}: ${badSwatches.length} swatches have placeholder names or missing images`);
    }
  }

  for (const look of looks) {
    for (const category of look.categories ?? []) {
      if (!hasUsableImage(category.coverImage) && !(category.gallery ?? []).some((item) => hasUsableImage(item.image))) {
        failures.push(`${look.slug}/${category.name ?? "category"}: missing category cover/gallery image`);
      }

      const badDesigns = (category.coloursDesignsUsed ?? []).filter(
        (item) => !item.name?.trim() || (!hasUsableImage(item.image) && !(item.images ?? []).some(hasUsableImage))
      );
      if (badDesigns.length > 0) {
        failures.push(`${look.slug}/${category.name ?? "category"}: ${badDesigns.length} designs missing image/name`);
      }

      const badProductRanges = (category.productRange ?? []).filter(
        (item) => !item.name?.trim() || (!hasUsableImage(item.image) && !(item.images ?? []).some(hasUsableImage))
      );
      if (badProductRanges.length > 0) {
        failures.push(`${look.slug}/${category.name ?? "category"}: ${badProductRanges.length} product ranges missing image/name`);
      }
    }
  }

  if (failures.length > 0) {
    console.error(`Migration audit failed with ${failures.length} issue(s):`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(`Migration audit passed: ${products.length} product ranges and ${looks.length} look groups checked.`);
}

main();
