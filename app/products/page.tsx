import type { Metadata } from "next";
import CollectionGrid from "@/components/catalog/CollectionGrid";
import { collectionCards } from "@/lib/site-catalog";

export const metadata: Metadata = {
  title: "Products | Arusha Home Design Pro",
  description:
    "Browse all house-plan collections in a clean tiled catalog inspired by the provided Maramani collections page.",
};

export default function ProductsPage() {
  return (
    <div className="store-page-shell">
      <CollectionGrid items={collectionCards} />
    </div>
  );
}
