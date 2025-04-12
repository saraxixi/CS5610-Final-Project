import mongoose from 'mongoose';

const muralschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  creationPeriod: String,
  architecturalFeatures: String,
  significance: String,
  category: {
    type: String,
    enum: ['Animal', 'Dance', 'Architecture', 'Flying'],
    required: true
  },
  images: {
    type: String,
    required: true
  },
  artifacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artifact'
    }
  ],
}, {
  timestamps: true
});

export default mongoose.model('mural', muralschema);
