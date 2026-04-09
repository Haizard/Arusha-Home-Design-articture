'use server';

import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import Project from '@/models/Project';
import Product from '@/models/Product';
import Testimonial from '@/models/Testimonial';
import Inquiry from '@/models/Inquiry';
import { revalidatePath } from 'next/cache';

// --- Services ---
export async function getServices() {
  await connectDB();
  const services = await Service.find({}).sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(services));
}

export async function getService(id: string) {
  await connectDB();
  const service = await Service.findById(id).lean();
  return JSON.parse(JSON.stringify(service));
}

export async function addService(formData: any) {
  await connectDB();
  console.log('Adding Service with data:', JSON.stringify(formData, null, 2));
  const service = await Service.create(formData);
  revalidatePath('/');
  revalidatePath('/services');
  return JSON.parse(JSON.stringify(service));
}

export async function updateService(id: string, formData: any) {
  await connectDB();
  console.log(`Updating Service ${id} with data:`, JSON.stringify(formData, null, 2));
  
  // Re-importing Service inside the function can sometimes help with stale models in dev
  const UpdatedService = (await import('@/models/Service')).default;
  
  const service = await UpdatedService.findByIdAndUpdate(
    id, 
    { $set: formData }, 
    { new: true, runValidators: true }
  );
  
  if (!service) throw new Error('Service not found');

  revalidatePath('/');
  revalidatePath('/services');
  revalidatePath(`/services/${id}`); 
  
  return JSON.parse(JSON.stringify(service));
}

export async function deleteService(id: string) {
  await connectDB();
  await Service.findByIdAndDelete(id);
  revalidatePath('/');
  revalidatePath('/services');
}

// --- Projects ---
export async function getProjects() {
  await connectDB();
  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(projects));
}

export async function getProject(id: string) {
  await connectDB();
  const project = await Project.findById(id).lean();
  return JSON.parse(JSON.stringify(project));
}

export async function addProject(formData: any) {
  await connectDB();
  const project = await Project.create(formData);
  revalidatePath('/');
  revalidatePath('/projects');
  return JSON.parse(JSON.stringify(project));
}

export async function updateProject(id: string, formData: any) {
  await connectDB();
  const project = await Project.findByIdAndUpdate(id, formData, { new: true });
  revalidatePath('/');
  revalidatePath('/projects');
  return JSON.parse(JSON.stringify(project));
}

export async function deleteProject(id: string) {
  await connectDB();
  await Project.findByIdAndDelete(id);
  revalidatePath('/');
  revalidatePath('/projects');
}

// --- Products ---
export async function getProducts() {
  await connectDB();
  const UpdatedProduct = (await import('@/models/Product')).default;
  const products = await UpdatedProduct.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(products));
}

export async function getProduct(id: string) {
  await connectDB();
  const UpdatedProduct = (await import('@/models/Product')).default;
  const product = await UpdatedProduct.findById(id).lean();
  return JSON.parse(JSON.stringify(product));
}

export async function addProduct(formData: any) {
  await connectDB();
  const UpdatedProduct = (await import('@/models/Product')).default;
  const product = await UpdatedProduct.create(formData);
  revalidatePath('/');
  revalidatePath('/products');
  return JSON.parse(JSON.stringify(product));
}

export async function updateProduct(id: string, formData: any) {
  await connectDB();
  const UpdatedProduct = (await import('@/models/Product')).default;
  const product = await UpdatedProduct.findByIdAndUpdate(
    id, 
    { $set: formData }, 
    { new: true, runValidators: true }
  );
  revalidatePath('/');
  revalidatePath('/products');
  revalidatePath(`/products/${id}`);
  return JSON.parse(JSON.stringify(product));
}

export async function deleteProduct(id: string) {
  await connectDB();
  await Product.findByIdAndDelete(id);
  revalidatePath('/');
  revalidatePath('/products');
}

// --- Testimonials ---
export async function getTestimonials() {
  await connectDB();
  const testimonials = await Testimonial.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(testimonials));
}

export async function addTestimonial(formData: any) {
  await connectDB();
  const testimonial = await Testimonial.create(formData);
  revalidatePath('/');
  return JSON.parse(JSON.stringify(testimonial));
}

export async function updateTestimonial(id: string, formData: any) {
  await connectDB();
  const testimonial = await Testimonial.findByIdAndUpdate(id, formData, { new: true });
  revalidatePath('/');
  return JSON.parse(JSON.stringify(testimonial));
}

export async function deleteTestimonial(id: string) {
  await connectDB();
  await Testimonial.findByIdAndDelete(id);
  revalidatePath('/');
}
// --- Inquiries ---
export async function getInquiries() {
  await connectDB();
  const inquiries = await Inquiry.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(inquiries));
}

export async function addInquiry(formData: any) {
  await connectDB();
  const inquiry = await Inquiry.create(formData);
  revalidatePath('/admin');
  return JSON.parse(JSON.stringify(inquiry));
}

export async function deleteInquiry(id: string) {
  await connectDB();
  await Inquiry.findByIdAndDelete(id);
  revalidatePath('/admin');
}
