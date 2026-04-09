import type { Metadata } from "next";
import Image from "next/image";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Services | Arusha Home Design Pro",
  description:
    "Explore our full range of architectural and interior design services — from architecture and interior design to 3D modelling, construction, and project supervision.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero" aria-label="Services page header">
        <Image
          src="/images/services-hero.jpg"
          alt="Architectural planning and design showcase"
          fill
          priority
          style={{ objectFit: "cover", opacity: 0.5 }}
          sizes="100vw"
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            What We Offer
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
            Services Built for{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-gold)", fontWeight: 400 }}>
              Excellence
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
            From concept to completion — we offer a comprehensive suite of architectural and
            interior design services tailored to your unique vision and needs.
          </p>
        </div>
      </section>

      <ServicesGrid />
      <ContactCTA />
    </>
  );
}
