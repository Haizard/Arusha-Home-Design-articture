"use client";
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
}

function isUsableImageSrc(src: unknown): src is string {
  if (typeof src !== 'string') return false;
  const value = src.trim();
  return (
    value.startsWith('/') ||
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('data:image/')
  );
}

export default function ProjectGallery({ images = [] }: ProjectGalleryProps) {
  const safeImages = useMemo(
    () => images.map((image) => image?.trim()).filter(isUsableImageSrc),
    [images]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (safeImages.length === 0) return null;

  const nextImage = () => setActiveIndex((prev) => (prev + 1) % safeImages.length);
  const prevImage = () => setActiveIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  const clampedActiveIndex = Math.min(activeIndex, safeImages.length - 1);
  const activeImage = safeImages[clampedActiveIndex] || safeImages[0];

  return (
    <div className="project-gallery-system">
      {/* Main Display Area */}
      <div className="main-display-container">
        <div className="main-image-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="main-image-motion"
            >
              <Image
                src={activeImage}
                alt={`Project view ${clampedActiveIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1400px) 100vw, 1200px"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button onClick={prevImage} className="nav-btn prev">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextImage} className="nav-btn next">
            <ChevronRight size={24} />
          </button>

          {/* Lightbox Trigger */}
          <button 
            onClick={() => setIsLightboxOpen(true)}
            className="lightbox-trigger"
            title="Expand View"
          >
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="thumb-strip-container">
        <div className="thumb-strip">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`thumb-btn ${clampedActiveIndex === idx ? 'active' : ''}`}
            >
              <div className="thumb-image-wrapper">
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>
              {activeIndex === idx && (
                <motion.div layoutId="active-thumb" className="active-indicator" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="lightbox-content">
              <div style={{ position: 'relative', width: '90vw', height: '80vh' }}>
                <Image
                  src={activeImage}
                  alt="Full screen view"
                  fill
                  sizes="90vw"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <button 
                 style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}
                 onClick={() => setIsLightboxOpen(false)}
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .project-gallery-system {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .main-display-container {
          position: relative;
          aspect-ratio: 16 / 10;
          background: #111;
          border-radius: 8px;
          overflow: hidden;
          width: 100%;
        }

        .main-image-wrapper, .main-image-motion {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          opacity: 0;
          z-index: 10;
        }

        .main-display-container:hover .nav-btn {
          opacity: 1;
        }

        .nav-btn:hover {
          background: var(--color-gold);
          color: black;
          transform: translateY(-50%) scale(1.1);
        }

        .nav-btn.prev { left: 1rem; }
        .nav-btn.next { right: 1rem; }

        .lightbox-trigger {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
        }

        /* Thumbnails */
        .thumb-strip-container {
          width: 100%;
          overflow-x: auto;
          scrollbar-width: thin;
          padding-bottom: 0.5rem;
        }

        .thumb-strip {
          display: flex;
          gap: 1rem;
          min-width: max-content;
        }

        .thumb-btn {
          position: relative;
          width: 100px;
          aspect-ratio: 4 / 3;
          border: none;
          background: #1a1a1a;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          padding: 0;
          transition: transform 0.2s;
        }

        .thumb-btn:hover {
          transform: translateY(-2px);
        }

        .thumb-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          opacity: 0.6;
          transition: opacity 0.3s;
        }

        .thumb-btn.active .thumb-image-wrapper {
          opacity: 1;
        }

        .active-indicator {
          position: absolute;
          inset: 0;
          border: 2px solid var(--color-gold);
          border-radius: 4px;
          z-index: 5;
          pointer-events: none;
        }

        /* Lightbox */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }

        .lightbox-content {
          position: relative;
        }

        @media (max-width: 768px) {
           .thumb-btn { width: 80px; }
           .nav-btn { width: 40px; height: 40px; opacity: 1; }
        }
      `}</style>
    </div>
  );
}
