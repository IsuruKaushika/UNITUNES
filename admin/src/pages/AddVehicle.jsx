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
  const [Category, setCategory] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('Category', Category);
      formData.append('contact', contact);
      formData.append('address', address);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('owner', owner);
      
      // Handle image upload - backend expects an array
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post(`${backendUrl}/api/taxi/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setCategory('');
        setContact('');
        setAddress('');
        setPrice('');
        setDescription('');
        setOwner('');
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
          onChange={(e) => setCategory(e.target.value)}
          value={Category}
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
        <p>Owner</p>
        <input
          onChange={(e) => setOwner(e.target.value)}
          value={owner}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded"
          type="text"
          placeholder="Enter owner name"
          required
        />
      </div>

      <div className="w-full">
        <p>Contact Number</p>
        <input
          onChange={(e) => setContact(e.target.value)}
          value={contact}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded"
          type="text"
          placeholder="Enter contact number"
          required
        />
      </div>

      <div className="w-full">
        <p>Location</p>
        <input
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded"
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
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded"
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
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded"
          placeholder="Write Content Here"
          required
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button type="submit" className="w-28 py-3 bg-black text-white rounded">ADD</button>
        <button type="button" className="w-28 py-3 bg-gray-800 text-white rounded" onClick={() => navigate('/vehiclelist')}>
          Vehicle List
        </button>
      </div>
    </form>
  );
};

export default AddVehicle;