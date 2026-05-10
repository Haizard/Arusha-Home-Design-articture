"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

import { getProducts } from "@/app/actions/admin";

type ProductCard = {
  _id: string;
  title: string;
  category?: string;
  description?: string;
  imageUrl: string;
  basePrice?: number;
  planId?: string;
  bedrooms?: number;
  area?: string;
};

export default function ProductsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [products, setProducts] = useState<ProductCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<ProductCard | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data as ProductCard[]);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (loading || products.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".products-grid-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [loading, products]);

  // Lightbox keyboard close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section"
      id="products"
      aria-label="Our products"
      style={{ backgroundColor: "var(--color-void)" }}
    >
      <div className="section-container">
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "4rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <div className="section-label">Our Products</div>
            <h2
              className="font-display"
              style={{
                fontSize: "var(--text-headline)",
                fontWeight: 700,
                color: "var(--color-stone-100)",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
              }}
            >
              Crafted With
              <br />
              <em style={{ fontStyle: "italic", color: "var(--color-gold)", fontWeight: 400 }}>
                Precision
              </em>
            </h2>
          </div>
          <Link href="/products" className="btn-arrow">
            View All Products <ArrowRight size={14} />
          </Link>
        </div>

        <div className="products-grid-container">
          {loading ? (
             <div className="col-span-full flex items-center justify-center py-20 text-stone-500">Loading products...</div>
          ) : products.length === 0 ? (
             <div className="col-span-full flex items-center justify-center py-20 text-stone-500">No products found.</div>
          ) : (
            products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="product-card"
              style={{ cursor: "pointer", background: "var(--color-obsidian)", display: "block", textDecoration: "none", borderRadius: '12px', overflow: 'hidden' }}
              role="link"
              aria-label={`View ${product.title}`}
            >
              <div className="product-card-image" style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden' }}>
                <Image
                   src={product.imageUrl}
                   alt={product.title}
                   fill
                   style={{ objectFit: "cover" }}
                   sizes="(max-width:768px) 50vw, 33vw"
                />
                
                {/* Price Badge */}
                {product.basePrice && (
                  <div style={{ 
                    position: 'absolute', top: '12px', left: '12px', 
                    background: 'var(--color-gold)', color: '#000', 
                    padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 700 
                  }}>
                    ${product.basePrice}
                  </div>
                )}

                {/* Hover overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(8,8,8,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                  className="product-hover-overlay"
                >
                  <span
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--color-gold)",
                      border: "1px solid var(--color-gold)",
                      padding: "0.4rem 1rem",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    View Plan
                  </span>
                </div>
              </div>
              <div className="product-card-body" style={{ padding: "1rem" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div className="product-card-category" style={{ fontSize: "0.55rem", margin: 0 }}>{product.category}</div>
                  {product.planId && <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)' }}>#{product.planId}</div>}
                </div>
                <h3 className="product-card-title" style={{ fontSize: "1rem", marginBottom: '12px', fontWeight: 600 }}>{product.title}</h3>
                
                {/* Micro Specs */}
                {(product.bedrooms || product.area) && (
                  <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                    {(product.bedrooms ?? 0) > 0 && (
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ color: 'var(--color-gold)' }}>●</span> {product.bedrooms} Bed
                      </div>
                    )}
                    {product.area && (
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ color: 'var(--color-gold)' }}>●</span> {product.area}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Link>
          )))}
        </div>
      </div>

      <style jsx>{`
          .products-grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
          }
          .product-card-image {
            position: relative;
            width: 100%;
            aspect-ratio: 1 / 1;
            overflow: hidden;
          }
          .product-card:hover .product-hover-overlay { 
            opacity: 1 !important; 
          }
          @media (max-width: 768px) {
            .products-grid-container {
              grid-template-columns: repeat(2, 1fr);
              gap: 0.75rem;
            }
          }
          @media (max-width: 480px) {
            .products-grid-container {
              grid-template-columns: repeat(2, 1fr);
              gap: 0.5rem;
            }
          }
      `}</style>

      {/* Lightbox */}
      <div
        className={`lightbox-overlay ${lightbox ? "open" : ""}`}
        onClick={() => setLightbox(null)}
        role="dialog"
        aria-modal="true"
        aria-label={lightbox?.title}
      >
        <button
          className="lightbox-close"
          onClick={() => setLightbox(null)}
          aria-label="Close lightbox"
        >
          <X size={18} />
        </button>
        {lightbox && (
          <div
            style={{ textAlign: "center", padding: "2rem" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
             <img
              src={lightbox.imageUrl}
              alt={lightbox.title}
              className="lightbox-img"
            />
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                color: "var(--color-stone-100)",
                marginTop: "1.5rem",
              }}
            >
              {lightbox.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                marginTop: "0.5rem",
              }}
            >
              {lightbox.category}
            </p>
             <p
              style={{
                color: "var(--color-stone-400)",
                maxWidth: "500px",
                margin: "1rem auto 0",
                lineHeight: 1.7,
              }}
            >
              {lightbox.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
