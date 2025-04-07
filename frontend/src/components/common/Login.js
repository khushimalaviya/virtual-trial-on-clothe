import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../styles/Login.css";
import GoogleLogin from "../Customer/GoogleLoginButton";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // 🔍 Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔐 Handle Login
  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = {
          userId: data.userId,
          name: data.name,
          email: data.email,
          role: data.role,
          token: data.token,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        toast.success(`Welcome, ${data.name}!`);

        // Redirect based on role
        setTimeout(() => {
          if (data.role === "admin") {
            window.location.href = "http://localhost:3001/admin/dashboard"; // 🌐 external admin panel
          } else {
            navigate("/dashboard"); // 🏠 customer dashboard
          }
        }, 1000);

      } else {
        toast.error(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong. Please try again!");
    }
  };

  return (
    <div>
      <br /><br /><br /><br />
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Login</h2>
          <p className="login-subtitle">Access your account securely</p>

          <GoogleLogin
            onSuccess={(userData) => {
              const { userId, name, email, token, role } = userData;
              // localStorage.setItem("user", JSON.stringify(userData));
              // ✅ Store user data including role
              localStorage.setItem("user", JSON.stringify({ userId, name, email, role, token }));

              console.log(localStorage);
              toast.success(`Welcome, ${userData.name}!`);
              setTimeout(() => {
                if (userData.role === "admin") {
                  window.location.href = "http://localhost:3001/admin/dashboard";
                } else {
                  navigate("/dashboard");
                }
              }, 500);
            }}
            onError={(error) => console.error("Login Error:", error)}
          />

          <br />
          <p className="or">--- or ---</p>

          {/* 📧 Email Input */}
          <input
            type="email"
            className={`login-input ${errors.email ? "input-error" : ""}`}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          {/* 🔒 Password Input */}
          <input
            type="password"
            className={`login-input ${errors.password ? "input-error" : ""}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}

          <br /><br />
          {/* 🚀 Login Button */}
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <br /><br />

          {/* 🔗 Sign Up Link */}
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>

          <ToastContainer />
        </div>
      </div>
      <br /><br /><br />
    </div>
  );
};

export default Login;
