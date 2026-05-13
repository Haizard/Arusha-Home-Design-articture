import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Images, Sparkles } from "lucide-react";
import { getLooks } from "@/app/actions/looks";
import { fallbackLooks, getSlug, isUsableImageSrc, type LookItem } from "@/lib/lookFallbacks";

export default async function LooksPage() {
  const cmsLooks = (await getLooks().catch(() => [])) as LookItem[];
  const looks = cmsLooks.length > 0 ? cmsLooks : fallbackLooks;
  const heroImage = looks.find((look) => isUsableImageSrc(look.coverImage))?.coverImage || "/images/service-kitchen.jpg";

  return (
    <main className="looks-page">
      <section className="looks-hero">
        <Image src={heroImage} alt="Choose a look" fill priority sizes="100vw" />
        <div className="looks-hero-overlay" />
        <div className="looks-shell looks-hero-copy">
          <p className="material-kicker">Curated Look Library</p>
          <h1>Find the Feeling Before the Finish.</h1>
          <p>Mood-led palettes, room references, and colour pairings to help every surface feel intentional before materials are selected.</p>
        </div>
      </section>

      <section className="looks-shell looks-grid-section">
        <div className="material-section-heading compact">
          <div>
            <p className="material-kicker">Design moods</p>
            <h2>Choose the atmosphere your home should carry.</h2>
          </div>
        </div>

        <div className="looks-grid">
          {looks.map((look) => {
            const lookSlug = getSlug(look.name, look.slug);
            const coverImage = isUsableImageSrc(look.coverImage) ? look.coverImage : "/images/service-kitchen.jpg";
            return (
              <article key={lookSlug} className="look-card">
                <div className="look-card-media">
                  <Image src={coverImage} alt={look.name || "Look"} fill sizes="(max-width: 900px) 100vw, 33vw" />
                </div>
                <div className="look-card-body">
                  <div>
                    <span><Sparkles size={15} /> {look.categories?.length ?? 0} categories</span>
                    <h3>{look.name}</h3>
                    <p>{look.description || "A curated material look with colour-pairing galleries."}</p>
                  </div>
                  <Link href={`/looks/${lookSlug}`} className="look-open-link">
                    <Images size={15} />
                    Explore look
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
