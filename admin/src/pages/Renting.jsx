// src/pages/Renting.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const backendUrl = 'http://localhost:4000';

const Renting = ({ token }) => {
  const navigate = useNavigate();
  const [rentType, setRentType] = useState('');
  const [itemName, setItemName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [contact, setContact] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [itemImage, setItemImage] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('rentType', rentType);
      formData.append('itemName', itemName);
      formData.append('ownerName', ownerName);
      formData.append('contact', contact);
      formData.append('price', price);
      formData.append('description', description);
      itemImage && formData.append('itemImage', itemImage);

      const response = await axios.post(`${backendUrl}/api/rent/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setRentType('');
        setItemName('');
        setOwnerName('');
        setContact('');
        setPrice('');
        setDescription('');
        setItemImage(null);
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
        <p>Rent Type</p>
        <select
          onChange={(e) => setRentType(e.target.value)}
          value={rentType}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select rent category</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Tools">Tools</option>
          <option value="Books">Books</option>
        </select>
      </div>

      <div>
        <p className="mb-2">Upload Image</p>
        <label htmlFor="itemImage">
          <img
            className="w-20"
            src={!itemImage ? assets.upload_area : URL.createObjectURL(itemImage)}
            alt="Upload"
          />
          <input type="file" id="itemImage" hidden onChange={(e) => setItemImage(e.target.files[0])} />
        </label>
      </div>

      <div className="w-full">
        <p>Item Name</p>
        <input
          onChange={(e) => setItemName(e.target.value)}
          value={itemName}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Enter item name"
          required
        />
      </div>

      <div className="w-full">
        <p>Owner Name</p>
        <input
          onChange={(e) => setOwnerName(e.target.value)}
          value={ownerName}
          className="w-full max-w-[500px] px-3 py-2"
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
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Enter contact number"
          required
        />
      </div>

      <div className="w-full">
        <p>Price (LKR)</p>
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
        <p>Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Enter description"
          required
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button type="submit" className="w-28 py-3 bg-green-600 text-white">ADD</button>
        <button type="button" className="w-28 py-3 bg-gray-800 text-white" onClick={() => navigate('/rentinglist')}>
          Rent List
        </button>
      </div>
    </form>
  );
};

export default Renting;
