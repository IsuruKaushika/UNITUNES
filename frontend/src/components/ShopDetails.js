import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Custom Logo Component - matching BoardingList style
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

// Image Gallery Component
const ImageGallery = ({ images, shopName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  if (!images || images.length === 0 || imageError) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-2xl shadow-lg">
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
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
                    ? 'bg-white shadow-lg' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

// Info Card Component
const InfoCard = ({ icon, label, value, bgColor = "yellow" }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
    <div className="flex items-center gap-4">
      <div className={`p-3 bg-gradient-to-r from-${bgColor}-400 to-orange-400 rounded-xl text-gray-800 shadow-md`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</p>
        <p className="text-lg font-bold text-gray-800 leading-tight">{value || "Not provided"}</p>
      </div>
    </div>
  </div>
);

// Status Badge Component
const StatusBadge = ({ status }) => {
  const getStatusInfo = (status) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return { color: 'from-green-400 to-emerald-500', text: 'Open Now' };
      case 'closed':
        return { color: 'from-red-400 to-red-500', text: 'Closed' };
      case 'busy':
        return { color: 'from-yellow-400 to-orange-500', text: 'Busy' };
      default:
        return { color: 'from-gray-400 to-gray-500', text: 'Status Unknown' };
    }
  };

  const statusInfo = getStatusInfo(status);

  return (
    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${statusInfo.color} shadow-lg`}>
      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
      {statusInfo.text}
    </div>
  );
};

// Favorites functionality
const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('shopFavorites') || '[]');
  });

  const toggleFavorite = (id) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('shopFavorites', JSON.stringify(updatedFavorites));
  };

  return { favorites, toggleFavorite };
};

function ShopDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { item } = location.state || {};
  const { favorites, toggleFavorite } = useFavorites();

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
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        
        <div className="text-center bg-white rounded-2xl shadow-2xl border border-gray-100 p-12 max-w-md mx-4 transform hover:scale-105 transition-all duration-300">
          <div className="text-6xl mb-6 animate-bounce">😕</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Shop Not Found</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">We couldn't find the shop details you're looking for.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-8 py-4 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold shadow-lg"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

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

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-yellow-400 hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-0.5 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Shop Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mb-6 shadow-lg animate-bounce">
            <span className="text-3xl">{getCategoryIcon(item.Category)}</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-4 leading-tight">
            {item.name || item.Title}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <StatusBadge status={item.status} />
            {item.Category && (
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                {item.Category}
              </div>
            )}
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Section */}
          <div className="order-2 lg:order-1">
            <ImageGallery 
              images={item.image} 
              shopName={item.name || item.Title} 
            />
          </div>

          {/* Shop Actions Section */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Favorite Button */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <button
                onClick={() => toggleFavorite(item._id)}
                className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                  favorites.includes(item._id)
                    ? 'bg-gradient-to-r from-red-400 to-red-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <svg className="w-6 h-6" fill={favorites.includes(item._id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {favorites.includes(item._id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>

            {/* Contact Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleContact}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-4 rounded-xl font-bold hover:from-green-500 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Shop
              </button>

              <button
                onClick={handleDirections}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-6 py-4 rounded-xl font-bold hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Get Directions
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 transition-all duration-300 group">
                  <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg text-gray-800 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Check Hours</p>
                    <p className="text-sm text-gray-600">View opening times</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 transition-all duration-300 group">
                  <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg text-gray-800 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Leave Review</p>
                    <p className="text-sm text-gray-600">Share your experience</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <InfoCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            label="Address"
            value={item.address}
            bgColor="blue"
          />

          {item.price && (
            <InfoCard
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              }
              label="Monthly Rent"
              value={`Rs. ${item.price}`}
              bgColor="green"
            />
          )}

          <InfoCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
            label="Phone"
            value={item.phone}
            bgColor="purple"
          />
        </div>

        {/* Additional Info */}
        {(item.description || item.details) && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">About This Shop</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {item.description || item.details || "This shop provides excellent service and quality products to the community."}
            </p>
          </div>
        )}

        {/* Related Actions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Explore More</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/shop-list')}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              View All Shops
            </button>
            <button
              onClick={() => navigate(`/shop-list?category=${item.Category?.toLowerCase()}`)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Similar Shops
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 py-8 bg-white/80 backdrop-blur-sm border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 UniTunes. Discover amazing local shops with confidence.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShopDetails;