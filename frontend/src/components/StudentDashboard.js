import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Ad from "../components/ad/Ad";
import "./Styles/home.css";
import "../assets/Boarding.png";

function HomePage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  // Navigation handlers
  const handleBoardingClick = () => navigate("/boarding-list");
  const handleTaxiClick = () => navigate("/taxi-list");
  const handleMedicareClick = () => navigate("/medi-select");
  const handleShopClick = () => navigate("/shop-select");
  const handleRentingClick = () => navigate("/rent-items");
  const handleSkillSharingClick = () => navigate("/skill-list");

  const handleScrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="homepage-container">
      <Navbar setShowLogin={setShowLogin} />

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">UniTunes</h1>
          <h2 className="hero-subtitle">Smart Solutions for Smarter Undergraduates!</h2>
          <button className="hero-button" onClick={handleScrollToServices}>
            View Menu
          </button>
        </div>
      </header>

      {/* Services Section */}
      <section className="services-section" id="services">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          <div className="service-card" onClick={handleBoardingClick}>
            <div className="service-image-container">
              <img src="/images/Bording.jpg" alt="Boardings" className="service-image" />
            </div>
            <h3 className="service-title">Boardings</h3>
            <p className="service-description">Find the perfect accommodation near campus</p>
          </div>

          <div className="service-card" onClick={handleTaxiClick}>
            <div className="service-image-container">
              <img src="/images/Taxi.jpg" alt="Taxis" className="service-image" />
            </div>
            <h3 className="service-title">Taxis</h3>
            <p className="service-description">Book reliable rides at student-friendly rates</p>
          </div>

          <div className="service-card" onClick={handleMedicareClick}>
            <div className="service-image-container">
              <img src="/images/Medicine.jpg" alt="Medicare" className="service-image" />
            </div>
            <h3 className="service-title">Medicare</h3>
            <p className="service-description">Access healthcare services and medication</p>
          </div>

          <div className="service-card" onClick={handleShopClick}>
            <div className="service-image-container">
              <img src="/images/Food.jpg" alt="Shops" className="service-image" />
            </div>
            <h3 className="service-title">Shops</h3>
            <p className="service-description">Explore local eateries and campus stores</p>
          </div>

          <div className="service-card" onClick={handleRentingClick}>
            <div className="service-image-container">
              <img src="/images/Rental.jpg" alt="Renting" className="service-image" />
            </div>
            <h3 className="service-title">Renting</h3>
            <p className="service-description">Borrow equipment and essentials for your studies</p>
          </div>

          <div className="service-card" onClick={handleSkillSharingClick}>
            <div className="service-image-container">
              <img src="/images/Skill Sharing.jpg" alt="Skill Sharing" className="service-image" />
            </div>
            <h3 className="service-title">Skill Sharing</h3>
            <p className="service-description">Connect with peers for tutoring and skill exchange</p>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-section">
        <Ad />
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2 className="section-title">About UniTunes</h2>
          <p className="about-text">
            UniTunes is the ultimate campus companion designed specifically for undergraduate students.
            Our platform connects you with essential services to make your university life easier,
            more convenient, and more affordable.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        <div className="footer-content">
          <div className="footer-logo">UniTunes</div>
          <div className="footer-links">
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} UniTunes. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
