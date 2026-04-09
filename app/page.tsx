import HeroSection from "@/components/sections/HeroSection";
import MarqueeBar from "@/components/sections/MarqueeBar";
import ServicesGrid from "@/components/sections/ServicesGrid";
import StatsSection from "@/components/sections/StatsSection";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import ProductsGrid from "@/components/sections/ProductsGrid";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactCTA from "@/components/sections/ContactCTA";
import PhilosophySection from "@/components/sections/PhilosophySection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeBar />
      <ServicesGrid />
      <StatsSection />
      <PhilosophySection />
      <ProjectsGrid />
      <ProductsGrid />
      <TestimonialsSection />
      <ContactCTA />
    </>
  );
}
