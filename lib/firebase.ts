// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_YrmjcW3HK8vFXfET2Ut3yK75dU-180U",
  authDomain: "m-cash-57b24.firebaseapp.com",
  projectId: "m-cash-57b24",
  storageBucket: "m-cash-57b24.firebasestorage.app",
  messagingSenderId: "1059469147721",
  appId: "1:1059469147721:web:a6863f94d99483e21f8998",
  measurementId: "G-1ZQRR92K6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
