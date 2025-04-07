import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Homepage.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaMagic, FaCamera, FaShoppingBag, FaTshirt, FaUpload } from "react-icons/fa";

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <>
      {/* Background Video Section */}
      <div className="video-container">
        <video autoPlay muted loop playsInline className="background-video">
          <source src="/videos/fashion.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title" data-aos="fade-down">
              Experience the Future of Fashion with AI
            </h1>
            <p className="hero-subtitle" data-aos="fade-up">
              Transform your wardrobe with our AI-powered virtual try-on and personalized styling.
            </p>
            <div className="hero-buttons">
              <button onClick={() => navigate("/login")} className="primary-btn">
                <FaUpload className="button-icon" /> Start Virtual Try-On
              </button>
              <button onClick={() => navigate("/login")} className="secondary-btn">
                Explore Latest Trends
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="line">
        We enable consumers to visualize and interact with fashion, creating digital experiences of the future.
      </div>

      {/* Metaverse Fashion Section */}
      <section className="metaverse-fashion container">
        <div className="row align-items-center">
          <div className="col-md-6 text-content" data-aos="fade-right">
            <h2 style={{ color: "chocolate" }}>Virtual Try-On</h2>
            <p>
              Experience the future of fashion with our AI-driven virtual try-on technology. Upload your image and see how different outfits look on you in real-time, without stepping into a store.
            </p>
            <p>
              Our advanced AI analyzes your body type, skin tone, and style preferences to recommend the best fashion choices for you.
            </p>
            <button onClick={() => navigate("/login")} className="try-now-btn">
              TRY NOW
            </button>
          </div>
          <div className="col-md-6" data-aos="fade-left">
            {/* <video autoPlay muted loop playsInline className="metaverse-video" height={400}>
              <source src="/videos/antla_opt.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}
            <img src="/images/trial.jpg" height={400}/>
          </div>
        </div>
      </section>

      {/* AI Style Advisor Section */}
{/* <section className="ai-style-advisor container">
  <div className="row align-items-center">
    <div className="col-md-6" data-aos="fade-right">
      <video autoPlay muted loop playsInline className="style-advisor-video">
        <source src="/videos/style-advisor.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div className="col-md-6 text-content" data-aos="fade-left">
      <h2>AI-Powered Style Advisor</h2>
      <p>
        Discover outfits that match your personality, skin tone, and body type with our smart AI recommendations. 
        No more guessing—get personalized style suggestions tailored just for you.
      </p>
      <p>
        Our AI fashion expert analyzes your preferences and trends to curate the perfect look for any occasion.
      </p>
      <button onClick={() => navigate("/style-advisor")} className="style-advisor-btn">
        GET STYLE ADVICE
      </button>
    </div>
  </div>
</section> */}


      {/* Features Section */}
      <section className="features-section container">
        <h2 className="section-title" data-aos="fade-right">Why Choose Our Fashion Platform?</h2>
        <div className="row justify-content-center section-content">
          {[
            { icon: <FaMagic />, title: "AI-Powered Styling", desc: "Discover styles tailored to your unique preferences." },
            { icon: <FaTshirt />, title: "3D Virtual Try-On", desc: "Visualize outfits on your body with realistic 3D models." },
            { icon: <FaShoppingBag />, title: "Personalized Fashion Advisor", desc: "Receive expert advice based on your style and body type." },
            { icon: <FaCamera />, title: "Instant Outfit Matching", desc: "Effortlessly mix and match items for perfect looks." },
          ].map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay={100 * index}>
              <div className="feature-card">
                {feature.icon}
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section container">
        <h2 className="section-title" data-aos="fade-left">Get Started in Three Simple Steps</h2>
        <div className="row justify-content-center section-content">
          {["Upload Your Photo", "Select Your Style", "Customize Your Look"].map((title, index) => (
            <div key={index} className="col-md-4" data-aos="zoom-in" data-aos-delay={200 * index}>
              <div className="step-card">
                <div className="step-number">{index + 1}</div><br /><br /><br />
                <h3>{title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
