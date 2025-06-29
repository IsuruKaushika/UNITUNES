import React from "react";
import { useNavigate } from "react-router-dom";

function MediSelect() {
  const navigate = useNavigate();

  const handleSelectPharmacy = () => {
    navigate("/medi-list?category=pharmacy");
  };

  const handleSelectMedicare = () => {
    navigate("/medi-list?category=medicare");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-extrabold text-green-900 mb-12">
        Select Service
      </h1>

      <div className="flex flex-col sm:flex-row gap-10 max-w-4xl w-full justify-center">
        {/* Pharmacy Option */}
        <div
          onClick={handleSelectPharmacy}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleSelectPharmacy();
          }}
          className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-green-500 flex flex-col items-center p-6 w-full sm:w-64 select-none focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          <img
            src="/images/medi-1.jpg"
            alt="Pharmacy"
            className="w-full h-40 object-cover rounded-lg mb-4"
            loading="lazy"
          />
          <p className="text-xl font-semibold text-green-700">Pharmacy</p>
        </div>

        {/* Medicare Service Option */}
        <div
          onClick={handleSelectMedicare}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleSelectMedicare();
          }}
          className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-green-500 flex flex-col items-center p-6 w-full sm:w-64 select-none focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          <img
            src="/images/medi-5.jpg"
            alt="Medicare Service"
            className="w-full h-40 object-cover rounded-lg mb-4"
            loading="lazy"
          />
          <p className="text-xl font-semibold text-green-700">Medicare Service</p>
        </div>
      </div>
    </div>
  );
}

export default MediSelect;
