import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false); // close mobile menu
  };

  const handleLogin = () => {
    window.location.href = "http://localhost:3000";
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer text-orange-600"
          onClick={() => handleScrollTo("home")}
        >
          UniTunes
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-800 font-medium">
          <li
            className="cursor-pointer hover:text-orange-600 transition-colors"
            onClick={() => handleScrollTo("home")}
          >
            Home
          </li>
          <li
            className="cursor-pointer hover:text-orange-600 transition-colors"
            onClick={() => handleScrollTo("services")}
          >
            Services
          </li>
          <li
            className="cursor-pointer hover:text-orange-600 transition-colors"
            onClick={() => handleScrollTo("mobile-app")}
          >
            Mobile App
          </li>
          <li
            className="cursor-pointer hover:text-orange-600 transition-colors"
            onClick={() => handleScrollTo("about")}
          >
            About
          </li>
          <li
            className="cursor-pointer hover:text-orange-600 transition-colors"
            onClick={() => handleScrollTo("contact")}
          >
            Contact
          </li>
        </ul>

        {/* Desktop Login Button */}
        <div className="hidden md:block">
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
          >
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-white shadow-lg w-full flex flex-col items-center space-y-4 py-6 text-gray-800 font-medium">
          <li
            className="cursor-pointer hover:text-orange-600 transition-colors"
            onClick={() => handleScrollTo("home")}
          >
            Home
          </li>
          <li
            className="cursor-pointer hover:text-orange-600 transition-colors"
            onClick={() => handleScrollTo("services")}
          >
            Services
          </li>
          <li
            className="cursor-pointer hover:text-orange-600 transition-colors"
            onClick={() => handleScrollTo("mobile-app")}
          >
            Mobile App
          </li>
          <li
            className="cursor-pointer hover:text-orange-600 transition-colors"
            onClick={() => handleScrollTo("about")}
          >
            About
          </li>
          <li
            className="cursor-pointer hover:text-orange-600 transition-colors"
            onClick={() => handleScrollTo("contact")}
          >
            Contact
          </li>
          {/* Mobile Login Button */}
          <li>
            <button
              onClick={handleLogin}
              className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
            >
              Login
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
