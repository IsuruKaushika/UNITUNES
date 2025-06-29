import React from "react";
import { useNavigate } from "react-router-dom";

function ShopSelect() {
  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate("/shop-list", { state: { category: "shop" } });
  };

  const handleCommunicationClick = () => {
    navigate("/shop-list", { state: { category: "communication" } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Select a Category
          </h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Shop Option */}
            <div 
              onClick={handleShopClick}
              className="cursor-pointer group relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img 
                src="/images/Shop-3.jpg" 
                alt="Shops" 
                className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <p className="text-white text-xl font-semibold drop-shadow-lg">Shops</p>
              </div>
            </div>

            {/* Communication Option */}
            <div 
              onClick={handleCommunicationClick}
              className="cursor-pointer group relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img 
                src="/images/Shop-1.jpeg" 
                alt="Communication" 
                className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <p className="text-white text-xl font-semibold drop-shadow-lg">Communication</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopSelect;