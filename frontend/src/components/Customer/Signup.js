import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/Login.css";
import GoogleLogin from "./GoogleLoginButton"; // 🔒 Google Login Disabled

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [errors, setErrors] = useState({});

  // 🔍 Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Full Name is required.";
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email address.";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    if (!/^[0-9]{10}$/.test(contactNo)) newErrors.contactNo = "Enter a valid 10-digit contact number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle Signup
  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, contactNo }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Signup successful! Please login.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("Something went wrong. Please try again!");
    }
  };

  return (
    <div>
      <br/><br/><br/>
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign Up</h2>
        <p className="login-subtitle">Create your account</p>

        <GoogleLogin
          onSuccess={(userData) => {
            localStorage.setItem("user", JSON.stringify(userData));
            toast.success(`Welcome, ${userData.name}!`);
            setTimeout(() => navigate("/dashboard"), 1000);
          }}
        />

        <br />
        <h4 className="or">--------- or ---------</h4>

        <input
          type="text"
          className={`login-input ${errors.name ? "input-error" : ""}`}
          placeholder="Full Name"
          value={name}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[A-Za-z ]*$/.test(value) || value === "") {
              setName(value);
            }
          }}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}

        <input type="email" className={`login-input ${errors.email ? "input-error" : ""}`} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <input type="password" className={`login-input ${errors.password ? "input-error" : ""}`} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <p className="error-message">{errors.password}</p>}

        <input type="password" className={`login-input ${errors.confirmPassword ? "input-error" : ""}`} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

        <input
          type="text"
          className={`login-input ${errors.contactNo ? "input-error" : ""}`}
          placeholder="Contact Number"
          value={contactNo}
          maxLength="10"
          onChange={(e) => {
            const value = e.target.value;
            if (/^[6-9][0-9]{0,9}$/.test(value) || value === "") {
              setContactNo(value);
            }
          }}
        />

        {errors.contactNo && <p className="error-message">{errors.contactNo}</p>}

        <button className="login-btn" onClick={handleSignup}>Sign Up</button>

        <p className="signup-link">Already have an account? <Link to="/login">Login</Link></p>
      </div>
      
    </div><br/><br/><br/><br/>
    </div>
  );
};

export default Signup;