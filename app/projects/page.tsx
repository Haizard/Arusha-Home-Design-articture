import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";
import { getProjects } from "@/app/actions/admin";

export const metadata: Metadata = {
  title: "Portfolio | Arusha Home Design Pro",
  description:
    "Explore residential, commercial, and interior portfolio work presented in the same polished visual language as the rest of the site.",
};

export default async function ProjectsPage() {
  const projects = await getProjects().catch(() => []);
  return <ProjectsPageClient projects={projects} />;
}
