// src/components/ad/AdSection.js
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../config";

const AdSection = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  // Responsive slides calculation
  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width < 640) setSlidesToShow(1);
      else if (width < 1024) setSlidesToShow(2);
      else if (width < 1440) setSlidesToShow(3);
      else setSlidesToShow(4);
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/ad/list`);
        if (response.data.success) {
          setAds(response.data.products);
        } else {
          setAds([]);
        }
      } catch (err) {
        console.error("Error fetching ads:", err);
        setAds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || ads.length <= slidesToShow) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const maxSlide = Math.max(0, ads.length - slidesToShow);
        return prev >= maxSlide ? 0 : prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [ads.length, slidesToShow, isAutoPlaying]);

  const handleAdClick = (adId) => {
    navigate(`/ad/${adId}`);
  };

  const handleBookNow = (e, ad) => {
    e.stopPropagation();
    console.log("Booking ad:", ad.name);
    alert(`Booking request for: ${ad.name}`);
  };

  const formatPrice = (price) => {
    if (!price) return null;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const maxSlide = Math.max(0, ads.length - slidesToShow);
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 600);
  }, [ads.length, slidesToShow, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const maxSlide = Math.max(0, ads.length - slidesToShow);
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
    setTimeout(() => setIsTransitioning(false), 600);
  }, [ads.length, slidesToShow, isTransitioning]);

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  if (loading) {
    return (
      <div className="min-h-96 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center rounded-3xl mx-4 sm:mx-6 lg:mx-8">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto"></div>
            <div className="w-12 h-12 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-500 absolute top-2 left-1/2 transform -translate-x-1/2 animate-reverse-spin"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Loading Premium Ads</h3>
          <p className="text-gray-600">Fetching the best deals for you...</p>
        </div>
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className="min-h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl mx-4 sm:mx-6 lg:mx-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No Advertisements Yet</h3>
          <p className="text-gray-600 leading-relaxed">We're working on bringing you amazing deals. Check back soon for exciting offers!</p>
        </div>
      </div>
    );
  }

  const maxSlide = Math.max(0, ads.length - slidesToShow);
  const showNavigation = ads.length > slidesToShow;

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 sm:py-16 lg:py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] bg-[length:24px_24px]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            Premium Collection
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
            Featured Advertisements
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover handpicked premium services and exclusive offers tailored just for you
          </p>
        </div>

        {/* Control Bar */}
        {showNavigation && (
          <div className="flex items-center justify-between mb-8 lg:mb-12">
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white rounded-full p-1 shadow-lg border border-gray-200">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isAutoPlaying
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    {isAutoPlaying ? (
                      <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z"/>
                    ) : (
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                    )}
                  </svg>
                  {isAutoPlaying ? 'Pause' : 'Play'}
                </button>
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <div className="flex items-center space-x-3">
              <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="group flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 disabled:opacity-50"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="group flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 disabled:opacity-50"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Premium Carousel Container */}
        <div 
          className="relative overflow-hidden rounded-2xl"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Slides */}
          <div 
            className="flex transition-all duration-700 ease-out"
            style={{ 
              transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
              width: `${(ads.length / slidesToShow) * 100}%`
            }}
          >
            {ads.map((ad, index) => (
              <div
                key={ad._id}
                className="flex-shrink-0 px-4"
                style={{ width: `${100 / ads.length}%` }}
              >
                <div
                  onClick={() => handleAdClick(ad._id)}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 h-full border border-gray-100"
                >
                  {/* Premium Image Container */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    {ad.image && ad.image.length > 0 ? (
                      <div className="relative">
                        <img
                          src={ad.image[0]}
                          alt={ad.name}
                          className="w-full h-64 sm:h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    ) : (
                      <div className="w-full h-64 sm:h-72 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <div className="text-center text-slate-400">
                          <div className="w-16 h-16 mx-auto mb-3 bg-slate-300 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium">No Image Available</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Premium Badges */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      {ad.featured && (
                        <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white rounded-full text-xs font-bold shadow-lg animate-pulse">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          FEATURED
                        </div>
                      )}
                      {ad.category && (
                        <div className="inline-flex items-center px-3 py-1 bg-black/20 backdrop-blur-md text-white rounded-full text-xs font-medium">
                          {ad.category}
                        </div>
                      )}
                    </div>

                    {/* Price Tag */}
                    {ad.price && (
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        {formatPrice(ad.price)}
                      </div>
                    )}
                  </div>

                  {/* Premium Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                        {ad.name}
                      </h3>
                      {ad.address && (
                        <div className="flex items-center text-gray-500 mb-3">
                          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm line-clamp-1">{ad.address}</span>
                        </div>
                      )}
                    </div>

                    {ad.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                        {ad.description}
                      </p>
                    )}

                    {/* Rating */}
                    {ad.rating && (
                      <div className="flex items-center mb-6">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(ad.rating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{ad.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">(4.2k reviews)</span>
                      </div>
                    )}

                    {/* Premium Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAdClick(ad._id);
                        }}
                        className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 border border-gray-200 hover:border-gray-300"
                      >
                        <span className="flex items-center justify-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View Details
                        </span>
                      </button>
                      
                      {ad.bookingEnabled && (
                        <button
                          onClick={(e) => handleBookNow(e, ad)}
                          className="flex-1 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          <span className="flex items-center justify-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0V6a1 1 0 00-1 1v9a1 1 0 001 1h6a1 1 0 001-1V7a1 1 0 00-1-1H8z" />
                            </svg>
                            Book Now
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Dots Indicator */}
        {showNavigation && (
          <div className="flex justify-center mt-10 space-x-2">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index
                    ? 'w-8 h-3 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Premium Progress Bar */}
        {showNavigation && isAutoPlaying && (
          <div className="mt-6">
            <div className="relative w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full transition-all duration-300 ease-out shadow-sm"
                style={{ 
                  width: `${((currentSlide + 1) / (maxSlide + 1)) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdSection;