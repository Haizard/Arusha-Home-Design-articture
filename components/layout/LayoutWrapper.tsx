"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    document.body.classList.add("storefront-body");
    return () => document.body.classList.remove("storefront-body");
  }, []);

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className="storefront-main">{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
