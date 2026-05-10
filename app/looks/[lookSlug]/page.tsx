import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Images, Palette } from "lucide-react";
import { notFound } from "next/navigation";
import { getLookBySlug } from "@/app/actions/looks";
import { fallbackLooks, getSlug, isUsableImageSrc, type LookItem } from "@/lib/lookFallbacks";

export default async function LookCategoriesPage({
  params,
}: {
  params: Promise<{ lookSlug: string }>;
}) {
  const { lookSlug } = await params;
  const cmsLook = (await getLookBySlug(lookSlug).catch(() => null)) as LookItem | null;
  const look = cmsLook ?? fallbackLooks.find((item) => getSlug(item.name, item.slug) === lookSlug);

  if (!look) notFound();

  const categories = look.categories ?? [];
  const heroImage = isUsableImageSrc(look.coverImage)
    ? look.coverImage
    : categories.find((category) => isUsableImageSrc(category.coverImage))?.coverImage || "/images/service-kitchen.jpg";

  return (
    <main className="look-categories-page">
      <section className="look-categories-hero">
        <Image src={heroImage} alt={look.name || "Look categories"} fill priority sizes="100vw" />
        <div className="looks-hero-overlay" />
        <div className="looks-shell look-categories-copy">
          <Link href="/looks" className="material-look-back">
            <ArrowLeft size={16} /> All looks
          </Link>
          <div>
            <p className="material-kicker">Choose a Look</p>
            <h1>{look.name}</h1>
            <p>{look.description || "Open a colour and design category to view its gallery, product range, and materials used."}</p>
            <span><Images size={16} /> {categories.length} categories</span>
          </div>
        </div>
      </section>

      <section className="looks-shell look-categories-section">
        <div className="material-section-heading compact">
          <div>
            <p className="material-kicker">Categories</p>
            <h2>Open a colour pairing gallery.</h2>
          </div>
          <p>{look.name}</p>
        </div>

        <div className="look-category-card-grid">
          {categories.map((category) => {
            const categorySlug = getSlug(category.name, category.slug);
            const coverImage = isUsableImageSrc(category.coverImage)
              ? category.coverImage
              : category.gallery?.find((item) => isUsableImageSrc(item.image))?.image || heroImage;

            return (
              <Link key={categorySlug} href={`/looks/${lookSlug}/${categorySlug}`} className="look-category-page-card">
                <span className="look-category-page-image">
                  <Image src={coverImage} alt={category.name || "Look category"} fill sizes="(max-width: 900px) 100vw, 33vw" />
                </span>
                <span className="look-category-page-body">
                  <small><Palette size={14} /> {(category.coloursDesignsUsed ?? []).slice(0, 2).join(" / ") || "Colour pairing"}</small>
                  <strong>{category.name}</strong>
                  <em>{category.description || `${category.gallery?.length ?? 0} gallery references`}</em>
                  <b>Open gallery <ArrowRight size={14} /></b>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
