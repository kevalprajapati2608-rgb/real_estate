// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-e6944.firebaseapp.com",
  projectId: "real-estate-e6944",
  storageBucket: "real-estate-e6944.firebasestorage.app",
  messagingSenderId: "1030065692543",
  appId: "1:1030065692543:web:eb471d179126b83637844a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);