import type { Metadata } from "next";
import ShopPage from "@/components/catalog/ShopPage";
import { getProducts } from "@/app/actions/admin";

export const metadata: Metadata = {
  title: "Products | Arusha Home Design Pro",
  description:
    "Browse all products in a filterable shop view with sidebar filters and product cards.",
};

type ProductsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const products = await getProducts().catch(() => []);
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const filters = {
    q: Array.isArray(resolvedSearchParams.q) ? resolvedSearchParams.q[0] : resolvedSearchParams.q,
    minArea: Array.isArray(resolvedSearchParams.minArea) ? resolvedSearchParams.minArea[0] : resolvedSearchParams.minArea,
    maxArea: Array.isArray(resolvedSearchParams.maxArea) ? resolvedSearchParams.maxArea[0] : resolvedSearchParams.maxArea,
    minPrice: Array.isArray(resolvedSearchParams.minPrice) ? resolvedSearchParams.minPrice[0] : resolvedSearchParams.minPrice,
    maxPrice: Array.isArray(resolvedSearchParams.maxPrice) ? resolvedSearchParams.maxPrice[0] : resolvedSearchParams.maxPrice,
    badge: Array.isArray(resolvedSearchParams.badge) ? resolvedSearchParams.badge[0] : resolvedSearchParams.badge,
    label: Array.isArray(resolvedSearchParams.label) ? resolvedSearchParams.label[0] : resolvedSearchParams.label,
    sort: Array.isArray(resolvedSearchParams.sort) ? resolvedSearchParams.sort[0] : resolvedSearchParams.sort,
  };

  return <ShopPage key={JSON.stringify(filters)} items={products} filters={filters} />;
}
