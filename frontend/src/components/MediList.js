import React from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/MediList.css";

const MediList = () => {
  const navigate = useNavigate();

  const mediData = [
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
  };

  return (
    <div className="medi-list">
      <h2>Medicare Services</h2>
      <div className="medi-grid">
        {mediData.map((item) => (
          <div key={item.id} className="medi-card" onClick={() => handleClick(item)}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediList;
