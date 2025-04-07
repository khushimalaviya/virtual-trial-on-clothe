import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Admin/ProfileDropDown.css";

export default function ProfileDropDown() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const handleProfile = () => {
    navigate("/admin/account");
  };

  const handleSettings = () => {
    navigate("/admin/settings");
  };

  return (
    <div className="profile-dropdown">
      <p onClick={handleProfile} style={{ cursor: "pointer" }}>👤 Profile</p>
      <p onClick={handleSettings} style={{ cursor: "pointer" }}>⚙ Settings</p>
      <p onClick={handleSignOut} style={{ cursor: "pointer" }}>🚪 Sign Out</p>
    </div>
  );
}