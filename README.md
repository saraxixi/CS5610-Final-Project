# Dunhuang Digital Museum
The Dunhuang Digital Museum will be an immersive virtual platform showcasing the artistic and cultural treasures of the Dunhuang murals.

# Website Link
https://dunhuang-museum.onrender.com

# Teams Menbers
- Xi Xi 
- Lian Liu
- Shuojun Chen

## Video Link

### iteration 2: 
- Lian Liu: https://youtu.be/-tr40KSYCRo
- Xi Xi: https://youtu.be/hMG4uQLy4kk
- Shuojun Chen: https://youtu.be/T6_ktecRWzY


###iteration 3: 
- Lian Liu: https://youtu.be/oToeS0dNUPI
- Xi Xi: 
- Shuojun Chen:


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

### Chatbot API
Openrouter: https://openrouter.ai/
Create account and copy paste the OPENROUTER_API_KEY to .env

## Firestore Collections and Data Model
Based on our MongoDB data modeling: https://console.firebase.google.com/project/dunhuang-2e99c/storage/dunhuang-2e99c.firebasestorage.app/files

### Artifacts Collection
- id: Unique artifact ID

- title, type, era, description, location

- images: Array of image URLs

### murals Collection
- id, name, creationPeriod, architectural Features, significance

- artifacts: Array of artifact references
- images: Array of image URLs

### Users Collection
- id, username, email, password

#### Example Data Models
- Sample Admin User Document 
```json
{
        "_id": "67ecc5ee92156e21cf9072ec",
        "username": "admin1",
        "email": "admin1@example.com",
        "password": "admin123",
        "role": "admin",
        "savedArtifacts": [],
        "createdAt": "2025-04-02T05:06:54.753Z",
        "updatedAt": "2025-04-02T05:06:54.753Z",
        "__v": 0
}
```

- Sample User Document 
```json
{
        "_id": "67ee4c386954b7644bc2635c",
        "username": "testuser1",
        "email": "user1@example.com",
        "password": "user123",
        "role": "user",
        "savedArtifacts": [],
        "createdAt": "2025-04-03T08:52:08.224Z",
        "updatedAt": "2025-04-03T08:52:08.224Z",
        "__v": 0
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
    </p>