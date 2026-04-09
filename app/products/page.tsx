import type { Metadata } from "next";
import ShopPage from "@/components/catalog/ShopPage";
import { shopProducts } from "@/lib/site-catalog";

export const metadata: Metadata = {
  title: "Products | Arusha Home Design Pro",
  description:
    "Browse all products in a filterable shop view with sidebar filters and product cards.",
};

export default function ProductsPage() {
  return <ShopPage items={shopProducts} />;
}
