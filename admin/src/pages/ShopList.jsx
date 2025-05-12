// src/pages/ShopList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:4000';

const ShopList = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/shop/list`);
        if (response.data.success) {
          setShops(response.data.shops);
        }
      } catch (err) {
        console.error("Failed to fetch shop list:", err.message);
      }
    };

    fetchShops();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Registered Shops</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-1">{shop.shopName}</h3>
            <p className="text-sm text-gray-600 mb-2">Category: {shop.shopType}</p>
            <p><strong>Owner:</strong> {shop.ownerName}</p>
            <p><strong>Location:</strong> {shop.location}</p>
            <p><strong>Contact:</strong> {shop.contact}</p>
            <p><strong>Open:</strong> {shop.openTime} – {shop.closeTime}</p>
            <p className="text-sm mt-2"><strong>Address:</strong> {shop.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopList;
