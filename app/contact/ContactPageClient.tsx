"use client";
import Image from "next/image";
import { useState } from "react";
import { MapPin, Mail, Phone, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactPageClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <section className="page-hero" aria-label="Contact page header">
        <Image
          src="/images/contact-hero.jpg"
          alt="Modern meeting space architecture"
          fill
          priority
          style={{ objectFit: "cover", opacity: 0.5 }}
          sizes="100vw"
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            Let&apos;s Talk
          </div>
          <h1
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
            Start Your
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-gold)", fontWeight: 400 }}>
              Dream Project
            </em>
          </h1>
          <p
            style={{
              color: "var(--color-stone-400)",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            Ready to transform your space? Reach out for a free consultation and let&apos;s bring
            your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section" style={{ background: "var(--color-void)" }}>
        <div className="section-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: "5rem",
              alignItems: "start",
            }}
            className="contact-grid"
          >
            {/* Left — Info */}
            <div>
              <div className="section-label">Contact Information</div>
              <h2
                className="font-display"
                style={{
                  fontSize: "var(--text-subhead)",
                  fontWeight: 700,
                  color: "var(--color-stone-100)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginBottom: "2.5rem",
                }}
              >
                We&apos;d Love to Hear From You
              </h2>

              {/* Info Items */}
              <div>
                {[
                  {
                    Icon: MapPin,
                    label: "Office Address",
                    value: "Ngaramtoni, Arusha – Tanzania",
                  },
                  {
                    Icon: Mail,
                    label: "Email Address",
                    value: "info@arushahome.com",
                    href: "mailto:info@arushahome.com",
                  },
                  {
                    Icon: Phone,
                    label: "Phone Number",
                    value: "+255 745 889 764",
                    href: "tel:+255745889764",
                  },
                  {
                    Icon: Clock,
                    label: "Working Hours",
                    value: "Monday – Saturday: 8:00 AM – 6:00 PM EAT",
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
              </div>

              {/* Map placeholder */}
              <div
                style={{
                  marginTop: "3rem",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-graphite)",
                  height: "220px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <MapPin size={28} color="var(--color-gold)" />
                <p
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-stone-600)",
                    textAlign: "center",
                  }}
                >
                  Ngaramtoni, Arusha
                  <br />
                  Tanzania
                </p>
              </div>
            </div>

            {/* Right — Form */}
            <div>
              <div
                style={{
                  background: "var(--color-graphite)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-xl)",
                  padding: "clamp(2rem, 4vw, 3.5rem)",
                }}
              >
                {submitted ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "3rem 2rem",
                    }}
                  >
                    <CheckCircle
                      size={56}
                      color="var(--color-gold)"
                      style={{ margin: "0 auto 1.5rem" }}
                    />
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "1.75rem",
                        color: "var(--color-stone-100)",
                        marginBottom: "1rem",
                      }}
                    >
                      Message Sent!
                    </h3>
                    <p style={{ color: "var(--color-stone-400)", lineHeight: 1.7 }}>
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", service: "", message: "" }); }}
                      className="btn-ghost"
                      style={{ marginTop: "2rem" }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "1.4rem",
                        fontWeight: 600,
                        color: "var(--color-stone-100)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Send Us a Message
                    </h3>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--color-stone-400)",
                        marginBottom: "2rem",
                      }}
                    >
                      Fill the form below and we&apos;ll get in touch within 24 hours.
                    </p>

                    <form
                      className="contact-form"
                      onSubmit={handleSubmit}
                      style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
                    >
                      <div
                        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
                        className="form-row"
                      >
                        <div>
                          <label
                            htmlFor="name"
                            style={{
                              display: "block",
                              fontFamily: "var(--font-ui)",
                              fontSize: "0.65rem",
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              color: "var(--color-stone-400)",
                              marginBottom: "0.5rem",
                            }}
                          >
                            Full Name *
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            style={{
                              display: "block",
                              fontFamily: "var(--font-ui)",
                              fontSize: "0.65rem",
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              color: "var(--color-stone-400)",
                              marginBottom: "0.5rem",
                            }}
                          >
                            Email Address *
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div
                        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
                        className="form-row"
                      >
                        <div>
                          <label
                            htmlFor="phone"
                            style={{
                              display: "block",
                              fontFamily: "var(--font-ui)",
                              fontSize: "0.65rem",
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              color: "var(--color-stone-400)",
                              marginBottom: "0.5rem",
                            }}
                          >
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+255 700 000 000"
                            value={form.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="service"
                            style={{
                              display: "block",
                              fontFamily: "var(--font-ui)",
                              fontSize: "0.65rem",
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              color: "var(--color-stone-400)",
                              marginBottom: "0.5rem",
                            }}
                          >
                            Service Interested In
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={form.service}
                            onChange={handleChange}
                          >
                            <option value="">Select a service</option>
                            <option value="architecture">Architecture</option>
                            <option value="interior">Interior Design</option>
                            <option value="kitchen">Kitchen & Wardrobes</option>
                            <option value="3d">3D Modelling</option>
                            <option value="construction">Construction</option>
                            <option value="supervision">Project Supervision</option>
                            <option value="planning">Planning & Design</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          style={{
                            display: "block",
                            fontFamily: "var(--font-ui)",
                            fontSize: "0.65rem",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "var(--color-stone-400)",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Your Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          placeholder="Tell us about your project — location, type, timeline, and any specific requirements..."
                          value={form.message}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn-primary"
                        style={{ alignSelf: "flex-start", opacity: loading ? 0.7 : 1 }}
                        disabled={loading}
                        id="contact-submit-btn"
                      >
                        {loading ? "Sending..." : "Send Message"}
                        {!loading && <Send size={15} />}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 900px) {
            .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
            .form-row { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}
