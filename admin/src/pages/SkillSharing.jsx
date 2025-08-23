import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';


const backendUrl = "http://localhost:4000";

const SkillSharing = ({ token }) => {
  const navigate = useNavigate();
  
  // Form state
  const [skillType, setSkillType] = useState('');
  const [studentName, setStudentName] = useState('');
  const [contact, setContact] = useState('');
  const [moreDetails, setMoreDetails] = useState('');
  const [experience, setExperience] = useState('Beginner');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(0);
  
  // Image state - supporting up to 4 images
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null
  });

  // Skill categories from backend enum
  const skillCategories = [
    'Programming', 'Design', 'Music', 'Sports', 
    'Cooking', 'Language', 'Academic', 'Art', 
    'Photography', 'Other'
  ];

  // Experience levels from backend enum
  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const handleImageChange = (imageKey, file) => {
    setImages(prev => ({
      ...prev,
      [imageKey]: file
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('skillType', skillType);
      formData.append('studentName', studentName);
      formData.append('contact', contact);
      formData.append('moreDetails', moreDetails);
      formData.append('experience', experience);
      formData.append('location', location);
      formData.append('price', price);

      // Append images
      Object.entries(images).forEach(([key, file]) => {
        if (file) {
          formData.append(key, file);
        }
      });

      const response = await axios.post(`${backendUrl}/api/skillshare/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setSkillType('');
        setStudentName('');
        setContact('');
        setMoreDetails('');
        setExperience('Beginner');
        setLocation('');
        setPrice(0);
        setImages({
          image1: null,
          image2: null,
          image3: null,
          image4: null
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form className="flex flex-col w-full items-start gap-4" onSubmit={onSubmitHandler}>
      
      {/* Skill Type Dropdown */}
      <div>
        <p className="mb-2">Skill Category</p>
        <select
          onChange={(e) => setSkillType(e.target.value)}
          value={skillType}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select Skill Category</option>
          {skillCategories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Student Name */}
      <div>
        <p className="mb-2">Student Name</p>
        <input
          onChange={(e) => setStudentName(e.target.value)}
          value={studentName}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded"
          type="text"
          placeholder="Enter your name"
          required
        />
      </div>

      {/* Contact */}
      <div>
        <p className="mb-2">Contact Information</p>
        <input
          onChange={(e) => setContact(e.target.value)}
          value={contact}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded"
          type="text"
          placeholder="Enter contact number or email"
          required
        />
      </div>

      {/* Experience Level */}
      <div>
        <p className="mb-2">Experience Level</p>
        <select
          onChange={(e) => setExperience(e.target.value)}
          value={experience}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded"
          required
        >
          {experienceLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div>
        <p className="mb-2">Location</p>
        <input
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded"
          type="text"
          placeholder="Enter your location (optional)"
        />
      </div>

      {/* Price */}
      <div>
        <p className="mb-2">Price (LKR)</p>
        <div className="relative w-full max-w-[500px]">
          <input
            onChange={(e) => {
              const value = e.target.value === '' ? 0 : Number(e.target.value);
              setPrice(value);
            }}
            value={price === 0 ? '' : price}
            className="w-full px-3 py-2 border border-gray-300 rounded pr-16"
            type="number"
            min="0"
            step="0.01"
            placeholder="0 for free"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            LKR
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {price === 0 ? '✅ Free service' : `💰 Paid service - LKR ${price.toLocaleString()}`}
        </p>
      </div>

      {/* More Details */}
      <div>
        <p className="mb-2">More Details</p>
        <textarea
          onChange={(e) => setMoreDetails(e.target.value)}
          value={moreDetails}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded h-24 resize-none"
          placeholder="Describe your service or skill in detail"
          required
        />
      </div>

      {/* Multiple Image Upload */}
      <div>
        <p className="mb-2">Upload Images (Max 4)</p>
        <div className="grid grid-cols-2 gap-4 max-w-[500px]">
          {Object.entries(images).map(([key, image], index) => (
            <div key={key} className="flex flex-col items-center">
              <label htmlFor={key} className="cursor-pointer">
                <img 
                  className="w-20 h-20 object-cover border border-gray-300 rounded"
                  src={!image ? assets.upload_area : URL.createObjectURL(image)} 
                  alt={`Upload ${index + 1}`} 
                />
                <input 
                  type="file" 
                  id={key} 
                  hidden 
                  accept="image/*"
                  onChange={(e) => handleImageChange(key, e.target.files[0])} 
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">Image {index + 1}</p>
              {image && (
                <button
                  type="button"
                  onClick={() => handleImageChange(key, null)}
                  className="text-xs text-red-500 mt-1 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-4">
        <button 
          type="submit" 
          className="w-28 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          ADD SKILL
        </button>
        <button 
          type="button" 
          className="w-28 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors" 
          onClick={() => navigate('/skillsharinglist')}
        >
          Skill List
        </button>
      </div>
    </form>
  );
};

export default SkillSharing;