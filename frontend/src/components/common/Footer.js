import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "../../styles/Footer.css"; 

export default function Footer() {
  // const location = useLocation();

  // if (location.pathname !== "/") {
  //   return null;
  // }

  return (
    <footer className="bg-dark text-center text-white py-4">
      <div className="container">
        {/* Our Mission Section */}
        <div className="mb-4">
          <h5 className="fw-bold">Our Mission</h5>
          <p className="small mx-auto" style={{ maxWidth: "600px" }}>
            We strive to bridge the gap between online and offline shopping by
            providing a realistic, accurate, and hassle-free virtual try-on experience.
            Our goal is to make fashion shopping more convenient, sustainable, and
            personalized for every individual.
          </p>
        </div>

        <p className="mb-3">&copy; 2025 Virtual Fashion Trial. All rights reserved.</p>

        {/* Social Media Icons */}
        <div className="social-icons d-flex justify-content-center gap-4 mb-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaFacebook size={28} aria-label="Facebook" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaInstagram size={28} aria-label="Instagram" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaTwitter size={28} aria-label="Twitter" />
          </a>
        </div>

        <p className="small">Made with ❤️ for fashion enthusiasts</p>
      </div>
    </footer>
  );
}
