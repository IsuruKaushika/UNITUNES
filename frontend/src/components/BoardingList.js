import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png"; // UniTunes logo path

const backendUrl = "http://localhost:4000";

const BoardingList = () => {
  const navigate = useNavigate();
  const [boardingListData, setBoardingListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoardings = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/boarding/list`);
        if (response.data?.success && Array.isArray(response.data.products)) {
          setBoardingListData(response.data.products);
        } else {
          console.error("Invalid response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching boarding data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardings();
  }, []);

  const handleBoardingClick = (id) => {
    navigate(`/boarding-details/${id}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="relative min-h-screen bg-white py-12 px-4">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-400 hover:text-black transition"
      >
        ← Back
      </button>

      {/* UniTunes Logo - Top Right */}
      <img
        src={logo}
        alt="UniTunes Logo"
        onClick={handleLogoClick}
        className="absolute top-10 right-10 w-25 h-10 rounded-full shadow-lg cursor-pointer hover:scale-105 transition duration-300"
      />

      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center text-black mb-12 drop-shadow">
        🏡 Near Boarding Places
      </h1>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center">
          <p className="text-lg text-gray-700 animate-pulse">Loading boardings...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {boardingListData.length > 0 ? (
            boardingListData.map((boarding) => (
              <div
                key={boarding._id}
                onClick={() => handleBoardingClick(boarding._id)}
                className="bg-yellow-100 border border-yellow-200 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer overflow-hidden"
              >
                <img
                  src={boarding.image[0]}
                  alt={boarding.Title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-black line-clamp-1">
                    {boarding.Title}
                  </h3>
                  <p className="text-sm text-gray-800 mt-1 line-clamp-2">
                    {boarding.address}
                  </p>
                  <p className="mt-2 text-yellow-600 font-bold">
                    Rs {boarding.price} / month
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No boardings available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BoardingList;
