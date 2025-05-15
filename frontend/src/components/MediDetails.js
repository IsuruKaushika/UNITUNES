import React from "react";
import { useParams, useLocation } from "react-router-dom";
import "./Styles/MediDetails.css";

const mediData = [
  {
    id: 1,
    name: "Pharmacy One",
    image: "/images/medi-1.jpg",
    category: "pharmacy",
    description: "24/7 Service, Medicines and First Aid",
    contact: "071-1234567",
  },
  {
    id: 2,
    name: "Pharmacy Two",
    image: "/images/medi-2.jpg",
    category: "pharmacy",
    description: "Home Delivery Available",
    contact: "071-2345678",
  },
  {
    id: 3,
    name: "Pharmacy Three",
    image: "/images/medi-3.jpg",
    category: "pharmacy",
    description: "Discounts for Students",
    contact: "071-3456789",
  },
  {
    id: 4,
    name: "Pharmacy Four",
    image: "/images/medi-4.jpg",
    category: "pharmacy",
    description: "Imported Medicines",
    contact: "071-4567890",
  },
  {
    id: 5,
    name: "Medicare Center One",
    image: "/images/medi-5.jpg",
    category: "medicare",
    description: "Health Checkups and Consultations",
    contact: "077-1234567",
  },
  {
    id: 6,
    name: "Medicare Center Two",
    image: "/images/medi-5.jpg",
    category: "medicare",
    description: "Emergency Care and Ambulance",
    contact: "077-2345678",
  },
];

const MediDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  // Get from navigation state or fallback to mediData
  const item = location.state?.item || mediData.find(m => m.id === parseInt(id));

  if (!item) {
    return (
      <div className="medi-details">
        <p>Item not found or data not passed.</p>
      </div>
    );
  }

  const { name, image, description, contact, category } = item;

  return (
    <div className="medi-details">
      <h2>{name}</h2>
      <img src={image} alt={name} className="detail-image" />
      <div className="detail-info">
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Contact:</strong> {contact}</p>
      </div>
    </div>
  );
};

export default MediDetails;
