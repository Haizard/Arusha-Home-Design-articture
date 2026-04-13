"use client";

import Link from "next/link";

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
      <section className="store-footer-top">
        <div className="market-shell store-service-grid">
          <div>
            <h3>Customer service</h3>
            <p>You can contact us at <a href="mailto:info@arushahome.com">info@arushahome.com</a> or via phone Monday to Friday, 9:00 AM to 6:00 PM EAT.</p>
          </div>
          <div>
            <h3>Secure payment</h3>
            <p>We accept credit and debit cards, bank transfers, and assisted billing during consultation-led purchases.</p>
          </div>
          <div>
            <h3>Refer a friend</h3>
            <p>Tell your friends about our house plans, custom design services, and promotional offers.</p>
            <div className="store-mini-socials">
              <SocialIcon type="facebook" />
              <SocialIcon type="x" />
              <SocialIcon type="whatsapp" />
            </div>
          </div>
        </div>
      </section>

      <section className="store-footer-main">
        <div className="market-shell store-footer-main-grid">
          <div className="store-newsletter">
            <h2>Don&apos;t Miss Out!</h2>
            <p>Sign up now to get the latest updates and offers.</p>
            <form className="store-newsletter-form">
              <input type="email" placeholder="Email" aria-label="Email address" />
              <button type="submit">Sign up</button>
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
                <li><Link href="/contact">FAQs</Link></li>
                <li><Link href="/contact">Affiliates</Link></li>
                <li><Link href="/contact">Terms</Link></li>
                <li><Link href="/contact">Privacy</Link></li>
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
              <p style={{ fontSize: "0.9rem", color: "rgba(17,17,17,0.6)", lineHeight: "1.6" }}>
                Arusha Home Design Pro is a dynamic architectural and interior design firm based in Arusha, Tanzania, serving clients across East Africa with elegance and functionality.
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
