// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwDaZs1wp7MX3C7eNx10JFNYtUyEEbzYw",
  authDomain: "meli-extra.firebaseapp.com",
  databaseURL: "https://meli-extra-default-rtdb.firebaseio.com",
  projectId: "meli-extra",
  storageBucket: "meli-extra.firebasestorage.app",
  messagingSenderId: "619193711122",
  appId: "1:619193711122:web:4c6848f5b0084590a936cb",
  measurementId: "G-E8HB95ZB0P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);