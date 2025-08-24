// src/pages/Renting.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';


const backendUrl = import.meta.env.VITE_BACKEND_URL ;

const Renting = ({ token }) => {
  const navigate = useNavigate();
  const [rentType, setRentType] = useState('');
  const [itemName, setItemName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [contact, setContact] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('rentType', rentType);
      formData.append('itemName', itemName);
      formData.append('ownerName', ownerName);
      formData.append('contact', contact);
      formData.append('price', price);
      formData.append('description', description);
      
      if (itemImage) {
        formData.append('itemImage', itemImage);
      }

      const response = await axios.post(`${backendUrl}/api/rent/add`, formData, {
        headers: { 
          token,
          'Content-Type': 'multipart/form-data'
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
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
      console.error('Error adding rent item:', error);
      toast.error(error.response?.data?.message || 'Failed to add rent item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Rent Item</h2>
      
      <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-4">
        {/* Rent Type Selection */}
        <div className="w-full">
          <p className="mb-2 font-medium text-gray-700">Rent Type *</p>
          <select
            onChange={(e) => setRentType(e.target.value)}
            value={rentType}
            className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select rent category</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Tools">Tools</option>
            <option value="Books">Books</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <p className="mb-2 font-medium text-gray-700">Upload Item Image</p>
          <label htmlFor="itemImage" className="cursor-pointer">
            <img
              className="w-20 h-20 object-cover border-2 border-dashed border-gray-300 rounded-md"
              src={!itemImage ? assets.upload_area : URL.createObjectURL(itemImage)}
              alt="Upload"
            />
            <input 
              type="file" 
              id="itemImage" 
              hidden 
              accept="image/*"
              onChange={(e) => setItemImage(e.target.files[0])} 
            />
          </label>
        </div>

        {/* Item Name */}
        <div className="w-full">
          <p className="mb-2 font-medium text-gray-700">Item Name *</p>
          <input
            onChange={(e) => setItemName(e.target.value)}
            value={itemName}
            className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter item name"
            required
          />
        </div>

        {/* Owner Name */}
        <div className="w-full">
          <p className="mb-2 font-medium text-gray-700">Owner Name *</p>
          <input
            onChange={(e) => setOwnerName(e.target.value)}
            value={ownerName}
            className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter owner name"
            required
          />
        </div>

        {/* Contact Number */}
        <div className="w-full">
          <p className="mb-2 font-medium text-gray-700">Contact Number *</p>
          <input
            onChange={(e) => setContact(e.target.value)}
            value={contact}
            className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="tel"
            placeholder="Enter contact number"
            required
          />
        </div>

        {/* Price */}
        <div className="w-full">
          <p className="mb-2 font-medium text-gray-700">Price (LKR per day) *</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter price per day"
            required
          />
        </div>

        {/* Description */}
        <div className="w-full">
          <p className="mb-2 font-medium text-gray-700">Description *</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-vertical"
            placeholder="Enter item description, condition, terms, etc."
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button 
            type="submit" 
            disabled={loading}
            className="w-32 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding...' : 'ADD ITEM'}
          </button>
          <button 
            type="button" 
            className="w-32 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-md font-medium transition-colors" 
            onClick={() => navigate('/rentinglist')}
          >
            View List
          </button>
        </div>
      </form>
    </div>
  );
};

export default Renting;