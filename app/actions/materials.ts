'use server';

import connectDB from '@/lib/mongodb';
import MaterialRange from '@/models/MaterialRange';
import { revalidatePath } from 'next/cache';
import { getFallbackMaterialRange, getFallbackMaterialRanges, normalizeMaterialRangeAssets } from '@/lib/materialFallbacks';
import { withTimeout } from '@/lib/withTimeout';
import mongoose from 'mongoose';

type MaterialRangePayload = Record<string, unknown>;
const READ_TIMEOUT_MS = 1500;

async function getMaterialRangesFromDb() {
  await connectDB({ quiet: true });
  const ranges = await MaterialRange.find({}).sort({ createdAt: -1 }).lean();
  return (JSON.parse(JSON.stringify(ranges)) as ReturnType<typeof getFallbackMaterialRanges>).map(normalizeMaterialRangeAssets);
}

export async function getMaterialRanges() {
  return withTimeout(
    getMaterialRangesFromDb().catch(() => getFallbackMaterialRanges()),
    READ_TIMEOUT_MS,
    getFallbackMaterialRanges()
  );
}

export async function getMaterialRange(id: string) {
  return withTimeout(
    (async () => {
      await connectDB({ quiet: true });
      const query = mongoose.Types.ObjectId.isValid(id)
        ? MaterialRange.findById(id)
        : MaterialRange.findOne({ title: new RegExp(`^${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') });
      const range = await query.lean();
      return range ? normalizeMaterialRangeAssets(JSON.parse(JSON.stringify(range))) : getFallbackMaterialRange(id);
    })().catch(() => getFallbackMaterialRange(id)),
    READ_TIMEOUT_MS,
    getFallbackMaterialRange(id)
  );
}

export async function addMaterialRange(formData: MaterialRangePayload) {
  await connectDB();
  const range = await MaterialRange.create(formData);
  revalidatePath('/');
  revalidatePath('/materials');
  revalidatePath('/admin/materials');
  return JSON.parse(JSON.stringify(range));
}

export async function updateMaterialRange(id: string, formData: MaterialRangePayload) {
  await connectDB();
  const range = await MaterialRange.findByIdAndUpdate(id, { $set: formData }, { new: true });
  revalidatePath('/');
  revalidatePath('/materials');
  revalidatePath(`/materials/${id}`);
  revalidatePath('/admin/materials');
  return JSON.parse(JSON.stringify(range));
}

export async function deleteMaterialRange(id: string) {
  await connectDB();
  await MaterialRange.findByIdAndDelete(id);
  revalidatePath('/');
  revalidatePath('/materials');
  revalidatePath('/admin/materials');
}
