"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

import { getProjects } from "@/app/actions/admin";

export default function ProjectsGrid() {
  const [active, setActive] = useState("All");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filters = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  useEffect(() => {
    if (loading || filtered.length === 0) return;
    
    const ctx = gsap.context(() => {
      const items = document.querySelectorAll(".project-item");
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "expo.out",
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [active, filtered, loading]);

  return (
    <section
      ref={sectionRef}
      className="section"
      id="projects"
      aria-label="Portfolio projects"
      style={{ backgroundColor: "var(--color-obsidian)" }}
    >
      <div className="section-container">
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <div className="section-label">Portfolio</div>
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
              Our <em style={{ fontStyle: "italic", color: "var(--color-gold)", fontWeight: 400 }}>Work</em>
            </h2>
          </div>
          <Link href="/projects" className="btn-arrow">
            Full Portfolio <ArrowRight size={14} />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs" style={{ marginBottom: "3rem" }} role="tablist">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-tab ${active === f ? "active" : ""}`}
              onClick={() => setActive(f)}
              role="tab"
              aria-selected={active === f}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
             <div className="flex items-center justify-center py-20 text-stone-500">Loading projects...</div>
        ) : filtered.length === 0 ? (
             <div className="flex items-center justify-center py-20 text-stone-500">No projects found.</div>
        ) : (
        <div className="projects-grid-container">
          {filtered.map((project) => (
            <Link
              key={project._id}
              href={`/projects/${project._id}`}
              className="project-item"
              style={{
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                position: "relative",
                aspectRatio: "4/3",
                background: "var(--color-graphite)",
                cursor: "pointer",
                display: "block",
                textDecoration: "none"
              }}
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                style={{
                  objectFit: "cover",
                  transition: "transform 0.7s cubic-bezier(0.19,1,0.22,1)",
                }}
                sizes="(max-width:768px) 50vw, 33vw"
                className="project-img"
              />
              {/* Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "var(--gradient-overlay)",
                  opacity: 0,
                  transition: "opacity 0.4s",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "1.5rem",
                }}
                className="project-overlay"
              >
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--color-gold)",
                    }}
                  >
                    {project.category}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1rem",
                      color: "var(--color-stone-100)",
                      marginTop: "0.25rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {project.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
        )}

        <style jsx>{`
          .projects-grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
            gap: 1.5rem;
          }
          .project-item:hover .project-img { 
            transform: scale(1.07); 
          }
          .project-item:hover .project-overlay { 
            opacity: 1 !important; 
          }
          @media (max-width: 768px) {
            .projects-grid-container {
              grid-template-columns: repeat(2, 1fr);
              gap: 0.75rem;
            }
          }
           @media (max-width: 480px) {
            .projects-grid-container {
              grid-template-columns: repeat(2, 1fr);
              gap: 0.5rem;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
