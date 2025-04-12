import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import translationRoutes from './src/routes/translationRoutes.js';
dotenv.config();
import userRoutes from './src/routes/userRoutes.js';
import artifactRoute from './src/routes/artifactRoutes.js';
import manuscriptRoutes from './src/routes/manuscriptRoutes.js';
import exhibitionRoutes from './src/routes/exhibitionRoutes.js';
import chatRoutes from './src/routes/chatRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use('/assets', express.static(path.join(__dirname, 'client/src/assets')));
app.use('/api/translate', translationRoutes);

// MongoDB connection - removed deprecated options
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Add connection event listeners for better error handling
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error during runtime:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/artifacts', artifactRoute);
app.use('/api/manuscripts', manuscriptRoutes);
app.use('/api/exhibitions', exhibitionRoutes);
app.use('/api/chat', chatRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Hello from Dunhuang Digital Museum backend!');
});

// React frontend fallback route (should come after all API routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Gracefully close MongoDB connection on app termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to app termination');
  process.exit(0);
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});