import { getService, getServices, getProjects } from '@/app/actions/admin';
import { notFound } from 'next/navigation';
import ServiceDetailClient from './ServiceDetailClient';

type ServiceRecord = { _id: string; title: string };
type ProjectRecord = { _id: string; title: string; category?: string; imageUrl?: string; description?: string };

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Data fetching in Server Component
  const service = await getService(id).catch(() => null);
  
  if (!service) {
    notFound();
  }

  const [allServices, allProjects] = await Promise.all([
    getServices(),
    getProjects()
  ]);

  const otherServices = (allServices as ServiceRecord[]).filter((s) => s._id !== service._id).slice(0, 4);
  
  // Filter projects by category matching service title or description
  const relatedProjects = (allProjects as ProjectRecord[]).filter((p) =>
    (p.category ?? '').toLowerCase().includes(service.title.toLowerCase()) ||
    service.title.toLowerCase().includes((p.category ?? '').toLowerCase())
  ).slice(0, 3);

  return (
    <ServiceDetailClient 
      service={service}
      relatedProjects={relatedProjects}
      otherServices={otherServices}
    />
  );
}
