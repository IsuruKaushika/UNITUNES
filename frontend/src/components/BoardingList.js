import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/Styles/BoardingList.css"; // Ensure your CSS file exists and is styled as needed

// Mock data for boarding options
const boardingListData = [
  {
    id: 1,
    title: "Spacious Single Room",
    location: "300/1, Wakwella, Galle",
    price: "Rs 9,000 / month",
    thumbnail: "/images/b1.jpg", // Add thumbnail image paths
  },
  {
    id: 2,
    title: "Modern Apartment",
    location: "10/2, Colombo Road, Gampaha",
    price: "Rs 20,000 / month",
    thumbnail: "/images/b2.jpg",
  },
  {
    id: 3,
    title: "Shared Accommodation",
    location: "25, Matara Road, Hikkaduwa",
    price: "Rs 7,000 / month",
    thumbnail: "/images/b3.jpeg",
  },
  {
    id: 4,
    title: "Shared Accommodation",
    location: "25, Matara Road, Hikkaduwa",
    price: "Rs 7,000 / month",
    thumbnail: "/images/b4.jpeg",
  },
  // Add more items as needed
];

const BoardingList = () => {
  const navigate = useNavigate();

  // Handle click to navigate to BoardingDetails
  const handleBoardingClick = (id) => {
    navigate(`/boarding-details/${id}`);
  };

  return (
    <div className="boarding-list">
      <h1 className="boarding-list-title">Available Boarding Options</h1>
      <div className="boarding-cards">
        {boardingListData.map((boarding) => (
          <div
            key={boarding.id}
            className="boarding-card"
            onClick={() => handleBoardingClick(boarding.id)}
          >
            <img
              src={boarding.thumbnail}
              alt={boarding.title}
              className="boarding-thumbnail"
            />
            <div className="boarding-info">
              <h3>{boarding.title}</h3>
              <p>{boarding.location}</p>
              <p className="boarding-price">{boarding.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardingList;
