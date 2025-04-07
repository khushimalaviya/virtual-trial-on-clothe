// Import Firebase SDK modules
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyCPtnCQxFPYPqXXboCNmDwyWEbmLvQeBJU",

  authDomain: "virtual-trial.firebaseapp.com",

  projectId: "virtual-trial",

  storageBucket: "virtual-trial.firebasestorage.app",

  messagingSenderId: "241285884935",

  appId: "1:241285884935:web:a7f52979a5fe1f3da14ea2",

  measurementId: "G-GTNDXQ5G2Q"

};







// ✅ Prevent duplicate app initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
