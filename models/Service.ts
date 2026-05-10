import { Schema, model, models } from 'mongoose';

const ServiceSchema = new Schema({
  serviceId: { type: String, required: true, unique: true }, // e.g., "01"
  title: { type: String, required: true },
  description: { type: String, required: true },
  iconName: { type: String, required: true }, // Store lucide icon name as string
  imageUrl: { type: String, required: true },
  order: { type: Number, default: 0 },
  processSteps: [{
    title: String,
    desc: String
  }],
  features_list: [{
    icon: String, // lucide icon name
    title: String,
    desc: String
  }],
  faqs: [{
    q: String,
    a: String
  }]
}, { timestamps: true });

// Ensure the model is updated even during hot-reloading in dev
if (models.Service) {
  delete models.Service;
}

const Service = model('Service', ServiceSchema);

export default Service;

