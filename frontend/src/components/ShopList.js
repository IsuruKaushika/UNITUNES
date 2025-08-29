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
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <div className="text-white font-bold text-lg">UniTunes</div>
      </div>
    </div>
  </div>
);

// Filter Bar Component
const FilterBar = ({ onFilterChange, activeFilter }) => {
  const categories = ["bakery", "grocery", "meals", "bookshop", "communication"];
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onFilterChange(cat)}
            className={`px-4 py-2 rounded-xl font-medium transition-colors duration-300 ${
              activeFilter === cat
                ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
        <button
          onClick={() => onFilterChange("")}
          className="px-4 py-2 rounded-xl font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300"
        >
          All
        </button>
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

  // Custom category order
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
        alert(response.data.message);
        setShopListData((prev) => prev.filter((shop) => shop._id !== id));
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
      (shop.address && shop.address.toLowerCase().includes(searchQuery.toLowerCase()));

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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading shops...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Back
        </button>
        <CustomLogo onClick={() => navigate("/")} />
      </div>

      {/* Search bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search shops..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
        />
      </div>

      {/* Filter bar */}
      <FilterBar
        onFilterChange={setCategoryFilter}
        activeFilter={categoryFilter}
      />

      {/* Shop Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShops.length > 0 ? (
          filteredShops.map((shop) => (
            <div
              key={shop._id}
              onClick={() =>
                navigate(`/shop-details/${shop._id}`, { state: { item: shop } })
              }
              className="bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-all"
            >
              {/* Shop image */}
              <div className="h-56 relative">
                {shop.image?.[0] ? (
                  <img
                    src={shop.image[0]}
                    alt={shop.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl">
                    No Image
                  </div>
                )}
              </div>

              {/* Shop info */}
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">{shop.name}</h3>
                <p className="text-gray-500 line-clamp-2">{shop.address}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Category: {shop.Category}
                </p>

                {/* Remove button (only visible if logged in as admin/with token) */}
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
          ))
        ) : (
          <div className="text-center py-20">No shops found 😢</div>
        )}
      </div>
    </div>
  );
};

export default ShopList;
