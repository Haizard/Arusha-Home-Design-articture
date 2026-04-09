import type { Metadata } from "next";
import { CatalogHero, ProjectsCatalog } from "@/components/catalog/CatalogShowcase";
import { catalogProjects } from "@/lib/site-catalog";

export const metadata: Metadata = {
  title: "Portfolio | Arusha Home Design Pro",
  description:
    "Review completed and conceptual projects through the same polished catalog lens as the redesigned homepage.",
};

export default function ProjectsPage() {
  return (
    <>
      <CatalogHero
        image="/images/projects-hero.jpg"
        eyebrow="Built work, concept studies, and interior transformations"
        title="A portfolio presented with marketplace clarity and studio credibility."
        description="The project page now aligns with the new home experience, helping visitors compare work quickly without losing the premium design feel."
        primaryHref="/contact"
        primaryLabel="Start a similar project"
        secondaryHref="/products"
        secondaryLabel="Browse house plans"
      />
      <ProjectsCatalog projects={catalogProjects} />
    </>
  );
}
