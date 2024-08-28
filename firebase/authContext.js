/** @format */

"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";

const AuthUserContext = createContext({ authUser: null, isLoading: true });

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setIsLoading(false);
  };

  const updateUserProfile = async (user) => {
    const userRef = doc(db, "users", user.uid);
    let userData = {
      uid: user.uid,
      email: user.email,
      userName: user.displayName || "User",
      imageUrl: user.photoURL || "",
    };

    try {
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, userData);
      } else {
        userData = userSnap.data();
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }

    return userData;
  };

  const authStateChange = async (user) => {
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
