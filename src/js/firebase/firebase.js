// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKXaoOZEJRM3MbZ8M3xc6W5OiSV7BzJRU",
  authDomain: "dicoding-story-app-bc744.firebaseapp.com",
  projectId: "dicoding-story-app-bc744",
  storageBucket: "dicoding-story-app-bc744.appspot.com",
  messagingSenderId: "1036420532172",
  appId: "1:1036420532172:web:6ccbe25a73886500aeff69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };