'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getServices, addService, updateService, deleteService,
  getProjects, addProject, updateProject, deleteProject,
  getProducts, addProduct, updateProduct, deleteProduct,
  getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial,
  getInquiries, deleteInquiry,
} from '@/app/actions/admin';
import {
  LayoutDashboard, Briefcase, ShoppingBag, MessageSquare, Mail,
  Plus, Pencil, Trash2, X, Save, ChevronRight,
  AlertCircle, Loader2, Database, CheckCircle2, RefreshCw,
  Image as ImageIcon, Home, Upload, Phone,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

type Tab = 'services' | 'projects' | 'products' | 'testimonials' | 'inquiries';

const NAV_ITEMS: { id: Tab; label: string; icon: any; color: string }[] = [
  { id: 'services',     label: 'Services',     icon: LayoutDashboard, color: '#c9a84c' },
  { id: 'projects',     label: 'Projects',     icon: Briefcase,       color: '#60a5fa' },
  { id: 'products',     label: 'Products',     icon: ShoppingBag,     color: '#a78bfa' },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare,   color: '#34d399' },
  { id: 'inquiries',    label: 'Inquiries',    icon: Mail,            color: '#f87171' },
];

const EMPTY_FORMS: Record<Tab, any> = {
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
    features: [], basePrice: 0, packages: [] 
  },
  testimonials: { name: '', role: '', text: '', avatar: '', stars: 5 },
  inquiries:    {},
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('services');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [dbStatus, setDbStatus] = useState<'checking'|'ok'|'error'>('checking');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
      let result: any[] = [];
      if (activeTab === 'services')     result = await getServices();
      else if (activeTab === 'projects')     result = await getProjects();
      else if (activeTab === 'products')     result = await getProducts();
      else if (activeTab === 'testimonials') result = await getTestimonials();
      else                                   result = await getInquiries();
      // Stringify ObjectIds to plain strings
      setData(JSON.parse(JSON.stringify(result)));
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openModal = (item: any = null) => {
    setEditingItem(item);
    setFormData(item ? { ...item } : { ...EMPTY_FORMS[activeTab] });
    setIsModalOpen(true);
  };
  const closeModal = () => { setIsModalOpen(false); setEditingItem(null); setFormData({}); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const tid = toast.loading(editingItem ? 'Saving changes…' : 'Creating entry…');
    try {
      // Remove internal MongoDB keys for both creation and update
      const { _id, __v, createdAt, updatedAt, ...cleanData } = formData;

      if (activeTab === 'services') {
        editingItem ? await updateService(editingItem._id, cleanData) : await addService(cleanData);
      } else if (activeTab === 'projects') {
        editingItem ? await updateProject(editingItem._id, cleanData) : await addProject(cleanData);
      } else if (activeTab === 'products') {
        editingItem ? await updateProduct(editingItem._id, cleanData) : await addProduct(cleanData);
      } else {
        editingItem ? await updateTestimonial(editingItem._id, cleanData) : await addTestimonial(cleanData);
      }
      toast.success(editingItem ? 'Updated ✓' : 'Created ✓', { id: tid });
      closeModal();
      fetchData();
    } catch (err: any) {
      console.error('Submit error:', err);
      toast.error(err.message || 'Operation failed. Check all fields.', { id: tid });
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
      else                                   await deleteInquiry(id);
      toast.success('Deleted ✓', { id: tid });
      fetchData();
    } catch {
      toast.error('Delete failed', { id: tid });
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
          const currentArr = formData[key] || [];
          setFormData({ ...formData, [key]: [...currentArr, result.url] });
        } else {
          setFormData({ ...formData, [key]: result.url });
        }
        toast.success('Uploaded ✓', { id: tid });
      } else {
        throw new Error(result.message);
      }
    } catch (err: any) {
      toast.error(err.message || 'Upload failed', { id: tid });
    }
  };

  const imageField = (label: string, key: string, placeholder?: string) => (
    <div className="admin-field">
      <label className="admin-label">{label}</label>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={formData[key] ?? ''}
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
        value={formData[key] ?? ''}
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
        value={formData[key] ?? ''}
        onChange={e => setFormData({ ...formData, [key]: e.target.value })}
        placeholder={placeholder || ''}
        className="admin-input resize-none"
      />
    </div>
  );

  const activeNav = NAV_ITEMS.find(n => n.id === activeTab)!;

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
          display: flex; flex-direction: column; transition: width .3s ease;
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
        .admin-main { flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
        .admin-topbar {
          position: sticky; top: 0; z-index: 10;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 32px; height: 64px;
          background: rgba(6,6,8,.9); backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,.05);
        }
        .topbar-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #555; }
        .topbar-breadcrumb span { color: #999; }
        .admin-content { padding: 32px; }

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
          display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;
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
        .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .admin-field { display: flex; flex-direction: column; gap: 6px; }
        .admin-label { font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: #555; font-weight: 600; }
        .admin-input {
          background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
          border-radius: 10px; padding: 11px 14px; font-size: 13.5px; color: #e5e5e5;
          outline: none; transition: border-color .2s; width: 100%; font-family: inherit;
        }
        .admin-input:focus { border-color: rgba(201,168,76,.6); background: rgba(201,168,76,.03); }
        .admin-select {
          background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
          border-radius: 10px; padding: 11px 14px; font-size: 13.5px; color: #e5e5e5;
          outline: none; transition: border-color .2s; width: 100%; font-family: inherit; cursor: pointer;
        }
        .admin-select:focus { border-color: rgba(201,168,76,.6); }
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
      `}</style>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: '#1a1a1e', color: '#e5e5e5', border: '1px solid rgba(255,255,255,.1)', borderRadius: '10px', fontSize: '13px' },
        }}
      />

      <div className="admin-root">
        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-mark">A</div>
            <div>
              <div className="logo-text">Arusha Admin</div>
              <div className="logo-sub">Content Management</div>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-label">Content</div>
            {NAV_ITEMS.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                className={`nav-btn ${activeTab === id ? 'active' : ''}`}
                onClick={() => setActiveTab(id)}
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
                <div style={{ fontSize: 12, fontWeight: 600, color: dbStatus === 'ok' ? '#34d399' : dbStatus === 'error' ? '#f87171' : '#888' }}>
                  {dbStatus === 'ok' ? 'MongoDB Connected' : dbStatus === 'error' ? 'DB Disconnected' : 'Connecting…'}
                </div>
                <div style={{ fontSize: 10, color: '#333', marginTop: 1 }}>Atlas Cluster</div>
              </div>
              <Database size={13} color={dbStatus === 'ok' ? '#34d399' : '#555'} />
            </div>
            <Link href="/" target="_blank" className="nav-btn" style={{ marginTop: 6, textDecoration: 'none', display: 'flex' }}>
              <span className="nav-icon"><Home size={14} color="#555" /></span>
              View Site
              <ChevronRight size={13} style={{ marginLeft: 'auto', color: '#333' }} />
            </Link>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="admin-main">
          {/* Top bar */}
          <div className="admin-topbar">
            <div className="topbar-breadcrumb">
              <span>Admin</span>
              <ChevronRight size={13} />
              <span style={{ color: '#c9a84c', fontWeight: 600, textTransform: 'capitalize' }}>{activeTab}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button className="btn-ghost" onClick={fetchData} title="Refresh">
                <RefreshCw size={14} /> Refresh
              </button>
              {activeTab !== 'inquiries' && (
                <button className="btn-primary" onClick={() => openModal()}>
                  <Plus size={16} /> Add {activeTab.slice(0, -1)}
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
                {data.map((item) => (
                  <div key={item._id} className="item-card">
                    {activeTab === 'inquiries' ? (
                      <div className="card-body" style={{ padding: '1.5rem' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div className="card-tag" style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171' }}>Inquiry</div>
                            <button className="card-action-btn del" onClick={() => handleDelete(item._id)}><Trash2 size={12} /></button>
                         </div>
                         <div style={{ color: 'var(--color-gold)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                            Project: {item.projectName}
                         </div>
                         <div className="card-title">{item.name}</div>
                         <div className="card-desc" style={{ WebkitLineClamp: 4, marginBottom: '1rem' }}>{item.message}</div>
                         <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                               <Mail size={12} color="#555" /> {item.email}
                            </div>
                            {item.phone && (
                              <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                 <Phone size={12} color="#555" /> {item.phone}
                              </div>
                            )}
                            <div style={{ fontSize: '10px', color: '#444', marginTop: '4px' }}>
                               {new Date(item.createdAt).toLocaleString()}
                            </div>
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
                            <button className="card-action-btn del" title="Delete" onClick={() => handleDelete(item._id)}>
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
                      <button type="button" onClick={() => setFormData({...formData, processSteps: [...(formData.processSteps || []), {title: '', desc: ''}]})} style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer', fontSize: '10px' }}>+ ADD STEP</button>
                    </div>
                    {(formData.processSteps || []).map((step: any, i: number) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '8px', marginBottom: '8px', alignItems: 'start' }}>
                        <input className="admin-input" placeholder="Title" value={step.title} onChange={e => {
                          const steps = formData.processSteps.map((s: any, idx: number) => idx === i ? { ...s, title: e.target.value } : s);
                          setFormData({...formData, processSteps: steps});
                        }} />
                        <textarea className="admin-input" rows={1} placeholder="Description" value={step.desc} onChange={e => {
                          const steps = formData.processSteps.map((s: any, idx: number) => idx === i ? { ...s, desc: e.target.value } : s);
                          setFormData({...formData, processSteps: steps});
                        }} />
                        <button type="button" onClick={() => setFormData({...formData, processSteps: formData.processSteps.filter((_: any, idx: number) => idx !== i)})} className="card-action-btn del" style={{ padding: '8px' }}><Trash2 size={12} /></button>
                      </div>
                    ))}
                  </div>

                  {/* New: Features List */}
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="admin-label" style={{ marginBottom: '16px', color: '#c9a84c', display: 'flex', justifyContent: 'space-between' }}>
                      Specialized Features 
                      <button type="button" onClick={() => setFormData({...formData, features_list: [...(formData.features_list || []), {icon: 'Zap', title: '', desc: ''}]})} style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer', fontSize: '10px' }}>+ ADD FEATURE</button>
                    </div>
                    {(formData.features_list || []).map((feat: any, i: number) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr auto', gap: '8px', marginBottom: '8px', alignItems: 'start' }}>
                        <input className="admin-input" placeholder="Icon" value={feat.icon} onChange={e => {
                          const f = formData.features_list.map((item: any, idx: number) => idx === i ? { ...item, icon: e.target.value } : item);
                          setFormData({...formData, features_list: f});
                        }} />
                        <input className="admin-input" placeholder="Title" value={feat.title} onChange={e => {
                          const f = formData.features_list.map((item: any, idx: number) => idx === i ? { ...item, title: e.target.value } : item);
                          setFormData({...formData, features_list: f});
                        }} />
                        <input className="admin-input" placeholder="Desc" value={feat.desc} onChange={e => {
                          const f = formData.features_list.map((item: any, idx: number) => idx === i ? { ...item, desc: e.target.value } : item);
                          setFormData({...formData, features_list: f});
                        }} />
                        <button type="button" onClick={() => setFormData({...formData, features_list: formData.features_list.filter((_: any, idx: number) => idx !== i)})} className="card-action-btn del" style={{ padding: '8px' }}><Trash2 size={12} /></button>
                      </div>
                    ))}
                  </div>

                  {/* New: FAQs */}
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="admin-label" style={{ marginBottom: '16px', color: '#c9a84c', display: 'flex', justifyContent: 'space-between' }}>
                      FAQs
                      <button type="button" onClick={() => setFormData({...formData, faqs: [...(formData.faqs || []), {q: '', a: ''}]})} style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer', fontSize: '10px' }}>+ ADD FAQ</button>
                    </div>
                    {(formData.faqs || []).map((faq: any, i: number) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr auto', gap: '8px', marginBottom: '8px', alignItems: 'start' }}>
                        <input className="admin-input" placeholder="Question" value={faq.q} onChange={e => {
                          const f = formData.faqs.map((item: any, idx: number) => idx === i ? { ...item, q: e.target.value } : item);
                          setFormData({...formData, faqs: f});
                        }} />
                        <textarea className="admin-input" rows={1} placeholder="Answer" value={faq.a} onChange={e => {
                          const f = formData.faqs.map((item: any, idx: number) => idx === i ? { ...item, a: e.target.value } : item);
                          setFormData({...formData, faqs: f});
                        }} />
                        <button type="button" onClick={() => setFormData({...formData, faqs: formData.faqs.filter((_: any, idx: number) => idx !== i)})} className="card-action-btn del" style={{ padding: '8px' }}><Trash2 size={12} /></button>
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
                        value={formData.features ? formData.features.join(', ') : ''} 
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
                      <textarea className="admin-input" value={formData.gallery?.join(', ') || ''} onChange={e => setFormData({...formData, gallery: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})} rows={2} style={{ flex: 1 }} />
                      <label className="upload-btn-icon" style={{ height: 'auto', padding: '0 12px' }}>
                        <Upload size={16} />
                        <input type="file" hidden accept="image/*" onChange={e => handleFileUpload(e, 'gallery', true)} />
                      </label>
                    </div>
                  </div>
                  <div className="admin-field">
                    <label className="admin-label">Blueprint URLs (comma separated)</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <textarea className="admin-input" value={formData.blueprints?.join(', ') || ''} onChange={e => setFormData({...formData, blueprints: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})} rows={2} style={{ flex: 1 }} />
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

                  {/* Pricing Packages Area */}
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="admin-label" style={{ marginBottom: '16px', color: 'var(--color-gold)', display: 'flex', justifyContent: 'space-between' }}>
                      Pricing Packages
                      <button type="button" onClick={() => setFormData({...formData, packages: [...(formData.packages || []), {name: '', price: 0}]})} style={{ background: 'none', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', fontSize: '10px', fontWeight: 700 }}>+ ADD PACKAGE</button>
                    </div>
                    {(formData.packages || []).map((pkg: any, i: number) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 100px auto', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                        <input className="admin-input" placeholder="Package name (e.g. CAD Set)" value={pkg.name} onChange={e => {
                          const pkgs = formData.packages.map((p: any, idx: number) => idx === i ? { ...p, name: e.target.value } : p);
                          setFormData({...formData, packages: pkgs});
                        }} />
                        <input className="admin-input" type="number" placeholder="Price" value={pkg.price} onChange={e => {
                          const pkgs = formData.packages.map((p: any, idx: number) => idx === i ? { ...p, price: +e.target.value } : p);
                          setFormData({...formData, packages: pkgs});
                        }} />
                        <button type="button" onClick={() => setFormData({...formData, packages: formData.packages.filter((_: any, idx: number) => idx !== i)})} className="card-action-btn del" style={{ padding: '8px' }}><Trash2 size={12} /></button>
                      </div>
                    ))}
                    {(formData.packages || []).length === 0 && <div style={{ fontSize: '11px', color: '#444', textAlign: 'center' }}>No custom packages added</div>}
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
                  </div>

                  {imageField('Main Thumbnail', 'imageUrl', 'Upload main cover image')}

                  <div className="admin-field">
                    <label className="admin-label">Gallery Images (comma separated)</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <textarea 
                        className="admin-input" 
                        value={formData.images?.join(', ') || ''} 
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
                      value={formData.features ? formData.features.join(', ') : ''} 
                      onChange={e => setFormData({...formData, features: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})} 
                    />
                  </div>

                  {textarea('Description', 'description', 'Describe this design…')}
                  
                  {formData.imageUrl && (
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
                            background: formData.stars >= n ? 'rgba(201,168,76,.2)' : 'rgba(255,255,255,.04)',
                            color: formData.stars >= n ? '#c9a84c' : '#444',
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
