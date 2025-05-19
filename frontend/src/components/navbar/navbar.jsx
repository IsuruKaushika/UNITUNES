import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './navbar.css';

const Navbar = ({ setShowLogin }) => {
  const location = useLocation();
  const [menu, setMenu] = useState("Home");
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Set active menu item based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setMenu("Home");
    else if (path.includes('/boarding')) setMenu("Menu");
    else if (path.includes('/mobile')) setMenu("Mobile-App");
    else if (path.includes('/contact')) setMenu("Contact Us");
  }, [location]);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle search bar
  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      // Focus search input when it appears
      setTimeout(() => {
        document.querySelector('.search-input')?.focus();
      }, 100);
    }
  };
  
  // Close mobile menu when clicking a link
  const handleMenuItemClick = (menuItem) => {
    setMenu(menuItem);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to='/'>
            <img src={assets.logo} alt="UniTunes" className="logo" />
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div 
          className={`mobile-menu-button ${mobileMenuOpen ? 'active' : ''}`} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        {/* Main menu */}
        <div className={`navbar-menu-container ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-menu">
            <li>
              <Link 
                to='/' 
                className={menu === "Home" ? "active" : ""} 
                onClick={() => handleMenuItemClick("Home")}
              >
                Home
              </Link>
            </li>
            <li>
              <a 
                href='#explore-menu' 
                className={menu === "Menu" ? "active" : ""} 
                onClick={() => handleMenuItemClick("Menu")}
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href='#app-download' 
                className={menu === "Mobile-App" ? "active" : ""} 
                onClick={() => handleMenuItemClick("Mobile-App")}
              >
                Mobile App
              </a>
            </li>
            <li>
              <a 
                href='#footer' 
                className={menu === "Contact Us" ? "active" : ""} 
                onClick={() => handleMenuItemClick("Contact Us")}
              >
                Contact Us
              </a>
            </li>
          </ul>
          
          {/* Navigation actions - for mobile, this appears below the menu */}
          <div className="navbar-actions">
            <div className="search-container">
              <div className={`search-wrapper ${showSearch ? 'active' : ''}`}>
                <input 
                  type="text" 
                  placeholder="Search services..." 
                  className="search-input" 
                />
                <button className="search-button" onClick={handleSearchToggle}>
                  <img src={assets.search_icon} alt="Search" />
                </button>
              </div>
            </div>
            
            <button className="sign-in-button" onClick={() => setShowLogin(true)}>
              <span className="button-text">Sign In</span>
                <Link to="/" className="sign-in-link" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
