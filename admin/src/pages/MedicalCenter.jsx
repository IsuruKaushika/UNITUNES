import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../assets/assets';
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';


const AddMedicalCenter = ({ token }) => {
  const navigate = useNavigate();

  const [doctorImage, setDoctorImage] = useState(false);

  const [centerName, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [availableTime, setAvailableTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) setter(file);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', centerName);
      formData.append('address', address);
      formData.append('contact', contactNumber);
      formData.append('description', description); // Changed from 'services' to 'description'
      formData.append('doctorName', doctorName);
      formData.append('availableTime', availableTime);
      
      doctorImage && formData.append('doctorImage', doctorImage);

      const response = await axios.post(`${backendUrl}/api/medicare/add`, formData, {
        headers: { 
          token,
          // Don't set Content-Type - let axios handle it automatically for FormData
        },
      });

      if (response.data.success) {
        toast.success(response.data.message || 'Medical Center added successfully!');
        // Reset all fields
        setName('');
        setAddress('');
        setContact('');
        setDescription('');
        setDoctorName('');
        setAvailableTime('');
        setDoctorImage(false);
      } else {
        toast.error(response.data.message || 'Failed to add medical center');
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || error.message || 'Something went wrong!';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen'>
      <div className='max-w-4xl mx-auto space-y-6'>

        {/* Header */}
        <div className='bg-white/80 p-6 rounded-xl shadow-xl border border-gray-200'>
          <h1 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
            🏥 Add Medical Center
          </h1>
          <p className='text-sm text-gray-500 mt-1'>Provide accurate information about the medical center and doctor.</p>
        </div>

        {/* Doctor's Image Upload */}
        <div className='bg-white/80 p-6 rounded-xl shadow-md border border-gray-200'>
          <p className='mb-4 font-semibold text-gray-700 flex items-center gap-2'>👨‍⚕️ Upload Doctor's Picture</p>
          <label htmlFor="doctorImage">
            <div className='w-full max-w-xs h-40 bg-gray-100 border border-gray-300 rounded-xl flex items-center justify-center overflow-hidden mx-auto'>
              <img
                src={doctorImage ? URL.createObjectURL(doctorImage) : assets.upload_area}
                className='w-full h-full object-cover'
                alt='Doctor Upload'
              />
            </div>
            <input
              type='file'
              id='doctorImage'
              hidden
              accept='image/*'
              onChange={(e) => handleImageUpload(e, setDoctorImage)}
            />
          </label>
        </div>

        {/* Medical Center Info */}
        <div className='bg-white/80 p-6 rounded-xl shadow-md border border-gray-200 grid gap-4'>
          <InputField label="Medical Center Name" value={centerName} setValue={setName} required />
          <TextArea label="Address" value={address} setValue={setAddress} required />
          <InputField label="Contact Number" value={contactNumber} setValue={setContact} type='tel' required />
        </div>

        {/* Doctor Info */}
        <div className='bg-white/80 p-6 rounded-xl shadow-md border border-gray-200 grid gap-4'>
          <InputField label="Doctor's Name" value={doctorName} setValue={setDoctorName} required />
          <TextArea 
            label="Available Time" 
            value={availableTime} 
            setValue={setAvailableTime}
            placeholder='e.g., 9:00 AM - 5:00 PM, Monday to Friday'
          />
        </div>

        {/* Services Description */}
        <div className='bg-white/80 p-6 rounded-xl shadow-md border border-gray-200'>
          <TextArea
            label="Services Offered"
            value={description}
            setValue={setDescription}
            placeholder='Describe the medical services and specialties offered...'
          />
        </div>

        {/* Buttons */}
        <div className='flex gap-4 justify-center'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='px-6 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 disabled:opacity-50'
          >
            {isSubmitting ? 'Adding...' : 'Add Medical Center'}
          </button>
          <button
            type='button'
            onClick={() => navigate('/medilist')} // Adjust navigation path as needed
            className='px-6 py-3 bg-gray-700 text-white rounded-xl shadow-md hover:bg-gray-800'
          >
            View Medical Centers
          </button>
        </div>
      </div>
    </form>
  );
};

// Reusable Input Component
const InputField = ({ label, value, setValue, type = 'text', required = false }) => (
  <div className='w-full'>
    <label className='block text-sm font-semibold text-gray-700 mb-1'>{label}</label>
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      required={required}
      className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300'
    />
  </div>
);

// Reusable TextArea Component
const TextArea = ({ label, value, setValue, required = false, placeholder = '' }) => (
  <div className='w-full'>
    <label className='block text-sm font-semibold text-gray-700 mb-1'>{label}</label>
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required={required}
      placeholder={placeholder}
      className='w-full px-4 py-2 border border-gray-300 rounded-xl min-h-[100px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300'
    />
  </div>
);

export default AddMedicalCenter;