export type LookGalleryImage = {
  image?: string;
  alt?: string;
  caption?: string;
};

export type LookDesign = {
  name?: string;
  image?: string;
  finish?: string;
  productRange?: string;
};

export type LookCategory = {
  name?: string;
  slug?: string;
  description?: string;
  coverImage?: string;
  coloursDesignsUsed?: LookDesign[];
  productRange?: string[];
  gallery?: LookGalleryImage[];
};

export type LookItem = {
  _id?: string;
  name?: string;
  slug?: string;
  description?: string;
  coverImage?: string;
  categories?: LookCategory[];
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getSlug(name?: string, slug?: string) {
  return slug?.trim() || slugify(name || "look");
}

export function isUsableImageSrc(src: unknown): src is string {
  if (typeof src !== "string") return false;
  const value = src.trim();
  return (
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:image/")
  );
}

export const fallbackLooks: LookItem[] = [
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
        coloursDesignsUsed: [
          { name: "Iceberg White", image: "/images/service-kitchen.jpg", finish: "Soft matte", productRange: "Decorative boards" },
          { name: "Storm Grey", image: "/images/prod-tv.jpg", finish: "Cool neutral", productRange: "Kitchen cabinetry" },
        ],
        productRange: ["Decorative boards", "Kitchen cabinetry", "Wardrobe shutters"],
        gallery: [{ image: "/images/service-kitchen.jpg" }, { image: "/images/prod-tv.jpg" }],
      },
      {
        name: "Arden and Iceberg White",
        slug: "arden-iceberg-white",
        coverImage: "/images/prod-wardrobe.jpg",
        description: "Warm wood detail balanced with crisp white surfaces.",
        coloursDesignsUsed: [
          { name: "Arden woodgrain", image: "/images/prod-wardrobe.jpg", finish: "Woodgrain", productRange: "Wardrobes" },
          { name: "Iceberg White", image: "/images/service-interior.jpg", finish: "Matte", productRange: "Wall panels" },
        ],
        productRange: ["Wardrobes", "Wall panels", "Joinery boards"],
        gallery: [{ image: "/images/prod-wardrobe.jpg" }, { image: "/images/service-interior.jpg" }],
      },
    ],
  },
  {
    name: "Delight",
    slug: "delight",
    description: "Warmer combinations for expressive interiors and family spaces.",
    coverImage: "/images/service-interior.jpg",
    categories: [
      {
        name: "Natural Oak and Glacier",
        slug: "natural-oak-glacier",
          coverImage: "/images/service-interior.jpg",
          description: "A bright timber-led combination with light neutral panels.",
          coloursDesignsUsed: [
            { name: "Natural Oak", image: "/images/service-interior.jpg", finish: "Woodgrain", productRange: "Kitchen surfaces" },
            { name: "Glacier neutral", image: "/images/prod-bath.jpg", finish: "Light neutral", productRange: "Feature shelving" },
          ],
          productRange: ["Kitchen surfaces", "Living room storage", "Feature shelving"],
          gallery: [{ image: "/images/service-interior.jpg" }, { image: "/images/prod-bath.jpg" }],
        },
    ],
  },
  {
    name: "Exhilaration",
    slug: "exhilaration",
    description: "Bolder contrast stories for premium statement joinery.",
    coverImage: "/images/prod-tv.jpg",
    categories: [
      {
        name: "Graphite and Warm Walnut",
        slug: "graphite-warm-walnut",
          coverImage: "/images/prod-tv.jpg",
          description: "A darker premium pairing for media walls, feature storage, and suites.",
          coloursDesignsUsed: [
            { name: "Graphite", image: "/images/prod-tv.jpg", finish: "Deep matte", productRange: "Media units" },
            { name: "Warm Walnut", image: "/images/projects-hero.jpg", finish: "Woodgrain", productRange: "Feature wall panels" },
          ],
          productRange: ["Media units", "Premium cabinetry", "Feature wall panels"],
          gallery: [{ image: "/images/prod-tv.jpg" }, { image: "/images/projects-hero.jpg" }],
        },
    ],
  },
];
