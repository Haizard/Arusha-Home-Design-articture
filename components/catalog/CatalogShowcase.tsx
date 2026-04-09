"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, Building2, Clock3, Layers2, MapPin, PencilRuler, Ruler, ShieldCheck, Sparkles } from "lucide-react";
import type { CatalogPlan, CatalogProject, CatalogService } from "@/lib/site-catalog";

export function CatalogHero({
  image,
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  return (
    <section className="catalog-hero">
      <div className="catalog-hero-media">
        <Image src={image} alt={title} fill priority sizes="100vw" className="catalog-hero-image" />
        <div className="catalog-hero-overlay" />
      </div>
      <div className="market-shell catalog-hero-content">
        <div className="catalog-hero-card">
          <span className="market-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="market-hero-actions">
            <Link href={primaryHref} className="market-button primary">
              {primaryLabel} <ArrowRight size={16} />
            </Link>
            <Link href={secondaryHref} className="market-button secondary">
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesCatalog({ services }: { services: CatalogService[] }) {
  return (
    <section className="market-shell catalog-section">
      <div className="market-section-heading">
        <div>
          <span className="market-kicker">Studio capabilities</span>
          <h2>Services built like clear offers, not vague promises.</h2>
          <p>
            Each service now reads more like a confident productized offer, which fits the Maramani-like browsing flow much better.
          </p>
        </div>
      </div>
      <div className="catalog-service-grid">
        {services.map((service) => (
          <article key={service.serviceId} className="catalog-service-card">
            <div className="catalog-service-image-wrap">
              <Image src={service.image} alt={service.title} fill sizes="(max-width: 900px) 100vw, 40vw" className="catalog-service-image" />
            </div>
            <div className="catalog-service-body">
              <div className="catalog-service-topline">
                <span>{service.serviceId}</span>
                <span>{service.accent}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <ul>
                {service.deliverables.map((item) => (
                  <li key={item}>
                    <Sparkles size={15} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="catalog-inline-cta">
                Ask about this service <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProductsCatalog({ plans }: { plans: CatalogPlan[] }) {
  return (
    <section className="market-shell catalog-section">
      <div className="market-section-heading">
        <div>
          <span className="market-kicker">House plan catalog</span>
          <h2>Product cards that feel closer to a real marketplace.</h2>
          <p>
            The product page now emphasizes comparison, specs, and clarity instead of acting like a generic gallery.
          </p>
        </div>
      </div>
      <div className="catalog-filter-row">
        {["Modern House", "Luxury House", "Budget Smart", "Best Seller", "Compound Living"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="market-grid market-grid-three">
        {plans.map((plan) => (
          <article key={plan.id} className="market-plan-card catalog-plan-card">
            <div className="market-plan-image-wrap">
              <span className="market-plan-badge">{plan.category}</span>
              <Image src={plan.image} alt={plan.title} fill sizes="(max-width: 900px) 100vw, 33vw" className="market-plan-image" />
            </div>
            <div className="market-plan-body">
              <div className="market-plan-meta">
                <span>{plan.id}</span>
                <span>{plan.price}</span>
              </div>
              <h3>{plan.title}</h3>
              <p className="catalog-plan-summary">{plan.summary}</p>
              <div className="market-spec-grid">
                <span><Layers2 size={15} /> {plan.floors}</span>
                <span><BedDouble size={15} /> {plan.bedrooms}</span>
                <span><Building2 size={15} /> {plan.bathrooms}</span>
                <span><Ruler size={15} /> {plan.area}</span>
              </div>
              <Link href={`/products/${plan.id}`} className="catalog-inline-cta">
                View plan details <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProjectsCatalog({ projects }: { projects: CatalogProject[] }) {
  return (
    <section className="market-shell catalog-section">
      <div className="market-section-heading">
        <div>
          <span className="market-kicker">Portfolio showcase</span>
          <h2>Projects presented with the same clarity as the plan catalog.</h2>
          <p>
            This keeps the portfolio aligned with the shopping-oriented homepage while still highlighting design credibility.
          </p>
        </div>
      </div>
      <div className="catalog-project-grid">
        {projects.map((project) => (
          <article key={project.title} className="catalog-project-card">
            <div className="catalog-project-image-wrap">
              <Image src={project.image} alt={project.title} fill sizes="(max-width: 900px) 100vw, 50vw" className="catalog-project-image" />
            </div>
            <div className="catalog-project-body">
              <div className="catalog-service-topline">
                <span>{project.category}</span>
                <span>{project.status}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="catalog-project-meta">
                <span><MapPin size={15} /> {project.location}</span>
                <span><Clock3 size={15} /> {project.year}</span>
                <span><PencilRuler size={15} /> {project.area}</span>
              </div>
              <Link href="/contact" className="catalog-inline-cta">
                Discuss a similar project <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="catalog-proof-band">
        <div><ShieldCheck size={18} /> Marketplace clarity</div>
        <div><Sparkles size={18} /> Studio-level customization</div>
        <div><Building2 size={18} /> Real project delivery context</div>
      </div>
    </section>
  );
}
