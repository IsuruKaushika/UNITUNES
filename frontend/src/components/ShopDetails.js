import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function ShopDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { item } = location.state || {};

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-50 text-gray-800">
        <h2 className="text-2xl font-bold mb-4">Shop data not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition"
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 py-12 px-4 flex justify-center items-center">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition"
      >
        ← Back
      </button>

      {/* Shop Details Box */}
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row transform scale-105">
        {/* Shop Image */}
        <img
          src={item.image[0]}
          alt={item.Title}
          className="w-full md:w-1/2 h-96 object-cover"
        />

        {/* Shop Info */}
        <div className="p-8 md:w-1/2">
          <h2 className="text-3xl font-extrabold text-black mb-4">{item.Title}</h2>
          <p className="text-gray-700 mb-2"><strong>Address:</strong> {item.address}</p>
          <p className="text-gray-700 mb-2"><strong>Price:</strong> Rs. {item.price} / month</p>
          <p className="text-gray-700 mb-2"><strong>Status:</strong> {item.status || "Open"}</p>
          <p className="text-gray-700 mb-5"><strong>Owner Contact:</strong> {item.phone || "Not Provided"}</p>

          {/* Action Button */}
          <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition font-semibold">
            📞 Contact Shop
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShopDetails;
