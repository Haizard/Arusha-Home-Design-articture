"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownWideNarrow,
  Bath,
  BedDouble,
  Car,
  Filter,
  Layers2,
  MapPinned,
  Ruler,
  Star,
} from "lucide-react";

type CmsProductListItem = {
  _id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  badge?: string;
  rating?: number;
  duplex?: boolean;
  planId?: string;
  area?: string;
  dimensions?: string;
  bedrooms?: number;
  bathrooms?: number;
  stories?: number;
  garage?: number;
  basePrice?: number;
};

type ShopFilters = {
  q?: string;
  minArea?: string;
  maxArea?: string;
  minPrice?: string;
  maxPrice?: string;
  badge?: string;
  label?: string;
  sort?: string;
};

function getAreaNumber(area?: string) {
  if (!area) return 0;
  const match = area.match(/[\d.]+/);
  return match ? Number(match[0]) : 0;
}

function getNumberParam(value: string | null) {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function spec(icon: React.ReactNode, label: string) {
  return (
    <span className="shop-spec">
      {icon}
      {label}
    </span>
  );
}

export default function ShopPage({ items, filters }: { items: CmsProductListItem[]; filters?: ShopFilters }) {
  const productTypeLabels = useMemo(
    () => Array.from(new Set(items.map((item: any) => item.category).filter(Boolean))),
    [items]
  );
  const query = filters?.q?.trim().toLowerCase() ?? "";
  const queryMinArea = getNumberParam(filters?.minArea ?? null);
  const queryMaxArea = getNumberParam(filters?.maxArea ?? null);
  const queryMinPrice = getNumberParam(filters?.minPrice ?? null);
  const queryMaxPrice = getNumberParam(filters?.maxPrice ?? null);
  const queryBadge = filters?.badge?.trim().toLowerCase() ?? "";
  const queryLabel = filters?.label?.trim() ?? "";
  const querySort = filters?.sort === "low" ? "low" : "high";

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minBedrooms, setMinBedrooms] = useState<number | null>(null);
  const [minBathrooms, setMinBathrooms] = useState<number | null>(null);
  const [minFloors, setMinFloors] = useState<number | null>(null);
  const [minArea, setMinArea] = useState<number | null>(queryMinArea);
  const [duplexOnly, setDuplexOnly] = useState(false);
  const [sort, setSort] = useState<"high" | "low">(querySort);

  const filtered = useMemo(() => {
    const next = items.filter((item) => {
      const areaNumber = getAreaNumber(item.area);
      const price = item.basePrice ?? 0;
      const haystack = [item.title, item.description, item.category, item.badge]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (selectedTypes.length > 0 && !selectedTypes.includes(item.category)) return false;
      if (minBedrooms !== null && (item.bedrooms ?? 0) < minBedrooms) return false;
      if (minBathrooms !== null && (item.bathrooms ?? 0) < minBathrooms) return false;
      if (minFloors !== null && (item.stories ?? 1) < minFloors) return false;
      if (minArea !== null && areaNumber < minArea) return false;
      if (queryMaxArea !== null && areaNumber > queryMaxArea) return false;
      if (queryMinPrice !== null && price < queryMinPrice) return false;
      if (queryMaxPrice !== null && price > queryMaxPrice) return false;
      if (query && !haystack.includes(query)) return false;
      if (queryBadge && (item.badge ?? "").toLowerCase() !== queryBadge) return false;
      if (duplexOnly && !item.duplex) return false;
      return true;
    });

    next.sort((a, b) => (sort === "high" ? (b.basePrice ?? 0) - (a.basePrice ?? 0) : (a.basePrice ?? 0) - (b.basePrice ?? 0)));
    return next;
  }, [items, selectedTypes, minBedrooms, minBathrooms, minFloors, minArea, duplexOnly, sort, query, queryBadge, queryMaxArea, queryMinPrice, queryMaxPrice]);

  const counts = useMemo(() => {
    return productTypeLabels.reduce<Record<string, number>>((acc, type) => {
      acc[type] = items.filter((item) => item.category === type).length;
      return acc;
    }, {});
  }, [items, productTypeLabels]);

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
            {queryLabel ? <p><strong>Filtered view:</strong> {queryLabel}</p> : null}
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
            {filtered.map((item: any) => (
              <Link key={item._id} href={`/products/${item._id}`} className="shop-card">
                <div className="shop-card-image-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.imageUrl} alt={item.title} className="shop-card-image" />
                  {item.badge ? <span className="shop-card-badge">{item.badge}</span> : null}
                </div>
                <div className="shop-card-body">
                  <h3>{item.title}{item.planId ? ` - ${item.planId}` : ""}</h3>
                  <p>From ${(item.basePrice ?? 0).toFixed(2)}</p>
                  {item.rating && item.rating > 0 ? (
                    <div className="shop-rating">
                      {Array.from({ length: 5 }).map((_: any, index: number) => (
                        <Star key={index} size={15} fill={index < Math.round(item.rating ?? 0) ? "currentColor" : "none"} />
                      ))}
                    </div>
                  ) : null}
                  <div className="shop-spec-grid">
                    {spec(<Layers2 size={15} />, `${item.stories ?? 1} Floors`)}
                    {spec(<BedDouble size={15} />, `${item.bedrooms ?? 0} Bedrooms`)}
                    {spec(<Bath size={15} />, `${item.bathrooms ?? 0} Bathrooms`)}
                    {spec(<Ruler size={15} />, item.dimensions || "Custom size")}
                    {spec(<MapPinned size={15} />, item.area || "Area on request")}
                    {spec(<Car size={15} />, `${item.garage ?? 0} Parking`)}
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
