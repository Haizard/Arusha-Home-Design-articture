import type { Metadata } from "next";
import { CatalogHero, ProductsCatalog } from "@/components/catalog/CatalogShowcase";
import { catalogPlans } from "@/lib/site-catalog";

export const metadata: Metadata = {
  title: "Products | Arusha Home Design Pro",
  description:
    "Browse house plans, compare practical specs, and shortlist concepts in a cleaner marketplace-style catalog.",
};

export default function ProductsPage() {
  return (
    <>
      <CatalogHero
        image="/images/products-hero.jpg"
        eyebrow="Plan shopping with stronger hierarchy and trust cues"
        title="Browse plans the way real clients actually compare homes."
        description="This catalog now behaves more like a storefront, with stronger pricing cues, specs, categories, and next-step actions."
        primaryHref="/contact"
        primaryLabel="Ask for a plan shortlist"
        secondaryHref="/projects"
        secondaryLabel="See built examples"
      />
      <ProductsCatalog plans={catalogPlans} />
    </>
  );
}
