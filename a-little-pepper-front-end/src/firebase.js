// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiuvifyHCxRkls2YL8qJ5gJYqvpGEcGxU",
  authDomain: "a-little-pepper-19adf.firebaseapp.com",
  projectId: "a-little-pepper-19adf",
  storageBucket: "a-little-pepper-19adf.appspot.com",
  messagingSenderId: "786759066785",
  appId: "1:786759066785:web:fab7a7087f9b0e493fbce0",
  measurementId: "G-V6QYCFQ07J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
