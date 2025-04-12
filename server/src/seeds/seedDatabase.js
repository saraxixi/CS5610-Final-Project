import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Manuscript from '../models/Manuscript.js';
import { manuscriptData } from './manuscriptData.js';

dotenv.config();

// MongoDB connection string
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dunhuang-manuscripts';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  });

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Manuscript.deleteMany({});
    console.log('Previous data cleared');

    // Insert new data
    const manuscripts = await Manuscript.insertMany(manuscriptData);
    console.log(`${manuscripts.length} manuscripts added to the database`);
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();