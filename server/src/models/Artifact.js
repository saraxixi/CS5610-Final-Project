import mongoose from 'mongoose';

const artifactSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: { // the type of the artifact: pottery, sculpture, etc...
    type: String
  },
  era: String,
  description: String,
  location: String,
  images: {
    type: String,
    required: true
  },
  conservationStatus: String, // the conservation status of the artifact
  mural: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mural'
  }
}, {
  timestamps: true
});

export default mongoose.model('Artifact', artifactSchema);
