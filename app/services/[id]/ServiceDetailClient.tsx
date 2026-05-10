"use client";
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, ChevronRight, Zap, Shield, Search, Sparkles, 
  HelpCircle, ArrowDown, Building2, Sofa, Paintbrush, LayoutDashboard, 
  Box, HardHat, ClipboardList, Hammer, type LucideIcon
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import ContactCTA from '@/components/sections/ContactCTA';

gsap.registerPlugin(ScrollTrigger);

type ServiceStep = { title: string; desc: string };
type ServiceFeature = { icon: string; title: string; desc: string };
type ServiceFaq = { q: string; a: string };
type ServiceProject = { _id: string; title: string; category?: string; imageUrl?: string; description?: string };
type ServiceSummary = { _id: string; title: string; iconName?: string; description?: string };
type ServiceDetail = {
  _id: string;
  serviceId?: string;
  title: string;
  description?: string;
  iconName?: string;
  imageUrl?: string;
  processSteps?: ServiceStep[];
  features_list?: ServiceFeature[];
  faqs?: ServiceFaq[];
};

export default function ServiceDetailClient({
  service,
  relatedProjects,
  otherServices,
}: {
  service: ServiceDetail;
  relatedProjects: ServiceProject[];
  otherServices: ServiceSummary[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const getIcon = (iconName: string) => {
    const icons: Record<string, LucideIcon> = {
        Sofa, Building2, Paintbrush, LayoutDashboard, Box, HardHat, 
        ClipboardList, Hammer, Zap, Shield, Search, Sparkles, HelpCircle 
    };
    return icons[iconName] || Building2;
  };

  // Fallback Data
  const defaultSteps = [
    { title: 'Discovery', desc: 'Detailed site analysis and client vision alignment to understand your unique needs.' },
    { title: 'Concept', desc: 'Creative visualization and architectural brainstorming to bring your vision to life.' },
    { title: 'Technical', desc: 'Precise engineering and structural documentation for a flawless execution.' },
    { title: 'Execution', desc: 'Management and meticulous build supervision ensuring the highest quality.' }
  ];

  const defaultFeatures = [
    { icon: 'Zap', title: 'High Precision', desc: 'Using BIM for millimetre accuracy in planning and construction.' },
    { icon: 'Shield', title: 'Full Compliance', desc: 'Complete handling of all municipal and safety permits across East Africa.' },
    { icon: 'Search', title: 'Material Sourcing', desc: 'Global network for exclusive high-end materials and finishes.' },
    { icon: 'Sparkles', title: 'Smart Integration', desc: 'Cutting-edge home automation and energy-efficient systems.' }
  ];

  const defaultFaqs = [
    { q: "What is the typical timeline?", a: "Depending on scale, design phases take 4-8 weeks, followed by municipal permitting and construction planning." },
    { q: "Do you handle construction too?", a: "We provide full project management and partner with certified contractors to ensure seamless transitions." },
    { q: "Can we visit current projects?", a: "Yes, we arrange private site visits for serious inquiries to showcase our quality standards." }
  ];

  const processSteps: ServiceStep[] = (service.processSteps?.length ?? 0) > 0 ? service.processSteps! : defaultSteps;
  const featuresList: ServiceFeature[] = (service.features_list?.length ?? 0) > 0 ? service.features_list! : defaultFeatures;
  const faqsList: ServiceFaq[] = (service.faqs?.length ?? 0) > 0 ? service.faqs! : defaultFaqs;

  useGSAP(() => {
    // 1. Hero Reveal
    const split = new SplitType('.hero-headline', { types: 'chars' });
    const tl = gsap.timeline();

    tl.from('.hero-bg', { scale: 1.1, duration: 2, ease: 'power2.out' })
      .from(split.chars, { 
        y: 100, 
        opacity: 0, 
        rotateX: -90, 
        stagger: 0.02, 
        duration: 1, 
        ease: 'expo.out' 
      }, 0.5)
      .from('.hero-meta', { opacity: 0, y: 20, duration: 1 }, '-=0.5')
      .from('.hero-cta', { opacity: 0, scale: 0.9, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.3');

    // 2. Parallax Hero
    gsap.to('.hero-bg', {
      y: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // 3. Features Reveal
    gsap.from('.feature-card', {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.features-grid',
        start: 'top 80%'
      }
    });

    // 4. Process Timeline (Pinned)
    const processTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.process-section',
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
      }
    });

    processSteps.forEach((_, i: number) => {
      processTl.to(`.step-${i}`, { opacity: 1, x: 0, duration: 1 })
               .to(`.step-${i} .step-line`, { scaleX: 1, duration: 1 }, '-=0.5');
      if (i < processSteps.length - 1) {
        processTl.to(`.step-${i}`, { opacity: 0.2, duration: 1 });
      }
    });

    // 5. Projects Reveal
    gsap.from('.project-item', {
        clipPath: 'inset(0 100% 0 0)',
        stagger: 0.2,
        duration: 1.5,
        ease: 'power4.inOut',
        scrollTrigger: {
            trigger: '.projects-section',
            start: 'top 70%'
        }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ backgroundColor: '#080808', color: '#fff' }}>
      {/* Navigation */}
      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, 
        padding: '1.5rem 2rem', background: 'rgba(8,8,8,0.2)',
        backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/services" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, opacity: 0.7 }} className="hover:opacity-100 transition-opacity">
            <ArrowLeft size={16} /> All Services
          </Link>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
             Service Excellence / 0{service.serviceId || '1'}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div className="hero-bg" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
           <Image src={service.imageUrl || '/images/services-hero.jpg'} alt={service.title} fill style={{ objectFit: 'cover', filter: 'brightness(0.4)' }} priority />
           <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, rgba(8,8,8,0.8) 100%)' }} />
        </div>
        
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '1000px', padding: '0 2rem' }}>
           <div className="hero-meta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', color: 'var(--color-gold)', marginBottom: '2rem' }}>
              <div style={{ height: '1px', width: '30px', background: 'var(--color-gold)' }} />
              <span style={{ fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Expertise</span>
              <div style={{ height: '1px', width: '30px', background: 'var(--color-gold)' }} />
           </div>
           <h1 className="hero-headline font-display" style={{ fontSize: '7rem', fontWeight: 800, lineHeight: 0.9, marginBottom: '2rem', letterSpacing: '-0.03em' }}>
             {service.title}
           </h1>
           <p className="hero-meta" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
             {service.description}
           </p>
           <div className="hero-cta">
              <Link href="/#contact" className="btn-primary" style={{ padding: '1.5rem 3rem', fontSize: '1rem' }}>
                Start Your Project
              </Link>
           </div>
        </div>

        <div className="hero-meta" style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
           <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
           <ArrowDown size={14} />
        </div>
      </section>

      {/* Advantages Section - Asymmetric Grid */}
      <section style={{ padding: '10rem 4rem', position: 'relative' }}>
         <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', marginBottom: '8rem' }}>
               <div>
                  <h2 className="font-display" style={{ fontSize: '4rem', lineHeight: 1 }}>Superior <br /><em style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Standards</em></h2>
               </div>
               <div style={{ paddingTop: '1.5rem' }}>
                  <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
                     We define the future of architectural excellence in East Africa by merging cultural heritage with global innovation. Our services are tailored to exceed expectations at every scale.
                  </p>
               </div>
            </div>

            <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
               {featuresList.map((f: ServiceFeature, i: number) => {
                 const FIcon = getIcon(f.icon);
                 return (
                  <div key={i} className="feature-card" style={{ 
                    padding: '3rem 2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '2px', backdropFilter: 'blur(10px)', transition: 'all 0.5s'
                  }}>
                     <FIcon size={32} color="var(--color-gold)" style={{ marginBottom: '2rem' }} />
                     <h4 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.2rem' }}>{f.title}</h4>
                     <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                 );
               })}
            </div>
         </div>
      </section>

      {/* Process Section - Immersive Pinned Journey */}
      <section className="process-section" style={{ height: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
         <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 4rem', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8rem' }}>
            <div>
               <div style={{ color: 'var(--color-gold)', fontSize: '12px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '2rem' }}>Our Workflow</div>
               <h2 className="font-display" style={{ fontSize: '5rem', lineHeight: 1, marginBottom: '2rem' }}>The Journey <br /> of Creation</h2>
               <p style={{ color: 'rgba(255,255,255,0.3)', maxWidth: '400px' }}>
                  Watch as we transform your abstract vision into a tangible architectural masterpiece through our proven four-phase methodology.
               </p>
            </div>
            <div style={{ position: 'relative' }}>
               {processSteps.map((step: ServiceStep, i: number) => (
                 <div key={i} className={`step-${i}`} style={{ marginBottom: '4rem', opacity: 0.1, transform: 'translateX(50px)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '1rem' }}>
                       <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-gold)' }}>0{i+1}</span>
                       <div className="step-line" style={{ height: '1px', background: 'var(--color-gold)', width: '60px', transform: 'scaleX(0)', transformOrigin: 'left' }} />
                       <h4 style={{ fontSize: '1.8rem', fontWeight: 600 }}>{step.title}</h4>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', lineHeight: 1.8, paddingLeft: '3.5rem' }}>
                       {step.desc}
                    </p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Portfolio Section - Cinematic Reveal */}
      {relatedProjects.length > 0 && (
        <section className="projects-section" style={{ padding: '12rem 4rem' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6rem' }}>
              <div>
                <h2 className="font-display" style={{ fontSize: '4.5rem' }}>Proof of <br /> <em style={{ color: 'var(--color-gold)' }}>Craftsmanship</em></h2>
              </div>
              <Link href="/projects" className="btn-arrow" style={{ fontSize: '14px' }}>
                VIEW ALL PROJECTS
              </Link>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
               {relatedProjects.map((project: ServiceProject) => (
                 <Link key={project._id} href={`/projects/${project._id}`} className="project-item" style={{ position: 'relative', height: '600px', overflow: 'hidden' }}>
                    <Image src={project.imageUrl || '/images/projects-hero.jpg'} alt={project.title} fill style={{ objectFit: 'cover' }} className="project-img-inner transition-transform duration-700" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.9), transparent)' }} />
                    <div style={{ position: 'absolute', bottom: '3rem', left: '3rem', right: '3rem' }}>
                       <span style={{ color: 'var(--color-gold)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{project.category}</span>
                       <h4 style={{ fontSize: '1.8rem', fontWeight: 600, marginTop: '1rem' }}>{project.title}</h4>
                    </div>
                 </Link>
               ))}
            </div>
          </div>
        </section>
      )}

      {/* Inquiries Section - Sleek Accordions */}
      <section style={{ padding: '8rem 4rem', background: '#0a0a0a' }}>
         <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
               <h2 className="font-display" style={{ fontSize: '3.5rem' }}>Clarity in <br /><em style={{ color: 'var(--color-gold)' }}>Collaboration</em></h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
               {faqsList.map((faq: ServiceFaq, i: number) => (
                 <details key={i} className="faq-details" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem' }}>
                    <summary style={{ listStyle: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <h4 style={{ fontSize: '1.4rem', fontWeight: 500 }}>{faq.q}</h4>
                       <ChevronRight className="chevron transition-transform duration-300" size={20} color="var(--color-gold)" />
                    </summary>
                    <p style={{ marginTop: '1.5rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                       {faq.a}
                    </p>
                 </details>
               ))}
            </div>
         </div>
      </section>

      {/* Explore More */}
      <section style={{ padding: '8rem 4rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
         <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '4rem', opacity: 0.3, letterSpacing: '0.3em', textTransform: 'uppercase' }}>Other Specializations</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
               {otherServices.map((s: ServiceSummary) => {
                 const SIcon = getIcon(s.iconName || 'Building2');
                 return (
                  <Link key={s._id} href={`/services/${s._id}`} className="other-service-card" style={{ 
                    padding: '3rem', background: '#111', textDecoration: 'none',
                    display: 'flex', flexDirection: 'column', height: '100%',
                    transition: 'all 0.4s', border: '1px solid transparent'
                  }}>
                     <SIcon size={24} color="var(--color-gold)" style={{ marginBottom: '2rem' }} />
                     <h4 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600 }}>{s.title}</h4>
                     <ChevronRight size={16} color="var(--color-gold)" style={{ marginTop: 'auto', opacity: 0 }} className="arrow-show" />
                  </Link>
                 );
               })}
            </div>
         </div>
      </section>

      <ContactCTA />

      <style>{`
        .feature-card:hover { 
          background: rgba(255,255,255,0.05) !important; 
          border-color: var(--color-gold) !important;
          transform: translateY(-10px);
        }
        .project-item:hover .project-img-inner { transform: scale(1.1); }
        .faq-details[open] .chevron { transform: rotate(90deg); }
        .other-service-card:hover {
          background: #161616 !important;
          border-color: rgba(201,168,76,0.2) !important;
        }
        .other-service-card:hover .arrow-show {
          opacity: 1 !important;
          transform: translateX(10px);
        }
        .font-display { font-family: var(--font-display); }
      `}</style>
    </div>
  );
}
