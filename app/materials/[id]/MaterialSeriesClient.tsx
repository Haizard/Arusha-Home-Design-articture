'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import ColorViewer from '@/components/materials/ColorViewer';

export default function MaterialSeriesClient({ range }: { range: any }) {
  const [selectedColor, setSelectedColor] = useState<any>(null);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      {range.heroImage && (
        <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
          <Image 
            src={range.heroImage} 
            alt={range.title} 
            fill 
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      {/* Intro Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1">
            <div className="flex items-center gap-6 mb-8">
              <h1 className="text-6xl font-bold tracking-tighter text-neutral-900">{range.title}</h1>
              {range.logo && (
                <div className="w-24 h-12 relative">
                  <Image src={range.logo} alt="Brand Logo" fill sizes="96px" className="object-contain" />
                </div>
              )}
            </div>
            <div className="prose prose-neutral max-w-none">
              <p className="text-lg text-neutral-600 leading-relaxed whitespace-pre-line">
                {range.description}
              </p>
            </div>
          </div>

          {/* Tech Specs Table */}
          {range.techSpecs && range.techSpecs.length > 0 && (
            <div className="w-full md:w-96 border border-neutral-200">
              <table className="w-full text-sm">
                <tbody>
                  {range.techSpecs.map((spec: any, i: number) => (
                    <tr key={i} className="border-b border-neutral-100 last:border-0">
                      <td className="py-4 px-4 bg-neutral-50 font-bold text-neutral-500 uppercase tracking-widest text-[10px]">
                        {spec.label}
                      </td>
                      <td className="py-4 px-4 text-neutral-800 font-medium">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Colour Range Grid */}
      <section className="bg-neutral-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-neutral-400 mb-2">
              {range.title}
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-neutral-900 uppercase">Colour Range</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {range.swatches?.map((swatch: any, i: number) => (
              <div 
                key={i}
                onClick={() => setSelectedColor(swatch)}
                className="group cursor-pointer bg-white border border-neutral-200 overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-neutral-200">
                  <Image 
                    src={swatch.image} 
                    alt={swatch.name} 
                    fill 
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button className="absolute top-3 left-3 w-8 h-8 bg-green-700/80 rounded-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart size={16} />
                  </button>
                  <div className="absolute top-3 right-3 flex flex-col gap-1">
                    {/* Placeholder for "NEW" or tags */}
                  </div>
                </div>
                <div className="p-4 bg-white text-center">
                  <p className="text-sm font-bold text-neutral-800 tracking-tight">{swatch.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profiles Section */}
      {range.profiles && range.profiles.length > 0 && (
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-neutral-400 mb-2">
              {range.title}
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-neutral-900 uppercase">Profiles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {range.profiles.map((profile: string, i: number) => (
              <div key={i} className="aspect-square relative bg-neutral-50 border border-neutral-100">
                <Image src={profile} alt={`Profile ${i}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw" className="object-contain p-4" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Color Viewer Modal */}
      {selectedColor && (
        <ColorViewer 
          swatch={selectedColor} 
          onClose={() => setSelectedColor(null)} 
        />
      )}
    </div>
  );
}
