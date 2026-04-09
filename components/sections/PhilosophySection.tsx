"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { title: "Excellence", desc: "We uphold the highest standards of quality and professionalism in every project we undertake." },
  { title: "Innovation", desc: "We embrace creativity and modern design solutions to shape the future of architecture." },
  { title: "Sustainability", desc: "We prioritize eco-friendly and resource-efficient designs for lasting positive impact." },
  { title: "Client-Centric", desc: "We listen, collaborate, and deliver solutions tailored to each client's unique vision." },
  { title: "Integrity", desc: "We operate with honesty, transparency, and strong ethical principles at all times." },
];

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".philosophy-quote",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".philosophy-quote",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".value-item",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".values-list",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section"
      id="philosophy"
      aria-label="Philosophy and values"
      style={{
        backgroundColor: "var(--color-graphite)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="section-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6rem",
            alignItems: "start",
          }}
          className="philosophy-inner"
        >
          {/* Left — Quote */}
          <div>
            <div className="section-label">Our Philosophy</div>
            <blockquote className="philosophy-quote" style={{ marginBottom: "3rem" }}>
              We transform spaces into artworks that tell your story.
            </blockquote>
            <p
              style={{
                color: "var(--color-stone-400)",
                lineHeight: 1.8,
                fontSize: "0.95rem",
                maxWidth: "420px",
              }}
            >
              Arusha Home Design Pro is dedicated to delivering innovative, sustainable, and
              functional design solutions that improve the built environment and uplift communities
              across East Africa.
            </p>

            {/* Gold line divider */}
            <div
              style={{
                width: "60px",
                height: "1px",
                background: "var(--gradient-gold)",
                margin: "2.5rem 0",
              }}
            />

            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--color-stone-600)",
              }}
            >
              Arusha · Tanzania · East Africa
            </p>
          </div>

          {/* Right — Values */}
          <div>
            <div className="section-label">Core Values</div>
            <div className="values-list" style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className="value-item"
                  style={{
                    padding: "1.75rem 0",
                    borderBottom: "1px solid var(--color-border)",
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.65rem",
                      color: "var(--color-gold)",
                      letterSpacing: "0.15em",
                      flexShrink: 0,
                      marginTop: "0.25rem",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        color: "var(--color-stone-100)",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {v.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--color-stone-400)",
                        lineHeight: 1.7,
                      }}
                    >
                      {v.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .philosophy-inner {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
