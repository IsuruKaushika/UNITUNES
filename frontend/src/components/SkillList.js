import React from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/SkillList.css";

const SkillList = () => {
  const navigate = useNavigate();

  const skillData = [
    {
      id: 1,
      name: "Kasun Perera",
      skill: "Graphic Design",
      image: "/images/skill-1.jpg",
      type: "Creative",
      criteria: "Photoshop, Illustrator",
      specialization: "Logo & Branding",
      phone: "0771234567",
      payment: "Paid"
    },
    {
      id: 2,
      name: "Nimali Silva",
      skill: "Tutoring",
      image: "/images/skill-2.jpg",
      type: "Education",
      criteria: "Mathematics, Physics",
      specialization: "A/L Tutoring",
      phone: "0719876543",
      payment: "Free"
    },
    {
      id: 3,
      name: "Tharindu Jayasena",
      skill: "Video Editing",
      image: "/images/skill-3.jpg",
      type: "Multimedia",
      criteria: "Adobe Premiere, After Effects",
      specialization: "Short Films",
      phone: "0751122334",
      payment: "Paid"
    }
  ];

  const handleClick = (item) => {
    navigate(`/skill-details/${item.id}`, { state: item });
  };

  return (
    <div className="skill-list">
      <h2>Skill Sharing</h2>
      <div className="skill-grid">
        {skillData.map((item) => (
          <div key={item.id} className="skill-card" onClick={() => handleClick(item)}>
            <img src={item.image} alt={item.name} />
            <h3>{item.skill}</h3>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillList;
