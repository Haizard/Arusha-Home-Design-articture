import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

import connectDB from './lib/mongodb';
import Service from './models/Service';
import Project from './models/Project';
import Product from './models/Product';
import Testimonial from './models/Testimonial';

const services = [
  {
    serviceId: "01",
    iconName: "Sofa",
    title: "Customized Kitchens & Wardrobes",
    description: "Stylish, functional, space-efficient kitchen and wardrobe solutions tailored to your lifestyle — quality craftsmanship, smart storage, and elegant finishes.",
    imageUrl: "/images/service-kitchen.jpg",
  },
  {
    serviceId: "02",
    iconName: "Building2",
    title: "Architecture",
    description: "From residential villas to commercial complexes — innovative, sustainable architectural designs built for the future of East Africa.",
    imageUrl: "/images/service-arch.jpg",
  },
  {
    serviceId: "03",
    iconName: "Paintbrush",
    title: "Interior Design",
    description: "Elegant, functional interiors that reflect your personality and vision — blending aesthetics, comfort, and the latest design trends.",
    imageUrl: "/images/service-interior.jpg",
  },
  {
    serviceId: "04",
    iconName: "LayoutDashboard",
    title: "Planning & Design",
    description: "From concept to blueprint — our experienced design team transforms your ideas into functional, creative, and well-structured solutions.",
    imageUrl: "/images/service-planning.jpg",
  },
  {
    serviceId: "05",
    iconName: "Box",
    title: "3D Modelling",
    description: "High-quality, photorealistic 3D visualizations that bring your ideas to life — see the final outcome before any construction begins.",
    imageUrl: "/images/service-3d.jpg",
  },
  {
    serviceId: "06",
    iconName: "HardHat",
    title: "Construction",
    description: "Comprehensive construction services — new builds, renovations, and full project execution ensuring quality craftsmanship at every stage.",
    imageUrl: "/images/service-const.jpg",
  },
  {
    serviceId: "07",
    iconName: "ClipboardList",
    title: "Project Supervision",
    description: "Professional project coordination with clients, contractors, and design teams — ensuring smooth execution, quality control, and efficient resource management.",
    imageUrl: "/images/team-4.jpg",
  },
  {
    serviceId: "08",
    iconName: "Building2",
    title: "Exterior Design",
    description: "Breathtaking exterior solutions that harmonize with the environment — from landscaping to facade design and outdoor living spaces.",
    imageUrl: "/images/hero-2.jpg",
  },
  {
    serviceId: "09",
    iconName: "Hammer",
    title: "Renovation",
    description: "Breathing new life into existing structures — comprehensive renovation services that modernize and upgrade your space while preserving its character.",
    imageUrl: "/images/service-renov.jpg",
  },
];

const projects = [
  {
    title: "Modern Villa Arusha",
    category: "Architecture",
    location: "Arusha, Tanzania",
    imageUrl: "/images/hero-2.jpg",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
      "https://images.unsplash.com/photo-1600607687940-c52fb0729753?q=80&w=2070",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974"
    ],
    blueprints: [
      "https://images.unsplash.com/photo-1503387762-592dee58c460?q=80&w=2070"
    ],
    specifications: {
      year: "2023",
      area: "450 sqm",
      team: ["Arusha Design Studio", "Lead Architect: John Doe"],
      client: "Confidential",
      materials: ["Glass", "Obsidian Stone", "Brushed Steel"]
    },
    description: "A flagship residential project that redefines luxury living in Arusha. The villa features a seamless integration of indoor and outdoor spaces, utilizing local volcanic stone and extensive glazing to capture the stunning views of Mount Meru."
  },
  {
    title: "Executive Office Interior",
    category: "Interior",
    location: "Dar es Salaam",
    imageUrl: "/images/about-hero.jpg",
  },
  {
    title: "Luxury Kitchen Remodel",
    category: "Kitchen",
    location: "Nairobi, Kenya",
    imageUrl: "/images/service-kitchen.jpg",
  },
  {
    title: "Commercial Complex",
    category: "Construction",
    location: "Arusha, Tanzania",
    imageUrl: "/images/service-arch.jpg",
  },
  {
    title: "Penthouse Interior",
    category: "Interior",
    location: "Mombasa, Kenya",
    imageUrl: "/images/service-interior.jpg",
  },
  {
    title: "Residential Estate",
    category: "Architecture",
    location: "Arusha, Tanzania",
    imageUrl: "/images/proj-1.jpg",
  },
];

const products = [
  {
    title: "TV Showcase",
    category: "Living Room",
    imageUrl: "/images/prod-tv.jpg",
    description: "Custom-built TV showcases with integrated shelving, mood lighting, and premium finishes.",
  },
  {
    title: "Kitchen Cabinet",
    category: "Kitchen",
    imageUrl: "/images/service-kitchen.jpg",
    description: "Modern kitchen cabinets designed for maximum functionality and aesthetic appeal.",
  },
  {
    title: "Bedroom Wardrobe",
    category: "Bedroom",
    imageUrl: "/images/prod-wardrobe.jpg",
    description: "Walk-in and fitted wardrobe solutions with intelligent storage systems.",
  },
  {
    title: "Custom Bed",
    category: "Bedroom",
    imageUrl: "/images/prod-bed.jpg",
    description: "Luxurious bed frames crafted with high-quality materials for the ultimate sleep experience.",
  },
  {
    title: "Architectural Drawings",
    category: "Architecture",
    imageUrl: "/images/services-hero.jpg",
    description: "Detailed blueprints and technical drawings for residential and commercial projects.",
  },
  {
    title: "Exterior Solutions",
    category: "Exterior",
    imageUrl: "/images/hero-2.jpg",
    description: "Complete exterior design plans including facade, landscaping, and outdoor amenities.",
  },
];

const testimonials = [
  {
    text: "Arusha Home Design Pro completely transformed our villa. Their attention to detail and creativity exceeded every expectation. The result is truly breathtaking — a home we are proud to live in.",
    name: "James Mwangi",
    role: "Residential Client · Arusha",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format",
    stars: 5,
  },
  {
    text: "Our office interior has received nothing but compliments since Arusha Home revamped it. Professional, punctual, and incredibly talented. I would recommend them without hesitation.",
    name: "Amina Hassan",
    role: "CEO · Commercial Client · Dar es Salaam",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b0e5?w=100&q=80&auto=format",
    stars: 5,
  },
  {
    text: "The kitchen they designed for us is a masterpiece — functional, beautiful, and perfectly tailored to our family's needs. The team was collaborative throughout the entire process.",
    name: "David Kimani",
    role: "Residential Client · Nairobi",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80&auto=format",
    stars: 5,
  },
];

async function seed() {
  console.log('Starting seed process...');
  console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Defined (length: ' + process.env.MONGODB_URI.length + ')' : 'Undefined');
  
  await connectDB();
  
  await Service.deleteMany({});
  await Service.insertMany(services);
  
  await Project.deleteMany({});
  await Project.insertMany(projects);
  
  await Product.deleteMany({});
  await Product.insertMany(products);
  
  await Testimonial.deleteMany({});
  await Testimonial.insertMany(testimonials);
  
  console.log('Database seeded successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
