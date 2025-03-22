import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  
  // the artifacts that the user has saved...
  savedArtifacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artifact'
    }
  ],
  // personal information...
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);
