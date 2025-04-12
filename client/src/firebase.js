// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhnkDeNHhAAxbr9TP-V8hLG2GC6wgSryw",
  authDomain: "dunhuang-2e99c.firebaseapp.com",
  projectId: "dunhuang-2e99c",
  storageBucket: "dunhuang-2e99c.appspot.com", // Changed from .firebasestorage.app to .appspot.com
  messagingSenderId: "211218442087",
  appId: "1:211218442087:web:df82b4866b4e16a39031c2",
  measurementId: "G-NR34JBBP1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Storage instead of Analytics for now
const storage = getStorage(app);

// Skip Analytics initialization for development
// const analytics = getAnalytics(app);
const analytics = null;

export { app, analytics, storage };