import type { Metadata } from "next";
import ContactPageClient from "@/app/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact | Arusha Home Design Pro",
  description:
    "Get in touch with Arusha Home Design Pro. Visit us in Ngaramtoni, Arusha or reach out via email and phone for a free consultation.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
