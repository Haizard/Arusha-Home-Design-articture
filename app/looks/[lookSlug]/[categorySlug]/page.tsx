import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Images, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { getLookBySlug } from "@/app/actions/looks";
import { fallbackLooks, getSlug, isUsableImageSrc, type LookItem } from "@/lib/lookFallbacks";
import LookDesignPreview from "@/components/looks/LookDesignPreview";

export default async function LookCategoryPage({
  params,
}: {
  params: Promise<{ lookSlug: string; categorySlug: string }>;
}) {
  const { lookSlug, categorySlug } = await params;
  const cmsLook = (await getLookBySlug(lookSlug).catch(() => null)) as LookItem | null;
  const look = cmsLook ?? fallbackLooks.find((item) => getSlug(item.name, item.slug) === lookSlug);
  const category = look?.categories?.find((item) => getSlug(item.name, item.slug) === categorySlug);

  if (!look || !category) notFound();

  const fallbackImage = isUsableImageSrc(category.coverImage)
    ? category.coverImage
    : isUsableImageSrc(look.coverImage)
      ? look.coverImage
      : "/images/service-kitchen.jpg";
  const gallery = (category.gallery ?? []).filter((item) => isUsableImageSrc(item.image));
  const leadImage = gallery[0]?.image || fallbackImage;

  return (
    <main className="look-detail-page">
      <section className="look-detail-hero">
        <Image src={leadImage} alt={category.name || "Look gallery"} fill priority sizes="100vw" />
        <div className="looks-hero-overlay" />
        <div className="looks-shell look-detail-copy">
          <Link href={`/looks/${lookSlug}`} className="material-look-back">
            <ArrowLeft size={16} /> {look.name}
          </Link>
          <div>
            <p className="material-kicker">{look.name}</p>
            <h1>{category.name}</h1>
            <p>{category.description || look.description || "A curated material pairing gallery."}</p>
            <span><Images size={16} /> {gallery.length || 1} reference images</span>
          </div>
        </div>
      </section>

      <section className="looks-shell look-detail-specs">
        <div className="look-detail-spec-card">
          <p className="material-kicker">Colours & Designs Used</p>
          <h2>Design palette</h2>
          <LookDesignPreview designs={category.coloursDesignsUsed ?? []} fallbackImage={fallbackImage} />
        </div>
        <div className="look-detail-spec-card">
          <p className="material-kicker">Product Range</p>
          <h2>Applicable products</h2>
          <div className="look-detail-chip-list">
            {(category.productRange?.length ? category.productRange : ["Add product ranges from the CMS"]).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="looks-shell look-detail-gallery">
        <div className="material-section-heading compact">
          <div>
            <p className="material-kicker">Gallery</p>
            <h2>{category.name} references</h2>
          </div>
          <p><Sparkles size={15} /> {look.name}</p>
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
