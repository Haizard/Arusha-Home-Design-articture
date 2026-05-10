import mongoose, { Schema, model, models } from 'mongoose';

const LookGalleryImageSchema = new Schema({
  image: { type: String, required: true },
  alt: { type: String },
  caption: { type: String },
});

const LookDesignSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  images: [{ type: String }],
  finish: { type: String },
  productRange: { type: String },
});

const LookProductRangeSchema = new Schema({
  name: { type: String, required: true },
  images: [{ type: String }],
  description: { type: String },
});

const LookCategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String },
  description: { type: String },
  coverImage: { type: String },
  coloursDesignsUsed: [LookDesignSchema],
  productRange: [LookProductRangeSchema],
  gallery: [LookGalleryImageSchema],
});

const LookSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String },
  description: { type: String },
  coverImage: { type: String },
  categories: [LookCategorySchema],
}, { timestamps: true });

if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.Look;
}

const Look = models.Look || model('Look', LookSchema);

export default Look;
