import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const UserBoardingList = () => {
  const [boardings, setBoardings] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBoardings = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user-boarding/list/${userId}`);
        if (res.data.success) {
          setBoardings(res.data.boardings);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchBoardings();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${backendUrl}/api/user-boarding/delete/${id}`);
      if (res.data.success) {
        toast.success("Boarding deleted");
        setBoardings(boardings.filter(b => b._id !== id));
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Boardings</h2>
      {boardings.length === 0 ? (
        <p>No boardings added yet</p>
      ) : (
        <ul className="space-y-4">
          {boardings.map(b => (
            <li key={b._id} className="p-4 border rounded flex justify-between items-center">
              <div>
                <h3 className="font-bold">{b.Title}</h3>
                <p>{b.address}</p>
                <p>Rs {b.price}</p>
              </div>
              <button onClick={() => handleDelete(b._id)} className="bg-red-500 px-3 py-1 rounded text-white">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserBoardingList;
