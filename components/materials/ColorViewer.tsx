"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Info, Maximize2, Minus, Plus, Share2, X } from "lucide-react";
import { useState } from "react";

type Swatch = {
  name: string;
  image: string;
  look?: string;
  brand?: string;
  finish?: string;
};

export default function ColorViewer({ swatch, onClose }: { swatch: Swatch; onClose: () => void }) {
  const [zoom, setZoom] = useState(1);
  const [showDetails, setShowDetails] = useState(true);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="material-viewer"
      >
        <div className="material-viewer-toolbar">
          <button type="button" onClick={() => setShowDetails((value) => !value)} aria-label="Toggle details">
            <Info size={18} />
          </button>
          <div>
            <button type="button" onClick={() => setZoom((value) => Math.max(1, value - 0.25))} aria-label="Zoom out">
              <Minus size={18} />
            </button>
            <button type="button" onClick={() => setZoom((value) => Math.min(2.5, value + 0.25))} aria-label="Zoom in">
              <Plus size={18} />
            </button>
            <button type="button" onClick={() => setZoom(1)} aria-label="Reset zoom">
              <Maximize2 size={18} />
            </button>
          </div>
          <button type="button" onClick={onClose} aria-label="Close viewer">
            <X size={20} />
          </button>
        </div>

        <motion.div animate={{ scale: zoom }} transition={{ type: "spring", stiffness: 120, damping: 22 }} className="material-viewer-image">
          <Image src={swatch.image} alt={swatch.name} fill priority sizes="100vw" />
        </motion.div>

        {showDetails ? (
          <motion.aside
            initial={{ x: -28, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -28, opacity: 0 }}
            className="material-viewer-info"
          >
            <div className="material-viewer-mark">
              {String(swatch.brand || "AH").slice(0, 2)}
            </div>
            <p className="material-kicker">Selected finish</p>
            <h2>{swatch.name}</h2>
            <dl>
              <div>
                <dt>Look</dt>
                <dd>{swatch.look || "Not specified"}</dd>
              </div>
              <div>
                <dt>Brand</dt>
                <dd>{swatch.brand || "Arusha curated"}</dd>
              </div>
              <div>
                <dt>Finish</dt>
                <dd>{swatch.finish || "Material surface"}</dd>
              </div>
            </dl>
            <div className="material-viewer-actions">
              <button type="button" onClick={() => setShowDetails(false)}>Hide details</button>
              <button type="button" aria-label="Share swatch"><Share2 size={16} /></button>
            </div>
          </motion.aside>
        ) : null}

        <div className="material-viewer-note">Colors may vary on screens. Confirm with a physical sample before production.</div>
      </motion.div>
    </AnimatePresence>
  );
}
