import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Track login state (important for refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Google Sign-in
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
