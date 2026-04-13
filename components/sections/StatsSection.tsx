"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 150, suffix: "+", label: "Projects Completed" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 7, suffix: "+", label: "Years Experience" },
  { value: 3, suffix: "", label: "Countries Served" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stats.forEach((stat, i) => {
        const el = document.querySelector(`#stat-num-${i}`);
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate() {
            el.textContent = Math.round(obj.val) + stat.suffix;
          },
        });
      });

      gsap.fromTo(
        ".stat-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
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
      className="stats-section market-section"
      id="stats"
      aria-label="Company statistics"
      style={{ backgroundColor: "#fbf9f4", padding: "6rem 0" }}
    >
      <div className="market-shell">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="market-kicker" style={{ justifyContent: "center" }}>
            By the Numbers
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.8rem)",
              fontWeight: 700,
              color: "#111111",
              lineHeight: 1.0,
              letterSpacing: "-0.05em",
            }}
          >
            Proven Excellence
          </h2>
        </div>

        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="market-plan-card"
              style={{ background: "#ffffff", padding: "2.5rem 1.5rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
            >
              <div style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, color: "#111111", lineHeight: 1, marginBottom: "0.5rem" }}>
                <span id={`stat-num-${i}`}>0{stat.suffix}</span>
              </div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(17,17,17,0.5)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
