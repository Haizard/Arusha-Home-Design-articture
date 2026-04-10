"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  Building2,
  Calculator,
  Clock3,
  Home,
  Layers2,
  MoveRight,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  Wallet,
} from "lucide-react";

const heroSlides = [
  {
    image: "/images/hero-2.jpg",
    title: "Build your dream home with a smarter starting point.",
  },
  {
    image: "/images/proj-1.jpg",
    title: "Luxury design language made practical for East African living.",
  },
  {
    image: "/images/projects-hero.jpg",
    title: "Choose a plan, refine it with us, and move confidently into construction.",
  },
];

const highlights = [
  { icon: Clock3, title: "Instant digital delivery", text: "Receive plan previews and consultation steps quickly." },
  { icon: ShieldCheck, title: "Design confidence", text: "Clear specs, realistic guidance, and revision support." },
  { icon: Wallet, title: "Flexible budget paths", text: "Explore ideas by scale, style, and cost bracket." },
  { icon: Calculator, title: "Cost-aware planning", text: "Estimate complexity before stepping into construction." },
  { icon: Sparkles, title: "Custom refinement", text: "Adapt plans for your site, taste, and family needs." },
];

const categories = [
  { title: "Duplex & family compounds", image: "/images/proj-1.jpg", href: "/projects" },
  { title: "Apartment concepts", image: "/images/about-hero.jpg", href: "/projects" },
  { title: "Modern farm homes", image: "/images/hero-3.jpg", href: "/products" },
  { title: "Garage house plans", image: "/images/hero-4.jpg", href: "/products" },
  { title: "Modern villas", image: "/images/projects-hero.jpg", href: "/projects" },
];

const browseFacets = [
  { label: "By size", items: ["Under 100 sqm", "200-300 sqm", "500+ sqm"] },
  { label: "By bedrooms", items: ["2 bedrooms", "3 bedrooms", "4 bedrooms"] },
  { label: "By style", items: ["Modern", "Contemporary", "Luxury"] },
  { label: "By budget", items: ["Under $100", "$100-$300", "$300-$500"] },
];

const familyPlans = [
  { title: "2 bedroom plans", subtitle: "Compact homes for efficient living", image: "/images/prod-bed.jpg" },
  { title: "3 bedroom plans", subtitle: "Balanced layouts for growing families", image: "/images/proj-1.jpg" },
  { title: "4 bedroom plans", subtitle: "More room for hosting and flexibility", image: "/images/hero-2.jpg" },
  { title: "5+ bedroom plans", subtitle: "Statement homes with generous scale", image: "/images/projects-hero.jpg" },
];

const budgetPlans = [
  { title: "Under $100 plans", image: "/images/proj-2.jpg" },
  { title: "$100 to $300 plans", image: "/images/proj-3.jpg" },
  { title: "$300 to $500 plans", image: "/images/hero-4.jpg" },
];

const featuredPlans = [
  {
    title: "Two-story family villa",
    id: "AHD-24411",
    image: "/images/hero-2.jpg",
    price: "From $270",
    floors: "2 Floors",
    bedrooms: "4 Bedrooms",
    bathrooms: "4 Bathrooms",
    area: "300 sqm",
  },
  {
    title: "Contemporary courtyard home",
    id: "AHD-13418",
    image: "/images/proj-1.jpg",
    price: "From $181",
    floors: "1 Floor",
    bedrooms: "3 Bedrooms",
    bathrooms: "4 Bathrooms",
    area: "202 sqm",
  },
  {
    title: "Modern luxury mansion",
    id: "AHD-38901",
    image: "/images/projects-hero.jpg",
    price: "From $1,961",
    floors: "3 Floors",
    bedrooms: "8 Bedrooms",
    bathrooms: "10 Bathrooms",
    area: "1,068 sqm",
  },
];

const newPlans = [
  {
    title: "Stylish 3-bedroom, 2-story house plan",
    id: "AHD-23307",
    image: "/images/proj-1.jpg",
    price: "From $394",
    floors: "2 Floors",
    bedrooms: "3 Bedrooms",
    bathrooms: "3 Bathrooms",
    area: "438 sqm",
  },
  {
    title: "Modern 2-bedroom pavilion plan",
    id: "AHD-22304",
    image: "/images/proj-2.jpg",
    price: "From $329",
    floors: "2 Floors",
    bedrooms: "2 Bedrooms",
    bathrooms: "3 Bathrooms",
    area: "366 sqm",
  },
  {
    title: "Spacious 7-bedroom residence",
    id: "AHD-27903",
    image: "/images/proj-3.jpg",
    price: "From $639",
    floors: "2 Floors",
    bedrooms: "7 Bedrooms",
    bathrooms: "9 Bathrooms",
    area: "710 sqm",
  },
];

const testimonials = [
  {
    quote:
      "Very efficient, timely, and money well spent. The plan process felt immediate and reassuring, and the site made it easy to compare options before we reached out.",
    author: "Ekong Richard",
  },
  {
    quote:
      "The new browsing experience feels clear and premium. We could shortlist homes fast, understand the specs, and then speak to the studio with confidence.",
    author: "Amina Hassan",
  },
  {
    quote:
      "This feels like a real design marketplace now. The visuals are inspiring, but the practical details are what made us trust the team.",
    author: "James Mwangi",
  },
];

function PlanCard({
  plan,
  badge,
}: {
  plan: {
    title: string;
    id: string;
    image: string;
    price: string;
    floors: string;
    bedrooms: string;
    bathrooms: string;
    area: string;
  };
  badge?: string;
}) {
  return (
    <article className="market-plan-card">
      <div className="market-plan-image-wrap">
        {badge ? <span className="market-plan-badge">{badge}</span> : null}
        <Image src={plan.image} alt={plan.title} fill sizes="(max-width: 900px) 100vw, 33vw" className="market-plan-image" />
      </div>
      <div className="market-plan-body">
        <div className="market-plan-meta">
          <span>{plan.id}</span>
          <span className="market-rating">
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} />
          </span>
        </div>
        <h3>{plan.title}</h3>
        <p className="market-price">{plan.price}</p>
        <div className="market-spec-grid">
          <span><Layers2 size={15} /> {plan.floors}</span>
          <span><BedDouble size={15} /> {plan.bedrooms}</span>
          <span><Home size={15} /> {plan.bathrooms}</span>
          <span><Ruler size={15} /> {plan.area}</span>
        </div>
      </div>
    </article>
  );
}

export default function MarketplaceHome() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 5500);
    return () => window.clearInterval(interval);
  }, []);

  const currentSlide = useMemo(() => heroSlides[activeSlide], [activeSlide]);
  const quote = testimonials[activeTestimonial];

  return (
    <div className="market-home">
      <section className="market-hero">
        <div className="market-hero-media">
          {heroSlides.map((slide, index) => (
            <div key={slide.image} className={`market-hero-slide ${index === activeSlide ? "active" : ""}`}>
              <Image src={slide.image} alt={slide.title} fill priority={index === 0} sizes="100vw" className="market-hero-image" />
            </div>
          ))}
          <div className="market-hero-overlay" />
        </div>

        <div className="market-shell market-hero-content">
          <div className="market-hero-copy">
            <h1>{currentSlide.title}</h1>
            <div className="market-slide-dots" aria-label="Hero slide controls">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={index === activeSlide ? "active" : ""}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="market-benefits">
        <div className="market-shell market-benefit-row">
          {highlights.map((item) => (
            <div key={item.title} className="market-benefit">
              <item.icon size={20} />
              <div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="market-shell market-facet-band">
        <div className="market-facet-grid">
          {browseFacets.map((facet) => (
            <article key={facet.label} className="market-facet-card">
              <span>{facet.label}</span>
              <div>
                {facet.items.map((item) => (
                  <Link key={item} href="/products">
                    {item}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="market-categories market-shell">
        <div className="market-mini-rail">
          {categories.map((category) => (
            <Link key={category.title} href={category.href} className="market-mini-card">
              <Image src={category.image} alt={category.title} fill sizes="(max-width: 900px) 60vw, 20vw" className="market-mini-image" />
              <span>{category.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="market-section market-shell">
        <div className="market-section-heading">
          <div>
            <span className="market-kicker">Plans by household size</span>
            <h2>Plans for every family size</h2>
            <p>We believe every family deserves a home that fits its routine, aspirations, and future growth.</p>
          </div>
          <Link href="/products" className="market-inline-link">
            View all <MoveRight size={16} />
          </Link>
        </div>
        <div className="market-grid market-grid-four">
          {familyPlans.map((item) => (
            <article key={item.title} className="market-category-card">
              <div className="market-category-image-wrap">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 900px) 100vw, 25vw" className="market-category-image" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="market-section market-shell">
        <div className="market-section-heading">
          <div>
            <span className="market-kicker">Shop by budget</span>
            <h2>Plans for every budget</h2>
            <p>Explore practical cost bands without losing the sense of aspiration and architectural quality.</p>
          </div>
          <Link href="/products" className="market-inline-link">
            View all <MoveRight size={16} />
          </Link>
        </div>
        <div className="market-grid market-grid-three">
          {budgetPlans.map((item) => (
            <article key={item.title} className="market-budget-card">
              <Image src={item.image} alt={item.title} fill sizes="(max-width: 900px) 100vw, 33vw" className="market-budget-image" />
              <div className="market-budget-overlay" />
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="market-testimonial">
        <div className="market-shell">
          <div className="market-testimonial-card">
            <div className="market-stars">
              {[0, 1, 2, 3, 4].map((star) => (
                <Star key={star} size={18} fill="currentColor" />
              ))}
            </div>
            <blockquote>{quote.quote}</blockquote>
            <p>{quote.author}</p>
            <div className="market-quote-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={index === activeTestimonial ? "active" : ""}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`Show testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="market-badge-strip">
            <div><BadgeCheck size={18} /> 179 verified reviews</div>
            <div><ShieldCheck size={18} /> Transparent design process</div>
            <div><Building2 size={18} /> Trusted by residential and commercial clients</div>
          </div>
        </div>
      </section>

      <section className="market-section market-shell">
        <div className="market-section-heading">
          <div>
            <span className="market-kicker">Featured catalog</span>
            <h2>Best selling plans</h2>
            <p>Structured like a storefront, but grounded in architecture and customization services.</p>
          </div>
          <Link href="/products" className="market-inline-link">
            View all <MoveRight size={16} />
          </Link>
        </div>
        <div className="market-grid market-grid-three">
          {featuredPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} badge="Best Seller" />
          ))}
        </div>
      </section>

      <section className="market-section market-shell">
        <div className="market-section-heading">
          <div>
            <span className="market-kicker">Fresh arrivals</span>
            <h2>New plans every week</h2>
            <p>New layouts and evolving plan concepts keep the homepage feeling alive and worth revisiting.</p>
          </div>
          <Link href="/projects" className="market-inline-link">
            View all <MoveRight size={16} />
          </Link>
        </div>
        <div className="market-grid market-grid-three">
          {newPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      <section className="market-section market-shell">
        <div className="market-story-heading">
          <span className="market-kicker">From dream to home</span>
          <h2>Compare the vision with the real build journey.</h2>
          <p>Mixing concept renders and under-construction photos makes the process tangible and trustworthy.</p>
        </div>
        <div className="market-compare">
          <div className="market-compare-panel">
            <Image src="/images/hero-3.jpg" alt="Rendered home concept" fill sizes="(max-width: 900px) 100vw, 50vw" className="market-compare-image" />
            <span>Render</span>
          </div>
          <div className="market-compare-panel">
            <Image src="/images/hero-4.jpg" alt="Built home exterior" fill sizes="(max-width: 900px) 100vw, 50vw" className="market-compare-image" />
            <span>Under Construction</span>
          </div>
        </div>
      </section>

      <section className="market-closing-banner">
        <div className="market-closing-media">
          <Image src="/images/services-hero.jpg" alt="Modern architecture showcase" fill sizes="100vw" className="market-closing-image" />
          <div className="market-closing-overlay" />
        </div>
        <div className="market-shell market-closing-content">
          <span className="market-kicker light">Modern homes, luxurious style</span>
          <h2>A homepage that feels closer to a plan marketplace than a studio brochure.</h2>
          <p>
            We design beautiful, up-to-date homes with practical filters, social proof, and a stronger browsing flow that invites customers deeper into the catalog.
          </p>
          <div className="market-hero-actions">
            <Link href="/products" className="market-button primary">
              Explore all plans <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="market-button secondary on-dark">
              Talk to the studio
            </Link>
          </div>
        </div>
      </section>

      <section className="market-shell market-bottom-gallery">
        <div className="market-bottom-copy">
          <span className="market-kicker">Customize the dream home you have in mind</span>
          <h2>Built for browsing, ready for consultation.</h2>
          <p>
            The new home page now leads with discoverability and trust, while still leaving room for your architectural expertise to shine.
          </p>
        </div>
        <div className="market-bottom-collage">
          <div className="market-collage-large">
            <Image src="/images/proj-1.jpg" alt="Plan preview board" fill sizes="(max-width: 900px) 100vw, 28vw" className="market-collage-image" />
          </div>
          <div className="market-collage-small">
            <Image src="/images/proj-2.jpg" alt="Exterior example" fill sizes="(max-width: 900px) 100vw, 20vw" className="market-collage-image" />
          </div>
          <div className="market-collage-small lower">
            <Image src="/images/proj-3.jpg" alt="Landscape example" fill sizes="(max-width: 900px) 100vw, 20vw" className="market-collage-image" />
          </div>
        </div>
      </section>
    </div>
  );
}
