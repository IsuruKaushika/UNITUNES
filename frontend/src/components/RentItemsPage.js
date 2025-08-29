// src/pages/RentItemsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL; // Vite env variable

const RentItemsPage = ({ token }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${backendUrl}/api/rent/list`, {
          headers: { token }, // <-- include token for authentication
        });
        
        let itemsData = [];
        if (res.data?.success && Array.isArray(res.data.rentItems)) {
          itemsData = res.data.rentItems;
        } else if (Array.isArray(res.data)) {
          itemsData = res.data;
        }

        setItems(itemsData);
        if (itemsData.length === 0) setError("No rental items found");
      } catch (err) {
        console.error("Backend fetch error:", err);
        setError("Failed to fetch rental items");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchItems();
    } else {
      setError("User not authenticated");
      setLoading(false);
    }
  }, [token]);

  if (loading) return <div className="text-center py-20">Loading rental items...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Rent Items</h2>
        <button
          onClick={() => navigate("/add-rent")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Add New Item
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No rental items available</p>
          <button
            onClick={() => navigate("/add-rent")}
            className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
          >
            Add First Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-100">
                {item.itemImage ? (
                  <img src={item.itemImage} alt={item.itemName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{item.itemName}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.isAvailable ? 'Available' : 'Not Available'}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600 mb-3">
                  <p><span className="font-medium">Category:</span> {item.rentType}</p>
                  <p><span className="font-medium">Owner:</span> {item.ownerName}</p>
                  <p><span className="font-medium">Contact:</span> {item.contact}</p>
                  <p><span className="font-medium">Price:</span> LKR {item.price}/day</p>
                </div>
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">{item.description}</p>
              </div>
              <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500">
                Added: {new Date(item.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RentItemsPage;
