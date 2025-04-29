import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = ['Bakery', 'Grocery', 'Meals', 'Bookshop', 'Communication'];

const Shops = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50">
      <div className="backdrop-blur-md bg-white/30 p-10 rounded-2xl shadow-2xl w-[90%] max-w-md flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-gray-800">Select Shop Category</h1>
        <div className="grid grid-cols-2 gap-4 w-full">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => navigate(`/add-shop/${category.toLowerCase()}`)}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shops;
