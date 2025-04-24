import React from "react";
import { Link } from "react-router-dom";
import "./Styles/BoardingList.css";

const boardingData = [
  {
    id: 1,
    title: "Boarding near Campus",
    image: "/images/b1.jpg",
    description: "Spacious room close to university with free WiFi.",
    location: "Matara",
  },
  {
    id: 2,
    title: "AC Room with Kitchen",
    image: "/images/b2.jpg",
    description: "Comfortable AC boarding with separate kitchen area.",
    location: "Matara",
  },
  {
    id: 3,
    title: "Shared Room with Balcony",
    image: "/images/b3.jpeg",
    description: "Affordable shared room ideal for students.",
    location: "Galle",
  },
  {
    id: 4,
    title: "Boarding with Parking",
    image: "/images/b4.jpeg",
    description: "Secure boarding with parking space.",
    location: "Matara",
  },
];

function BoardingList() {
  return (
    <div className="boarding-list-container">
      <h2>Available Boarding Places</h2>
      <div className="boarding-grid">
        {boardingData.map((boarding) => (
          <Link to={`/boarding-details/${boarding.id}`} key={boarding.id} className="boarding-card">
            <img src={boarding.image} alt={boarding.title} />
            <h3>{boarding.title}</h3>
            <p>{boarding.location}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BoardingList;
