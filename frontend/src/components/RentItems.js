import React from "react";
import { Link } from "react-router-dom";

function RentItems({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product.title}</h3>
        <p className="text-green-700 font-semibold mb-1">Rs. {product.pricePerDay} / day</p>
        <p className="text-yellow-500 font-medium mb-4">
          ⭐ {product.rating} <span className="text-gray-600">({product.reviews} reviews)</span>
        </p>
        <Link to={`/rent-details/${product.id}`} className="mt-auto">
          <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default RentItems;
