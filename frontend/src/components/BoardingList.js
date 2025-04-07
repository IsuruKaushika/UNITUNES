import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/Styles/BoardingList.css";

const backendUrl = "http://localhost:4000"; // Use only for API, not image if image is from Cloudinary

const BoardingList = () => {
  const navigate = useNavigate();
  const [boardingListData, setBoardingListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoardings = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/boarding/list`);
        console.log(response.data);
        if (response.data?.success && Array.isArray(response.data.products)) {
          setBoardingListData(response.data.products);
        } else {
          console.error("Invalid response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching boarding data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardings();
  }, []);

  const handleBoardingClick = (id) => {
    navigate(`/boarding-details/${id}`);
  };

  return (
    <div className="boarding-list">
      <h1 className="boarding-list-title">Available Boarding Options</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="boarding-cards">
          {Array.isArray(boardingListData) && boardingListData.length > 0 ? (
            boardingListData.map((boarding) => (
              <div
                key={boarding._id}
                className="boarding-card"
                onClick={() => handleBoardingClick(boarding._id)}
              >
                <img
                  src={boarding.image[0]} // Use the Cloudinary URL directly
                  alt={boarding.Title}
                  className="boarding-thumbnail"
                />
                <div className="boarding-info">
                  <h3>{boarding.Title}</h3>
                  <p>{boarding.address}</p>
                  <p className="boarding-price">Rs {boarding.price} / month</p>
                </div>
              </div>
            ))
          ) : (
            <p>No boarding data found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BoardingList;
