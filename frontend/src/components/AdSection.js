// src/components/ad/AdSection.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../config"; 
 // adjust path if needed

const AdSection = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/ad/list`);
        if (response.data.success) {
          setAds(response.data.products);
        } else {
          setAds([]);
        }
      } catch (err) {
        console.error("Error fetching ads:", err);
        setAds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading advertisements...</p>;
  }

  if (ads.length === 0) {
    return <p className="text-center text-gray-500">No advertisements available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {ads.map((ad) => (
        <div
          key={ad._id}
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100"
        >
          {/* Image */}
          {ad.image && ad.image.length > 0 ? (
            <img
              src={ad.image[0]}
              alt={ad.name}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}

          {/* Info */}
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800">{ad.name}</h3>
            <p className="text-sm text-gray-500">{ad.address}</p>
            <p className="text-gray-600 mt-2 line-clamp-3">{ad.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdSection;
