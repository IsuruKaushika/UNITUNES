import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/Styles/ShopList.css";

const backendUrl = "http://localhost:4000"; // Use only for API, not image if image is from Cloudinary

const ShopList = () => {
  const navigate = useNavigate();
  const [shopListData, setShopListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/shop/list`);
        console.log(response.data);
        if (response.data?.success && Array.isArray(response.data.products)) {
          setShopListData(response.data.products);
        } else {
          console.error("Invalid response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching boarding data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const handleBoardingClick = (id) => {
    navigate(`/shop-details/${id}`);
  };

  return (
    <div className="shop-list">
      <h1 className="shop-list-title">Available Shop Options</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="shop-cards">
          {Array.isArray(shopListData) && shopListData.length > 0 ? (
            shopListData.map((shop) => (
              <div
                key={shop._id}
                className="shop-card"
                onClick={() => handleShopClick(shop._id)}
              >
                <img
                  src={shop.image[0]} // Use the Cloudinary URL directly
                  alt={shop.Title}
                  className="shop-thumbnail"
                />
                <div className="shop-info">
                  <h3>{shop.Title}</h3>
                  <p>{shop.address}</p>
                  <p className="shop-price">Rs {shop.price} / month</p>
                </div>
              </div>
            ))
          ) : (
            <p>No shop data found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopList;
//only for commit