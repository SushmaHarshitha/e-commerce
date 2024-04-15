// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHOKyHg3bavioTr-A8wYQKAaAbyrqLb1A",
  authDomain: "e-commerce-6781d.firebaseapp.com",
  projectId: "e-commerce-6781d",
  storageBucket: "e-commerce-6781d.appspot.com",
  messagingSenderId: "827804542066",
  appId: "1:827804542066:web:4f497ec305d7608c03ceeb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;