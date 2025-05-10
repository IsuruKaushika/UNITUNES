import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Styles/ShopList.css";

function ShopList() {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state?.category || "shop";

  const shopData = {
    shop: [
      { id: 1, name: "Smart Mart", image: "/images/Shop-3.jpg" },
      { id: 2, name: "Tech World", image: "/images/Shop-4.jpeg" },
      { id: 3, name: "Eco Store", image: "/images/Shop-5.jpeg" },
    ],
    communication: [
      { id: 4, name: "Dialog Store", image: "/images/Shop-1.jpeg" },
      { id: 5, name: "Mobitel Store", image: "/images/Shop-2.jpeg" },
    ],
  };

  const selectedShops = shopData[category];

  const handleClick = (item) => {
    navigate(`/shop-details/${item.id}`, { state: { item, category } });
  };

  return (
    <div className="shop-list-container">
      <h2>{category === "shop" ? "Shops" : "Communication Services"}</h2>
      <div className="shop-grid">
        {selectedShops.map((item) => (
          <div key={item.id} className="shop-card" onClick={() => handleClick(item)}>
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopList;
