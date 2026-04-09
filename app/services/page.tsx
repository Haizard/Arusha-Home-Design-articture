import type { Metadata } from "next";
import { CatalogHero, ServicesCatalog } from "@/components/catalog/CatalogShowcase";
import { catalogServices } from "@/lib/site-catalog";

export const metadata: Metadata = {
  title: "Services | Arusha Home Design Pro",
  description:
    "Explore architecture, interior design, visualization, and construction services presented in a clearer storefront-style experience.",
};

export default function ServicesPage() {
  return (
    <>
      <CatalogHero
        image="/images/services-hero.jpg"
        eyebrow="Architecture, interiors, joinery, and delivery support"
        title="Services designed to browse as clearly as products."
        description="We reframed the services page around confident offers, stronger photography, and practical deliverables so it matches the new catalog-first direction."
        primaryHref="/contact"
        primaryLabel="Book a consultation"
        secondaryHref="/projects"
        secondaryLabel="See completed work"
      />
      <ServicesCatalog services={catalogServices} />
    </>
  );
}
