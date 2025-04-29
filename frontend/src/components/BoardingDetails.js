import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../components/Styles/BoardingDetails.css";

const backendUrl = "http://localhost:4000"; // Change if hosted elsewhere

const BoardingDetails = () => {
  const { id } = useParams(); // id is boardingId
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoardingDetails = async () => {
      try {
        const response = await axios.post(`${backendUrl}/api/boarding/single`, {
          boardingId: id,
        });

        console.log(response.data);
        if (response.data?.success && response.data.boarding) {
          setDetails(response.data.boarding);
        } else {
          console.error("Invalid response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching boarding details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardingDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!details) return <p>Details not found!</p>;

  return (
    <div className="boarding-details">
      <h2>{details.Title}</h2>
      

      <div className="images">
        {details.image?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Boarding ${index + 1}`}
            className="boarding-image"
          />
        ))}
      </div>

      <p><strong>Owner:</strong> {details.owner}</p>
      <p><strong>Address:</strong> {details.address}</p>
      <p><strong>Number of Rooms:</strong> {details.Rooms}</p>
      <p><strong>Number of Bathrooms:</strong> {details.bathRooms}</p>
      <p><strong>Description:</strong> {details.description}</p>
      <h3>Rs {details.price} / month</h3>
      <p><strong>Contact:</strong> {details.contact}</p>

      {details.features?.length > 0 && (
        <div>
          <strong>Features:</strong>
          <ul>
            {details.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      <a
        href={`https://wa.me/${details.contact?.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>Contact via WhatsApp</button>
      </a>
    </div>
  );
};

export default BoardingDetails;