import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const UserBoardingAdd = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // ✅ assume you store userId when login

  const [formData, setFormData] = useState({
    Title: '',
    address: '',
    contact: '',
    description: '',
    Rooms: '1',
    bathRooms: '1',
    price: '',
    gender: [],
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGender = (label) => {
    setFormData((prev) => ({
      ...prev,
      gender: prev.gender.includes(label)
        ? prev.gender.filter((g) => g !== label)
        : [...prev.gender, label],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
    });
    fd.append("userId", userId);
    images.forEach((img, i) => fd.append(`image${i+1}`, img));

    try {
      const res = await axios.post(`${backendUrl}/api/user-boarding/add`, fd);
      if (res.data.success) {
        toast.success("Boarding added successfully!");
        navigate("/my-boardings");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add boarding");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Add Your Boarding</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="Title" value={formData.Title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded" required />
        <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" className="w-full p-2 border rounded" required />
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
        
        {/* Images */}
        <input type="file" multiple onChange={(e) => setImages([...e.target.files])} />

        <button type="submit" className="bg-yellow-500 px-4 py-2 rounded text-white">Submit</button>
      </form>
    </div>
  );
};

export default UserBoardingAdd;
