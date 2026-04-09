"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const items = [
  "150+ Projects Completed",
  "50+ Happy Clients",
  "7+ Years Experience",
  "East Africa's Leading Firm",
  "Residential & Commercial",
  "Architecture · Interior · Construction",
  "Based in Arusha, Tanzania",
];

export default function MarqueeBar() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 30, // Slower marquee for less distraction
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const doubled = [...items, ...items];

  return (
    <div className="marquee-section" aria-hidden="true" style={{ borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
      <div
        className="marquee-track"
        ref={trackRef}
        style={{ width: "max-content" }}
      >
        <div className="marquee-inner">
          {doubled.map((item, i) => (
            <div key={i} className="marquee-item" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              <span style={{ color: "var(--color-gold)", opacity: 0.3, fontWeight: 300 }}>/</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
