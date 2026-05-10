import { getMaterialRanges } from "@/app/actions/materials";
import MaterialsHub from "@/components/materials/MaterialsHub";

export default async function HomePage() {
  const ranges = await getMaterialRanges().catch(() => []);

  return <MaterialsHub ranges={ranges} />;
}
