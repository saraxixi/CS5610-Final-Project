import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

import userRoutes from './src/routes/userRoutes.js';
import artifactRoute from './src/routes/artifactRoutes.js';
import caveRoutes from './src/routes/caveRoutes.js';
import exhibitionRoutes from './src/routes/exhibitionRoutes.js';
import chatRoutes from './src/routes/chatRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建 public/uploads 文件夹（如果不存在）
const uploadsPath = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
  console.log('Created "public/uploads/" folder');
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/users', userRoutes);
app.use('/api/artifacts', artifactRoute);
app.use('/api/caves', caveRoutes);
app.use('/api/exhibitions', exhibitionRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Dunhuang Digital Museum backend!');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
