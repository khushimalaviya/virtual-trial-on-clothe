import React, { useState } from "react";
import "../../styles/Admin/AdminNavbar.css";
import { FaSearch, FaUsers, FaBell } from "react-icons/fa";
import ProfileDropDown from "./ProfileDropDown";

export default function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="navbar1">
      <div className="navbar-left">
        <FaSearch className="icon" />
        <input type="text" placeholder="Search..." className="search-box" />
      </div>
      <div className="navbar-right">
        <FaUsers className="icon" />
        <FaBell className="icon" />
        <div className="profile-wrapper">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Admin"
            className="profile-pic"
            onClick={toggleDropdown}
          />
          {showDropdown && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
}