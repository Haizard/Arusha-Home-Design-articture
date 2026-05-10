"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { getTestimonials } from "@/app/actions/admin";

type Testimonial = {
  _id?: string;
  name: string;
  role: string;
  avatar: string;
  text: string;
  stars: number;
};

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        setTestimonials(data as Testimonial[]);
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const navigate = (dir: 1 | -1) => {
    if (!contentRef.current || testimonials.length === 0) return;
    const next = (current + dir + testimonials.length) % testimonials.length;

    gsap.to(contentRef.current, {
      opacity: 0,
      x: dir * -40,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setCurrent(next);
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: dir * 40 },
          { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }
        );
      },
    });
  };

  const t = testimonials[current];

  return (
    <section
      className="section"
      id="testimonials"
      aria-label="Client testimonials"
      style={{ background: "var(--color-graphite)", borderTop: "1px solid var(--color-border)" }}
    >
      <div className="section-container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            Client Stories
          </div>
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
            What They{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-gold)", fontWeight: 400 }}>
              Say
            </em>
          </h2>
        </div>

        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {loading ? (
            <div className="flex items-center justify-center py-24 text-stone-500">Loading testimonials...</div>
          ) : testimonials.length === 0 ? (
            <div className="flex items-center justify-center py-24 text-stone-500">No testimonials yet.</div>
          ) : (
            <>
              <div ref={contentRef} className="testimonial-card" style={{ background: "var(--color-void)" }}>
                {/* Stars */}
                <div style={{ display: "flex", gap: "4px", marginBottom: "1.5rem" }}>
                  {t && Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={16} fill="var(--color-gold)" color="var(--color-gold)" />
                  ))}
                </div>

                <blockquote className="testimonial-text">&ldquo;{t?.text}&rdquo;</blockquote>

                <div className="testimonial-author">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t?.avatar} alt={t?.name} className="testimonial-avatar" />
                  <div>
                    <div className="testimonial-name">{t?.name}</div>
                    <div className="testimonial-role">{t?.role}</div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "2.5rem",
                }}
              >
                {/* Dots */}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const dir = i > current ? 1 : -1;
                        navigate(dir);
                      }}
                      aria-label={`Go to testimonial ${i + 1}`}
                      style={{
                        width: i === current ? "28px" : "8px",
                        height: "8px",
                        borderRadius: "var(--radius-full)",
                        background: i === current ? "var(--color-gold)" : "var(--color-border)",
                        border: "none",
                        transition: "width 0.4s, background 0.3s",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {([-1, 1] as const).map((dir) => (
                    <button
                      key={dir}
                      onClick={() => navigate(dir)}
                      aria-label={dir === -1 ? "Previous testimonial" : "Next testimonial"}
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        border: "1px solid var(--color-border)",
                        background: "transparent",
                        color: "var(--color-stone-400)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "border-color 0.3s, color 0.3s, background 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.borderColor = "var(--color-gold)";
                        el.style.color = "var(--color-gold)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.borderColor = "var(--color-border)";
                        el.style.color = "var(--color-stone-400)";
                      }}
                    >
                      {dir === -1 ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
