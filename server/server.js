import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import userRoutes from '../client/src/routes/userRoutes.js'
import artifactRoute from '../client/src/routes/artifactRoutes.js'
import caveRoutes from '../client/src/routes/caveRoutes.js'
import exhibitionRoutes from '../client/src/routes/exhibitionRoutes.js'
import chatRoutes from '../client/src/routes/chatRoutes.js'

const app = express();
app.use(cors());
app.use(express.json());


// Connect to MongoDB
const uri = process.env.MONGODB_URI
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas')
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })


// Test route
app.get('/', (req, res) => {
  res.send('Hello from Dunhuang Digital Museum backend!')
})

//CRUD
app.use('/api/artifacts', artifactRoute);
app.use('/api/caves', caveRoutes);
app.use('/api/users', userRoutes);
app.use('/api/exhibitions', exhibitionRoutes);
app.use('/api/chat', chatRoutes);

// Error handler
app.use((err, req, res) => {
  console.error(err.stack)
  res.status(500).json({ error: err.message })
});

// Start server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});
