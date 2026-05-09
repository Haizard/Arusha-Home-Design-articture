import mongoose, { Schema, model, models } from 'mongoose';

const TechSpecSchema = new Schema({
  label: { type: String, required: true }, // e.g. "Substrate"
  value: { type: String, required: true }, // e.g. "NobleCore™"
});

const SwatchSchema = new Schema({
  name: { type: String, required: true }, // e.g. "Thornbury"
  image: { type: String, required: true }, // High-res swatch image
  look: { type: String }, // e.g. "Delight"
  brand: { type: String }, // e.g. "Monteo+"
  finish: { type: String }, // e.g. "MelaWood SupaTexture"
});

const MaterialRangeSchema = new Schema({
  title: { type: String, required: true }, // e.g. "MONTEO+"
  category: { type: String, required: true }, // e.g. "Melamine Faced Board"
  description: { type: String },
  logo: { type: String }, // URL to brand logo
  heroImage: { type: String }, // Main lifestyle image for the series
  techSpecs: [TechSpecSchema],
  swatches: [SwatchSchema],
  profiles: [{ type: String }], // Cross-section images
}, { timestamps: true });

// Ensure changes are picked up in development
if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.MaterialRange;
}

const MaterialRange = models.MaterialRange || model('MaterialRange', MaterialRangeSchema);

export default MaterialRange;
