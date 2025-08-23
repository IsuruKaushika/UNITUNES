import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const backendUrl = process.env.VITE_BACKEND_URL

const Shop = ({ token }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [Category, setCategory] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('Category', Category);
      formData.append('name', name);
      formData.append('contact', contact);
      formData.append('address', address);
      formData.append('description', description);
      if (image) formData.append('image', image);

      const response = await axios.post(`${backendUrl}/api/shop/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setCategory('');
        setContact('');
        setAddress('');
        setDescription('');
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-3xl mx-auto bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-md space-y-6 border border-white/20">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">🏪 Add New Shop</h1>
          <p className="text-sm text-gray-600">Provide complete details to list your shop</p>
        </div>

        <div className="grid gap-4">
          {/* Shop Name */}
          <InputField label="Name of the Shop" value={name} setValue={setName} placeholder="Enter shop name" required />

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Shop Category</label>
            <select
              value={Category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
              required
            >
              <option value="">Select category</option>
              <option value="Bakery">Bakery</option>
              <option value="Grocery">Grocery</option>
              <option value="Meals">Meals</option>
              <option value="Bookshop">Bookshop</option>
              <option value="Communication">Communication</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Upload Image</label>
            <label htmlFor="image">
              <div className="w-28 h-28 border border-gray-300 rounded-xl overflow-hidden flex items-center justify-center bg-gray-100">
                <img className="w-full h-full object-cover" src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="Upload" />
              </div>
              <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
            </label>
          </div>

          {/* Contact */}
          <InputField label="Contact Number" value={contact} setValue={setContact} placeholder="Enter phone number" required />

          {/* Address */}
          <InputField label="Location" value={address} setValue={setAddress} placeholder="City or address" required />

          {/* Description */}
          <TextArea label="More Details" value={description} setValue={setDescription} placeholder="Mention shop services, timings, etc." required />

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Add Shop'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/shoplist')}
              className="px-6 py-3 bg-gray-700 text-white rounded-xl shadow-md hover:bg-gray-800"
            >
              Shop List
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

// Reusable InputField
const InputField = ({ label, value, setValue, type = 'text', placeholder = '', required = false }) => (
  <div className="w-full">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
    />
  </div>
);

// Reusable TextArea
const TextArea = ({ label, value, setValue, placeholder = '', required = false }) => (
  <div className="w-full">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl min-h-[100px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
    />
  </div>
);

export default Shop;
