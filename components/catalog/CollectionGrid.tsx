"use client";

import Link from "next/link";
import Image from "next/image";
import type { CollectionCard } from "@/lib/site-catalog";

export default function CollectionGrid({ items }: { items: CollectionCard[] }) {
  return (
    <section className="market-shell collections-page">
      <header className="collections-header">
        <h1>All collections</h1>
      </header>

      <div className="collections-grid">
        {items.map((item: any) => (
          <Link
            key={`${item.title}-${item.image}`}
            href={item.href}
            className="collection-card"
            style={{ position: "relative" }}
          >
            <Image src={item.image} alt={item.title} fill sizes="(max-width: 900px) 100vw, 33vw" className="collection-card-image" />
            <div className="collection-card-overlay" />
            <h2>{item.title}</h2>
          </Link>
        ))}
      </div>

      <div className="collections-pagination">
        <button type="button" aria-label="Previous page">&lsaquo;</button>
        <span>1 / 2</span>
        <button type="button" aria-label="Next page">&rsaquo;</button>
      </div>
    </section>
  );
}
