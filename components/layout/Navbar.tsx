"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Removed scroll handler as requested by user to have unchangeable navbar color

  useEffect(() => {
    if (!mobileRef.current) return;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(mobileRef.current, { x: "0%", duration: 0.6, ease: "expo.inOut" });
      gsap.fromTo(
        ".mobile-nav-link",
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "expo.out", delay: 0.3 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(mobileRef.current, { x: "100%", duration: 0.5, ease: "expo.inOut" });
    }
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <nav
        ref={navRef}
        className="navbar"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          Arusha Home
          <span>Design Pro · Est. 2020</span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`nav-link ${pathname === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href="/contact" className="nav-cta" style={{ display: "none" }} aria-label="Get a Quote">
          Get a Quote
        </Link>
        <Link href="/contact" className="nav-cta hidden-mobile" style={{ display: "block" }}>
          Get a Quote
        </Link>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} color="var(--color-stone-200)" /> : (
            <>
              <span /><span /><span />
            </>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileRef}
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        style={{ transform: "translateX(100%)" }}
        aria-hidden={!menuOpen}
      >
        <div style={{ position: "absolute", top: "1.25rem", right: "1.25rem", zIndex: 10 }}>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 w-11 h-11 hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-6 items-start w-full px-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-nav-link text-left"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 w-full px-8 text-left">
          <Link href="/contact" className="btn-primary w-full block text-center py-4">
            Start a Project
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1025px) {
          .hidden-mobile { display: block !important; }
        }
        @media (max-width: 1024px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
