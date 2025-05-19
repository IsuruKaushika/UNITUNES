import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/Styles/TaxiList.css";

const backendUrl = "http://localhost:4000"; // Use only for API, not image if image is from Cloudinary

const TaxiList = () => {
  const navigate = useNavigate();
  const [TaxiListData, setTaxiListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaxis = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/taxi/list`);
        console.log(response.data);
        if (response.data?.success && Array.isArray(response.data.products)) {
          setTaxiListData(response.data.products);
        } else {
          console.error("Invalid response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching taxi data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaxis();
  }, []);

  const handleTaxiClick = (id) => {
    navigate(`/taxi-details/${id}`);
  };

  return (
    <div className="taxi-list">
      <h1 className="taxi-list-title">Available Taxi Options</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="taxi-cards">
          {Array.isArray(TaxiListData) && TaxiListData.length > 0 ? (
            TaxiListData.map((taxi) => (
              <div
                key={taxi._id}
                className="taxi-card"
                onClick={() => handletaxiClick(taxi._id)}
              >
                <img
                  src={taxi.image[0]} // Use the Cloudinary URL directly
                  alt={taxi.Title}
                  className="taxi-thumbnail"
                />
                <div className="taxi-info">
                  <h3>{taxi.Title}</h3>
                  <p>{taxi.address}</p>
                  <p className="taxi-price">Rs {taxi.price} / month</p>
                </div>
              </div>
            ))
          ) : (
            <p>No taxi data found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaxiList;
//only for commit