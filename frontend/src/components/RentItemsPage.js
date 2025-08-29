import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// ----------------- Reusable Components -----------------
const CustomLogo = ({ onClick, className = "" }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer hover:scale-110 transition-transform duration-300 ${className}`}
  >
    <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-2xl p-3 shadow-lg">
      <div className="flex items-center gap-2">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a9 9 0 100 18 9 9 0 000-18zm3.5 9.5l-4 4-2-2 1.5-1.5 0.5 0.5 2.5-2.5 1.5 1.5z" />
        </svg>
        <div className="text-white font-bold text-lg">UniTunes</div>
      </div>
    </div>
  </div>
);

const FloatingActionButton = ({ onClick }) => (
  <div className="fixed bottom-6 right-6 z-50">
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 group animate-bounce hover:animate-none"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>
    <div className="absolute -top-2 -left-20 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
      Add Item
    </div>
  </div>
);

const FilterBar = ({ onFilterChange, activeFilters }) => {
  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under Rs 500", value: "0-500" },
    { label: "Rs 500 - 1,000", value: "500-1000" },
    { label: "Rs 1,000 - 2,500", value: "1000-2500" },
    { label: "Above Rs 2,500", value: "2500+" }
  ];

  const sortOptions = [
    { label: "Newest First", value: "newest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "A-Z", value: "name_asc" }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Price Range</label>
          <select
            value={activeFilters.price}
            onChange={(e) => onFilterChange({ ...activeFilters, price: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-300 cursor-pointer text-black"
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Sort By</label>
          <select
            value={activeFilters.sort}
            onChange={(e) => onFilterChange({ ...activeFilters, sort: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-300 cursor-pointer text-black"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => onFilterChange({ price: "all", sort: "newest", showFavoritesOnly: false })}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

// Using state instead of localStorage (as per artifact restrictions)
const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  
  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];
    setFavorites(updated);
  };
  
  return { favorites, toggleFavorite };
};

// ----------------- Rent Items Page -----------------
const RentItemsPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [filters, setFilters] = useState({ price: "all", sort: "newest", showFavoritesOnly: false });
  const { favorites, toggleFavorite } = useFavorites();

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching from:', `${backendUrl}/api/rent/list`);
        const res = await axios.get(`${backendUrl}/api/rent/list`);
        console.log('Backend response:', res.data);
        
        let itemsData = [];
        
        // Handle different response formats
        if (res.data?.success) {
          // If response has success flag
          if (Array.isArray(res.data.products)) {
            itemsData = res.data.products;
          } else if (Array.isArray(res.data.items)) {
            itemsData = res.data.items;
          } else if (Array.isArray(res.data.data)) {
            itemsData = res.data.data;
          }
        } else if (Array.isArray(res.data)) {
          // If response is direct array
          itemsData = res.data;
        }
        
        console.log('Processed items:', itemsData);
        setItems(itemsData);
        setFiltered(itemsData);
        
        if (itemsData.length === 0) {
          setError("No rental items found in the response");
        }
        
      } catch (err) {
        console.error("Backend fetch error:", err);
        console.error("Error details:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          url: `${backendUrl}/api/rent/list`
        });
        
        setError(`Failed to fetch items: ${err.message}`);
        setItems([]);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    };
    
    if (backendUrl) {
      fetchItems();
    } else {
      console.error('Backend URL not configured');
      setError('Backend URL not configured');
      setLoading(false);
    }
  }, []);

  // Apply search + filters + sorting
  useEffect(() => {
    let list = [...items];
    
    if (searchQuery) {
      list = list.filter(item =>
        // Handle different field name possibilities
        (item.title || item.itemName || item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.owner || item.ownerName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.category || item.rentType || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.price !== "all") {
      list = list.filter(item => {
        const p = parseInt(item.price || item.dailyRate || item.rentalPrice || 0);
        switch (filters.price) {
          case "0-500": return p <= 500;
          case "500-1000": return p > 500 && p <= 1000;
          case "1000-2500": return p > 1000 && p <= 2500;
          case "2500+": return p > 2500;
          default: return true;
        }
      });
    }

    list.sort((a, b) => {
      switch (filters.sort) {
        case "price_asc": 
          return (parseInt(a.price || a.dailyRate || 0)) - (parseInt(b.price || b.dailyRate || 0));
        case "price_desc": 
          return (parseInt(b.price || b.dailyRate || 0)) - (parseInt(a.price || a.dailyRate || 0));
        case "name_asc": 
          return (a.title || a.itemName || "").localeCompare(b.title || b.itemName || "");
        case "newest":
        default:
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          return 0;
      }
    });

    if (filters.showFavoritesOnly) {
      list = list.filter(item => favorites.includes(item._id));
    }

    setFiltered(list);
  }, [items, searchQuery, filters, favorites]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm shadow z-40">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="bg-gradient-to-r from-gray-800 to-gray-700 text-white px-6 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-400 hover:text-gray-900 transition"
          >
            Back
          </button>
          <CustomLogo onClick={() => navigate("/")} />
        </div>
      </div>

      {/* Title */}
      <div className="text-center my-12">
        <h1 className="text-5xl font-bold text-gray-800">Rental Items</h1>
        <p className="text-gray-600 mt-3">Find, compare, and rent with ease</p>
      </div>

      {/* Search + View Toggle */}
      <div className="max-w-4xl mx-auto mb-8 px-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, category, owner..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl shadow focus:ring-2 focus:ring-yellow-200"
          />
          <div className="flex border border-gray-200 rounded-xl overflow-hidden">
            <button 
              onClick={() => setViewMode("grid")} 
              className={`px-4 py-2 transition-colors ${viewMode === "grid" ? "bg-yellow-300" : "hover:bg-gray-100"}`}
            >
              Grid
            </button>
            <button 
              onClick={() => setViewMode("list")} 
              className={`px-4 py-2 transition-colors ${viewMode === "list" ? "bg-yellow-300" : "hover:bg-gray-100"}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <FilterBar onFilterChange={setFilters} activeFilters={filters} />

        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-4 bg-gray-100 rounded-lg text-sm">
            <strong>Debug Info:</strong><br/>
            Backend URL: {backendUrl || 'Not configured'}<br/>
            Items loaded: {items.length}<br/>
            Filtered items: {filtered.length}<br/>
            {error && <span className="text-red-600">Error: {error}</span>}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin mb-4"></div>
              <p>Loading rental items...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-600 mb-4">Error loading items</div>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              Retry
            </button>
          </div>
        ) : filtered.length > 0 ? (
          <div className={`${viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : "space-y-6"}`}>
            {filtered.map(item => (
              <div 
                key={item._id} 
                onClick={() => navigate(`/rent-details/${item._id}`)} 
                className={`bg-white rounded-2xl shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer relative overflow-hidden ${viewMode === "list" ? "flex items-center p-6 space-x-6" : "p-4"}`}
              >
                {/* Image */}
                <div className={`${viewMode === "list" ? "w-48 h-32 flex-shrink-0" : "w-full h-48"} overflow-hidden rounded-xl`}>
                  <img 
                    src={item.image?.[0] || item.itemImage || '/api/placeholder/300/300'} 
                    alt={item.title || item.itemName || 'Rental item'} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/300/300';
                    }}
                  />
                </div>
                
                {/* Content */}
                <div className={`${viewMode === "list" ? "flex-1" : "mt-4"}`}>
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                    {item.title || item.itemName || 'Untitled Item'}
                  </h3>
                  
                  {item.description && (
                    <p className="text-gray-600 text-sm line-clamp-2 mt-2">
                      {item.description}
                    </p>
                  )}
                  
                  {(item.category || item.rentType) && (
                    <div className="mt-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {item.category || item.rentType}
                      </span>
                    </div>
                  )}
                  
                  {(item.owner || item.ownerName) && (
                    <p className="text-gray-500 text-sm mt-2">
                      Owner: {item.owner || item.ownerName}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-gray-800">
                      Rs {parseInt(item.price || item.dailyRate || item.rentalPrice || 0).toLocaleString()}
                      {item.dailyRate && <span className="text-sm font-normal text-gray-500">/day</span>}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); 
                        toggleFavorite(item._id);
                      }} 
                      className={`p-2 rounded-full transition-colors ${
                        favorites.includes(item._id) ? "text-red-500 bg-red-50" : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                      }`}
                    >
                      <svg className="w-5 h-5" fill={favorites.includes(item._id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-600">
            <div className="mb-4">
              <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No rental items found</h3>
            <p className="mb-4">
              {searchQuery ? `No items match "${searchQuery}"` : "No rental items are currently available"}
            </p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-lg hover:bg-yellow-500 transition"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Show favorites toggle */}
        {favorites.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setFilters({...filters, showFavoritesOnly: !filters.showFavoritesOnly})}
              className={`px-6 py-2 rounded-full transition-colors ${
                filters.showFavoritesOnly 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filters.showFavoritesOnly ? 'Show All Items' : `Show Favorites Only (${favorites.length})`}
            </button>
          </div>
        )}
      </div>

      <FloatingActionButton onClick={() => navigate("/add-rent")} />

      <div className="mt-20 py-8 bg-white/80 backdrop-blur-sm border-t border-gray-100 text-center text-sm text-gray-500">
        © 2025 UniTunes. Rent smarter.
      </div>
    </div>
  );
};

export default RentItemsPage;