"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownWideNarrow,
  Bath,
  BedDouble,
  Filter,
  House,
  Layers2,
  MapPinned,
  Ruler,
  Star,
} from "lucide-react";
import type { ShopProduct } from "@/lib/site-catalog";

const productTypeLabels: ShopProduct["productType"][] = [
  "Apartments",
  "Commercial",
  "Educational Facility",
  "Healthcare Facility",
  "Hotels & Lodges",
  "Residential",
];

function spec(icon: React.ReactNode, label: string) {
  return (
    <span className="shop-spec">
      {icon}
      {label}
    </span>
  );
}

export default function ShopPage({ items }: { items: ShopProduct[] }) {
  const [selectedTypes, setSelectedTypes] = useState<ShopProduct["productType"][]>([]);
  const [minBedrooms, setMinBedrooms] = useState<number | null>(null);
  const [minBathrooms, setMinBathrooms] = useState<number | null>(null);
  const [minFloors, setMinFloors] = useState<number | null>(null);
  const [minArea, setMinArea] = useState<number | null>(null);
  const [duplexOnly, setDuplexOnly] = useState(false);
  const [sort, setSort] = useState<"high" | "low">("high");

  const filtered = useMemo(() => {
    const next = items.filter((item) => {
      if (selectedTypes.length > 0 && !selectedTypes.includes(item.productType)) return false;
      if (minBedrooms !== null && item.bedrooms < minBedrooms) return false;
      if (minBathrooms !== null && item.bathrooms < minBathrooms) return false;
      if (minFloors !== null && item.floors < minFloors) return false;
      if (minArea !== null && item.area < minArea) return false;
      if (duplexOnly && !item.duplex) return false;
      return true;
    });

    next.sort((a, b) => (sort === "high" ? b.price - a.price : a.price - b.price));
    return next;
  }, [items, selectedTypes, minBedrooms, minBathrooms, minFloors, minArea, duplexOnly, sort]);

  const counts = useMemo(() => {
    return productTypeLabels.reduce<Record<string, number>>((acc, type) => {
      acc[type] = items.filter((item) => item.productType === type).length;
      return acc;
    }, {});
  }, [items]);

  return (
    <div className="store-page-shell">
      <section className="market-shell shop-page">
        <div className="shop-hero">
          <Image src="/images/services-hero.jpg" alt="All products hero" fill priority sizes="100vw" className="shop-hero-image" />
          <div className="shop-hero-overlay" />
          <div className="shop-hero-copy">
            <h1>All products</h1>
            <p>
              We&apos;re passionate about helping you bring your dream home to life. Browse our architectural plans by style, budget, and scale to find the right starting point for your project.
            </p>
          </div>
        </div>

        <div className="shop-toolbar">
          <div className="shop-toolbar-left">
            <Filter size={18} />
            <span>Filters</span>
          </div>
          <label className="shop-sort">
            <ArrowDownWideNarrow size={18} />
            <span>Sort by:</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as "high" | "low")}>
              <option value="high">Price, high to low</option>
              <option value="low">Price, low to high</option>
            </select>
          </label>
        </div>

        <div className="shop-layout">
          <aside className="shop-filters">
            <div className="shop-filter-group">
              <h3>Product type</h3>
              <div className="shop-checkboxes">
                {productTypeLabels.map((type) => {
                  const checked = selectedTypes.includes(type);
                  return (
                    <label key={type}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          setSelectedTypes((current) =>
                            checked ? current.filter((item) => item !== type) : [...current, type]
                          )
                        }
                      />
                      <span>{type} ({counts[type]})</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="shop-filter-group">
              <h3>Number of Bedrooms</h3>
              <select value={minBedrooms ?? ""} onChange={(e) => setMinBedrooms(e.target.value ? Number(e.target.value) : null)}>
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            <div className="shop-filter-group">
              <h3>Number of Bathrooms</h3>
              <select value={minBathrooms ?? ""} onChange={(e) => setMinBathrooms(e.target.value ? Number(e.target.value) : null)}>
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            <div className="shop-filter-group">
              <h3>Number of Floors</h3>
              <select value={minFloors ?? ""} onChange={(e) => setMinFloors(e.target.value ? Number(e.target.value) : null)}>
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            <div className="shop-filter-group">
              <h3>Area</h3>
              <select value={minArea ?? ""} onChange={(e) => setMinArea(e.target.value ? Number(e.target.value) : null)}>
                <option value="">Any</option>
                <option value="200">200+ sqm</option>
                <option value="500">500+ sqm</option>
                <option value="1000">1000+ sqm</option>
              </select>
            </div>

            <div className="shop-filter-group">
              <h3>Duplex?</h3>
              <label className="shop-switch">
                <input type="checkbox" checked={duplexOnly} onChange={(e) => setDuplexOnly(e.target.checked)} />
                <span />
              </label>
            </div>
          </aside>

          <div className="shop-grid">
            {filtered.map((item) => (
              <Link key={item.id} href={`/products/${item.id}`} className="shop-card">
                <div className="shop-card-image-wrap">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 900px) 100vw, 33vw" className="shop-card-image" />
                  {item.badge ? <span className="shop-card-badge">{item.badge}</span> : null}
                </div>
                <div className="shop-card-body">
                  <h3>{item.title} - {item.id}</h3>
                  <p>From ${item.price.toFixed(2)}</p>
                  {item.rating ? (
                    <div className="shop-rating">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} size={15} fill="currentColor" />
                      ))}
                    </div>
                  ) : null}
                  <div className="shop-spec-grid">
                    {spec(<Layers2 size={15} />, `${item.floors} Floors`)}
                    {spec(<BedDouble size={15} />, `${item.bedrooms} Bedrooms`)}
                    {spec(<Bath size={15} />, `${item.bathrooms} Bathrooms`)}
                    {spec(<Ruler size={15} />, `${item.width} m`)}
                    {spec(<House size={15} />, `${item.length} m`)}
                    {spec(<MapPinned size={15} />, `${item.area} Area`)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="collections-pagination shop-pagination">
          <button type="button" aria-label="Previous page">‹</button>
          <span>1 / 19</span>
          <button type="button" aria-label="Next page">›</button>
        </div>
      </section>
    </div>
  );
}
