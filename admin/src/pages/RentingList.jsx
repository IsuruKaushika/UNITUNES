// src/pages/RentingList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';  // Adjust if needed

const RentingList = ({ token }) => {
  const [rentItems, setRentItems] = useState([]);

  useEffect(() => {
    const fetchRentItems = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/rent/items`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRentItems(response.data);
      } catch (error) {
        console.error('Error fetching rent items:', error);
      }
    };
    fetchRentItems();
  }, [token]);

  return (
    <div>
      <h2>Renting List</h2>
      <div>
        {rentItems.length === 0 ? (
          <p>No renting items available</p>
        ) : (
          rentItems.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RentingList;
