"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Building2,
  Layers3,
  Palette,
  Play,
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

const looks = [
  {
    title: "Bliss",
    description: "Softer hues and simpler designs reflecting light in a gentler way, bathing any space in a sense of calm.",
    image: "/images/service-kitchen.jpg",
    slug: "bliss"
  },
  {
    title: "Delight",
    description: "Combinations of colours and designs inspired by nature, bringing surprise and creative spirit.",
    image: "/images/service-interior.jpg",
    slug: "delight"
  },
  {
    title: "Ecstasy",
    description: "An eclectic range of designs and textures bringing energy and vibrancy to your space.",
    image: "/images/projects-hero.jpg",
    slug: "ecstasy"
  },
  {
    title: "Exhilaration",
    description: "Bold colour and sophisticated designs that bring a sense of unbridled joy to your space.",
    image: "/images/prod-tv.jpg",
    slug: "exhilaration"
  }
];

function materialHref(range: MaterialRangeCard) {
  return range._id ? `/materials/${range._id}` : "/materials";
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
          <p>{range.description || "Explore finishes, technical specifications, swatches, and profiles."}</p>
        </div>
        <div className="material-card-footer">
          <div className="material-mini-swatches">
            {swatches.map((swatch, index) => (
                <span key={`${swatch.image}-${index}`}>
                    <Image src={swatch.image || "/images/prod-tv.jpg"} alt="" fill sizes="32px" />
                </span>
            ))}
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
  const materialRanges = ranges;
  const featured = materialRanges.slice(0, 2);
  const rest = materialRanges.slice(2);

  return (
    <div className="materials-platform">
      {!compact && (
        <>
          <section className="hub-hero">
            <div className="hub-hero-bg">
                <Image src="/images/service-kitchen.jpg" alt="Interior Design" fill priority className="object-cover" />
            </div>
            <div className="hub-hero-overlay" />
            <div className="hub-hero-content">
                <p className="material-kicker" style={{ color: '#fff' }}>Arusha Architecture Platform</p>
                <h1>Beautiful Spaces Start Here</h1>
                <p>Inspiring designs, premium materials, and professional architectural tools to bring your vision to life.</p>
                <div className="materials-hero-actions">
                    <Link href="#ranges" className="materials-primary-action">Explore Ranges <ArrowRight size={18} /></Link>
                    <Link href="/projects" className="materials-secondary-action" style={{ color: '#fff', borderColor: '#fff' }}>Project Gallery</Link>
                </div>
            </div>
          </section>

          <section className="hub-looks-section">
            <div className="container">
                <div className="material-section-heading">
                    <div>
                        <p className="material-kicker">Get Inspired</p>
                        <h2>Choose a Look</h2>
                    </div>
                    <p>Start your design journey by exploring curated palettes and application styles.</p>
                </div>
                <div className="hub-looks-grid">
                    {looks.map((look) => (
                        <Link key={look.slug} href={`/materials`} className="hub-look-card">
                            <Image src={look.image} alt={look.title} fill sizes="(max-width: 1100px) 50vw, 25vw" />
                            <div className="hub-look-overlay" />
                            <div className="hub-look-body">
                                <h3>{look.title}</h3>
                                <p>{look.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
          </section>

          <section className="hub-ranges-strip">
            <div className="container">
                <div className="hub-ranges-grid">
                    {materialRanges.map((range) => (
                        <Link key={range._id} href={materialHref(range)} className="hub-range-link">
                            {range.logo ? (
                                <Image src={range.logo} alt={range.title || ""} width={120} height={40} className="hub-range-logo" />
                            ) : (
                                <span className="hub-range-logo" style={{ fontSize: '1rem', fontWeight: 800 }}>{range.title}</span>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
          </section>
        </>
      )}

      <section id="ranges" className="materials-showcase" style={{ padding: compact ? '2rem 0' : '6rem 0' }}>
        <div className="container">
            <div className="material-section-heading">
                <div>
                    <p className="material-kicker">Curated Materials</p>
                    <h2>Our Product Ranges</h2>
                </div>
                {!compact && <p>Browse our extensive collection of decorative panels, finishes, and worktops.</p>}
            </div>

            <div className="materials-feature-grid">
                {featured.map((range, index) => (
                    <RangeCard key={range._id || index} range={range} featured />
                ))}
            </div>

            {rest.length > 0 && (
                <div className="materials-range-grid">
                    {rest.map((range, index) => (
                        <RangeCard key={range._id || index} range={range} />
                    ))}
                </div>
            )}
        </div>
      </section>

      {!compact && (
        <section className="materials-secondary-band">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                <div>
                    <p className="material-kicker">Joinery & Interiors</p>
                    <h2>Ready to specify for your next project?</h2>
                </div>
                <div className="materials-secondary-links">
                    <Link href="/products" className="materials-primary-action">View House Plans</Link>
                    <Link href="/contact" className="materials-secondary-action">Contact Specialist</Link>
                </div>
            </div>
        </section>
      )}
    </div>
  );
}

