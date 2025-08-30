import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const StudentBoarding = ({ token }) => {
  const [activeTab, setActiveTab] = useState('add'); // 'add' or 'manage'
  
  // Add boarding state
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [rooms, setRooms] = useState('1');
  const [bathRooms, setBathRooms] = useState('1');
  const [price, setPrice] = useState('');
  const [gender, setGender] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manage boardings state
  const [myBoardings, setMyBoardings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenderSelect = (label) => {
    setGender((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  // Fetch student's own boardings
  const fetchMyBoardings = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/boarding/my-boardings-student`, {
        headers: { token }
      });
      
      if (response.data.success) {
        setMyBoardings(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch your boardings');
    } finally {
      setIsLoading(false);
    }
  };

  // Load student's boardings when switching to manage tab
  useEffect(() => {
    if (activeTab === 'manage') {
      fetchMyBoardings();
    }
  }, [activeTab, token]);

  // Add boarding handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('Title', title);
      formData.append('owner', owner);
      formData.append('address', address);
      formData.append('contact', contact);
      formData.append('description', description);
      formData.append('Rooms', rooms);
      formData.append('bathRooms', bathRooms);
      formData.append('price', price);
      formData.append('gender', JSON.stringify(gender));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(`${backendUrl}/api/boarding/add-student`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        
        // Reset form
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
        
        // Refresh my boardings if on manage tab
        if (activeTab === 'manage') {
          fetchMyBoardings();
        }
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

  // Delete boarding handler
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this boarding?')) return;

    try {
      const response = await axios.post(`${backendUrl}/api/boarding/remove-student`, 
        { id }, 
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchMyBoardings(); // Refresh the list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete boarding');
    }
  };

  const handleImageUpload = (imageFile, setImage) => {
    if (imageFile && imageFile.type.startsWith('image/')) {
      setImage(imageFile);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="bg-white/80 p-6 rounded-xl shadow-xl border border-gray-200 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            🎓 Student Boarding Portal
          </h1>
          <p className="text-gray-600 mt-2">Manage your boarding listings and find accommodation</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 p-2 rounded-xl shadow-md border border-gray-200 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('add')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                activeTab === 'add' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              ➕ Add New Boarding
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                activeTab === 'manage' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📋 My Boardings ({myBoardings.length})
            </button>
          </div>
        </div>

        {/* Add Boarding Form */}
        {activeTab === 'add' && (
          <div className="space-y-6">
            
            {/* Images Upload */}
            <div className="bg-white/80 p-6 rounded-xl shadow-md border border-gray-200">
              <p className="mb-4 font-semibold text-gray-700 flex items-center gap-2">📸 Upload Images</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label htmlFor="image1">
                  <div className="w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-200 transition-colors">
                    <img
                      src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
                      className="w-full h-full object-cover"
                      alt="Upload 1"
                    />
                  </div>
                  <input
                    type="file"
                    id="image1"
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage1(e.target.files[0])}
                  />
                </label>
                
                <label htmlFor="image2">
                  <div className="w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-200 transition-colors">
                    <img
                      src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
                      className="w-full h-full object-cover"
                      alt="Upload 2"
                    />
                  </div>
                  <input
                    type="file"
                    id="image2"
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage2(e.target.files[0])}
                  />
                </label>
                
                <label htmlFor="image3">
                  <div className="w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-200 transition-colors">
                    <img
                      src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
                      className="w-full h-full object-cover"
                      alt="Upload 3"
                    />
                  </div>
                  <input
                    type="file"
                    id="image3"
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage3(e.target.files[0])}
                  />
                </label>
                
                <label htmlFor="image4">
                  <div className="w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-200 transition-colors">
                    <img
                      src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
                      className="w-full h-full object-cover"
                      alt="Upload 4"
                    />
                  </div>
                  <input
                    type="file"
                    id="image4"
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage4(e.target.files[0])}
                  />
                </label>
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-white/80 p-6 rounded-xl shadow-md border border-gray-200 grid gap-4">
            <InputField label="Boarding Title" value={title} setValue={setTitle} required />
            <InputField label="Owner's Name" value={owner} setValue={setOwner} required />
            <InputField label="Contact Number" value={contact} setValue={setContact} type="tel" required />
            <TextArea label="Address" value={address} setValue={setAddress} required />
            </div>

            {/* Details */}
            <div className="bg-white/80 p-6 rounded-xl shadow-md border border-gray-200 grid gap-4 md:grid-cols-3">
            <SelectField label="Rooms" value={rooms} setValue={setRooms} options={['1', '2', '3', '4', '5']} />
            <SelectField label="Bathrooms" value={bathRooms} setValue={setBathRooms} options={['1', '2', '3']} />
            <InputField label="Monthly Fee (LKR)" value={price} setValue={setPrice} type="number" required />
            </div>

            {/* Gender */}
            <div className="bg-white/80 p-6 rounded-xl shadow-md border border-gray-200">
              <p className="font-semibold mb-3 text-gray-700">Suitable For</p>
              <div className="flex flex-wrap gap-3">
                {["Female", "Male", "Male or Female"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handleGenderSelect(label)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      gender.includes(label)
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/80 p-6 rounded-xl shadow-md border border-gray-200">
            <TextArea
              label="Description & Amenities"
              value={description}
              setValue={setDescription}
              placeholder="Describe the boarding facilities, rules, nearby amenities, etc."
              required
            />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={onSubmitHandler}
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                {isSubmitting ? 'Adding Boarding...' : 'Add Boarding'}
              </button>
            </div>
          </div>
        )}

        {/* My Boardings Management */}
        {activeTab === 'manage' && (
          <div className="bg-white/80 p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">My Boardings</h2>
              <button
                onClick={fetchMyBoardings}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                🔄 Refresh
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Loading your boardings...</p>
              </div>
            ) : myBoardings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Boardings Yet</h3>
                <p className="text-gray-500 mb-4">You haven't added any boarding listings.</p>
                <button
                  onClick={() => setActiveTab('add')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Your First Boarding
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {myBoardings.map((boarding) => (
                  <div key={boarding._id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                    <div className="h-48 bg-gray-200 overflow-hidden">
                      {boarding.image && boarding.image[0] ? (
                        <img
                          src={boarding.image[0]}
                          alt={boarding.Title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <div className="text-center">
                            <div className="text-4xl mb-2">📷</div>
                            <div className="text-sm">No Image</div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2 truncate">
                        {boarding.Title}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600 mb-4">
                        <p>👤 {boarding.owner}</p>
                        <p>💰 LKR {boarding.price}/month</p>
                        <p>🏠 {boarding.Rooms} rooms, {boarding.bathRooms} baths</p>
                        <p className="truncate">📍 {boarding.address?.substring(0, 50)}{boarding.address?.length > 50 ? '...' : ''}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(boarding._id)}
                          className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                        >
                          🗑️ Delete
                        </button>
                        <button
                          className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                          onClick={() => {
                            // You can implement edit functionality here
                            toast.success('Edit functionality coming soon!');
                          }}
                        >
                          ✏️ Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Components
const InputField = ({ label, value, setValue, type = 'text', required = false }) => (
  <div className="w-full">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      required={required}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
    />
  </div>
);

const TextArea = ({ label, value, setValue, required = false, placeholder = '' }) => (
  <div className="w-full">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl min-h-[100px] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors resize-vertical"
    />
  </div>
);

const SelectField = ({ label, value, setValue, options }) => (
  <div className="w-full">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
    >
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default StudentBoarding;