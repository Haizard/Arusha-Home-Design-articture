"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    title: "Excellence",
    desc: "We uphold the highest standards of quality and professionalism in every project.",
  },
  {
    title: "Innovation",
    desc: "We embrace creativity and modern design solutions to shape the future of architecture and interiors.",
  },
  {
    title: "Sustainability",
    desc: "We prioritize eco-friendly and resource-efficient designs for lasting impact.",
  },
  {
    title: "Client-Centric Approach",
    desc: "We listen, collaborate, and deliver solutions tailored to each client’s vision.",
  },
  {
    title: "Integrity",
    desc: "We operate with honesty, transparency, and strong ethical principles.",
  },
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
      className="market-section"
      id="philosophy"
      aria-label="Philosophy and values"
      style={{
        backgroundColor: "#ffffff",
        padding: "6rem 0"
      }}
    >
      <div className="market-shell">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="philosophy-inner"
        >
          {/* Left — Quote */}
          <div>
            <div className="market-kicker">Mission and Values</div>
            <blockquote className="philosophy-quote" style={{ marginBottom: "2rem", color: "#111111", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.03em" }}>
              Arusha Home Design Pro is dedicated to delivering innovative, sustainable, and functional design solutions.
            </blockquote>
            <p
              style={{
                color: "rgba(17,17,17,0.65)",
                lineHeight: 1.8,
                fontSize: "1rem",
                maxWidth: "500px",
                marginBottom: "2rem",
              }}
            >
              We strive to create high-quality spaces that blend creativity, efficiency, and sustainability, ensuring every project meets our clients’ needs while contributing to the growth of East Africa’s architectural landscape.
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
                fontSize: "0.75rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(17,17,17,0.45)",
              }}
            >
              Arusha · Tanzania · East Africa
            </p>
          </div>

          {/* Right — Values */}
          <div>
            <div className="market-kicker">Core Values</div>
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
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "#111111",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {v.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        color: "rgba(17,17,17,0.6)",
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
