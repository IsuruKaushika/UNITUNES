// src/components/Medicare/MediSelect.js

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/MediSelect.css";

function MediSelect() {
  const navigate = useNavigate();
  
  const handleSelectPharmacy = () => {
    navigate("/medi-list?category=pharmacy");
  };

  const handleSelectMedicare = () => {
    navigate("/medi-list?category=medicare");
  };

  return (
    <div className="medi-select-page">
      <h1 className="medi-select-title">Select Service</h1>
      <div className="medi-select-options">
        <div className="medi-option" onClick={handleSelectPharmacy}>
          <img src="/images/medi-1.jpg" alt="Pharmacy" />
          <p>Pharmacy</p>
        </div>
        <div className="medi-option" onClick={handleSelectMedicare}>
          <img src="/images/medi-5.jpg" alt="Medicare Service" />
          <p>Medicare Service</p>
        </div>
      </div>
    </div>
  );
}

export default MediSelect;
