'use server';

import connectDB from '@/lib/mongodb';
import Look from '@/models/Look';
import { revalidatePath } from 'next/cache';
import { fallbackLooks, getSlug } from '@/lib/lookFallbacks';
import { withTimeout } from '@/lib/withTimeout';

type LookPayload = Record<string, unknown>;
const READ_TIMEOUT_MS = 1500;

async function getLooksFromDb() {
  await connectDB({ quiet: true });
  const looks = await Look.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(looks));
}

export async function getLooks() {
  return withTimeout(
    getLooksFromDb().catch(() => fallbackLooks),
    READ_TIMEOUT_MS,
    fallbackLooks
  );
}

export async function getLookBySlug(slug: string) {
  return withTimeout(
    (async () => {
      await connectDB({ quiet: true });
      const look = await Look.findOne({ slug }).lean();
      return JSON.parse(JSON.stringify(look)) ?? fallbackLooks.find((item) => getSlug(item.name, item.slug) === slug) ?? null;
    })().catch(() => fallbackLooks.find((item) => getSlug(item.name, item.slug) === slug) ?? null),
    READ_TIMEOUT_MS,
    fallbackLooks.find((item) => getSlug(item.name, item.slug) === slug) ?? null
  );
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
