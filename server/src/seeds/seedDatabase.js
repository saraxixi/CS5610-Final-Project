const mongoose = require('mongoose');
const Manuscript = require('../models/Manuscript');
const manuscriptData = require('./manuscriptData');

// MongoDB connection string - replace with your actual connection string
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dunhuang-manuscripts';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}) 
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
    mongoose.connection.close();
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();