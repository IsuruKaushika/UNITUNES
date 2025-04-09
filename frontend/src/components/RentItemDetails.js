// src/components/RentItemDetails.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import { productList } from "./RentItemsPage";

const RentItemDetails = () => {
  const { id } = useParams();
  const item = productList.find((p) => p.id === parseInt(id));

  if (!item) return <div style={{ padding: "20px" }}>Item not found.</div>;

  return (
    <div style={{ padding: "30px", background: "#eef1f9", minHeight: "100vh" }}>
      <Link to="/rent-items" style={{ textDecoration: "none", color: "#1c3faa" }}>← Back to Items</Link>
      <div style={{
        display: "flex",
        marginTop: "20px",
        background: "#fff",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      }}>
        <img src={item.image} alt={item.title} style={{
          width: "300px",
          height: "300px",
          objectFit: "cover",
          borderRadius: "10px",
          border: "1px solid #ccc",
          marginRight: "30px"
        }} />
        <div>
          <h2 style={{ fontSize: "26px", color: "#2a2d53" }}>{item.title}</h2>
          <p style={{ fontSize: "18px", margin: "12px 0" }}><strong>Price Per Day:</strong> Rs.{item.pricePerDay}</p>
          <p><strong>Owner Contact:</strong> {item.owner}</p>
          <p style={{ marginTop: "10px" }}><strong>Description:</strong> {item.description}</p>
          <p style={{ marginTop: "10px" }}><strong>Rating:</strong> {item.rating} ⭐ ({item.reviews} reviews)</p>
        </div>
      </div>
    </div>
  );
};

export default RentItemDetails;
