import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Clock3, Compass, MapPin, PencilRuler, ShieldCheck } from "lucide-react";

const highlights = [
  {
    icon: Compass,
    title: "Context-aware design",
    text: "Projects shaped around climate, circulation, and how people actually live.",
  },
  {
    icon: PencilRuler,
    title: "Premium presentation",
    text: "A portfolio layout with the same calm polish as the home page.",
  },
  {
    icon: Building2,
    title: "Broad project range",
    text: "Residential, interiors, and commercial work presented with equal clarity.",
  },
  {
    icon: ShieldCheck,
    title: "Confidence to proceed",
    text: "A cleaner page that makes the work easier to trust and compare.",
  },
];

type ProjectListItem = {
  _id: string;
  title: string;
  category: string;
  location: string;
  imageUrl: string;
  description?: string;
  specifications?: {
    year?: string;
    area?: string;
  };
};

export default function ProjectsPageClient({ projects }: { projects: ProjectListItem[] }) {
  return (
    <main className="projects-page">
      <section className="projects-hero" aria-label="Projects page hero">
        <div className="projects-hero-media">
          <Image
            src="/images/projects-hero.jpg"
            alt="Arusha Home Design project showcase"
            fill
            priority
            sizes="100vw"
            className="projects-hero-image"
          />
          <div className="projects-hero-overlay" />
        </div>

        <div className="market-shell projects-hero-shell">
          <div className="projects-hero-copy">
            <h1>Projects with the same calm confidence as home.</h1>
          </div>
        </div>
      </section>

      <section className="projects-highlights">
        <div className="market-shell projects-highlights-grid">
          {highlights.map((item: any) => (
            <article key={item.title} className="projects-highlight-card">
              <item.icon size={18} />
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-showcase">
        <div className="market-shell">
          <div className="projects-heading-row">
            <div>
              <span className="market-kicker">Portfolio overview</span>
              <h2>Selected projects with a lighter, cleaner visual rhythm.</h2>
              <p>
                The page is intentionally simpler now so the work feels more premium and the color
                story stays controlled from top to bottom.
              </p>
            </div>
            <Link href="/contact" className="market-inline-link">
              Discuss your brief <ArrowRight size={16} />
            </Link>
          </div>

          <div className="projects-grid">
            {projects.length > 0 ? (
              projects.map((project) => (
                <Link
                  key={project._id}
                  href={`/projects/${project._id}`}
                  className="projects-card"
                >
                  <div className="projects-card-image-wrap">
                    <span className="projects-card-badge">{project.category}</span>
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      className="projects-card-image"
                    />
                  </div>
                  <div className="projects-card-body">
                    <div className="projects-card-topline">
                      <span>{project.category}</span>
                      <span>{project.specifications?.year || "Recent"}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description || "Explore the full project brief, gallery, and drawing information."}</p>
                    <div className="projects-card-meta">
                      <span>
                        <MapPin size={15} /> {project.location}
                      </span>
                      <span>
                        <Clock3 size={15} /> {project.specifications?.year || "Recent"}
                      </span>
                      <span>
                        <PencilRuler size={15} /> {project.specifications?.area || "Custom scope"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="projects-empty-state">
                <h3>No projects published yet.</h3>
                <p>Add projects from the admin/CMS and they will appear here automatically.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="projects-closing">
        <div className="market-shell">
          <div className="projects-closing-card">
            <div>
              <span className="market-kicker">Start your project</span>
              <h2>Ready to move from inspiration to a clear design direction?</h2>
              <p>
                Work with Arusha Home Design Pro on a residence, interior transformation, or larger
                development and build with stronger visual clarity from the beginning.
              </p>
            </div>
            <div className="projects-closing-actions">
              <Link href="/contact" className="projects-primary-button">
                Book a consultation <ArrowRight size={16} />
              </Link>
              <Link href="/products" className="market-inline-link">
                Browse house plans <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
