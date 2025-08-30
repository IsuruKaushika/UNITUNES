import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { backendUrl } from '../../config';


const Navbar = ({ setShowLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  
  const [menu, setMenu] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  
  // Set active menu item based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setMenu("Home");
    else if (path.includes('/boarding') || path.includes('/services')) setMenu("Services");
    else if (path.includes('/mobile')) setMenu("Mobile-App");
    else if (path.includes('/contact')) setMenu("Contact Us");
    else if (path.includes('/about')) setMenu("About");
  }, [location]);
  
  // Handle scroll effect with enhanced performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced search functionality with proper error handling
  useEffect(() => {
    const searchBackend = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        setShowDropdown(false);
        return;
      }

      setIsSearching(true);
      try {
        const response = await axios.get(`${backendUrl}/api/search`, {
          params: { 
            q: searchQuery.trim(),
            limit: 8 // Limit results for better UX
          }
        });
        
        if (response.data.success) {
          setSearchResults(response.data.results || []);
          setShowDropdown(true);
        } else {
          setSearchResults([]);
          setShowDropdown(false);
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
        setShowDropdown(false);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchBackend, 400);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);
  
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
    setSearchQuery("");
    setSearchFocused(false);
    setMobileMenuOpen(false);
    
    // Navigate based on result type
    switch (result.type) {
      case 'boarding':
        navigate(`/boarding/${result.id}`);
        break;
      case 'taxi':
        navigate(`/taxi/${result.id}`);
        break;
      case 'service':
        navigate(`/service/${result.id}`);
        break;
      default:
        navigate(`/search?q=${encodeURIComponent(result.name)}`);
    }
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowDropdown(false);
      setSearchFocused(false);
      setMobileMenuOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
        setSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clear search when escape is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowDropdown(false);
        setSearchFocused(false);
        setSearchQuery("");
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const getResultIcon = (type) => {
    switch (type) {
      case 'boarding':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 4h4" />
          </svg>
        );
      case 'taxi':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M6 10l4-4 4 4" />
          </svg>
        );
      case 'service':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2H8a2 2 0 00-2-2V4" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-2xl border-b border-gray-100' 
          : 'bg-white/90 backdrop-blur-sm shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-18">
            {/* Logo */}
            <div className="flex-shrink-0 z-10">
              <Link to='/' className="flex items-center group">
                <div className="relative">
                  <img 
                    src={assets.logo} 
                    alt="UniTunes" 
                    className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
                </div>
              </Link>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearchSubmit} className="w-full relative" ref={searchRef}>
                <div className={`relative flex items-center transition-all duration-300 ${
                  searchFocused ? 'transform scale-105' : ''
                }`}>
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search boarding, taxis, services..." 
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => setSearchFocused(true)}
                      className={`w-full pl-12 pr-12 py-3 text-sm bg-gray-50 border-2 border-transparent rounded-2xl 
                        focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                        placeholder-gray-500 transition-all duration-300 shadow-sm hover:shadow-md
                        ${searchFocused ? 'bg-white border-blue-500 shadow-lg' : ''}
                      `}
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      {isSearching ? (
                        <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                      ) : searchQuery && (
                        <button 
                          type="button"
                          onClick={() => {
                            setSearchQuery("");
                            setShowDropdown(false);
                          }}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhanced Search Dropdown */}
                {showDropdown && (
                  <div 
                    ref={dropdownRef}
                    className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-2xl max-h-80 overflow-hidden z-50 animate-fadeIn"
                  >
                    <div className="max-h-80 overflow-y-auto">
                      {searchResults.length > 0 ? (
                        <>
                          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                              Search Results ({searchResults.length})
                            </p>
                          </div>
                          {searchResults.map((result, index) => (
                            <div
                              key={index}
                              onClick={() => handleResultClick(result)}
                              className="px-4 py-4 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-b-0 transition-all duration-200 group"
                            >
                              <div className="flex items-center space-x-4">
                                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                                  result.type === 'boarding' ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-200' :
                                  result.type === 'taxi' ? 'bg-green-100 text-green-600 group-hover:bg-green-200' :
                                  result.type === 'service' ? 'bg-purple-100 text-purple-600 group-hover:bg-purple-200' :
                                  'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                                }`}>
                                  {getResultIcon(result.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                    {result.name}
                                  </p>
                                  <p className="text-xs text-gray-500 truncate mt-1">
                                    {result.location} • {result.type}
                                  </p>
                                  {result.rating && (
                                    <div className="flex items-center mt-1">
                                      <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                          <svg
                                            key={i}
                                            className={`w-3 h-3 ${
                                              i < Math.floor(result.rating) ? 'text-yellow-400' : 'text-gray-300'
                                            }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                          </svg>
                                        ))}
                                      </div>
                                      <span className="ml-1 text-xs text-gray-500">({result.rating})</span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex-shrink-0">
                                  <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="px-4 py-8 text-center">
                          <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <p className="text-sm text-gray-500 mb-2">No results found</p>
                          <p className="text-xs text-gray-400">Try searching with different keywords</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </form>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {[
                { name: "Home", path: "/", id: "Home" },
                { name: "Services", path: "#explore-menu", id: "Services" },
                { name: "Mobile App", path: "#app-download", id: "Mobile-App" },
                { name: "About", path: "/about", id: "About" },
                { name: "Contact", path: "#footer", id: "Contact Us" }
              ].map((item) => (
                <Link
                  key={item.id}
                  to={item.path.startsWith('#') ? '/' : item.path}
                  href={item.path.startsWith('#') ? item.path : undefined}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                    menu === item.id 
                      ? "text-blue-600 bg-blue-50" 
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                  onClick={() => handleMenuItemClick(item.id)}
                >
                  {item.name}
                  {menu === item.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>
            
            {/* Desktop Sign In */}
            <div className="hidden lg:flex items-center space-x-4">
              <button 
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1.5'
                  }`}></span>
                  <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`}></span>
                  <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1.5'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden border-t border-gray-100 ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-lg">
            {/* Mobile Search */}
            <div className="mb-4">
              <form onSubmit={handleSearchSubmit} className="relative">
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
                    className="w-full pl-12 pr-12 py-3 text-sm bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder-gray-500 transition-all duration-300"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    {isSearching ? (
                      <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    ) : searchQuery && (
                      <button 
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Mobile Search Results */}
                {showDropdown && searchResults.length > 0 && (
                  <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        onClick={() => handleResultClick(result)}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            result.type === 'boarding' ? 'bg-blue-100 text-blue-600' :
                            result.type === 'taxi' ? 'bg-green-100 text-green-600' :
                            result.type === 'service' ? 'bg-purple-100 text-purple-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {getResultIcon(result.type)}
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
              </form>
            </div>

            {/* Mobile Menu Items */}
            {[
              { name: "Home", path: "/", id: "Home" },
              { name: "Services", path: "#explore-menu", id: "Services" },
              { name: "Mobile App", path: "#app-download", id: "Mobile-App" },
              { name: "About", path: "/about", id: "About" },
              { name: "Contact", path: "#footer", id: "Contact Us" }
            ].map((item) => (
              <Link
                key={item.id}
                to={item.path.startsWith('#') ? '/' : item.path}
                href={item.path.startsWith('#') ? item.path : undefined}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  menu === item.id 
                    ? "text-blue-600 bg-blue-50 border border-blue-200" 
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => handleMenuItemClick(item.id)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Sign In */}
            <div className="pt-4">
              <button 
                onClick={() => {
                  setShowLogin(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 lg:h-18"></div>
      
      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </>
  );
};

export default Navbar;