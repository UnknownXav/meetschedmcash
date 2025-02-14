// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // For Firestore
// import { getDatabase } from "firebase/database"; // For Realtime Database

const firebaseConfig = {
    apiKey: "AIzaSyD_YrmjcW3HK8vFXfET2Ut3yK75dU-180U",
    authDomain: "m-cash-57b24.firebaseapp.com",
    projectId: "m-cash-57b24",
    storageBucket: "m-cash-57b24.firebasestorage.app",
    messagingSenderId: "1059469147721",
    appId: "1:1059469147721:web:a6863f94d99483e21f8998",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // For Firestore
// export const database = getDatabase(app); // For Realtime Database