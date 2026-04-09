import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/catalog/ProductDetailClient";
import { getProduct } from "@/app/actions/admin";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id).catch(() => null);

  if (!product) {
    return {
      title: "Product Detail | Arusha Home Design Pro",
    };
  }

  return {
    title: `${product.title} | Arusha Home Design Pro`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id).catch(() => null);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
