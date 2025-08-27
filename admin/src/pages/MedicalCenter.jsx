import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AddMedicalCenter = ({ token }) => {
  const navigate = useNavigate();

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [description, setDescription] = useState('');
  const [availableTime, setAvailableTime] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const specialtyOptions = [
    "General Medicine", "Cardiology", "Dermatology", "Orthopedics", 
    "Pediatrics", "Gynecology", "Neurology", "Ophthalmology", 
    "ENT", "Psychiatry", "Oncology", "Emergency Medicine"
  ];

  const handleSpecialtySelect = (specialty) => {
    setSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((item) => item !== specialty)
        : [...prev, specialty]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('address', address);
      formData.append('contact', contact);
      formData.append('doctorName', doctorName);
      formData.append('description', description);
      formData.append('availableTime', availableTime);
      formData.append('specialties', JSON.stringify(specialties));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(`${backendUrl}/api/medicalcenter/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset all fields
        setName('');
        setAddress('');
        setContact('');
        setDoctorName('');
        setDescription('');
        setAvailableTime('');
        setSpecialties([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='p-6 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 min-h-screen'>
      <div className='max-w-4xl mx-auto space-y-6'>

        {/* Header */}
        <div className='bg-white/80 p-6 rounded-xl shadow-xl border border-gray-200'>
          <h1 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
            🏥 Add New Medical Center
          </h1>
          <p className='text-sm text-gray-500 mt-1'>Provide accurate information to help patients find your medical center.</p>
        </div>

        {/* Images Upload */}
        <div className='bg-white/80 p-6 rounded-xl shadow-md border border-gray-200'>
          <p className='mb-4 font-semibold text-gray-700 flex items-center gap-2'>📸 Upload Images</p>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <label htmlFor="image1">
              <div className='w-full h-28 bg-gray-100 border border-gray-300 rounded-xl flex items-center justify-center overflow-hidden'>
                <img
                  src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
                  className='w-full h-full object-cover'
                  alt="Upload 1"
                />
              </div>
              <input
                type='file'
                id="image1"
                hidden
                accept='image/*'
                onChange={(e) => setImage1(e.target.files[0])}
              />
            </label>
            
            <label htmlFor="image2">
              <div className='w-full h-28 bg-gray-100 border border-gray-300 rounded-xl flex items-center justify-center overflow-hidden'>
                <img
                  src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
                  className='w-full h-full object-cover'
                  alt="Upload 2"
                />
              </div>
              <input
                type='file'
                id="image2"
                hidden
                accept='image/*'
                onChange={(e) => setImage2(e.target.files[0])}
              />
            </label>
            
            <label htmlFor="image3">
              <div className='w-full h-28 bg-gray-100 border border-gray-300 rounded-xl flex items-center justify-center overflow-hidden'>
                <img
                  src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
                  className='w-full h-full object-cover'
                  alt="Upload 3"
                />
              </div>
              <input
                type='file'
                id="image3"
                hidden
                accept='image/*'
                onChange={(e) => setImage3(e.target.files[0])}
              />
            </label>
            
            <label htmlFor="image4">
              <div className='w-full h-28 bg-gray-100 border border-gray-300 rounded-xl flex items-center justify-center overflow-hidden'>
                <img
                  src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
                  className='w-full h-full object-cover'
                  alt="Upload 4"
                />
              </div>
              <input
                type='file'
                id="image4"
                hidden
                accept='image/*'
                onChange={(e) => setImage4(e.target.files[0])}
              />
            </label>
          </div>
        </div>

        {/* Basic Info */}
        <div className='bg-white/80 p-6 rounded-xl shadow-md border border-gray-200 grid gap-4'>
          <InputField label="Medical Center Name" value={name} setValue={setName} required />
          <InputField label="Doctor's Name" value={doctorName} setValue={setDoctorName} required />
          <InputField label="Contact Number" value={contact} setValue={setContact} type='tel' required />
          <TextArea label="Address" value={address} setValue={setAddress} required />
        </div>

        {/* Operating Hours */}
        <div className='bg-white/80 p-6 rounded-xl shadow-md border border-gray-200'>
          <InputField 
            label="Available Time" 
            value={availableTime} 
            setValue={setAvailableTime} 
            placeholder="e.g., Mon-Fri: 8:00 AM - 6:00 PM, Sat: 8:00 AM - 2:00 PM"
            required 
          />
        </div>

        {/* Specialties */}
        <div className='bg-white/80 p-6 rounded-xl shadow-md border border-gray-200'>
          <p className='font-semibold mb-2'>Medical Specialties</p>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
            {specialtyOptions.map((specialty) => (
              <button
                key={specialty}
                type='button'
                onClick={() => handleSpecialtySelect(specialty)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  specialties.includes(specialty)
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
          {specialties.length > 0 && (
            <div className='mt-3 p-2 bg-green-50 rounded-lg'>
              <p className='text-sm text-green-700'>
                Selected: {specialties.join(', ')}
              </p>
            </div>
          )}
        </div>

        {/* Description */}
        <div className='bg-white/80 p-6 rounded-xl shadow-md border border-gray-200'>
          <TextArea
            label="Description"
            value={description}
            setValue={setDescription}
            placeholder='Describe the medical center, facilities, equipment, etc.'
            required
          />
        </div>

        {/* Buttons */}
        <div className='flex gap-4 justify-center'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='px-6 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 disabled:opacity-50 transition-colors'
          >
            {isSubmitting ? 'Submitting...' : 'Add Medical Center'}
          </button>
          <button
            type='button'
            onClick={() => navigate('/medicalcenterlist')}
            className='px-6 py-3 bg-gray-700 text-white rounded-xl shadow-md hover:bg-gray-800 transition-colors'
          >
            View Medical Centers
          </button>
        </div>
      </div>
    </form>
  );
};

// Reusable Input
const InputField = ({ label, value, setValue, type = 'text', required = false, placeholder = '' }) => (
  <div className='w-full'>
    <label className='block text-sm font-semibold text-gray-700 mb-1'>{label}</label>
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      required={required}
      placeholder={placeholder}
      className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-300'
    />
  </div>
);

// Reusable TextArea
const TextArea = ({ label, value, setValue, required = false, placeholder = '' }) => (
  <div className='w-full'>
    <label className='block text-sm font-semibold text-gray-700 mb-1'>{label}</label>
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required={required}
      placeholder={placeholder}
      className='w-full px-4 py-2 border border-gray-300 rounded-xl min-h-[100px] focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-300'
    />
  </div>
);

export default AddMedicalCenter;