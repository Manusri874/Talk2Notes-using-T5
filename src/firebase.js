// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx6nlCTZ6oYj24BHG3pqQ9z9WCbEe92vY",
  authDomain: "talk2notes-12e44.firebaseapp.com",
  projectId: "talk2notes-12e44",
  storageBucket: "talk2notes-12e44.firebasestorage.app",
  messagingSenderId: "263193692763",
  appId: "1:263193692763:web:f98e90ad80f630c3e4cd7e",
  measurementId: "G-P1228KMBJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
