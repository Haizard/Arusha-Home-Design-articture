import { getMaterialRanges } from "@/app/actions/materials";
import MaterialsHub from "@/components/materials/MaterialsHub";

export const metadata = {
  title: "Materials Library | Arusha Home Design Pro",
  description:
    "Explore curated decorative panels, finishes, color swatches, profiles, and technical specifications for interiors and architectural fit-outs.",
};

export default async function MaterialsPage() {
  const ranges = await getMaterialRanges().catch(() => []);

  return <MaterialsHub ranges={ranges} compact />;
}
