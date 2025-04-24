import React from "react";
import { useParams } from "react-router-dom";
import './Styles/TaxiDetails.css';


const taxiDetails = {
  1: { name: "Taxi 1", image: "/images/taxi-1.jpg", owner: "John", phone: "0771234567", price: "Rs. 300/km", location: "Galle", description: "Comfortable 4-seater with AC." },
  2: { name: "Taxi 2", image: "/images/taxi-2.jpg", owner: "Dilan", phone: "0777654321", price: "Rs. 250/km", location: "Matara", description: "Eco-friendly hybrid taxi." },
  3: { name: "Taxi 3", image: "/images/taxi-3.jpg", owner: "Saman", phone: "0712345678", price: "Rs. 280/km", location: "Wakwella", description: "Luxury sedan for long trips." },
  4: { name: "Taxi 4", image: "/images/taxi-4.png", owner: "Ruwan", phone: "0765432187", price: "Rs. 320/km", location: "Hapugala", description: "Spacious minivan." },
  5: { name: "Taxi 5", image: "/images/taxi-5.jpg", owner: "Amal", phone: "0701234567", price: "Rs. 270/km", location: "Karapitiya", description: "Comfortable and clean taxi." },
  6: { name: "Taxi 6", image: "/images/taxi-6.jpg", owner: "Nuwan", phone: "0781234567", price: "Rs. 290/km", location: "Thaleigana", description: "Affordable ride with friendly driver." },
};

function TaxiDetails() {
  const { id } = useParams();
  const taxi = taxiDetails[id];

  if (!taxi) return <p>Taxi not found</p>;

  return (
    <div className="taxi-details">
      <h2>{taxi.name}</h2>
      <img src={taxi.image} alt={taxi.name} />
      <p><strong>Owner:</strong> {taxi.owner}</p>
      <p><strong>Contact:</strong> {taxi.phone}</p>
      <p><strong>Location:</strong> {taxi.location}</p>
      <p><strong>Price:</strong> {taxi.price}</p>
      <p><strong>Description:</strong> {taxi.description}</p>
    </div>
  );
}

export default TaxiDetails;
