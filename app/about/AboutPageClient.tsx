"use client";
import Image from "next/image";
import Link from "next/link";
import PhilosophySection from "@/components/sections/PhilosophySection";
import StatsSection from "@/components/sections/StatsSection";
import ContactCTA from "@/components/sections/ContactCTA";
import { ArrowRight } from "lucide-react";

const team = [
  {
    name: "Architect Director",
    role: "Lead Architect",
    image: "/images/team-1.jpg",
    bio: "10+ years designing award-winning structures across East Africa.",
  },
  {
    name: "Interior Lead",
    role: "Senior Interior Designer",
    image: "/images/team-2.jpg",
    bio: "Specialist in luxury residential and commercial interior spaces.",
  },
  {
    name: "3D Visualization Expert",
    role: "3D & Design Specialist",
    image: "/images/team-3.jpg",
    bio: "Creating photorealistic renders that bring concepts to life.",
  },
  {
    name: "Project Manager",
    role: "Construction & Supervision",
    image: "/images/team-4.jpg",
    bio: "Ensuring every project is delivered on time and above standard.",
  },
];

export default function AboutPageClient() {
  return (
    <>
      <section className="market-hero" style={{ background: "white", padding: "8rem 0 4rem" }}>
        <div className="market-shell" style={{ textAlign: "center" }}>
          <div className="market-kicker" style={{ justifyContent: "center" }}>
            Who We Are
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: "var(--text-headline)",
              fontWeight: 700,
              color: "#111111",
              lineHeight: 1.0,
              letterSpacing: "-0.05em",
              marginBottom: "1.5rem",
              maxWidth: "18ch",
              margin: "0 auto 1.5rem"
            }}
          >
            Passion for
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-gold)", fontWeight: 400 }}>
              Exceptional Design
            </em>
          </h1>
          <p
            style={{
              color: "rgba(17,17,17,0.62)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.8,
              fontSize: "1.1rem"
            }}
          >
            Arusha Home Design Pro is a dynamic architectural and interior design firm based in
            Arusha, Tanzania, serving clients across East Africa. We are passionate about creating spaces that combine functionality, elegance, and modern design.
          </p>
          <div style={{ marginTop: "2rem", fontSize: "0.9rem", color: "var(--color-gold)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            🏛️ Architecture | ✨ Interior Design
          </div>
          <p
            style={{
              color: "rgba(17,17,17,0.62)",
              maxWidth: "800px",
              margin: "2rem auto 0",
              lineHeight: 1.8,
              fontSize: "1rem"
            }}
          >
            We specialize in architectural design, interior design, and the design and customization of kitchens and wardrobes, delivering tailored solutions that meet each client’s unique vision. Through creativity, attention to detail, and professional execution, we transform ideas into inspiring, practical spaces.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="market-section" style={{ background: "#fbf9f4", padding: "6rem 0" }}>
        <div className="market-shell">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: "4rem",
              alignItems: "center",
            }}
            className="story-grid"
          >
            <div>
              <div className="market-kicker">Company Overview</div>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 700,
                  color: "#111111",
                  lineHeight: 1.1,
                  letterSpacing: "-0.04em",
                  marginBottom: "1.5rem",
                }}
              >
                One of East Africa&apos;s Leading Design Firms
              </h2>
              <p
                style={{
                  color: "rgba(17,17,17,0.65)",
                  lineHeight: 1.8,
                  marginBottom: "1.25rem",
                  fontSize: "1rem",
                }}
              >
                Arusha Home Design Pro is one of the leading architectural and interior design
                firms in Arusha, Tanzania. We provide innovative and sustainable design solutions,
                offering architectural design, interior design, customized kitchen and wardrobe
                solutions, as well as planning and project management services for residential,
                commercial, and industrial developments.
              </p>
              <p
                style={{
                  color: "rgba(17,17,17,0.65)",
                  lineHeight: 1.8,
                  fontSize: "1rem",
                  marginBottom: "2.5rem",
                }}
              >
                With a strong commitment to quality, functionality, and modern aesthetics, we
                transform concepts into elegant, practical spaces that enhance both lifestyles and
                communities.
              </p>
              <Link href="/contact" className="market-button primary">
                Work With Us <ArrowRight size={16} />
              </Link>
            </div>
            <div
              style={{
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                position: "relative",
                aspectRatio: "4/5",
              }}
            >
              <Image
                src="/images/proj-1.jpg"
                alt="Arusha Home Design Pro team at work"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width:768px) 100vw, 50vw"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "2rem",
                  left: "2rem",
                  background: "rgba(8,8,8,0.85)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: "var(--radius-md)",
                  padding: "1.25rem 1.5rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "var(--color-gold)",
                  }}
                >
                  Est. 2020
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-stone-400)",
                    marginTop: "0.25rem",
                  }}
                >
                  Arusha, Tanzania
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 900px) {
            .story-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          }
        `}</style>
      </section>

      <StatsSection />
      <PhilosophySection />

      {/* Team Section */}
      <section className="market-section" style={{ background: "white", padding: "6rem 0" }}>
        <div className="market-shell">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="market-kicker" style={{ justifyContent: "center" }}>Our Team</div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                color: "#111111",
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                marginBottom: "1.5rem",
              }}
            >
              The People Behind the{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-gold)", fontWeight: 400 }}>
                Magic
              </em>
            </h2>
            <p
              style={{
                color: "rgba(17,17,17,0.6)",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.6,
                fontSize: "1rem"
              }}
            >
              Meet the dedicated and skilled professionals who form the backbone of Arusha Home Design Pro, committed to delivering excellence in every project.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
              gap: "1.5rem",
            }}
          >
            {team.map((member) => (
              <div key={member.name} className="market-plan-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", aspectRatio: "1/1.1", overflow: "hidden" }}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width:768px) 100vw, 25vw"
                  />
                </div>
                <div style={{ padding: "1.5rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#111111", marginBottom: "0.25rem" }}>{member.name}</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-gold)", marginBottom: "1rem" }}>{member.role}</div>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "rgba(17,17,17,0.6)",
                      lineHeight: 1.6,
                    }}
                  >
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA variant="light" />
    </>
  );
}
