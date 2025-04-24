import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/ForgotPassword.css";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {

    const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSendOTP = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Enter a valid email address");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/fpassword/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("OTP sent to your email");
        setStep(2);
      } else {
        toast.error(data.error || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/fpassword/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("OTP verified");
        setStep(3);
      } else {
        toast.error(data.error || "Invalid OTP");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/fpassword/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Password reset successful");
        setStep(1);
        setEmail("");
        setOtp("");
        setNewPassword("");

         // ✅ Redirect to login after delay
         setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error(data.error || "Reset failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        {step === 1 && (
          <>
            <h2 className="forgot-title">Forgot Password</h2>
            <input
              className="forgot-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="forgot-btn" onClick={handleSendOTP}>Send OTP</button>
            <p className="forgot-login-link">
              Remember your password? <a href="/login">Login here</a>
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="forgot-title">Enter OTP</h2>
            <input
              className="forgot-input"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="forgot-btn" onClick={handleVerifyOTP}>Verify OTP</button>
            <p className="forgot-login-link">
              Back to <a href="/login">Login</a>
            </p>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="forgot-title">Reset Password</h2>
            <input
              className="forgot-input"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="forgot-btn" onClick={handleResetPassword}>Reset Password</button>
            <p className="forgot-login-link">
              Back to <a href="/login">Login</a>
            </p>
          </>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgotPassword;