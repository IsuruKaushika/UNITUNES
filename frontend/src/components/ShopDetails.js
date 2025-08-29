import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Enhanced Logo Component
const CustomLogo = ({ onClick, className = "" }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer hover:scale-105 transition-all duration-300 group ${className}`}
  >
    <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl p-3 shadow-lg group-hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-2">
        <svg
          className="w-8 h-8 text-white transform group-hover:rotate-12 transition-transform duration-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <div className="text-white font-bold text-lg tracking-wide">UniTunes</div>
      </div>
    </div>
  </div>
);

// Image Gallery Component
const ImageGallery = ({ images, shopName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  if (!images || images.length === 0 || imageError) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-2xl">
        <div className="text-center">
          <div className="text-6xl mb-4">🏪</div>
          <p className="text-gray-500 font-medium">No Image Available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
      <img
        src={images[currentImageIndex]}
        alt={`${shopName} - Image ${currentImageIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-500"
        onError={() => setImageError(true)}
      />
      
      {/* Image Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Info Card Component
const InfoCard = ({ icon, label, value, color = "indigo" }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
    <div className="flex items-center gap-3">
      <div className={`p-2 bg-gradient-to-br from-${color}-400 to-${color}-600 rounded-lg text-white`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-lg font-bold text-gray-800">{value || "Not provided"}</p>
      </div>
    </div>
  </div>
);

// Status Badge Component
const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'from-green-400 to-emerald-500';
      case 'closed':
        return 'from-red-400 to-red-500';
      case 'busy':
        return 'from-yellow-400 to-orange-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${getStatusColor(status)} shadow-lg`}>
      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
      {status || 'Unknown'}
    </span>
  );
};

function ShopDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { item } = location.state || {};

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      bakery: "🥖",
      grocery: "🛒",
      meals: "🍽️",
      bookshop: "📚",
      communication: "📱"
    };
    return icons[category?.toLowerCase()] || "🏪";
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      bakery: "orange",
      grocery: "green",
      meals: "yellow",
      bookshop: "blue",
      communication: "purple"
    };
    return colors[category?.toLowerCase()] || "gray";
  };

  // Handle contact action
  const handleContact = () => {
    if (item.phone) {
      window.open(`tel:${item.phone}`, '_self');
    } else {
      alert('Contact information not available');
    }
  };

  // Handle directions
  const handleDirections = () => {
    if (item.address) {
      const encodedAddress = encodeURIComponent(item.address);
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.name || item.Title,
        text: `Check out ${item.name || item.Title} - ${item.address}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50 max-w-md mx-4">
          <div className="text-6xl mb-6">😕</div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Shop Not Found</h2>
          <p className="text-gray-600 mb-8">We couldn't find the shop details you're looking for.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-gray-700 hover:text-gray-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <CustomLogo onClick={() => navigate("/")} />
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-gray-700 hover:text-gray-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Share
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Section */}
          <div className="order-2 lg:order-1">
            <ImageGallery 
              images={item.image} 
              shopName={item.name || item.Title} 
            />
          </div>

          {/* Shop Info Section */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Title and Category */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{getCategoryIcon(item.Category)}</span>
                <StatusBadge status={item.status} />
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                {item.name || item.Title}
              </h1>
              
              {item.Category && (
                <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-${getCategoryColor(item.Category)}-400 to-${getCategoryColor(item.Category)}-500 text-white rounded-full font-semibold`}>
                  {item.Category}
                </div>
              )}
            </div>

            {/* Contact Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleContact}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Shop
              </button>

              <button
                onClick={handleDirections}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Get Directions
              </button>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <InfoCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            label="Address"
            value={item.address}
            color="blue"
          />

          <InfoCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            }
            label="Monthly Rent"
            value={item.price ? `Rs. ${item.price}` : null}
            color="green"
          />

          <InfoCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
            label="Phone"
            value={item.phone}
            color="purple"
          />
        </div>

        {/* Additional Info */}
        {(item.description || item.details) && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">About This Shop</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {item.description || item.details || "No additional details available."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopDetails;