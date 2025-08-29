import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// Enhanced Logo Component with animation
const CustomLogo = ({ onClick, className = "" }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer hover:scale-105 transition-all duration-300 group ${className}`}
  >
    <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl p-4 shadow-xl group-hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3">
        <svg
          className="w-10 h-10 text-white transform group-hover:rotate-12 transition-transform duration-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <div className="text-white font-bold text-xl tracking-wide">UniTunes</div>
      </div>
    </div>
  </div>
);

// Enhanced Filter Bar with icons
const FilterBar = ({ onFilterChange, activeFilter }) => {
  const categories = [
    { id: "bakery", name: "Bakery", icon: "🥖" },
    { id: "grocery", name: "Grocery", icon: "🛒" },
    { id: "meals", name: "Meals", icon: "🍽️" },
    { id: "bookshop", name: "Books", icon: "📚" },
    { id: "communication", name: "Telecom", icon: "📱" }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Category</h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onFilterChange("")}
          className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 ${
            activeFilter === ""
              ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg scale-105"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-102"
          }`}
        >
          <span>🏪</span>
          All Shops
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onFilterChange(cat.id)}
            className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 ${
              activeFilter === cat.id
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-102"
            }`}
          >
            <span>{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent mb-4 mx-auto"></div>
      <p className="text-xl font-semibold text-gray-600">Loading amazing shops...</p>
    </div>
  </div>
);

// Enhanced Shop Card
const ShopCard = ({ shop, token, onRemove }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const getCategoryIcon = (category) => {
    const icons = {
      bakery: "🥖",
      grocery: "🛒",
      meals: "🍽️",
      bookshop: "📚",
      communication: "📱"
    };
    return icons[category?.toLowerCase()] || "🏪";
  };

  const getCategoryColor = (category) => {
    const colors = {
      bakery: "from-orange-400 to-red-400",
      grocery: "from-green-400 to-emerald-400",
      meals: "from-yellow-400 to-orange-400",
      bookshop: "from-blue-400 to-indigo-400",
      communication: "from-purple-400 to-pink-400"
    };
    return colors[category?.toLowerCase()] || "from-gray-400 to-gray-500";
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:scale-105 border border-white/50">
      {/* Image Section */}
      <div 
        className="h-64 relative overflow-hidden cursor-pointer"
        onClick={() => navigate(`/shop-details/${shop._id}`, { state: { item: shop } })}
      >
        {shop.image?.[0] && !imageError ? (
          <img
            src={shop.image[0]}
            alt={shop.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">{getCategoryIcon(shop.Category)}</div>
              <p className="text-gray-500 font-medium">No Image Available</p>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className={`absolute top-4 right-4 bg-gradient-to-r ${getCategoryColor(shop.Category)} px-3 py-1 rounded-full text-white text-sm font-semibold shadow-lg`}>
          <span className="mr-1">{getCategoryIcon(shop.Category)}</span>
          {shop.Category || "General"}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/90 px-4 py-2 rounded-full text-gray-800 font-semibold">
            View Details
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 cursor-pointer line-clamp-2"
              onClick={() => navigate(`/shop-details/${shop._id}`, { state: { item: shop } })}>
            {shop.name}
          </h3>
        </div>
        
        <div className="flex items-center gap-2 mb-3 text-gray-600">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm line-clamp-2">{shop.address || "Address not provided"}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <button
            onClick={() => navigate(`/shop-details/${shop._id}`, { state: { item: shop } })}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View Shop
          </button>
          
          {token && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Are you sure you want to remove "${shop.name}"?`)) {
                  onRemove(shop._id);
                }
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ShopList = ({ token }) => {
  const navigate = useNavigate();
  const [shopListData, setShopListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const categoryOrder = ["bakery", "grocery", "meals", "bookshop", "communication"];

  // Fetch shops
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
        console.error("Error fetching shops:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  // Remove shop
  const removeShop = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/shop/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        setShopListData((prev) => prev.filter((shop) => shop._id !== id));
        // Success notification could be added here
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // Filter + Search
  let filteredShops = shopListData.filter((shop) => {
    const matchesSearch =
      searchQuery === "" ||
      (shop.name && shop.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (shop.address && shop.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (shop.Category && shop.Category.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      categoryFilter === "" || (shop.Category || "").toLowerCase() === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Sort by category order
  filteredShops.sort((a, b) => {
    const catA = (a.Category || "").toLowerCase();
    const catB = (b.Category || "").toLowerCase();
    const indexA = categoryOrder.indexOf(catA);
    const indexB = categoryOrder.indexOf(catB);
    return (
      (indexA === -1 ? categoryOrder.length : indexA) -
      (indexB === -1 ? categoryOrder.length : indexB)
    );
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-gray-700 hover:text-gray-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <CustomLogo onClick={() => navigate("/")} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Discover Amazing Shops
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of local businesses and find exactly what you're looking for
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search shops by name, address, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg rounded-3xl border border-white/50 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-lg transition-all duration-300"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar onFilterChange={setCategoryFilter} activeFilter={categoryFilter} />

        {/* Results Counter */}
        <div className="mb-6 text-center">
          <p className="text-lg text-gray-600">
            {filteredShops.length === shopListData.length
              ? `Showing all ${filteredShops.length} shops`
              : `Found ${filteredShops.length} of ${shopListData.length} shops`}
          </p>
        </div>

        {/* Shop Grid */}
        {filteredShops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredShops.map((shop) => (
              <ShopCard
                key={shop._id}
                shop={shop}
                token={token}
                onRemove={removeShop}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-8xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No shops found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery || categoryFilter
                ? "Try adjusting your search or filter criteria"
                : "No shops are currently available"}
            </p>
            {(searchQuery || categoryFilter) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("");
                }}
                className="px-6 py-3 bg-indigo-500 text-white rounded-2xl hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopList;