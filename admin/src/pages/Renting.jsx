import React from 'react';
import { useNavigate } from 'react-router-dom';

const rentCategories = ['Fashion', 'Sports', 'Electronics', 'Travel'];

const Renting = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
    <div className="backdrop-blur-md bg-white/30 p-10 rounded-2xl shadow-2xl w-[90%] max-w-md flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Select Renting Category</h1>
      <div className="grid grid-cols-2 gap-4">
        {rentCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => navigate(`/add-rent/${cat.toLowerCase()}`)}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-700 transition"
          >
            {cat}
          </button>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Renting;
