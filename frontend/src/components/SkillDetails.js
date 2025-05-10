import React from "react";
import { useParams, useLocation } from "react-router-dom";
import "./Styles/SkillDetails.css";

const SkillDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();

  if (!state) {
    return <div className="skill-details"><p>Skill data not found or not passed correctly.</p></div>;
  }

  const {
    name,
    image,
    skill,
    type,
    criteria,
    specialization,
    phone,
    payment
  } = state;

  return (
    <div className="skill-details">
      <h2>{skill}</h2>
      <img src={image} alt={name} />
      <div className="skill-info">
        <p><strong>Student:</strong> {name}</p>
        <p><strong>Skill Type:</strong> {type}</p>
        <p><strong>Criteria:</strong> {criteria}</p>
        <p><strong>Specialization:</strong> {specialization}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Payment:</strong> {payment}</p>
      </div>
    </div>
  );
};

export default SkillDetails;
