// src/firebase/auth.js

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🔹 Google Sign In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

// 🔹 Logout
export const logoutUser = async () => {
  await signOut(auth);
};

// 🔹 Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

export { auth };
