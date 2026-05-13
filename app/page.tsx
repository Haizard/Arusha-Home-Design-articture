import { getLooks } from "@/app/actions/looks";
import { getMaterialRanges } from "@/app/actions/materials";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fallbackLooks, getSlug, isUsableImageSrc, type LookItem } from "@/lib/lookFallbacks";
import type { MaterialRangeCard } from "@/components/materials/MaterialsHub";

function imageOrFallback(value: unknown, fallback: string) {
  return isUsableImageSrc(value) ? value : fallback;
}

function rangeImage(range: MaterialRangeCard, fallback: string) {
  return imageOrFallback(range.heroImage || range.swatches?.find((swatch) => swatch.image)?.image, fallback);
}

export default async function HomePage() {
  const [cmsLooks, ranges] = await Promise.all([
    getLooks().catch(() => []),
    getMaterialRanges().catch(() => []),
  ]);

  const looks = (((cmsLooks as LookItem[]).length > 0 ? cmsLooks : fallbackLooks) as LookItem[]).slice(0, 4);
  const materialRanges = (ranges as MaterialRangeCard[]).filter((range) => range.heroImage || range.swatches?.some((swatch) => swatch.image));

  const featuredLook = looks[0];
  const featuredLookSlug = getSlug(featuredLook?.name, featuredLook?.slug);
  const lookCards = looks.slice(0, 4);
  const collectionCards = [
    {
      title: materialRanges[0]?.title || "Kitchen Studio",
      href: materialRanges[0]?._id ? `/materials/${materialRanges[0]._id}` : "/materials",
      image: materialRanges[0] ? rangeImage(materialRanges[0], "/images/service-kitchen.jpg") : "/images/service-kitchen.jpg",
    },
    {
      title: materialRanges[1]?.title || "Wardrobe Gallery",
      href: materialRanges[1]?._id ? `/materials/${materialRanges[1]._id}` : "/materials",
      image: materialRanges[1] ? rangeImage(materialRanges[1], "/images/prod-wardrobe.jpg") : "/images/prod-wardrobe.jpg",
    },
    {
      title: materialRanges[2]?.title || "Living Rooms",
      href: materialRanges[2]?._id ? `/materials/${materialRanges[2]._id}` : "/materials",
      image: materialRanges[2] ? rangeImage(materialRanges[2], "/images/prod-tv.jpg") : "/images/prod-tv.jpg",
    },
    {
      title: lookCards[1]?.name || "Bliss",
      href: `/looks/${getSlug(lookCards[1]?.name, lookCards[1]?.slug)}`,
      image: imageOrFallback(lookCards[1]?.coverImage, "/images/service-interior.jpg"),
    },
    {
      title: lookCards[2]?.name || "Delight",
      href: `/looks/${getSlug(lookCards[2]?.name, lookCards[2]?.slug)}`,
      image: imageOrFallback(lookCards[2]?.coverImage, "/images/projects-hero.jpg"),
    },
    {
      title: lookCards[3]?.name || "Exhilaration",
      href: `/looks/${getSlug(lookCards[3]?.name, lookCards[3]?.slug)}`,
      image: imageOrFallback(lookCards[3]?.coverImage, "/images/prod-bed.jpg"),
    },
  ];

  return (
    <div className="home-poliform">
      <section className="home-poliform-hero">
        <div className="home-poliform-shell">
          <div className="home-poliform-navline">
            <strong>Arusha Home</strong>
            <span>Materials</span>
            <span>Looks</span>
            <span>Projects</span>
          </div>

          <div className="home-poliform-hero-card">
            <Image src="/images/service-kitchen.jpg" alt="Contemporary interior" fill priority sizes="(max-width: 900px) 100vw, 1200px" />
            <div className="home-poliform-hero-overlay" />
            <h1>Contemporary</h1>
            <div className="home-poliform-hero-note">
              <p>Crafting spaces that harmonize modern architecture with timeless elegance, our contemporary interior designs breathe life into every room.</p>
              <Link href="/looks">View More <ArrowRight size={14} /></Link>
            </div>
            <div className="home-poliform-hero-mini">
              <Image src="/images/service-interior.jpg" alt="Interior preview" fill sizes="220px" />
            </div>
            <div className="home-poliform-ring">Modern Minimalist Modern Minimalist</div>
          </div>
        </div>
      </section>

      <section className="home-poliform-showcase home-poliform-shell">
        <div className="home-poliform-feature">
          <Image src="/images/service-interior.jpg" alt="Modern minimalist interior" fill sizes="(max-width: 900px) 100vw, 780px" />
          <span>Gorgeous Interior</span>
          <h2>Modern<br />Minimalist</h2>
        </div>
        <div className="home-poliform-side-stack">
          <div className="home-poliform-soft-card">
            <span>Aesthetic</span>
            <p>Aesthetic furniture where every piece tells a story of style</p>
            <h3>Into a gallery of elegance</h3>
          </div>
          <Link href="/products" className="home-poliform-small-image">
            <Image src="/images/prod-tv.jpg" alt="Best furniture" fill sizes="320px" />
            <span>Best Furniture</span>
            <strong>Indulge in the artistry of everyday living</strong>
            <i><ArrowRight size={18} /></i>
          </Link>
        </div>
      </section>

      <section className="home-poliform-stats home-poliform-shell" aria-label="Studio stats">
        <div><strong>500+</strong><span>Products</span></div>
        <div><strong>20+</strong><span>Projects</span></div>
        <div><strong>50+</strong><span>Satisfied Customers</span></div>
        <div><strong>1st</strong><span>Top in Arusha</span></div>
      </section>

      <section className="home-poliform-story home-poliform-shell">
        <div className="home-poliform-story-image">
          <Image src="/images/projects-hero.jpg" alt="Modern style living room" fill sizes="(max-width: 900px) 100vw, 640px" />
        </div>
        <div className="home-poliform-story-copy">
          <p>Elegance - Timeless</p>
          <h2>Modern Style<br />Timeless Charm</h2>
          <span>Discover Arusha Home Design previews, featuring kitchens, wardrobes, soft interiors, and striking material palettes.</span>
          <Link href="/about">About Us <ArrowRight size={14} /></Link>
        </div>
      </section>

      <section className="home-poliform-collection home-poliform-shell">
        <header>
          <h2>Explore Our Proudly Collection</h2>
          <div>
            <Link href="/materials">View More <ArrowRight size={14} /></Link>
            <p>Arusha Home showcases contemporary architecture, interior design trends, and innovative living through material-led room stories.</p>
          </div>
        </header>
        <div className="home-poliform-masonry">
          {collectionCards.map((card, index) => (
            <Link key={`${card.title}-${index}`} href={card.href} className="home-poliform-collection-card">
              <Image src={card.image} alt={card.title || "Collection"} fill sizes="(max-width: 900px) 100vw, 33vw" />
              <span>{card.title}</span>
              <i><ArrowRight size={17} /></i>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-poliform-conversation">
        <div className="home-poliform-shell">
          <div className="home-poliform-conversation-copy">
            <h2>Engage with Us in Conversation.</h2>
            <p>In a design world based on communication, our studio looks beyond borders, opening new experiences and shaping ideas into spaces that feel composed, personal, and ready to live in.</p>
            <div className="home-poliform-footer-links">
              <div><strong>About</strong><span>Our Story</span><span>Projects</span><span>Contact</span></div>
              <div><strong>Customer Service</strong><span>Consultation</span><span>Materials</span><span>Interior Design</span></div>
              <div><strong>Social Media</strong><span>Instagram</span><span>Facebook</span><span>LinkedIn</span></div>
            </div>
          </div>
          <div className="home-poliform-conversation-image">
            <Image src="/images/prod-bed.jpg" alt="Conversation room" fill sizes="(max-width: 900px) 100vw, 460px" />
          </div>
          <strong className="home-poliform-wordmark">Arusha</strong>
        </div>
      </section>
    </div>
  );
}
