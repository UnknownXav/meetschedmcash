// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPGCPYUF9kfcYrVppU0uZT77HjLpkViE0",
  authDomain: "mcash-cf324.firebaseapp.com",
  projectId: "mcash-cf324",
  storageBucket: "mcash-cf324.firebasestorage.app",
  messagingSenderId: "811274776544",
  appId: "1:811274776544:web:f55dddd3f69e5c1b7b0585",
  measurementId: "G-MHFHM6Q6GR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}