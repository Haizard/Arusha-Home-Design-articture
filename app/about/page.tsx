import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us | Arusha Home Design Pro",
  description:
    "Meet the team behind East Africa's premier architectural and interior design firm. Learn our story, mission, and core values.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
