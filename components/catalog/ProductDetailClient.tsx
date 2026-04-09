"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  Building2,
  CircleDollarSign,
  CreditCard,
  Heart,
  Layers2,
  MapPinned,
  Minus,
  Plus,
  Ruler,
  Share2,
  ShieldCheck,
} from "lucide-react";

type ProductPackage = {
  name?: string;
  price?: number;
  features?: string[];
};

type ProductFaq = {
  question?: string;
  answer?: string;
};

type CmsProduct = {
  _id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  images?: string[];
  badge?: string;
  rating?: number;
  reviewName?: string;
  duplex?: boolean;
  priceLabel?: string;
  apartments?: string;
  penthouses?: string;
  fileTypes?: string[];
  recommendedType?: string;
  drawingOptions?: string[];
  trustPoints?: string[];
  roomsIncluded?: string[];
  drawingSets?: {
    architectural?: string[];
    structural?: string[];
    electrical?: string[];
    mechanical?: string[];
    boq?: string[];
  };
  estimateTiers?: {
    name?: string;
    total?: string;
    items?: { label?: string; cost?: string }[];
  }[];
  planId?: string;
  area?: string;
  dimensions?: string;
  bedrooms?: number;
  bathrooms?: number;
  stories?: number;
  garage?: number;
  features?: string[];
  basePrice?: number;
  packages?: ProductPackage[];
  faqs?: ProductFaq[];
};

const defaultFaqs: ProductFaq[] = [
  {
    question: "Can this design be customized?",
    answer: "Yes. We can adapt the layout, elevation, and details to better fit your site and project goals.",
  },
  {
    question: "What do I receive after purchase?",
    answer: "You receive the selected package details and our team can guide you on the next steps for documentation or customization.",
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery timing depends on the package and whether customization is required. We normally confirm the timeline during consultation.",
  },
];

export default function ProductDetailClient({ product }: { product: CmsProduct }) {
  const gallery = product.images && product.images.length > 0 ? [product.imageUrl, ...product.images] : [product.imageUrl];
  const [activeImage, setActiveImage] = useState(0);
  const fileTypes = product.fileTypes && product.fileTypes.length > 0 ? product.fileTypes : ["CAD + PDF", "PDF"];
  const [selectedType, setSelectedType] = useState(product.recommendedType || fileTypes[0]);
  const estimateTiers = useMemo(
    () => (product.estimateTiers && product.estimateTiers.length > 0
      ? product.estimateTiers.filter((tier) => tier.name && tier.total)
      : [
          {
            name: "Standard",
            total: product.priceLabel || (product.basePrice ? `From $${product.basePrice}` : "Price on request"),
            items: [
              { label: "Design package", cost: product.priceLabel || (product.basePrice ? `From $${product.basePrice}` : "On request") },
            ],
          },
        ]),
    [product.estimateTiers, product.priceLabel, product.basePrice]
  );
  const [selectedTier, setSelectedTier] = useState(estimateTiers[1]?.name ?? estimateTiers[0]?.name ?? "");
  const [openFaq, setOpenFaq] = useState(0);

  const tier = useMemo(
    () => estimateTiers.find((item) => item.name === selectedTier) ?? estimateTiers[0],
    [estimateTiers, selectedTier]
  );

  const displayPrice = product.priceLabel || (product.basePrice ? `From $${product.basePrice}` : "Price on request");
  const reviewStars = "★".repeat(Math.max(1, Math.min(5, Math.round(product.rating || 5))));
  const trustPoints = product.trustPoints && product.trustPoints.length > 0 ? product.trustPoints : [
    "Instant digital delivery",
    "100% money guarantee",
    "Multiple payment options",
  ];
  const drawingOptions = product.drawingOptions && product.drawingOptions.length > 0 ? product.drawingOptions : [
    "Architectural Drawings",
    "Structural Drawings",
    "Mechanical Drawings",
    "Electrical Drawings",
    "Bills of Quantity (BOQ)",
  ];
  const roomsIncluded = product.roomsIncluded && product.roomsIncluded.length > 0 ? product.roomsIncluded : (product.features?.length ? product.features : ["Master Bedroom", "Living Room", "Kitchen"]);
  const drawingSets = {
    architectural: product.drawingSets?.architectural?.length ? product.drawingSets.architectural : ["Foundation plan", "Floor plans"],
    structural: product.drawingSets?.structural?.length ? product.drawingSets.structural : ["Structural calculations", "Foundation layout"],
    electrical: product.drawingSets?.electrical?.length ? product.drawingSets.electrical : ["Electrical panel", "Lighting and switches"],
    mechanical: product.drawingSets?.mechanical?.length ? product.drawingSets.mechanical : ["Clean water", "Waste water"],
    boq: product.drawingSets?.boq?.length ? product.drawingSets.boq : ["Bills of quantity (BOQ)"],
  };
  const faqs = product.faqs && product.faqs.length > 0 ? product.faqs.filter((faq) => faq.question && faq.answer) : defaultFaqs;

  return (
    <main className="detail-page">
      <section className="market-shell detail-hero-shell">
        <div className="detail-topbar">
          <Link href="/products" className="detail-backlink">
            <ArrowLeft size={16} /> Back to catalog
          </Link>
          <div className="detail-actions">
            <button type="button"><Heart size={16} /> Save</button>
            <button type="button"><Share2 size={16} /> Share</button>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-layout">
            <div className="detail-gallery-rail">
              {gallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={index === activeImage ? "active" : ""}
                  onClick={() => setActiveImage(index)}
                >
                  <Image src={image} alt={`${product.title} preview ${index + 1}`} fill sizes="96px" className="detail-thumb-image" />
                </button>
              ))}
            </div>

            <div className="detail-main-column">
              <div className="detail-main-image-wrap">
                <Image src={gallery[activeImage]} alt={product.title} fill priority sizes="(max-width: 900px) 100vw, 60vw" className="detail-main-image" />
              </div>

              <div className="detail-spec-row">
                <div><Layers2 size={18} /><span>{product.stories ?? 1} Floors</span></div>
                {product.apartments ? <div><Building2 size={18} /><span>{product.apartments}</span></div> : <div><BedDouble size={18} /><span>{product.bedrooms ?? 0} Bedrooms</span></div>}
                {product.penthouses ? <div><Building2 size={18} /><span>{product.penthouses}</span></div> : <div><Building2 size={18} /><span>{product.bathrooms ?? 0} Bathrooms</span></div>}
                <div><Ruler size={18} /><span>{product.dimensions || "Custom size"}</span></div>
                <div><MapPinned size={18} /><span>{product.area || "Area on request"}</span></div>
              </div>
            </div>

            <aside className="detail-sidebar">
              <div className="detail-sidebar-card">
                <h1>{product.title}{product.planId ? ` - ${product.planId}` : ""}</h1>

                <div className="detail-option-block">
                  <h2>File Type</h2>
                  <div className="detail-choice-list">
                    {fileTypes.map((type) => (
                      <label key={type}>
                        <input type="radio" checked={selectedType === type} onChange={() => setSelectedType(type)} />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="detail-option-block">
                  <h2>Drawing Sets</h2>
                  <div className="detail-choice-list checkbox">
                    {drawingOptions.map((option, index) => (
                      <label key={option}>
                        <input type="checkbox" defaultChecked={index < 2} />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="detail-trust-list">
                  {trustPoints.map((item) => (
                    <div key={item}>
                      <ShieldCheck size={16} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="detail-buy-row">
                  <button type="button" className="detail-buy-button">
                    Buy Now
                  </button>
                  <div className="detail-price">{displayPrice}</div>
                </div>

                <div className="detail-payment-row">
                  <span>Visa</span>
                  <span>Mastercard</span>
                  <span>PayPal</span>
                  <span>GPay</span>
                </div>

                <button type="button" className="detail-wishlist">
                  <Heart size={16} /> Add to wishlist
                </button>

                <div className="detail-description">
                  <h3>Description</h3>
                  <p>{product.description}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="detail-review-blip market-shell">
        <div className="detail-stars">{reviewStars}</div>
        <p>{product.reviewName || "Featured homeowner"}</p>
      </section>

      <section className="market-shell detail-section">
        <div className="detail-section-heading">
          <span className="market-kicker">What is included</span>
          <h2>Drawing Sets and Rooms Included</h2>
        </div>
        <div className="detail-drawing-grid">
          <div className="detail-inclusion-card">
            <h3>Rooms included</h3>
            <ul>
              {roomsIncluded.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>
          <div className="detail-inclusion-card">
            <h3>Architectural drawings</h3>
            <ul>
              {drawingSets.architectural.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>
          <div className="detail-inclusion-card">
            <h3>Structural drawings</h3>
            <ul>
              {drawingSets.structural.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>
          <div className="detail-inclusion-card">
            <h3>Electrical drawings</h3>
            <ul>
              {drawingSets.electrical.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>
          <div className="detail-inclusion-card">
            <h3>Mechanical drawings</h3>
            <ul>
              {drawingSets.mechanical.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>
          <div className="detail-inclusion-card">
            <h3>Bills of quantity</h3>
            <ul>
              {drawingSets.boq.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="market-shell detail-section">
        <div className="detail-section-heading centered">
          <span className="market-kicker">Build planning</span>
          <h2>Construction Cost Calculator</h2>
        </div>

        <div className="detail-tier-tabs">
          {estimateTiers.map((item) => (
            <button
              key={item.name}
              type="button"
              className={item.name === selectedTier ? "active" : ""}
              onClick={() => setSelectedTier(item.name ?? "")}
            >
              <CircleDollarSign size={18} />
              {item.name}
            </button>
          ))}
        </div>

        <div className="detail-estimate-table">
          <div className="detail-estimate-head">
            <span>Item</span>
            <span>Cost Estimates</span>
          </div>
          {tier?.items?.map((item, index) => (
            <div key={`${item.label}-${index}`} className="detail-estimate-row">
              <span>{item.label}</span>
              <span>{item.cost}</span>
            </div>
          ))}
          <div className="detail-estimate-total">
            <span>Total</span>
            <span>{tier?.total}</span>
          </div>
        </div>

        <div className="detail-customize-banner">
          <CreditCard size={22} />
          <p>
            You can customize your dream home with the best layout, a practical budget path, and premium detailing that suits your lifestyle.
          </p>
          <Link href="/contact">Customize your plan</Link>
        </div>
      </section>

      <section className="market-shell detail-section detail-faq-section">
        <div className="detail-faq-copy">
          <h2>FAQ</h2>
          <p>Our customer support is available Monday to Friday, with an average response time of 24 hours.</p>
        </div>

        <div className="detail-faq-card">
          {faqs.map((faq, index) => {
            const open = openFaq === index;
            return (
              <div key={`${faq.question}-${index}`} className="detail-faq-item">
                <button type="button" onClick={() => setOpenFaq(open ? -1 : index)}>
                  <span>{faq.question}</span>
                  {open ? <Minus size={18} /> : <Plus size={18} />}
                </button>
                {open ? <p>{faq.answer}</p> : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="detail-support-strip">
        <div className="market-shell detail-support-grid">
          <div>
            <h3>Customer service</h3>
            <p>Reach us for plan guidance, customization questions, and pre-construction clarity.</p>
          </div>
          <div>
            <h3>Secure payment</h3>
            <p>We accept card payments, transfers, and assisted billing during consultation-led orders.</p>
          </div>
          <div>
            <h3>Refer a friend</h3>
            <p>Share the storefront with someone exploring house plans, interiors, or a custom design brief.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
