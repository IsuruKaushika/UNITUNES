import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";

const Navbar = ({ setShowLogin }) => {
  const location = useLocation();
  const [menu, setMenu] = useState("Home");
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // input state
  const [results, setResults] = useState([]); // backend results

  // Set active menu item
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setMenu("Home");
    else if (path.includes("/boarding")) setMenu("Menu");
    else if (path.includes("/mobile")) setMenu("Mobile-App");
    else if (path.includes("/contact")) setMenu("Contact Us");
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search toggle
  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  // Example: fetch from backend
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      // Replace with your backend API
      const response = await fetch(`/api/search?query=${searchQuery}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleMenuItemClick = (menuItem) => {
    setMenu(menuItem);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={assets.logo} alt="UniTunes" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div
          className="lg:hidden flex flex-col gap-1 cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
        </div>

        {/* Main menu */}
        <div
          className={`${
            mobileMenuOpen
              ? "absolute top-16 left-0 w-full bg-white p-6 flex flex-col gap-4"
              : "hidden"
          } lg:flex lg:items-center lg:gap-8`}
        >
          <ul className="flex flex-col lg:flex-row gap-6 text-gray-700 font-medium">
            <li>
              <Link
                to="/"
                className={menu === "Home" ? "text-blue-600" : ""}
                onClick={() => handleMenuItemClick("Home")}
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="#explore-menu"
                className={menu === "Menu" ? "text-blue-600" : ""}
                onClick={() => handleMenuItemClick("Menu")}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#app-download"
                className={menu === "Mobile-App" ? "text-blue-600" : ""}
                onClick={() => handleMenuItemClick("Mobile-App")}
              >
                Mobile App
              </a>
            </li>
            <li>
              <a
                href="#footer"
                className={menu === "Contact Us" ? "text-blue-600" : ""}
                onClick={() => handleMenuItemClick("Contact Us")}
              >
                Contact Us
              </a>
            </li>
          </ul>

          {/* Actions */}
          <div className="mt-4 lg:mt-0 flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              {showSearch && (
                <form
                  onSubmit={handleSearch}
                  className="absolute -top-2 right-12 flex items-center bg-gray-100 rounded-lg shadow px-2"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search services..."
                    className="bg-transparent px-2 py-1 outline-none"
                  />
                  <button type="submit" className="px-2">
                    <img
                      src={assets.search_icon}
                      alt="Search"
                      className="h-5 w-5"
                    />
                  </button>
                </form>
              )}
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={handleSearchToggle}
              >
                <img src={assets.search_icon} alt="Search" className="h-5 w-5" />
              </button>
            </div>

            {/* Sign in */}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => setShowLogin(true)}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Search results dropdown */}
      {results.length > 0 && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-md bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-gray-700 font-semibold mb-2">Results:</h3>
          <ul className="space-y-2">
            {results.map((item, idx) => (
              <li key={idx} className="border-b pb-2">
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
