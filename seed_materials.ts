import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

import connectDB from './lib/mongodb';
import MaterialRange from './models/MaterialRange';

const materialRanges = [
  {
    title: "Monteo+",
    category: "Melamine Faced Board",
    description:
      "Monteo+ is a premium melamine-faced board range engineered for high-traffic interior joinery. Its NobleCore™ substrate delivers superior moisture resistance and dimensional stability — ideal for kitchens, wardrobes, and commercial fit-outs.",
    heroImage: "/images/service-kitchen.jpg",
    logo: "/images/melawood-logo.png",
    howItIsMade: {
      description: "Our top-quality BisonBord® is covered on both sides with decorative paper infused with melamine resin using heat and pressure. The cured surface is smooth, non-porous, and anti-bacterial.",
      videoUrl: "https://www.youtube.com/watch?v=3FStoloeUVk",
    },
    downloads: [
      { label: "MelaWood Product Guide", url: "#" },
      { label: "Technical Data Sheet", url: "#" },
      { label: "Care Instructions", url: "#" },
    ],
    techSpecs: [
      { label: "Substrate", value: "NobleCore™ MDF" },
      { label: "Thickness", value: "16mm & 18mm" },
      { label: "Finish", value: "MelaWood SupaTexture" },
      { label: "Board Size", value: "2750 × 1830mm" },
    ],
    swatches: [
      { name: "Iceberg White", image: "/images/service-kitchen.jpg", look: "Bliss", finish: "Smooth Matt", category: "Solid Colours" },
      { name: "Storm Grey", image: "/images/service-interior.jpg", look: "Bliss", finish: "Smooth Matt", category: "Solid Colours" },
      { name: "Arden Oak", image: "/images/prod-wardrobe.jpg", look: "Delight", finish: "Woodgrain", category: "Woodgrains" },
      { name: "Natural Elm", image: "/images/prod-tv.jpg", look: "Delight", finish: "Woodgrain", category: "Woodgrains" },
      { name: "Graphite Black", image: "/images/prod-bath.jpg", look: "Exhilaration", finish: "Smooth Matt", category: "Solid Colours" },
      { name: "Warm Walnut", image: "/images/proj-1.jpg", look: "Exhilaration", finish: "Woodgrain", category: "Woodgrains" },
      { name: "Glacier White", image: "/images/service-3d.jpg", look: "Bliss", finish: "High Gloss", category: "Solid Colours" },
      { name: "Concrete Grey", image: "/images/service-arch.jpg", look: "Delight", finish: "Stone", category: "Stones & Structure" },
    ],
    lookGroups: [
      {
        name: "Bliss",
        slug: "bliss",
        description: "Soft, calm pairings for bright kitchens, wardrobes, and relaxed living spaces.",
        coverImage: "/images/service-kitchen.jpg",
        categories: [
          {
            name: "Iceberg White and Storm Grey",
            slug: "iceberg-white-storm-grey",
            coverImage: "/images/service-kitchen.jpg",
            description: "A clean white and cool grey pairing for contemporary cabinet work.",
            gallery: [
              { image: "/images/service-kitchen.jpg", caption: "Kitchen application" },
              { image: "/images/prod-tv.jpg", caption: "Living room application" },
            ],
          },
        ],
      },
    ],
    profiles: [],
  },
  {
    title: "Signature Boards",
    category: "Decorative Panels",
    description: "Curated decorative boards and textured surface options prepared for kitchens, wardrobes, wall panels, and full interior fit-outs.",
    heroImage: "/images/service-interior.jpg",
    howItIsMade: {
      description: "Signature boards are crafted using sustainable wood fibres and high-pressure decorative laminates for a long-lasting finish.",
      videoUrl: "",
    },
    downloads: [
      { label: "Signature Guide", url: "#" },
    ],
    techSpecs: [
      { label: "Use", value: "Interior joinery" },
      { label: "Thickness", value: "18mm" },
    ],
    swatches: [
      { name: "Warm Oak", image: "/images/prod-wardrobe.jpg", look: "Woodgrain", finish: "Natural Woodgrain", category: "Woodgrains" },
      { name: "Stone Grey", image: "/images/service-arch.jpg", look: "Stone", finish: "Textured Stone", category: "Stones & Structure" },
    ],
    profiles: [],
  },
  {
    title: "Architectural Surfaces",
    category: "Premium Finishes",
    description: "Surface options selected for durability, clean detailing, and a premium modern home experience.",
    heroImage: "/images/service-arch.jpg",
    techSpecs: [
      { label: "Finish", value: "Textured" },
      { label: "Application", value: "Vertical surfaces" },
    ],
    swatches: [
      { name: "Carbon Black", image: "/images/prod-tv.jpg", look: "Exhilaration", finish: "Smooth Matt", category: "Solid Colours" },
      { name: "Ivory Silk", image: "/images/service-interior.jpg", look: "Bliss", finish: "Silk Matt", category: "Solid Colours" },
    ],
    profiles: [],
  },
];

async function seedMaterials() {
  console.log('🌱 Seeding MaterialRange data...');
  await connectDB();

  await MaterialRange.deleteMany({});
  const inserted = await MaterialRange.insertMany(materialRanges);

  console.log(`✅ Seeded ${inserted.length} material ranges successfully!`);
  inserted.forEach((r) => console.log(`   → ${r.title} (${r._id})`));
  process.exit(0);
}

seedMaterials().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
