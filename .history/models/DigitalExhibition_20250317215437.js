// models/DigitalExhibition.js
import mongoose from 'mongoose';

const exhibitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  theme: String,
  curator: String,
  featuredArtifacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artifact'
    }
  ],
  startDate: Date,
  endDate: Date,
  narrative: String
}, {
  timestamps: true
});

export default mongoose.model('DigitalExhibition', exhibitionSchema);
