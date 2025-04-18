import mongoose from 'mongoose';

const artifactSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  images: {
    type: String,
    required: true
  },
  purchaseCount: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true
});

export default mongoose.model('Artifact', artifactSchema);
