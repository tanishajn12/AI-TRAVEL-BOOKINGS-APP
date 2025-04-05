// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirebase, getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: VITE_GOOGLE_FIREBASE_ID,
  authDomain: "travel-stories-7b3f5.firebaseapp.com",
  projectId: "travel-stories-7b3f5",
  storageBucket: "travel-stories-7b3f5.firebasestorage.app",
  messagingSenderId: "615187995944",
  appId: "1:615187995944:web:5ecfb8bc95bb2ae1f4c41d",
  measurementId: "G-4EBESCM5BP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);