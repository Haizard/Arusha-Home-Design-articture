"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Boxes,
  Grid3X3,
  Info,
  Layers3,
  Palette,
  Ruler,
  Search,
  Sparkles,
} from "lucide-react";
import ColorViewer from "@/components/materials/ColorViewer";

type Swatch = {
  name: string;
  image: string;
  look?: string;
  brand?: string;
  finish?: string;
};

type TechSpec = {
  label?: string;
  value?: string;
};

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

type MaterialRange = {
  _id?: string;
  title?: string;
  category?: string;
  description?: string;
  logo?: string;
  heroImage?: string;
  techSpecs?: TechSpec[];
  swatches?: Swatch[];
  lookGroups?: LookGroup[];
  profiles?: string[];
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

export default function MaterialSeriesClient({ range }: { range: MaterialRange }) {
  const swatches = (range.swatches ?? []).filter((swatch: Swatch) => isUsableImageSrc(swatch?.image) && swatch?.name);
  const lookGroups = (range.lookGroups ?? []).filter((look) => look?.name);
  const [selectedColor, setSelectedColor] = useState<Swatch | null>(null);
  const [activeLook, setActiveLook] = useState("All");
  const [activeLookGallery, setActiveLookGallery] = useState(() => getSlug(lookGroups[0]?.name, lookGroups[0]?.slug));
  const [query, setQuery] = useState("");

  const looks = useMemo(() => {
    const values = swatches.map((swatch: Swatch) => swatch.look || swatch.finish || "Other");
    return ["All", ...Array.from(new Set<string>(values))];
  }, [swatches]);

  const filteredSwatches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return swatches.filter((swatch: Swatch) => {
      const look = swatch.look || swatch.finish || "Other";
      const haystack = [swatch.name, swatch.look, swatch.finish, swatch.brand].filter(Boolean).join(" ").toLowerCase();

      if (activeLook !== "All" && look !== activeLook) return false;
      if (normalizedQuery && !haystack.includes(normalizedQuery)) return false;
      return true;
    });
  }, [activeLook, query, swatches]);

  const activeGallery = lookGroups.find((look) => getSlug(look.name, look.slug) === activeLookGallery) ?? lookGroups[0];
  const lookCategories = activeGallery?.categories?.filter((category) => category?.name) ?? [];
  const heroImage = isUsableImageSrc(range.heroImage) ? range.heroImage : swatches[0]?.image || "/images/service-kitchen.jpg";
  const firstSpecs = (range.techSpecs ?? []).slice(0, 4);
  const profiles = (range.profiles ?? []).filter(isUsableImageSrc);
  const rangeTitle = range.title || "Material range";

  return (
    <main className="material-detail-platform">
      <section className="material-detail-hero">
        <div className="material-detail-shell">
          <aside className="material-detail-sidebar">
            <Link href="/materials" className="material-back-link">
              <ArrowLeft size={16} /> Materials
            </Link>

            <div className="material-range-identity">
              {isUsableImageSrc(range.logo) ? (
                <span>
                  <Image src={range.logo} alt={`${rangeTitle} logo`} fill sizes="80px" />
                </span>
              ) : (
                <span className="material-logo-fallback">{String(range.title || "M").slice(0, 2)}</span>
              )}
              <div>
                  <p>{range.category || "Material range"}</p>
                  <h1>{rangeTitle}</h1>
              </div>
            </div>

            <div className="material-detail-search">
              <Search size={16} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search color, look, finish" />
            </div>

            <div className="material-look-list">
              {looks.map((look) => (
                <button key={look} type="button" className={activeLook === look ? "active" : ""} onClick={() => setActiveLook(look)}>
                  <Palette size={15} />
                  {look}
                </button>
              ))}
            </div>

            <div className="material-detail-stats">
              <div><Grid3X3 size={17} /><strong>{swatches.length}</strong><span>swatches</span></div>
              <div><Ruler size={17} /><strong>{range.techSpecs?.length ?? 0}</strong><span>specs</span></div>
              <div><Boxes size={17} /><strong>{profiles.length}</strong><span>profiles</span></div>
            </div>
          </aside>

          <div className="material-detail-main">
            <div className="material-detail-preview">
              <Image src={heroImage} alt={rangeTitle} fill priority sizes="(max-width: 960px) 100vw, 62vw" className="material-detail-hero-image" />
              <div className="material-detail-preview-overlay" />
              <div className="material-detail-copy">
                <p className="material-kicker">Range overview</p>
                <h2>{rangeTitle}</h2>
                <p>{range.description || "A curated material range with inspectable colors, profiles, and specification data for interior design decisions."}</p>
              </div>
              <div className="material-floating-spec">
                <BadgeCheck size={18} />
                <div>
                  <strong>Specification ready</strong>
                  <span>Compare color, finish, profile, and use case before customer consultation.</span>
                </div>
              </div>
            </div>

            {firstSpecs.length > 0 ? (
              <div className="material-spec-strip">
                {firstSpecs.map((spec: TechSpec, index: number) => (
                  <div key={`${spec.label}-${index}`}>
                    <span>{spec.label}</span>
                    <strong>{spec.value}</strong>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {lookGroups.length > 0 ? (
        <section className="material-look-gallery">
          <div className="material-section-heading compact">
            <div>
              <p className="material-kicker">Choose a look</p>
              <h2>Start with a mood, then open the exact colour pairing.</h2>
            </div>
            <p>{lookGroups.length} curated looks managed from the admin CMS</p>
          </div>

          <div className="material-look-workbench">
            <div className="material-look-rail">
              {lookGroups.map((look) => {
                const lookSlug = getSlug(look.name, look.slug);
                const coverImage = isUsableImageSrc(look.coverImage)
                  ? look.coverImage
                  : look.categories?.find((category) => isUsableImageSrc(category.coverImage))?.coverImage || heroImage;

                return (
                  <button
                    key={lookSlug}
                    type="button"
                    className={activeLookGallery === lookSlug ? "active" : ""}
                    onClick={() => setActiveLookGallery(lookSlug)}
                  >
                    <span>
                      <Image src={coverImage} alt={look.name || "Material look"} fill sizes="88px" />
                    </span>
                    <strong>{look.name}</strong>
                    <small>{look.categories?.length ?? 0} combinations</small>
                  </button>
                );
              })}
            </div>

            <div className="material-look-categories">
              {lookCategories.length > 0 ? (
                lookCategories.map((category) => {
                  const lookSlug = getSlug(activeGallery?.name, activeGallery?.slug);
                  const categorySlug = getSlug(category.name, category.slug);
                  const coverImage = isUsableImageSrc(category.coverImage)
                    ? category.coverImage
                    : category.gallery?.find((image) => isUsableImageSrc(image.image))?.image || heroImage;

                  return (
                    <Link
                      key={`${lookSlug}-${categorySlug}`}
                      href={`/materials/${range._id}/looks/${lookSlug}/${categorySlug}`}
                      className="material-look-category-card"
                    >
                      <span className="material-look-category-image">
                        <Image src={coverImage} alt={category.name || "Look category"} fill sizes="(max-width: 900px) 100vw, 28vw" />
                      </span>
                      <span className="material-look-category-body">
                        <small>{activeGallery?.name}</small>
                        <strong>{category.name}</strong>
                        <em>{category.description || `${category.gallery?.length ?? 0} gallery images`}</em>
                      </span>
                    </Link>
                  );
                })
              ) : (
                <div className="material-empty-panel">
                  <Info size={24} />
                  <h3>No combinations added for this look</h3>
                  <p>Add categories and gallery images from the admin materials editor.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      ) : null}

      <section className="material-detail-content">
        <div className="material-section-heading compact">
          <div>
            <p className="material-kicker">Color range</p>
            <h2>Inspect every swatch like a product.</h2>
          </div>
          <p>{filteredSwatches.length} colors shown</p>
        </div>

        {filteredSwatches.length > 0 ? (
          <div className="material-detail-swatch-grid">
            {filteredSwatches.map((swatch: Swatch, index: number) => (
              <button key={`${swatch.name}-${index}`} type="button" className="material-detail-swatch" onClick={() => setSelectedColor(swatch)}>
                <span className="material-detail-swatch-image">
                  <Image src={swatch.image} alt={swatch.name} fill sizes="(max-width: 700px) 50vw, (max-width: 1100px) 25vw, 18vw" />
                  <span><Sparkles size={15} /> Inspect</span>
                </span>
                <span className="material-detail-swatch-body">
                  <strong>{swatch.name}</strong>
                  <small>{swatch.look || swatch.finish || "Material finish"}</small>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="material-empty-panel">
            <Info size={24} />
            <h3>No swatches match this filter</h3>
            <p>Clear the search or choose another look category.</p>
          </div>
        )}
      </section>

      {(range.techSpecs?.length ?? 0) > 0 || profiles.length > 0 ? (
        <section className="material-detail-bottom">
          <div className="material-spec-panel">
            <div>
              <p className="material-kicker">Technical data</p>
              <h2>Specification table</h2>
            </div>
            <div className="material-spec-table">
              {(range.techSpecs ?? []).map((spec: TechSpec, index: number) => (
                <div key={`${spec.label}-${index}`}>
                  <span>{spec.label}</span>
                  <strong>{spec.value}</strong>
                </div>
              ))}
            </div>
          </div>

          {profiles.length > 0 ? (
            <div className="material-profile-panel">
              <div>
                <p className="material-kicker">Profiles</p>
                <h2>Edge and section previews</h2>
              </div>
              <div className="material-profile-grid">
                {profiles.map((profile: string, index: number) => (
                  <div key={`${profile}-${index}`}>
                    <Image src={profile} alt={`${rangeTitle} profile ${index + 1}`} fill sizes="(max-width: 900px) 50vw, 20vw" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="material-profile-panel empty">
              <Layers3 size={24} />
              <h2>Profiles can be added from the admin dashboard.</h2>
            </div>
          )}
        </section>
      ) : null}

      {selectedColor ? (
        <ColorViewer swatch={selectedColor} onClose={() => setSelectedColor(null)} />
      ) : null}
    </main>
  );
}
