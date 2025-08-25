import React, { useState, useEffect, useRef } from 'react';

const Navbar = ({ setShowLogin = () => {} }) => {
  const [menu, setMenu] = useState("Home");
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [notifications] = useState(3); // Mock notification count
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoggedIn] = useState(false); // Mock login state
  
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  // Mock search data - replace with your actual API endpoint
  const mockSearchData = [
    { id: 1, title: "Premium Student Boarding", category: "Boarding", location: "Near Campus", price: "Rs. 8000/month", image: "🏠" },
    { id: 2, title: "Budget Hostel Rooms", category: "Boarding", location: "University Road", price: "Rs. 5000/month", image: "🏠" },
    { id: 3, title: "Campus Taxi Service", category: "Transport", location: "24/7 Available", price: "Rs. 50/km", image: "🚗" },
    { id: 4, title: "Student Meal Plans", category: "Food", location: "Home Delivery", price: "Rs. 200/meal", image: "🍽️" },
    { id: 5, title: "Formal Wear Rental", category: "Rental", location: "Event Clothing", price: "Rs. 500/day", image: "👔" },
    { id: 6, title: "Book Exchange", category: "Books", location: "Academic Books", price: "Rs. 100-500", image: "📚" },
    { id: 7, title: "Tutoring Services", category: "Education", location: "All Subjects", price: "Rs. 300/hour", image: "📖" },
    { id: 8, title: "Bike Rental", category: "Transport", location: "Monthly Plans", price: "Rs. 1500/month", image: "🚲" },
  ];

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

  // Handle search functionality
  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300); // Debounce search

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target) &&
          resultsRef.current && !resultsRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Simulate API search call
  const performSearch = async (query) => {
    setIsSearching(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter mock data based on search query
    const filtered = mockSearchData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.location.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filtered);
    setShowResults(true);
    setIsSearching(false);
  };

  // Handle search bar toggle
  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => {
        searchRef.current?.querySelector('input')?.focus();
      }, 100);
    } else {
      setSearchQuery("");
      setShowResults(false);
    }
  };

  // Handle menu item click
  const handleMenuItemClick = (menuItem) => {
    setMenu(menuItem);
    setMobileMenuOpen(false);
  };

  // Handle search result click
  const handleResultClick = (result) => {
    console.log("Selected:", result);
    setShowResults(false);
    setSearchQuery("");
    // Navigate to detail page or handle selection
  };

  return (
    <div className="h-1w bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 z-50">
              <a 
                href="/" 
                className="flex items-center space-x-2 group"
                onClick={() => handleMenuItemClick("Home")}
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-white font-bold text-lg lg:text-xl">🎓</span>
                </div>
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  UniTunes
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              <ul className="flex items-center space-x-1">
                <li>
                  <a 
                    href="/" 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group ${
                      menu === "Home" 
                        ? "text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={() => handleMenuItemClick("Home")}
                  >
                    Home
                    {menu === "Home" && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                    )}
                  </a>
                </li>
                <li>
                  <a 
                    href='#explore-menu' 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group ${
                      menu === "Menu" 
                        ? "text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={() => handleMenuItemClick("Menu")}
                  >
                    Services
                    {menu === "Menu" && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                    )}
                  </a>
                </li>
                <li>
                  <a 
                    href='#app-download' 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group ${
                      menu === "Mobile-App" 
                        ? "text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={() => handleMenuItemClick("Mobile-App")}
                  >
                    Mobile App
                    {menu === "Mobile-App" && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                    )}
                  </a>
                </li>
                <li>
                  <a 
                    href='#footer' 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group ${
                      menu === "Contact Us" 
                        ? "text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={() => handleMenuItemClick("Contact Us")}
                  >
                    Contact Us
                    {menu === "Contact Us" && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                    )}
                  </a>
                </li>
              </ul>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              
              {/* Enhanced Search with Results */}
              <div className="relative" ref={searchRef}>
                <div className={`flex items-center transition-all duration-300 ease-in-out ${
                  showSearch ? 'w-80' : 'w-10'
                }`}>
                  <input 
                    type="text" 
                    placeholder="Search boarding, taxi, food, books..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowResults(searchResults.length > 0)}
                    className={`absolute right-0 h-10 pl-4 pr-10 bg-gray-100/80 backdrop-blur-sm border border-gray-200 rounded-full text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 ${
                      showSearch ? 'w-80 opacity-100' : 'w-0 opacity-0 pointer-events-none'
                    }`}
                  />
                  <button 
                    onClick={handleSearchToggle}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100/80 backdrop-blur-sm border border-gray-200 rounded-full transition-all duration-300 hover:bg-gray-200/80 hover:shadow-md relative z-10"
                  >
                    {isSearching ? (
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span className="text-gray-600 text-lg">🔍</span>
                    )}
                  </button>
                </div>

                {/* Search Results Dropdown */}
                {showResults && searchResults.length > 0 && (
                  <div ref={resultsRef} className="absolute top-12 right-0 w-96 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 max-h-96 overflow-y-auto z-50">
                    <div className="p-4">
                      <div className="text-sm text-gray-500 mb-3">Found {searchResults.length} results</div>
                      {searchResults.map((result) => (
                        <div
                          key={result.id}
                          onClick={() => handleResultClick(result)}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 cursor-pointer transition-all duration-200 border border-transparent hover:border-blue-200"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-xl">
                            {result.image}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-800 truncate">{result.title}</div>
                            <div className="text-sm text-gray-500">{result.location}</div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                {result.category}
                              </span>
                              <span className="text-sm font-semibold text-green-600">{result.price}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Add Service Button */}
              <button className="w-10 h-10 flex items-center justify-center bg-green-100 hover:bg-green-200 border border-green-200 rounded-full transition-all duration-300 hover:shadow-md group">
                <span className="text-green-600 text-lg group-hover:scale-110 transition-transform duration-200">➕</span>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100/80 backdrop-blur-sm border border-gray-200 rounded-full transition-all duration-300 hover:bg-gray-200/80 hover:shadow-md relative"
                >
                  <span className="text-gray-600 text-lg">🔔</span>
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute top-12 right-0 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 z-50">
                    <div className="p-4">
                      <div className="font-semibold text-gray-800 mb-3">Notifications</div>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-xl">
                          <span className="text-blue-600">📍</span>
                          <div>
                            <div className="text-sm font-medium text-gray-800">New boarding available</div>
                            <div className="text-xs text-gray-500">Premium rooms near campus - 2 min ago</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-xl">
                          <span className="text-green-600">🚗</span>
                          <div>
                            <div className="text-sm font-medium text-gray-800">Taxi booking confirmed</div>
                            <div className="text-xs text-gray-500">Your ride will arrive in 5 minutes - 5 min ago</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-xl">
                          <span className="text-purple-600">📚</span>
                          <div>
                            <div className="text-sm font-medium text-gray-800">New book exchange post</div>
                            <div className="text-xs text-gray-500">Engineering textbooks available - 1 hr ago</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile / Sign In */}
              {isLoggedIn ? (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200">
                  <span className="text-white font-semibold text-sm">JD</span>
                </div>
              ) : (
                <button 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 hover:from-blue-600 hover:to-purple-600 hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5 active:translate-y-0"
                  onClick={() => setShowLogin(true)}
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button 
              className={`lg:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5 rounded-lg transition-all duration-300 hover:bg-gray-100 ${
                mobileMenuOpen ? 'bg-gray-100' : ''
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`} />
              <span className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`} />
              <span className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileMenuOpen 
              ? 'max-h-[32rem] pb-6 opacity-100' 
              : 'max-h-0 pb-0 opacity-0'
          }`}>
            <div className="px-2 pt-4 pb-3 space-y-3 bg-white/95 backdrop-blur-lg rounded-2xl border border-gray-200/50 shadow-xl">
              <a 
                href="/" 
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  menu === "Home" 
                    ? "text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => handleMenuItemClick("Home")}
              >
                🏠 Home
              </a>
              <a 
                href='#explore-menu' 
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  menu === "Menu" 
                    ? "text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => handleMenuItemClick("Menu")}
              >
                🛠️ Services
              </a>
              <a 
                href='#app-download' 
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  menu === "Mobile-App" 
                    ? "text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => handleMenuItemClick("Mobile-App")}
              >
                📱 Mobile App
              </a>
              <a 
                href='#footer' 
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  menu === "Contact Us" 
                    ? "text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => handleMenuItemClick("Contact Us")}
              >
                📞 Contact Us
              </a>
              
              {/* Mobile Search */}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600 text-lg">🔍</span>
                  <input 
                    type="text" 
                    placeholder="Search boarding, taxi, food..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-500 focus:outline-none"
                  />
                </div>
                
                {/* Mobile Search Results */}
                {searchResults.length > 0 && (
                  <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                    {searchResults.slice(0, 4).map((result) => (
                      <div
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="flex items-center space-x-3 p-3 bg-white rounded-xl cursor-pointer"
                      >
                        <span className="text-xl">{result.image}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-800">{result.title}</div>
                          <div className="text-xs text-gray-500">{result.location}</div>
                        </div>
                        <div className="text-sm font-semibold text-green-600">{result.price}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Mobile Notifications */}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-gray-700 font-medium">Notifications</span>
                  <div className="flex items-center space-x-2">
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications}
                    </span>
                    <span className="text-gray-600 text-lg">🔔</span>
                  </div>
                </div>
              </div>
              
              {/* Mobile Sign In */}
              <button 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/25"
                onClick={() => {
                  setShowLogin(true);
                  setMobileMenuOpen(false);
                }}
              >
                {isLoggedIn ? 'Profile' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Demo Content */}
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center">
   
     
            
           
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default Navbar;