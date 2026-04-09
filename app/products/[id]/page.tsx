import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/catalog/ProductDetailClient";
import { getPlanDetail } from "@/lib/site-catalog";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const plan = getPlanDetail(id);

  if (!plan) {
    return {
      title: "Product Detail | Arusha Home Design Pro",
    };
  }

  return {
    title: `${plan.title} | Arusha Home Design Pro`,
    description: plan.description,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plan = getPlanDetail(id);

  if (!plan) {
    notFound();
  }

  return <ProductDetailClient plan={plan} />;
}
