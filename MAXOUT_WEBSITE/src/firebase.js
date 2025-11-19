import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyA88dz0-fHXCoDxFkh__AyU6BpKw9BEhDs",
  authDomain: "maxout-c2601.firebaseapp.com",
  projectId: "maxout-c2601",
  storageBucket: "maxout-c2601.appspot.com", // ✅ fix: use .appspot.com not .firebasestorage.app
  messagingSenderId: "920759640574",
  appId: "1:920759640574:web:aaa692cfcc7b4c3b7aa0af",
  measurementId: "G-WF9GRFNPJ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth + Firestore
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

