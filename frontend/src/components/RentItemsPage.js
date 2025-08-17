import React from "react";
import { useNavigate } from "react-router-dom";
import productList from "./ProductList";

function RentItemsPage() {
  const navigate = useNavigate();

  const handleItemClick = (id) => {
    navigate(`/rent-item/${id}`);
  };

  return (
    <div className="relative min-h-screen bg-white py-12 px-4">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center text-black mb-12 drop-shadow">
        🎒 Available Rent Items
      </h1>

      {/* Rent Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {productList.length > 0 ? (
          productList.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="bg-yellow-100 border border-yellow-200 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer overflow-hidden"
            >
              {/* Item Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />

              {/* Item Details */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-black line-clamp-1">{item.name}</h3>
                <p className="text-sm text-gray-800 mt-1 line-clamp-2">{item.description}</p>
                <p className="mt-2 text-yellow-600 font-bold">Rs {item.pricePerDay} / day</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No rent items available.</p>
        )}
      </div>
    </div>
  );
}

export default RentItemsPage;
