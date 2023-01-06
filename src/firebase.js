// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnsLHz7KjAF7qoYzQFcHGBUGMeOehpNiQ",
  authDomain: "realtor-8e0e8.firebaseapp.com",
  projectId: "realtor-8e0e8",
  storageBucket: "realtor-8e0e8.appspot.com",
  messagingSenderId: "217735371242",
  appId: "1:217735371242:web:b2dc7149235e4178b3ba93",
  measurementId: "G-F2RP33VFF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();