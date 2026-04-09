# Cinematic Design Skill — Arusha Home Design Pro
> **Skill Level**: Master Craftsman | **Target**: Next.js + GSAP + Tailwind CSS + Framer Motion
> **Mission**: Build the most visually breathtaking architectural firm website ever created — where every pixel breathes, every scroll tells a story, and every interaction feels cinematic.

---

## 🎬 PHILOSOPHY — The Cinematic Imperative

This is not a website. It is a **living experience**. You are a film director, not a web developer. Every page is a scene. Every section is a shot. Every animation is a performance.

**Rules that cannot be broken:**
1. **Nothing is static.** Every element enters with purpose and exits with grace.
2. **Scrolling is storytelling.** The user scrolls → the story unfolds.
3. **Luxury is in the details.** Hover states, cursor trails, micro-interactions — they define premium.
4. **Dark is the default mood.** Deep blacks, warm golds, architectural whites.
5. **Typography moves.** Headlines don't appear — they reveal themselves.

---

## 📦 REQUIRED LIBRARIES & STACK

### Core Animation Stack
```bash
npm install gsap @gsap/react
npm install framer-motion
npm install lenis                    # Smooth scroll (replaces locomotive-scroll)
npm install three @react-three-fiber @react-three/drei  # 3D scenes
npm install @studio-freight/react-lenis
npm install react-intersection-observer
npm install split-type               # Text splitting for character animations
npm install @splidejs/react-splide   # Premium carousel
npm install swiper                   # Alternative slider
npm install react-parallax-tilt      # 3D tilt cards
npm install react-countup            # Animated counters
npm install react-type-animation     # Typewriter effects
npm install aos                      # Animate on scroll (lightweight backup)
npm install clsx tailwind-merge      # Class utilities
```

### Visual Enhancement
```bash
npm install sharp                    # Next.js image optimization
npm install next-themes              # Dark/light mode
npm install react-hot-toast          # Premium notifications
npm install @radix-ui/react-dialog   # Accessible modals
npm install react-hook-form zod      # Form handling
npm install emailjs-com              # Contact form emails
```

---

## 🎨 DESIGN SYSTEM — Arusha Home Design Pro

### Color Palette (Architectural Luxury)
```css
:root {
  /* Primary — Dark Foundation */
  --color-void: #0A0A0A;          /* Near-black background */
  --color-obsidian: #111111;      /* Card backgrounds */
  --color-graphite: #1A1A1A;      /* Elevated surfaces */
  --color-slate: #2C2C2C;         /* Borders, dividers */

  /* Gold — The Signature Color */
  --color-gold: #C9A84C;          /* Primary accent — warmth of Tanzanian sunsets */
  --color-gold-light: #E8C96A;    /* Hover states */
  --color-gold-pale: #F5E6B8;     /* Text on dark */
  --color-gold-dim: #8B6914;      /* Subtle accents */

  /* Stone — Natural Earth Tones */
  --color-stone-100: #F5F0E8;     /* Light text */
  --color-stone-200: #E8DDD0;     /* Secondary text */
  --color-stone-400: #A89880;     /* Muted text */
  --color-stone-600: #6B5B4E;     /* Disabled states */

  /* Functional */
  --color-white: #FFFFFF;
  --color-cream: #FAF7F2;         /* Light mode background */

  /* Gradients */
  --gradient-hero: linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0D0B08 100%);
  --gradient-gold: linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #8B6914 100%);
  --gradient-card: linear-gradient(145deg, #1A1A1A 0%, #111111 100%);
  --gradient-overlay: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
}
```

### Typography System
```css
/* Google Fonts to load */
/* Playfair Display — Headlines (Luxury serif) */
/* Cormorant Garamond — Sub-headlines (Editorial) */
/* DM Sans — Body (Modern, clean) */
/* Space Grotesk — UI labels, stats (Technical) */
/* Italiana — Logo font (Ultra luxury) */

:root {
  --font-display: 'Playfair Display', 'Cormorant Garamond', serif;
  --font-editorial: 'Cormorant Garamond', serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-ui: 'Space Grotesk', sans-serif;
  --font-logo: 'Italiana', serif;

  /* Scale — Cinematic proportions */
  --text-hero: clamp(3.5rem, 8vw, 9rem);        /* Hero headline */
  --text-headline: clamp(2.5rem, 5vw, 6rem);     /* Section headlines */
  --text-subhead: clamp(1.5rem, 3vw, 3rem);      /* Sub-headlines */
  --text-title: clamp(1.25rem, 2vw, 1.75rem);    /* Card titles */
  --text-body: clamp(0.9rem, 1.5vw, 1.1rem);     /* Body text */
  --text-caption: clamp(0.75rem, 1vw, 0.875rem); /* Labels, captions */

  /* Line heights */
  --leading-tight: 0.95;
  --leading-display: 1.05;
  --leading-body: 1.7;
}
```

### Spacing & Layout
```css
:root {
  /* Architectural spacing — based on golden ratio */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.618rem;
  --space-lg: 2.618rem;
  --space-xl: 4.236rem;
  --space-2xl: 6.854rem;
  --space-3xl: 11.09rem;

  /* Section padding */
  --section-padding: clamp(5rem, 10vw, 12rem);
  --container-max: 1440px;
  --container-padding: clamp(1.5rem, 5vw, 6rem);

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
}
```

---

## 🏗️ SITE ARCHITECTURE — Pages & Sections

### Pages to Build:
1. **`/` — Home** (Hero, Services Overview, Featured Projects, Stats, Testimonials, CTA)
2. **`/about` — About Us** (Story, Team, Values, Timeline)
3. **`/services` — Services** (All 7 services with detail cards)
4. **`/projects` — Projects/Portfolio** (Filterable gallery)
5. **`/products` — Products** (Kitchen cabinets, wardrobes, TV showcases, beds, bathroom cabinets)
6. **`/contact` — Contact** (Map, form, office info)

### Global Components:
- **Navbar** — Transparent → solid on scroll, magnetic menu items
- **Footer** — Dark, architectural grid layout
- **Custom Cursor** — Dot + ring, morphs on hover
- **Page Transitions** — Curtain wipe between pages
- **Loading Screen** — Brand reveal animation

---

## ⚡ GSAP ANIMATION PATTERNS

### Pattern 1: Hero Text Reveal (Character Split)
```jsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";

export const HeroHeadline = ({ text }) => {
  const ref = useRef(null);

  useGSAP(() => {
    const split = new SplitType(ref.current, { types: "chars, words" });
    
    gsap.fromTo(split.chars, 
      { 
        y: "120%", 
        opacity: 0,
        rotateX: -90,
        transformOrigin: "top center"
      },
      {
        y: "0%",
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.035,
        ease: "expo.out",
        delay: 0.5
      }
    );
  }, []);

  return (
    <div className="overflow-hidden perspective-1000">
      <h1 ref={ref} className="hero-text">{text}</h1>
    </div>
  );
};
```

### Pattern 2: ScrollTrigger Pinned Section
```jsx
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

useGSAP(() => {
  const sections = gsap.utils.toArray(".service-card");
  
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".services-container",
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      end: () => `+=${document.querySelector(".services-container").offsetWidth}`,
    }
  });
});
```

### Pattern 3: Image Reveal (Clip-path)
```jsx
useGSAP(() => {
  gsap.fromTo(".project-image", 
    { clipPath: "inset(0 100% 0 0)" },
    {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.5,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: ".project-image",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );
});
```

### Pattern 4: Parallax Layers
```jsx
useGSAP(() => {
  gsap.utils.toArray(".parallax-layer").forEach((layer, i) => {
    const depth = layer.dataset.depth || 0.3;
    
    gsap.to(layer, {
      y: () => -(layer.offsetHeight * depth),
      ease: "none",
      scrollTrigger: {
        trigger: layer.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  });
});
```

### Pattern 5: Magnetic Button Effect
```jsx
const MagneticButton = ({ children }) => {
  const ref = useRef(null);
  
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    gsap.to(ref.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.6,
      ease: "power2.out"
    });
  };
  
  const handleMouseLeave = () => {
    gsap.to(ref.current, {
      x: 0, y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)"
    });
  };
  
  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="magnetic-btn"
    >
      {children}
    </button>
  );
};
```

### Pattern 6: Number Counter Animation
```jsx
const AnimatedCounter = ({ target, suffix = "" }) => {
  const ref = useRef(null);
  
  useGSAP(() => {
    const obj = { value: 0 };
    
    gsap.to(obj, {
      value: target,
      duration: 2.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        once: true,
      },
      onUpdate: () => {
        ref.current.textContent = Math.round(obj.value) + suffix;
      }
    });
  });
  
  return <span ref={ref}>0{suffix}</span>;
};
```

### Pattern 7: Cursor Follower
```jsx
const CustomCursor = () => {
  const dot = useRef(null);
  const ring = useRef(null);
  
  useGSAP(() => {
    const moveCursor = (e) => {
      gsap.to(dot.current, {
        x: e.clientX, y: e.clientY,
        duration: 0.1,
        ease: "none"
      });
      gsap.to(ring.current, {
        x: e.clientX, y: e.clientY,
        duration: 0.4,
        ease: "power2.out"
      });
    };
    
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  });
  
  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
};
```

### Pattern 8: Page Transition (Curtain)
```jsx
// In _app or layout — use GSAP timeline for page transitions
const pageTransitionIn = () => {
  const tl = gsap.timeline();
  tl.set(".page-curtain", { scaleY: 0, transformOrigin: "bottom" })
    .to(".page-curtain", { scaleY: 1, duration: 0.6, ease: "power4.inOut" })
    .to(".page-curtain", { scaleY: 0, transformOrigin: "top", duration: 0.6, ease: "power4.inOut" });
  return tl;
};
```

---

## 🌊 LENIS SMOOTH SCROLL SETUP

```jsx
// app/providers.jsx
"use client";
import { ReactLenis } from "@studio-freight/react-lenis";

export function SmoothScrollProvider({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,          // Smoothness (lower = smoother)
        duration: 1.5,        // Scroll duration
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
```

---

## 🎭 FRAMER MOTION PATTERNS

### Stagger Children Animation
```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};

// Usage:
<motion.div variants={containerVariants} initial="hidden" whileInView="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>{item.content}</motion.div>
  ))}
</motion.div>
```

### Scroll-linked Progress Bar
```jsx
const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

<motion.div
  className="scroll-progress-bar"
  style={{ scaleX, transformOrigin: "left" }}
/>
```

---

## 🖼️ SECTION-BY-SECTION SPECIFICATIONS

### Section 1: Hero — "The Grand Entrance"
**Mood**: Desert sunset meets modern architecture
**Layout**: Full-screen, centered, overlaid on architectural video/image
**Elements**:
- **Background**: Dark 4K architectural image with parallax + subtle grain overlay
- **Pre-headline**: `ARUSHA HOME DESIGN PRO` - small caps, letter-spacing: 0.3em, gold color, fade in
- **Main headline**: `Transform Your Space Into Art` — split character reveal, 8vw
- **Sub-headline**: `Architectural & Interior Design Excellence in East Africa` — word by word reveal
- **CTA Buttons**: Two buttons — Primary (gold, magnetic) + Secondary (ghost, outline)
- **Scroll indicator**: Animated bouncing arrow + "Scroll to explore" text
- **Corner elements**: Year stamp `EST. 2024` and location `ARUSHA · TANZANIA`

**GSAP Timeline**:
```jsx
const heroTL = gsap.timeline({ delay: 0.5 });
heroTL
  .from(".hero-pre", { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" })
  .from(heroChars, { y: "120%", opacity: 0, duration: 1.2, stagger: 0.03, ease: "expo.out" }, "-=0.4")
  .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.6")
  .from(".hero-cta", { opacity: 0, y: 20, duration: 0.6, stagger: 0.15, ease: "power2.out" }, "-=0.4")
  .from(".hero-scroll", { opacity: 0, duration: 0.5 }, "-=0.2");
```

---

### Section 2: Marquee Stats Bar
**Elements**: 
- `150+ Projects Completed` • `50+ Happy Clients` • `7+ Years Experience` • `East Africa's Leading Firm`
- Infinite horizontal scroll using GSAP
- Gold separator dots between items

```jsx
useGSAP(() => {
  gsap.to(".marquee-inner", {
    xPercent: -50,
    ease: "none",
    duration: 20,
    repeat: -1,
  });
});
```

---

### Section 3: Services Grid — "What We Create"
**Layout**: 2-column (desktop), asymmetric cards with hover reveal
**Cards (7 services)**:
1. Customized Kitchens & Wardrobes
2. Architecture
3. Interior Design
4. Planning & Design
5. 3D Modelling
6. Construction
7. Project Supervision

**Card Interaction**:
- Default: Dark card, icon, service name
- Hover: Image slides up from bottom (clip-path reveal), description appears
- Number watermark: `01`, `02`... in background

---

### Section 4: Featured Projects — "Our Portfolio"
**Layout**: Horizontal scroll section pinned to viewport
**Cards**: Large (70vw each), image-dominant with overlay text
**Filter**: Architecture | Interior | Kitchens | Wardrobes | Construction

---

### Section 5: Products Showcase
**Products**:
1. TV Showcase
2. Kitchen Cabinet
3. Bedroom Wardrobe
4. Bed
5. Bathroom Cabinet

**Layout**: 3-column masonry grid, with lightbox on click

---

### Section 6: About/Story Strip
**Layout**: Split — left: large number/stat, right: paragraph
**Elements**: 
- `"We transform spaces into artworks that tell your story"`
- Animated counters: 150+ Projects | 50+ Clients | 7+ Years | 3 Countries

---

### Section 7: Team Section
**Layout**: Hover-reveal cards with 3D tilt effect
**Animation**: Name slides up, role fades in, social links appear on hover

---

### Section 8: Testimonials
**Layout**: Full-screen horizontal slider
**Animation**: GSAP snap scrolling between testimonials

---

### Section 9: Contact CTA
**Layout**: Dark full-width section
**Elements**: Large headline + email input + button + office address
**Animation**: Background architectural line drawing animates via SVG stroke

---

## 🧩 COMPONENT IMPLEMENTATION ORDER

```
Phase 1: Foundation
├── _app layout (providers, fonts, cursor, page transitions)
├── globals.css (design system tokens)
├── CustomCursor component
├── SmoothScrollProvider (Lenis)
├── Navbar (transparent → solid, mobile menu)
└── Footer (architectural grid)

Phase 2: Home Page
├── HeroSection (full animation sequence)
├── MarqueeBar (infinite scroll stats)
├── ServicesGrid (hover reveal cards)
├── ProjectsCarousel (horizontal scroll, pinned)
├── ProductsGrid (masonry, lightbox)
├── StatsSection (animated counters)
├── TestimonialsSlider (GSAP snap)
└── ContactCTA (SVG animation)

Phase 3: Inner Pages
├── /about (Story + Team + Values)
├── /services (Detailed service cards)
├── /projects (Filterable portfolio)
├── /products (Full product catalog)
└── /contact (Form + Map + Office info)
```

---

## 🎯 INTERACTION BENCHMARKS

Every component must meet these standards:

| Interaction | Target Feel |
|-------------|-------------|
| Page load | Brand reveal in 2.5s, then content |
| Scroll | Buttery smooth at 60fps (Lenis) |
| Hover on card | 300ms reveal with clip-path or opacity |
| Button hover | Magnetic pull + color shift |
| Image hover | Scale 1.05 + overlay reveal |
| Click | Instant feedback, ripple or state change |
| Page transition | 600ms curtain wipe |
| Text reveal | Character stagger, 30-50ms delay |
| Counter | 2.5s count-up on scroll into view |

---

## 🚨 QUALITY RULES — NON-NEGOTIABLE

1. **NO placeholder images** — Use Next.js Image with real architectural photography from Unsplash (free license)
2. **NO default fonts** — Always load Google Fonts
3. **NO plain backgrounds** — Every background has texture, gradient, or grain
4. **NO static sections** — Every section must animate on scroll
5. **NO basic buttons** — Every button has hover state, magnetic effect, or animation
6. **NO generic icons** — Use Lucide React or Phosphor Icons consistently
7. **Mobile-first responsive** — Test at 320px, 768px, 1024px, 1440px
8. **Performance** — Lazy load images, code-split routes, animate with transform/opacity only
9. **Accessibility** — `prefers-reduced-motion` media query must disable heavy animations
10. **SEO** — Every page has: title, description meta, OG image, semantic HTML

---

## 📁 PROJECT STRUCTURE

```
arusha-home-design/
├── app/
│   ├── layout.jsx              # Root layout, fonts, providers
│   ├── page.jsx                # Home page
│   ├── about/page.jsx
│   ├── services/page.jsx
│   ├── projects/page.jsx
│   ├── products/page.jsx
│   └── contact/page.jsx
├── components/
│   ├── ui/
│   │   ├── CustomCursor.jsx
│   │   ├── PageTransition.jsx
│   │   ├── MagneticButton.jsx
│   │   ├── AnimatedText.jsx
│   │   └── ScrollProgress.jsx
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── HeroSection.jsx
│   │   ├── ServicesGrid.jsx
│   │   ├── ProjectsCarousel.jsx
│   │   ├── ProductsGrid.jsx
│   │   ├── StatsSection.jsx
│   │   ├── TestimonialsSlider.jsx
│   │   └── ContactCTA.jsx
│   └── providers/
│       ├── SmoothScrollProvider.jsx
│       └── AnimationProvider.jsx
├── lib/
│   ├── gsap.js                 # GSAP registration + plugins
│   └── animations.js           # Reusable animation functions
├── styles/
│   └── globals.css
├── public/
│   └── images/
└── next.config.js
```

---

## ✅ PRE-FLIGHT CHECKLIST

Before considering ANY section "done":
- [ ] Enters with animation (scroll or load triggered)
- [ ] Has hover interaction (minimum: scale or opacity change)
- [ ] Uses design system colors (no ad-hoc hex values)
- [ ] Is responsive (mobile → desktop)
- [ ] Respects `prefers-reduced-motion`
- [ ] Image has `alt` text and `priority` flag if above fold
- [ ] Typography uses defined font variables
- [ ] Spacing uses defined spacing tokens
- [ ] Section has semantic HTML (`<section>`, `<article>`, `<header>`)
- [ ] GSAP instances are cleaned up in useGSAP cleanup function

---

*This skill file is the single source of truth for all design decisions on the Arusha Home Design Pro website. No deviation allowed without explicit user approval.*
