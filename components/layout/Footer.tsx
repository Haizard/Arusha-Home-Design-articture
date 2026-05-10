"use client";

import Link from "next/link";
import Image from "next/image";

function SocialIcon({ type }: { type: "facebook" | "x" | "instagram" | "pinterest" | "linkedin" | "whatsapp" }) {
  const icons = {
    facebook: "f",
    x: "x",
    instagram: "ig",
    pinterest: "p",
    linkedin: "in",
    whatsapp: "wa",
  };
  return <span>{icons[type]}</span>;
}

export default function Footer() {
  return (
    <footer className="store-footer">
      <section className="store-footer-cta">
        <Image src="/images/service-kitchen.jpg" alt="Interior consultation" fill sizes="100vw" />
        <div className="store-footer-cta-shade" />
        <div className="market-shell store-footer-cta-inner">
          <div>
            <span>Stay connected with Arusha Home</span>
            <h2>Ready to turn a look into a finished space?</h2>
          </div>
          <Link href="/contact">Contact Us</Link>
        </div>
      </section>

      <section className="store-footer-top">
        <div className="market-shell store-service-grid">
          <div>
            <h3>Customer Service Centre</h3>
            <p>You can contact us at <a href="mailto:info@arushahome.com">info@arushahome.com</a> or via phone Monday to Friday, 9:00 AM to 6:00 PM EAT.</p>
          </div>
          <div>
            <h3>Quicklinks</h3>
            <p><Link href="/looks">Choose a Look</Link> · <Link href="/materials">Materials</Link> · <Link href="/projects">Projects</Link> · <Link href="/services">Services</Link></p>
          </div>
          <div>
            <h3>Follow Us</h3>
            <p>Follow our surface palettes, room galleries, and design updates.</p>
            <div className="store-mini-socials">
              <SocialIcon type="facebook" />
              <SocialIcon type="instagram" />
              <SocialIcon type="linkedin" />
            </div>
          </div>
        </div>
      </section>

      <section className="store-footer-main">
        <div className="market-shell store-footer-main-grid">
          <div className="store-newsletter">
            <h2>Beautiful spaces, delivered with clarity.</h2>
            <p>Get product range updates, design ideas, and consultation support.</p>
            <form className="store-newsletter-form">
              <input type="email" placeholder="Email" aria-label="Email address" />
              <button type="submit">Subscribe</button>
            </form>
            <div className="store-social-row">
              <SocialIcon type="facebook" />
              <SocialIcon type="x" />
              <SocialIcon type="instagram" />
              <SocialIcon type="pinterest" />
              <SocialIcon type="linkedin" />
              <SocialIcon type="whatsapp" />
            </div>
          </div>

          <div className="store-footer-links" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div>
              <h4>Support</h4>
              <ul>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/looks">Choose a Look</Link></li>
                <li><Link href="/materials">Material Studio</Link></li>
                <li><Link href="/products">House Plans</Link></li>
              </ul>
            </div>
            <div>
              <h4>Product & Services</h4>
              <ul>
                <li><Link href="/products">Tv showcase</Link></li>
                <li><Link href="/products">Kitchen carbinet</Link></li>
                <li><Link href="/products">Bedroom wadrobe</Link></li>
                <li><Link href="/products">Bed</Link></li>
                <li><Link href="/products">Bathroom carbinet</Link></li>
                <li><Link href="/services">Architecture drawing</Link></li>
                <li><Link href="/services">Interior design</Link></li>
                <li><Link href="/services">Exterior design</Link></li>
                <li><Link href="/services">Renovation</Link></li>
                <li><Link href="/services">Construction</Link></li>
              </ul>
            </div>
            <div>
              <h4>About</h4>
              <p>
                Arusha Home Design Pro helps clients choose surface palettes, room looks, product ranges, plans, and interiors with confidence.
              </p>
            </div>
          </div>
        </div>

        <div className="market-shell store-payment-row">
          <span>AMEX</span>
          <span>Apple Pay</span>
          <span>Discover</span>
          <span>GPay</span>
          <span>Mastercard</span>
          <span>PayPal</span>
          <span>Visa</span>
        </div>
      </section>
    </footer>
  );
}
