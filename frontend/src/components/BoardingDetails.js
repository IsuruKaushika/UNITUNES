import React from "react";
import { useParams, Link } from "react-router-dom";
import "./Styles/BoardingDetails.css";

const boardingData = [
  {
    id: 1,
    title: "Boarding near Campus",
    image: "/images/b1.jpg",
    description: "Spacious room close to university with free WiFi, water and electricity included.",
    location: "Matara",
    contact: "071-1234567",
  },
  {
    id: 2,
    title: "AC Room with Kitchen",
    image: "/images/b2.jpg",
    description: "Comfortable AC boarding with a kitchen and private bathroom.",
    location: "Matara",
    contact: "072-2345678",
  },
  {
    id: 3,
    title: "Shared Room with Balcony",
    image: "/images/b3.jpeg",
    description: "Shared room with two beds, attached bathroom and balcony.",
    location: "Galle",
    contact: "075-3456789",
  },
  {
    id: 4,
    title: "Boarding with Parking",
    image: "/images/b4.jpeg",
    description: "Safe boarding place with ample parking and quiet environment.",
    location: "Matara",
    contact: "077-4567890",
  },
];

function BoardingDetails() {
  const { id } = useParams();
  const boarding = boardingData.find((item) => item.id === parseInt(id));

  if (!boarding) return <h2>Boarding not found</h2>;

  return (
    <div className="boarding-details-container">
      <img src={boarding.image} alt={boarding.title} />
      <div className="details-content">
        <h2>{boarding.title}</h2>
        <p><strong>Location:</strong> {boarding.location}</p>
        <p><strong>Description:</strong> {boarding.description}</p>
        <p><strong>Contact:</strong> {boarding.contact}</p>
        <Link to="/boarding-list" className="back-button">← Back to Listings</Link>
      </div>
    </div>
  );
}

export default BoardingDetails;
