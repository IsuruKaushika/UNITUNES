import React from "react";
import "./Styles/rentitems.css"; // Make sure this path is correct

const RentItems = ({ item }) => {
  return (
    <div className="rent-card">
      <img src={item.image} alt={item.title} className="rent-image" />
      <h3 className="rent-title">{item.title}</h3>
      <p className="rent-price">Rs.{item.price.toLocaleString()}</p>
      {item.discount && <p className="rent-discount">-{item.discount}%</p>}
      <p className="rent-rating">⭐ {item.rating} ({item.reviews})</p>
    </div>
  );
};

export default RentItems;
