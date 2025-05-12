import React from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/MediList.css";

const MediList = () => {
  const navigate = useNavigate();

  const mediData = [
<<<<<<< HEAD
    { id: 1, name: "Pharmacy A", image: "/images/medi-1.jpg" },
    { id: 2, name: "Pharmacy B", image: "/images/medi-2.jpg" },
    { id: 3, name: "Pharmacy C", image: "/images/medi-3.jpg" },
    { id: 4, name: "Pharmacy D", image: "/images/medi-4.jpg" },
    { id: 5, name: "Medicare Center 1", image: "/images/medi-5.jpg" },
    { id: 6, name: "Medicare Center 2", image: "/images/medi-5.jpg" },
  ];

  // ✅ FIXED: Pass selected item as state
  const handleClick = (item) => {
    navigate(`/medi-details/${item.id}`, { state: { item } });
=======
    { id: 1, name: "Pharmacy One", image: "/images/medi-1.jpg", category: "pharmacy", description: "24/7 Service, Medicines and First Aid", contact: "071-1234567" },
    { id: 2, name: "Pharmacy Two", image: "/images/medi-2.jpg", category: "pharmacy", description: "Home Delivery Available", contact: "071-2345678" },
    { id: 3, name: "Pharmacy Three", image: "/images/medi-3.jpg", category: "pharmacy", description: "Discounts for Students", contact: "071-3456789" },
    { id: 4, name: "Pharmacy Four", image: "/images/medi-4.jpg", category: "pharmacy", description: "Imported Medicines", contact: "071-4567890" },
    { id: 5, name: "Medicare Center One", image: "/images/medi-5.jpg", category: "medicare", description: "Health Checkups and Consultations", contact: "077-1234567" },
    { id: 6, name: "Medicare Center Two", image: "/images/medi-5.jpg", category: "medicare", description: "Emergency Care and Ambulance", contact: "077-2345678" },
  ];

  const handleClick = (id) => {
    navigate(`/medi-details/${id}`);
>>>>>>> 8fda8334845fa94ccbe364c8ecd1ae0c382fee1a
  };

  return (
    <div className="medi-list">
<<<<<<< HEAD
      <h2>Medicare Services</h2>
      <div className="medi-grid">
        {mediData.map((item) => (
          <div key={item.id} className="medi-card" onClick={() => handleClick(item)}>
=======
      <h2>Pharmacies</h2>
      <div className="medi-grid">
        {mediData.filter(m => m.category === "pharmacy").map(item => (
          <div key={item.id} className="medi-card" onClick={() => handleClick(item.id)}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>

      <h2>Medicares</h2>
      <div className="medi-grid">
        {mediData.filter(m => m.category === "medicare").map(item => (
          <div key={item.id} className="medi-card" onClick={() => handleClick(item.id)}>
>>>>>>> 8fda8334845fa94ccbe364c8ecd1ae0c382fee1a
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediList;
