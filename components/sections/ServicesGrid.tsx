"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sofa,
  Building2,
  Paintbrush,
  LayoutDashboard,
  Box,
  HardHat,
  ClipboardList,
  Hammer,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

import { getServices } from "@/app/actions/admin";

type ServiceCard = {
  _id: string;
  title: string;
  description?: string;
  iconName?: string;
  imageUrl?: string;
  serviceId?: string;
};

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [services, setServices] = useState<ServiceCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data as ServiceCard[]);
      } catch (err) {
        console.error("Failed to fetch services", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const activeService = services[activeIndex];

  // Helper to get Lucide Icon component from name string
  const getIcon = (iconName: string) => {
    const icons: Record<string, LucideIcon> = {
      Sofa, Building2, Paintbrush, LayoutDashboard, Box, HardHat, ClipboardList, Hammer
    };
    return icons[iconName] || Building2;
  };

  // Global reveal animation
  useEffect(() => {
    if (loading || services.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.from(".service-tab", {
        x: -30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".services-index-container",
          start: "top 80%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [loading, services]);

  // Task: Tab content transition
  useEffect(() => {
    if (loading || !activeService) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".feature-content-inner", 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }
      );
      gsap.fromTo(".feature-bg", 
        { opacity: 0, scale: 1.05 }, 
        { opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [activeIndex, loading, activeService]);

  return (
    <section
      ref={sectionRef}
      className="section"
      id="services"
      aria-label="Our services"
      style={{ backgroundColor: "var(--color-obsidian)" }}
    >
      <div className="section-container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "4rem",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div className="section-label">What We Do</div>
            <h2
              className="font-display"
              style={{
                fontSize: "var(--text-headline)",
                fontWeight: 700,
                color: "var(--color-stone-100)",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                maxWidth: "500px",
              }}
            >
              Services That
              <br />
              <em style={{ fontStyle: "italic", color: "var(--color-gold)", fontWeight: 400 }}>
                Define Excellence
              </em>
            </h2>
          </div>
          <Link href="/services" className="btn-arrow">
            View All Services <ArrowRight size={14} />
          </Link>
        </div>

        {/* Index Layout */}
        {loading ? (
             <div className="flex items-center justify-center py-20 text-stone-500">Loading services...</div>
        ) : services.length === 0 ? (
             <div className="flex items-center justify-center py-20 text-stone-500">No services found.</div>
        ) : (
        <div
          className="services-index-container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Menu / Tabs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {services.map((service, index) => (
              <button
                key={service._id}
                onMouseEnter={() => setActiveIndex(index)}
                style={{
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  borderBottom: `1px solid ${activeIndex === index ? "var(--color-gold)" : "rgba(255,255,255,0.05)"}`,
                  padding: "1.25rem 0",
                  cursor: "pointer",
                  width: "100%",
                  transition: "all 0.4s",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  opacity: activeIndex === index ? 1 : 0.4,
                }}
                className="service-tab"
              >
                <span style={{ 
                  fontFamily: "var(--font-ui)", 
                  fontSize: "0.7rem", 
                  color: "var(--color-gold)", 
                  opacity: 0.8,
                  letterSpacing: "0.2em"
                }}>{service.serviceId}</span>
                <h3 className="font-display" style={{ 
                  fontSize: "1.1rem", 
                  color: activeIndex === index ? "var(--color-gold)" : "white", 
                  margin: 0,
                  fontWeight: 500,
                  transition: "all 0.4s"
                }}>{service.title}</h3>
              </button>
            ))}
          </div>

          {/* Feature Display Area */}
          <div 
            style={{ 
              position: "relative", 
              minHeight: "550px",
              background: "var(--color-obsidian)",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              border: "1px solid var(--color-border)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.5)"
            }}
          >
            {/* Background Image */}
            <div key={`bg-${activeIndex}`} style={{ position: "absolute", inset: 0 }} className="feature-bg">
               {activeService && (
                 <>
                   <Image
                     src={activeService.imageUrl || "/images/service-arch.jpg"}
                     alt=""
                     fill
                     sizes="(max-width: 900px) 100vw, 65vw"
                     style={{ objectFit: "cover", filter: "brightness(0.35)" }}
                   />
                   <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.9) 20%, transparent 100%)" }} />
                 </>
               )}
            </div>

            {/* Feature Content */}
            <div className="feature-content-inner" style={{ position: "relative", zIndex: 2, padding: "4rem 3rem", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
               {activeService && (
                 <>
                   <div style={{ 
                     width: "50px", height: "50px", 
                     background: "var(--color-gold-glow)", 
                     borderRadius: "var(--radius-md)", 
                     display: "flex", alignItems: "center", justifyContent: "center",
                     color: "var(--color-gold)",
                     marginBottom: "1.5rem",
                     border: "1px solid rgba(201,168,76,0.3)"
                   }}>
                     {(() => {
                        const ActiveIcon = getIcon(activeService.iconName || 'Building2');
                        return <ActiveIcon size={24} />;
                     })()}
                   </div>
                   <h3 className="font-display" style={{ fontSize: "2.8rem", color: "white", marginBottom: "1rem", lineHeight: 1.1 }}>{activeService.title}</h3>
                   <p style={{ color: "var(--color-stone-400)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "550px", marginBottom: "2.5rem" }}>
                     {activeService.description}
                   </p>
                   <Link href={`/services/${activeService._id}`} className="btn-primary" style={{ alignSelf: "flex-start" }}>
                     Explore Service <ArrowRight size={16} />
                   </Link>
                 </>
               )}
            </div>
          </div>
        </div>
        )}
      </div>

      <style jsx>{`
        .service-tab:hover {
          padding-left: 1rem !important;
          border-bottom-color: var(--color-gold) !important;
        }
        .service-tab:hover h3 {
          color: var(--color-gold) !important;
          transform: translateX(10px);
        }
        @media (max-width: 768px) {
          .service-tab h3 { font-size: 1rem !important; }
        }
      `}</style>
    </section>
  );
}
