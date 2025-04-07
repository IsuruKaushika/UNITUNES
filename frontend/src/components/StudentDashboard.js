import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { assets } from '../assets/assets';
import "../components/Styles/Homepage.css";
import "../components/Styles/header.css";
import "../components/Styles/navbar.css";
import "../components/Styles/Ad.css";

// Navbar Component
function Navbar({ setShowLogin }) {
  const [showSearch, setShowSearch] = useState(false);
  const [menu, setMenu] = useState("");

  const getTotalCartAmount = () => {
    // Logic to get cart total, example for now
    return 0;
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            className={menu === "Home" ? "active" : ""}
            onClick={() => setMenu("Home")}
          >
            Home
          </Link>
        </li>
        <li>
          <a
            href="#explore-menu"
            className={menu === "Menu" ? "active" : ""}
            onClick={() => setMenu("Menu")}
          >
            Menu
          </a>
        </li>
        <li>
          <a
            href="#app-download"
            className={menu === "Mobile-App" ? "active" : ""}
            onClick={() => setMenu("Mobile-App")}
          >
            Mobile App
          </a>
        </li>
        <li>
          <a
            href="#footer"
            className={menu === "Contact Us" ? "active" : ""}
            onClick={() => setMenu("Contact Us")}
          >
            Contact Us
          </a>
        </li>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-container">
          <img
            src={assets.search_icon}
            alt="Search"
            onClick={() => setShowSearch(!showSearch)}
            className="search-icon"
          />
          {showSearch && <input type="text" placeholder="Search..." className="search-bar" />}
        </div>
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Basket" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  );
}

// Ad Component
const adData = [
  {
    id: 1,
    image: 'https://via.placeholder.com/200x100?text=Hostel+Ad+1',
    link: 'https://example.com/ad1',
    title: 'Hostel near University - Starting Rs. 5000',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/200x100?text=Food+Delivery',
    link: 'https://example.com/ad2',
    title: 'Order Homemade Meals for Students',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/200x100?text=Taxi+Service',
    link: 'https://example.com/ad3',
    title: 'Discount Taxi Services for Campus Rides',
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/200x100?text=Rental+Items',
    link: 'https://example.com/ad4',
    title: 'Rent Shoes, Bags, Blazers for Events',
  },
];

const Ad = () => {
  return (
    <div className="ad-section">
      <div className="ad-banner">
        <h2>🎓 University Ads & Updates</h2>
        <p>Get the latest info on boarding, services, and events near you!</p>
      </div>

      <div className="ad-carousel">
        <div className="ad-track">
          {adData.map((ad) => (
            <a
              key={ad.id}
              href={ad.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ad-item"
              title={ad.title}
            >
              <img src={ad.image} alt={ad.title} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// HomePage Component
function HomePage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const handleBoardingClick = () => {
    navigate("/boarding-list");
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

        {/* Ad Section */}
        <Ad />

        {/* Features Section */}
        <section className="features-section">
          <h3>Features</h3>
          <div className="features-grid">
            <div className="feature-item" onClick={handleBoardingClick}>
              <img width={100} height={100} src="/images/Bording.jpg" alt="Boarding" />
              <p>Boarding</p>
            </div>

            {[{ src: "/images/Taxi.jpg", alt: "Taxis", label: "Taxis" },
              { src: "/images/Medicine.jpg", alt: "Medicare", label: "Medicare" },
              { src: "/images/Food.jpg", alt: "Foods", label: "Foods" },
              { src: "/images/Rental.jpg", alt: "Renting", label: "Renting" },
              { src: "/images/Skill Sharing.jpg", alt: "Skill Sharing", label: "Skill Sharing" }].map((feature, index) => (
                <div className="feature-item" key={index}>
                  <img src={feature.src} alt={feature.alt} />
                  <p>{feature.label}</p>
                </div>
              ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
