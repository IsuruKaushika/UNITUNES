import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

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
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        <div className="text-white font-bold text-lg">
          UniTunes
        </div>
      </div>
    </div>
  </div>
);

const BoardingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [boarding, setBoarding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBoardings, setRelatedBoardings] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchBoarding = async () => {
      try {
        const response = await axios.post(`${backendUrl}/api/boarding/single`, { boardingId: id });
        if (response.data?.success && response.data.boarding) {
          setBoarding(response.data.boarding);
          // Fetch related boardings
          fetchRelatedBoardings(response.data.boarding);
        } else {
          console.warn("Invalid data received:", response.data);
        }
      } catch (error) {
        console.error("Error fetching boarding details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBoarding();
  }, [id]);

  // Enhanced function to fetch related boardings
  const fetchRelatedBoardings = async (currentBoarding) => {
    setRelatedLoading(true);
    try {
      // Get all boardings
      const response = await axios.get(`${backendUrl}/api/boarding/list`);
      if (response.data?.success && Array.isArray(response.data.products)) {
        let related = [];
        
        // First, try to find boardings in the same area
        if (currentBoarding.address) {
          const currentLocation = currentBoarding.address.toLowerCase();
          const locationKeywords = currentLocation.split(',').map(s => s.trim());
          
          related = response.data.products
            .filter(b => {
              if (b._id === id) return false; // Exclude current boarding
              if (!b.address) return false;
              
              const boardingLocation = b.address.toLowerCase();
              // Check if any location keyword matches
              return locationKeywords.some(keyword => 
                keyword.length > 2 && boardingLocation.includes(keyword)
              );
            });
        }
        
        // If not enough related boardings found by location, add more random ones
        if (related.length < 4) {
          const remaining = response.data.products
            .filter(b => b._id !== id && !related.find(r => r._id === b._id))
            .slice(0, 4 - related.length);
          related = [...related, ...remaining];
        }
        
        // Limit to 4 and shuffle for variety
        related = related
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);
        
        setRelatedBoardings(related);
      }
    } catch (error) {
      console.error("Error fetching related boardings:", error);
      // Fallback: fetch some random boardings
      try {
        const fallbackResponse = await axios.get(`${backendUrl}/api/boarding/list`);
        if (fallbackResponse.data?.success && Array.isArray(fallbackResponse.data.products)) {
          const randomBoardings = fallbackResponse.data.products
            .filter(b => b._id !== id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);
          setRelatedBoardings(randomBoardings);
        }
      } catch (fallbackError) {
        console.error("Fallback fetch also failed:", fallbackError);
      }
    } finally {
      setRelatedLoading(false);
    }
  };

  // Image navigation
  const nextImage = () => {
    if (boarding?.image?.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % boarding.image.length);
    }
  };

  const prevImage = () => {
    if (boarding?.image?.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + boarding.image.length) % boarding.image.length);
    }
  };

  // Handle related boarding click
  const handleRelatedBoardingClick = (boardingId) => {
    // Scroll to top and navigate
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/boarding-details/${boardingId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-xl text-gray-600 mt-6 font-medium">
            Loading boarding details...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Please wait while we fetch the information
          </p>
        </div>
      </div>
    );
  }

  if (!boarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Boarding Details Not Found
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            The boarding you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="relative bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
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
          <div className="absolute top-6 right-4">
            <CustomLogo onClick={() => navigate("/")} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-4">
            {boarding.Title}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full"></div>
        </div>

        {/* Main Boarding Card */}
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-12">
          
          {/* Enhanced Image Gallery */}
          <div className="relative">
            {boarding.image && boarding.image.length > 0 ? (
              <div className="relative h-96 overflow-hidden">
                <img
                  src={boarding.image[currentImageIndex]}
                  alt={`${boarding.Title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                {boarding.image.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
                
                {/* Image Counter */}
                {boarding.image.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {boarding.image.length}
                  </div>
                )}
                
                {/* Available Badge */}
                <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    Available Now
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-96 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500">No images available</p>
                </div>
              </div>
            )}

            {/* Thumbnail Strip */}
            {boarding.image && boarding.image.length > 1 && (
              <div className="p-6 pb-0">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {boarding.image.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors duration-300 ${
                        index === currentImageIndex ? 'border-yellow-400' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-8">
            
            {/* Price Section */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Monthly Rent</p>
                  <p className="text-3xl font-bold text-green-600">
                    Rs {boarding.price}
                    <span className="text-lg text-gray-500 font-normal"> / month</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                { label: "Owner", value: boarding.owner, icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
                { label: "Address", value: boarding.address, icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
                { label: "Rooms", value: boarding.Rooms, icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                { label: "Bathrooms", value: boarding.bathRooms, icon: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" },
                { label: "Contact", value: boarding.contact, icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }
              ].map((detail, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition-colors duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={detail.icon} />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 mb-1">{detail.label}</p>
                      <p className="text-gray-800 font-semibold">{detail.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            {boarding.description && (
              <div className="mb-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{boarding.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Features */}
            {boarding.features?.length > 0 && (
              <div className="mb-10 bg-purple-50 rounded-xl p-6 border border-purple-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-800 mb-4">Features & Amenities</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {boarding.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white rounded-lg p-3 border border-purple-100">
                          <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {boarding.contact && (
                <a
                  href={`https://wa.me/${boarding.contact.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108"/>
                  </svg>
                  Contact via WhatsApp
                </a>
              )}
              
              <button
                onClick={() => navigator.share && navigator.share({ 
                  title: boarding.Title, 
                  text: `Check out this boarding: ${boarding.Title}`, 
                  url: window.location.href 
                })}
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share Boarding
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Related Boardings Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-4">
              Other Boardings You Might Like
            </h2>
            <p className="text-gray-600">
              {relatedBoardings.length > 0 
                ? "Discover more boarding places in your area and beyond" 
                : "Loading more boarding options for you..."}
            </p>
          </div>

          {relatedLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 font-medium">Finding similar boardings...</p>
              <p className="text-sm text-gray-500 mt-1">Please wait a moment</p>
            </div>
          ) : relatedBoardings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {relatedBoardings.map((related) => (
                <div
                  key={related._id}
                  onClick={() => handleRelatedBoardingClick(related._id)}
                  className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 hover:border-yellow-200"
                >
                  <div className="relative h-48 overflow-hidden">
                    {related.image?.[0] ? (
                      <img
                        src={related.image[0]}
                        alt={related.Title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-2 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Available badge */}
                    <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                        Available
                      </div>
                    </div>

                    {/* Price badge */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                      <p className="text-sm font-bold text-gray-800">
                        Rs {related.price}
                        <span className="text-xs text-gray-600 font-normal">/mo</span>
                      </p>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-yellow-600 transition-colors duration-300">
                      {related.Title}
                    </h3>
                    
                    <div className="flex items-start gap-2 mb-3">
                      <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                        {related.address || 'Location not specified'}
                      </p>
                    </div>

                    {/* Quick info */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        {related.Rooms && (
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span>{related.Rooms} rooms</span>
                          </div>
                        )}
                        {related.bathRooms && (
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
                            </svg>
                            <span>{related.bathRooms} baths</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-800 font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-lg">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Related Boardings Found</h3>
              <p className="text-gray-600 mb-4">We couldn't find similar boardings at the moment.</p>
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Browse All Boardings
              </button>
            </div>
          )}

          {/* View More Button */}
          {relatedBoardings.length > 0 && (
            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-yellow-500 hover:to-yellow-400 hover:text-gray-900 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                View All Boardings
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 py-12 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <CustomLogo className="opacity-90 hover:opacity-100" />
            </div>
            <p className="text-gray-300 text-sm mb-4">
              © 2025 UniTunes. Find your perfect boarding place with confidence.
            </p>
            <p className="text-gray-400 text-xs">
              Connecting students with quality accommodation since 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardingDetails;