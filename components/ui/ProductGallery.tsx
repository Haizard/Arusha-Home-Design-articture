"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images = [] }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const nextImage = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="product-gallery-system">
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
              style={{ position: 'relative', width: '100%', height: '100%' }}
            >
              <Image
                src={images[activeIndex]}
                alt={`Product view ${activeIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1400px) 100vw, 1200px"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button onClick={prevImage} className="nav-btn prev">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextImage} className="nav-btn next">
                <ChevronRight size={24} />
              </button>
            </>
          )}

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
      {images.length > 1 && (
        <div className="thumb-strip-container">
          <div className="thumb-strip">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`thumb-btn ${activeIndex === idx ? 'active' : ''}`}
              >
                <div className="thumb-image-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </div>
                {activeIndex === idx && (
                  <motion.div layoutId="active-thumb-product" className="active-indicator" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

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
                  src={images[activeIndex]}
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
        .product-gallery-system {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .main-display-container {
          position: relative;
          aspect-ratio: 16 / 10;
          background: #000;
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
          width: 44px;
          height: 44px;
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
          background: #c9a84c;
          color: black;
          transform: translateY(-50%) scale(1.1);
        }

        .nav-btn.prev { left: 1.5rem; }
        .nav-btn.next { right: 1.5rem; }

        .lightbox-trigger {
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 10;
        }
        
        .main-display-container:hover .lightbox-trigger {
          opacity: 1;
        }

        /* Thumbnails */
        .thumb-strip-container {
          width: 100%;
          padding: 0 1.5rem 1.5rem;
        }

        .thumb-strip {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .thumb-strip::-webkit-scrollbar { display: none; }

        .thumb-btn {
          position: relative;
          width: 80px;
          aspect-ratio: 4 / 3;
          flex-shrink: 0;
          border: none;
          background: #1a1a1a;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          padding: 0;
          transition: transform 0.2s;
        }

        .thumb-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          opacity: 0.4;
          transition: opacity 0.3s;
        }

        .thumb-btn.active .thumb-image-wrapper {
          opacity: 1;
        }

        .active-indicator {
          position: absolute;
          inset: 0;
          border: 2px solid #c9a84c;
          border-radius: 8px;
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
           .thumb-btn { width: 60px; }
           .nav-btn { width: 36px; height: 36px; opacity: 1; }
        }
      `}</style>
    </div>
  );
}
