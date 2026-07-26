import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  initials: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  service: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, default: 5 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Review', reviewSchema);
