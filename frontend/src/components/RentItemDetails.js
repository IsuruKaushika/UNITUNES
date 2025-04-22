import React from "react";
import { useParams } from "react-router-dom";
import productList from "./ProductList";
import "./Styles/RentItemDetails.css";

function RentItemDetails() {
  const { id } = useParams();
  const item = productList.find((product) => product.id === parseInt(id));

  if (!item) {
    return <h2>Item not found</h2>;
  }

  return (
    <div className="rent-detail-container">
      <img src={item.image} alt={item.title} className="rent-detail-image" />
      <div className="rent-detail-info">
        <h2>{item.title}</h2>
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Price Per Day:</strong> Rs. {item.pricePerDay}</p>
        <p><strong>Rating:</strong> {item.rating} ⭐ ({item.reviews} reviews)</p>
        <p><strong>Owner Contact:</strong> {item.owner}</p>
      </div>
    </div>
  );
}

export default RentItemDetails;
