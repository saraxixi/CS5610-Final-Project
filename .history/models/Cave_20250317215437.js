// models/Cave.js
import mongoose from 'mongoose';

const caveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  creationPeriod: String,
  architecturalFeatures: String,
  significance: String, 
  artifacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artifact'
    }
  ],
}, {
  timestamps: true
});

export default mongoose.model('Cave', caveSchema);
