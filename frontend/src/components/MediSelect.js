import React from "react";
import { useNavigate } from "react-router-dom";

// Custom Logo Component with Updated Theme
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
        <div className="text-white font-bold text-lg">
          UniTunes
        </div>
      </div>
    </div>
  </div>
);

function MediSelect() {
  const navigate = useNavigate();

  const handleSelectPharmacy = () => {
    navigate("/medi-list?category=pharmacy");
  };

  const handleSelectMedicare = () => {
    navigate("/medi-list?category=medicare");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-500"></div>

      {/* Header Section */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-yellow-400 hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-0.5 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            {/* Custom Logo */}
            <CustomLogo onClick={() => navigate("/")} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mb-6 shadow-lg animate-bounce">
            <span className="text-3xl">🏥</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Select Medical Service
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Choose the medical service that best fits your healthcare needs and get connected with trusted providers
          </p>
        </div>

        {/* Service Cards */}
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto justify-center relative z-10 mb-16">
          
          {/* Pharmacy Option */}
          <div
            onClick={handleSelectPharmacy}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleSelectPharmacy();
            }}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-yellow-200 flex flex-col items-center p-8 w-full lg:w-96 select-none focus:outline-none focus:ring-4 focus:ring-yellow-100/50 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
          >
            {/* Card glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            
            {/* Available Badge */}
            <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-10">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-gray-800 rounded-full animate-pulse"></div>
                Available
              </div>
            </div>
            
            {/* Image container */}
            <div className="relative w-full h-56 mb-6 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <img
                src="/images/medi-1.jpg"
                alt="Pharmacy Services"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Overlay icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="text-center relative z-10 mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                Pharmacy Services
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Find medications, pharmaceutical services, and trusted pharmacies near you with verified quality and competitive prices
              </p>
              
              {/* Features */}
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Medications</span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">Prescriptions</span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">Health Products</span>
              </div>
            </div>
            
            {/* Action Button */}
            <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl">
              Browse Pharmacies
            </button>
            
            {/* Decorative icon */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-yellow-600 text-lg">💊</span>
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
            className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 flex flex-col items-center p-8 w-full lg:w-96 select-none focus:outline-none focus:ring-4 focus:ring-blue-100/50 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
          >
            {/* Card glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            
            {/* Available Badge */}
            <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-10">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                Available
              </div>
            </div>
            
            {/* Image container */}
            <div className="relative w-full h-56 mb-6 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <img
                src="/images/medi-5.jpg"
                alt="Medicare Services"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Overlay icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="text-center relative z-10 mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                Medicare Services
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Access comprehensive healthcare services, insurance options, and medical consultations with certified professionals
              </p>
              
              {/* Features */}
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Healthcare</span>
                <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">Insurance</span>
                <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm font-medium">Consultations</span>
              </div>
            </div>
            
            {/* Action Button */}
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl">
              Browse Medicare
            </button>
            
            {/* Decorative icon */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-blue-600 text-lg">🏥</span>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Why Choose Our Medical Services?</h2>
            <p className="text-gray-600">We connect you with verified healthcare providers and ensure quality service</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-yellow-50 border border-yellow-100">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Verified Providers</h3>
              <p className="text-gray-600 text-sm">All medical providers are thoroughly verified and licensed</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-orange-50 border border-orange-100">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Competitive Prices</h3>
              <p className="text-gray-600 text-sm">Best prices guaranteed with transparent pricing</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-blue-50 border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock customer support for all your needs</p>
            </div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="text-center">
          <div className="flex justify-center space-x-2 mb-8">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-200"></div>
          </div>
          
          <p className="text-gray-500 text-sm">
            Trusted by thousands of users for quality medical services
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
            © 2025 UniTunes. Your trusted partner for medical services and healthcare solutions.
          </p>
          <p className="text-gray-400 text-xs">
            Connecting patients with quality healthcare providers since 2025
          </p>
        </div>
      </div>
    </div>
  );
}

export default MediSelect;