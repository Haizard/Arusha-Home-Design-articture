import { getMaterialRanges } from "@/app/actions/materials";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers3, Palette, Sparkles } from "lucide-react";
import MaterialsHub from "@/components/materials/MaterialsHub";

export default async function HomePage() {
  const ranges = await getMaterialRanges().catch(() => []);
  const heroRange = ranges.find((range: { heroImage?: string }) => range.heroImage) ?? ranges[0];
  const heroImage = heroRange?.heroImage || "/images/service-kitchen.jpg";

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
            <h1>Design the room around the material first.</h1>
            <p>
              Choose boards, finishes, colour combinations, and room references before moving into plans, projects, or consultation.
            </p>
            <div className="home-material-actions">
              <Link href="/materials" className="materials-primary-action">
                Explore material studio <ArrowRight size={17} />
              </Link>
              <Link href="/projects" className="materials-secondary-action">
                View applications
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
        <div className="home-material-shell home-material-stats">
          <div><Palette size={18} /><strong>70%</strong><span>material-led customer journey</span></div>
          <div><Layers3 size={18} /><strong>{ranges.length || "CMS"}</strong><span>admin controlled ranges</span></div>
          <div><Sparkles size={18} /><strong>Looks</strong><span>dynamic galleries and pairings</span></div>
        </div>
        <MaterialsHub ranges={ranges} compact />
      </section>
    </div>
  );
}
