"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isStorefront = pathname?.startsWith("/products");

  useEffect(() => {
    if (isStorefront) {
      document.body.classList.add("storefront-body");
      return () => document.body.classList.remove("storefront-body");
    }

    document.body.classList.remove("storefront-body");
  }, [isStorefront]);

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className={isStorefront ? "storefront-main" : undefined}>{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
