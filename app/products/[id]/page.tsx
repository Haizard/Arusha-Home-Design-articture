import { getProduct, getProducts } from '@/app/actions/admin';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, ShoppingBag, ArrowRight, Bed, Bath, 
  Maximize, Layers, Car, CheckCircle2, ShieldCheck,
  FileText, PenTool, Layout as LayoutIcon, Camera
} from 'lucide-react';
import { notFound } from 'next/navigation';
import ContactCTA from '@/components/sections/ContactCTA';
import ProductGallery from '../../../components/ui/ProductGallery';
import InquireButton from '../../../components/ui/InquireButton';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id).catch(() => null);
  
  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const otherProducts = allProducts.filter((p: any) => p._id !== product._id).slice(0, 4);

  // Combine main image with gallery
  const allImages = [product.imageUrl, ...(product.images || [])].filter(Boolean);

  const specItem = (Icon: any, label: string, value: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        <Icon size={14} color="var(--color-gold)" /> {label}
      </div>
      <div style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>
        {value !== undefined && value !== null ? value : '—'}
      </div>
    </div>
  );

  return (
    <main style={{ backgroundColor: '#080808', color: '#fff', minHeight: '100vh', paddingBottom: '0' }}>
      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, 
        padding: '1.5rem 2rem', background: 'rgba(8,8,8,0.7)',
        backdropFilter: 'blur(12px)', display: 'flex', justifyContent: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ maxWidth: '1400px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/products" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500 }}>
            <ArrowLeft size={16} /> Back to Catalog
          </Link>
          <div style={{ fontWeight: 700, letterSpacing: '0.2em', fontSize: '12px', color: 'var(--color-gold)', textTransform: 'uppercase' }}>
            Product Specification
          </div>
          <div style={{ width: '100px', display: 'flex', justifyContent: 'flex-end' }}>
             <ShoppingBag size={18} color="rgba(255,255,255,0.4)" />
          </div>
        </div>
      </nav>

      <section style={{ padding: '8rem 2rem 6rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '4rem', alignItems: 'start' }}>
          
          {/* Main Content Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            {/* Gallery Wrapper */}
            <div style={{ borderRadius: '24px', overflow: 'hidden', background: '#0c0c0c', border: '1px solid rgba(255,255,255,0.05)' }}>
               <ProductGallery images={allImages} />
            </div>

            {/* Title & Stats */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <span style={{ 
                  padding: '4px 12px', borderRadius: '4px', background: 'rgba(201,168,76,0.1)', 
                  color: 'var(--color-gold)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' 
                }}>{product.category}</span>
                {product.planId && <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', fontWeight: 500 }}>ID: {product.planId}</span>}
              </div>
              <h1 className="font-display" style={{ fontSize: '4.5rem', fontWeight: 700, marginBottom: '2rem', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                {product.title}
              </h1>

              {/* Specification Ribbon */}
              <div style={{ 
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem',
                padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)', marginBottom: '3rem'
              }}>
                {specItem(Bed, 'Bedrooms', product.bedrooms)}
                {specItem(Bath, 'Bathrooms', product.bathrooms)}
                {specItem(Maximize, 'Total Area', product.area || 'TBD')}
                {specItem(Layers, 'Stories', product.stories)}
              </div>

              {/* Description */}
              <div style={{ marginBottom: '4rem' }}>
                <h3 className="font-display" style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-gold)' }}>Architectural Vision</h3>
                <div style={{ fontSize: '18px', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>
                  {product.description}
                </div>
              </div>

              {/* Features Grid */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="font-display" style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Design Highlights</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {product.features.map((feat: string, i: number) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                        <CheckCircle2 size={16} color="var(--color-gold)" />
                        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside style={{ position: 'sticky', top: '8rem' }}>
            <div style={{ 
              padding: '2.5rem', background: '#0c0c0e', borderRadius: '24px', 
              border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 100px rgba(0,0,0,0.5)' 
            }}>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '8px' }}>Starting Investment</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '3rem', fontWeight: 800 }}>${product.basePrice || '—'}</span>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>USD</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <InquireButton project={product} />
                  <button style={{ 
                    width: '100%', padding: '1.25rem', background: 'transparent', 
                    border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '12px',
                    fontSize: '14px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
                  }}>
                    Download Brochures
                  </button>
                </div>

                {/* Trust Badges */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                   <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                      <ShieldCheck size={18} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600 }}>Professional Design Set</div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Ready-to-build architectural and structural drawings.</div>
                      </div>
                   </div>
                   <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                      <PenTool size={18} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600 }}>Customizable Layout</div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Our architects can adjust the plans to fit your land.</div>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* What's Included Card */}
            <div style={{ 
              marginTop: '1.5rem', padding: '1.5rem', background: 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, rgba(201,168,76,0) 100%)', 
              borderRadius: '20px', border: '1px solid rgba(201,168,76,0.1)' 
            }}>
               <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <FileText size={14} /> What&apos;s Included
               </h4>
               <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                 {['Floor Plans', 'Elevations', 'Sections', 'Roof plan', 'Window/Door Schedule'].map((item, i) => (
                   <li key={i} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-gold)' }} />
                     {item}
                   </li>
                 ))}
               </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Dimensional Details Section (Maramani Style) */}
      <section style={{ padding: '6rem 2rem', background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="font-display" style={{ fontSize: '3rem', fontWeight: 700 }}>Technical <em style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Blueprint</em></h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '1rem' }}>Precise measurements for site planning and construction.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            <div style={{ padding: '2rem', background: '#0e0e0e', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.02)' }}>
               <LayoutIcon size={24} color="var(--color-gold)" style={{ marginBottom: '1.5rem' }} />
               <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>Footprint</div>
               <div style={{ fontSize: '20px', fontWeight: 600 }}>{product.dimensions || 'Contact for info'}</div>
            </div>
            <div style={{ padding: '2rem', background: '#0e0e0e', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.02)' }}>
               <Car size={24} color="var(--color-gold)" style={{ marginBottom: '1.5rem' }} />
               <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>Garage</div>
               <div style={{ fontSize: '20px', fontWeight: 600 }}>{product.garage ? `${product.garage} Car Spaces` : 'N/A'}</div>
            </div>
            <div style={{ padding: '2rem', background: '#0e0e0e', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.02)' }}>
               <Camera size={24} color="var(--color-gold)" style={{ marginBottom: '1.5rem' }} />
               <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>Renderings</div>
               <div style={{ fontSize: '20px', fontWeight: 600 }}>{allImages.length} High-Res Views</div>
            </div>
            <div style={{ padding: '2rem', background: '#0e0e0e', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.02)' }}>
               <ShieldCheck size={24} color="var(--color-gold)" style={{ marginBottom: '1.5rem' }} />
               <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>Status</div>
               <div style={{ fontSize: '20px', fontWeight: 600 }}>Design Complete</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section style={{ padding: '6rem 2rem', background: '#070707', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
         <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
              <div>
                <h2 className="font-display" style={{ fontSize: '2.5rem' }}>Similar <em style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Designs</em></h2>
                <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}>Exploration based on your current selection.</p>
              </div>
              <Link href="/products" style={{ color: 'var(--color-gold)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600 }}>
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
               {otherProducts.map((p: any) => (
                  <Link key={p._id} href={`/products/${p._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }} className="product-item-link">
                     <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.25rem', background: '#111', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <Image src={p.imageUrl} alt={p.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 50vw, 25vw" />
                     </div>
                     <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>{p.title}</h4>
                     <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.category}</p>
                  </Link>
               ))}
            </div>
         </div>
      </section>

      <ContactCTA />

      <style>{`
        .product-item-link img { transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .product-item-link:hover img { transform: scale(1.08); }
        .product-item-link:hover h4 { color: var(--color-gold); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(201, 168, 76, 0.2); }
      `}</style>
    </main>
  );
}

