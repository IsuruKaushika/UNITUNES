import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Correct backend URL for Vite
const backendUrl = process.env.REACT_APP_BACKEND_URL;

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
        <div className="text-white font-bold text-lg">UniTunes</div>
      </div>
    </div>
  </div>
);

// Categories Navigation Component
const CategoriesNav = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: "all", name: "All Items", icon: "🏪", color: "from-gray-500 to-gray-600" },
    { id: "Electronics", name: "Electronics", icon: "💻", color: "from-blue-500 to-blue-600" },
    { id: "Furniture", name: "Furniture", icon: "🪑", color: "from-orange-500 to-orange-600" },
    { id: "Tools", name: "Tools", icon: "🔧", color: "from-cyan-500 to-cyan-600" },
    { id: "Books", name: "Books", icon: "📚", color: "from-indigo-500 to-indigo-600" },
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-1 py-3 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-md`
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="text-sm font-semibold">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Floating Action Button Component
const FloatingActionButton = ({ onClick }) => (
  <div className="fixed bottom-6 right-6 z-50">
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 p-4 rounded-full shadow-2xl hover:shadow-lg transform hover:scale-110 transition-all duration-300"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </div>
);

function RentItemsPage() {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  // Fetch rental items
  useEffect(() => {
    const fetchRentalItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/api/rent/list`);
        if (response.data.success) {
          setItemList(response.data.rentItems || []);
          setFilteredItems(response.data.rentItems || []);
        } else {
          setItemList([]);
          setFilteredItems([]);
        }
      } catch (error) {
        console.error("Error fetching rental items:", error);
        setItemList([]);
        setFilteredItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRentalItems();
  }, []);

  // Filter by category
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredItems(itemList);
    } else {
      setFilteredItems(itemList.filter((item) => item.rentType === activeCategory));
    }
  }, [activeCategory, itemList]);

  const handleCategoryChange = (categoryId) => setActiveCategory(categoryId);
  const handleAddItem = () => navigate("/add-rent-item");
  const handleItemClick = (id) => navigate(`/rent-item/${id}`);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-800">
            Back
          </button>
          <CustomLogo onClick={() => navigate("/")} />
        </div>
      </div>

      <CategoriesNav activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <p className="ml-4 text-gray-600">Loading rental items...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                onClick={() => handleItemClick(item._id)}
                className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <img
                  src={item.itemImage || "/api/placeholder/300/300"}
                  alt={item.itemName}
                  className="w-full h-48 object-cover"
                  onError={(e) => (e.target.src = "/api/placeholder/300/300")}
                />
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-800">{item.itemName}</h3>
                  <p className="text-xs text-gray-500">{item.rentType}</p>
                  <p className="text-orange-500 font-bold">Rs {item.price}/day</p>
                  <p className="text-xs text-gray-500">Owner: {item.ownerName}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-600">
            No rental items found.
          </div>
        )}
      </div>

      <FloatingActionButton onClick={handleAddItem} />
    </div>
  );
}

export default RentItemsPage;
