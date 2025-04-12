import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAENHC4a4yiPf9XkP04_qgE09Osi5muREw",
  authDomain: "dunhuang-c86fe.firebaseapp.com",
  projectId: "dunhuang-c86fe",
  storageBucket: "dunhuang-c86fe.firebasestorage.app",
  messagingSenderId: "58152294971",
  appId: "1:58152294971:web:5f7fb3147abcac436b1a1e",
  measurementId: "G-N25BQFYWDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);