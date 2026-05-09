import { getMaterialRanges } from '@/app/actions/materials';
import Link from 'next/link';
import Image from 'next/image';

export default async function MaterialsPage() {
  const ranges = await getMaterialRanges();

  // Group ranges by category
  const categories = ranges.reduce((acc: any, range: any) => {
    if (!acc[range.category]) acc[range.category] = [];
    acc[range.category].push(range);
    return acc;
  }, {});

  return (
    <div className="bg-white min-h-screen">
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-6xl font-bold tracking-tighter text-neutral-900 mb-4">Our Products</h1>
          <p className="text-lg text-neutral-500 max-w-2xl">
            Explore our curated range of decorative panels and architectural materials, 
            designed to bring durability and premium aesthetics to every space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {ranges.map((range: any) => (
            <Link 
              key={range._id} 
              href={`/materials/${range._id}`}
              className="group relative aspect-[1.5/1] overflow-hidden bg-neutral-100"
            >
              <Image 
                src={range.heroImage || '/images/placeholder.jpg'} 
                alt={range.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/70 mb-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {range.category}
                </span>
                <h2 className="text-3xl font-bold text-white tracking-tight uppercase">
                  {range.title}
                </h2>
                <div className="mt-4 h-[2px] w-0 bg-white group-hover:w-24 transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
