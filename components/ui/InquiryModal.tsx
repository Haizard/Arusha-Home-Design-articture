"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Loader2, Phone, Mail, User } from 'lucide-react';
import { addInquiry } from '@/app/actions/admin';
import toast from 'react-hot-toast';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    _id: string;
    title: string;
  };
}

export default function InquiryModal({ isOpen, onClose, project }: InquiryModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in the "${project.title}" design. Please provide more details regarding the architectural drawings and construction estimates.`
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addInquiry({
        projectId: project._id,
        projectName: project.title,
        ...formData
      });
      setSubmitted(true);
      toast.success("Inquiry sent successfully!");
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    } catch (error) {
      toast.error("Failed to send inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="inquiry-overlay" style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="inquiry-modal"
            style={{ 
              width: 'min(500px, 95vw)', 
              background: '#111', 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '20px', 
              padding: '2.5rem',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
            }}
          >
            <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
              <X size={20} />
            </button>

            {!submitted ? (
              <>
                <div style={{ marginBottom: '2rem' }}>
                  <h2 className="font-display" style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem' }}>Inquire <em style={{ color: 'var(--color-gold)' }}>Design</em></h2>
                  <p style={{ color: '#888', fontSize: '13px' }}>Tell us about your project and our lead architect will get back to you within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="input-group">
                    <User size={14} className="input-icon" />
                    <input 
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="modal-input"
                    />
                  </div>

                  <div className="input-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="input-group">
                      <Mail size={14} className="input-icon" />
                      <input 
                        required
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="modal-input"
                      />
                    </div>
                    <div className="input-group">
                      <Phone size={14} className="input-icon" />
                      <input 
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="modal-input"
                      />
                    </div>
                  </div>

                  <div className="input-group" style={{ height: 'auto' }}>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Tell us more about your requirements..."
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="modal-input"
                      style={{ height: 'auto', padding: '1rem' }}
                    />
                  </div>

                  <button 
                    disabled={submitting}
                    className="btn-primary" 
                    style={{ width: '110%', marginLeft: '-5%', background: 'var(--gradient-gold)', color: '#000', border: 'none', padding: '1.25rem', marginTop: '1rem', justifyContent: 'center' }}
                  >
                    {submitting ? <Loader2 className="animate-spin" size={20} /> : <><Send size={16} /> Send Inquiry</>}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <CheckCircle2 size={60} color="var(--color-gold)" style={{ margin: '0 auto 1.5rem' }} />
                <h3 className="font-display" style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>Message Received</h3>
                <p style={{ color: '#888' }}>Thank you for your interest in <strong>{project.title}</strong>. Our team will contact you shortly.</p>
              </div>
            )}

            <style jsx>{`
              .input-group {
                position: relative;
                width: 100%;
                background: #000;
                border: 1px solid rgba(255,255,255,0.08);
                border-radius: 12px;
                display: flex;
                align-items: center;
                transition: border-color 0.3s;
              }
              .input-group:focus-within {
                border-color: var(--color-gold);
              }
              .input-icon {
                margin: 0 1rem;
                color: #555;
              }
              .modal-input {
                background: none;
                border: none;
                color: #fff;
                padding: 1rem 1rem 1rem 0;
                font-size: 14px;
                width: 100%;
                outline: none;
              }
              .modal-input::placeholder { color: #444; }
            `}</style>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
