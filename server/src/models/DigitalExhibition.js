import mongoose from 'mongoose';

const exhibitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  narrative: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('DigitalExhibition', exhibitionSchema);
