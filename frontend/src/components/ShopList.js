import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = "http://localhost:4000";

const ShopList = () => {
  const navigate = useNavigate();
  const [shopListData, setShopListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/shop/list`);
        if (response.data?.success && Array.isArray(response.data.products)) {
          setShopListData(response.data.products);
        } else {
          console.error("Invalid response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching shop data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const handleShopClick = (shop) => {
    navigate(`/shop-details/${shop._id}`, { state: { item: shop } });
  };

  return (
    <div className="relative min-h-screen bg-white py-12 px-4">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center text-black mb-12 drop-shadow">
        🏬 Available Shop Options
      </h1>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center">
          <p className="text-lg text-gray-700 animate-pulse">Loading shops...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {Array.isArray(shopListData) && shopListData.length > 0 ? (
            shopListData.map((shop) => (
              <div
                key={shop._id}
                onClick={() => handleShopClick(shop)}
                className="bg-yellow-100 border border-yellow-200 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer overflow-hidden"
              >
                <img
                  src={shop.image[0]}
                  alt={shop.Title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-black line-clamp-1">
                    {shop.Title}
                  </h3>
                  <p className="text-sm text-gray-800 mt-1">{shop.address}</p>
                  <p className="mt-2 text-yellow-600 font-bold">
                    Rs {shop.price} / month
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No shop data found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopList;
