import React from "react";
import { Link } from "react-router-dom";
import './Styles/TaxiList.css';


const taxiData = [
  { id: 1, name: "Taxi 1", image: "/images/taxi-1.jpg", location: "Galle", price: "Rs. 300/km" },
  { id: 2, name: "Taxi 2", image: "/images/taxi-2.jpg", location: "Matara", price: "Rs. 250/km" },
  { id: 3, name: "Taxi 3", image: "/images/taxi-3.jpg", location: "Wakwella", price: "Rs. 280/km" },
  { id: 4, name: "Taxi 4", image: "/images/taxi-4.png", location: "Hapugala", price: "Rs. 320/km" },
  { id: 5, name: "Taxi 5", image: "/images/taxi-5.jpg", location: "Karapitiya", price: "Rs. 270/km" },
  { id: 6, name: "Taxi 6", image: "/images/taxi-6.jpg", location: "Sarasavi asapuwa", price: "Rs. 290/km" },
];

function TaxiList() {
  return (
    <div className="taxi-list">
      <h2>Available Taxis</h2>
      <div className="taxi-grid">
        {taxiData.map((taxi) => (
          <Link to={`/taxi-details/${taxi.id}`} key={taxi.id} className="taxi-card">
            <img src={taxi.image} alt={taxi.name} />
            <h3>{taxi.name}</h3>
            <p>{taxi.location}</p>
            <p>{taxi.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TaxiList;
