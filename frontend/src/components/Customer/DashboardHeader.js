import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import "../../styles/Header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Handle Home button navigation
  const handleHomeNavigation = () => {
    closeMenu();
    navigate("/dashboard"); // Always navigate to home
  };

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    closeMenu();
  };

  // 🛠 Manually initialize Bootstrap dropdown on mount
  useEffect(() => {
    const bootstrap = require("bootstrap");
    document.querySelectorAll(".dropdown-toggle").forEach((dropdown) => {
      new bootstrap.Dropdown(dropdown);
    });
  }, []);

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg py-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          Fashion Trial
        </Link>

        {/* Hamburger Icon */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="nav-link text-white fs-5 btn btn-link" onClick={handleHomeNavigation}>
                Home
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link text-white fs-5 btn btn-link" onClick={() => handleNavigation("/about")}>
                About
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link text-white fs-5 btn btn-link" onClick={() => handleNavigation("/contact")}>
                Contact
              </button>
            </li>

            {/* Profile Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle text-white fs-5 btn btn-dark"
                id="profileDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUser size={22} className="me-1" /> Profile
              </button>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="profileDropdown">
                <li>
                  <Link className="dropdown-item" to="/profile" onClick={closeMenu}>
                    My Account
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="dropdown-item" onClick={closeMenu}>
                    Login
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
