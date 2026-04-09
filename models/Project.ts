import mongoose, { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // Architecture, Interior, etc.
  location: { type: String, required: true },
  imageUrl: { type: String, required: true },
  gallery: [{ type: String }], // Array of image URLs
  blueprints: [{ type: String }], // Array of technical drawing URLs
  specifications: {
    year: String,
    area: String,
    team: [String],
    client: String,
    materials: [String]
  },
  drawingSets: {
    rooms: [String],
    architectural: [String],
    structural: [String],
    mechanical: [String]
  },
  description: { type: String },
  constructionCost: { type: String },
  features: [String], // Drawing sets or amenities included
  featured: { type: Boolean, default: false },
}, { timestamps: true });

const Project = models.Project || model('Project', ProjectSchema);

export default Project;
