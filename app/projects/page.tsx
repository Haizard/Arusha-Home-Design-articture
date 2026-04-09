import type { Metadata } from "next";
import Image from "next/image";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Portfolio | Arusha Home Design Pro",
  description:
    "Browse our portfolio of completed architectural designs, interior spaces, and construction projects across East Africa.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero" aria-label="Projects page header">
        <Image
          src="/images/projects-hero.jpg"
          alt="Completed architectural luxury project"
          fill
          priority
          style={{ objectFit: "cover", opacity: 0.5 }}
          sizes="100vw"
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            Our Portfolio
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: "var(--text-headline)",
              fontWeight: 700,
              color: "var(--color-stone-100)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            Every Project,
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-gold)", fontWeight: 400 }}>
              A Masterpiece
            </em>
          </h1>
          <p
            style={{
              color: "var(--color-stone-400)",
              maxWidth: "540px",
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            From residential villas to commercial complexes — explore our work across architecture,
            interior design, kitchen customization, and construction.
          </p>
        </div>
      </section>

      <ProjectsGrid />
      <ContactCTA />
    </>
  );
}
