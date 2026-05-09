import { getMaterialRanges } from '@/app/actions/materials';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Our Materials',
  description: 'Explore our curated range of decorative panels and architectural materials, designed to bring durability and premium aesthetics to every space.',
};

export default async function MaterialsPage() {
  const ranges = await getMaterialRanges();

  return (
    <div className="bg-cream text-stone-200 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="text-center py-20 md:py-28 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-stone-100 mb-4">
            Material Excellence
          </h1>
          <p className="text-lg md:text-xl text-stone-400 max-w-3xl mx-auto">
            Discover a curated collection of world-class materials. Each range is selected for its superior quality, aesthetic appeal, and innovative design to elevate your projects.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {ranges.map((range: any) => (
            <Link 
              key={range._id} 
              href={`/materials/${range._id}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image 
                  src={range.heroImage || '/images/placeholder.jpg'} 
                  alt={range.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold tracking-widest text-amber-800 uppercase mb-2">
                  {range.category}
                </p>
                <h2 className="text-2xl font-bold text-stone-100 tracking-tight">
                  {range.title}
                </h2>
                <p className="text-stone-400 mt-2 text-sm leading-relaxed h-12 overflow-hidden text-ellipsis">
                    {range.description}
                </p>
                <div className="mt-4 text-sm font-bold text-stone-200 group-hover:text-stone-100 transition-colors flex items-center gap-2">
                  Explore Range 
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
