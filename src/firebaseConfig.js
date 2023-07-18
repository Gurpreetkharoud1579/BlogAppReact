// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKQoqJBl200TADf_VlKglADY9BIHqgLF8",
  authDomain: "blog-app-116ad.firebaseapp.com",
  projectId: "blog-app-116ad",
  storageBucket: "blog-app-116ad.appspot.com",
  messagingSenderId: "592245185047",
  appId: "1:592245185047:web:6e85faa611bfc89465da52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);