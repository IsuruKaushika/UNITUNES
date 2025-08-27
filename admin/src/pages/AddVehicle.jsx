import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Use environment variable with fallback to localhost
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AddVehicle = ({ token }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [Category, setCategory] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('Category', Category);
      formData.append('contact', contact);
      formData.append('address', address);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('owner', owner);
      formData.append('vehicleNo', vehicleNo);
      if (image) formData.append('image', image);

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
        setVehicleNo('');
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
          <h1 className="text-3xl font-bold text-gray-800 mb-1">🚖 Add New Vehicle</h1>
          <p className="text-sm text-gray-600">Fill in vehicle details for your taxi listing</p>
        </div>

        <div className="grid gap-4">
          {/* Vehicle Type */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Vehicle Type</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={Category}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
              required
            >
              <option value="">Select vehicle type</option>
              <option value="Car">Car</option>
              <option value="Van">Van</option>
              <option value="Three-Wheeler">Three-Wheeler</option>
              <option value="Bike">Bike</option>
              <option value="Bus">Bus</option>
              <option value="Lorry">Lorry</option>
            </select>
          </div>

          {/* Vehicle Number */}
          <InputField label="Vehicle Number" value={vehicleNo} setValue={setVehicleNo} placeholder="e.g., WP CAB-1234" required />

          {/* Upload Image */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Upload Image</label>
            <label htmlFor="image">
              <div className="w-28 h-28 border border-gray-300 rounded-xl overflow-hidden flex items-center justify-center bg-gray-100">
                <img className="w-full h-full object-cover" src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="Upload Preview" />
              </div>
              <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
            </label>
          </div>

          {/* Owner Info */}
          <InputField label="Owner's Name" value={owner} setValue={setOwner} placeholder="Enter owner name" required />
          <InputField label="Contact Number" value={contact} setValue={setContact} placeholder="Enter phone number" required />
          <InputField label="Location" value={address} setValue={setAddress} placeholder="City or address" required />
          <InputField label="Rental Fee (Per KM)" value={price} setValue={setPrice} placeholder="Enter price (LKR)" type="number" required />

          {/* Description */}
          <TextArea label="More Details" value={description} setValue={setDescription} placeholder="Mention rules, conditions, etc." required />

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Add Vehicle'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/vehiclelist')}
              className="px-6 py-3 bg-gray-700 text-white rounded-xl shadow-md hover:bg-gray-800"
            >
              Vehicle List
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

export default AddVehicle;