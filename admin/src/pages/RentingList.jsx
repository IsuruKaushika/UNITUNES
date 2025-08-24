// src/pages/RentingList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const backendUrl = import.meta.env.VITE_BACKEND_URL ;
const RentingList = ({ token }) => {
  const navigate = useNavigate();
  const [rentItems, setRentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, available, Electronics, Furniture, Tools, Books

  // Fetch rent items
  const fetchRentItems = async () => {
    try {
      setLoading(true);
      let endpoint = '/api/rent/list';
      
      // Use different endpoints based on filter
      if (filter === 'available') {
        endpoint = '/api/rent/available';
      } else if (filter !== 'all') {
        endpoint = `/api/rent/category/${filter}`;
      }

      const response = await axios.get(`${backendUrl}${endpoint}`, {
        headers: { token },
      });

      if (response.data.success) {
        setRentItems(response.data.rentItems);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching rent items:', error);
      toast.error('Failed to fetch rent items');
    } finally {
      setLoading(false);
    }
  };

  // Remove rent item
  const removeRentItem = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/rent/remove`, 
        { id }, 
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchRentItems(); // Refresh the list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error removing rent item:', error);
      toast.error('Failed to remove rent item');
    }
  };

  // Toggle availability
  const toggleAvailability = async (id, currentStatus) => {
    try {
      const response = await axios.post(`${backendUrl}/api/rent/availability`, 
        { id, isAvailable: !currentStatus }, 
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchRentItems(); // Refresh the list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating availability:', error);
      toast.error('Failed to update availability');
    }
  };

  useEffect(() => {
    fetchRentItems();
  }, [token, filter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading rent items...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Rent Items List</h2>
        <button
          onClick={() => navigate('/renting')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
        >
          Add New Item
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6">
        <p className="mb-2 font-medium text-gray-700">Filter by:</p>
        <div className="flex flex-wrap gap-2">
          {['all', 'available', 'Electronics', 'Furniture', 'Tools', 'Books'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filter === filterOption
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Rent Items Grid */}
      <div>
        {rentItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No rent items available</p>
            <button
              onClick={() => navigate('/renting')}
              className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              Add First Item
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentItems.map((item) => (
              <div key={item._id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                {/* Item Image */}
                <div className="h-48 bg-gray-100">
                  {item.itemImage ? (
                    <img
                      src={item.itemImage}
                      alt={item.itemName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Item Details */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{item.itemName}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.isAvailable 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
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

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleAvailability(item._id, item.isAvailable)}
                      className={`flex-1 py-2 px-3 text-sm rounded-md font-medium transition-colors ${
                        item.isAvailable
                          ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {item.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                    </button>
                    <button
                      onClick={() => removeRentItem(item._id)}
                      className="flex-1 py-2 px-3 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500">
                  Added: {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RentingList;