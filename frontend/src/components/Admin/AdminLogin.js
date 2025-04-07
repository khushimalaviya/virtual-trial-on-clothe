import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/Admin/AdminLogin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("❌ Email & Password required!");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("❌ Invalid email format!");
      return;
    }

    if (password.length < 6) {
      setError("❌ Password must be at least 6 characters!");
      return;
    }

    // Dummy Admin Authentication
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin/dashboard");  // ✅ Fix: Correct admin route
    } else {
      setError("❌ Invalid Admin Credentials!");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        {error && <p className="error-message">{error}</p>}

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}