export type LookGalleryImage = {
  image?: string;
  alt?: string;
  caption?: string;
};

export type LookCategory = {
  name?: string;
  slug?: string;
  description?: string;
  coverImage?: string;
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
        gallery: [{ image: "/images/service-kitchen.jpg" }, { image: "/images/prod-tv.jpg" }],
      },
      {
        name: "Arden and Iceberg White",
        slug: "arden-iceberg-white",
        coverImage: "/images/prod-wardrobe.jpg",
        description: "Warm wood detail balanced with crisp white surfaces.",
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
        gallery: [{ image: "/images/prod-tv.jpg" }, { image: "/images/projects-hero.jpg" }],
      },
    ],
  },
];
