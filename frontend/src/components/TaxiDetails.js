import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../components/Styles/TaxiDetails.css";

const backendUrl = "http://localhost:4000"; // Change if hosted elsewhere

const TaxiDetails = () => {
  const { id } = useParams(); // id is taxiId
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaxiDetails = async () => {
      try {
        const response = await axios.post(`${backendUrl}/api/taxi/single`, {
          taxiId: id,
        });

        console.log(response.data);
        if (response.data?.success && response.data.taxi) {
          setDetails(response.data.taxi);
        } else {
          console.error("Invalid response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching taxi details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaxiDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!details) return <p>Details not found!</p>;

  return (
    <div className="taxi-details">
      <h2>{details.Title}</h2>

      <div className="images">
        {details.image?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Taxi ${index + 1}`}
            className="taxi-image"
          />
        ))}
      </div>

      <p><strong>Owner:</strong> {details.owner}</p>
      <p><strong>Vehicle Type:</strong> {details.vehicleType}</p>
      <p><strong>License Plate:</strong> {details.licensePlate}</p>
      <p><strong>Description:</strong> {details.description}</p>
      <h3>Rs {details.price} / trip</h3>
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

export default TaxiDetails;
