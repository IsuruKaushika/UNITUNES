import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import Navbar from "../components/navbar/navbar"; // ✅ Make sure this path is correct
import Ad from "../components/ad/Ad"; // ✅ Make sure this path is correct
import "../pages/home/home"; // ✅ Ensure this CSS file exists and styles the layout

function HomePage() {
  const navigate = useNavigate(); // ✅ Hook to navigate programmatically
  const [showLogin, setShowLogin] = useState(false); // ✅ Optional login toggle

  // Navigation handlers
  const handleBoardingClick = () => {
    navigate("/boarding-list");
  };

  const handleTaxiClick = () => {
    navigate("/taxi-list");
  };

  const handleMedicareClick = () => {
    navigate("/medi-select"); // or /medi-list, based on your route
  };

  const handleShopClick = () => {
    navigate("/shop-select");
  };

  const handleRentingClick = () => {
    navigate("/rent-items");
  };

  const handleSkillSharingClick = () => {
    navigate("/skill-list");
  };

  return (
    <>
      <Navbar setShowLogin={setShowLogin} />

      <div className="home-page">
        {/* Header Section */}
        <header className="header">
          <div className="header-content">
            <h2>UniTunes - Smart Solutions for Smarter Undergraduates!</h2>
            <button>View Menu</button>
          </div>
        </header>

        {/* Feature Section */}
        <div className="features">
          {/* Boarding Feature */}
          <div className="feature-item" onClick={handleBoardingClick}>
            <img src="/images/Boarding.jpg" alt="Boardings" />
            <p>Boardings</p>
          </div>

          {/* Taxi Feature */}
          <div className="feature-item" onClick={handleTaxiClick}>
            <img src="/images/Taxi.jpg" alt="Taxis" />
            <p>Taxis</p>
          </div>

          {/* Medicare Feature */}
          <div className="feature-item" onClick={handleMedicareClick}>
            <img src="/images/Medicine.jpg" alt="Medicare" />
            <p>Medicare</p>
          </div>

          {/* Food/Shops Feature */}
          <div className="feature-item" onClick={handleShopClick}>
            <img src="/images/Food.jpg" alt="Shops" />
            <p>Shops</p>
          </div>

          {/* Renting Feature */}
          <div className="feature-item" onClick={handleRentingClick}>
            <img src="/images/Rental.jpg" alt="Renting" />
            <p>Renting</p>
          </div>

          {/* Skill Sharing Feature */}
          <div className="feature-item" onClick={handleSkillSharingClick}>
            <img src="/images/Skill Sharing.jpg" alt="Skill Sharing" />
            <p>Skill Sharing</p>
          </div>
        </div>

        {/* Ad Section */}
        <Ad />
      </div>
    </>
  );
}

export default HomePage;
