import React from "react";
<<<<<<< HEAD
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
=======
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
>>>>>>> 8fda8334845fa94ccbe364c8ecd1ae0c382fee1a

export default MediDetails;
