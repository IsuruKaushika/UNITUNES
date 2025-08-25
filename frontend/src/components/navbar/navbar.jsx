import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Navbar = ({ setShowLogin }) => {
  const location = useLocation();
  const [menu, setMenu] = useState("Home");
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
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
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search functionality
  useEffect(() => {
    const searchBackend = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        setShowDropdown(false);
        return;
      }

      setIsSearching(true);
      try {
        // Replace this with your actual API endpoint
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        setSearchResults(data.results || []);
        setShowDropdown(true);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchBackend, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);
  
  // Handle search bar toggle
  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => {
        document.querySelector('#search-input')?.focus();
      }, 100);
    } else {
      setSearchQuery("");
      setShowDropdown(false);
    }
  };
  
  // Close mobile menu when clicking a link
  const handleMenuItemClick = (menuItem) => {
    setMenu(menuItem);
    setMobileMenuOpen(false);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search result click
  const handleResultClick = (result) => {
    setShowDropdown(false);
    setShowSearch(false);
    setSearchQuery("");
    // Navigate to the selected result
    // You can implement navigation logic here
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to='/'>
              <img 
                src={assets.logo} 
                alt="UniTunes" 
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to='/' 
              className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                menu === "Home" ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-700"
              }`}
              onClick={() => handleMenuItemClick("Home")}
            >
              Home
            </Link>
            <a 
              href='#explore-menu' 
              className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                menu === "Menu" ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-700"
              }`}
              onClick={() => handleMenuItemClick("Menu")}
            >
              Services
            </a>
            <a 
              href='#app-download' 
              className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                menu === "Mobile-App" ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-700"
              }`}
              onClick={() => handleMenuItemClick("Mobile-App")}
            >
              Mobile App
            </a>
            <a 
              href='#footer' 
              className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                menu === "Contact Us" ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-700"
              }`}
              onClick={() => handleMenuItemClick("Contact Us")}
            >
              Contact Us
            </a>
          </div>
          
          {/* Search and Sign In - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Container */}
            <div className="search-container relative">
              <div className={`flex items-center transition-all duration-300 ${
                showSearch ? 'w-64' : 'w-auto'
              }`}>
                {showSearch && (
                  <div className="relative flex-1">
                    <input 
                      id="search-input"
                      type="text" 
                      placeholder="Search boarding, taxis..." 
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {isSearching && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                      </div>
                    )}
                  </div>
                )}
                <button 
                  onClick={handleSearchToggle}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <img src={assets.search_icon} alt="Search" className="h-5 w-5" />
                </button>
              </div>

              {/* Search Dropdown */}
              {showDropdown && searchResults.length > 0 && (
                <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      onClick={() => handleResultClick(result)}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 text-xs font-medium">
                              {result.type === 'boarding' ? 'B' : result.type === 'taxi' ? 'T' : 'S'}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {result.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {result.location} • {result.type}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Sign In Button */}
            <button 
              onClick={() => setShowLogin(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Sign In
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'
                }`}></span>
                <span className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
                }`}></span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to='/' 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                menu === "Home" ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => handleMenuItemClick("Home")}
            >
              Home
            </Link>
            <a 
              href='#explore-menu' 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                menu === "Menu" ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => handleMenuItemClick("Menu")}
            >
              Services
            </a>
            <a 
              href='#app-download' 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                menu === "Mobile-App" ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => handleMenuItemClick("Mobile-App")}
            >
              Mobile App
            </a>
            <a 
              href='#footer' 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                menu === "Contact Us" ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => handleMenuItemClick("Contact Us")}
            >
              Contact Us
            </a>
            
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search boarding, taxis..." 
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {isSearching ? (
                    <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                  ) : (
                    <img src={assets.search_icon} alt="Search" className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>
              
              {/* Mobile Search Results */}
              {showDropdown && searchResults.length > 0 && (
                <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      onClick={() => handleResultClick(result)}
                      className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 text-xs font-medium">
                            {result.type === 'boarding' ? 'B' : result.type === 'taxi' ? 'T' : 'S'}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {result.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {result.location} • {result.type}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile Sign In */}
            <div className="px-3 py-2">
              <button 
                onClick={() => setShowLogin(true)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;