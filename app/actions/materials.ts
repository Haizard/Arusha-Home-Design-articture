'use server';

import connectDB from '@/lib/mongodb';
import MaterialRange from '@/models/MaterialRange';
import { revalidatePath } from 'next/cache';

export async function getMaterialRanges() {
  await connectDB();
  const ranges = await MaterialRange.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(ranges));
}

export async function getMaterialRange(id: string) {
  await connectDB();
  const range = await MaterialRange.findById(id).lean();
  return JSON.parse(JSON.stringify(range));
}

export async function addMaterialRange(formData: any) {
  await connectDB();
  const range = await MaterialRange.create(formData);
  revalidatePath('/materials');
  revalidatePath('/admin/materials');
  return JSON.parse(JSON.stringify(range));
}

export async function updateMaterialRange(id: string, formData: any) {
  await connectDB();
  const range = await MaterialRange.findByIdAndUpdate(id, { $set: formData }, { new: true });
  revalidatePath('/materials');
  revalidatePath(`/materials/${id}`);
  revalidatePath('/admin/materials');
  return JSON.parse(JSON.stringify(range));
}

export async function deleteMaterialRange(id: string) {
  await connectDB();
  await MaterialRange.findByIdAndDelete(id);
  revalidatePath('/materials');
  revalidatePath('/admin/materials');
}
