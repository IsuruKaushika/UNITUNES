import React from "react";
import { Link } from "react-router-dom";
import "./Styles/RentItemsPage.css";

function RentItems({ product }) {
  return (
    <div className="rent-card">
      <img src={product.image} alt={product.title} className="rent-image" />
      <h3>{product.title}</h3>
      <p>Rs. {product.pricePerDay} / day</p>
      <p>⭐ {product.rating} ({product.reviews} reviews)</p>
      <Link to={`/rent-details/${product.id}`}>
        <button className="rent-button">View Details</button>
      </Link>
    </div>
  );
}


export default RentItems;
