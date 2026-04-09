import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Main thumbnail
  images: [{ type: String }], // Gallery images
  
  // Technical Specifications
  planId: { type: String },
  area: { type: String }, // e.g. "250 sqm"
  dimensions: { type: String }, // e.g. "15m x 20m"
  bedrooms: { type: Number, default: 0 },
  bathrooms: { type: Number, default: 0 },
  stories: { type: Number, default: 1 },
  garage: { type: Number, default: 0 },
  
  // High-level features
  features: [{ type: String }],
  
  // Pricing & Packages
  basePrice: { type: Number },
  packages: [{
    name: { type: String }, // e.g. "Standard PDF Set"
    price: { type: Number },
    features: [{ type: String }] // What's in this package
  }],
}, { timestamps: true });

// Force deletion of the model in development to ensure schema changes are picked up
if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.Product;
}

const Product = models.Product || model('Product', ProductSchema);

export default Product;

