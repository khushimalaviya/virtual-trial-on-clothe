import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/ContactUs.css";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaComment } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate Form Inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email address.";
    if (formData.message.length < 3) newErrors.message = "Message must be at least 10 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/api/contact", { // ✅ Use the correct endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        toast.error("Failed to send message. Please try again!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Left Section - Contact Form */}
        <div className="contact-card">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-subtitle">We'd love to hear from you!</p>

          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="text"
                name="name"
                className={`contact-input ${errors.name ? "input-error" : ""}`}
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input
                type="email"
                name="email"
                className={`contact-input ${errors.email ? "input-error" : ""}`}
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            {/* Message Input */}
            <div className="input-group">
              <FaComment className="icon" />
              <textarea
                name="message"
                className={`contact-textarea ${errors.message ? "input-error" : ""}`}
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && <p className="error-message">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <button className="contact-btn" type="submit">
              Send Message
            </button>
          </form>
        </div>

        {/* Right Section - Contact Details */}
        <div className="contact-info-section">
          <div className="info-box">
            <h3><FaMapMarkerAlt /> Address</h3>
            <p>XYZ Street, City Name, Country</p>
          </div>

          <div className="info-box">
            <h3><FaEnvelope /> E-Mail</h3>
            <p>info@example.com</p>
          </div>

          <div className="info-box">
            <h3><FaPhone /> Phone</h3>
            <p>+91 12345 67890</p>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default ContactUs;
