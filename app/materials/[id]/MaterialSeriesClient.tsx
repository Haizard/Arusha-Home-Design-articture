"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Boxes,
  Download,
  FileText,
  Grid3X3,
  Info,
  Layers3,
  Maximize2,
  Palette,
  Play,
  Ruler,
  Search,
  Sparkles,
  Video,
} from "lucide-react";
import ColorViewer from "@/components/materials/ColorViewer";

type Swatch = {
  name: string;
  image: string;
  category?: string;
  look?: string;
  brand?: string;
  finish?: string;
};

type TechSpec = {
  label?: string;
  value?: string;
};

type DownloadLink = {
  label: string;
  url: string;
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
  howItIsMade?: {
    description?: string;
    videoUrl?: string;
  };
  downloads?: DownloadLink[];
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

function getYouTubeEmbed(url: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
}

export default function MaterialSeriesClient({ range }: { range: MaterialRange }) {
  const swatches = (range.swatches ?? []).filter((swatch: Swatch) => isUsableImageSrc(swatch?.image) && swatch?.name);
  const cmsLookGroups = (range.lookGroups ?? []).filter((look) => look?.name);
  const lookGroups = cmsLookGroups;
  const [selectedColor, setSelectedColor] = useState<Swatch | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeLookGallery, setActiveLookGallery] = useState(() => lookGroups[0] ? getSlug(lookGroups[0].name, lookGroups[0].slug) : "");
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const swatchCategories = useMemo(() => {
    const cats = new Set(swatches.map(s => s.category || "General"));
    return ["All", ...Array.from(cats)].sort();
  }, [swatches]);

  const categorizedSwatches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = swatches.filter((swatch) => {
      const cat = swatch.category || "General";
      const matchesQuery = !normalizedQuery || [swatch.name, swatch.look, swatch.finish, swatch.brand, cat].filter(Boolean).join(" ").toLowerCase().includes(normalizedQuery);
      const matchesCategory = selectedCategory === "All" || cat === selectedCategory;
      return matchesQuery && matchesCategory;
    });

    const groups: Record<string, Swatch[]> = {};
    filtered.forEach((swatch) => {
      const cat = swatch.category || "General";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(swatch);
    });
    return groups;
  }, [query, swatches]);

  const activeGallery = lookGroups.find((look) => getSlug(look.name, look.slug) === activeLookGallery) ?? lookGroups[0];
  const lookCategories = activeGallery?.categories?.filter((category) => category?.name) ?? [];
  const heroImage = isUsableImageSrc(range.heroImage) ? range.heroImage : swatches[0]?.image || "/images/service-kitchen.jpg";
  const profiles = (range.profiles ?? []).filter(isUsableImageSrc);
  const rangeTitle = range.title || "Material range";
  const youtubeUrl = range.howItIsMade?.videoUrl ? getYouTubeEmbed(range.howItIsMade.videoUrl) : null;

  return (
    <main className="material-detail-platform">
      {/* Floating Quick Links */}
      <nav className="material-quick-links">
        <a href="#hero" className="material-quick-link">
            <Info size={20} />
            <span>Overview</span>
        </a>
        <a href="#looks" className="material-quick-link">
            <Maximize2 size={20} />
            <span>Gallery</span>
        </a>
        <a href="#swatches" className="material-quick-link">
            <Palette size={20} />
            <span>Swatches</span>
        </a>
        {range.downloads?.length ? (
            <a href="#downloads" className="material-quick-link">
                <Download size={20} />
                <span>Downloads</span>
            </a>
        ) : null}
      </nav>

      <section id="hero" className="material-detail-hero">
        <div className="material-detail-shell">
          <aside className="material-detail-sidebar">
            <Link href="/materials" className="material-back-link">
              <ArrowLeft size={16} /> Materials
            </Link>

            <div className="material-range-identity">
              {isUsableImageSrc(range.logo) ? (
                <span className="material-logo-frame">
                  <Image src={range.logo} alt={`${rangeTitle} logo`} fill sizes="80px" className="object-contain" />
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
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search color, category, finish" />
            </div>

            {swatchCategories.length > 2 && (
              <div className="material-category-filters">
                {swatchCategories.map(cat => (
                  <button 
                    key={cat} 
                    className={`material-cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            <div className="material-detail-stats">
              <div><Grid3X3 size={17} /><strong>{swatches.length}</strong><span>colors</span></div>
              <div><Ruler size={17} /><strong>{range.techSpecs?.length ?? 0}</strong><span>specs</span></div>
              <div><Boxes size={17} /><strong>{profiles.length}</strong><span>profiles</span></div>
            </div>
          </aside>

          <div className="material-detail-main">
            <nav className="material-tabs-nav">
                <button className={`material-tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Range Overview</button>
                {range.howItIsMade?.description && (
                    <button className={`material-tab-btn ${activeTab === 'made' ? 'active' : ''}`} onClick={() => setActiveTab('made')}>How it's Made</button>
                )}
                {range.techSpecs?.length ? (
                    <button className={`material-tab-btn ${activeTab === 'specs' ? 'active' : ''}`} onClick={() => setActiveTab('specs')}>Technical Data</button>
                ) : null}
                {range.downloads?.length ? (
                    <button className={`material-tab-btn ${activeTab === 'downloads' ? 'active' : ''}`} onClick={() => setActiveTab('downloads')}>Downloads</button>
                ) : null}
            </nav>

            <div className="material-tab-content">
                {activeTab === 'overview' && (
                    <div className="material-detail-preview">
                        <Image src={heroImage} alt={rangeTitle} fill priority sizes="(max-width: 960px) 100vw, 62vw" className="material-detail-hero-image" />
                        <div className="material-detail-preview-overlay" />
                        <div className="material-detail-copy">
                            <p className="material-kicker">Product range</p>
                            <h2>{rangeTitle}</h2>
                            <p>{range.description || "A curated material range with inspectable colors, profiles, and specification data."}</p>
                        </div>
                    </div>
                )}

                {activeTab === 'made' && (
                    <div className="material-text-block">
                        <p className="material-kicker"><Play size={14} /> Process</p>
                        <h2>Manufacturing excellence</h2>
                        <p>{range.howItIsMade?.description}</p>
                        {youtubeUrl && (
                            <div className="material-video-wrapper">
                                <iframe src={youtubeUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'specs' && (
                    <div className="material-spec-panel">
                        <h2>Specification table</h2>
                        <div className="material-spec-table">
                            {(range.techSpecs ?? []).map((spec, index) => (
                                <div key={`${spec.label}-${index}`}>
                                    <span>{spec.label}</span>
                                    <strong>{spec.value}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'downloads' && (
                    <div className="material-download-panel">
                        <h2>Brochures & Guides</h2>
                        <div className="material-download-list">
                            {(range.downloads ?? []).map((dl, index) => (
                                <a key={index} href={dl.url} className="material-download-item">
                                    <div>
                                        <strong>{dl.label}</strong>
                                        <small>PDF Document</small>
                                    </div>
                                    <FileText size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>
      </section>

      {lookGroups.length > 0 && (
        <section id="looks" className="material-look-gallery">
          <div className="material-section-heading compact">
            <div>
              <p className="material-kicker">Get inspired</p>
              <h2>Pairings & Applications</h2>
            </div>
            <p>Explore how {rangeTitle} looks in real-world settings.</p>
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
                  </button>
                );
              })}
            </div>

            <div className="material-look-categories">
                {lookCategories.map((category) => {
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
                        <strong>{category.name}</strong>
                        <em>{category.description || "View application gallery"}</em>
                      </span>
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      <section id="swatches" className="material-detail-content">
        <div className="material-section-heading compact">
          <div>
            <p className="material-kicker">Colour range</p>
            <h2>Explore swatches by family</h2>
          </div>
          <p>{swatches.length} colours total</p>
        </div>

        {Object.keys(categorizedSwatches).length > 0 ? (
          Object.entries(categorizedSwatches).map(([category, items]) => (
            <div key={category} className="material-swatch-category">
                <h3><Palette size={18} /> {category}</h3>
                <div className="material-detail-swatch-grid">
                    {items.map((swatch, index) => (
                    <button key={`${swatch.name}-${index}`} type="button" className="material-detail-swatch" onClick={() => setSelectedColor(swatch)}>
                        <span className="material-detail-swatch-image">
                            <Image src={swatch.image} alt={swatch.name} fill sizes="(max-width: 700px) 50vw, 25vw" />
                            <span><Sparkles size={15} /> Inspect</span>
                        </span>
                        <span className="material-detail-swatch-body">
                            <strong>{swatch.name}</strong>
                            <small>{swatch.finish || "Finish"}</small>
                        </span>
                    </button>
                    ))}
                </div>
            </div>
          ))
        ) : (
          <div className="material-empty-panel">
            <Info size={24} />
            <h3>No swatches match your search</h3>
          </div>
        )}
      </section>

      {selectedColor ? (
        <ColorViewer swatch={selectedColor} onClose={() => setSelectedColor(null)} />
      ) : null}
    </main>
  );
}

