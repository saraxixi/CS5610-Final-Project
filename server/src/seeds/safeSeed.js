// src/seeds/safeSeed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

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

// Define manuscript data
const manuscriptData = [
  {
    title: "Dunhuang Manuscripts",
    period: "Northern Wei to Five Dynasties",
    description: "Dunhuang manuscripts are treasures among ancient Chinese texts. After the discovery of manuscript scrolls in the Dunhuang Library Cave in 1900, the long-hidden Dunhuang documents were scattered, and many complete manuscript scrolls were looted by foreign explorers. It wasn't until 1910 that the Qing Dynasty's Ministry of Education transported the remaining portions to Beijing.",
    category: "manuscript",
    subcategory: "buddhist text",
    rating: 5,
    images: ["/assets/images/.png"]
  },
  {
    title: "Prajnaparamita Sutra",
    period: "Tang Dynasty (618-907 CE)",
    description: "Among the 12 ancient Tibetan 'Dunhuang Manuscripts' preserved in the Dunhuang City Archives, there are 7 copies of the 'Prajnaparamita Sutra,' in pothi format. When unfolded, the paper measures 71 cm long and 20 cm wide, with some portions missing. There are also 2 copies of the 'One Hundred Thousand Prajnaparamita Sutra' in pothi format, which unfold to 73 cm in length.",
    category: "manuscript",
    subcategory: "buddhist text",
    rating: 5,
    images: ["/assets/images/prajnaparamita.png"]
  },
  {
    title: "Bhaisajyaguru-vaidurya-prabharaja Sutra",
    period: "Northern Wei to Five Dynasties",
    description: "Bhaisajyaguru (Medicine Buddha) is a buddha in Buddhism believed to possess special healing and curative powers, and is worshipped as the Medicine Bodhisattva. This sutra describes the vows and powers of the Medicine Buddha, and how devotees can receive protection through faith and repentance. The Mogao Caves at Dunhuang preserved a large number of Buddhist texts.",
    category: "manuscript",
    subcategory: "buddhist text",
    rating: 5,
    images: ["/assets/images/medicine-buddha1.png"]
  },
  {
    title: "Bhaisajyaguru-vaidurya-prabharaja Sutra",
    period: "Northern Wei to Five Dynasties",
    description: "Manuscripts discovered in the Library Cave of Dunhuang Mogao Grottoes date from the Wei and Jin periods to the Song and Yuan dynasties, with the majority being Tang dynasty manuscripts. Those who copied sutras throughout history were mostly professional scribes, copyists, and monks skilled in writing. Some were hired, while others volunteered to copy. The primary focus when copying sutras was on the text itself, with accuracy being paramount.",
    category: "manuscript",
    subcategory: "buddhist text",
    rating: 5,
    images: ["/assets/images/medicine-buddha2.png"]
  },
  {
    title: "Lotus Sutra",
    period: "Northern Wei to Five Dynasties",
    description: "Tang dynasty calligraphy revered the 'Wang style.' The Dunhuang caves once housed copies of famous works such as Wang Xizhi's 'Zhan Jin Note' and 'Long Bao Note,' and Zhiyong's 'True and Cursive Thousand Character Classic Fragment.' Though few in number and fragmentary, they provide certain corroborating evidence. However, sutra calligraphy displays a distinct style in this context—focused on the text rather than emulating Wang's flowing style, it possesses a certain stern and powerful beauty. Based on excavated artifacts, Tang dynasty Dunhuang manuscripts generally feature elegant composition and vigorous brushwork.",
    category: "manuscript",
    subcategory: "buddhist text",
    rating: 5,
    images: ["/assets/images/lotus-sutra.png"]
  },
  {
    title: "True and Cursive Thousand Character Classic Fragment",
    period: "Northern Wei to Five Dynasties",
    description: "Although 'The True and Cursive Thousand Character Classic Fragment' is few in number and has defects, it provides us with certain evidence. However, the calligraphy of sutras reveals its style in this environment - focused on the text rather than resembling Wang's flowing style, it instead has a stern and forceful beauty. Judging from excavated artifacts, Tang dynasty Dunhuang manuscripts mostly feature elegant composition and vigorous brushwork, similar in style to Ouyang Xun and Yu Shinan.",
    category: "manuscript",
    subcategory: "caligraphy",
    rating: 5,
    images: ["/assets/images/thousand-character.png"]
  }
];

async function seedDatabase() {
  try {
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      console.error('ERROR: MONGODB_URI environment variable is not defined!');
      console.log('Please make sure your .env file contains the MongoDB connection string.');
      console.log('Checked these locations for .env file:');
      potentialPaths.forEach(path => console.log(` - ${path}`));
      process.exit(1);
    }
    
    console.log('MONGODB_URI is defined. Connecting to MongoDB...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 60000, // 60 seconds
      socketTimeoutMS: 90000, // 90 seconds
    });
    
    console.log('Connected to MongoDB successfully!');
    console.log(`Database name: ${mongoose.connection.db.databaseName}`);
    
    // Clear existing data
    console.log('Clearing existing manuscripts...');
    const deleteResult = await mongoose.connection.db.collection('manuscripts').deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing manuscripts`);
    
    // Insert data
    console.log('Inserting new manuscripts...');
    const result = await mongoose.connection.db.collection('manuscripts').insertMany(manuscriptData);
    console.log(`Inserted ${result.insertedCount} manuscripts successfully!`);
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
    process.exit(0);
  }
}

seedDatabase();