import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import "../../styles/Header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setIsAuthenticated(!!user);
      setUserRole(user?.role || null);
    };

    window.addEventListener("storage", checkAuthStatus);
    checkAuthStatus();

    return () => window.removeEventListener("storage", checkAuthStatus);
  }, []);

  const handleHomeNavigation = () => {
    closeMenu();
    isAuthenticated ? navigate("/dashboard") : navigate("/");
  };

  const handleProtectedNavigation = (path) => {
    isAuthenticated ? navigate(path) : navigate("/login");
    closeMenu();
  };

  useEffect(() => {
    const bootstrap = require("bootstrap");
    document.querySelectorAll(".dropdown-toggle").forEach((dropdown) => {
      new bootstrap.Dropdown(dropdown);
    });
  }, []);

  return (
    <nav
      className="navbar navbar-dark navbar-expand-lg py-3"
      style={{ background: "linear-gradient(90deg, #695e61, #7d3c3c)" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          Fashion Trial
        </Link>

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

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="nav-link text-white fs-5 btn btn-link" onClick={handleHomeNavigation}>
                Home
              </button>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white fs-5 btn btn-link" to="/autosizechart" onClick={closeMenu}>
                Try On
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white fs-5 btn btn-link" to="/about" onClick={closeMenu}>
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white fs-5 btn btn-link" to="/contact" onClick={closeMenu}>
                Contact
              </Link>
            </li>

            {/* Admin-only link */}
            {/* {userRole === "admin" && (
              <li className="nav-item">
                <Link className="nav-link text-white fs-5 btn btn-link" to="/admin-dashboard" onClick={closeMenu}>
                  Admin Panel
                </Link>
              </li>
            )} */}

            <li className="nav-item dropdown">
              {isAuthenticated ? (
                <>
                  <button
                    className="nav-link dropdown-toggle text-white fs-5 btn btn-dark rounded-pill px-3 d-flex align-items-center gap-2"
                    id="profileDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUser />
                    My Profile
                  </button>

                  <ul
                    className="dropdown-menu dropdown-menu-end dropdown-menu-dark shadow-lg rounded"
                    aria-labelledby="profileDropdown"
                  >
                    <li>
                      <button
                        className="dropdown-item d-flex align-items-center gap-2"
                        onClick={() => handleProtectedNavigation("/myaccount")}
                      >
                        <FaUser /> My Account
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item d-flex align-items-center gap-2"
                        onClick={() => {
                          localStorage.removeItem("user");
                          setIsAuthenticated(false);
                          setUserRole(null);
                          navigate("/");
                          closeMenu();
                          window.dispatchEvent(new Event("storage"));
                        }}
                      >
                        <FaTimes /> Logout
                      </button>
                    </li>
                  </ul>
                </>
              ) : (
                <Link
                  to="/login"
                  className="nav-link text-white fs-5 btn btn-outline-light rounded-pill px-3 d-flex align-items-center gap-2"
                  onClick={closeMenu}
                >
                  <FaUser />
                  Login
                </Link>
              )}
            </li>


          </ul>
        </div>
      </div>
    </nav>
  );
}
