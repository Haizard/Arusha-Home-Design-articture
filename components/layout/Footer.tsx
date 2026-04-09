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

          <div className="store-footer-links">
            <div>
              <h4>Support</h4>
              <ul>
                <li><Link href="/contact">Frequently Asked Questions</Link></li>
                <li><Link href="/contact">For Affiliates</Link></li>
                <li><Link href="/contact">Refer a friend</Link></li>
                <li><Link href="/contact">Terms and Conditions</Link></li>
                <li><Link href="/contact">Privacy Policy</Link></li>
                <li><Link href="/contact">Refund policy</Link></li>
              </ul>
            </div>
            <div>
              <h4>About</h4>
              <p>
                Arusha Home Design Pro provides practical, East Africa-aware house plans and studio-level customization support with premium documentation and design options.
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
