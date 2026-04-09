import type { Metadata } from "next";
import ShopPage from "@/components/catalog/ShopPage";
import { shopProducts } from "@/lib/site-catalog";

export const metadata: Metadata = {
  title: "Shop | Arusha Home Design Pro",
  description:
    "Browse all products in a Maramani-inspired shop layout with filters, sorting, and denser plan cards.",
};

export default function ProductsPage() {
  return <ShopPage items={shopProducts} />;
}
