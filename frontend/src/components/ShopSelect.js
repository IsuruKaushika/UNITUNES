import React from "react";
import { useNavigate } from "react-router-dom";

// Reusable Custom Logo Component (same as MediSelect)
const CustomLogo = ({ onClick, className = "" }) => (
  <div 
    onClick={onClick}
    className={`cursor-pointer hover:scale-110 transition-transform duration-300 ${className}`}
  >
    <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-2xl p-3 shadow-lg">
      <div className="flex items-center gap-2">
        <div className="relative">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </div>
        <div className="text-white font-bold text-lg">UniTunes</div>
      </div>
    </div>
  </div>
);

function ShopSelect() {
  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate("/shop-list", { state: { category: "shop" } });
  };

  const handleCommunicationClick = () => {
    navigate("/shop-list", { state: { category: "communication" } });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-500"></div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-yellow-400 hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-0.5 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* Clickable Logo */}
          <CustomLogo onClick={() => navigate("/")} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mb-6 shadow-lg animate-bounce">
            <span className="text-3xl">🛍️</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Select Shop Category
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Choose a shop category to explore and connect with trusted sellers
          </p>
        </div>

        {/* Shop Options */}
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto justify-center mb-16">
          
          {/* Shops */}
          <div
            onClick={handleShopClick}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-yellow-200 flex flex-col items-center p-8 w-full lg:w-96 select-none focus:outline-none transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
          >
            <div className="relative w-full h-56 mb-6 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/images/Shop-3.jpg"
                alt="Shops"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors">Shops</h3>
            <p className="text-gray-600 text-center mb-4">
              Browse through a wide selection of local and online shops
            </p>
            <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all transform group-hover:scale-105 shadow-lg hover:shadow-xl">
              Browse Shops
            </button>
          </div>

          {/* Communication */}
          <div
            onClick={handleCommunicationClick}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 flex flex-col items-center p-8 w-full lg:w-96 select-none focus:outline-none transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
          >
            <div className="relative w-full h-56 mb-6 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/images/Shop-1.jpeg"
                alt="Communication"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">Communication</h3>
            <p className="text-gray-600 text-center mb-4">
              Find communication services, devices, and providers
            </p>
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all transform group-hover:scale-105 shadow-lg hover:shadow-xl">
              Browse Communication
            </button>
          </div>
        </div>

        {/* Decorative bottom */}
        <div className="text-center">
          <div className="flex justify-center space-x-2 mb-8">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-200"></div>
          </div>
          <p className="text-gray-500 text-sm">
            Trusted by thousands of users for shops & communication services
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 py-8 bg-white/80 backdrop-blur-sm border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <CustomLogo className="opacity-90 hover:opacity-100" />
          </div>
          <p className="text-gray-500 text-sm mb-4">
            © 2025 UniTunes. Your trusted partner for shops and services.
          </p>
          <p className="text-gray-400 text-xs">
            Connecting customers with trusted shops since 2025
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShopSelect;
