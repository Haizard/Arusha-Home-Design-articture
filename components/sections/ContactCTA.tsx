"use client";
import Link from "next/link";
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";

export default function ContactCTA() {
  return (
    <section
      className="section"
      id="contact-cta"
      aria-label="Contact call to action"
      style={{
        backgroundColor: "var(--color-void)",
        borderTop: "1px solid var(--color-border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container" style={{ position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6rem",
            alignItems: "center",
          }}
          className="cta-inner"
        >
          {/* Left */}
          <div>
            <div className="section-label">Start a Project</div>
            <h2
              className="font-display"
              style={{
                fontSize: "var(--text-headline)",
                fontWeight: 700,
                color: "var(--color-stone-100)",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                marginBottom: "1.5rem",
              }}
            >
              Ready to
              <br />
              <em style={{ fontStyle: "italic", color: "var(--color-gold)", fontWeight: 400 }}>
                Transform
              </em>
              <br />
              Your Space?
            </h2>
            <p
              style={{
                color: "var(--color-stone-400)",
                fontSize: "1rem",
                lineHeight: 1.8,
                maxWidth: "400px",
                marginBottom: "2.5rem",
              }}
            >
              Let&apos;s discuss your vision. Our team is ready to turn your ideas into
              breathtaking spaces across East Africa.
            </p>
            <Link href="/contact" className="btn-primary" id="cta-contact-btn">
              Get a Free Consultation <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right — Contact info */}
          <div>
            <div
              style={{
                background: "var(--color-graphite)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-xl)",
                padding: "2.5rem",
              }}
            >
              <h3
                className="font-display"
                style={{
                  fontSize: "1.25rem",
                  color: "var(--color-stone-100)",
                  marginBottom: "2rem",
                  fontWeight: 600,
                }}
              >
                Arusha Office
              </h3>

              {[
                {
                  Icon: MapPin,
                  label: "Address",
                  value: "Ngaramtoni, Arusha – Tanzania",
                },
                {
                  Icon: Mail,
                  label: "Email",
                  value: "info@arushahome.com",
                  href: "mailto:info@arushahome.com",
                },
                {
                  Icon: Phone,
                  label: "Phone",
                  value: "+255 745 889 764",
                  href: "tel:+255745889764",
                },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} className="contact-info-item">
                  <div className="contact-info-icon">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="contact-info-label">{label}</div>
                    {href ? (
                      <a
                        href={href}
                        className="contact-info-value"
                        style={{ textDecoration: "none", transition: "color 0.3s" }}
                        onMouseEnter={(e) =>
                          ((e.target as HTMLElement).style.color = "var(--color-gold)")
                        }
                        onMouseLeave={(e) =>
                          ((e.target as HTMLElement).style.color = "var(--color-stone-100)")
                        }
                      >
                        {value}
                      </a>
                    ) : (
                      <div className="contact-info-value">{value}</div>
                    )}
                  </div>
                </div>
              ))}

              {/* Gold line */}
              <div
                style={{
                  marginTop: "2rem",
                  paddingTop: "2rem",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-stone-600)",
                  }}
                >
                  Mon–Sat · 8:00 AM – 6:00 PM EAT
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .cta-inner {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
