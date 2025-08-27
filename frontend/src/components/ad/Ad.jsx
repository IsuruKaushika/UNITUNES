import React, { useState, useEffect } from 'react';

// Sample ad data with placeholder images
const adData = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop',
    link: 'https://example.com/ad1',
    title: 'Hostel near University - Starting Rs. 5000',
    description: 'Comfortable & affordable student accommodation',
    category: 'Accommodation'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
    link: 'https://example.com/ad2',
    title: 'Order Homemade Meals for Students',
    description: 'Fresh, healthy meals delivered to your dorm',
    category: 'Food'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    link: 'https://example.com/ad3',
    title: 'Discount Taxi Services for Campus Rides',
    description: 'Safe & reliable transportation for students',
    category: 'Transport'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    link: 'https://example.com/ad4',
    title: 'Rent Shoes, Bags, Blazers for Events',
    description: 'Formal wear rental for special occasions',
    category: 'Rental'
  },
];

const Ad = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === adData.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? adData.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === adData.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6">
            <span className="text-3xl">🎓</span>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              University Ads & Updates
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the latest services, accommodation, and opportunities designed specifically for university students
          </p>
        </div>

        {/* Main Carousel Container */}
        <div 
          className="relative bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Carousel Content */}
          <div className="relative h-96 md:h-[500px] overflow-hidden">
            {adData.map((ad, index) => (
              <div
                key={ad.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentIndex 
                    ? 'opacity-100 translate-x-0' 
                    : index < currentIndex 
                      ? 'opacity-0 -translate-x-full' 
                      : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="flex flex-col md:flex-row h-full">
                  {/* Image Section */}
                  <div className="md:w-1/2 h-48 md:h-full relative overflow-hidden">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {ad.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                      {ad.title}
                    </h3>
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                      {ad.description}
                    </p>
                    <a
                      href={ad.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:from-blue-600 hover:to-purple-600 hover:shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1 w-fit group"
                    >
                      Learn More
                      <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1/2 hover:scale-110 z-10"
            aria-label="Previous ad"
          >
            <span className="text-2xl">‹</span>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1/2 hover:scale-110 z-10"
            aria-label="Next ad"
          >
            <span className="text-2xl">›</span>
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {adData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125'
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-linear"
              style={{ 
                width: `${((currentIndex + 1) / adData.length) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {['500+ Students Served', '50+ Local Partners', '24/7 Support', '100% Verified'].map((stat, index) => (
            <div key={index} className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-2xl font-bold text-gray-800 mb-2">
                {stat.split(' ')[0]}
              </div>
              <div className="text-gray-600 text-sm">
                {stat.split(' ').slice(1).join(' ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ad;