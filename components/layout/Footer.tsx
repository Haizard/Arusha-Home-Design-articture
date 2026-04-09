"use client";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

// Brand icons not in lucide-react — inline SVG
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const services = [
  "Customized Kitchens & Wardrobes",
  "Architecture",
  "Interior Design",
  "Planning & Design",
  "3D Modelling",
  "Construction",
  "Project Supervision",
  "Exterior Design",
  "Renovation",
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Portfolio" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-container">
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
            gap: "4rem",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div className="footer-logo">Arusha Home</div>
            <p className="footer-tagline">
              Transforming spaces into inspiring, practical environments across East Africa through
              creativity, precision, and sustainable design.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
              {[
                { Icon: InstagramIcon, href: "#", label: "Instagram" },
                { Icon: FacebookIcon, href: "#", label: "Facebook" },
                { Icon: XIcon, href: "#", label: "Twitter / X" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1px solid var(--color-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-stone-400)",
                    transition: "border-color 0.3s, color 0.3s, transform 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-gold)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-gold)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-border)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-stone-400)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="footer-heading">Services</h3>
            <ul className="footer-links">
              {services.map((s) => (
                <li key={s}>
                  <Link href="/services" className="footer-link">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="footer-heading">Get in Touch</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                {
                  Icon: MapPin,
                  text: "Ngaramtoni, Arusha – Tanzania",
                },
                {
                  Icon: Mail,
                  text: "info@arushahome.com",
                  href: "mailto:info@arushahome.com",
                },
                {
                  Icon: Phone,
                  text: "+255 745 889 764",
                  href: "tel:+255745889764",
                },
              ].map(({ Icon, text, href }) => (
                <div
                  key={text}
                  style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}
                >
                  <div
                    style={{
                      marginTop: "2px",
                      color: "var(--color-gold)",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={15} />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--color-stone-400)",
                        textDecoration: "none",
                        transition: "color 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLAnchorElement).style.color = "var(--color-stone-100)")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLAnchorElement).style.color = "var(--color-stone-400)")
                      }
                    >
                      {text}
                    </a>
                  ) : (
                    <span style={{ fontSize: "0.875rem", color: "var(--color-stone-400)" }}>
                      {text}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Arusha Home Design Pro. All rights reserved.
          </p>
          <p className="footer-copy" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Arusha · Tanzania ·{" "}
            <span style={{ color: "var(--color-gold)" }}>East Africa</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 400px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
