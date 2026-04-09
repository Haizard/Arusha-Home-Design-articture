import type { Metadata } from "next";
import ShopPage from "@/components/catalog/ShopPage";
import { getProducts } from "@/app/actions/admin";

export const metadata: Metadata = {
  title: "Products | Arusha Home Design Pro",
  description:
    "Browse all products in a filterable shop view with sidebar filters and product cards.",
};

export default async function ProductsPage() {
  const products = await getProducts().catch(() => []);
  return <ShopPage items={products} />;
}
