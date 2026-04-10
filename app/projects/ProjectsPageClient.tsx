"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Clock3, Compass, MapPin, PencilRuler, ShieldCheck } from "lucide-react";
import { catalogProjects } from "@/lib/site-catalog";

const highlights = [
  {
    icon: Compass,
    title: "Context-aware design",
    text: "Projects shaped around climate, circulation, and how people actually live.",
  },
  {
    icon: PencilRuler,
    title: "Premium presentation",
    text: "A portfolio layout with the same calm polish as the home page.",
  },
  {
    icon: Building2,
    title: "Broad project range",
    text: "Residential, interiors, and commercial work presented with equal clarity.",
  },
  {
    icon: ShieldCheck,
    title: "Confidence to proceed",
    text: "A cleaner page that makes the work easier to trust and compare.",
  },
];

export default function ProjectsPageClient() {
  return (
    <main className="projects-page">
      <section className="projects-hero" aria-label="Projects page hero">
        <div className="projects-hero-media">
          <Image
            src="/images/projects-hero.jpg"
            alt="Arusha Home Design project showcase"
            fill
            priority
            sizes="100vw"
            className="projects-hero-image"
          />
          <div className="projects-hero-overlay" />
        </div>

        <div className="market-shell projects-hero-shell">
          <div className="projects-hero-copy">
            <h1>Projects presented with the same calm confidence as the home page.</h1>
          </div>
        </div>
      </section>

      <section className="projects-highlights">
        <div className="market-shell projects-highlights-grid">
          {highlights.map((item) => (
            <article key={item.title} className="projects-highlight-card">
              <item.icon size={18} />
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-showcase">
        <div className="market-shell">
          <div className="projects-heading-row">
            <div>
              <span className="market-kicker">Portfolio overview</span>
              <h2>Selected projects with a lighter, cleaner visual rhythm.</h2>
              <p>
                The page is intentionally simpler now so the work feels more premium and the color
                story stays controlled from top to bottom.
              </p>
            </div>
            <Link href="/contact" className="market-inline-link">
              Discuss your brief <ArrowRight size={16} />
            </Link>
          </div>

          <div className="projects-grid">
            {catalogProjects.map((project) => (
              <article key={`${project.title}-${project.year}`} className="projects-card">
                <div className="projects-card-image-wrap">
                  <span className="projects-card-badge">{project.category}</span>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    className="projects-card-image"
                  />
                </div>
                <div className="projects-card-body">
                  <div className="projects-card-topline">
                    <span>{project.status}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="projects-card-meta">
                    <span><MapPin size={15} /> {project.location}</span>
                    <span><Clock3 size={15} /> {project.year}</span>
                    <span><PencilRuler size={15} /> {project.area}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-closing">
        <div className="market-shell">
          <div className="projects-closing-card">
            <div>
              <span className="market-kicker">Start your project</span>
              <h2>Ready to move from inspiration to a clear design direction?</h2>
              <p>
                Work with Arusha Home Design Pro on a residence, interior transformation, or larger
                development and build with stronger visual clarity from the beginning.
              </p>
            </div>
            <div className="projects-closing-actions">
              <Link href="/contact" className="projects-primary-button">
                Book a consultation <ArrowRight size={16} />
              </Link>
              <Link href="/products" className="market-inline-link">
                Browse house plans <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .projects-page {
          background: #ffffff;
        }

        .projects-hero {
          position: relative;
          min-height: min(88vh, 860px);
          background: #f7f4ee;
        }

        .projects-hero-media {
          position: absolute;
          inset: 0;
        }

        .projects-hero-image,
        .projects-card-image {
          object-fit: cover;
        }

        .projects-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(247, 244, 238, 0.01) 0%, rgba(247, 244, 238, 0.08) 38%, rgba(247, 244, 238, 0.2) 100%);
        }

        .projects-hero-shell {
          position: relative;
          z-index: 1;
          min-height: min(88vh, 860px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          padding-top: clamp(4.5rem, 8vw, 6.5rem);
        }

        .projects-hero-copy {
          color: #ffffff;
          text-align: center;
        }

        .projects-hero-copy h1 {
          font-size: clamp(1.8rem, 3.6vw, 3.2rem);
          line-height: 0.96;
          letter-spacing: -0.05em;
          margin: 0;
          white-space: nowrap;
        }

        .projects-primary-button,
        .projects-secondary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          min-height: 3.2rem;
          padding: 0.9rem 1.35rem;
          border-radius: 999px;
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 700;
        }

        .projects-primary-button {
          background: #cfab4f;
          color: #111111;
        }

        .projects-secondary-button {
          background: rgba(247, 244, 238, 0.96);
          color: #111111;
          border: 1px solid rgba(17, 17, 17, 0.1);
        }

        .projects-highlights {
          background: #ffffff;
          border-top: 1px solid rgba(17, 17, 17, 0.06);
          border-bottom: 1px solid rgba(17, 17, 17, 0.06);
        }

        .projects-highlights-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1rem;
          padding: 1.25rem 0;
        }

        .projects-highlight-card {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }

        .projects-highlight-card :global(svg) {
          color: #111111;
          margin-top: 0.15rem;
          flex-shrink: 0;
        }

        .projects-highlight-card h2 {
          font-size: 0.94rem;
          line-height: 1.25;
          color: #111111;
        }

        .projects-highlight-card p {
          margin-top: 0.2rem;
          color: rgba(17, 17, 17, 0.58);
          font-size: 0.83rem;
          line-height: 1.45;
        }

        .projects-showcase {
          background: #ffffff;
          padding: clamp(3rem, 7vw, 6rem) 0;
        }

        .projects-heading-row {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 1.75rem;
        }

        .projects-heading-row h2,
        .projects-closing-card h2 {
          font-size: clamp(2rem, 4.4vw, 3.8rem);
          line-height: 0.98;
          letter-spacing: -0.05em;
          color: #111111;
        }

        .projects-heading-row p,
        .projects-closing-card p {
          max-width: 42rem;
          color: rgba(17, 17, 17, 0.62);
          margin-top: 0.75rem;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.25rem;
        }

        .projects-card {
          background: #ffffff;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 20px 45px rgba(17, 17, 17, 0.06);
        }

        .projects-card-image-wrap {
          position: relative;
          aspect-ratio: 1 / 0.84;
        }

        .projects-card-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          min-height: 2rem;
          padding: 0.3rem 0.7rem;
          border-radius: 999px;
          background: #7c5cff;
          color: #ffffff;
          font-size: 0.74rem;
          font-weight: 700;
        }

        .projects-card-body {
          padding: 1.2rem 1.2rem 1.35rem;
        }

        .projects-card-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: rgba(17, 17, 17, 0.46);
        }

        .projects-card h3 {
          font-size: 1.28rem;
          line-height: 1.12;
          color: #111111;
          margin: 0.8rem 0 0.7rem;
        }

        .projects-card p {
          color: rgba(17, 17, 17, 0.62);
          line-height: 1.7;
        }

        .projects-card-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem 1rem;
          margin-top: 1rem;
        }

        .projects-card-meta span {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: rgba(17, 17, 17, 0.68);
          font-size: 0.88rem;
          font-weight: 600;
        }

        .projects-closing {
          background: #f7f4ee;
          padding: 0 0 clamp(3rem, 7vw, 6rem);
        }

        .projects-closing-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          padding: 2rem 2.1rem;
          background: linear-gradient(180deg, #ffffff 0%, #faf7f2 100%);
          border: 1px solid rgba(17, 17, 17, 0.06);
          border-radius: 1.6rem;
          box-shadow: 0 20px 45px rgba(17, 17, 17, 0.05);
        }

        .projects-closing-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }

        @media (max-width: 1100px) {
          .projects-grid,
          .projects-highlights-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .projects-heading-row,
          .projects-closing-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .projects-hero {
            min-height: auto;
          }

          .projects-hero-shell {
            min-height: auto;
            padding-top: 5rem;
          }

          .projects-hero-copy h1 {
            white-space: normal;
          }
        }

        @media (max-width: 700px) {
          .projects-grid,
          .projects-highlights-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
