import React from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/ShopSelect.css";

function ShopSelect() {
  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate("/shop-list", { state: { category: "shop" } });
  };

  const handleCommunicationClick = () => {
    navigate("/shop-list", { state: { category: "communication" } });
  };

  return (
    <div className="shop-select-container">
      <h2>Select a Category</h2>
      <div className="shop-options">
        <div className="option" onClick={handleShopClick}>
          <img src="/images/Shop-3.jpg" alt="Shops" />
          <p>Shops</p>
        </div>
        <div className="option" onClick={handleCommunicationClick}>
          <img src="/images/Shop-1.jpeg" alt="Communication" />
          <p>Communication</p>
        </div>
      </div>
    </div>
  );
}

export default ShopSelect;
