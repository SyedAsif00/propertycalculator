import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0eHPMwcfMrutyt0JLYe166O2SDDi7Hgc",
  authDomain: "propertycalc123.firebaseapp.com",
  projectId: "propertycalc123",
  storageBucket: "propertycalc123.appspot.com",
  messagingSenderId: "801339610283",
  appId: "1:801339610283:web:b798693ead8c835e4513ee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore Database
const db = getFirestore(app);

const storage = getStorage(app);

// Export the authentication and database instances
export { auth, db, storage };
