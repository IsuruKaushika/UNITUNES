// src/pages/AddVehicle.jsx
import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const backendUrl = 'http://localhost:4000';

const AddVehicle = ({ token }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [type, setType] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('vehicleType', type);
      formData.append('contact', contact);
      formData.append('location', location);
      formData.append('price', price);
      formData.append('description', description);
      image && formData.append('image', image);

      const response = await axios.post(`${backendUrl}/api/vehicle/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setType('');
        setContact('');
        setLocation('');
        setPrice('');
        setDescription('');
        setImage(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      
      <div className="w-full">
        <p>Vehicle Type</p>
        <select
          onChange={(e) => setType(e.target.value)}
          value={type}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select a vehicle type</option>
          <option value="Car">Car</option>
          <option value="Van">Van</option>
          <option value="Three-Wheeler">Three-Wheeler</option>
          <option value="Bike">Bike</option>
          <option value="Bus">Bus</option>
          <option value="Lorry">Lorry</option>
        </select>
      </div>

      <div>
        <p className="mb-2">Upload Image</p>
        <label htmlFor="image">
          <img className="w-20" src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
          <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
        </label>
      </div>

      <div className="w-full">
        <p>Contact Number</p>
        <input
          onChange={(e) => setContact(e.target.value)}
          value={contact}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Enter contact number"
          required
        />
      </div>

      <div className="w-full">
        <p>Location</p>
        <input
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="City or address"
          required
        />
      </div>

      <div className="w-full">
        <p>Rental Fee</p>
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="w-full max-w-[500px] px-3 py-2"
          type="number"
          placeholder="Enter price"
          required
        />
      </div>

      <div className="w-full">
        <p>More Details</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write Content Here"
          required
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button type="submit" className="w-28 py-3 bg-black text-white">ADD</button>
        <button type="button" className="w-28 py-3 bg-gray-800 text-white" onClick={() => navigate('/vehiclelist')}>
          Vehicle List
        </button>
      </div>
    </form>
  );
};

export default AddVehicle;
