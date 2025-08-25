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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-xl shadow-2xl border-b border-orange-100' 
        : 'bg-gradient-to-r from-white via-orange-50/30 to-white shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
            <Link to='/' className="group">
              <img 
                src={assets.logo} 
                alt="UniTunes" 
                className="h-10 w-auto object-contain drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300"
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              to='/' 
              className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
                menu === "Home" 
                  ? "text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30" 
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50"
              }`}
              onClick={() => handleMenuItemClick("Home")}
            >
              Home
              {menu === "Home" && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
              )}
            </Link>
            <a 
              href='#explore-menu' 
              className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
                menu === "Menu" 
                  ? "text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30" 
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50"
              }`}
              onClick={() => handleMenuItemClick("Menu")}
            >
              Services
              {menu === "Menu" && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
              )}
            </a>
            <a 
              href='#app-download' 
              className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
                menu === "Mobile-App" 
                  ? "text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30" 
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50"
              }`}
              onClick={() => handleMenuItemClick("Mobile-App")}
            >
              Mobile App
              {menu === "Mobile-App" && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
              )}
            </a>
            <a 
              href='#footer' 
              className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
                menu === "Contact Us" 
                  ? "text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30" 
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50"
              }`}
              onClick={() => handleMenuItemClick("Contact Us")}
            >
              Contact Us
              {menu === "Contact Us" && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
              )}
            </a>
          </div>
          
          {/* Search and Sign In - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Container */}
            <div className="search-container relative">
              <div className={`flex items-center transition-all duration-500 ease-in-out ${
                showSearch ? 'w-72' : 'w-auto'
              }`}>
                {showSearch && (
                  <div className="relative flex-1 animate-fade-in">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input 
                      id="search-input"
                      type="text" 
                      placeholder="Search boarding, taxis..." 
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full pl-10 pr-12 py-3 text-sm bg-white/80 backdrop-blur-sm border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-400 transition-all duration-300 shadow-lg placeholder-gray-400"
                    />
                    {isSearching && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full"></div>
                      </div>
                    )}
                  </div>
                )}
                <button 
                  onClick={handleSearchToggle}
                  className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                    showSearch 
                      ? "text-orange-600 bg-orange-100 hover:bg-orange-200 shadow-lg" 
                      : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                  }`}
                >
                  <img src={assets.search_icon} alt="Search" className="h-5 w-5" />
                </button>
              </div>

              {/* Search Dropdown */}
              {showDropdown && searchResults.length > 0 && (
                <div className="absolute top-full mt-3 left-0 right-0 bg-white/95 backdrop-blur-xl border-2 border-orange-100 rounded-3xl shadow-2xl max-h-80 overflow-hidden z-50 animate-fade-in">
                  <div className="overflow-y-auto max-h-80 scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-orange-50">
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        onClick={() => handleResultClick(result)}
                        className="px-6 py-4 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100/50 cursor-pointer border-b border-orange-50 last:border-b-0 transition-all duration-300 group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                              result.type === 'boarding' 
                                ? 'bg-gradient-to-br from-blue-400 to-blue-600' 
                                : result.type === 'taxi' 
                                ? 'bg-gradient-to-br from-green-400 to-green-600'
                                : 'bg-gradient-to-br from-purple-400 to-purple-600'
                            }`}>
                              <span className="text-white text-sm font-bold">
                                {result.type === 'boarding' ? 'B' : result.type === 'taxi' ? 'T' : 'S'}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-orange-700 transition-colors duration-300">
                              {result.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate mt-1">
                              📍 {result.location} • {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                            </p>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg className="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sign In Button */}
            <button 
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              Sign In
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 rounded-2xl text-gray-600 hover:text-orange-600 hover:bg-orange-50 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-6 h-0.5 bg-current transform transition-all duration-500 ease-in-out ${
                  mobileMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1.5'
                }`}></span>
                <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}></span>
                <span className={`block w-6 h-0.5 bg-current transform transition-all duration-500 ease-in-out ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1.5'
                }`}></span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pt-4 pb-6 space-y-2 bg-gradient-to-b from-orange-50/50 to-white rounded-b-3xl border-t border-orange-100">
            <Link 
              to='/' 
              className={`flex items-center px-4 py-3 rounded-2xl text-base font-semibold transition-all duration-300 transform hover:scale-105 ${
                menu === "Home" 
                  ? "text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30" 
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-100/50"
              }`}
              onClick={() => handleMenuItemClick("Home")}
            >
              <span className="mr-3">🏠</span>
              Home
            </Link>
            <a 
              href='#explore-menu' 
              className={`flex items-center px-4 py-3 rounded-2xl text-base font-semibold transition-all duration-300 transform hover:scale-105 ${
                menu === "Menu" 
                  ? "text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30" 
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-100/50"
              }`}
              onClick={() => handleMenuItemClick("Menu")}
            >
              <span className="mr-3">🏢</span>
              Services
            </a>
            <a 
              href='#app-download' 
              className={`flex items-center px-4 py-3 rounded-2xl text-base font-semibold transition-all duration-300 transform hover:scale-105 ${
                menu === "Mobile-App" 
                  ? "text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30" 
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-100/50"
              }`}
              onClick={() => handleMenuItemClick("Mobile-App")}
            >
              <span className="mr-3">📱</span>
              Mobile App
            </a>
            <a 
              href='#footer' 
              className={`flex items-center px-4 py-3 rounded-2xl text-base font-semibold transition-all duration-300 transform hover:scale-105 ${
                menu === "Contact Us" 
                  ? "text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30" 
                  : "text-gray-700 hover:text-orange-600 hover:bg-orange-100/50"
              }`}
              onClick={() => handleMenuItemClick("Contact Us")}
            >
              <span className="mr-3">📞</span>
              Contact Us
            </a>
            
            {/* Mobile Search */}
            <div className="px-4 py-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Search boarding, taxis..." 
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-12 py-4 text-sm bg-white border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-400 transition-all duration-300 shadow-lg placeholder-gray-400"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  {isSearching ? (
                    <div className="animate-spin h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full"></div>
                  ) : (
                    <img src={assets.search_icon} alt="Search" className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
              
              {/* Mobile Search Results */}
              {showDropdown && searchResults.length > 0 && (
                <div className="mt-4 bg-white/95 backdrop-blur-xl border-2 border-orange-100 rounded-3xl shadow-2xl max-h-60 overflow-hidden animate-fade-in">
                  <div className="overflow-y-auto max-h-60">
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        onClick={() => handleResultClick(result)}
                        className="px-4 py-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100/50 cursor-pointer border-b border-orange-50 last:border-b-0 transition-all duration-300 group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`h-10 w-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md transition-transform duration-300 group-hover:scale-110 ${
                            result.type === 'boarding' 
                              ? 'bg-gradient-to-br from-blue-400 to-blue-600' 
                              : result.type === 'taxi' 
                              ? 'bg-gradient-to-br from-green-400 to-green-600'
                              : 'bg-gradient-to-br from-purple-400 to-purple-600'
                          }`}>
                            <span className="text-white text-sm font-bold">
                              {result.type === 'boarding' ? 'B' : result.type === 'taxi' ? 'T' : 'S'}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-orange-700 transition-colors duration-300">
                              {result.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              📍 {result.location} • {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                            </p>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg className="h-4 w-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile Sign In */}
            <div className="px-4 pt-2">
              <button 
                onClick={() => setShowLogin(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                Sign In
              </button>
            </div>
          </div>
        </div> boarding, taxis..." 
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

// Add custom styles for animations
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
  
  .scrollbar-thin {
    scrollbar-width: thin;
  }
  
  .scrollbar-thumb-orange-300::-webkit-scrollbar-thumb {
    background-color: #fdba74;
    border-radius: 10px;
  }
  
  .scrollbar-track-orange-50::-webkit-scrollbar-track {
    background-color: #fff7ed;
  }
  
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default Navbar;