"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/looks", label: "Choose a Look" },
  { href: "/materials", label: "Materials" },
  { href: "/products", label: "Plans & Products" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const dropdowns: Record<
  string,
  {
    featured: { title: string; href: string; description: string; image: string };
    links: { title: string; href: string; description: string }[];
  }
> = {
  "By Size": {
    featured: {
      title: "Explore plans by size",
      href: "/products",
      description: "Compare compact homes, family layouts, and large-format concepts with a clearer storefront view.",
      image: "/images/hero-2.jpg",
    },
    links: [
      { title: "100-200 SQM", href: "/products?minArea=100&maxArea=200&label=100-200%20SQM", description: "Compact, efficient homes" },
      { title: "200-300 SQM", href: "/products?minArea=200&maxArea=300&label=200-300%20SQM", description: "Balanced family layouts" },
      { title: "300-500 SQM", href: "/products?minArea=300&maxArea=500&label=300-500%20SQM", description: "More room for premium living" },
      { title: "500+ SQM", href: "/products?minArea=500&label=500%2B%20SQM", description: "Large-format statement homes" },
    ],
  },
  "By Style": {
    featured: {
      title: "Browse by architectural style",
      href: "/products",
      description: "Move between modern, contemporary, luxury, and expressive character-led homes.",
      image: "/images/proj-1.jpg",
    },
    links: [
      { title: "Modern House Plans", href: "/products?q=modern&label=Modern%20House%20Plans", description: "Clean lines and open living" },
      { title: "Contemporary Homes", href: "/products?q=contemporary&label=Contemporary%20Homes", description: "Refined curb appeal" },
      { title: "Luxury Mansions", href: "/products?q=luxury&label=Luxury%20Mansions", description: "Grand, high-end concepts" },
      { title: "A-Frame & Cabins", href: "/products?q=cabin&label=A-Frame%20%26%20Cabins", description: "Distinctive character-led forms" },
    ],
  },
  "By Budget": {
    featured: {
      title: "Compare by budget band",
      href: "/products",
      description: "Sort plans by entry, mid-range, and premium investment levels before you customize.",
      image: "/images/proj-3.jpg",
    },
    links: [
      { title: "Under $300", href: "/products?maxPrice=300&sort=low&label=Under%20%24300", description: "Entry-level plan packages" },
      { title: "$300-$500", href: "/products?minPrice=300&maxPrice=500&sort=low&label=%24300-%24500", description: "Popular mid-range choices" },
      { title: "$500-$1000", href: "/products?minPrice=500&maxPrice=1000&sort=low&label=%24500-%241000", description: "Bigger family-ready plans" },
      { title: "$1000+", href: "/products?minPrice=1000&sort=high&label=%241000%2B", description: "Premium complex builds" },
    ],
  },
  About: {
    featured: {
      title: "Learn how the storefront works",
      href: "/about",
      description: "Understand the studio, see built work, and move into a custom consultation when needed.",
      image: "/images/about-hero.jpg",
    },
    links: [
      { title: "About the Studio", href: "/about", description: "How we design and deliver" },
      { title: "See Projects", href: "/projects", description: "Built work and concept studies" },
      { title: "Book a Consultation", href: "/contact", description: "Talk through your site and goals" },
      { title: "Custom Plan Support", href: "/contact", description: "Adapt any plan to your needs" },
    ],
  },
};

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

function UtilityIcon({ type }: { type: "heart" | "search" | "user" | "bag" }) {
  if (type === "heart") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21s-6.7-4.35-9.33-8.07C.56 9.85 1.32 5.75 5 4.3c2.07-.82 4.36.02 5.68 1.8C12 4.32 14.29 3.48 16.36 4.3c3.68 1.45 4.44 5.55 2.33 8.63C18.7 16.65 12 21 12 21Z" />
      </svg>
    );
  }
  if (type === "search") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    );
  }
  if (type === "user") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c1.8-4 5-6 8-6s6.2 2 8 6" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 7h15l-1.3 9.1a2 2 0 0 1-2 1.7H9.2a2 2 0 0 1-2-1.6L5.2 3.8A1 1 0 0 0 4.2 3H2" />
      <circle cx="9" cy="21" r="1" />
      <circle cx="18" cy="21" r="1" />
    </svg>
  );
}

function ChevronTiny() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const isProductsPage = pathname?.startsWith("/products");

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {!isProductsPage ? (
        <div className="site-promo-bar" aria-hidden="true">
          <div className="site-promo-track">
            <span>House plan now</span>
            <span>Customize your own house plan now</span>
            <span>Compare layouts before you build</span>
            <span>Design support from concept to site</span>
          </div>
        </div>
      ) : null}

      <nav className="store-navbar" role="navigation" aria-label="Main navigation">
        <Link href="/" className="store-logo">
          <span className="store-logo-mark-wrap" aria-hidden="true">
            <Image
              src="/images/site-logo-tight.png"
              alt=""
              width={790}
              height={540}
              className="store-logo-mark-image"
              priority
            />
          </span>
          <span className="store-logo-copy">
            Arusha Home
            <small>Design Pro</small>
          </span>
        </Link>

        <ul className="store-nav-links" role="list">
          {navLinks.map((link) => {
            const showChevron = ["By Size", "By Style", "By Budget", "About"].includes(link.label);
            const menu = dropdowns[link.label];
            return (
              <li
                key={link.label}
                className={`store-nav-item ${openDropdown === link.label ? "open" : ""}`}
                onMouseEnter={() => setOpenDropdown(menu ? link.label : null)}
                onMouseLeave={() => setOpenDropdown((current) => (current === link.label ? null : current))}
              >
                <Link
                  href={link.href}
                  className={pathname === link.href ? "active" : ""}
                  onClick={() => {
                    setMenuOpen(false);
                    setOpenDropdown(null);
                  }}
                >
                  {link.label} {showChevron ? <ChevronTiny /> : null}
                </Link>
                {menu ? (
                  <div className="store-dropdown">
                    <div className="store-dropdown-inner">
                      <Link href={menu.featured.href} className="store-dropdown-feature" onClick={() => setOpenDropdown(null)}>
                        <div className="store-dropdown-thumb" style={{ position: "relative" }}>
                          <Image src={menu.featured.image} alt={menu.featured.title} fill sizes="220px" className="store-dropdown-thumb-image" />
                        </div>
                        <strong>{menu.featured.title}</strong>
                        <span>{menu.featured.description}</span>
                      </Link>
                      <div className="store-dropdown-links">
                        {menu.links.map((item) => (
                          <Link key={item.title} href={item.href} className="store-dropdown-link" onClick={() => setOpenDropdown(null)}>
                            <strong>{item.title}</strong>
                            <span>{item.description}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className="store-utility-icons">
          <button type="button" aria-label="Wishlist"><UtilityIcon type="heart" /></button>
          <button type="button" aria-label="Search"><UtilityIcon type="search" /></button>
          <button type="button" aria-label="Account"><UtilityIcon type="user" /></button>
          <button type="button" aria-label="Bag"><UtilityIcon type="bag" /></button>
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
            <Link key={link.label} href={link.href} className={pathname === link.href ? "active" : ""} onClick={() => setMenuOpen(false)}>
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
