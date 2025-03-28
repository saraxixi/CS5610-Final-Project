// models/DigitalExhibition.js
import mongoose from 'mongoose';

const exhibitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  theme: String,
  curator: String, // the user who created the exhibition
  featuredArtifacts: [ // the artifacts list that are featured in the exhibition
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artifact'
    }
  ],
  startDate: Date,
  endDate: Date,
  narrative: String // the story/intro of the exhibition...
// multimediaResources: [String] links to videos, audio, etc...
}, {
  timestamps: true
});

export default mongoose.model('DigitalExhibition', exhibitionSchema);
