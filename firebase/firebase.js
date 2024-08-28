/** @format */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCEmr2Evr3iOuQhb-gTAtCe4deijE2BJmQ",
  authDomain: "fb-clone-7cad7.firebaseapp.com",
  projectId: "fb-clone-7cad7",
  storageBucket: "fb-clone-7cad7.appspot.com",
  messagingSenderId: "337780618716",
  appId: "1:337780618716:web:cd08bec0ce5ad081c48b19",
  measurementId: "G-50G5RMDE8P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();
