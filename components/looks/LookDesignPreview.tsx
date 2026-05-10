"use client";

import { useState } from "react";
import ColorViewer from "@/components/materials/ColorViewer";
import { isUsableImageSrc, type LookDesign } from "@/lib/lookFallbacks";

function getDesignImage(design: LookDesign, fallbackImage: string) {
  return isUsableImageSrc(design.image) ? design.image : fallbackImage;
}

export default function LookDesignPreview({
  designs,
  fallbackImage,
}: {
  designs: LookDesign[];
  fallbackImage: string;
}) {
  const [selectedDesign, setSelectedDesign] = useState<LookDesign | null>(null);

  return (
    <>
      <div className="look-detail-chip-list interactive">
        {designs.length > 0 ? (
          designs.map((design, index) => (
            <button key={`${design.name}-${index}`} type="button" onClick={() => setSelectedDesign(design)}>
              {design.name || `Design ${index + 1}`}
            </button>
          ))
        ) : (
          <span>Add colours and designs from the CMS</span>
        )}
      </div>

      {selectedDesign ? (
        <ColorViewer
          swatch={{
            name: selectedDesign.name || "Selected design",
            image: getDesignImage(selectedDesign, fallbackImage),
            look: "Choose a Look",
            brand: selectedDesign.productRange || "Arusha curated",
            finish: selectedDesign.finish || "Design finish",
          }}
          onClose={() => setSelectedDesign(null)}
        />
      ) : null}
    </>
  );
}
