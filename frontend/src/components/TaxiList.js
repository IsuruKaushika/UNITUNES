import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = "http://localhost:4000"; // Use only for API, not image if image is from Cloudinary

const TaxiList = () => {
  const navigate = useNavigate();
  const [TaxiListData, setTaxiListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaxis = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/taxi/list`);
        console.log(response.data);
        if (response.data?.success && Array.isArray(response.data.products)) {
          setTaxiListData(response.data.products);
        } else {
          console.error("Invalid response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching taxi data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaxis();
  }, []);

  const handleTaxiClick = (id) => {
    navigate(`/taxi-details/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Available Taxi Options
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our premium fleet of vehicles for your transportation needs
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-xl text-gray-600">Loading available taxis...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.isArray(TaxiListData) && TaxiListData.length > 0 ? (
              TaxiListData.map((taxi) => (
                <div
                  key={taxi._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden group"
                  onClick={() => handleTaxiClick(taxi._id)}
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={taxi.image[0]}
                      alt={taxi.Title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Rs {taxi.price}/month
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                      {taxi.Title}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <svg 
                        className="w-4 h-4 mr-2 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm truncate">{taxi.address}</span>
                    </div>

                    {/* Features or additional info can be added here */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-gray-600">4.8 (32 reviews)</span>
                      </div>
                      
                      <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors duration-200">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <div className="text-center">
                  <svg 
                    className="w-24 h-24 text-gray-300 mb-4 mx-auto" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33M15 17h3a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h3" />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No Taxis Available</h3>
                  <p className="text-gray-600">
                    We're currently updating our fleet. Please check back later for available options.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxiList;
//only for commit