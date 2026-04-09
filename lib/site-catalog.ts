export type CatalogPlan = {
  title: string;
  id: string;
  image: string;
  price: string;
  floors: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  category: string;
  summary: string;
};

export type PlanDetail = CatalogPlan & {
  dimensions: string;
  penthouses?: string;
  apartments?: string;
  storiesLabel?: string;
  fileTypes: string[];
  recommendedType: string;
  drawingOptions: string[];
  trustPoints: string[];
  description: string;
  gallery: string[];
  drawingImages: string[];
  roomsIncluded: string[];
  drawingSets: {
    architectural: string[];
    structural: string[];
    electrical: string[];
    mechanical: string[];
    boq: string[];
  };
  estimateTiers: {
    name: string;
    items: { label: string; cost: string }[];
    total: string;
  }[];
  faqs: { question: string; answer: string }[];
};

export type CatalogProject = {
  title: string;
  category: string;
  image: string;
  location: string;
  year: string;
  area: string;
  status: string;
  summary: string;
};

export type CatalogService = {
  serviceId: string;
  title: string;
  image: string;
  summary: string;
  deliverables: string[];
  accent: string;
};

export const catalogServices: CatalogService[] = [
  {
    serviceId: "01",
    title: "Customized Kitchens and Wardrobes",
    image: "/images/service-kitchen.jpg",
    summary: "Premium storage systems and cabinetry shaped around lifestyle, circulation, and finish quality.",
    deliverables: ["Material moodboards", "Smart storage planning", "Build-ready cabinetry detailing"],
    accent: "Interiors",
  },
  {
    serviceId: "02",
    title: "Architecture",
    image: "/images/service-arch.jpg",
    summary: "Residential and commercial concepts designed for climate, family routines, and long-term value.",
    deliverables: ["Concept design", "Planning layouts", "Architectural drawing sets"],
    accent: "Core design",
  },
  {
    serviceId: "03",
    title: "Interior Design",
    image: "/images/service-interior.jpg",
    summary: "Elegant interior systems that translate brand, personality, and comfort into practical spaces.",
    deliverables: ["Space planning", "Furniture direction", "Finish and lighting schedules"],
    accent: "Lifestyle",
  },
  {
    serviceId: "04",
    title: "Planning and Design",
    image: "/images/service-planning.jpg",
    summary: "Early-stage planning support that helps clients compare options before construction begins.",
    deliverables: ["Feasibility thinking", "Site-responsive layouts", "Pre-construction decisions"],
    accent: "Strategy",
  },
  {
    serviceId: "05",
    title: "3D Modelling",
    image: "/images/service-3d.jpg",
    summary: "Photoreal visualizations that make plan comparison and stakeholder buy-in much easier.",
    deliverables: ["Exterior renders", "Interior previews", "Presentation-ready visuals"],
    accent: "Visualization",
  },
  {
    serviceId: "06",
    title: "Construction and Supervision",
    image: "/images/service-const.jpg",
    summary: "Execution guidance and oversight that connects design intent with the realities of the site.",
    deliverables: ["Site coordination", "Quality checks", "Construction guidance"],
    accent: "Delivery",
  },
];

export const catalogPlans: CatalogPlan[] = [
  {
    title: "Two-story family villa",
    id: "AHD-24411",
    image: "/images/hero-2.jpg",
    price: "From $270",
    floors: "2 Floors",
    bedrooms: "4 Bedrooms",
    bathrooms: "4 Bathrooms",
    area: "300 sqm",
    category: "Best Seller",
    summary: "A balanced family villa with a strong arrival sequence, open living core, and generous room sizing.",
  },
  {
    title: "Contemporary courtyard home",
    id: "AHD-13418",
    image: "/images/hero-1.jpg",
    price: "From $181",
    floors: "1 Floor",
    bedrooms: "3 Bedrooms",
    bathrooms: "4 Bathrooms",
    area: "202 sqm",
    category: "Modern House",
    summary: "A clean, approachable one-floor plan with strong indoor-outdoor flow and a simple modern roofline.",
  },
  {
    title: "Modern luxury mansion",
    id: "AHD-38901",
    image: "/images/projects-hero.jpg",
    price: "From $1,961",
    floors: "3 Floors",
    bedrooms: "8 Bedrooms",
    bathrooms: "10 Bathrooms",
    area: "1,068 sqm",
    category: "Luxury House",
    summary: "Large-scale contemporary living with formal entertaining zones, vertical drama, and premium massing.",
  },
  {
    title: "Stylish 3-bedroom two-story home",
    id: "AHD-23307",
    image: "/images/proj-1.jpg",
    price: "From $394",
    floors: "2 Floors",
    bedrooms: "3 Bedrooms",
    bathrooms: "3 Bathrooms",
    area: "438 sqm",
    category: "New Arrival",
    summary: "A flexible family house that pairs a compact footprint with expressive elevation treatment.",
  },
  {
    title: "Modern two-bedroom pavilion plan",
    id: "AHD-22304",
    image: "/images/proj-2.jpg",
    price: "From $329",
    floors: "2 Floors",
    bedrooms: "2 Bedrooms",
    bathrooms: "3 Bathrooms",
    area: "366 sqm",
    category: "Budget Smart",
    summary: "A lighter, efficient plan concept for clients who want a bold look without unnecessary complexity.",
  },
  {
    title: "Spacious seven-bedroom residence",
    id: "AHD-27903",
    image: "/images/proj-3.jpg",
    price: "From $639",
    floors: "2 Floors",
    bedrooms: "7 Bedrooms",
    bathrooms: "9 Bathrooms",
    area: "710 sqm",
    category: "Compound Living",
    summary: "Designed for large households and hosting, with clear zoning between private and social spaces.",
  },
];

const defaultFaqs = [
  {
    question: "Can I view more pictures of this house plan?",
    answer: "Yes. We can share additional previews, drawing extracts, and consultation visuals once you shortlist the plan with us.",
  },
  {
    question: "How long will it take to get my order?",
    answer: "For consultation-led plan packages, we typically respond within 24 hours and outline the exact delivery process based on customization needs.",
  },
  {
    question: "What are PDF and CAD formats?",
    answer: "PDF is ideal for viewing and printing. CAD files are editable technical files used by architects, engineers, and consultants.",
  },
  {
    question: "Can I modify the house plan?",
    answer: "Yes. The new storefront is designed to encourage comparison first, then customization with the studio once you find the closest match.",
  },
];

export const planDetails: PlanDetail[] = catalogPlans.map((plan, index) => ({
  ...plan,
  dimensions: index === 2 ? "17m x 32m" : index === 0 ? "13.3m x 14.9m" : "15m x 18m",
  penthouses: index === 2 ? "1 Penthouse" : undefined,
  apartments: index === 2 ? "11 Apartments" : undefined,
  storiesLabel: plan.floors,
  fileTypes: ["CAD + PDF", "PDF"],
  recommendedType: "CAD + PDF",
  drawingOptions: ["Architectural Drawings", "Structural Drawings", "Mechanical Drawings", "Electrical Drawings", "Bills of Quantity (BOQ)"],
  trustPoints: ["Instant digital delivery", "100% money guarantee", "Multiple payment options"],
  description:
    index === 2
      ? "A dramatic multi-level concept organized for apartments, a penthouse level, and strong street presence. The design emphasizes daylight, vertical circulation, and efficient unit stacking while keeping the facade premium."
      : `${plan.summary} The layout is designed to balance aesthetic impact with practical construction planning, making it easier for clients to compare and customize confidently.`,
  gallery: [plan.image, "/images/hero-2.jpg", "/images/hero-1.jpg", "/images/proj-1.jpg", "/images/proj-2.jpg"],
  drawingImages: ["/images/services-hero.jpg", "/images/proj-3.jpg", "/images/proj-2.jpg", "/images/proj-1.jpg"],
  roomsIncluded: [
    "Master Bedroom",
    "Bedroom",
    "WC",
    "Balcony",
    "Living Room",
    "Kitchen",
    "Dining Room",
    "Indoor Store Room",
    "Office / Library",
    "Terrace",
    "Garage / Parking",
  ],
  drawingSets: {
    architectural: ["Foundation plan", "Floor plans", "Roof plan", "Sections", "Elevations", "Door schedule", "Window schedule"],
    structural: ["Structural calculations", "Foundation layout", "Column details", "Slab panels", "Staircase details"],
    electrical: ["Electrical panel", "Lighting and switches", "Power outlets"],
    mechanical: ["Clean water", "Waste water", "Septic tank", "Soak-away pit"],
    boq: ["Bills of quantity (BOQ)"],
  },
  estimateTiers: [
    {
      name: "Basic",
      items: [
        { label: "Substructure", cost: "$143,250" },
        { label: "Superstructure", cost: "$121,045" },
        { label: "Roof", cost: "$95,410" },
        { label: "Doors", cost: "$41,290" },
        { label: "Windows", cost: "$35,150" },
        { label: "Finishes", cost: "$119,500" },
      ],
      total: "$555,645",
    },
    {
      name: "Standard",
      items: [
        { label: "Substructure", cost: "$253,925" },
        { label: "Superstructure", cost: "$132,041" },
        { label: "Roof", cost: "$152,355" },
        { label: "Doors", cost: "$78,354" },
        { label: "Windows", cost: "$65,295" },
        { label: "Finishes", cost: "$274,239" },
        { label: "Decorations", cost: "$52,236" },
        { label: "Plumbing installations", cost: "$65,295" },
        { label: "Electrical installations", cost: "$78,354" },
      ],
      total: "$1,152,094",
    },
    {
      name: "Luxury",
      items: [
        { label: "Substructure", cost: "$318,610" },
        { label: "Superstructure", cost: "$188,490" },
        { label: "Roof", cost: "$201,700" },
        { label: "Doors", cost: "$105,870" },
        { label: "Windows", cost: "$91,430" },
        { label: "Finishes", cost: "$392,300" },
        { label: "Decorations", cost: "$97,460" },
        { label: "Plumbing installations", cost: "$102,240" },
        { label: "Electrical installations", cost: "$116,920" },
      ],
      total: "$1,615,020",
    },
  ],
  faqs: defaultFaqs,
}));

export function getPlanDetail(id: string) {
  return planDetails.find((plan) => plan.id === id || plan.id.toLowerCase() === id.toLowerCase()) ?? null;
}

export const catalogProjects: CatalogProject[] = [
  {
    title: "Modern Villa Arusha",
    category: "Architecture",
    image: "/images/hero-2.jpg",
    location: "Arusha, Tanzania",
    year: "2025",
    area: "450 sqm",
    status: "Completed",
    summary: "A polished villa concept translated into a premium, airy family home with strong curb appeal.",
  },
  {
    title: "Executive office interior",
    category: "Interior Design",
    image: "/images/about-hero.jpg",
    location: "Dar es Salaam, Tanzania",
    year: "2024",
    area: "180 sqm",
    status: "Installed",
    summary: "Warm, efficient workspace planning with refined joinery and a more executive hospitality feel.",
  },
  {
    title: "Luxury kitchen remodel",
    category: "Joinery",
    image: "/images/service-kitchen.jpg",
    location: "Nairobi, Kenya",
    year: "2025",
    area: "72 sqm",
    status: "Delivered",
    summary: "Bespoke cabinetry and layered finishes built around workflow, durability, and daily use.",
  },
  {
    title: "Residential estate concept",
    category: "Master Planning",
    image: "/images/proj-1.jpg",
    location: "Arusha, Tanzania",
    year: "2026",
    area: "1,200 sqm",
    status: "In Design",
    summary: "A broader family compound study combining plan choice, landscape structure, and phased execution.",
  },
  {
    title: "Commercial complex proposal",
    category: "Construction",
    image: "/images/service-arch.jpg",
    location: "Kampala, Uganda",
    year: "2024",
    area: "980 sqm",
    status: "Under Construction",
    summary: "A mixed-use concept shaped around movement, visibility, and durable construction systems.",
  },
  {
    title: "Penthouse interior concept",
    category: "Interior Design",
    image: "/images/service-interior.jpg",
    location: "Mombasa, Kenya",
    year: "2025",
    area: "260 sqm",
    status: "Completed",
    summary: "An upscale interior concept focused on view framing, quiet luxury, and layered material contrast.",
  },
];
