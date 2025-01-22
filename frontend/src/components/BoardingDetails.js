import React from "react";
import { useParams } from "react-router-dom";
import "../components/Styles/BoardingDetails.css"; // Make sure to import the CSS file

const boardingDetailsData = {
  1: {
    price: "Rs 9,000 / month (Negotiable)",
    owner: "Thivanka Wimalachandra",
    type: "Portion",
    address: "300/1, Ruwana, Wakwella",
    contact: "+94 714 770 692",
    beds: 1,
    baths: 1,
    features: [
      "With furniture and all facilities",
      "Gents only",
      "5 min to University",
      "100m to Wakwella Road",
    ],
    image: [
      "/images/b1.jpg",
      "/images/b2.jpg",
      "/images/b3.jpeg",
      "/images/b4.jpeg",
    ],
  },
  // Add more items here
};

const BoardingDetails = () => {
  const { id } = useParams();
  const details = boardingDetailsData[id];

  if (!details) return <p>Details not found!</p>;

  return (
    <div className="boarding-details">
      <h1>{details.price}</h1>
      <div className="images">
        {details.image.map((img, index) => (
          <img key={index} src={img} alt={`Boarding ${index + 1}`} className="boarding-image" />
        ))}
      </div>
      <p>Owner Name: {details.owner}</p>
      <p>Property Type: {details.type}</p>
      <p>Address: {details.address}</p>
      <p>Contact: {details.contact}</p>
      <p>Beds: {details.beds}</p>
      <p>Baths: {details.baths}</p>
      <ul>
        {details.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button>Contact via WhatsApp</button>
    </div>
  );
};

export default BoardingDetails;
