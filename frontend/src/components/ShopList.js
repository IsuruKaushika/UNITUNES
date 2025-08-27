import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;


// Custom Logo Component
const CustomLogo = ({ onClick, className = "" }) => (
  <div 
    onClick={onClick}
    className={`cursor-pointer hover:scale-110 transition-transform duration-300 ${className}`}
  >
    <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-2xl p-3 shadow-lg">
      <div className="flex items-center gap-2">
        <div className="relative">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </div>
        <div className="text-white font-bold text-lg">
          UniTunes
        </div>
      </div>
    </div>
  </div>
);

// Filter Component
const FilterBar = ({ onFilterChange, activeFilters, priceRanges }) => {
  const handleSortChange = (value) => {
    onFilterChange({ ...activeFilters, sort: value });
  };

  const handlePriceRangeChange = (value) => {
    onFilterChange({ ...activeFilters, priceRange: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Price Range
            <span className="ml-2 text-xs bg-yellow-100 text-black px-2 py-1 rounded-full">
              {activeFilters.priceRange === 'all' ? 'All' : activeFilters.priceRange}
            </span>
          </label>
          <select
            value={activeFilters.priceRange}
            onChange={(e) => handlePriceRangeChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-300 cursor-pointer text-black"
          >
            <option value="all">All Price Ranges</option>
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Sort By
            <span className="ml-2 text-xs bg-blue-100 text-black px-2 py-1 rounded-full">
              {activeFilters.sort === 'name' ? 'Name' : activeFilters.sort === 'price-low' ? 'Price: Low to High' : 'Price: High to Low'}
            </span>
          </label>
          <select
            value={activeFilters.sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-300 cursor-pointer text-black"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end">
          <button
            onClick={() => onFilterChange({ priceRange: 'all', sort: 'name' })}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

const ShopList = () => {
  const navigate = useNavigate();
  const [shopListData, setShopListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({ priceRange: 'all', sort: 'name' });

  const priceRanges = [
    { value: 'under-50000', label: 'Under Rs 50,000' },
    { value: '50000-100000', label: 'Rs 50,000 - 100,000' },
    { value: '100000-200000', label: 'Rs 100,000 - 200,000' },
    { value: 'above-200000', label: 'Above Rs 200,000' }
  ];

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/shop/list`);
        if (response.data?.success && Array.isArray(response.data.products)) {
          setShopListData(response.data.products);
        } else {
          console.error("Invalid response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching shop data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  // Filter and sort shops
  let filteredShops = shopListData.filter(shop => {
    const matchesSearch = searchQuery === "" || 
      shop.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (shop.address && shop.address.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesPriceRange = filters.priceRange === 'all' || (() => {
      const price = parseInt(shop.price);
      switch (filters.priceRange) {
        case 'under-50000': return price < 50000;
        case '50000-100000': return price >= 50000 && price <= 100000;
        case '100000-200000': return price >= 100000 && price <= 200000;
        case 'above-200000': return price > 200000;
        default: return true;
      }
    })();
    
    return matchesSearch && matchesPriceRange;
  });

  // Sort shops
  filteredShops.sort((a, b) => {
    if (filters.sort === 'name') {
      return a.Title.localeCompare(b.Title);
    } else if (filters.sort === 'price-low') {
      return parseInt(a.price) - parseInt(b.price);
    } else if (filters.sort === 'price-high') {
      return parseInt(b.price) - parseInt(a.price);
    }
    return 0;
  });

  const handleShopClick = (shop) => {
    navigate(`/shop-details/${shop._id}`, { state: { item: shop } });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchLoading(true);
    
    setTimeout(() => {
      setSearchLoading(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-xl text-gray-600 mt-6 font-medium">
            Loading shop listings...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Please wait while we fetch the latest shops
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-500"></div>

      {/* Header Section */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-yellow-400 hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-0.5 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            {/* Custom Logo */}
            <CustomLogo onClick={() => navigate("/")} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mb-6 shadow-lg animate-bounce">
            <span className="text-3xl">🏬</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-4">
            Available Shop Options
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover premium commercial spaces and retail opportunities perfect for your business
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Search Bar with View Toggle */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search shops, locations..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-300 text-gray-700 placeholder-gray-400"
              />
              {searchLoading && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <div className="w-5 h-5 border-2 border-yellow-200 border-t-yellow-500 rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-6 py-4 transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-6 py-4 transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Search Results Info */}
          {searchQuery && (
            <div className="mt-4 text-center">
              <span className="inline-block bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 text-gray-600 text-sm">
                {searchLoading ? 'Searching...' : `${filteredShops.length} result${filteredShops.length !== 1 ? 's' : ''} for "${searchQuery}"`}
              </span>
            </div>
          )}
        </div>

        {/* Filter Bar */}
        <FilterBar onFilterChange={setFilters} activeFilters={filters} priceRanges={priceRanges} />

        {/* Results Count */}
        <div className="mb-8">
          <span className="inline-block bg-white px-6 py-3 rounded-full shadow-md border border-gray-200 text-gray-700 font-medium">
            {filteredShops.length} shop{filteredShops.length !== 1 ? 's' : ''} available
          </span>
        </div>

        {/* Shops Grid/List */}
        {filteredShops.length > 0 ? (
          <div className={`max-w-7xl mx-auto ${
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
              : 'space-y-6'
          }`}>
            {filteredShops.map((shop, index) => (
              <div
                key={shop._id}
                onClick={() => handleShopClick(shop)}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 hover:border-yellow-200 ${
                  viewMode === 'list' ? 'flex items-center p-6 space-x-6' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleShopClick(shop);
                  }
                }}
              >
                {/* Image Container */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'h-56'
                }`}>
                  {shop.image?.[0] ? (
                    <img
                      src={shop.image[0]}
                      alt={shop.Title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Rs {shop.price}/mo
                    </div>
                  </div>

                  {/* Available Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800 shadow-lg">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        Available
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${viewMode === 'list' ? 'flex-1' : 'p-6'}`}>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1 group-hover:text-yellow-600 transition-colors duration-300">
                    {shop.Title}
                  </h3>
                  
                  {shop.address && (
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                        {shop.address}
                      </p>
                    </div>
                  )}

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                      Commercial Space
                    </span>
                    <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
                      Prime Location
                    </span>
                  </div>

                  {/* Action Button */}
                  <div className={`${viewMode === 'list' ? 'mt-0' : 'pt-4 border-t border-gray-100'}`}>
                    <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-4 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6 animate-pulse">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No Shops Found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchQuery 
                ? `We couldn't find any shops matching "${searchQuery}". Try searching with different keywords.`
                : "We couldn't find any shops matching your current filters."
              }
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilters({ priceRange: 'all', sort: 'name' });
              }}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-20 py-8 bg-white/80 backdrop-blur-sm border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 UniTunes. Your trusted partner for premium commercial spaces.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopList;