// src/seeds/seedDatabase.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { manuscriptData } from './manuscriptData.js';
import { muralData } from './muralData.js';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try multiple potential .env file locations
const potentialPaths = [
  path.join(__dirname, '../../.env'),              // server/.env
  path.join(__dirname, '../../../.env'),           // project root .env
  path.join(__dirname, '../.env'),                 // server/src/.env
  path.join(__dirname, '.env')                     // server/src/seeds/.env
];

let envLoaded = false;

for (const envPath of potentialPaths) {
  if (fs.existsSync(envPath)) {
    console.log(`Found .env file at: ${envPath}`);
    dotenv.config({ path: envPath });
    envLoaded = true;
    break;
  }
}

if (!envLoaded) {
  console.log('No .env file found in common locations. Attempting default dotenv loading...');
  dotenv.config();
}

// Seed function
const seedDatabase = async () => {
  try {
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      console.error('ERROR: MONGODB_URI environment variable is not defined!');
      console.log('Please make sure your .env file contains the MongoDB connection string.');
      console.log('Checked these locations for .env file:');
      potentialPaths.forEach(path => console.log(` - ${path}`));
      process.exit(1);
    }
    
    console.log('Connecting to MongoDB...');
    
    // Connect with increased timeouts
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 60000, // 60 seconds
      socketTimeoutMS: 90000, // 90 seconds
      connectTimeoutMS: 60000, // 60 seconds
    });
    
    console.log('MongoDB Connected successfully');
    console.log(`Connected to database: ${mongoose.connection.db.databaseName}`);
    
    // Clear and seed manuscripts
    console.log('Clearing existing manuscripts...');
    const manuscriptResult = await mongoose.connection.db.collection('manuscripts').deleteMany({});
    console.log(`Deleted ${manuscriptResult.deletedCount} existing manuscripts`);

    console.log('Inserting new manuscripts...');
    const insertManuscriptResult = await mongoose.connection.db.collection('manuscripts').insertMany(manuscriptData);
    console.log(`${insertManuscriptResult.insertedCount} manuscripts added to the database`);
    
    // Clear and seed murals
    console.log('Clearing existing murals...');
    const muralResult = await mongoose.connection.db.collection('murals').deleteMany({});
    console.log(`Deleted ${muralResult.deletedCount} existing murals`);
    
    console.log('Inserting new murals...');
    const insertMuralResult = await mongoose.connection.db.collection('murals').insertMany(muralData);
    console.log(`${insertMuralResult.insertedCount} murals added to the database`);
    
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