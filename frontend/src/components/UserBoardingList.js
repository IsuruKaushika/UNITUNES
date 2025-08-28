import React, { useEffect, useState } from "react";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const UserBoardingList = () => {
  const userId = localStorage.getItem("userId");
  const [boardings, setBoardings] = useState([]);

  useEffect(() => {
    const fetchBoardings = async () => {
      const res = await axios.get(`${backendUrl}/api/user-boarding/list/${userId}`);
      if(res.data.success){
        setBoardings(res.data.boardings);
      }
    };
    fetchBoardings();
  }, [userId]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Boardings</h2>
      {boardings.length === 0 && <p>No boardings yet</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {boardings.map(b => (
          <div key={b._id} className="border rounded p-4 shadow">
            <h3 className="font-bold">{b.Title}</h3>
            <p>{b.address}</p>
            <p>Price: {b.price}</p>
            <p>Rooms: {b.Rooms} | Bathrooms: {b.bathRooms}</p>
            <div className="flex gap-2">
              {b.image.map((img, i) => <img key={i} src={img} alt="boarding" className="w-16 h-16 object-cover" />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBoardingList;
