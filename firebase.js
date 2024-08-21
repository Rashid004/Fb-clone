/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
