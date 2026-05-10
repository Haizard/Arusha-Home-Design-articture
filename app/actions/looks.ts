'use server';

import connectDB from '@/lib/mongodb';
import Look from '@/models/Look';
import { revalidatePath } from 'next/cache';

type LookPayload = Record<string, unknown>;

export async function getLooks() {
  await connectDB();
  const looks = await Look.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(looks));
}

export async function getLookBySlug(slug: string) {
  await connectDB();
  const look = await Look.findOne({ slug }).lean();
  return JSON.parse(JSON.stringify(look));
}

export async function addLook(formData: LookPayload) {
  await connectDB();
  const look = await Look.create(formData);
  revalidatePath('/');
  revalidatePath('/looks');
  revalidatePath('/admin');
  return JSON.parse(JSON.stringify(look));
}

export async function updateLook(id: string, formData: LookPayload) {
  await connectDB();
  const look = await Look.findByIdAndUpdate(id, { $set: formData }, { new: true });
  revalidatePath('/');
  revalidatePath('/looks');
  revalidatePath('/admin');
  return JSON.parse(JSON.stringify(look));
}

export async function deleteLook(id: string) {
  await connectDB();
  await Look.findByIdAndDelete(id);
  revalidatePath('/');
  revalidatePath('/looks');
  revalidatePath('/admin');
}
