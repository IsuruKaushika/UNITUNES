import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = process.env.VITE_BACKEND_URL || "http://localhost:4000";

// Custom Logo Component
const CustomLogo = ({ onClick, className = "" }) => (
  <div 
    onClick={onClick}
    className={`cursor-pointer hover:scale-110 transition-transform duration-300 ${className}`}
  >
    <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-2xl p-3 shadow-lg">
      <div className="flex items-center gap-2">
        <div className="relative">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
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

const TaxiList = () => {
  const navigate = useNavigate();
  const [taxiList, setTaxiList] = useState([]);
  const [filteredTaxis, setFilteredTaxis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const fetchTaxis = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/taxi/list`);
        if (response.data?.success && Array.isArray(response.data.products)) {
          setTaxiList(response.data.products);
          setFilteredTaxis(response.data.products);
        } else {
          console.warn("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching taxi data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaxis();
  }, []);

  // Search functionality
  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredTaxis(taxiList);
      return;
    }

    setSearchLoading(true);
    
    try {
      // First try backend search if you have an endpoint
      // const response = await axios.get(`${backendUrl}/api/taxi/search?location=${query}`);
      // if (response.data?.success) {
      //   setFilteredTaxis(response.data.taxis);
      // }
      
      // Fallback to client-side filtering
      const filtered = taxiList.filter(taxi =>
        taxi.address?.toLowerCase().includes(query.toLowerCase()) ||
        taxi.Title?.toLowerCase().includes(query.toLowerCase()) ||
        taxi.driver?.toLowerCase().includes(query.toLowerCase()) ||
        taxi.vehicleType?.toLowerCase().includes(query.toLowerCase())
      );
      
      setFilteredTaxis(filtered);
    } catch (error) {
      console.error("Search error:", error);
      // Fallback to client-side search
      const filtered = taxiList.filter(taxi =>
        taxi.address?.toLowerCase().includes(query.toLowerCase()) ||
        taxi.Title?.toLowerCase().includes(query.toLowerCase()) ||
        taxi.driver?.toLowerCase().includes(query.toLowerCase()) ||
        taxi.vehicleType?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTaxis(filtered);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleTaxiClick = (id) => {
    navigate(`/taxi-details/${id}`);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mb-6 shadow-lg">
            <span className="text-3xl">🚖</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-4">
            Premium Taxi Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Reliable and comfortable transportation services at your fingertips
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by location, driver name, vehicle type..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-300 text-gray-700 placeholder-gray-400"
            />
            {searchLoading && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <div className="w-5 h-5 border-2 border-yellow-200 border-t-yellow-500 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          {/* Search Results Info */}
          {searchQuery && (
            <div className="mt-4 text-center">
              <span className="inline-block bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 text-gray-600 text-sm">
                {searchLoading ? 'Searching...' : `${filteredTaxis.length} result${filteredTaxis.length !== 1 ? 's' : ''} for "${searchQuery}"`}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-xl text-gray-600 mt-6 font-medium">
              Loading premium taxi services...
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Please wait while we fetch the latest available rides
            </p>
          </div>
        ) : filteredTaxis.length > 0 ? (
          <>
            {/* Results Count */}
            {!searchQuery && (
              <div className="mb-8 text-center">
                <span className="inline-block bg-white px-6 py-3 rounded-full shadow-md border border-gray-200 text-gray-700 font-medium">
                  {filteredTaxis.length} taxi service{filteredTaxis.length !== 1 ? 's' : ''} available
                </span>
              </div>
            )}

            {/* Taxi Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {filteredTaxis.map((taxi) => (
                <div
                  key={taxi._id}
                  onClick={() => handleTaxiClick(taxi._id)}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 hover:border-yellow-200"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={taxi.image?.[0]}
                      alt={taxi.Title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-white shadow-lg">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        Available
                      </div>
                    </div>

                    {/* Vehicle Type Badge */}
                    {taxi.vehicleType && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800 shadow-lg">
                        {taxi.vehicleType}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1 group-hover:text-yellow-600 transition-colors duration-300">
                      {taxi.Title}
                    </h3>
                    
                    <div className="flex items-start gap-2 mb-4">
                      <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                        {taxi.address}
                      </p>
                    </div>

                    {/* Driver Info */}
                    {taxi.driver && (
                      <div className="flex items-center gap-2 mb-4">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-gray-600 text-sm">Driver: {taxi.driver}</span>
                      </div>
                    )}

                    {/* Price Section */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-2xl font-bold text-gray-800">
                          Rs {taxi.price}
                        </span>
                        <span className="text-gray-500 text-sm ml-1">/ trip</span>
                      </div>
                      
                      {/* Book Now Button */}
                      <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-4 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm">
                        Book Now
                      </button>
                    </div>

                    {/* Rating (if available) */}
                    {taxi.rating && (
                      <div className="flex items-center gap-1 mt-3">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(taxi.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({taxi.rating})</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {searchQuery ? 'No Results Found' : 'No Taxi Services Available'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchQuery 
                ? `We couldn't find any taxi services matching "${searchQuery}". Try searching with different keywords.`
                : "We couldn't find any taxi services at the moment. Please check back later or try refreshing the page."
              }
            </p>
            {searchQuery ? (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilteredTaxis(taxiList);
                }}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Clear Search
              </button>
            ) : (
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Refresh Page
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer*/}
      <div className="mt-20 py-8 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 UniTunes. Your reliable transportation partner.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaxiList;