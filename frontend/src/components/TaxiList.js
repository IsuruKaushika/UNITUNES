import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

const backendUrl = process.env.VITE_BACKEND_URL || "http://localhost:4000";

const TaxiList = () => {
  const navigate = useNavigate();
  const [taxiList, setTaxiList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaxis = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/taxi/list`);
        if (response.data?.success && Array.isArray(response.data.products)) {
          setTaxiList(response.data.products);
        } else {
          console.warn("Invalid response format:", response.data);
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
    <div className="min-h-screen bg-yellow-50 py-12 px-4">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-400 hover:text-black transition"
      >
        ← Back
      </button>

      <img
        src={logo}
        alt="UniTunes Logo"
        onClick={() => navigate("/")}
        className="absolute top-10 right-10 w-24 h-10 rounded-full shadow-lg cursor-pointer hover:scale-105 transition duration-300"
      />

      <h1 className="text-4xl font-extrabold text-center text-black mb-12 drop-shadow">
        🚖 Available Taxi Services
      </h1>

      {loading ? (
        <p className="text-center text-gray-700 animate-pulse">Loading taxis...</p>
      ) : taxiList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {taxiList.map((taxi) => (
            <div
              key={taxi._id}
              onClick={() => handleTaxiClick(taxi._id)}
              className="bg-yellow-100 border border-yellow-200 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer overflow-hidden"
            >
              <img
                src={taxi.image?.[0]}
                alt={taxi.Title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-black line-clamp-1">{taxi.Title}</h3>
                <p className="text-sm text-gray-800 mt-1 line-clamp-2">{taxi.address}</p>
                <p className="mt-2 text-yellow-600 font-bold">Rs {taxi.price} / trip</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No taxis available.</p>
      )}
    </div>
  );
};

export default TaxiList;
