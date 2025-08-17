import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import productList from "./ProductList";

function RentItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = productList.find((product) => product.id === parseInt(id));

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-50 text-gray-800">
        <h2 className="text-2xl font-bold mb-4">Item not found</h2>
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

      {/* Larger Centered Data Box */}
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row transform scale-105">
        {/* Item Image */}
        <img
          src={item.image}
          alt={item.title}
          className="w-full md:w-1/2 h-96 object-cover"
        />

        {/* Item Info */}
        <div className="p-8 md:w-1/2">
          <h2 className="text-3xl font-extrabold text-black mb-4">{item.title}</h2>
          <p className="text-gray-700 mb-3"><strong>Description:</strong> {item.description}</p>
          <p className="text-gray-700 mb-3"><strong>Price Per Day:</strong> Rs. {item.pricePerDay}</p>
          <p className="text-gray-700 mb-3"><strong>Rating:</strong> {item.rating} ⭐ ({item.reviews} reviews)</p>
          <p className="text-gray-700 mb-5"><strong>Owner Contact:</strong> {item.owner}</p>

          {/* Action Button */}
          <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition font-semibold">
            📞 Contact Owner
          </button>
        </div>
      </div>
    </div>
  );
}

export default RentItemDetails;
