'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Share2, Info } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

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
        className="fixed inset-0 z-[2000] bg-white flex items-center justify-center overflow-hidden"
      >
        {/* Background Swatch with Zoom */}
        <motion.div 
          animate={{ scale: zoom }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="absolute inset-0 w-full h-full"
        >
          <Image 
            src={swatch.image} 
            alt={swatch.name} 
            fill 
            className="object-contain md:object-cover"
            priority
          />
        </motion.div>

        {/* Top Navigation */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10 pointer-events-none">
          <div className="flex gap-4 pointer-events-auto">
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="w-12 h-12 bg-white shadow-md rounded-full flex items-center justify-center text-neutral-800 hover:bg-neutral-50 transition-colors border border-neutral-100"
              title={showDetails ? "Hide Details" : "Show Details"}
            >
              <Info size={20} />
            </button>
          </div>

          <div className="flex gap-4 pointer-events-auto">
             <div className="flex bg-white shadow-md rounded-full overflow-hidden border border-neutral-100">
                <button 
                  onClick={() => setZoom(prev => Math.min(prev + 0.5, 3))}
                  className="w-12 h-12 flex items-center justify-center text-neutral-800 hover:bg-neutral-50 border-r border-neutral-100"
                >
                  <ZoomIn size={20} />
                </button>
                <button 
                  onClick={() => setZoom(prev => Math.max(prev - 0.5, 1))}
                  className="w-12 h-12 flex items-center justify-center text-neutral-800 hover:bg-neutral-50"
                >
                  <ZoomOut size={20} />
                </button>
             </div>
             <button 
              onClick={onClose}
              className="w-12 h-12 bg-white shadow-md rounded-full flex items-center justify-center text-neutral-800 hover:bg-neutral-50 transition-colors border border-neutral-100"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Side Info Panel */}
        <AnimatePresence>
          {showDetails && (
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className="absolute left-6 top-24 w-72 bg-white p-8 rounded-sm shadow-2xl z-10"
            >
              <div className="flex flex-col gap-6">
                <div className="w-12 h-12 flex items-center justify-center bg-green-700 text-white rounded-sm mb-2">
                  <span className="font-bold text-xs uppercase text-center">PG<br/>Bison</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-1">Colour</p>
                    <h2 className="text-2xl font-bold text-neutral-900 leading-none">{swatch.name}</h2>
                  </div>

                  {swatch.look && (
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-1">Look</p>
                      <p className="text-sm font-bold text-neutral-800">{swatch.look}</p>
                    </div>
                  )}

                  {swatch.brand && (
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-1">Brand</p>
                      <p className="text-sm font-bold text-neutral-800">{swatch.brand}</p>
                    </div>
                  )}

                  {swatch.finish && (
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-1">Finish</p>
                      <p className="text-xs font-bold text-neutral-800 uppercase">{swatch.finish}</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-neutral-100 flex gap-4">
                  <button className="flex-1 py-3 bg-neutral-100 text-[10px] font-bold uppercase tracking-wider rounded-sm hover:bg-neutral-200 transition-colors">
                    Hide details
                  </button>
                  <button className="p-3 bg-neutral-100 rounded-sm hover:bg-neutral-200 transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer info (optional) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-[10px] uppercase font-bold tracking-widest text-center pointer-events-none">
          *Colours may vary, please also refer to an actual sample.
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
