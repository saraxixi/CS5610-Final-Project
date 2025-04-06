// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);