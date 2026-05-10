import { Schema, model, models } from 'mongoose';

const TestimonialSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  avatar: { type: String, required: true },
  text: { type: String, required: true },
  stars: { type: Number, default: 5 },
}, { timestamps: true });

const Testimonial = models.Testimonial || model('Testimonial', TestimonialSchema);

export default Testimonial;
