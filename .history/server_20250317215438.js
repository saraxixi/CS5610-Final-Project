import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import User from './models/User.js'
import Artifact from './models/Artifact.js'
import Cave from './models/Cave.js'
import DigitalExhibition from './models/DigitalExhibition.js'


dotenv.config()


const app = express()


app.use(cors())
app.use(express.json())


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


// Route (GET)
app.get('/', (req, res) => {
  res.send('Hello from the Express + MongoDB server!')
})

// test: GET /api/test
app.get('/api/test', async (req, res) => {
    try {
      const artifacts = await Artifact.find()
      res.json(artifacts)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

// Start server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
