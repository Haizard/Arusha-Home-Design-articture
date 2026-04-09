import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  projectName: { type: String },
  service: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'read', 'archived'] },
  createdAt: { type: Date, default: Date.now }
});

if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.Inquiry;
}

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
