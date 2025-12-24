// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 🔹 Firebase config (yours stays the same)
const firebaseConfig = {
  apiKey: "AIzaSyCpMaFwayMgTG98-TOee8jW3Jreq6I3MPc",
  authDomain: "wcg-new-year.firebaseapp.com",
  projectId: "wcg-new-year",
  storageBucket: "wcg-new-year.firebasestorage.app",
  messagingSenderId: "250664588308",
  appId: "1:250664588308:web:31cf6da0644100fd508301",
  measurementId: "G-DQN36L36EZ",
};

// 🔹 Initialize Firebase
export const app = initializeApp(firebaseConfig);

// 🔹 Services
export const db = getFirestore(app);
export const auth = getAuth(app);
