import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Space_Grotesk, Italiana, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const italiana = Italiana({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-italiana",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arusha Home Design Pro | Architectural & Interior Design",
  description:
    "East Africa's premier architectural and interior design firm based in Arusha, Tanzania. Specializing in architecture, interior design, customized kitchens, wardrobes, 3D modelling, and construction.",
  keywords: "architecture, interior design, Arusha, Tanzania, East Africa, kitchen design, wardrobe, 3D modelling, construction",
  openGraph: {
    title: "Arusha Home Design Pro",
    description: "Transforming spaces into art across East Africa.",
    type: "website",
    locale: "en_US",
  },
};

import LayoutWrapper from "@/components/layout/LayoutWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${dmSans.variable} ${spaceGrotesk.variable} ${italiana.variable} ${cormorant.variable}`}
        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
      >
        <SmoothScrollProvider>
          <ScrollProgress />
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
