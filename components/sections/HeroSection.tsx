"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  "/images/proj-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
  "/images/hero-4.jpg"
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const preRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(async () => {
      const SplitType = (await import("split-type")).default;
      const split = new SplitType(headlineRef.current!, { types: "chars,words" });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(imgRef.current, { scale: 1.15 }, { scale: 1, duration: 2.5, ease: "expo.out" }, 0);
      tl.fromTo(preRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" }, 0.3);
      tl.fromTo(split.chars, { y: "120%", rotateX: -80, opacity: 0 }, { y: "0%", rotateX: 0, opacity: 1, duration: 1.0, stagger: 0.03, ease: "expo.out", transformOrigin: "top center" }, 0.5);
      tl.fromTo(subRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" }, 1.0);
      tl.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" }, 1.2);
      tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.5);

      gsap.to(imgRef.current, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero" id="hero" aria-label="Hero section">
      <div className="hero-bg" ref={imgRef}>
        {SLIDES.map((slide, i) => (
          <div
            key={slide}
            style={{
              position: "absolute",
              inset: 0,
              opacity: activeSlide === i ? 1 : 0,
              transition: "opacity 2s ease-in-out",
            }}
          >
            <Image
              src={slide}
              alt={`Architectural showcase ${i + 1}`}
              fill
              priority={i === 0}
              style={{ objectFit: "cover" }}
              sizes="100vw"
            />
          </div>
        ))}
        <div className="hero-base-overlay" />
      </div>



      {/* Gradient Overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="hero-content">
        {/* Pre-headline */}
        <div ref={preRef} className="hero-pre" aria-label="Company tagline">
          Architecture & Interior Design · Arusha, Tanzania
        </div>

        {/* Main Headline */}
        <div className="overflow-hidden perspective">
          <h1 ref={headlineRef} className="hero-headline">
            Transform Your
            <br />
            <em>Space Into Art</em>
          </h1>
        </div>

        {/* Sub */}
        <p ref={subRef} className="hero-sub">
          East Africa&apos;s premier architectural and interior design firm — delivering
          innovative, sustainable, and breathtaking spaces that elevate communities.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="hero-cta">
          <Link href="/projects" className="btn-primary" id="hero-view-work">
            View Our Work <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="btn-ghost" id="hero-get-quote">
            Get a Free Quote
          </Link>
        </div>
      </div>

      {/* Corner stamp */}
      <div className="hero-corner" aria-hidden="true">
        Est. 2020
        <br />
        Arusha · Tanzania
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="hero-scroll" aria-hidden="true">
        <span className="hero-scroll-text">Scroll to explore</span>
        <div className="hero-scroll-line" />
        <ChevronDown size={14} color="var(--color-stone-600)" />
      </div>
    </section>
  );
}
