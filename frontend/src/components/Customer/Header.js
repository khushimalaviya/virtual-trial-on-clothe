import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import "../../styles/Header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = () => {
      const user = localStorage.getItem("user");
      setIsAuthenticated(!!user);
    };

    window.addEventListener("storage", checkAuthStatus);
    checkAuthStatus(); // Check on initial render

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  // Handle Home button navigation
  const handleHomeNavigation = () => {
    closeMenu();
    if (isAuthenticated) {
      navigate("/dashboard"); // Redirect to dashboard if logged in
    } else {
      navigate("/"); // Redirect to home if not logged in
    }
  };

  // Handle protected navigation (only for restricted pages)
  const handleProtectedNavigation = (path) => {
    if (isAuthenticated) {
      navigate(path); // Allow navigation if authenticated
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
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
    // <nav className="navbar navbar-expand-lg py-3">
    <nav className="navbar navbar-dark navbar-expand-lg py-3" style={{ background: "linear-gradient(90deg, #695e61, #7d3c3c)" }}>

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
              <Link className="nav-link text-white fs-5 btn btn-link" to="/catalog" onClick={closeMenu}>
                Catalog
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link text-white fs-5 btn btn-link" to="/virtual-trial" onClick={closeMenu}>
                Virtual Trial
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link text-white fs-5 btn btn-link" to="/about" onClick={closeMenu}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-link text-white fs-5 btn btn-link" onClick={() => handleProtectedNavigation("/contact")}>
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
                {isAuthenticated ? (
                  <>
                    <li>
                      <button className="dropdown-item" onClick={() => handleProtectedNavigation("/myaccount")}>
                        My Account
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          localStorage.removeItem("user");
                          setIsAuthenticated(false);
                          navigate("/");
                          closeMenu();
                          window.dispatchEvent(new Event("storage"));
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link to="/login" className="dropdown-item" onClick={closeMenu}>
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}