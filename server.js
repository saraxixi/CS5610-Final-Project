import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import userRoutes from './routes/userRoutes.js'
import artifactRoute from './routes/artifactRoutes.js'
import caveRoutes from './routes/caveRoutes.js'
import exhibitionRoutes from './routes/exhibitionRoutes.js'


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas')
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })
  
  console.log("MongoDB URI:", process.env.MONGODB_URI);


// // test: GET /api/test
app.get('/', (req, res) => {
  res.send('Hello from Dunhuang Digital Museum backend!')
})

//CRUD
app.use('/api/artifacts', artifactRoute);
app.use('/api/caves', caveRoutes);
app.use('/api/users', userRoutes);
app.use('/api/exhibitions', exhibitionRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: err.message })
});

// Start server
// const PORT = process.env.PORT || 4000
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`)
// });
