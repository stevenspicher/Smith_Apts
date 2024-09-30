// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAh5t8_-momEb4wkbBQpu7tDBRP32w3XNA",
    authDomain: "smithapts-71630.firebaseapp.com",
    projectId: "smithapts-71630",
    storageBucket: "smithapts-71630.appspot.com",
    messagingSenderId: "656660729064",
    appId: "1:656660729064:web:179c17a4e94343c5ba8d5d",
    measurementId: "G-DVPXEVTL93"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();

export { db, app };