import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Building2,
  Layers3,
  Palette,
  Ruler,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  SwatchBook,
} from "lucide-react";

type TechSpec = {
  label?: string;
  value?: string;
};

type Swatch = {
  name?: string;
  image?: string;
  look?: string;
  brand?: string;
  finish?: string;
};

export type MaterialRangeCard = {
  _id?: string;
  title?: string;
  category?: string;
  description?: string;
  logo?: string;
  heroImage?: string;
  techSpecs?: TechSpec[];
  swatches?: Swatch[];
  profiles?: string[];
};

const fallbackMaterials: MaterialRangeCard[] = [
  {
    _id: "material-preview-1",
    title: "Signature Boards",
    category: "Decorative Panels",
    description: "Curated boards, textures, and finishes prepared for kitchens, wardrobes, wall panels, and interior fit-outs.",
    heroImage: "/images/service-kitchen.jpg",
    swatches: [
      { name: "Warm oak", image: "/images/prod-wardrobe.jpg", look: "Woodgrain" },
      { name: "Stone grey", image: "/images/prod-tv.jpg", look: "Stone" },
    ],
    techSpecs: [{ label: "Use", value: "Interior joinery" }],
  },
  {
    _id: "material-preview-2",
    title: "Architectural Surfaces",
    category: "Premium Finishes",
    description: "Surface options selected for durability, clean detailing, and a premium modern home experience.",
    heroImage: "/images/service-interior.jpg",
    swatches: [{ name: "Soft ash", image: "/images/prod-bath.jpg", look: "Matte" }],
    techSpecs: [{ label: "Finish", value: "Textured" }],
  },
];

function materialHref(range: MaterialRangeCard) {
  return range._id && !range._id.startsWith("material-preview-") ? `/materials/${range._id}` : "/materials";
}

function getTotalSwatches(ranges: MaterialRangeCard[]) {
  return ranges.reduce((total, range) => total + (range.swatches?.length ?? 0), 0);
}

function getHeroRange(ranges: MaterialRangeCard[]) {
  return ranges.find((range) => range.heroImage) ?? ranges[0];
}

function RangeCard({ range, featured = false }: { range: MaterialRangeCard; featured?: boolean }) {
  const swatches = range.swatches?.filter((swatch) => swatch.image).slice(0, 4) ?? [];

  return (
    <Link href={materialHref(range)} className={featured ? "material-feature-card" : "material-range-card"}>
      <div className="material-card-media">
        <Image
          src={range.heroImage || swatches[0]?.image || "/images/service-kitchen.jpg"}
          alt={range.title || "Material range"}
          fill
          sizes={featured ? "(max-width: 900px) 100vw, 48vw" : "(max-width: 900px) 100vw, 30vw"}
          className="material-card-image"
        />
        <div className="material-card-shade" />
        <span className="material-card-chip">{range.category || "Material range"}</span>
      </div>
      <div className="material-card-body">
        <div>
          <p className="material-card-eyebrow">{range.swatches?.length ?? 0} colors available</p>
          <h3>{range.title || "Untitled material range"}</h3>
          <p>{range.description || "Explore finishes, technical specifications, swatches, and profiles for this material range."}</p>
        </div>
        <div className="material-card-footer">
          <div className="material-mini-swatches" aria-hidden="true">
            {swatches.length > 0 ? (
              swatches.map((swatch, index) => (
                <span key={`${swatch.image}-${index}`}>
                  <Image src={swatch.image || "/images/prod-tv.jpg"} alt="" fill sizes="32px" />
                </span>
              ))
            ) : (
              ["/images/prod-wardrobe.jpg", "/images/prod-tv.jpg", "/images/prod-bath.jpg"].map((image) => (
                <span key={image}>
                  <Image src={image} alt="" fill sizes="32px" />
                </span>
              ))
            )}
          </div>
          <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}

export default function MaterialsHub({
  ranges,
  compact = false,
}: {
  ranges: MaterialRangeCard[];
  compact?: boolean;
}) {
  const materialRanges = ranges.length > 0 ? ranges : fallbackMaterials;
  const heroRange = getHeroRange(materialRanges);
  const featured = materialRanges.slice(0, 2);
  const rest = materialRanges.slice(2);
  const swatchTotal = getTotalSwatches(materialRanges);
  const previewSwatches = materialRanges.flatMap((range) => range.swatches ?? []).filter((swatch) => swatch.image).slice(0, 8);

  return (
    <main className={compact ? "materials-platform compact" : "materials-platform"}>
      {!compact ? (
        <section className="materials-command">
        <div className="materials-command-shell">
          <aside className="materials-side-panel">
            <Link href="/" className="materials-brand-lockup">
              <span>AH</span>
              <div>
                <strong>Arusha Materials</strong>
                <small>Interior surface platform</small>
              </div>
            </Link>

            <div className="materials-search-pill">
              <Search size={16} />
              <span>Search boards, colors, finishes</span>
            </div>

            <div className="materials-panel-group">
              <p>Core workflow</p>
              {[
                { icon: SwatchBook, label: "Material ranges", active: true },
                { icon: Palette, label: "Color swatches" },
                { icon: Ruler, label: "Technical specs" },
                { icon: Building2, label: "Project matching" },
              ].map((item) => (
                <div key={item.label} className={item.active ? "materials-panel-item active" : "materials-panel-item"}>
                  <item.icon size={17} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="materials-mini-stat accent">
              <Sparkles size={18} />
              <div>
                <strong>{swatchTotal || "40+"}</strong>
                <span>finish options</span>
              </div>
            </div>
          </aside>

          <div className="materials-main-stage">
            <div className="materials-topbar">
              <div className="materials-filter-cluster">
                <span><SlidersHorizontal size={15} /> Curated catalog</span>
                <span>Boards</span>
                <span>Profiles</span>
                <span>Interiors</span>
              </div>
              <Link href="/contact" className="materials-top-action">Request samples</Link>
            </div>

            <div className="materials-hero-grid">
              <div className="materials-hero-copy">
                <p className="material-kicker">Material first design platform</p>
                <h1>Choose the surface before the room takes shape.</h1>
                <p>
                  Browse boards, color families, finish textures, profiles, and specification details in one focused experience built around the materials customers need to compare.
                </p>
                <div className="materials-hero-actions">
                  <Link href="/materials" className="materials-primary-action">
                    Explore materials <ArrowRight size={17} />
                  </Link>
                  <Link href="/projects" className="materials-secondary-action">
                    See applications
                  </Link>
                </div>
              </div>

              <div className="materials-hero-visual">
                <Image
                  src={heroRange?.heroImage || "/images/service-kitchen.jpg"}
                  alt={heroRange?.title || "Featured material range"}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 46vw"
                  className="materials-hero-image"
                />
                <div className="materials-hero-card floating-one">
                  <Boxes size={18} />
                  <div>
                    <strong>{materialRanges.length}</strong>
                    <span>active ranges</span>
                  </div>
                </div>
                <div className="materials-hero-card floating-two">
                  <BadgeCheck size={18} />
                  <div>
                    <strong>{heroRange?.title || "Featured range"}</strong>
                    <span>{heroRange?.category || "Decorative panels"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="materials-metric-row">
              <div>
                <Layers3 size={18} />
                <strong>{materialRanges.length}</strong>
                <span>ranges</span>
              </div>
              <div>
                <Palette size={18} />
                <strong>{swatchTotal || "Ready"}</strong>
                <span>swatches</span>
              </div>
              <div>
                <ShieldCheck size={18} />
                <strong>Specs</strong>
                <span>included</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      ) : null}

      <section className="materials-showcase">
        <div className="material-section-heading">
          <div>
            <p className="material-kicker">Featured ranges</p>
            <h2>Material selection now leads the platform.</h2>
          </div>
          <p>
            The rest of the site remains available, but the main customer journey now starts with the surfaces and finishes that define kitchens, wardrobes, walls, and interiors.
          </p>
        </div>

        <div className="materials-feature-grid">
          {featured.map((range, index) => (
            <RangeCard key={range._id || range.title || index} range={range} featured />
          ))}
        </div>

        {rest.length > 0 ? (
          <div className="materials-range-grid">
            {rest.map((range, index) => (
              <RangeCard key={range._id || range.title || index} range={range} />
            ))}
          </div>
        ) : null}
      </section>

      <section className="materials-swatch-lab">
        <div className="material-section-heading compact">
          <div>
            <p className="material-kicker">Color lab</p>
            <h2>Swatches made visible before the detail page.</h2>
          </div>
          <Link href="/materials" className="materials-secondary-action">Open material library</Link>
        </div>

        <div className="materials-swatch-strip">
          {(previewSwatches.length > 0 ? previewSwatches : fallbackMaterials.flatMap((range) => range.swatches ?? [])).map((swatch, index) => (
            <div key={`${swatch.name}-${index}`} className="materials-swatch-tile">
              <div>
                <Image src={swatch.image || "/images/prod-tv.jpg"} alt={swatch.name || "Material swatch"} fill sizes="160px" />
              </div>
              <strong>{swatch.name || "Finish"}</strong>
              <span>{swatch.look || swatch.finish || "Surface sample"}</span>
            </div>
          ))}
        </div>
      </section>

      {!compact ? (
        <section className="materials-secondary-band">
          <div>
            <p className="material-kicker">Still available</p>
            <h2>Architecture, products, and projects support the material journey.</h2>
          </div>
          <div className="materials-secondary-links">
            <Link href="/products">House plans</Link>
            <Link href="/projects">Project gallery</Link>
            <Link href="/services">Studio services</Link>
            <Link href="/contact">Consultation</Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}
