# Dunhuang Digital Museum
The Dunhuang Digital Museum will be an immersive virtual platform showcasing the artistic and cultural treasures of the Dunhuang murals.

# Website Link
https://dunhuang-museum.onrender.com

# Teams Menbers
- Xi Xi 
- Lian Liu
- Shuojun Chen

## Video Link
### Demo
### iteration 2: 
- Lian Liu: https://youtu.be/-tr40KSYCRo
- Xi Xi: https://youtu.be/hMG4uQLy4kk
- Shuojun Chen: https://youtu.be/T6_ktecRWzY


### iteration 3: 
- Lian Liu: https://youtu.be/oToeS0dNUPI
- Xi Xi: https://youtu.be/_Mobo66Dm8Y
- Shuojun Chen: https://youtu.be/KBC3NWB9Tt4


## Features
- Authentication: Sign up, log in, and manage user sessions with role-based access for admins.
- AI Chatbot: Interact with an AI assistant to explore historical context and learn about artifacts and Dunhuang culture.
- Artifact Management: Admins can upload, edit, and organize artifact data with images and metadata.
- Digital Exhibitions: Create and curate virtual exhibitions showcasing selected artifacts and stories.
- Thematic Mural Collections: Browse murals organized by themes such as Animals, Dance, Architecture, and Flying Apsaras, stored in  MongoDB and Firebase.
- Manuscripts Section: Access and explore historical manuscripts with detailed information, stored in  MongoDB and Firebase.
- Profile Management: Edit personal profile information and view browsing or collection history.
- Admin Dashboard: Manage users, moderate AI responses, and maintain exhibitions through a centralized panel.
- Dynamic Translation: Add multi-language support to Chatbot using LLM technology.
- Static Translation: Implement Google Translate for all webpage text content.

## External API
### Chatbot API
Openrouter: https://openrouter.ai/
- We access Claude 3.7 Sonnet through OpenRouter's API for our chatbot and dynamic translation features
- Create an account and add your OPENROUTER_API_KEY to .env file
- Our implementation uses Claude 3.7 Sonnet for its advanced multilingual capabilities and reasoning performance

## Firestore Collections and Data Model
Based on our MongoDB data modeling: https://console.firebase.google.com/project/dunhuang-2e99c/storage/dunhuang-2e99c.firebasestorage.app/files

### 🏺 Artifacts Collection

Stores artifact product information.

**Fields:**
- `title` (String): Title of the artifact
- `about` (String): Short description or background
- `price` (Number): Price of the artifact
- `overview` (String): Detailed overview or highlights
- `images` (String): URL of the artifact image
- `createdAt` / `updatedAt`: Automatically generated timestamps

### Sample Artifacts Documents

```json
{
    "_id":{"$oid":"67fc74457a843b182e9675ac"},
    "title":"Colorful Lotus Ceramic Tea Cups",
    "about":"These ceramic cups draw inspiration from ancient temple pottery, blending modern color with classic lotus flower motifs. A serene addition to any tea ritual or decorative shelf.",
    "price":{"$numberDouble":"45.99"},
    "overview":"Elegant tea cups crafted with vibrant matte glaze and lotus embossing.",
    "images":"https://firebasestorage.googleapis.com/v0/b/dunhuang-c86fe.firebasestorage.app/o/artifacts%2Fcarousel2.png_1744598085021?alt=media&token=eda344a7-debf-4caa-bd61-aac530e0f65c",
    "createdAt":{"$date":{"$numberLong":"1744598085923"}},
    "updatedAt":{"$date":{"$numberLong":"1744598085923"}},
    "__v":{"$numberInt":"0"}
}
```
---

### 🖼️ Murals Collection

Represents murals and their classification details.

**Fields:**
- `title` (String): Title of the mural
- `period` (String): Historical period
- `description` (String): Description of the mural
- `category` (String): Main category (e.g., religious, decorative)
- `subcategory` (String): More specific classification
- `rating` (Number): Rating from 1 to 5
- `location` (String): Location of the mural
- `images` (Array of Strings): List of image URLs
- `createdAt`: Creation date (timestamp)

### Sample Murals Documents
```json
{
    "_id":{"$oid":"67fb02f1582e2a62fe8702c9"},
    "title":"Crouching Tiger",
    "period":"Northern Wei Dynasty (386-534 CE)",
    "description":"Crouching tiger depicted on the south wall of the main chamber in Mogao mural 285. The dynamic posture and naturalistic rendering of the tiger shows the artistic mastery of Northern Wei artists.",
    "category":"mural",
    "subcategory":"animal",
    "rating":{"$numberInt":"5"},"location":"South wall of the main chamber, Mogao Cave 285",
    "images":["https://firebasestorage.googleapis.com/v0/b/dunhuang-2e99c.firebasestorage.app/o/murals%2Fanimal%2Ftiger.png?alt=media&token=6b576700-d2fa-47a7-99bb-f5730179b780"]
}
```
---

### 📜 Manuscripts Collection

Contains ancient manuscript records.

**Fields:**
- `title` (String): Manuscript title
- `period` (String): Time period or dynasty
- `description` (String): Detailed description
- `category` (String): Main category
- `subcategory` (String): Sub-category
- `rating` (Number): Rating from 1 to 5
- `images` (Array of Strings): List of image URLs
- `createdAt`: Timestamp of creation

### Sample Manuscripts documents
```json
{
    "_id":{"$oid":"67fb02f1582e2a62fe8702c3"},
    "title":"Dunhuang Manuscripts",
    "period":"Northern Wei to Five Dynasties",
    "description":"Dunhuang manuscripts are treasures among ancient Chinese texts. After the discovery of manuscript scrolls in the Dunhuang Library mural in 1900, the long-hidden Dunhuang documents were scattered, and many complete manuscript scrolls were looted by foreign explorers. It wasn't until 1910 that the Qing Dynasty's Ministry of Education transported the remaining portions to Beijing.",
    "category":"manuscript",
    "subcategory":"buddhist text",
    "rating":{"$numberInt":"5"},
    "images":["https://firebasestorage.googleapis.com/v0/b/dunhuang-2e99c.firebasestorage.app/o/manuscripts%2Fdunhuang-manuscript.png?alt=media&token=a5c82e5c-b3a3-4f97-a929-d21c6aa0ca94"]
}
```
---

### 🖥️ Digital Exhibitions Collection

Manages digital exhibition data.

**Fields:**
- `title` (String): Title of the digital exhibition
- `theme` (String): Exhibition theme
- `image` (String): Banner or feature image URL
- `startDate` / `endDate` (Date): Exhibition period
- `location` (String): Location (physical or virtual)
- `narrative` (String): Exhibition introduction or narrative
- `createdAt` / `updatedAt`: Timestamps

### Sample Exhibitions Documents
```json
{
    "_id":{"$oid":"67fa272a014f83eae1208552"},
    "title":"Elegance of Tang",
    "theme":"Fashion of the Tang Dynasty",
    "image":"https://firebasestorage.googleapis.com/v0/b/dunhuang-c86fe.firebasestorage.app/o/exhibitionImages%2Fexhibition_1.jpg_1744447273788?alt=media&token=64d8f038-9e8c-4adc-9d49-7d322b243251",
    "startDate":{"$date":{"$numberLong":"1745107200000"}},
    "endDate":{"$date":{"$numberLong":"1745712000000"}},
    "location":"ROOM 25",
    "narrative":"The exhibition presents a diverse and enriching display featuring sketches, artistically reproduced garments, innovative fashion designs, videos, academic books, and cultural creative products. It is organized into six key sections: Compassion and Serenity: Bodhisattva Attire in Dunhuang, Pure Land Splendor: Heavenly Beings’ Attire in Dunhuang, Worldly Scenes: Secular Figures in Dunhuang Costume, Blooming Elegance: Patterns of Dunhuang Attire, Faithful Representation: Artistic Recreation of Dunhuang Clothing, and Innovation with Integrity: Contemporary Designs Inspired by Dunhuang Garments. Together, these sections offer a comprehensive view of Tang Dynasty clothing culture in Dunhuang, highlighting its rich cultural heritage and diverse decorative techniques. The exhibition serves as a valuable resource for scholars, designers, and creatives engaged in artistic practice and theoretical research.","createdAt":{"$date":{"$numberLong":"1744447274790"}},
    "updatedAt":{"$date":{"$numberLong":"1744447274790"}},
    "__v":{"$numberInt":"0"}}
```
---

### 👤 Users Collection

Stores user authentication and profile information.

**Fields:**
- `username` (String): Unique username
- `email` (String): User email address
- `password` (String): Encrypted password
- `role` (String): Role of the user (either `'user'` or `'admin'`)
- `avatar` (String): Avatar image URL (default provided)
- `savedArtifacts` (Array of ObjectId): References to saved artifacts
- `createdAt` / `updatedAt`: Timestamps

---

### 👥 Sample User Documents

#### Admin User
```json
{
  "_id": "67ecc5ee92156e21cf9072ec",
  "username": "admin1",
  "email": "admin1@example.com",
  "password": "admin123",
  "role": "admin",
  "savedArtifacts": [],
  "createdAt": "2025-04-02T05:06:54.753Z",
  "updatedAt": "2025-04-02T05:06:54.753Z"
}
```

#### Regular User
```json
{
  "_id": "67ee4c386954b7644bc2635c",
  "username": "testuser1",
  "email": "user1@example.com",
  "password": "user123",
  "role": "user",
  "savedArtifacts": [],
  "createdAt": "2025-04-03T08:52:08.224Z",
  "updatedAt": "2025-04-03T08:52:08.224Z"
}
```

## CRUD Operations
- Create
    - Users register

    - Admins add artifacts/murals and create exhibitions
- Read
    - Users browse and search through artifacts, murals, and exhibitions
    - Filters available by type, era, location
    - Real-time chatbot provides descriptive context

- Update
    - Users update their profile and saved preferences

    - Admins and contributors update artifact/mural metadata

    - Contributions go through a review system
- Delete
    - Admins can delete inappropriate content(exhibitions or artifacts)



## Contributions
- Xi Xi:
    - Developed the Chatbot feature using the OpenRouter API, enabling users to interact and ask questions about Dunhuang artifacts and murals

    - Deployed the entire web application with Vercel (frontend) and Render (backend), ensuring reliable online access

    - Merged frontend and backend ports into a single unified environment for smoother development and deployment

    - Designed and implemented the Profile Page, allowing users to view and manage their personal information

    - Collaborated on testing, debugging, and UI improvements to enhance overall user experience
        <p align="center">
    <img src="./src/xixi4.jpg" width="600" />
    <img src="./src/xixi1.png" width="600" />
    <img src="./src/xixi2.png" width="600" />
    <img src="./src/xixi3.png" width="600" />
    </p>
- Lian Liu: 
    - Set up backend framework using Express.js and MongoDB
    
    - Developed the Admin Panel for managing artifacts and exhibitions

    - Implemented CRUD logic (create, update, delete) with error handling

    - Designed role-based access (admin vs. user) and route protection

    - Built image preview and dynamic form logic for editing artifacts and exhibitions

    - Connected frontend to backend using Axios for full-stack integration

    -  Styled dashboard views with custom CSS to ensure visual clarity and consistency

    - Integrated with backend using Axios for full-stack functionality

    - Added responsive hero banners and unified layout styles across key pages:
    
        Studies, Animal Murals, Flying Murals, Dance, Architecture, Manuscripts, Exhibitions, Admin Panel

    - Implemented search page with dynamic query support (/search?q=) and structured result grouping

    - Added a static 5-star rating display for mural cards to enhance UX and prepare for future review features
    <p align="center">
    <img src="./src/liulian1.jpg" width="600"/>
    <img src="./src/liulian2.jpg" width="600">
    <img src="./src/liulian3.jpg" width="600">
    </p>

- Shuojun Chen:
    - Created robust Mongoose schemas for Manuscripts and Murals with detailed field specifications including validation requirements.

    - Developed comprehensive seed scripts to populate MongoDB with structured manuscript and mural data.

    - Set up Firebase storage for manuscripts and themed mural categories with organized folder structures.

    - Created the homepage with three distinct sections: murals, manuscripts, and co-created works.

    - Developed card-based components for manuscripts and murals displaying images and information.

    - Built API routes for manuscripts and murals collections, enabling data retrieval and filtering by subcategories.

    - Connected Mongoose models to routes, ensuring proper data validation and consistent formatting.

    - Implemented 10 languages' translations to the AI Chatbot through OpenRouter API.

    - Built and integrated the Google Translate widget for all static texts on the website.

    - Collaborated on testing, debugging, and UI improvements.
        <p align="center">
    <img src="./src/shuojun1.png" width="600" />
    <img src="./src/shuojun2.png" width="600" />
    <img src="./src/shuojun3.png" width="600" />
    <img src="./src/shuojun4.png" width="600" />
    </p>