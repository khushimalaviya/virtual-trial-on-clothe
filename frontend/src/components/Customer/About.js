import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/About.css";
import aboutImage from "../../assets/img.jpg"; // Replace with the correct path

export default function About() {
  return (
    <div className="about-page">
      <br/><br/><br/><br/><br/>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>
            About <span>Fashion Trial</span>
          </h1>
          <p>Revolutionizing the way you shop with AI-powered virtual try-ons.</p>
        </div>
      </section>

      {/* About Section with Image Left & Content Right */}
      <section className="about-content">
        <div className="about-container">
          <div className="about-image" data-aos="fade-right">
            <img src={aboutImage} alt="Virtual Fashion Try-On" />
          </div>
          <div className="about-text" data-aos="fade-left">
            <h2>Who We Are</h2>
            <p>
              We are a team of passionate fashion and tech enthusiasts dedicated 
              to transforming online shopping with cutting-edge virtual try-on experiences.
            </p>
            <p>
              Our AI-driven solutions offer a seamless shopping experience, ensuring a perfect 
              fit every time, reducing return rates, and making fashion more accessible.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>What We Offer</h2>
        <div className="features-list">
          <div className="feature-box" data-aos="zoom-in">
            <span>👗</span>
            <h3>Virtual Try-On</h3>
          </div>
          <div className="feature-box" data-aos="zoom-in">
            <span>📏</span>
            <h3>Smart Size Recommendations</h3>
          </div>
          <div className="feature-box" data-aos="zoom-in">
            <span>🎨</span>
            <h3>3D Outfit Visualization</h3>
          </div>
          <div className="feature-box" data-aos="zoom-in">
            <span>✨</span>
            <h3>Personalized Styling Suggestions</h3>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us" data-aos="fade-up">
        <h2>Why Choose Us?</h2>
        <p>
          Our technology ensures accurate fitting, smarter shopping, and reduces return rates. 
          Say goodbye to shopping guesswork and hello to a perfect fit every time!
        </p>
      </section>

      {/* Sustainability Section */}
      <section className="sustainability" data-aos="fade-up">
        <h2>Our Commitment to Sustainability</h2>
        <p>
          By promoting virtual trials, we help reduce fashion waste, minimize 
          unnecessary returns, and support eco-friendly shopping.
        </p>
      </section>
    </div>
  );
}