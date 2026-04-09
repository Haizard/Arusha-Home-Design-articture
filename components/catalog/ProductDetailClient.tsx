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
import type { PlanDetail } from "@/lib/site-catalog";

export default function ProductDetailClient({ plan }: { plan: PlanDetail }) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedType, setSelectedType] = useState(plan.recommendedType);
  const [selectedTier, setSelectedTier] = useState(plan.estimateTiers[1]?.name ?? plan.estimateTiers[0].name);
  const [openFaq, setOpenFaq] = useState(0);

  const tier = useMemo(
    () => plan.estimateTiers.find((item) => item.name === selectedTier) ?? plan.estimateTiers[0],
    [plan.estimateTiers, selectedTier]
  );

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
              {plan.gallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={index === activeImage ? "active" : ""}
                  onClick={() => setActiveImage(index)}
                >
                  <Image src={image} alt={`${plan.title} preview ${index + 1}`} fill sizes="96px" className="detail-thumb-image" />
                </button>
              ))}
            </div>

            <div className="detail-main-column">
              <div className="detail-main-image-wrap">
                <Image src={plan.gallery[activeImage]} alt={plan.title} fill priority sizes="(max-width: 900px) 100vw, 60vw" className="detail-main-image" />
              </div>

              <div className="detail-spec-row">
                <div><Layers2 size={18} /><span>{plan.floors}</span></div>
                {plan.apartments ? <div><Building2 size={18} /><span>{plan.apartments}</span></div> : <div><BedDouble size={18} /><span>{plan.bedrooms}</span></div>}
                {plan.penthouses ? <div><Building2 size={18} /><span>{plan.penthouses}</span></div> : <div><Building2 size={18} /><span>{plan.bathrooms}</span></div>}
                <div><Ruler size={18} /><span>{plan.dimensions}</span></div>
                <div><MapPinned size={18} /><span>{plan.area}</span></div>
              </div>
            </div>

            <aside className="detail-sidebar">
              <div className="detail-sidebar-card">
                <h1>{plan.title} - {plan.id}</h1>

                <div className="detail-option-block">
                  <h2>File Type</h2>
                  <div className="detail-choice-list">
                    {plan.fileTypes.map((type) => (
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
                    {plan.drawingOptions.map((option, index) => (
                      <label key={option}>
                        <input type="checkbox" defaultChecked={index < 2} />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="detail-trust-list">
                  {plan.trustPoints.map((item) => (
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
                  <div className="detail-price">{plan.price}</div>
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
                  <p>{plan.description}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="detail-review-blip market-shell">
        <div className="detail-stars">★★★★★</div>
        <p>Ekong Richard</p>
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
              {plan.roomsIncluded.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>
          <div className="detail-inclusion-card">
            <h3>Architectural drawings</h3>
            <ul>
              {plan.drawingSets.architectural.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>
          <div className="detail-inclusion-card">
            <h3>Structural drawings</h3>
            <ul>
              {plan.drawingSets.structural.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>
          <div className="detail-inclusion-card">
            <h3>Electrical drawings</h3>
            <ul>
              {plan.drawingSets.electrical.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>
          <div className="detail-inclusion-card">
            <h3>Mechanical drawings</h3>
            <ul>
              {plan.drawingSets.mechanical.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>
          <div className="detail-inclusion-card">
            <h3>Bills of quantity</h3>
            <ul>
              {plan.drawingSets.boq.map((item) => (
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
          {plan.estimateTiers.map((item) => (
            <button
              key={item.name}
              type="button"
              className={item.name === selectedTier ? "active" : ""}
              onClick={() => setSelectedTier(item.name)}
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
          {tier.items.map((item) => (
            <div key={item.label} className="detail-estimate-row">
              <span>{item.label}</span>
              <span>{item.cost}</span>
            </div>
          ))}
          <div className="detail-estimate-total">
            <span>Total</span>
            <span>{tier.total}</span>
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
          {plan.faqs.map((faq, index) => {
            const open = openFaq === index;
            return (
              <div key={faq.question} className="detail-faq-item">
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
