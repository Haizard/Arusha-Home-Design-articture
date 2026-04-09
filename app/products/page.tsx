import type { Metadata } from "next";
import Image from "next/image";
import ProductsGrid from "@/components/sections/ProductsGrid";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Products | Arusha Home Design Pro",
  description:
    "Explore our custom furniture and cabinet products — TV showcases, kitchen cabinets, bedroom wardrobes, beds, and bathroom cabinets crafted to perfection.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="page-hero" aria-label="Products page header">
        <Image
          src="/images/products-hero.jpg"
          alt="Luxury custom kitchen and cabinetry showcase"
          fill
          priority
          style={{ objectFit: "cover", opacity: 0.5 }}
          sizes="100vw"
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            Our Products
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: "var(--text-headline)",
              fontWeight: 700,
              color: "var(--color-stone-100)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            Crafted with
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-gold)", fontWeight: 400 }}>
              Precision & Care
            </em>
          </h1>
          <p
            style={{
              color: "var(--color-stone-400)",
              maxWidth: "540px",
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            Custom-built furniture and storage solutions designed to maximize your space,
            enhance functionality, and elevate the aesthetic of every room.
          </p>
        </div>
      </section>

      <ProductsGrid />
      <ContactCTA />
    </>
  );
}
