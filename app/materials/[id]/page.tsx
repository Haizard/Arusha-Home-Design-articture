import { getMaterialRange } from '@/app/actions/materials';
import MaterialSeriesClient from './MaterialSeriesClient';
import { notFound } from 'next/navigation';

export default async function MaterialRangePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const range = await getMaterialRange(resolvedParams.id);
  
  if (!range) {
    notFound();
  }

  return <MaterialSeriesClient range={range} />;
}
