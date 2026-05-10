import { getLooks } from "@/app/actions/looks";
import { getMaterialRanges } from "@/app/actions/materials";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      <section className="pg-hero">
        <Image src="/images/service-kitchen.jpg" alt="Premium kitchen surface" fill priority sizes="100vw" />
        <div className="pg-hero-shade" />
        <div className="pg-shell pg-hero-content">
          <div>
            <h1>Thinner.<br />Stronger.<br />More beautiful.</h1>
            <Link href="/looks" className="pg-outline-button">Choose a Look</Link>
          </div>
          <div className="pg-hero-controls">
            <span>01</span><b /><span>02</span><span>03</span><span>04</span>
          </div>
        </div>
      </section>

      <section className="pg-slim-banner">
        <Image src="/images/prod-tv.jpg" alt="Thin premium board sample" fill sizes="100vw" />
      </section>

      <section className="pg-shell pg-intro">
        <h2>Beautiful spaces start here</h2>
        <p>
          A thoughtful home begins with surfaces people can see, touch, compare, and imagine in real rooms. Choose an inspiration look, inspect the colours and designs used, then move into product ranges and consultation.
        </p>
      </section>

      <section className="pg-shell pg-look-section">
        <span className="pg-watermark">LOOK</span>
        <div className="pg-section-title inline">
          <p>Look</p>
          <h2>Choose a Look</h2>
        </div>
        <div className="pg-look-grid">
          {looks.map((look) => {
            const lookSlug = getSlug(look.name, look.slug);
            const image = imageOrFallback(look.coverImage, "/images/service-interior.jpg");
            return (
              <Link href={`/looks/${lookSlug}`} key={lookSlug} className="pg-look-card">
                <Image src={image} alt={look.name || "Look"} fill sizes="(max-width: 900px) 100vw, 38vw" />
                <span />
                <div>
                  <h3>{look.name}</h3>
                  <p>{look.description || "Open this look to explore its colour combinations and product galleries."}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="pg-about-band">
        <div className="pg-shell pg-about-grid">
          <div className="pg-story-card">
            <Image src="/images/about-hero.jpg" alt="Interior surface story" fill sizes="(max-width: 900px) 100vw, 48vw" />
            <div>The best stories are found in beautiful spaces.</div>
          </div>
          <div className="pg-about-copy">
            <p>Arusha Home</p>
            <h2>About us</h2>
            <p>
              We help customers move from inspiration to practical selections: looks, colours, product ranges, plans, projects, and consultation support for interiors that feel considered.
            </p>
            <Link href="/about" className="pg-outline-button dark">Discover More</Link>
            <span>ABOUT US</span>
          </div>
        </div>
      </section>

      <section className="pg-shell pg-ranges">
        <div className="pg-section-title">
          <p>Explore</p>
          <h2>Our product ranges</h2>
        </div>
        <div className="pg-range-strip">
          {materialRanges.length > 0 ? materialRanges.map((range) => (
            <Link key={range._id || range.title} href={range._id ? `/materials/${range._id}` : "/materials"} className="pg-range-card">
              <Image src={imageOrFallback(range.heroImage || range.swatches?.[0]?.image, "/images/prod-wardrobe.jpg")} alt={range.title || "Material range"} fill sizes="180px" />
              <span>{range.title}</span>
            </Link>
          )) : ["/images/prod-wardrobe.jpg", "/images/prod-tv.jpg", "/images/prod-bath.jpg", "/images/service-interior.jpg"].map((image, index) => (
            <Link key={image} href="/materials" className="pg-range-card">
              <Image src={image} alt={`Product range ${index + 1}`} fill sizes="180px" />
              <span>Range {index + 1}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="pg-expression">
        <div className="pg-expression-image">
          <Image src="/images/projects-hero.jpg" alt="Expression gallery" fill sizes="(max-width: 900px) 100vw, 48vw" />
        </div>
        <div className="pg-shell pg-expression-copy">
          <p>Gallery 5</p>
          <h2>Expressions</h2>
          <p>
            Browse colours, designs, and product applications that help customers feel the mood of a room before choosing what to build.
          </p>
          <Link href="/looks" className="pg-outline-button dark">View Looks</Link>
        </div>
      </section>

      <section className="pg-shell pg-news">
        <div className="pg-news-head">
          <div>
            <p>Arusha Home</p>
            <h2>Blogs & News</h2>
          </div>
          <Link href="/about" className="pg-outline-button dark">View All</Link>
        </div>
        <div className="pg-news-grid">
          {newsItems.map((item) => (
            <article key={item.title} className="pg-news-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link href="/contact" aria-label={item.title}><ArrowRight size={17} /></Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
