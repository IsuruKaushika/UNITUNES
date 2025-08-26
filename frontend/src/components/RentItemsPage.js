import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productList from "./ProductList";

// Custom Logo Component
const CustomLogo = ({ onClick, className = "" }) => (
  <div 
    onClick={onClick}
    className={`cursor-pointer hover:scale-105 transition-transform duration-300 ${className}`}
  >
    <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-xl p-2 shadow-md">
      <div className="flex items-center gap-2">
        <div className="relative">
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border border-white animate-pulse"></div>
        </div>
        <div className="text-white font-bold text-lg">
          UniTunes
        </div>
      </div>
    </div>
  </div>
);

// Categories Navigation Component
const CategoriesNav = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { 
      id: 'all', 
      name: 'All Items', 
      icon: '🏪',
      color: 'from-gray-500 to-gray-600'
    },
    { 
      id: 'electronics', 
      name: 'Electronics', 
      icon: '💻',
      color: 'from-blue-500 to-blue-600',
      subCategories: ['Laptops', 'Phones', 'Tablets', 'Cameras', 'Gaming']
    },
    { 
      id: 'sports', 
      name: 'Sports', 
      icon: '⚽',
      color: 'from-green-500 to-green-600',
      subCategories: ['Football', 'Cricket', 'Basketball', 'Tennis', 'Fitness']
    },
    { 
      id: 'clothes', 
      name: 'Clothing', 
      icon: '👕',
      color: 'from-purple-500 to-purple-600',
      subCategories: ['Formal', 'Casual', 'Party Wear', 'Traditional', 'Accessories']
    },
    { 
      id: 'watches', 
      name: 'Watches', 
      icon: '⌚',
      color: 'from-yellow-500 to-yellow-600',
      subCategories: ['Smart Watch', 'Analog', 'Digital', 'Luxury', 'Sports']
    },
    { 
      id: 'books', 
      name: 'Books', 
      icon: '📚',
      color: 'from-indigo-500 to-indigo-600',
      subCategories: ['Textbooks', 'Novels', 'Reference', 'Study Guides', 'Magazines']
    },
    { 
      id: 'vehicles', 
      name: 'Vehicles', 
      icon: '🏍️',
      color: 'from-red-500 to-red-600',
      subCategories: ['Bicycles', 'Motorcycles', 'Scooters', 'Cars', 'Parts']
    },
    { 
      id: 'musical', 
      name: 'Musical', 
      icon: '🎸',
      color: 'from-pink-500 to-pink-600',
      subCategories: ['Guitars', 'Keyboards', 'Drums', 'Audio Equipment', 'Accessories']
    },
    { 
      id: 'furniture', 
      name: 'Furniture', 
      icon: '🪑',
      color: 'from-orange-500 to-orange-600',
      subCategories: ['Study Table', 'Chairs', 'Storage', 'Bed', 'Decoration']
    },
    { 
      id: 'tools', 
      name: 'Tools', 
      icon: '🔧',
      color: 'from-cyan-500 to-cyan-600',
      subCategories: ['Study Tools', 'Lab Equipment', 'Art Supplies', 'Tech Tools', 'General']
    }
  ];

  const [showDropdown, setShowDropdown] = useState(null);

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main Categories */}
        <div className="flex items-center space-x-1 py-3 overflow-x-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative"
              onMouseEnter={() => setShowDropdown(category.id)}
              onMouseLeave={() => setShowDropdown(null)}
            >
              <button
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-md`
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm font-semibold">{category.name}</span>
                {category.subCategories && (
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>

              {/* Dropdown Menu */}
              {category.subCategories && showDropdown === category.id && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl py-2 min-w-48 z-60">
                  {category.subCategories.map((subCategory) => (
                    <button
                      key={subCategory}
                      onClick={() => onCategoryChange(category.id, subCategory)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                    >
                      {subCategory}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Category Description Banner */}
        {activeCategory !== 'all' && (
          <div className="py-2 border-t border-gray-100">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg px-4 py-2">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">
                  {categories.find(cat => cat.id === activeCategory)?.icon} 
                  {categories.find(cat => cat.id === activeCategory)?.name}
                </span>
                <span className="ml-2">- Perfect for university students</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Floating Action Button Component
const FloatingActionButton = ({ onClick }) => (
  <div className="fixed bottom-6 right-6 z-50">
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 p-4 rounded-full shadow-2xl hover:shadow-lg transform hover:scale-110 transition-all duration-300 group animate-bounce hover:animate-none"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>
    <div className="absolute -top-2 -left-16 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
      Add Item
    </div>
  </div>
);

// Filter Component - Daraz Style
const FilterBar = ({ onFilterChange, activeFilters }) => {
  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under Rs 500", value: "0-500" },
    { label: "Rs 500 - 1,000", value: "500-1000" },
    { label: "Rs 1,000 - 2,000", value: "1000-2000" },
    { label: "Above Rs 2,000", value: "2000+" }
  ];

  const sortOptions = [
    { label: "Relevance", value: "relevance" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Newest First", value: "newest" },
    { label: "Most Popular", value: "popular" }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Price Filter */}
        <div>
          <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
            Price Range
          </label>
          <select
            value={activeFilters.price}
            onChange={(e) => onFilterChange({ ...activeFilters, price: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-black"
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
            Sort By
          </label>
          <select
            value={activeFilters.sort}
            onChange={(e) => onFilterChange({ ...activeFilters, sort: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-black"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-xs font-medium text-black mb-2 uppercase tracking-wide">
            Location
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-black"
          >
            <option>All Locations</option>
            <option>On Campus</option>
            <option>Near Campus</option>
            <option>City Center</option>
          </select>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <button
            onClick={() => onFilterChange({ price: 'all', sort: 'relevance', category: 'all' })}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors duration-200 text-sm"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

// Favorites functionality - Using state instead of localStorage
const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];
    
    setFavorites(updatedFavorites);
  };

  return { favorites, toggleFavorite };
};

function RentItemsPage() {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState(productList);
  const [filteredItems, setFilteredItems] = useState(productList);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState('all');
  const [filters, setFilters] = useState({ price: 'all', sort: 'relevance', category: 'all' });
  const { favorites, toggleFavorite } = useFavorites();

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...itemList];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => 
        item.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Apply price filter
    if (filters.price !== 'all') {
      filtered = filtered.filter(item => {
        const price = parseInt(item.pricePerDay) || 0;
        
        switch (filters.price) {
          case '0-500':
            return price <= 500;
          case '500-1000':
            return price > 500 && price <= 1000;
          case '1000-2000':
            return price > 1000 && price <= 2000;
          case '2000+':
            return price > 2000;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sort) {
        case 'price_asc':
          return (parseInt(a.pricePerDay) || 0) - (parseInt(b.pricePerDay) || 0);
        case 'price_desc':
          return (parseInt(b.pricePerDay) || 0) - (parseInt(a.pricePerDay) || 0);
        case 'newest':
          return itemList.indexOf(b) - itemList.indexOf(a);
        case 'popular':
          return (b.popularity || 0) - (a.popularity || 0);
        case 'relevance':
        default:
          return 0;
      }
    });

    setFilteredItems(filtered);
  }, [itemList, searchQuery, activeCategory, filters]);

  const handleCategoryChange = (categoryId, subCategory = null) => {
    setActiveCategory(categoryId);
    setFilters({...filters, category: categoryId});
  };

  const handleItemClick = (id) => {
    navigate(`/rent-item/${id}`);
  };

  const handleAddItem = () => {
    navigate('/add-rent-item');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </button>

            {/* Logo */}
            <CustomLogo onClick={() => navigate("/")} />

            {/* User Actions */}
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-gray-800 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="text-gray-600 hover:text-gray-800 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for items, brands and more..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <CategoriesNav 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <span>UniTunes</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span>Rental Items</span>
          {activeCategory !== 'all' && (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-700 font-medium capitalize">{activeCategory}</span>
            </>
          )}
        </nav>

        {/* Filter Bar */}
        <FilterBar onFilterChange={setFilters} activeFilters={filters} />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            <span className="text-sm">
              {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
              {searchQuery && <span> for "{searchQuery}"</span>}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>View:</span>
              <button className="p-1 border border-orange-500 text-orange-500 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button className="p-1 border border-gray-300 text-gray-500 rounded hover:border-orange-500 hover:text-orange-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group hover:border-orange-300"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className={`absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-md transition-colors ${
                      favorites.includes(item.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <svg className="w-4 h-4" fill={favorites.includes(item.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-800 mb-1 group-hover:text-orange-600 transition-colors overflow-hidden">
                    <span className="line-clamp-2">{item.name}</span>
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                      {[1,2,3,4,5].map((star) => (
                        <svg key={star} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">(234)</span>
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold text-sm">
                        Rs {parseInt(item.pricePerDay || 0).toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        Rs {Math.round((parseInt(item.pricePerDay || 0)) * 1.2).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">per day</div>
                  </div>

                  {/* Location */}
                  <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>Near Campus</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No items found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory('all');
                setFilters({ price: 'all', sort: 'relevance', category: 'all' });
              }}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleAddItem} />
    </div>
  );
}

export default RentItemsPage;