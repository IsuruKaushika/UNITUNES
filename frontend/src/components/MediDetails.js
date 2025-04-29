import React from "react";
import { useParams, useLocation } from "react-router-dom";
import "./Styles/MediDetails.css";

function MediDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;

  // ✅ Extract `item` from state
  const item = state?.item;

  if (!item) {
    return <div className="medi-details"><p>Item not found or data not passed.</p></div>;
  }

  const {
    name,
    address,
    phone,
    status,
    doctor,
    specialization,
    image,
    type // 'pharmacy' or 'medicare'
  } = item;

  return (
    <div className="medi-details">
      <h2>{name}</h2>
      <img src={image} alt={name} className="detail-image" />
      
      <div className="detail-info">
        <p><strong>Address:</strong> {address}</p>
        {type === "pharmacy" ? (
          <>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Status:</strong> {status}</p>
          </>
        ) : (
          <>
            <p><strong>Doctor:</strong> {doctor}</p>
            <p><strong>Specialization:</strong> {specialization}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Status:</strong> {status}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default MediDetails;
