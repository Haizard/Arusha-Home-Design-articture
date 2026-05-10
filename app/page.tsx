import { getMaterialRanges } from "@/app/actions/materials";
import { getLooks } from "@/app/actions/looks";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Images, Palette, Sparkles } from "lucide-react";
import MaterialsHub from "@/components/materials/MaterialsHub";
import { fallbackLooks, getSlug, isUsableImageSrc, type LookItem } from "@/lib/lookFallbacks";

export default async function HomePage() {
  const [ranges, cmsLooks] = await Promise.all([
    getMaterialRanges().catch(() => []),
    getLooks().catch(() => []),
  ]);
  const looks = ((cmsLooks as LookItem[]).length > 0 ? cmsLooks : fallbackLooks) as LookItem[];
  const heroRange = ranges.find((range: { heroImage?: string }) => range.heroImage) ?? ranges[0];
  const heroImage = heroRange?.heroImage || looks.find((look) => isUsableImageSrc(look.coverImage))?.coverImage || "/images/service-kitchen.jpg";

  return (
    <div className="home-material-page">
      <section className="home-material-hero">
        <div className="home-material-hero-media">
          <Image src={heroImage} alt="Interior material selection" fill priority sizes="100vw" />
          <div className="home-material-hero-overlay" />
        </div>
        <div className="home-material-shell home-material-hero-grid">
          <div className="home-material-copy">
            <p className="material-kicker">Arusha Home Design Pro</p>
            <h1>Choose the look. Shape the room.</h1>
            <p>
              Explore room looks, surface palettes, products, projects, and design support from one cleaner starting point.
            </p>
            <div className="home-material-actions">
              <Link href="/looks" className="materials-primary-action">
                Choose a look <ArrowRight size={17} />
              </Link>
              <Link href="/materials" className="materials-primary-action">
                Materials
              </Link>
              <Link href="/projects" className="materials-secondary-action">
                Projects
              </Link>
            </div>
          </div>

          <div className="home-look-preview">
            <div className="home-look-preview-head">
              <Sparkles size={18} />
              <div>
                <strong>Choose a Look</strong>
                <span>Bliss, Delight, Exhilaration</span>
              </div>
            </div>
            {[
              { name: "Bliss", image: "/images/service-kitchen.jpg" },
              { name: "Delight", image: "/images/service-interior.jpg" },
              { name: "Exhilaration", image: "/images/prod-wardrobe.jpg" },
            ].map((look) => (
              <Link key={look.name} href="/looks" className="home-look-row">
                <span><Image src={look.image} alt={look.name} fill sizes="70px" /></span>
                <strong>{look.name}</strong>
                <ArrowRight size={15} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-material-rhythm">
        <div className="home-material-shell home-look-showcase">
          <div className="home-section-head">
            <div>
              <p className="material-kicker">Choose a Look</p>
              <h2>Start with an inspiration style.</h2>
            </div>
            <Link href="/looks">View all looks <ArrowRight size={15} /></Link>
          </div>
          <div className="home-look-card-grid">
            {looks.slice(0, 3).map((look) => {
              const lookSlug = getSlug(look.name, look.slug);
              const coverImage = isUsableImageSrc(look.coverImage) ? look.coverImage : "/images/service-kitchen.jpg";
              return (
                <Link key={lookSlug} href={`/looks/${lookSlug}`} className="home-feature-card">
                  <span>
                    <Image src={coverImage} alt={look.name || "Look"} fill sizes="(max-width: 900px) 100vw, 30vw" />
                  </span>
                  <strong>{look.name}</strong>
                  <small><Images size={14} /> {look.categories?.length ?? 0} categories</small>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="home-material-shell home-support-grid">
          <Link href="/materials" className="home-support-card"><Palette size={18} /><strong>Materials</strong><span>Boards, colours, finishes</span></Link>
          <Link href="/products" className="home-support-card"><BriefcaseBusiness size={18} /><strong>Plans</strong><span>House plans and packages</span></Link>
          <Link href="/contact" className="home-support-card"><Sparkles size={18} /><strong>Consultation</strong><span>Request samples or support</span></Link>
        </div>

        <MaterialsHub ranges={ranges} compact />
      </section>
    </div>
  );
}
