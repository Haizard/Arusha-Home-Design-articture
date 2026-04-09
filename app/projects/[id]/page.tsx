import { getProject, getProjects } from '@/app/actions/admin';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, Calendar, ChevronRight, Ruler, Users, Building2, Layers, Share2, Download } from 'lucide-react';
import { notFound } from 'next/navigation';
import ContactCTA from '@/components/sections/ContactCTA';
import ProjectGallery from '@/components/ui/ProjectGallery';
import InquireButton from '@/components/ui/InquireButton';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id).catch(() => null);
  
  if (!project) {
    notFound();
  }

  // Get other projects for recommendation
  const allProjects = await getProjects();
  const otherProjects = allProjects.filter((p: any) => p._id !== project._id).slice(0, 3);

  // Use actual gallery or fallback
  const displayGallery = project.gallery?.length > 0 ? project.gallery : [project.imageUrl];

  const specs = project.specifications || {
    year: "2023",
    area: "450 sqm",
    team: ["Arusha Design Studio"],
    client: "Confidential",
    materials: ["Glass", "Stone", "Steel"]
  };

  const blueprints = project.blueprints || [];

  return (
    <main style={{ backgroundColor: '#080808', color: '#fff', minHeight: '100vh', fontFamily: 'var(--font-ui)' }}>
      {/* Navigation */}
      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, 
        padding: '1.5rem 2rem', background: '#000',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/projects" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
             <button style={{ background: 'none', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <Share2 size={13} /> Share
             </button>
          </div>
        </div>
      </nav>

      <section style={{ padding: '8rem 2rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Top Header Section */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-gold)', fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            <span style={{ width: '30px', height: '1px', background: 'currentColor' }}></span>
            {project.category}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, lineHeight: 1.1, flex: '1', minWidth: '300px' }}>
              {project.title}
            </h1>
            <div style={{ padding: '1rem 2rem', background: 'var(--color-gold)', color: '#000', borderRadius: '4px', fontWeight: 700, fontSize: '1.2rem' }}>
               ID: {id.slice(-5).toUpperCase()}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '4rem' }}>
          
          {/* Left Column: Gallery & Vision */}
          <div>
             {/* THE MARAMANI STYLE GALLERY */}
             <ProjectGallery images={displayGallery} />

             {/* Specification Ribbon (Below Gallery like Screenshot) */}
             <div style={{ 
               display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', 
               background: '#111', padding: '2rem', marginTop: '1.5rem', 
               borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)'
             }}>
                {[
                  { icon: Building2, label: 'Floors', value: '8 Floors' },
                  { icon: Users, label: 'Units', value: '12 Apartments' },
                  { icon: Ruler, label: 'Total Area', value: specs.area },
                  { icon: MapPin, label: 'Location', value: project.location.split(',')[0] }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', borderRight: idx < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                    <item.icon size={20} color="var(--color-gold)" />
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.5 }}>{item.label}</span>
                    <strong style={{ fontSize: '13px' }}>{item.value}</strong>
                  </div>
                ))}
             </div>

             <div style={{ marginTop: '5rem' }}>
                <h2 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '1.8rem', color: 'var(--color-gold)' }}>Project Description</h2>
                <div style={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
                  {project.description || "A beautiful block with residential units spread over multiple floors. Designed to allow each space to have a direct view and natural light. Open kitchens and living rooms characterize a typical unit in this development."}
                </div>
             </div>
          </div>

          {/* Right Column: Pricing & Quick Stats (Inspired by Sidebar) */}
          <aside>
             <div style={{ background: '#fff', color: '#000', padding: '2.5rem', borderRadius: '8px', position: 'sticky', top: '120px' }}>
                <div style={{ marginBottom: '2rem' }}>
                   <div style={{ fontSize: '12px', opacity: 0.6, marginBottom: '0.5rem' }}>Estimate Construction Cost</div>
                   <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>
                     {project.constructionCost || "$1,152,094"}
                   </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                   {(project.features && project.features.length > 0 ? project.features : [
                     "Architectural Drawings",
                     "Structural Calculations",
                     "Electrical & Plumbing Layouts",
                     "Bills of Quantities (BOQ)"
                   ]).map((item: string, i: number) => (
                     <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                       <div style={{ width: '16px', height: '16px', border: '1px solid #ddd', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <div style={{ width: '8px', height: '8px', background: 'var(--color-gold)', borderRadius: '1px' }}></div>
                       </div>
                       {item}
                     </div>
                   ))}
                </div>

                 <InquireButton project={{ _id: project._id, title: project.title }} />
                
                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee' }}></div>
                      <div>
                        <strong>Lead Architect</strong>
                        <div style={{ fontSize: '12px', opacity: 0.6 }}>Arusha Design Studio</div>
                      </div>
                   </div>
                </div>
             </div>
          </aside>
        </div>

        {/* Drawing Sets Section (The grid of checklists from your image) */}
        <div style={{ marginTop: '8rem', padding: '6rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
           <h2 className="font-display" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>Drawing Sets & <em style={{ color: 'var(--color-gold)' }}>Rooms Included</em></h2>
           
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
              {[
                { title: 'Rooms Included', items: project.drawingSets?.rooms?.length > 0 ? project.drawingSets.rooms : ['Master Bedroom', 'Kitchen', 'Living Room', 'WC', 'Balcony', 'Store Room'] },
                { title: 'Architectural', items: project.drawingSets?.architectural?.length > 0 ? project.drawingSets.architectural : ['Foundation Plan', 'Floor Plan', 'Roof Plan', 'Sections', 'Elevations'] },
                { title: 'Structural', items: project.drawingSets?.structural?.length > 0 ? project.drawingSets.structural : ['Calculations', 'Beam Layout', 'Column Details', 'Slab Details'] },
                { title: 'Mechanical', items: project.drawingSets?.mechanical?.length > 0 ? project.drawingSets.mechanical : ['Water Supply', 'Drainage Plan', 'Septic Tank', 'Electrical Layout'] }
              ].map((group, idx) => (
                <div key={idx} style={{ padding: '3rem 2rem', background: '#080808' }}>
                   <h4 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.5rem' }}>{group.title}</h4>
                   <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {group.items.map((it: string, i: number) => (
                        <li key={i} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', display: 'flex', gap: '8px' }}>
                          <span style={{ color: 'var(--color-gold)' }}>✓</span> {it}
                        </li>
                      ))}
                   </ul>
                </div>
              ))}
           </div>
        </div>

      </section>

      {/* Blueprints Grid (Visual) */}
      <section style={{ padding: '4rem 2rem 8rem', maxWidth: '1400px', margin: '0 auto' }}>
        <h3 className="font-ui" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '3rem', opacity: 0.4 }}>Project Schematics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
          {blueprints.map((bp: string, i: number) => (
             <div key={i} style={{ background: '#111', borderRadius: '8px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Image src={bp} alt={`Blueprint ${i}`} width={800} height={500} style={{ width: '100%', height: 'auto', opacity: 0.5, filter: 'invert(1)' }} />
             </div>
          ))}
        </div>
      </section>

      <ContactCTA />

      <style>{`
        .spec-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1.5rem;
          background: #0d0d0d;
          transition: background 0.3s;
        }
        .spec-tile:hover {
          background: #151515;
        }
        .spec-tile span {
          font-size: 10px;
          text-transform: uppercase;
          opacity: 0.5;
        }
        .icon-btn-gold {
          background: rgba(201,168,76,0.1);
          color: var(--color-gold);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .download-btn {
           background: #161616;
           border: 1px solid rgba(255,255,255,0.05);
           color: #fff;
           padding: 1rem 1.5rem;
           border-radius: 6px;
           display: flex;
           align-items: center;
           gap: 12px;
           width: 100%;
           cursor: pointer;
           transition: all 0.3s;
           font-size: 13px;
        }
        .download-btn:hover {
           background: var(--color-gold);
           color: #000;
        }
      `}</style>
    </main>
  );
}
