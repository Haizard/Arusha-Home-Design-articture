import { getProject } from '@/app/actions/admin';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Building2, MapPin, Ruler, Share2, Users } from 'lucide-react';
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

  const currentId = project._id;
  const displayGallery = project.gallery?.length ? project.gallery : [project.imageUrl];
  const specs = project.specifications || {
    year: '2023',
    area: '450 sqm',
    team: ['Arusha Design Studio'],
    client: 'Confidential',
    materials: ['Glass', 'Stone', 'Steel'],
  };
  const blueprints = project.blueprints || [];
  const featureList =
    project.features && project.features.length > 0
      ? project.features
      : ['Architectural Drawings', 'Structural Calculations', 'Electrical & Plumbing Layouts', 'Bills of Quantities (BOQ)'];

  const drawingGroups = [
    {
      title: 'Rooms Included',
      items:
        project.drawingSets?.rooms?.length > 0
          ? project.drawingSets.rooms
          : ['Master Bedroom', 'Kitchen', 'Living Room', 'WC', 'Balcony', 'Store Room'],
    },
    {
      title: 'Architectural',
      items:
        project.drawingSets?.architectural?.length > 0
          ? project.drawingSets.architectural
          : ['Foundation Plan', 'Floor Plan', 'Roof Plan', 'Sections', 'Elevations'],
    },
    {
      title: 'Structural',
      items:
        project.drawingSets?.structural?.length > 0
          ? project.drawingSets.structural
          : ['Calculations', 'Beam Layout', 'Column Details', 'Slab Details'],
    },
    {
      title: 'Mechanical',
      items:
        project.drawingSets?.mechanical?.length > 0
          ? project.drawingSets.mechanical
          : ['Water Supply', 'Drainage Plan', 'Septic Tank', 'Electrical Layout'],
    },
  ];

  const specItems = [
    { icon: Building2, label: 'Category', value: project.category || 'Project' },
    { icon: Users, label: 'Team', value: specs.team?.[0] || 'Arusha Design Studio' },
    { icon: Ruler, label: 'Total Area', value: specs.area || 'Custom scope' },
    { icon: MapPin, label: 'Location', value: project.location || 'Project location' },
  ];

  return (
    <main className="project-detail-page">
      <nav className="project-detail-nav">
        <div className="project-detail-shell project-detail-nav-inner">
          <Link href="/projects" className="project-detail-back">
            <ArrowLeft size={14} /> Back to Projects
          </Link>
          <button type="button" className="project-detail-share">
            <Share2 size={13} /> Share
          </button>
        </div>
      </nav>

      <section className="project-detail-shell project-detail-hero">
        <div className="project-detail-heading">
          <div>
            <span className="project-detail-kicker">{project.category}</span>
            <h1 className="font-display">{project.title}</h1>
            <p>
              {project.description ||
                'A thoughtful project shaped around clarity, natural light, and a premium spatial rhythm from entry to finish.'}
            </p>
          </div>
          <div className="project-detail-id-card">
            <span>Project ID</span>
            <strong>{id.slice(-5).toUpperCase()}</strong>
          </div>
        </div>

        <div className="project-detail-grid">
          <div className="project-detail-main">
            <ProjectGallery images={displayGallery} />

            <div className="project-detail-spec-ribbon">
              {specItems.map((item: any) => (
                <div key={item.label} className="project-detail-spec-tile">
                  <item.icon size={18} />
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>

            <section className="project-detail-copy">
              <h2 className="font-display">Project Description</h2>
              <p>
                {project.description ||
                  'A beautiful block with residential units spread over multiple floors. Designed to allow each space to have a direct view and natural light. Open kitchens and living rooms characterize a typical unit in this development.'}
              </p>
            </section>

            <section className="project-detail-drawings">
              <div className="project-detail-section-head">
                <span className="project-detail-kicker">Included sets</span>
                <h2 className="font-display">Drawing Sets and rooms included</h2>
              </div>
              <div className="project-detail-drawing-grid">
                {drawingGroups.map((group) => (
                  <div key={group.title} className="project-detail-drawing-card">
                    <h3>{group.title}</h3>
                    <ul>
                      {group.items.map((item: string) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="project-detail-sidebar">
            <div className="project-detail-sidebar-card">
              <div className="project-detail-cost">
                <span>Estimated construction cost</span>
                <strong>{project.constructionCost || '$1,152,094'}</strong>
              </div>

              <div className="project-detail-feature-list">
                {featureList.map((item: string) => (
                  <div key={item} className="project-detail-feature-item">
                    <span className="project-detail-feature-check" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <InquireButton project={{ _id: currentId, title: project.title }} />

              <div className="project-detail-lead">
                <div className="project-detail-lead-avatar" />
                <div>
                  <strong>Lead Architect</strong>
                  <p>{specs.team?.[0] || 'Arusha Design Studio'}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {blueprints.length > 0 ? (
        <section className="project-detail-shell project-detail-blueprints">
          <div className="project-detail-section-head">
            <span className="project-detail-kicker">Project schematics</span>
            <h2 className="font-display">Reference drawings</h2>
          </div>
          <div className="project-detail-blueprint-grid">
            {blueprints.map((bp: string, index: number) => (
              <div key={bp + index} className="project-detail-blueprint-card">
                <Image src={bp} alt={`Blueprint ${index + 1}`} width={1200} height={800} className="project-detail-blueprint-image" />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <ContactCTA />

      <style>{`
        .project-detail-page {
          min-height: 100vh;
          background: #f7f4ee;
          color: #111111;
        }

        .project-detail-shell {
          width: min(1400px, calc(100vw - clamp(1.5rem, 6vw, 4rem)));
          margin: 0 auto;
        }

        .project-detail-nav {
          position: sticky;
          top: 0;
          z-index: 60;
          backdrop-filter: blur(18px);
          background: rgba(255, 255, 255, 0.92);
          border-bottom: 1px solid rgba(17, 17, 17, 0.08);
        }

        .project-detail-nav-inner {
          min-height: 5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .project-detail-back,
        .project-detail-share {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          border: none;
          background: transparent;
          color: #111111;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .project-detail-hero {
          padding: clamp(2rem, 5vw, 4rem) 0 clamp(3rem, 6vw, 5rem);
        }

        .project-detail-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 2.2rem;
        }

        .project-detail-kicker {
          display: inline-flex;
          align-items: center;
          min-height: 2rem;
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid rgba(207, 171, 79, 0.22);
          color: #8d6d1d;
          font-size: 0.74rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .project-detail-heading h1 {
          margin-top: 1rem;
          font-size: clamp(2.3rem, 5vw, 4.4rem);
          line-height: 0.98;
          letter-spacing: -0.05em;
          color: #111111;
        }

        .project-detail-heading p {
          max-width: 46rem;
          margin-top: 1rem;
          color: rgba(17, 17, 17, 0.65);
          line-height: 1.8;
          font-size: 1.02rem;
        }

        .project-detail-id-card {
          flex-shrink: 0;
          min-width: 11rem;
          padding: 1rem 1.1rem;
          border-radius: 1.2rem;
          background: linear-gradient(180deg, #ffffff 0%, #faf7f2 100%);
          border: 1px solid rgba(17, 17, 17, 0.08);
          box-shadow: 0 18px 42px rgba(17, 17, 17, 0.06);
        }

        .project-detail-id-card span {
          display: block;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: rgba(17, 17, 17, 0.5);
        }

        .project-detail-id-card strong {
          display: block;
          margin-top: 0.4rem;
          font-size: 1.35rem;
          color: #111111;
        }

        .project-detail-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 23rem;
          gap: 2rem;
          align-items: start;
        }

        .project-detail-spec-ribbon {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1rem;
          margin-top: 1.2rem;
          padding: 1rem;
          border-radius: 1.5rem;
          background: linear-gradient(180deg, #ffffff 0%, #faf7f2 100%);
          border: 1px solid rgba(17, 17, 17, 0.07);
          box-shadow: 0 20px 45px rgba(17, 17, 17, 0.06);
        }

        .project-detail-spec-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.45rem;
          text-align: center;
          padding: 0.9rem 0.7rem;
          border-radius: 1.1rem;
          background: rgba(247, 244, 238, 0.75);
        }

        .project-detail-spec-tile svg {
          color: #8d6d1d;
        }

        .project-detail-spec-tile span {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(17, 17, 17, 0.5);
        }

        .project-detail-spec-tile strong {
          font-size: 0.92rem;
          color: #111111;
        }

        .project-detail-copy,
        .project-detail-drawings {
          margin-top: 2.2rem;
          padding: 1.7rem;
          border-radius: 1.5rem;
          background: linear-gradient(180deg, #ffffff 0%, #faf7f2 100%);
          border: 1px solid rgba(17, 17, 17, 0.06);
          box-shadow: 0 18px 42px rgba(17, 17, 17, 0.05);
        }

        .project-detail-copy h2,
        .project-detail-section-head h2 {
          font-size: clamp(1.8rem, 4vw, 3rem);
          line-height: 1;
          letter-spacing: -0.05em;
          color: #111111;
        }

        .project-detail-copy p {
          margin-top: 1rem;
          color: rgba(17, 17, 17, 0.68);
          line-height: 1.9;
          font-size: 1rem;
        }

        .project-detail-section-head {
          margin-bottom: 1.4rem;
        }

        .project-detail-drawing-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }

        .project-detail-drawing-card {
          padding: 1.2rem;
          border-radius: 1.2rem;
          background: #ffffff;
          border: 1px solid rgba(17, 17, 17, 0.06);
        }

        .project-detail-drawing-card h3 {
          margin-bottom: 0.85rem;
          font-size: 0.9rem;
          color: #8d6d1d;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .project-detail-drawing-card ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          padding: 0;
          margin: 0;
        }

        .project-detail-drawing-card li {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          color: rgba(17, 17, 17, 0.72);
          line-height: 1.5;
        }

        .project-detail-drawing-card li::before {
          content: "•";
          color: #cfab4f;
          font-weight: 900;
        }

        .project-detail-sidebar {
          position: sticky;
          top: 6.5rem;
        }

        .project-detail-sidebar-card {
          padding: 1.6rem;
          border-radius: 1.5rem;
          background: linear-gradient(180deg, #ffffff 0%, #faf7f2 100%);
          border: 1px solid rgba(17, 17, 17, 0.07);
          box-shadow: 0 20px 46px rgba(17, 17, 17, 0.06);
        }

        .project-detail-cost span {
          display: block;
          color: rgba(17, 17, 17, 0.52);
          font-size: 0.76rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.14em;
        }

        .project-detail-cost strong {
          display: block;
          margin-top: 0.55rem;
          font-size: 2.1rem;
          line-height: 1;
          color: #111111;
          letter-spacing: -0.04em;
        }

        .project-detail-feature-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          margin: 1.5rem 0 1.8rem;
        }

        .project-detail-feature-item {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          color: rgba(17, 17, 17, 0.76);
          font-size: 0.95rem;
        }

        .project-detail-feature-check {
          width: 0.9rem;
          height: 0.9rem;
          border-radius: 0.25rem;
          background: #cfab4f;
          flex-shrink: 0;
        }

        .project-detail-lead {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-top: 1.6rem;
          padding-top: 1.4rem;
          border-top: 1px solid rgba(17, 17, 17, 0.08);
        }

        .project-detail-lead-avatar {
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 999px;
          background: linear-gradient(180deg, #ece7df 0%, #ddd5c7 100%);
        }

        .project-detail-lead p {
          margin: 0.2rem 0 0;
          color: rgba(17, 17, 17, 0.55);
          font-size: 0.9rem;
        }

        .project-detail-blueprints {
          padding: 0 0 5rem;
        }

        .project-detail-blueprint-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.25rem;
        }

        .project-detail-blueprint-card {
          padding: 1.2rem;
          border-radius: 1.5rem;
          background: linear-gradient(180deg, #ffffff 0%, #faf7f2 100%);
          border: 1px solid rgba(17, 17, 17, 0.07);
          box-shadow: 0 18px 42px rgba(17, 17, 17, 0.05);
        }

        .project-detail-blueprint-image {
          width: 100%;
          height: auto;
          border-radius: 1rem;
          object-fit: contain;
          background: #ffffff;
        }

        @media (max-width: 1100px) {
          .project-detail-grid {
            grid-template-columns: 1fr;
          }

          .project-detail-sidebar {
            position: static;
          }
        }

        @media (max-width: 900px) {
          .project-detail-heading,
          .project-detail-spec-ribbon,
          .project-detail-blueprint-grid,
          .project-detail-drawing-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .project-detail-heading {
            display: grid;
          }
        }

        @media (max-width: 640px) {
          .project-detail-shell {
            width: min(1400px, calc(100vw - 1rem));
          }

          .project-detail-nav-inner {
            min-height: 4.3rem;
          }

          .project-detail-heading,
          .project-detail-spec-ribbon,
          .project-detail-blueprint-grid,
          .project-detail-drawing-grid {
            grid-template-columns: 1fr;
          }

          .project-detail-copy,
          .project-detail-drawings,
          .project-detail-sidebar-card,
          .project-detail-blueprint-card {
            padding: 1.1rem;
            border-radius: 1.15rem;
          }

          .project-detail-cost strong {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </main>
  );
}
