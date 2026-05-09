'use client';

import { useState, useEffect, useCallback } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  getServices, addService, updateService, deleteService,
  getProjects, addProject, updateProject, deleteProject,
  getProducts, addProduct, updateProduct, deleteProduct,
  getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial,
  getInquiries, deleteInquiry, updateInquiryStatus,
} from '@/app/actions/admin';
import {
  getMaterialRanges, addMaterialRange, updateMaterialRange, deleteMaterialRange,
} from '@/app/actions/materials';
import {
  LayoutDashboard, Briefcase, ShoppingBag, MessageSquare, Mail,
  Plus, Pencil, Trash2, X, Save, ChevronRight,
  AlertCircle, Loader2, Database, RefreshCw,
  Image as ImageIcon, Home, Upload, Phone, Menu,
  CheckCircle2, Archive, Clock,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

type Tab = 'services' | 'projects' | 'products' | 'testimonials' | 'inquiries' | 'materials';

type ProcessStep = { title: string; desc: string };
type ServiceFeature = { icon: string; title: string; desc: string };
type ServiceFaq = { q: string; a: string };
type ProductPackageForm = { name: string; price: number; features: string[] };
type EstimateTierItem = { label: string; cost: string };
type EstimateTierForm = { name: string; total: string; items: EstimateTierItem[] };
type ProductFaqForm = { question: string; answer: string };

type AdminFormData = {
  [key: string]: unknown;
  _id?: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
  serviceId?: string;
  iconName?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  processSteps?: ProcessStep[];
  features_list?: ServiceFeature[];
  faqs?: ServiceFaq[] | ProductFaqForm[];
  category?: string;
  location?: string;
  gallery?: string[];
  blueprints?: string[];
  specifications?: {
    year?: string;
    area?: string;
    team?: string[];
    materials?: string[];
    client?: string;
  };
  drawingSets?: {
    rooms?: string[];
    architectural?: string[];
    structural?: string[];
    mechanical?: string[];
    electrical?: string[];
    boq?: string[];
  };
  constructionCost?: string;
  features?: string[];
  images?: string[];
  planId?: string;
  area?: string;
  dimensions?: string;
  bedrooms?: number;
  bathrooms?: number;
  stories?: number;
  garage?: number;
  basePrice?: number;
  packages?: ProductPackageForm[];
  badge?: string;
  rating?: number;
  reviewName?: string;
  duplex?: boolean;
  priceLabel?: string;
  apartments?: string;
  penthouses?: string;
  fileTypes?: string[];
  recommendedType?: string;
  drawingOptions?: string[];
  trustPoints?: string[];
  roomsIncluded?: string[];
  estimateTiers?: EstimateTierForm[];
  name?: string;
  role?: string;
  text?: string;
  avatar?: string;
  stars?: number;
  projectName?: string;
  email?: string;
  phone?: string;
  message?: string;
  desc?: string;
};

type AdminListItem = AdminFormData;

const NAV_ITEMS: { id: Tab; label: string; icon: LucideIcon; color: string }[] = [
  { id: 'services',     label: 'Services',     icon: LayoutDashboard, color: '#c9a84c' },
  { id: 'projects',     label: 'Projects',     icon: Briefcase,       color: '#60a5fa' },
  { id: 'products',     label: 'Products',     icon: ShoppingBag,     color: '#a78bfa' },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare,   color: '#34d399' },
  { id: 'inquiries',    label: 'Inquiries',    icon: Mail,            color: '#f87171' },
  { id: 'materials',    label: 'Materials',    icon: Database,        color: '#fbbf24' },
];

const EMPTY_FORMS: Record<Tab, AdminFormData> = {
  services:     { 
    serviceId: '', title: '', description: '', iconName: 'Sofa', imageUrl: '',
    processSteps: [], features_list: [], faqs: []
  },
  projects:     { 
    title: '', category: 'Architecture', location: '', imageUrl: '', 
    gallery: [], blueprints: [], 
    specifications: { year: '', area: '', team: [], materials: [], client: '' },
    drawingSets: { rooms: [], architectural: [], structural: [], mechanical: [] },
    description: '', constructionCost: '', features: []
  },
  products:     { 
    title: '', category: 'Architecture', description: '', imageUrl: '', 
    images: [], planId: '', area: '', dimensions: '', 
    bedrooms: 0, bathrooms: 0, stories: 1, garage: 0, 
    features: [], basePrice: 0, packages: [], badge: '', rating: 0, reviewName: '', duplex: false, faqs: [],
    priceLabel: '', apartments: '', penthouses: '', fileTypes: [], recommendedType: '',
    drawingOptions: [], trustPoints: [], roomsIncluded: [],
    drawingSets: { architectural: [], structural: [], electrical: [], mechanical: [], boq: [] },
    estimateTiers: []
  },
  testimonials: { name: '', role: '', text: '', avatar: '', stars: 5 },
  inquiries:    {},
  materials: { 
    title: '', category: 'Decorative Panels', description: '', logo: '', heroImage: '',
    techSpecs: [], swatches: [], profiles: [] 
  },
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('services');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AdminListItem[]>([]);
  const [dbStatus, setDbStatus] = useState<'checking'|'ok'|'error'>('checking');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminListItem | null>(null);
  const [formData, setFormData] = useState<AdminFormData>({});
  const [submitting, setSubmitting] = useState(false);

  // Test DB connection on mount
  useEffect(() => {
    fetch('/api/test-db')
      .then(r => r.json())
      .then(d => setDbStatus(d.success ? 'ok' : 'error'))
      .catch(() => setDbStatus('error'));
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let result: AdminListItem[] = [];
      if (activeTab === 'services')     result = await getServices();
      else if (activeTab === 'projects')     result = await getProjects();
      else if (activeTab === 'products')     result = await getProducts();
      else if (activeTab === 'testimonials') result = await getTestimonials();
      else if (activeTab === 'materials')    result = await getMaterialRanges();
      else                                   result = await getInquiries();
      // Stringify ObjectIds to plain strings
      setData(JSON.parse(JSON.stringify(result)) as AdminListItem[]);
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openModal = (item: AdminListItem | null = null) => {
    setEditingItem(item);
    setFormData(item ? { ...item } : { ...EMPTY_FORMS[activeTab] });
    setIsModalOpen(true);
  };
  const closeModal = () => { setIsModalOpen(false); setEditingItem(null); setFormData({}); };

  const getErrorMessage = (error: unknown, fallback: string) =>
    error instanceof Error ? error.message : fallback;
  const getFieldValue = (key: string) => {
    const value = formData[key];
    return typeof value === 'string' || typeof value === 'number' ? value : '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const tid = toast.loading(editingItem ? 'Saving changes…' : 'Creating entry…');
    try {
      const cleanData = { ...formData };
      delete cleanData._id;
      delete cleanData.__v;
      delete cleanData.createdAt;
      delete cleanData.updatedAt;

      if (activeTab === 'services') {
        if (editingItem?._id) await updateService(editingItem._id, cleanData);
        else await addService(cleanData);
      } else if (activeTab === 'projects') {
        if (editingItem?._id) await updateProject(editingItem._id, cleanData);
        else await addProject(cleanData);
      } else if (activeTab === 'products') {
        if (editingItem?._id) await updateProduct(editingItem._id, cleanData);
        else await addProduct(cleanData);
      } else if (activeTab === 'materials') {
        if (editingItem?._id) await updateMaterialRange(editingItem._id, cleanData);
        else await addMaterialRange(cleanData);
      } else {
        if (editingItem?._id) await updateTestimonial(editingItem._id, cleanData);
        else await addTestimonial(cleanData);
      }
      toast.success(editingItem ? 'Updated ✓' : 'Created ✓', { id: tid });
      closeModal();
      fetchData();
    } catch (err: unknown) {
      console.error('Submit error:', err);
      toast.error(getErrorMessage(err, 'Operation failed. Check all fields.'), { id: tid });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item permanently?')) return;
    const tid = toast.loading('Deleting…');
    try {
      if (activeTab === 'services')     await deleteService(id);
      else if (activeTab === 'projects')     await deleteProject(id);
      else if (activeTab === 'products')     await deleteProduct(id);
      else if (activeTab === 'testimonials') await deleteTestimonial(id);
      else if (activeTab === 'materials')    await deleteMaterialRange(id);
      else                                   await deleteInquiry(id);
      toast.success('Deleted ✓', { id: tid });
      fetchData();
    } catch {
      toast.error('Delete failed', { id: tid });
    }
  };

  const handleInquiryStatus = async (id: string, status: 'pending' | 'read' | 'archived') => {
    try {
      await updateInquiryStatus(id, status);
      toast.success(`Marked as ${status} ✓`);
      fetchData();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string, isArray: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const tid = toast.loading('Uploading image...');
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      const result = await res.json();

      if (result.success) {
        if (isArray) {
          const currentArr = Array.isArray(formData[key]) ? formData[key] : [];
          setFormData({ ...formData, [key]: [...currentArr, result.url] });
        } else {
          setFormData({ ...formData, [key]: result.url });
        }
        toast.success('Uploaded ✓', { id: tid });
      } else {
        throw new Error(result.message);
      }
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, 'Upload failed'), { id: tid });
    }
  };

  const imageField = (label: string, key: string, placeholder?: string) => (
    <div className="admin-field">
      <label className="admin-label">{label}</label>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={getFieldValue(key)}
          onChange={e => setFormData({ ...formData, [key]: e.target.value })}
          placeholder={placeholder || 'https://... or click upload'}
          className="admin-input"
          style={{ flex: 1 }}
        />
        <label className="upload-btn-icon">
          <Upload size={16} />
          <input type="file" hidden accept="image/*" onChange={e => handleFileUpload(e, key)} />
        </label>
      </div>
    </div>
  );

  const field = (label: string, key: string, opts?: { type?: string; placeholder?: string; required?: boolean }) => (
    <div className="admin-field">
      <label className="admin-label">{label}</label>
      <input
        type={opts?.type || 'text'}
        required={opts?.required ?? true}
        value={getFieldValue(key)}
        onChange={e => setFormData({ ...formData, [key]: opts?.type === 'number' ? +e.target.value : e.target.value })}
        placeholder={opts?.placeholder || ''}
        className="admin-input"
      />
    </div>
  );

  const textarea = (label: string, key: string, placeholder?: string) => (
    <div className="admin-field">
      <label className="admin-label">{label}</label>
      <textarea
        required
        rows={4}
        value={getFieldValue(key)}
        onChange={e => setFormData({ ...formData, [key]: e.target.value })}
        placeholder={placeholder || ''}
        className="admin-input resize-none"
      />
    </div>
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const processSteps = (Array.isArray(formData.processSteps) ? formData.processSteps : []) as ProcessStep[];
  const serviceFeatures = (Array.isArray(formData.features_list) ? formData.features_list : []) as ServiceFeature[];
  const serviceFaqs = (Array.isArray(formData.faqs) ? formData.faqs : []) as ServiceFaq[];
  const productPackages = (Array.isArray(formData.packages) ? formData.packages : []) as ProductPackageForm[];
  const estimateTiers = (Array.isArray(formData.estimateTiers) ? formData.estimateTiers : []) as EstimateTierForm[];
  const productFaqs = (Array.isArray(formData.faqs) ? formData.faqs : []) as ProductFaqForm[];
  const testimonialStars = typeof formData.stars === 'number' ? formData.stars : 0;

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .admin-root {
          display: flex; height: 100vh; overflow: hidden;
          background: #060608; font-family: 'Inter', system-ui, sans-serif; color: #e5e5e5;
        }
        /* ── Sidebar ── */
        .sidebar {
          width: 260px; min-width: 260px; height: 100vh;
          background: #0c0c0e; border-right: 1px solid rgba(255,255,255,0.06);
          display: flex; flex-direction: column; transition: all 0.3s ease;
          overflow: hidden;
        }
        .sidebar-logo {
          display: flex; align-items: center; gap: 12px;
          padding: 24px 20px 20px; border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .logo-mark {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #c9a84c, #a07830);
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 16px; color: #000; flex-shrink: 0;
        }
        .logo-text { font-size: 15px; font-weight: 700; color: #fff; letter-spacing: -.01em; }
        .logo-sub  { font-size: 10px; color: #555; letter-spacing: .08em; text-transform: uppercase; margin-top: 1px; }
        .sidebar-section { padding: 20px 12px 8px; }
        .sidebar-section-label {
          font-size: 9px; letter-spacing: .14em; text-transform: uppercase;
          color: #444; padding: 0 8px 10px; font-weight: 600;
        }
        .nav-btn {
          display: flex; align-items: center; gap: 12px; width: 100%; padding: 11px 12px;
          border-radius: 10px; border: none; background: transparent; cursor: pointer;
          color: #666; font-size: 13.5px; font-weight: 500; transition: all .2s;
          text-align: left; position: relative;
        }
        .nav-btn:hover { background: rgba(255,255,255,.04); color: #bbb; }
        .nav-btn.active { background: rgba(201,168,76,.1); color: #c9a84c; }
        .nav-btn .nav-icon { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; background: rgba(255,255,255,.04); flex-shrink: 0; }
        .nav-btn.active .nav-icon { background: rgba(201,168,76,.15); }
        .nav-badge {
          margin-left: auto; font-size: 10px; font-weight: 700; background: rgba(255,255,255,.07);
          color: #555; padding: 2px 7px; border-radius: 999px;
        }
        .nav-btn.active .nav-badge { background: rgba(201,168,76,.2); color: #c9a84c; }
        .sidebar-footer {
          margin-top: auto; padding: 16px 12px;
          border-top: 1px solid rgba(255,255,255,.05);
        }
        .db-badge {
          display: flex; align-items: center; gap: 8px; padding: 10px 12px;
          border-radius: 10px; background: rgba(255,255,255,.03); font-size: 12px;
        }
        .db-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .db-ok    { background: #34d399; box-shadow: 0 0 8px rgba(52,211,153,.5); }
        .db-error { background: #f87171; }
        .db-checking { background: #888; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

        /* ── Main ── */
        .admin-main { flex: 1; overflow-y: auto; display: flex; flex-direction: column; width: 100%; }
        .admin-topbar {
          position: sticky; top: 0; z-index: 10;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 24px; height: 64px;
          background: rgba(6,6,8,.9); backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,.05);
        }
        .topbar-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #555; }
        .topbar-breadcrumb span { color: #999; }
        .hamburger {
          display: none; width: 36px; height: 36px; border-radius: 8px;
          background: rgba(255,255,255,0.05); color: #888; border: none; cursor: pointer;
          align-items: center; justify-content: center; margin-right: 12px;
        }

        /* ── Page header ── */
        .page-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          margin-bottom: 32px; gap: 16px;
        }

        .page-title { font-size: 26px; font-weight: 700; color: #fff; letter-spacing: -.02em; }
        .page-sub { font-size: 13px; color: #555; margin-top: 4px; }

        /* ── Buttons ── */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #c9a84c; color: #000; font-weight: 700; font-size: 13px;
          padding: 11px 20px; border-radius: 10px; border: none; cursor: pointer;
          transition: all .2s; white-space: nowrap;
        }
        .btn-primary:hover { background: #d4b05a; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(201,168,76,.3); }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,.04); color: #999; font-size: 13px; font-weight: 500;
          padding: 9px 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,.07); cursor: pointer;
          transition: all .2s;
        }
        .btn-ghost:hover { background: rgba(255,255,255,.07); color: #ddd; }
        .btn-danger { background: rgba(239,68,68,.12); color: #f87171; }
        .btn-danger:hover { background: rgba(239,68,68,.25); }

        /* ── Cards Grid ── */
        .cards-grid {
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
          gap: 20px;
        }
        .item-card {
          background: #0e0e10; border: 1px solid rgba(255,255,255,.06);
          border-radius: 14px; overflow: hidden; transition: border-color .25s, transform .2s;
          position: relative;
        }
        .item-card:hover { border-color: rgba(201,168,76,.3); transform: translateY(-2px); }
        .card-image { position: relative; aspect-ratio: 16/9; background: #161618; overflow: hidden; }
        .card-image img { width: 100%; height: 100%; object-fit: cover; opacity: .7; transition: opacity .3s, transform .5s; }
        .item-card:hover .card-image img { opacity: 1; transform: scale(1.03); }
        .card-no-img {
          width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #333;
        }
        .card-actions {
          position: absolute; top: 10px; right: 10px; display: flex; gap: 6px; opacity: 0; transition: opacity .2s;
        }
        .item-card:hover .card-actions { opacity: 1; }
        .card-action-btn {
          width: 34px; height: 34px; border-radius: 8px; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          background: rgba(10,10,12,.85); backdrop-filter: blur(8px); color: #ccc; transition: all .2s;
        }
        .card-action-btn:hover { background: #c9a84c; color: #000; }
        .card-action-btn.del:hover { background: #ef4444; color: #fff; }
        .card-tag {
          font-size: 9px; letter-spacing: .14em; text-transform: uppercase; color: #c9a84c; font-weight: 600;
        }
        .card-body { padding: 16px; }
        .card-title { font-size: 14px; font-weight: 600; color: #e5e5e5; margin: 4px 0 6px; line-height: 1.3; }
        .card-desc { font-size: 12px; color: #555; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .card-meta { display: flex; align-items: center; gap: 6px; margin-top: 10px; }
        .card-meta-item { font-size: 11px; color: #444; display: flex; align-items: center; gap: 4px; }

        /* ── States ── */
        .loading-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .skeleton { background: linear-gradient(90deg, #111 25%, #181818 50%, #111 75%); background-size: 200%; animation: shimmer 1.4s infinite; border-radius: 14px; }
        @keyframes shimmer { 0%{background-position:200%} 100%{background-position:-200%} }
        .empty-state {
          text-align: center; padding: 80px 24px;
          border: 2px dashed rgba(255,255,255,.06); border-radius: 20px;
        }
        .empty-icon { color: #2a2a2a; margin-bottom: 16px; }
        .empty-title { font-size: 16px; font-weight: 600; color: #444; margin-bottom: 6px; }
        .empty-sub { font-size: 13px; color: #333; }

        /* ── Modal ── */
        .modal-overlay {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(0,0,0,.85); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .modal-box {
          background: #0e0e11; border: 1px solid rgba(255,255,255,.1);
          border-radius: 20px; width: 100%; max-width: 580px;
          max-height: 90vh; overflow-y: auto;
          box-shadow: 0 40px 80px rgba(0,0,0,.8);
        }
        .modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 24px 28px; border-bottom: 1px solid rgba(255,255,255,.06);
          position: sticky; top: 0; background: #0e0e11; z-index: 1;
        }
        .modal-title { font-size: 18px; font-weight: 700; color: #fff; }
        .modal-sub { font-size: 12px; color: #555; margin-top: 3px; }
        .modal-close {
          width: 32px; height: 32px; border-radius: 8px; border: none;
          background: rgba(255,255,255,.05); color: #888; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s;
        }
        .modal-close:hover { background: rgba(255,255,255,.1); color: #fff; }
        .modal-body { padding: 24px 28px; }
        .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .admin-field { display: flex; flex-direction: column; gap: 4px; }
        .admin-label { font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: #555; font-weight: 600; }
        .admin-input, .admin-select {
          background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
          border-radius: 10px; padding: 11px 14px; font-size: 13.5px; color: #e5e5e5;
          outline: none; transition: border-color .2s; width: 100%; font-family: inherit;
        }
        .admin-input:focus, .admin-select:focus { border-color: rgba(201,168,76,.6); background: rgba(201,168,76,.03); }
        option { background: #1a1a1e; }
        .image-preview {
          width: 100%; aspect-ratio: 16/9; border-radius: 10px; object-fit: cover;
          border: 1px solid rgba(255,255,255,.07); margin-top: 8px; background: #111;
        }
        .modal-footer {
          display: flex; gap: 10px; padding: 20px 28px 24px;
          border-top: 1px solid rgba(255,255,255,.05);
        }
        .btn-submit {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
          background: #c9a84c; color: #000; font-weight: 700; font-size: 14px;
          padding: 13px; border-radius: 10px; border: none; cursor: pointer; transition: all .2s;
        }
        .btn-submit:hover:not(:disabled) { background: #d4b05a; }
        .btn-submit:disabled { opacity: .5; cursor: not-allowed; }
        .btn-cancel {
          padding: 13px 22px; background: rgba(255,255,255,.04); color: #777; font-size: 14px; font-weight: 500;
          border: 1px solid rgba(255,255,255,.08); border-radius: 10px; cursor: pointer; transition: all .2s;
        }
        .btn-cancel:hover { background: rgba(255,255,255,.07); color: #ccc; }

        /* ── Tabs strip (inside main) ── */
        .tab-strip {
          display: flex; gap: 4px; padding: 4px; background: rgba(255,255,255,.03);
          border-radius: 12px; border: 1px solid rgba(255,255,255,.05); width: fit-content; margin-bottom: 28px;
        }
        .tab-pill {
          display: flex; align-items: center; gap: 7px; padding: 8px 16px;
          border-radius: 9px; border: none; background: transparent; cursor: pointer;
          font-size: 13px; font-weight: 500; color: #555; transition: all .2s;
        }
        .tab-pill.active { background: rgba(201,168,76,.15); color: #c9a84c; }
        .tab-pill:hover:not(.active) { color: #aaa; }
        .upload-btn-icon {
          width: 42px;
          height: 42px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #888;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .upload-btn-icon:hover {
          background: rgba(201,168,76,0.1);
          color: var(--color-gold);
          border-color: var(--color-gold);
        }

        /* ── Unified Responsive Block ── */
        @media (max-width: 900px) {
          .hamburger { display: flex; }
          .sidebar {
            position: fixed; inset: 0 auto 0 0; z-index: 1000;
            transform: translateX(-100%); box-shadow: 20px 0 40px rgba(0,0,0,0.5);
          }
          .sidebar.open { transform: translateX(0); }
          .sidebar-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px);
            z-index: 999; display: none;
          }
          .sidebar-overlay.open { display: block; }
          .admin-topbar { padding: 0 16px; }
          .topbar-breadcrumb { display: none; }
          .admin-content { padding: 20px 16px; }
          .page-header { flex-direction: column; align-items: stretch; }
          .modal-box { max-width: 100%; height: 100%; max-height: 100%; border-radius: 0; }
          .tab-strip { width: 100%; overflow-x: auto; white-space: nowrap; }
          .hide-mobile { display: none; }
        }

        @media (max-width: 600px) {
           .cards-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; }
           .form-grid-2 { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
           .admin-input, .admin-select { padding: 8px 10px; font-size: 12px; }
           .card-title { font-size: 12px; }
           .card-desc { display: none; }
           .tab-strip { 
             display: grid !important; 
             grid-template-columns: 1fr 1fr !important; 
             width: 100% !important; 
             gap: 4px !important;
             background: transparent !important;
             border: none !important;
           }
           .tab-pill { 
             justify-content: center !important;
             padding: 8px 4px !important;
             font-size: 10px !important;
             background: rgba(255,255,255,0.05) !important;
             border: 1px solid rgba(255,255,255,0.08) !important;
           }
        }
      `}</style>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: '#1a1a1e', color: '#e5e5e5', border: '1px solid rgba(255,255,255,.1)', borderRadius: '10px', fontSize: '13px' },
        }}
      />

      <div className="admin-root">
        {/* Sidebar Overlay */}
        <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)} />

        {/* ── SIDEBAR ── */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-logo">
            <div className="logo-mark">A</div>
            <div>
              <div className="logo-text">Arusha Admin</div>
              <div className="logo-sub">Content Management</div>
            </div>
            {isSidebarOpen && (
               <button onClick={() => setIsSidebarOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#555' }}>
                 <X size={18} />
               </button>
            )}
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-label">Management</div>
            {NAV_ITEMS.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                className={`nav-btn ${activeTab === id ? 'active' : ''}`}
                onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
              >
                <span className="nav-icon">
                  <Icon size={15} color={activeTab === id ? color : '#555'} />
                </span>
                {label}
                <span className="nav-badge">{activeTab === id && !loading ? data.length : '—'}</span>
              </button>
            ))}
          </div>

          <div className="sidebar-footer">
            <div className="db-badge">
              <div className={`db-dot ${dbStatus === 'ok' ? 'db-ok' : dbStatus === 'error' ? 'db-error' : 'db-checking'}`} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: dbStatus === 'ok' ? '#34d399' : dbStatus === 'error' ? '#f87171' : '#888' }}>
                  {dbStatus === 'ok' ? 'Cloud Sync Online' : dbStatus === 'error' ? 'Sync Paused' : 'Connecting…'}
                </div>
                <div style={{ fontSize: 9, color: '#333', textTransform: 'uppercase' }}>Production DB Active</div>
              </div>
              <Database size={13} color={dbStatus === 'ok' ? '#34d399' : '#555'} />
            </div>
            <Link href="/" className="nav-btn" style={{ marginTop: 6, textDecoration: 'none', display: 'flex' }}>
              <span className="nav-icon"><Home size={14} color="#555" /></span>
              View Site
            </Link>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="admin-main">
          {/* Top bar */}
          <div className="admin-topbar">
            <div style={{ display: 'flex', alignItems: 'center' }}>
               <button className="hamburger" onClick={() => setIsSidebarOpen(true)}>
                 <Menu size={20} />
               </button>
               <div className="topbar-breadcrumb">
                 <span>CMS</span>
                 <ChevronRight size={12} />
                 <span style={{ color: '#c9a84c', fontWeight: 600, textTransform: 'capitalize' }}>{activeTab}</span>
               </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button className="btn-ghost" onClick={fetchData} title="Refresh">
                <RefreshCw size={12} /> <span className="hide-mobile">Refresh</span>
              </button>
              {activeTab !== 'inquiries' && (
                <button className="btn-primary" onClick={() => openModal()} style={{ padding: '8px 16px' }}>
                  <Plus size={16} /> <span style={{ fontSize: '12px' }}>Add New</span>
                </button>
              )}
            </div>
          </div>

          {/* Content area */}
          <div className="admin-content">
            <div className="page-header">
              <div>
                <h1 className="page-title" style={{ textTransform: 'capitalize' }}>{activeTab}</h1>
                <p className="page-sub">
                  {loading ? 'Loading…' : `${data.length} item${data.length !== 1 ? 's' : ''} — click any card to edit or delete`}
                </p>
              </div>
              {activeTab !== 'inquiries' && !loading && (
                <button className="btn-primary" onClick={() => openModal()} style={{ padding: '12px 24px', fontSize: '14px' }}>
                  <Plus size={18} /> Create New {activeTab.slice(0, -1)}
                </button>
              )}
            </div>

            {/* Tab strip (secondary) */}
            <div className="tab-strip">
              {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
                <button key={id} className={`tab-pill ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id)}>
                  <Icon size={13} /> {label}
                </button>
              ))}
            </div>

            {/* Grid */}
            {loading ? (
              <div className="loading-grid">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="skeleton" style={{ height: 240 }} />
                ))}
              </div>
            ) : data.length === 0 ? (
              <div className="empty-state">
                <AlertCircle size={48} className="empty-icon" style={{ margin: '0 auto 16px' }} />
                <p className="empty-title">No {activeTab} yet</p>
                <p className="empty-sub" style={{ marginBottom: 24 }}>Get started by creating your first {activeTab.slice(0,-1)} entry.</p>
                <button className="btn-primary" onClick={() => openModal()}>
                  <Plus size={16} /> Create First {activeTab.slice(0, -1)}
                </button>
              </div>
            ) : (
              <div className="cards-grid">
                {data.map((item: any) => (
                  <div key={item._id} className="item-card">
                    {activeTab === 'inquiries' ? (
                      <div className="card-body" style={{ padding: '1.5rem' }}>
                        {/* Header row: status badge + delete */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <span style={{
                            fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em',
                            textTransform: 'uppercase', padding: '3px 10px', borderRadius: '999px',
                            background: item.status === 'read' ? 'rgba(52,211,153,0.12)' : item.status === 'archived' ? 'rgba(255,255,255,0.06)' : 'rgba(251,191,36,0.12)',
                            color: item.status === 'read' ? '#34d399' : item.status === 'archived' ? '#555' : '#fbbf24',
                            display: 'flex', alignItems: 'center', gap: '5px'
                          }}>
                            {item.status === 'read' ? <CheckCircle2 size={9} /> : item.status === 'archived' ? <Archive size={9} /> : <Clock size={9} />}
                            {item.status || 'pending'}
                          </span>
                          <button className="card-action-btn del" title="Delete" onClick={() => { if (item._id) handleDelete(item._id); }}><Trash2 size={12} /></button>
                        </div>

                        {/* Service / project label */}
                        <div style={{ color: '#c9a84c', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                          {item.service || item.projectName || 'General Inquiry'}
                        </div>

                        {/* Name */}
                        <div className="card-title" style={{ marginBottom: '6px' }}>{item.name}</div>

                        {/* Message preview */}
                        <div style={{ fontSize: '12px', color: '#666', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1rem' }}>
                          {item.message}
                        </div>

                        {/* Contact details */}
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.875rem', display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '1rem' }}>
                          <a href={`mailto:${item.email}`} style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#c9a84c', textDecoration: 'none' }}>
                            <Mail size={11} color="#555" /> {item.email}
                          </a>
                          {item.phone && (
                            <a href={`tel:${item.phone}`} style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#888', textDecoration: 'none' }}>
                              <Phone size={11} color="#555" /> {item.phone}
                            </a>
                          )}
                          <div style={{ fontSize: '10px', color: '#3a3a3a', marginTop: '2px' }}>
                            {item.createdAt ? new Date(item.createdAt).toLocaleString('en-TZ', { dateStyle: 'medium', timeStyle: 'short' }) : ''}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {item.status !== 'read' && (
                            <button
                              onClick={() => handleInquiryStatus(item._id, 'read')}
                              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '7px', fontSize: '11px', fontWeight: 600, background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.2)', borderRadius: '8px', cursor: 'pointer' }}
                            >
                              <CheckCircle2 size={11} /> Mark Read
                            </button>
                          )}
                          {item.status !== 'archived' && (
                            <button
                              onClick={() => handleInquiryStatus(item._id, 'archived')}
                              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '7px', fontSize: '11px', fontWeight: 600, background: 'rgba(255,255,255,0.04)', color: '#555', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', cursor: 'pointer' }}
                            >
                              <Archive size={11} /> Archive
                            </button>
                          )}
                          {item.status === 'archived' && (
                            <button
                              onClick={() => handleInquiryStatus(item._id, 'pending')}
                              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '7px', fontSize: '11px', fontWeight: 600, background: 'rgba(251,191,36,0.08)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.15)', borderRadius: '8px', cursor: 'pointer' }}
                            >
                              <Clock size={11} /> Reopen
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="card-image">
                          {(item.imageUrl || item.avatar) ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.imageUrl || item.avatar} alt={item.title || item.name} />
                          ) : (
                            <div className="card-no-img"><ImageIcon size={32} /></div>
                          )}
                          <div className="card-actions">
                            <button className="card-action-btn" title="Edit" onClick={() => openModal(item)}>
                              <Pencil size={14} />
                            </button>
                            <button className="card-action-btn del" title="Delete" onClick={() => { if (item._id) handleDelete(item._id); }}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="card-tag">{item.category || item.serviceId || item.role || activeTab}</div>
                          <div className="card-title">{item.title || item.name}</div>
                          <div className="card-desc">{item.description || item.text || item.desc || '—'}</div>
                          {item.location && (
                            <div className="card-meta">
                              <span className="card-meta-item">📍 {item.location}</span>
                            </div>
                          )}
                          {item.stars && (
                            <div className="card-meta">
                              <span className="card-meta-item">{'★'.repeat(item.stars)} ({item.stars}/5)</span>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── MODAL ── */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">
                  {editingItem ? '✏️ Edit' : '➕ New'} {activeTab.slice(0, -1).replace(/^\w/, c => c.toUpperCase())}
                </div>
                <div className="modal-sub">Fill in all required fields and save</div>
              </div>
              <button className="modal-close" onClick={closeModal}><X size={16} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* ── SERVICES ── */}
                {activeTab === 'services' && (<>
                  <div className="form-grid-2">
                    {field('Title', 'title', { placeholder: 'e.g. Interior Design' })}
                    {field('Service ID', 'serviceId', { placeholder: 'e.g. 01' })}
                  </div>
                  {field('Icon Name (Lucide)', 'iconName', { placeholder: 'Sofa, Building2, HardHat…' })}
                  {imageField('Service Image URL', 'imageUrl', 'Upload service cover')}
                  {textarea('Description', 'description', 'Describe this service…')}

                  {/* New: Process Steps */}
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="admin-label" style={{ marginBottom: '16px', color: '#c9a84c', display: 'flex', justifyContent: 'space-between' }}>
                      Architectural Process 
                      <button type="button" onClick={() => setFormData({...formData, processSteps: [...(Array.isArray(formData.processSteps) ? formData.processSteps : []), {title: '', desc: ''}]})} style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer', fontSize: '10px' }}>+ ADD STEP</button>
                    </div>
                    {processSteps.map((step, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '8px', marginBottom: '8px', alignItems: 'start' }}>
                        <input className="admin-input" placeholder="Title" value={step.title} onChange={e => {
                          const steps = processSteps.map((s, idx) => idx === i ? { ...s, title: e.target.value } : s);
                          setFormData({...formData, processSteps: steps});
                        }} />
                        <textarea className="admin-input" rows={1} placeholder="Description" value={step.desc} onChange={e => {
                          const steps = processSteps.map((s, idx) => idx === i ? { ...s, desc: e.target.value } : s);
                          setFormData({...formData, processSteps: steps});
                        }} />
                        <button type="button" onClick={() => setFormData({...formData, processSteps: processSteps.filter((_, idx) => idx !== i)})} className="card-action-btn del" style={{ padding: '8px' }}><Trash2 size={12} /></button>
                      </div>
                    ))}
                  </div>

                  {/* New: Features List */}
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="admin-label" style={{ marginBottom: '16px', color: '#c9a84c', display: 'flex', justifyContent: 'space-between' }}>
                      Specialized Features 
                      <button type="button" onClick={() => setFormData({...formData, features_list: [...(Array.isArray(formData.features_list) ? formData.features_list : []), {icon: 'Zap', title: '', desc: ''}]})} style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer', fontSize: '10px' }}>+ ADD FEATURE</button>
                    </div>
                    {serviceFeatures.map((feat, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr auto', gap: '8px', marginBottom: '8px', alignItems: 'start' }}>
                        <input className="admin-input" placeholder="Icon" value={feat.icon} onChange={e => {
                          const f = serviceFeatures.map((item, idx) => idx === i ? { ...item, icon: e.target.value } : item);
                          setFormData({...formData, features_list: f});
                        }} />
                        <input className="admin-input" placeholder="Title" value={feat.title} onChange={e => {
                          const f = serviceFeatures.map((item, idx) => idx === i ? { ...item, title: e.target.value } : item);
                          setFormData({...formData, features_list: f});
                        }} />
                        <input className="admin-input" placeholder="Desc" value={feat.desc} onChange={e => {
                          const f = serviceFeatures.map((item, idx) => idx === i ? { ...item, desc: e.target.value } : item);
                          setFormData({...formData, features_list: f});
                        }} />
                        <button type="button" onClick={() => setFormData({...formData, features_list: serviceFeatures.filter((_, idx) => idx !== i)})} className="card-action-btn del" style={{ padding: '8px' }}><Trash2 size={12} /></button>
                      </div>
                    ))}
                  </div>

                  {/* New: FAQs */}
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="admin-label" style={{ marginBottom: '16px', color: '#c9a84c', display: 'flex', justifyContent: 'space-between' }}>
                      FAQs
                      <button type="button" onClick={() => setFormData({...formData, faqs: [...(Array.isArray(formData.faqs) ? formData.faqs : []), {q: '', a: ''}]})} style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer', fontSize: '10px' }}>+ ADD FAQ</button>
                    </div>
                    {serviceFaqs.map((faq, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr auto', gap: '8px', marginBottom: '8px', alignItems: 'start' }}>
                        <input className="admin-input" placeholder="Question" value={faq.q} onChange={e => {
                          const f = serviceFaqs.map((item, idx) => idx === i ? { ...item, q: e.target.value } : item);
                          setFormData({...formData, faqs: f});
                        }} />
                        <textarea className="admin-input" rows={1} placeholder="Answer" value={faq.a} onChange={e => {
                          const f = serviceFaqs.map((item, idx) => idx === i ? { ...item, a: e.target.value } : item);
                          setFormData({...formData, faqs: f});
                        }} />
                        <button type="button" onClick={() => setFormData({...formData, faqs: (Array.isArray(formData.faqs) ? formData.faqs : []).filter((_, idx) => idx !== i)})} className="card-action-btn del" style={{ padding: '8px' }}><Trash2 size={12} /></button>
                      </div>
                    ))}
                  </div>

                  {formData.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={formData.imageUrl} alt="preview" className="image-preview" />
                  )}
                </>)}

                {/* ── PROJECTS ── */}
                {activeTab === 'projects' && (<>
                  <div className="form-grid-2">
                    {field('Project Title', 'title', { placeholder: 'e.g. Modern Villa' })}
                    <div className="admin-field">
                      <label className="admin-label">Category</label>
                      <select
                        className="admin-select"
                        value={formData.category || ''}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                      >
                        {['Architecture','Interior','Kitchen','Construction','Exterior','Renovation','3D Model'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-grid-2">
                    {field('Location', 'location', { placeholder: 'e.g. Arusha, Tanzania' })}
                    {imageField('Hero Image URL', 'imageUrl', 'Upload main project image')}
                  </div>

                  {/* Technical Specs */}
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="admin-label" style={{ marginBottom: '16px', color: '#c9a84c' }}>Technical Specifications</div>
                    <div className="form-grid-2">
                       <div className="admin-field">
                         <label className="admin-label">Year</label>
                         <input className="admin-input" value={formData.specifications?.year || ''} onChange={e => setFormData({...formData, specifications: {...formData.specifications, year: e.target.value}})} />
                       </div>
                       <div className="admin-field">
                         <label className="admin-label">Area (sqm)</label>
                         <input className="admin-input" value={formData.specifications?.area || ''} onChange={e => setFormData({...formData, specifications: {...formData.specifications, area: e.target.value}})} />
                       </div>
                    </div>
                    <div className="form-grid-2" style={{ marginTop: '12px' }}>
                       <div className="admin-field">
                         <label className="admin-label">Client</label>
                         <input className="admin-input" value={formData.specifications?.client || ''} onChange={e => setFormData({...formData, specifications: {...formData.specifications, client: e.target.value}})} />
                       </div>
                       <div className="admin-field">
                         <label className="admin-label">Materials (comma separated)</label>
                         <input className="admin-input" value={formData.specifications?.materials?.join(', ') || ''} onChange={e => setFormData({...formData, specifications: {...formData.specifications, materials: e.target.value.split(',').map((s: string) => s.trim())}})} />
                       </div>
                    </div>
                    <div className="admin-field" style={{ marginTop: '12px' }}>
                       <label className="admin-label">Team (comma separated)</label>
                       <input className="admin-input" value={formData.specifications?.team?.join(', ') || ''} onChange={e => setFormData({...formData, specifications: {...formData.specifications, team: e.target.value.split(',').map((s: string) => s.trim())}})} />
                    </div>
                  </div>

                  {/* Pricing & Features */}
                  <div className="form-grid-2">
                    {field('Estimate Construction Cost', 'constructionCost', { placeholder: '$1,152,094' })}
                    <div className="admin-field">
                      <label className="admin-label">Quick Sidebar Features (comma separated)</label>
                      <input 
                        className="admin-input" 
                        placeholder="Architectural Drawings, Structural Calculations..."
                        value={(Array.isArray(formData.features) ? formData.features : []).join(', ') || ''} 
                        onChange={e => setFormData({...formData, features: e.target.value.split(',').map((s: string) => s.trim())})} 
                      />
                    </div>
                  </div>

                  {/* Technical Packages Section */}
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="admin-label" style={{ marginBottom: '16px', color: '#c9a84c' }}>Drawing Sets & Rooms (Included)</div>
                    <div className="form-grid-2">
                       <div className="admin-field">
                         <label className="admin-label">Rooms Included</label>
                         <textarea className="admin-input" rows={2} value={formData.drawingSets?.rooms?.join(', ') || ''} onChange={e => setFormData({...formData, drawingSets: {...formData.drawingSets, rooms: e.target.value.split(',').map((s: string) => s.trim())}})} />
                       </div>
                       <div className="admin-field">
                         <label className="admin-label">Architectural Package</label>
                         <textarea className="admin-input" rows={2} value={formData.drawingSets?.architectural?.join(', ') || ''} onChange={e => setFormData({...formData, drawingSets: {...formData.drawingSets, architectural: e.target.value.split(',').map((s: string) => s.trim())}})} />
                       </div>
                    </div>
                    <div className="form-grid-2" style={{ marginTop: '12px' }}>
                       <div className="admin-field">
                         <label className="admin-label">Structural Package</label>
                         <textarea className="admin-input" rows={2} value={formData.drawingSets?.structural?.join(', ') || ''} onChange={e => setFormData({...formData, drawingSets: {...formData.drawingSets, structural: e.target.value.split(',').map((s: string) => s.trim())}})} />
                       </div>
                       <div className="admin-field">
                         <label className="admin-label">Mechanical Package</label>
                         <textarea className="admin-input" rows={2} value={formData.drawingSets?.mechanical?.join(', ') || ''} onChange={e => setFormData({...formData, drawingSets: {...formData.drawingSets, mechanical: e.target.value.split(',').map((s: string) => s.trim())}})} />
                       </div>
                    </div>
                  </div>

                  {/* Media */}
                  <div className="admin-field">
                    <label className="admin-label">Gallery URLs (comma separated)</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <textarea className="admin-input" value={(Array.isArray(formData.gallery) ? formData.gallery : []).join(', ') || ''} onChange={e => setFormData({...formData, gallery: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})} rows={2} style={{ flex: 1 }} />
                      <label className="upload-btn-icon" style={{ height: 'auto', padding: '0 12px' }}>
                        <Upload size={16} />
                        <input type="file" hidden accept="image/*" onChange={e => handleFileUpload(e, 'gallery', true)} />
                      </label>
                    </div>
                  </div>
                  <div className="admin-field">
                    <label className="admin-label">Blueprint URLs (comma separated)</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <textarea className="admin-input" value={(Array.isArray(formData.blueprints) ? formData.blueprints : []).join(', ') || ''} onChange={e => setFormData({...formData, blueprints: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})} rows={2} style={{ flex: 1 }} />
                      <label className="upload-btn-icon" style={{ height: 'auto', padding: '0 12px' }}>
                        <Upload size={16} />
                        <input type="file" hidden accept="image/*,application/pdf" onChange={e => handleFileUpload(e, 'blueprints', true)} />
                      </label>
                    </div>
                  </div>

                  {textarea('Detailed Description', 'description', 'Describe the design vision and challenges…')}
                  
                  {formData.imageUrl && (
                    <div style={{ marginTop: '8px' }}>
                      <label className="admin-label">Hero Preview</label>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={formData.imageUrl} alt="preview" className="image-preview" />
                    </div>
                  )}
                </>)}

                {/* ── PRODUCTS ── */}
                {activeTab === 'products' && (<>
                  <div className="form-grid-2">
                    {field('Product Title', 'title', { placeholder: 'e.g. 3 Bedroom Modern House' })}
                    <div className="admin-field">
                      <label className="admin-label">Category</label>
                      <select
                        className="admin-select"
                        value={formData.category || ''}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                      >
                        {['Architecture','House Plan','Apartment','Interior','Furniture','Other'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-grid-2">
                    {field('Plan ID', 'planId', { placeholder: 'e.g. ID-89901' })}
                    {field('Base Price (Starting)', 'basePrice', { type: 'number', placeholder: '249' })}
                  </div>

                  <div className="form-grid-2">
                    {field('Badge', 'badge', { placeholder: 'e.g. Best Seller' })}
                    {field('Rating (0-5)', 'rating', { type: 'number', placeholder: '5', required: false })}
                  </div>

                  <div className="form-grid-2">
                    {field('Review Name', 'reviewName', { placeholder: 'e.g. Ekong Richard', required: false })}
                    {field('Display Price Label', 'priceLabel', { placeholder: 'e.g. From $270' })}
                  </div>

                  <div className="form-grid-2">
                    {field('Recommended File Type', 'recommendedType', { placeholder: 'e.g. CAD + PDF', required: false })}
                    <div />
                  </div>

                  {/* Pricing Packages Area */}
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="admin-label" style={{ marginBottom: '16px', color: 'var(--color-gold)', display: 'flex', justifyContent: 'space-between' }}>
                      Pricing Packages
                      <button type="button" onClick={() => setFormData({...formData, packages: [...(Array.isArray(formData.packages) ? formData.packages : []), {name: '', price: 0, features: []}]})} style={{ background: 'none', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', fontSize: '10px', fontWeight: 700 }}>+ ADD PACKAGE</button>
                    </div>
                    {productPackages.map((pkg, i) => (
                      <div key={i} style={{ marginBottom: '12px', padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px auto', gap: '8px', alignItems: 'center' }}>
                          <input className="admin-input" placeholder="Package name (e.g. CAD Set)" value={pkg.name} onChange={e => {
                            const pkgs = productPackages.map((p, idx) => idx === i ? { ...p, name: e.target.value } : p);
                            setFormData({...formData, packages: pkgs});
                          }} />
                          <input className="admin-input" type="number" placeholder="Price" value={pkg.price} onChange={e => {
                            const pkgs = productPackages.map((p, idx) => idx === i ? { ...p, price: +e.target.value } : p);
                            setFormData({...formData, packages: pkgs});
                          }} />
                          <button type="button" onClick={() => setFormData({...formData, packages: productPackages.filter((_, idx) => idx !== i)})} className="card-action-btn del" style={{ padding: '8px' }}><Trash2 size={12} /></button>
                        </div>
                        <div className="admin-field" style={{ marginTop: '10px', marginBottom: 0 }}>
                          <label className="admin-label">Package Features (comma separated)</label>
                          <input
                            className="admin-input"
                            placeholder="Editable CAD files, Printable PDF sheets, BOQ summary..."
                            value={(Array.isArray(pkg.features) ? pkg.features : []).join(', ')}
                            onChange={e => {
                              const pkgs = productPackages.map((p, idx) => idx === i
                                ? {
                                    ...p,
                                    features: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean),
                                  }
                                : p);
                              setFormData({...formData, packages: pkgs});
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    {(Array.isArray(formData.packages) ? formData.packages : []).length === 0 && <div style={{ fontSize: '11px', color: '#444', textAlign: 'center' }}>No custom packages added</div>}
                  </div>


                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="admin-label" style={{ marginBottom: '16px', color: '#c9a84c' }}>Technical Data</div>
                    <div className="form-grid-2">
                      {field('Total Area', 'area', { placeholder: '250 sqm' })}
                      {field('Dimensions', 'dimensions', { placeholder: '15m x 20m' })}
                    </div>
                    <div className="form-grid-2" style={{ marginTop: '12px' }}>
                      {field('Bedrooms', 'bedrooms', { type: 'number' })}
                      {field('Bathrooms', 'bathrooms', { type: 'number' })}
                    </div>
                    <div className="form-grid-2" style={{ marginTop: '12px' }}>
                      {field('Stories', 'stories', { type: 'number' })}
                      {field('Garage/Parking', 'garage', { type: 'number' })}
                    </div>
                    <div className="form-grid-2" style={{ marginTop: '12px' }}>
                      {field('Apartments Label', 'apartments', { placeholder: 'e.g. 11 Apartments', required: false })}
                      {field('Penthouses Label', 'penthouses', { placeholder: 'e.g. 1 Penthouse', required: false })}
                    </div>
                    <div className="admin-field" style={{ marginTop: '12px' }}>
                      <label className="admin-label">Duplex Layout</label>
                      <label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#bbb' }}>
                        <input
                          type="checkbox"
                          checked={!!formData.duplex}
                          onChange={e => setFormData({ ...formData, duplex: e.target.checked })}
                        />
                        <span>Mark this product as duplex</span>
                      </label>
                    </div>
                  </div>

                  {imageField('Main Thumbnail', 'imageUrl', 'Upload main cover image')}

                  <div className="admin-field">
                    <label className="admin-label">Gallery Images (comma separated)</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <textarea 
                        className="admin-input" 
                        value={(Array.isArray(formData.images) ? formData.images : []).join(', ') || ''} 
                        onChange={e => setFormData({...formData, images: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})} 
                        rows={2}
                        style={{ flex: 1 }}
                      />
                      <label className="upload-btn-icon" style={{ height: 'auto', padding: '0 12px' }}>
                        <Upload size={16} />
                        <input type="file" hidden accept="image/*" onChange={e => handleFileUpload(e, 'images', true)} />
                      </label>
                    </div>
                  </div>

                  <div className="admin-field">
                    <label className="admin-label">Key Features (comma separated)</label>
                    <input 
                      className="admin-input" 
                      placeholder="Open Concept, Master Suite, Large Porch..."
                      value={(Array.isArray(formData.features) ? formData.features : []).join(', ') || ''} 
                      onChange={e => setFormData({...formData, features: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})} 
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="admin-field">
                      <label className="admin-label">File Types (comma separated)</label>
                      <input
                        className="admin-input"
                        placeholder="CAD + PDF, PDF"
                        value={(Array.isArray(formData.fileTypes) ? formData.fileTypes : []).join(', ') || ''}
                        onChange={e => setFormData({...formData, fileTypes: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})}
                      />
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Drawing Options (comma separated)</label>
                      <input
                        className="admin-input"
                        placeholder="Architectural Drawings, Structural Drawings..."
                        value={(Array.isArray(formData.drawingOptions) ? formData.drawingOptions : []).join(', ') || ''}
                        onChange={e => setFormData({...formData, drawingOptions: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="admin-field">
                      <label className="admin-label">Trust Points (comma separated)</label>
                      <input
                        className="admin-input"
                        placeholder="Instant digital delivery, 100% money guarantee..."
                        value={(Array.isArray(formData.trustPoints) ? formData.trustPoints : []).join(', ') || ''}
                        onChange={e => setFormData({...formData, trustPoints: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})}
                      />
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Rooms Included (comma separated)</label>
                      <input
                        className="admin-input"
                        placeholder="Master Bedroom, Kitchen, Living Room..."
                        value={(Array.isArray(formData.roomsIncluded) ? formData.roomsIncluded : []).join(', ') || ''}
                        onChange={e => setFormData({...formData, roomsIncluded: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})}
                      />
                    </div>
                  </div>

                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="admin-label" style={{ marginBottom: '16px', color: '#c9a84c' }}>Drawing Sets</div>
                    <div className="form-grid-2">
                      <div className="admin-field">
                        <label className="admin-label">Architectural (comma separated)</label>
                        <textarea className="admin-input resize-none" rows={3} value={formData.drawingSets?.architectural?.join(', ') || ''} onChange={e => setFormData({...formData, drawingSets: { ...formData.drawingSets, architectural: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) }})} />
                      </div>
                      <div className="admin-field">
                        <label className="admin-label">Structural (comma separated)</label>
                        <textarea className="admin-input resize-none" rows={3} value={formData.drawingSets?.structural?.join(', ') || ''} onChange={e => setFormData({...formData, drawingSets: { ...formData.drawingSets, structural: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) }})} />
                      </div>
                    </div>
                    <div className="form-grid-2" style={{ marginTop: '12px' }}>
                      <div className="admin-field">
                        <label className="admin-label">Electrical (comma separated)</label>
                        <textarea className="admin-input resize-none" rows={3} value={formData.drawingSets?.electrical?.join(', ') || ''} onChange={e => setFormData({...formData, drawingSets: { ...formData.drawingSets, electrical: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) }})} />
                      </div>
                      <div className="admin-field">
                        <label className="admin-label">Mechanical (comma separated)</label>
                        <textarea className="admin-input resize-none" rows={3} value={formData.drawingSets?.mechanical?.join(', ') || ''} onChange={e => setFormData({...formData, drawingSets: { ...formData.drawingSets, mechanical: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) }})} />
                      </div>
                    </div>
                    <div className="admin-field" style={{ marginTop: '12px' }}>
                      <label className="admin-label">BOQ (comma separated)</label>
                      <textarea className="admin-input resize-none" rows={3} value={formData.drawingSets?.boq?.join(', ') || ''} onChange={e => setFormData({...formData, drawingSets: { ...formData.drawingSets, boq: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) }})} />
                    </div>
                  </div>

                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="admin-label" style={{ marginBottom: '16px', color: 'var(--color-gold)', display: 'flex', justifyContent: 'space-between' }}>
                      Construction Cost Tiers
                      <button type="button" onClick={() => setFormData({...formData, estimateTiers: [...(Array.isArray(formData.estimateTiers) ? formData.estimateTiers : []), { name: '', total: '', items: [] }]})} style={{ background: 'none', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', fontSize: '10px', fontWeight: 700 }}>+ ADD TIER</button>
                    </div>
                    {estimateTiers.map((tier, i) => (
                      <div key={i} style={{ marginBottom: '12px', padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px auto', gap: '8px', alignItems: 'center' }}>
                          <input className="admin-input" placeholder="Tier name (e.g. Standard)" value={tier.name} onChange={e => {
                            const tiers = estimateTiers.map((t, idx) => idx === i ? { ...t, name: e.target.value } : t);
                            setFormData({...formData, estimateTiers: tiers});
                          }} />
                          <input className="admin-input" placeholder="Total (e.g. $1,152,094)" value={tier.total} onChange={e => {
                            const tiers = estimateTiers.map((t, idx) => idx === i ? { ...t, total: e.target.value } : t);
                            setFormData({...formData, estimateTiers: tiers});
                          }} />
                          <button type="button" onClick={() => setFormData({...formData, estimateTiers: estimateTiers.filter((_, idx) => idx !== i)})} className="card-action-btn del" style={{ padding: '8px' }}><Trash2 size={12} /></button>
                        </div>
                        <div className="admin-field" style={{ marginTop: '10px', marginBottom: 0 }}>
                          <label className="admin-label">Tier Items (one per line: Label | Cost)</label>
                          <textarea
                            className="admin-input resize-none"
                            rows={4}
                            placeholder="Substructure | $253,925"
                            value={(Array.isArray(tier.items) ? tier.items : []).map((item: any) => `${item.label || ''} | ${item.cost || ''}`).join('\n')}
                            onChange={e => {
                              const tiers = estimateTiers.map((t, idx) => idx === i
                                ? {
                                    ...t,
                                    items: e.target.value
                                      .split('\n')
                                      .map((line: string) => line.trim())
                                      .filter(Boolean)
                                      .map((line: string) => {
                                        const [label, ...costParts] = line.split('|');
                                        return { label: label?.trim() || '', cost: costParts.join('|').trim() || '' };
                                      })
                                      .filter((item: EstimateTierItem) => item.label && item.cost),
                                  }
                                : t);
                              setFormData({...formData, estimateTiers: tiers});
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    {(Array.isArray(formData.estimateTiers) ? formData.estimateTiers : []).length === 0 && <div style={{ fontSize: '11px', color: '#444', textAlign: 'center' }}>No estimate tiers added</div>}
                  </div>

                  <div className="admin-field">
                    <label className="admin-label">FAQs (one per line, format: Question | Answer)</label>
                    <textarea
                      className="admin-input resize-none"
                      rows={4}
                      placeholder="Can this design be customized? | Yes, we can adapt it to your site."
                      value={productFaqs.map((faq) => `${faq.question || ''} | ${faq.answer || ''}`).join('\n')}
                      onChange={e => setFormData({
                        ...formData,
                        faqs: e.target.value
                          .split('\n')
                          .map((line: string) => line.trim())
                          .filter(Boolean)
                          .map((line: string) => {
                            const [question, ...answerParts] = line.split('|');
                            return {
                              question: question?.trim() || '',
                              answer: answerParts.join('|').trim() || '',
                            };
                          })
                          .filter((faq: ProductFaqForm) => faq.question && faq.answer)
                      })}
                    />
                  </div>

                  {textarea('Description', 'description', 'Describe this design…')}

                  {formData.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={formData.imageUrl} alt="preview" className="image-preview" />
                  )}
                </>)}

                {/* ── TESTIMONIALS ── */}
                {activeTab === 'testimonials' && (<>
                  <div className="form-grid-2">
                    {field('Client Name', 'name', { placeholder: 'James Mwangi' })}
                    {field('Role / Title', 'role', { placeholder: 'CEO · Dar es Salaam' })}
                  </div>
                  {imageField('Avatar URL', 'avatar', 'Upload client photo')}
                  {textarea('Review Text', 'text', 'What the client said…')}
                  <div className="admin-field">
                    <label className="admin-label">Star Rating (1–5)</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {[1,2,3,4,5].map(n => (
                        <button
                          key={n} type="button"
                          onClick={() => setFormData({ ...formData, stars: n })}
                          style={{
                            width: 40, height: 40, borderRadius: 8, border: 'none',
                            background: testimonialStars >= n ? 'rgba(201,168,76,.2)' : 'rgba(255,255,255,.04)',
                            color: testimonialStars >= n ? '#c9a84c' : '#444',
                            fontSize: 18, cursor: 'pointer', transition: 'all .15s',
                          }}
                        >★</button>
                      ))}
                    </div>
                  </div>
                  {formData.avatar && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={formData.avatar} alt="avatar preview" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(201,168,76,.3)' }} />
                  )}
                </>)}

                {/* ── MATERIALS ── */}
                {activeTab === 'materials' && (<>
                  <div className="form-grid-2">
                    {field('Range Title', 'title', { placeholder: 'e.g. MONTEO+' })}
                    {field('Category', 'category', { placeholder: 'e.g. Melamine Faced Board' })}
                  </div>
                  {imageField('Brand Logo URL', 'logo', 'Upload brand logo')}
                  {imageField('Hero Image URL', 'heroImage', 'Upload main lifestyle image')}
                  {textarea('Description', 'description', 'Describe this material range…')}

                  {/* Tech Specs */}
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="admin-label" style={{ marginBottom: '16px', color: '#fbbf24', display: 'flex', justifyContent: 'space-between' }}>
                      Technical Specifications
                      <button type="button" onClick={() => setFormData({...formData, techSpecs: [...(Array.isArray(formData.techSpecs) ? formData.techSpecs : []), {label: '', value: ''}]})} style={{ background: 'none', border: 'none', color: '#fbbf24', cursor: 'pointer', fontSize: '10px' }}>+ ADD SPEC</button>
                    </div>
                    {(Array.isArray(formData.techSpecs) ? formData.techSpecs : []).map((spec: any, i: number) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '8px', marginBottom: '8px' }}>
                        <input className="admin-input" placeholder="Label (e.g. Finish)" value={spec.label} onChange={e => {
                          const s = (Array.isArray(formData.techSpecs) ? formData.techSpecs : []).map((item: any, idx: number) => idx === i ? { ...item, label: e.target.value } : item);
                          setFormData({...formData, techSpecs: s});
                        }} />
                        <input className="admin-input" placeholder="Value (e.g. Natural Touch)" value={spec.value} onChange={e => {
                          const s = (Array.isArray(formData.techSpecs) ? formData.techSpecs : []).map((item: any, idx: number) => idx === i ? { ...item, value: e.target.value } : item);
                          setFormData({...formData, techSpecs: s});
                        }} />
                        <button type="button" onClick={() => setFormData({...formData, techSpecs: (Array.isArray(formData.techSpecs) ? formData.techSpecs : []).filter((_: any, idx: number) => idx !== i)})} className="card-action-btn del"><Trash2 size={12} /></button>
                      </div>
                    ))}
                  </div>

                  {/* Color Range Swatches */}
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="admin-label" style={{ marginBottom: '16px', color: '#fbbf24', display: 'flex', justifyContent: 'space-between' }}>
                      Colour Range Swatches
                      <button type="button" onClick={() => setFormData({...formData, swatches: [...(Array.isArray(formData.swatches) ? formData.swatches : []), {name: '', image: '', look: '', brand: '', finish: ''}]})} style={{ background: 'none', border: 'none', color: '#fbbf24', cursor: 'pointer', fontSize: '10px' }}>+ ADD SWATCH</button>
                    </div>
                    {(Array.isArray(formData.swatches) ? formData.swatches : []).map((swatch: any, i: number) => (
                      <div key={i} style={{ border: '1px solid rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', marginBottom: '12px', background: 'rgba(255,255,255,0.01)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '8px', marginBottom: '8px' }}>
                          <input className="admin-input" placeholder="Swatch Name" value={swatch.name} onChange={e => {
                            const s = (Array.isArray(formData.swatches) ? formData.swatches : []).map((item: any, idx: number) => idx === i ? { ...item, name: e.target.value } : item);
                            setFormData({...formData, swatches: s});
                          }} />
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <input className="admin-input" placeholder="Image URL" value={swatch.image} onChange={e => {
                              const s = (Array.isArray(formData.swatches) ? formData.swatches : []).map((item: any, idx: number) => idx === i ? { ...item, image: e.target.value } : item);
                              setFormData({...formData, swatches: s});
                            }} />
                            <label className="upload-btn-icon" style={{ width: '38px', height: '38px' }}>
                              <Upload size={14} />
                              <input type="file" hidden accept="image/*" onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const tid = toast.loading('Uploading swatch...');
                                const upData = new FormData(); upData.append('file', file);
                                const res = await fetch('/api/upload', { method: 'POST', body: upData });
                                const resJson = await res.json();
                                if (resJson.success) {
                                  const s = (Array.isArray(formData.swatches) ? formData.swatches : []).map((item: any, idx: number) => idx === i ? { ...item, image: resJson.url } : item);
                                  setFormData({...formData, swatches: s});
                                  toast.success('Uploaded ✓', { id: tid });
                                } else toast.error('Upload failed', { id: tid });
                              }} />
                            </label>
                          </div>
                          <button type="button" onClick={() => setFormData({...formData, swatches: (Array.isArray(formData.swatches) ? formData.swatches : []).filter((_: any, idx: number) => idx !== i)})} className="card-action-btn del"><Trash2 size={12} /></button>
                        </div>
                        <div className="form-grid-2">
                          <input className="admin-input" placeholder="Look (e.g. Wood)" value={swatch.look} onChange={e => {
                            const s = (Array.isArray(formData.swatches) ? formData.swatches : []).map((item: any, idx: number) => idx === i ? { ...item, look: e.target.value } : item);
                            setFormData({...formData, swatches: s});
                          }} style={{ fontSize: '11px' }} />
                          <input className="admin-input" placeholder="Finish (e.g. Textured)" value={swatch.finish} onChange={e => {
                            const s = (Array.isArray(formData.swatches) ? formData.swatches : []).map((item: any, idx: number) => idx === i ? { ...item, finish: e.target.value } : item);
                            setFormData({...formData, swatches: s});
                          }} style={{ fontSize: '11px' }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Profile Images */}
                  <div className="admin-field">
                    <label className="admin-label">Profile Images (comma separated URLs)</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <textarea 
                        className="admin-input" 
                        value={(Array.isArray(formData.profiles) ? formData.profiles : []).join(', ')} 
                        onChange={e => setFormData({...formData, profiles: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})} 
                        rows={2}
                        style={{ flex: 1 }}
                      />
                      <label className="upload-btn-icon" style={{ height: 'auto', padding: '0 12px' }}>
                        <Upload size={16} />
                        <input type="file" hidden accept="image/*" onChange={e => handleFileUpload(e, 'profiles', true)} />
                      </label>
                    </div>
                  </div>
                </>)}


              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
                  {editingItem ? 'Save Changes' : 'Create Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </>
  );
}
