import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

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
        <div className="text-white font-bold text-lg">UniTunes</div>
      </div>
    </div>
  </div>
);

// Filter Component
const FilterBar = ({ onFilterChange, activeFilters, priceRanges }) => {
  const handleSortChange = (value) => onFilterChange({ ...activeFilters, sort: value });
  const handlePriceRangeChange = (value) => onFilterChange({ ...activeFilters, priceRange: value });

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Price Range
            <span className="ml-2 text-xs bg-yellow-100 text-black px-2 py-1 rounded-full">
              {activeFilters.priceRange === "all" ? "All" : activeFilters.priceRange}
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

        {/* Sort */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Sort By
            <span className="ml-2 text-xs bg-blue-100 text-black px-2 py-1 rounded-full">
              {activeFilters.sort === "name"
                ? "Name"
                : activeFilters.sort === "price-low"
                ? "Price: Low to High"
                : "Price: High to Low"}
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

        {/* Clear */}
        <div className="flex items-end">
          <button
            onClick={() => onFilterChange({ priceRange: "all", sort: "name" })}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
          >
            Clear Filters
          </button>
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
  const [searchLoading, setSearchLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [filters, setFilters] = useState({ priceRange: "all", sort: "name" });

  const priceRanges = [
    { value: "under-50000", label: "Under Rs 50,000" },
    { value: "50000-100000", label: "Rs 50,000 - 100,000" },
    { value: "100000-200000", label: "Rs 100,000 - 200,000" },
    { value: "above-200000", label: "Above Rs 200,000" },
  ];

  const fetchShops = async () => {
    setLoading(true);
    try {
      const headers = token ? { headers: { token } } : {};
      const response = await axios.get(`${backendUrl}/api/shop/list`, headers);

      if (response.data?.success && Array.isArray(response.data.products)) {
        setShopListData(response.data.products);
      } else {
        console.error("Invalid response:", response.data);
        setShopListData([]);
      }
    } catch (error) {
      console.error("API call failed:", error.message);
      setShopListData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleShopClick = (shop) => {
    navigate(`/shop-details/${shop._id}`, { state: { item: shop } });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchLoading(true);
    setTimeout(() => setSearchLoading(false), 500);
  };

  const removeShop = async (id) => {
    if (!token) return alert("Admin token required");
    try {
      const response = await axios.post(
        `${backendUrl}/api/shop/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        alert(response.data.message);
        fetchShops();
      } else alert(response.data.message);
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  };

  // Filter & sort
  let filteredShops = shopListData.filter((shop) => {
    const matchesSearch =
      searchQuery === "" ||
      shop.Title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (shop.address && shop.address.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPriceRange =
      filters.priceRange === "all" ||
      (() => {
        const price = parseInt(shop.price) || 0;
        switch (filters.priceRange) {
          case "under-50000":
            return price < 50000;
          case "50000-100000":
            return price >= 50000 && price <= 100000;
          case "100000-200000":
            return price >= 100000 && price <= 200000;
          case "above-200000":
            return price > 200000;
          default:
            return true;
        }
      })();

    return matchesSearch && matchesPriceRange;
  });

  // Safe sort
  filteredShops.sort((a, b) => {
    const nameA = a.Title || a.name || "";
    const nameB = b.Title || b.name || "";

    if (filters.sort === "name") return nameA.localeCompare(nameB);
    if (filters.sort === "price-low") return (parseInt(a.price) || 0) - (parseInt(b.price) || 0);
    if (filters.sort === "price-high") return (parseInt(b.price) || 0) - (parseInt(a.price) || 0);
    return 0;
  });

  if (loading) return <div>Loading shops...</div>;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4">
      <FilterBar onFilterChange={setFilters} activeFilters={filters} priceRanges={priceRanges} />

      <div className="mb-8">
        <span className="inline-block bg-white px-6 py-3 rounded-full shadow-md border border-gray-200 text-gray-700 font-medium">
          {filteredShops.length} shop{filteredShops.length !== 1 ? "s" : ""} available
        </span>
      </div>

      {filteredShops.length > 0 ? (
        <div
          className={`${
            viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : "space-y-6"
          }`}
        >
          {filteredShops.map((shop, index) => (
            <div
              key={index}
              onClick={() => handleShopClick(shop)}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 hover:border-yellow-200 ${
                viewMode === "list" ? "flex items-center p-6 space-x-6" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 h-32 flex-shrink-0" : "h-56"}`}>
                {shop.image?.[0] ? (
                  <img
                    src={shop.image[0]}
                    alt={shop.Title || shop.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span>No Image</span>
                  </div>
                )}

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Rs {shop.price || 0}/mo
                </div>

                {/* Available Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800 shadow-lg">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    Available
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${viewMode === "list" ? "flex-1" : "p-6"}`}>
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1 group-hover:text-yellow-600 transition-colors duration-300">
                  {shop.Title || shop.name}
                </h3>

                {shop.address && <p className="text-gray-500 line-clamp-2">{shop.address}</p>}

                {token && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeShop(shop._id);
                    }}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-300"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No shops found 😢</div>
      )}
    </div>
  );
};

export default ShopList;
