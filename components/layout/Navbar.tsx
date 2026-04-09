"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {isHome ? (
        <div className="site-promo-bar" aria-hidden="true">
          <div className="site-promo-track">
            <span>House plan now</span>
            <span>Customize your own house plan now</span>
            <span>Compare layouts before you build</span>
            <span>Design support from concept to site</span>
          </div>
        </div>
      ) : null}

      <nav className={`site-navbar ${isHome ? "home" : "inner"}`} role="navigation" aria-label="Main navigation">
        <Link href="/" className="site-logo">
          <span className="site-logo-mark">A</span>
          <span>
            Arusha Home Design Pro
            <small>Architecture, interiors, and customizable plans</small>
          </span>
        </Link>

        <ul className="site-nav-links" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={pathname === link.href ? "active" : ""} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="site-nav-actions">
          <Link href="/contact" className="site-nav-button">
            Start your project
          </Link>
          <button
            className="site-mobile-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <div className={`site-mobile-panel ${menuOpen ? "open" : ""}`}>
        <div className="site-mobile-panel-inner">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={pathname === link.href ? "active" : ""} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="site-nav-button mobile" onClick={() => setMenuOpen(false)}>
            Start your project
          </Link>
        </div>
      </div>
    </>
  );
}
