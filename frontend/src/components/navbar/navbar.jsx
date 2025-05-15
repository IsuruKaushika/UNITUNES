import React, { useState, useContext } from 'react';
import './navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';


const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  
  const [showSearch, setShowSearch] = useState(false);  // State for search bar

  return (
    <div className='navbar'>
      <Link to='/'> <img src={assets.logo} alt="Logo" className='logo' /></Link>
      <ul className='navbar-menu'>
        <li><Link to='/' className={menu === "Home" ? "active" : ""} onClick={() => setMenu("Home")}>Home</Link></li>
        <li><a href='#explore-menu' className={menu === "Menu" ? "active" : ""} onClick={() => setMenu("Menu")}>Menu</a></li>
        <li><a href='#app-download' className={menu === "Mobile-App" ? "active" : ""} onClick={() => setMenu("Mobile-App")}>Mobile App</a></li>
        <li><a href='#footer' className={menu === "Contact Us" ? "active" : ""} onClick={() => setMenu("Contact Us")}>Contact Us</a></li>
      </ul>
      <div className='navbar-right'>
        <div className='navbar-search-container'>
          <img 
            src={assets.search_icon} 
            alt="Search" 
            onClick={() => setShowSearch(!showSearch)} 
            className="search-icon"
          />
          {showSearch && <input type="text" placeholder="Search..." className="search-bar" />}
        </div>
     
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
