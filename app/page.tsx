import { getLooks } from "@/app/actions/looks";
import { getMaterialRanges } from "@/app/actions/materials";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { fallbackLooks, getSlug, isUsableImageSrc, type LookItem } from "@/lib/lookFallbacks";
import type { MaterialRangeCard } from "@/components/materials/MaterialsHub";

const newsItems = [
  {
    title: "Designing beautiful homes around better surface choices",
    text: "A refined room starts with the boards, colours, textures, and product ranges that customers can actually compare.",
  },
  {
    title: "How material palettes guide kitchens and wardrobes",
    text: "Choose a look, open its combinations, then match the right range before moving into fabrication or installation.",
  },
  {
    title: "From inspiration to consultation",
    text: "Use the gallery pages to shortlist finishes, product applications, and reference images before requesting samples.",
  },
];

function imageOrFallback(value: unknown, fallback: string) {
  return isUsableImageSrc(value) ? value : fallback;
}

export default async function HomePage() {
  const [cmsLooks, ranges] = await Promise.all([
    getLooks().catch(() => []),
    getMaterialRanges().catch(() => []),
  ]);
  const looks = (((cmsLooks as LookItem[]).length > 0 ? cmsLooks : fallbackLooks) as LookItem[]).slice(0, 4);
  const materialRanges = (ranges as MaterialRangeCard[]).slice(0, 5);

  return (
    <div className="pg-home">
      <section className="pg-hero" style={{ height: '100vh', padding: 0 }}>
        <Image src="/images/service-kitchen.jpg" alt="Premium kitchen surface" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        <div className="pg-hero-shade" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)' }} />
        <div className="pg-shell pg-hero-content">
          <h1>Designing Spaces<br />That Inspire &<br />Endure</h1>
          <Link href="/looks" className="pg-outline-button" style={{ width: 'fit-content' }}>Schedule a Free Consultation</Link>
        </div>
      </section>

      <section className="pg-section" style={{ background: 'white' }}>
        <div className="pg-shell">
          <div className="pg-intro-box">
            <h2>Beautiful Spaces Start Here</h2>
            <p>
              A thoughtful home begins with surfaces people can see, touch, compare, and imagine in real rooms. Choose an inspiration look, inspect the colours and designs used.
            </p>
          </div>
        </div>
      </section>

      <section className="pg-section">
        <div className="pg-shell">
          <div className="pg-portfolio-header" style={{ marginBottom: '4rem' }}>
            <p className="pg-gold-label">Our Portfolio</p>
            <h2 className="pg-heading-lg">Pioneering Design & Inspiration</h2>
            <p className="pg-sub-text">
              Explore our selected looks that demonstrate our commitment to design excellence, innovation, and client satisfaction.
            </p>
          </div>

          <div className="pg-portfolio-grid-v3">
            {looks.map((look) => {
              const lookSlug = getSlug(look.name, look.slug);
              const image = imageOrFallback(look.coverImage, "/images/service-interior.jpg");
              return (
                <Link href={`/looks/${lookSlug}`} key={lookSlug} className="pg-portfolio-card-v3">
                  <Image src={image} alt={look.name || "Look"} fill />
                  <div className="pg-portfolio-label-v3">{look.name}</div>
                </Link>
              );
            })}
          </div>
          <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}>
            <Link href="/looks" className="pg-outline-button dark">See More Projects</Link>
          </div>
        </div>
      </section>

      <section className="pg-section-dark">
        <div className="pg-shell pg-about-grid">
          <div className="pg-about-copy">
            <p>Arusha Home</p>
            <h2>About Us</h2>
            <p>
              We believe architecture and interiors are more than just buildings; it's about creating environments that enhance human experience and bring clarity to your living space.
            </p>
            <div className="pg-brand-logos" style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', opacity: 0.4, fontWeight: 900, fontSize: '0.8rem' }}>
              <span>CNBC</span>
              <span>OFFICERND</span>
              <span>ARCONIC</span>
            </div>
            <Link href="/about" className="pg-outline-button dark" style={{ marginTop: '2.5rem' }}>Discover More</Link>
          </div>
          <div className="pg-stats-grid">
            <div className="pg-stat-item">
              <h3>10+</h3>
              <p>Years of Excellence</p>
            </div>
            <div className="pg-stat-item">
              <h3>500+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="pg-stat-item">
              <h3>98%</h3>
              <p>Satisfaction Rate</p>
            </div>
            <div className="pg-stat-item">
              <h3>15+</h3>
              <p>Countries Served</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pg-section">
        <div className="pg-shell">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <div>
              <p className="pg-gold-label">Explore</p>
              <h2 className="pg-heading-lg">Our Product Ranges</h2>
            </div>
          </div>

          <div className="pg-range-grid-v3">
            {(materialRanges.length > 0 ? materialRanges : [
              { title: "Arch Design", description: "From initial concept development and schematic design to final execution.", img: "/images/service-arch.jpg" },
              { title: "Interior Design", description: "Creating cohesive interior spaces that reflect your unique style.", img: "/images/service-interior.jpg" },
              { title: "Urban Planning", description: "Designing the spaces between buildings and outdoors.", img: "/images/service-planning.jpg" },
              { title: "Project Manage", description: "Overseeing & control the entire construction process.", img: "/images/team-4.jpg" }
            ]).slice(0, 4).map((item: any, idx) => (
              <Link key={item.title} href="/materials" className="pg-range-card-v3">
                <div className="pg-range-image-v3">
                  <span style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 2, color: 'white', fontWeight: 900, fontSize: '0.8rem' }}>0{idx + 1}</span>
                  <Image src={item.img || imageOrFallback(item.heroImage || item.swatches?.[0]?.image, "/images/prod-wardrobe.jpg")} alt={item.title} fill />
                </div>
                <h3>{item.title}</h3>
                <p>
                  {item.description ? (item.description.length > 100 ? item.description.slice(0, 100) + "..." : item.description) : "Premium surface solutions and interior finishes for modern homes."}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pg-section" style={{ background: 'var(--glass-bg)' }}>
        <div className="pg-shell" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: '2.5rem', overflow: 'hidden' }}>
            <Image src="/images/projects-hero.jpg" alt="Expression gallery" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="pg-expression-copy">
            <p className="pg-gold-label">Gallery 5</p>
            <h2 className="pg-heading-lg" style={{ margin: '1rem 0' }}>Expressions</h2>
            <p className="pg-sub-text" style={{ marginBottom: '2rem' }}>
              Browse colours, designs, and product applications that help customers feel the mood of a room before choosing what to build.
            </p>
            <Link href="/looks" className="pg-outline-button dark">View Looks</Link>
          </div>
        </div>
      </section>

      <section className="pg-section">
        <div className="pg-shell">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <div>
              <p className="pg-gold-label">Arusha Home</p>
              <h2 className="pg-heading-lg">Blogs & News</h2>
            </div>
            <Link href="/about" className="pg-outline-button dark">View All</Link>
          </div>
          <div className="pg-news-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {newsItems.map((item) => (
              <article key={item.title} className="pg-news-card-v2" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', padding: '3rem', borderRadius: '2rem', border: '1px solid var(--glass-border)', boxShadow: '0 15px 40px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '1.5rem', color: 'var(--color-stone-100)' }}>{item.title}</h3>
                <p style={{ color: 'var(--color-stone-400)', lineHeight: 1.6, marginBottom: '2.5rem' }}>{item.text}</p>
                <Link href="/contact" style={{ color: 'var(--color-stone-100)', display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', fontWeight: 800 }}>
                  Read More <ArrowRight size={17} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
