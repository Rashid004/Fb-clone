/** @format */
"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthUserContext = createContext({ authUser: null, isLoading: true });

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setIsLoading(false);
  };

  const updateUserProfile = async (user) => {
    if (!user) return null;

    const userRef = doc(db, "users", user.uid);

    try {
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // If the user doesn't exist in the "users" collection, create a new document
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          userName: user.displayName || "User",
          imageUrl: user.photoURL || "/profile.png",
        });
      }

      const userData = (await getDoc(userRef)).data();
      return userData;
    } catch (error) {
      console.error("Error updating user profile:", error);
      // If there's an error, return a basic user object
      return {
        uid: user.uid,
        email: user.email,
        userName: user.displayName || "User",
        imageUrl: user.photoURL || "/profile.png",
      };
    }
  };

  const authStateChange = async (user) => {
    setIsLoading(true);
    if (!user) {
      clear();
      return;
    }
    const userData = await updateUserProfile(user);
    setAuthUser(userData);
    setIsLoading(false);
  };

  const signOut = () => {
    authSignOut(auth).then(() => clear());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChange);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    isLoading,
    signOut,
  };
}

export const AuthUserProvider = ({ children }) => {
  const auth = useFirebaseAuth();

  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};

export const useAuth = () => useContext(AuthUserContext);
