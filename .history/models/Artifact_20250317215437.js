import mongoose from 'mongoose';

const artifactSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  era: String,
  description: String,
  location: String,
  images: [String],
  cave: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cave'
  }
}, {
  timestamps: true
});

export default mongoose.model('Artifact', artifactSchema);
