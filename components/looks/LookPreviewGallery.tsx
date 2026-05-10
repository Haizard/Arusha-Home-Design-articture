"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Images, Info, X } from "lucide-react";
import { isUsableImageSrc } from "@/lib/lookFallbacks";

export type LookPreviewItem = {
  name?: string;
  image?: string;
  images?: string[];
  finish?: string;
  productRange?: string;
  description?: string;
};

function getImages(item: LookPreviewItem, fallbackImage: string) {
  const values = [...(item.images ?? []), item.image].filter(isUsableImageSrc);
  return values.length > 0 ? Array.from(new Set(values)) : [fallbackImage];
}

export default function LookPreviewGallery({
  items,
  fallbackImage,
  emptyLabel,
}: {
  items: LookPreviewItem[];
  fallbackImage: string;
  emptyLabel: string;
}) {
  const [selectedItem, setSelectedItem] = useState<LookPreviewItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const selectedImages = useMemo(
    () => selectedItem ? getImages(selectedItem, fallbackImage) : [],
    [fallbackImage, selectedItem]
  );
  const activeImage = selectedImages[activeImageIndex] || selectedImages[0];

  return (
    <>
      <div className="look-preview-card-grid">
        {items.length > 0 ? (
          items.map((item, index) => {
            const images = getImages(item, fallbackImage);
            return (
              <button
                key={`${item.name}-${index}`}
                type="button"
                className="look-preview-card"
                onClick={() => {
                  setSelectedItem(item);
                  setActiveImageIndex(0);
                }}
              >
                <span className="look-preview-card-image">
                  <Image src={images[0]} alt={item.name || `Preview ${index + 1}`} fill sizes="(max-width: 800px) 50vw, 18vw" />
                  <small><Images size={13} /> {images.length}</small>
                </span>
                <span className="look-preview-card-body">
                  <strong>{item.name || `Preview ${index + 1}`}</strong>
                  <em>{item.finish || item.description || item.productRange || "Tap to preview"}</em>
                </span>
              </button>
            );
          })
        ) : (
          <span className="look-preview-empty">{emptyLabel}</span>
        )}
      </div>

      {selectedItem && activeImage ? (
        <div className="look-preview-modal" role="dialog" aria-modal="true">
          <div className="look-preview-modal-toolbar">
            <button type="button" onClick={() => setSelectedItem(null)} aria-label="Close preview">
              <X size={20} />
            </button>
          </div>
          <div className="look-preview-modal-image">
            <Image src={activeImage} alt={selectedItem.name || "Preview"} fill priority sizes="100vw" />
            {selectedImages.length > 1 ? (
              <>
                <button type="button" className="look-preview-arrow prev" onClick={() => setActiveImageIndex((value) => (value - 1 + selectedImages.length) % selectedImages.length)} aria-label="Previous image">
                  <ChevronLeft size={24} />
                </button>
                <button type="button" className="look-preview-arrow next" onClick={() => setActiveImageIndex((value) => (value + 1) % selectedImages.length)} aria-label="Next image">
                  <ChevronRight size={24} />
                </button>
              </>
            ) : null}
          </div>
          <aside className="look-preview-modal-info">
            <Info size={18} />
            <p className="material-kicker">Preview</p>
            <h2>{selectedItem.name}</h2>
            <dl>
              {selectedItem.finish ? (
                <div>
                  <dt>Finish</dt>
                  <dd>{selectedItem.finish}</dd>
                </div>
              ) : null}
              {selectedItem.productRange ? (
                <div>
                  <dt>Product range</dt>
                  <dd>{selectedItem.productRange}</dd>
                </div>
              ) : null}
              {selectedItem.description ? (
                <div>
                  <dt>Details</dt>
                  <dd>{selectedItem.description}</dd>
                </div>
              ) : null}
            </dl>
          </aside>
        </div>
      ) : null}
    </>
  );
}
