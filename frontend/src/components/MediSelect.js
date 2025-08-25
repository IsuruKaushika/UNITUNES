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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-16 right-16 w-32 h-32 bg-teal-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-cyan-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      
      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 bg-clip-text text-transparent mb-4 tracking-tight">
          Select Service
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full"></div>
        <p className="text-gray-600 mt-4 text-lg font-medium">Choose the service that best fits your needs</p>
      </div>

      {/* Service Cards */}
      <div className="flex flex-col lg:flex-row gap-12 max-w-5xl w-full justify-center relative z-10">
        {/* Pharmacy Option */}
        <div
          onClick={handleSelectPharmacy}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleSelectPharmacy();
          }}
          className="group cursor-pointer bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-emerald-400 flex flex-col items-center p-8 w-full lg:w-80 select-none focus:outline-none focus:ring-4 focus:ring-emerald-300/50 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
        >
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
          
          {/* Image container */}
          <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
            <img
              src="/images/medi-1.jpg"
              alt="Pharmacy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Content */}
          <div className="text-center relative z-10">
            <h3 className="text-2xl font-bold text-emerald-800 mb-2 group-hover:text-emerald-700 transition-colors duration-300">
              Pharmacy
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Find medications and pharmaceutical services near you
            </p>
          </div>
          
          {/* Decorative icon */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-emerald-600 text-sm">💊</span>
          </div>
        </div>

        {/* Medicare Service Option */}
        <div
          onClick={handleSelectMedicare}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleSelectMedicare();
          }}
          className="group cursor-pointer bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-teal-400 flex flex-col items-center p-8 w-full lg:w-80 select-none focus:outline-none focus:ring-4 focus:ring-teal-300/50 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
        >
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
          
          {/* Image container */}
          <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
            <img
              src="/images/medi-5.jpg"
              alt="Medicare Service"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Content */}
          <div className="text-center relative z-10">
            <h3 className="text-2xl font-bold text-teal-800 mb-2 group-hover:text-teal-700 transition-colors duration-300">
              Medicare Service
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Access comprehensive healthcare and insurance services
            </p>
          </div>
          
          {/* Decorative icon */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-teal-600 text-sm">🏥</span>
          </div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="mt-16 flex space-x-2">
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  );
}

export default MediSelect;