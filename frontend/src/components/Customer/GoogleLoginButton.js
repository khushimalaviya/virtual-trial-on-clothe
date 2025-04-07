import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import googleIcon from "../../assets/google1.png";
import "../../styles/Login.css";

const firebaseConfig = {

  apiKey: "AIzaSyCPtnCQxFPYPqXXboCNmDwyWEbmLvQeBJU",

  authDomain: "virtual-trial.firebaseapp.com",

  projectId: "virtual-trial",

  storageBucket: "virtual-trial.firebasestorage.app",

  messagingSenderId: "241285884935",

  appId: "1:241285884935:web:a7f52979a5fe1f3da14ea2",

  measurementId: "G-GTNDXQ5G2Q"

};




const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const GoogleLogin = ({ onSuccess }) => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await fetch("http://localhost:5000/api/auth/google-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          googleId: user.uid,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        toast.success(`Welcome, ${userData.user.name}!`);
        if (onSuccess) onSuccess(userData.user); // ✅ Call onSuccess function
      } else {
        toast.error("Google login failed!");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google Sign-In Failed!");
    }
  };

  return (
    <button className="google-login-btn" onClick={handleGoogleLogin}>
      <img src={googleIcon} alt="Google Icon" className="google-icon" />
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
