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
      <section className="page-hero" aria-label="About page header">
        <Image
          src="/images/about-hero.jpg"
          alt="Modern office architectural design"
          fill
          priority
          style={{ objectFit: "cover", opacity: 0.5 }}
          className="hero-bg-img"
          sizes="100vw"
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            Who We Are
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
            Passion for
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-gold)", fontWeight: 400 }}>
              Exceptional Design
            </em>
          </h1>
          <p
            style={{
              color: "var(--color-stone-400)",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            Arusha Home Design Pro is a dynamic architectural and interior design firm based in
            Arusha, Tanzania — serving clients across East Africa with passion, precision, and
            creativity.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section" style={{ background: "var(--color-void)" }}>
        <div className="section-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5rem",
              alignItems: "center",
            }}
            className="story-grid"
          >
            <div>
              <div className="section-label">Our Story</div>
              <h2
                className="font-display"
                style={{
                  fontSize: "var(--text-subhead)",
                  fontWeight: 700,
                  color: "var(--color-stone-100)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginBottom: "1.5rem",
                }}
              >
                One of East Africa&apos;s Leading Design Firms
              </h2>
              <p
                style={{
                  color: "var(--color-stone-400)",
                  lineHeight: 1.9,
                  marginBottom: "1.25rem",
                  fontSize: "0.95rem",
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
                  color: "var(--color-stone-400)",
                  lineHeight: 1.9,
                  fontSize: "0.95rem",
                  marginBottom: "2.5rem",
                }}
              >
                With a strong commitment to quality, functionality, and modern aesthetics, we
                transform concepts into elegant, practical spaces that enhance both lifestyles and
                communities.
              </p>
              <Link href="/contact" className="btn-primary">
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
                src="/images/hero-1.jpg"
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
      <section className="section" style={{ background: "var(--color-graphite)", borderTop: "1px solid var(--color-border)" }}>
        <div className="section-container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Our Team</div>
            <h2
              className="font-display"
              style={{
                fontSize: "var(--text-headline)",
                fontWeight: 700,
                color: "var(--color-stone-100)",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
              }}
            >
              The People Behind the{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-gold)", fontWeight: 400 }}>
                Magic
              </em>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
              gap: "1.5rem",
            }}
          >
            {team.map((member) => (
              <div key={member.name} className="team-card">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="team-card-image"
                  style={{ objectFit: "cover" }}
                  sizes="(max-width:768px) 100vw, 25vw"
                />
                <div className="team-card-info">
                  <div className="team-card-name">{member.name}</div>
                  <div className="team-card-role">{member.role}</div>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--color-stone-400)",
                      marginTop: "0.75rem",
                      lineHeight: 1.6,
                      opacity: 0,
                      transition: "opacity 0.4s 0.1s",
                    }}
                    className="team-bio"
                  >
                    {member.bio}
                  </p>
                </div>
                <style jsx>{`
                  .team-card:hover .team-bio { opacity: 1 !important; }
                `}</style>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
