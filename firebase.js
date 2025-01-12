// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDoD04AnZkO0MHOZwb5WzaJv03aYkuNVg",
  authDomain: "available-cli-e749a.firebaseapp.com",
  projectId: "available-cli-e749a",
  storageBucket: "available-cli-e749a.firebasestorage.app",
  messagingSenderId: "554085553312",
  appId: "1:554085553312:web:6c3c60c11c83cedd0d65c5",
  measurementId: "G-4MZ5F2B4PP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
