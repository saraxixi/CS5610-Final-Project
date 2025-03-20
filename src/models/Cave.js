// models/Cave.js
import mongoose from 'mongoose';

const caveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  creationPeriod: String,  // the period when the cave was created
  architecturalFeatures: String, // the architectural features of the cave
  significance: String, // the culture/history significance of the cave
  // the artifacts that are found in the cave...
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
