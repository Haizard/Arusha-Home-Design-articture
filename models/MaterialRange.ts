import mongoose, { Schema, model, models } from 'mongoose';

const TechSpecSchema = new Schema({
  label: { type: String, required: true }, // e.g. "Substrate"
  value: { type: String, required: true }, // e.g. "NobleCore™"
});

const SwatchSchema = new Schema({
  name: { type: String, required: true }, // e.g. "Thornbury"
  image: { type: String, required: true }, // High-res swatch image
  category: { type: String }, // e.g. "Woodgrains", "Solid Colours"
  look: { type: String }, // e.g. "Delight"
  brand: { type: String }, // e.g. "Monteo+"
  finish: { type: String }, // e.g. "MelaWood SupaTexture"
});

const DownloadSchema = new Schema({
  label: { type: String, required: true },
  url: { type: String, required: true },
});

const LookGalleryImageSchema = new Schema({
  image: { type: String, required: true },
  alt: { type: String },
  caption: { type: String },
});

const LookCategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String },
  description: { type: String },
  coverImage: { type: String },
  gallery: [LookGalleryImageSchema],
});

const LookGroupSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String },
  description: { type: String },
  coverImage: { type: String },
  categories: [LookCategorySchema],
});

const MaterialRangeSchema = new Schema({
  title: { type: String, required: true }, // e.g. "MONTEO+"
  category: { type: String, required: true }, // e.g. "Melamine Faced Board"
  description: { type: String },
  logo: { type: String }, // URL to brand logo
  heroImage: { type: String }, // Main lifestyle image for the series
  howItIsMade: {
    description: { type: String },
    videoUrl: { type: String }, // YouTube/Vimeo link
  },
  downloads: [DownloadSchema],
  techSpecs: [TechSpecSchema],
  swatches: [SwatchSchema],
  lookGroups: [LookGroupSchema],
  profiles: [{ type: String }], // Cross-section images
}, { timestamps: true });

// Ensure changes are picked up in development
if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.MaterialRange;
}

const MaterialRange = models.MaterialRange || model('MaterialRange', MaterialRangeSchema);

export default MaterialRange;
