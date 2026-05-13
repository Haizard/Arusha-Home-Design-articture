/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const PRODUCTS_FILE = path.join(process.cwd(), "scripts", "extracted_products.json");
const LOOKS_FILE = path.join(process.cwd(), "scripts", "extracted_looks.json");
const ASSET_DIR = path.join(process.cwd(), "public", "assets", "pg-bison");

const imageSchema = new mongoose.Schema(
  { image: { type: String, required: true }, alt: String, caption: String },
  { _id: false }
);

const materialRangeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: String,
    logo: String,
    heroImage: String,
    howItIsMade: { description: String, videoUrl: String },
    downloads: [{ label: String, url: String }],
    techSpecs: [{ label: String, value: String }],
    swatches: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        category: String,
        look: String,
        brand: String,
        finish: String,
      },
    ],
    lookGroups: [
      {
        name: { type: String, required: true },
        slug: String,
        description: String,
        coverImage: String,
        categories: [
          {
            name: { type: String, required: true },
            slug: String,
            description: String,
            coverImage: String,
            gallery: [imageSchema],
          },
        ],
      },
    ],
    profiles: [String],
  },
  { timestamps: true }
);

const lookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: String,
    description: String,
    coverImage: String,
    categories: [
      {
        name: { type: String, required: true },
        slug: String,
        description: String,
        coverImage: String,
        coloursDesignsUsed: [
          { name: { type: String, required: true }, image: String, images: [String], finish: String, productRange: String },
        ],
        productRange: [{ name: { type: String, required: true }, image: String, images: [String], description: String }],
        gallery: [imageSchema],
      },
    ],
  },
  { timestamps: true }
);

const MaterialRange = mongoose.models.MaterialRange || mongoose.model("MaterialRange", materialRangeSchema);
const Look = mongoose.models.Look || mongoose.model("Look", lookSchema);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function cleanTitle(value) {
  return String(value || "").replace(/^I-/, "").trim();
}

function hasUsableImage(value) {
  return typeof value === "string" && value.trim().length > 0 && !value.startsWith("data:image/svg");
}

function localizeImage(value) {
  if (!hasUsableImage(value) || !value.startsWith("http")) return value || "";

  let fileName = "";
  try {
    fileName = path.basename(new URL(value).pathname);
  } catch {
    return value;
  }

  if (fileName && fs.existsSync(path.join(ASSET_DIR, fileName))) {
    return `/assets/pg-bison/${fileName}`;
  }
  return value;
}

function localizeList(values) {
  return (values || []).map(localizeImage).filter(hasUsableImage);
}

function normalizeProduct(product) {
  const title = cleanTitle(product.title);
  const swatches = (product.swatches || [])
    .map((swatch) => ({
      name: cleanTitle(swatch.name),
      image: localizeImage(swatch.image),
      category: swatch.category || "General",
      look: swatch.look || "",
      brand: title,
      finish: swatch.finish || "",
    }))
    .filter((swatch) => swatch.name && hasUsableImage(swatch.image));

  return {
    title,
    category: product.category || "Decorative Board",
    description: product.description || "",
    logo: localizeImage(product.logo),
    heroImage: localizeImage(product.heroImage),
    howItIsMade: product.howItIsMade || {},
    downloads: product.downloads || [],
    swatches,
    techSpecs: [],
  };
}

function normalizeLook(group) {
  const name = group.name === "Choose Your Look"
    ? cleanTitle(group.slug.charAt(0).toUpperCase() + group.slug.slice(1))
    : cleanTitle(group.name);

  return {
    name,
    slug: group.slug,
    description: group.description || "",
    coverImage: localizeImage(group.coverImage),
    categories: (group.categories || []).map((category) => ({
      name: cleanTitle(category.name),
      slug: category.slug,
      description: category.description || "",
      coverImage: localizeImage(category.coverImage),
      gallery: (category.gallery || []).map((item) => ({
        ...item,
        image: localizeImage(item.image),
      })).filter((item) => hasUsableImage(item.image)),
      coloursDesignsUsed: (category.coloursDesignsUsed || []).map((item) => ({
        ...item,
        image: localizeImage(item.image),
        images: localizeList(item.images && item.images.length ? item.images : [item.image]),
      })).filter((item) => item.name && (hasUsableImage(item.image) || item.images.length)),
      productRange: (category.productRange || []).map((item) => ({
        name: item.name === "alt tag" ? "PG Bison Product" : cleanTitle(item.name),
        image: localizeImage(item.image),
        images: localizeList(item.images && item.images.length ? item.images : [item.image]),
        description: item.description || "",
      })).filter((item) => item.name && (hasUsableImage(item.image) || item.images.length)),
    })),
  };
}

async function connect() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not configured");
  await mongoose.connect(process.env.MONGODB_URI, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 10000,
  });
}

async function seed() {
  const products = readJson(PRODUCTS_FILE).map(normalizeProduct);
  const looks = readJson(LOOKS_FILE).map(normalizeLook);

  for (const product of products) {
    await MaterialRange.findOneAndUpdate({ title: product.title }, product, { upsert: true, new: true, runValidators: true });
    console.log(`Upserted material range: ${product.title} (${product.swatches.length} swatches)`);
  }

  for (const look of looks) {
    await Look.findOneAndUpdate({ slug: look.slug }, look, { upsert: true, new: true, runValidators: true });
    console.log(`Upserted look group: ${look.name} (${look.categories.length} categories)`);
  }
}

async function auditDb() {
  const products = readJson(PRODUCTS_FILE).map(normalizeProduct);
  const looks = readJson(LOOKS_FILE).map(normalizeLook);
  const failures = [];

  for (const product of products) {
    const dbProduct = await MaterialRange.findOne({ title: product.title }).lean();
    if (!dbProduct) {
      failures.push(`${product.title}: missing from MongoDB`);
      continue;
    }
    if ((dbProduct.swatches || []).length !== product.swatches.length) {
      failures.push(`${product.title}: MongoDB has ${(dbProduct.swatches || []).length} swatches, expected ${product.swatches.length}`);
    }
  }

  for (const look of looks) {
    const dbLook = await Look.findOne({ slug: look.slug }).lean();
    if (!dbLook) {
      failures.push(`${look.slug}: missing from MongoDB`);
      continue;
    }

    for (const category of dbLook.categories || []) {
      const badDesigns = (category.coloursDesignsUsed || []).filter(
        (item) => !item.name || (!hasUsableImage(item.image) && !(item.images || []).some(hasUsableImage))
      );
      const badRanges = (category.productRange || []).filter(
        (item) => !item.name || (!hasUsableImage(item.image) && !(item.images || []).some(hasUsableImage))
      );
      if (badDesigns.length) failures.push(`${look.slug}/${category.name}: ${badDesigns.length} designs missing image data`);
      if (badRanges.length) failures.push(`${look.slug}/${category.name}: ${badRanges.length} product ranges missing image data`);
    }
  }

  if (failures.length) {
    console.error(`MongoDB migration audit failed with ${failures.length} issue(s):`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
  } else {
    console.log(`MongoDB migration audit passed: ${products.length} material ranges and ${looks.length} look groups checked.`);
  }
}

async function main() {
  const shouldSeed = process.argv.includes("--seed");
  const shouldAudit = process.argv.includes("--audit");
  if (!shouldSeed && !shouldAudit) {
    console.log("Usage: node scripts/migrate_pgbison.cjs --seed --audit");
    return;
  }

  await connect();
  if (shouldSeed) await seed();
  if (shouldAudit) await auditDb();
}

main()
  .catch((error) => {
    console.error("PG Bison migration failed:", error.message || error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect().catch(() => undefined);
  });
