// src/pages/Taxis.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Taxis = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="flex flex-col items-center gap-6 backdrop-blur-md bg-white/30 p-10 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Choose a Vehicle Type</h1>

        <div className="flex flex-wrap justify-center gap-6">
          {['bike', 'car', 'threewheel', 'van', 'bus'].map((type) => (
            <button
              key={type}
              onClick={() => navigate(`/add-vehicle/${type}`)}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full hover:scale-105 transition duration-300 capitalize"
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Taxis;
