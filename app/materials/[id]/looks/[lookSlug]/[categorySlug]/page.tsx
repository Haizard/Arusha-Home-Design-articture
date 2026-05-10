import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Images, Palette } from "lucide-react";
import { notFound } from "next/navigation";
import { getMaterialRange } from "@/app/actions/materials";

type LookGalleryImage = {
  image?: string;
  alt?: string;
  caption?: string;
};

type LookCategory = {
  name?: string;
  slug?: string;
  description?: string;
  coverImage?: string;
  gallery?: LookGalleryImage[];
};

type LookGroup = {
  name?: string;
  slug?: string;
  description?: string;
  coverImage?: string;
  categories?: LookCategory[];
};

type MaterialLookRange = {
  _id?: string;
  title?: string;
  category?: string;
  description?: string;
  heroImage?: string;
  lookGroups?: LookGroup[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getSlug(name?: string, slug?: string) {
  return slug?.trim() || slugify(name || "look");
}

function isUsableImageSrc(src: unknown): src is string {
  if (typeof src !== "string") return false;
  const value = src.trim();
  return (
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:image/")
  );
}

export default async function MaterialLookCategoryPage({
  params,
}: {
  params: Promise<{ id: string; lookSlug: string; categorySlug: string }>;
}) {
  const { id, lookSlug, categorySlug } = await params;
  const range = (await getMaterialRange(id)) as MaterialLookRange | null;

  if (!range) notFound();

  const look = range.lookGroups?.find((item) => getSlug(item.name, item.slug) === lookSlug);
  const category = look?.categories?.find((item) => getSlug(item.name, item.slug) === categorySlug);

  if (!look || !category) notFound();

  const fallbackImage = isUsableImageSrc(category.coverImage)
    ? category.coverImage
    : isUsableImageSrc(look.coverImage)
      ? look.coverImage
      : isUsableImageSrc(range.heroImage)
        ? range.heroImage
        : "/images/service-kitchen.jpg";
  const gallery = (category.gallery ?? []).filter((item) => isUsableImageSrc(item.image));
  const leadImage = gallery[0]?.image || fallbackImage;

  return (
    <main className="material-look-page">
      <section className="material-look-page-hero">
        <Image src={leadImage} alt={category.name || "Material look"} fill priority sizes="100vw" />
        <div className="material-look-page-overlay" />
        <div className="material-look-page-shell">
          <Link href={`/materials/${id}`} className="material-look-back">
            <ArrowLeft size={16} /> Back to {range.title || "materials"}
          </Link>
          <div className="material-look-page-copy">
            <p className="material-kicker">{look.name}</p>
            <h1>{category.name}</h1>
            <p>{category.description || look.description || "A curated material pairing with gallery references managed from the admin CMS."}</p>
            <div className="material-look-page-stats">
              <span><Palette size={16} /> {range.category || "Material range"}</span>
              <span><Images size={16} /> {gallery.length || 1} images</span>
            </div>
          </div>
        </div>
      </section>

      <section className="material-look-page-gallery">
        <div className="material-section-heading compact">
          <div>
            <p className="material-kicker">Gallery</p>
            <h2>{category.name} references</h2>
          </div>
          <p>{range.title || "Material"} / {look.name}</p>
        </div>

        <div className="material-look-page-grid">
          {(gallery.length > 0 ? gallery : [{ image: fallbackImage, alt: category.name }]).map((item, index) => (
            <figure key={`${item.image}-${index}`} className={index === 0 ? "featured" : ""}>
              <Image
                src={item.image || fallbackImage}
                alt={item.alt || category.name || `Gallery image ${index + 1}`}
                fill
                sizes={index === 0 ? "(max-width: 900px) 100vw, 58vw" : "(max-width: 900px) 100vw, 30vw"}
              />
              {item.caption ? <figcaption>{item.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
