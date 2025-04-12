// src/seeds/seedDatabase.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { manuscriptData } from './manuscriptData.js';

dotenv.config();

// MongoDB connection string
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dunhuang-manuscripts';

// Seed function
const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    
    // Connect with increased timeouts
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 60000, // 60 seconds
      socketTimeoutMS: 90000, // 90 seconds
      connectTimeoutMS: 60000, // 60 seconds
    });
    
    console.log('MongoDB Connected successfully');
    console.log(`Connected to database: ${mongoose.connection.db.databaseName}`);
    
    console.log('Clearing existing manuscripts...');
    // Use the direct connection rather than the model for deletion
    const result = await mongoose.connection.db.collection('manuscripts').deleteMany({});
    console.log(`Deleted ${result.deletedCount} existing manuscripts`);

    console.log('Inserting new manuscripts...');
    // Insert directly using the connection
    const insertResult = await mongoose.connection.db.collection('manuscripts').insertMany(manuscriptData);
    console.log(`${insertResult.insertedCount} manuscripts added to the database`);
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    console.error(error.stack);
    
    // Try to close the connection if it's open
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to error');
    }
    
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();