import React from "react";
import { useLocation } from "react-router-dom";
import "./Styles/ShopDetails.css";

function ShopDetails() {
  const location = useLocation();
  const { item, category } = location.state || {};

  const shopDetails = {
    1: { address: "Town Center, Matara", phone: "011-1234567", status: "Open" },
    2: { address: "Main Street, Galle", phone: "011-2233445", status: "Closed" },
    3: { address: "Kamburugamuwa, Matara", phone: "071-9988776", status: "Open" },
    4: { address: "Galle Road, Colombo", phone: "077-8888888", status: "Open" },
    5: { address: "Fort, Colombo", phone: "078-4445555", status: "Closed" },
  };

  const details = shopDetails[item?.id];

  return (
    <div className="shop-details-container">
      <h2>{item?.name}</h2>
      <img src={item?.image} alt={item?.name} className="shop-image" />
      {details && (
        <div className="shop-info">
          <p><strong>Address:</strong> {details.address}</p>
          <p><strong>Phone:</strong> {details.phone}</p>
          <p><strong>Status:</strong> {details.status}</p>
        </div>
      )}
    </div>
  );
}

export default ShopDetails;
