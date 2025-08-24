import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../assets/assets';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const Boarding = ({ token }) => {
  const navigate = useNavigate();

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [Title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [Rooms, setRooms] = useState('1');
  const [bathRooms, setBathRooms] = useState('1');
  const [price, setPrice] = useState('');
  const [gender, setGender] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenderSelect = (label) => {
    setGender((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) setter(file);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('Title', Title);
      formData.append('owner', owner);
      formData.append('address', address);
      formData.append('contact', contact);
      formData.append('description', description);
      formData.append('Rooms', Rooms);
      formData.append('bathRooms', bathRooms);
      formData.append('price', price);
      formData.append('gender', JSON.stringify(gender));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(`${backendUrl}/api/boarding/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // reset all - Fixed the setTitle call
        setTitle('');
        setOwner('');
        setAddress('');
        setContact('');
        setDescription('');
        setBathRooms('1');
        setRooms('1');
        setPrice('');
        setGender([]);
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
    <form onSubmit={onSubmitHandler} className='p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen'>
      <div className='max-w-4xl mx-auto space-y-6'>

        {/* Header */}
        <div className='bg-white/80 p-6 rounded-xl shadow-xl border border-gray-200'>
          <h1 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
            🏠 Add New Boarding
          </h1>
          <p className='text-sm text-gray-500 mt-1'>Provide accurate information to help students find your listing.</p>
        </div>

        {/* Images Upload */}
        <div className='bg-white/80 p-6 rounded-xl shadow-md border border-gray-200'>
          <p className='mb-4 font-semibold text-gray-700 flex items-center gap-2'>📸 Upload Images</p>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {[image1, image2, image3, image4].map((img, idx) => (
              <label key={idx} htmlFor={`image${idx + 1}`}>
                <div className='w-full h-28 bg-gray-100 border border-gray-300 rounded-xl flex items-center justify-center overflow-hidden'>
                  <img
                    src={img ? URL.createObjectURL(img) : assets.upload_area}
                    className='w-full h-full object-cover'
                    alt={`Upload ${idx + 1}`}
                  />
                </div>
                <input
                  type='file'
                  id={`image${idx + 1}`}
                  hidden
                  accept='image/*'
                  onChange={(e) => handleImageUpload(e, [setImage1, setImage2, setImage3, setImage4][idx])}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Basic Info */}
        <div className='bg-white/80 p-6 rounded-xl shadow-md border border-gray-200 grid gap-4'>
          <InputField label="Boarding Title" value={Title} setValue={setTitle} required />
          <InputField label="Owner's Name" value={owner} setValue={setOwner} required />
          <InputField label="Contact Number" value={contact} setValue={setContact} type='tel' required />
          <TextArea label="Address" value={address} setValue={setAddress} required />
        </div>

        {/* Details */}
        <div className='bg-white/80 p-6 rounded-xl shadow-md border border-gray-200 grid gap-4 md:grid-cols-3'>
          <Dropdown label="Rooms" value={Rooms} setValue={setRooms} options={[1, 2, 3, 4, 5]} />
          <Dropdown label="Bathrooms" value={bathRooms} setValue={setBathRooms} options={[1, 2, 3]} />
          <InputField label="Monthly Fee (LKR)" value={price} setValue={setPrice} type='number' required />
        </div>

        {/* Gender */}
        <div className='bg-white/80 p-6 rounded-xl shadow-md border border-gray-200'>
          <p className='font-semibold mb-2'>Suitable For</p>
          <div className='flex flex-wrap gap-3'>
            {["Female", "Male", "Male or Female"].map((label) => (
              <button
                key={label}
                type='button'
                onClick={() => handleGenderSelect(label)}
                className={`px-4 py-2 rounded-xl text-sm font-medium ${
                  gender.includes(label)
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className='bg-white/80 p-6 rounded-xl shadow-md border border-gray-200'>
          <TextArea
            label="More Details"
            value={description}
            setValue={setDescription}
            placeholder='Write about amenities, rules, etc.'
            required
          />
        </div>

        {/* Buttons */}
        <div className='flex gap-4 justify-center'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 disabled:opacity-50'
          >
            {isSubmitting ? 'Submitting...' : 'Add Boarding'}
          </button>
          <button
            type='button'
            onClick={() => navigate('/boardinglist')}
            className='px-6 py-3 bg-gray-700 text-white rounded-xl shadow-md hover:bg-gray-800'
          >
            View Boarding List
          </button>
        </div>
      </div>
    </form>
  );
};

// Reusable Input
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

// Reusable TextArea
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

// Reusable Dropdown
const Dropdown = ({ label, value, setValue, options }) => (
  <div className='w-full'>
    <label className='block text-sm font-semibold text-gray-700 mb-1'>{label}</label>
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300'
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default Boarding;