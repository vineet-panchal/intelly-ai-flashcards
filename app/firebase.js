require("dotenv").config();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "intelly-ai-flashcards.firebaseapp.com",
  projectId: "intelly-ai-flashcards",
  storageBucket: "intelly-ai-flashcards.firebasestorage.app",
  messagingSenderId: "1063234988335",
  appId: "1:1063234988335:web:af7601845df7c7cfba19da"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
