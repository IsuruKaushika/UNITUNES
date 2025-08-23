import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = process.env.VITE_BACKEND_URL;

const TaxiList = () => {
  const navigate = useNavigate();
  const [taxiListData, setTaxiListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaxis = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/taxi/list`);
        if (response.data?.success && Array.isArray(response.data.products)) {
          setTaxiListData(response.data.products);
        } else {
          console.error("Invalid response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching taxi data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaxis();
  }, []);

  const handleTaxiClick = (id) => {
    navigate(`/taxi-details/${id}`);
  };

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-orange-600 mb-3">
            Available Taxi Services
          </h1>
          <p className="text-gray-700 text-lg">
            Choose from our reliable fleet of taxis at student-friendly prices
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-lg text-gray-700">Loading taxis...</p>
          </div>
        ) : taxiListData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {taxiListData.map((taxi) => (
              <div
                key={taxi._id}
                onClick={() => handleTaxiClick(taxi._id)}
                className="bg-white rounded-2xl border border-orange-200 shadow hover:shadow-lg transform hover:-translate-y-1 transition cursor-pointer overflow-hidden"
              >
                <img
                  src={taxi.image[0]}
                  alt={taxi.Title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold text-orange-600 mb-2">
                    {taxi.Title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{taxi.address}</p>
                  <p className="font-semibold text-orange-500">
                    Rs {taxi.price} / trip
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No taxis available.</p>
        )}
      </div>
    </div>
  );
};

export default TaxiList;
