// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env_REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env_REACT_APP_FIREBASEAUTH_DOMAIN,
  projectId: process.env_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env_REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
