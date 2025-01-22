import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/Styles/Homepage.css";

function HomePage() {
  const navigate = useNavigate();

  // Function to handle navigation to the Boarding List page
  const handleBoardingClick = () => {
    navigate("/boarding-list");
  };

  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="header">
        <div className="menu-icon">☰</div>
        <input type="text" placeholder="Search" className="search-bar" />
        <div className="profile-icon">👤</div>
      </header>

      {/* Main Banner Section */}
      <section className="main-banner">
        <img
          width={600}
          height={600}
          src="/images/Logo.jpg"
          alt="Unitunes Logo"
          className="logo"
        />
      </section>

      {/* Ad Section */}
      <section className="ad-section">
        <h3>Ad</h3>
        <div className="ad-carousel">
          <img
            width={300}
            height={500}
            src="/images/A1.jpeg"
            alt="Advertisement 1"
            className="ad-item"
          />
          <img
            width={300}
            height={500}
            src="/images/A2.jpeg"
            alt="Advertisement 2"
            className="ad-item"
          />
          <img
            width={300}
            height={500}
            src="/images/A3.jpeg"
            alt="Advertisement 3"
            className="ad-item"
          />
          <img
            width={300}
            height={500}
            src="/images/A4.jpeg"
            alt="Advertisement 4"
            className="ad-item"
          />
          <img
            width={300}
            height={500}
            src="/images/A5.jpeg"
            alt="Advertisement 5"
            className="ad-item"
          />
          <img
            width={300}
            height={500}
            src="/images/A6.jpeg"
            alt="Advertisement 6"
            className="ad-item"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h3>Features</h3>
        <div className="features-grid">
          {/* Boarding Feature */}
          <div className="feature-item" onClick={handleBoardingClick}>
            <img
              width={100}
              height={100}
              src="/images/Bording.jpg"
              alt="Boarding"
            />
            <p>Boarding</p>
          </div>

          {/* Other Features */}
          <div className="feature-item">
            <img src="/images/Taxi.jpg" alt="Taxis" />
            <p>Taxis</p>
          </div>
          <div className="feature-item">
            <img src="/images/Medicine.jpg" alt="Medicare" />
            <p>Medicare</p>
          </div>
          <div className="feature-item">
            <img src="/images/Food.jpg" alt="Foods" />
            <p>Foods</p>
          </div>
          <div className="feature-item">
            <img src="/images/Rental.jpg" alt="Renting" />
            <p>Renting</p>
          </div>
          <div className="feature-item">
            <img src="/images/Skill Sharing.jpg" alt="Skill Sharing" />
            <p>Skill Sharing</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
