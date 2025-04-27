import React from "react";
import { useParams } from "react-router-dom";
import "./Styles/MediDetails.css";

const mediData = [
  { id: 1, name: "Pharmacy One", image: "/images/medi-1.jpg", description: "24/7 Service, Medicines and First Aid", contact: "071-1234567" },
  { id: 2, name: "Pharmacy Two", image: "/images/medi-2.jpg", description: "Home Delivery Available", contact: "071-2345678" },
  { id: 3, name: "Pharmacy Three", image: "/images/medi-3.jpg", description: "Discounts for Students", contact: "071-3456789" },
  { id: 4, name: "Pharmacy Four", image: "/images/medi-4.jpg", description: "Imported Medicines", contact: "071-4567890" },
  { id: 5, name: "Medicare Center One", image: "/images/medi-5.jpg", description: "Health Checkups and Consultations", contact: "077-1234567" },
  { id: 6, name: "Medicare Center Two", image: "/images/medi-5.jpg", description: "Emergency Care and Ambulance", contact: "077-2345678" },
];

const MediDetails = () => {
  const { id } = useParams();
  const medi = mediData.find(item => item.id === parseInt(id));

  return (
    <div className="medi-details">
      <h2>{medi.name}</h2>
      <img src={medi.image} alt={medi.name} />
      <p>{medi.description}</p>
      <p><strong>Contact:</strong> {medi.contact}</p>
    </div>
  );
};

export default MediDetails;
