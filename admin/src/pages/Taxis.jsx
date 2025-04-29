// src/pages/Taxis.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Taxis = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
      <div className="flex flex-col items-center gap-6 backdrop-blur-md bg-white/30 p-10 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Choose a Vehicle Type</h1>

        <div className="flex flex-wrap justify-center gap-6">
          {['bike', 'car', 'threewheel', 'van', 'bus'].map((type) => (
            <button
              key={type}
              onClick={() => navigate(`/add-vehicle/${type}`)}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition"
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
