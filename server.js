import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'


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

// Start server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
