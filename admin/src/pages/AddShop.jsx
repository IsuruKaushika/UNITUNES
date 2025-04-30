import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const backendUrl = 'http://localhost:4000';

const AddShop = ({ token }) => {
  const { shopType } = useParams();
  const [shopName, setShopName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [location, setLocation] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        shopType,
        shopName,
        ownerName,
        location,
        openTime,
        closeTime,
        contact,
        address
      };

      const response = await axios.post(`${backendUrl}/api/shops/add`, data, {
        headers: { token }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setShopName('');
        setOwnerName('');
        setLocation('');
        setOpenTime('');
        setCloseTime('');
        setContact('');
        setAddress('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Add {shopType.charAt(0).toUpperCase() + shopType.slice(1)} Shop</h2>

        <input value={shopName} onChange={(e) => setShopName(e.target.value)} placeholder="Shop Name" required className="input" />
        <input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="Owner's Name" required className="input" />
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location (Google Maps URL or Name)" required className="input" />
        <div className="flex gap-4">
          <input type="time" value={openTime} onChange={(e) => setOpenTime(e.target.value)} required className="input" />
          <input type="time" value={closeTime} onChange={(e) => setCloseTime(e.target.value)} required className="input" />
        </div>
        <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact Number" required className="input" />
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required className="input" />

        <button type="submit" className="bg-green-600 text-white py-2 rounded mt-4 hover:bg-green-700 w-full">Add Shop</button>
      </form>
    </div>
  );
};

export default AddShop;
