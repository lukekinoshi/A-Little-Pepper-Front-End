// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs16kD5f-BuK0ZuWFx8_tIxkmZCXxbD7E",
  authDomain: "a-little-pepper.firebaseapp.com",
  projectId: "a-little-pepper",
  storageBucket: "a-little-pepper.appspot.com",
  messagingSenderId: "698962632123",
  appId: "1:698962632123:web:61722a6227fa7d3f4f389e",
  measurementId: "G-R9KQN2F9KT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
