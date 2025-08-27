import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App';

const AddMedicalCenter = ({ token }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
    doctorName: '',
    description: '',
    availableTime: '',
    specialties: '',
    image1: null,
    image2: null,
    image3: null,
    image4: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e, imageField) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [imageField]: file
      }));
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => ({
          ...prev,
          [imageField]: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      contact: '',
      doctorName: '',
      description: '',
      availableTime: '',
      specialties: '',
      image1: null,
      image2: null,
      image3: null,
      image4: null
    });
    setImagePreviews({
      image1: null,
      image2: null,
      image3: null,
      image4: null
    });
    // Reset file inputs
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
      if (input) input.value = '';
    });
  };

  const validateForm = () => {
    const { name, address, contact, doctorName, availableTime } = formData;
    
    if (!name.trim()) {
      toast.error('Medical center name is required');
      return false;
    }
    if (!address.trim()) {
      toast.error('Address is required');
      return false;
    }
    if (!contact.trim()) {
      toast.error('Contact number is required');
      return false;
    }
    if (!doctorName.trim()) {
      toast.error('Doctor name is required');
      return false;
    }
    if (!availableTime.trim()) {
      toast.error('Available time is required');
      return false;
    }
    
    // Validate contact number format (basic validation)
    const contactRegex = /^[0-9+\-\s()]+$/;
    if (!contactRegex.test(contact)) {
      toast.error('Please enter a valid contact number');
      return false;
    }
    
    // Check if at least one image is uploaded
    if (!formData.image1 && !formData.image2 && !formData.image3 && !formData.image4) {
      toast.error('Please upload at least one image');
      return false;
    }
    
    return true;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const submitData = new FormData();
      
      // Add text fields
      submitData.append('name', formData.name);
      submitData.append('address', formData.address);
      submitData.append('contact', formData.contact);
      submitData.append('doctorName', formData.doctorName);
      submitData.append('description', formData.description);
      submitData.append('availableTime', formData.availableTime);
      
      // Handle specialties array
      if (formData.specialties) {
        const specialtiesArray = formData.specialties.split(',').map(s => s.trim()).filter(s => s);
        specialtiesArray.forEach(specialty => {
          submitData.append('specialties', specialty);
        });
      }
      
      // Add images
      ['image1', 'image2', 'image3', 'image4'].forEach(imageField => {
        if (formData[imageField]) {
          submitData.append(imageField, formData[imageField]);
        }
      });

      const response = await axios.post(
        `${backendUrl}/api/medicalcenter/add`, 
        submitData,
        { 
          headers: { 
            token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Medical Center added successfully!');
        resetForm();
      } else {
        toast.error(response.data.message || 'Failed to add medical center');
      }
    } catch (error) {
      console.error('Error adding medical center:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-teal-700 px-8 py-6">
              <h1 className="text-3xl font-bold text-white text-center">
                Add New Medical Center
              </h1>
              <p className="text-green-100 text-center mt-2">
                Fill in the details to register a new medical center
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className="p-8">
              <div className="space-y-6">
                {/* Medical Center Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Medical Center Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter medical center name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter complete address"
                    required
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 resize-vertical"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="Enter contact number (e.g., +94 77 123 4567)"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                  />
                </div>

                {/* Doctor Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Doctor Name *
                  </label>
                  <input
                    type="text"
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleInputChange}
                    placeholder="Enter main doctor's name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                  />
                </div>

                {/* Available Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Available Time *
                  </label>
                  <input
                    type="text"
                    name="availableTime"
                    value={formData.availableTime}
                    onChange={handleInputChange}
                    placeholder="e.g., Mon-Fri: 8:00 AM - 6:00 PM"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                  />
                </div>

                {/* Specialties */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Specialties
                  </label>
                  <input
                    type="text"
                    name="specialties"
                    value={formData.specialties}
                    onChange={handleInputChange}
                    placeholder="Enter specialties separated by commas (e.g., Cardiology, Neurology, Pediatrics)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description about the medical center"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 resize-vertical"
                  />
                </div>

                {/* Image Uploads */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Medical Center Images *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {['image1', 'image2', 'image3', 'image4'].map((imageField, index) => (
                      <div key={imageField} className="space-y-3">
                        <label className="block text-xs text-gray-600 font-medium">
                          Image {index + 1} {index === 0 ? '(Required)' : '(Optional)'}
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, imageField)}
                          required={index === 0}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition duration-200"
                        />
                        {imagePreviews[imageField] && (
                          <div className="mt-3">
                            <img
                              src={imagePreviews[imageField]}
                              alt={`Medical center preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border border-gray-300"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="pt-6 space-y-4">
                  {/* Add Medical Center Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition duration-300 ${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-teal-700 hover:from-green-700 hover:to-teal-800 transform hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding Medical Center...
                      </div>
                    ) : (
                      'Add Medical Center'
                    )}
                  </button>

                  {/* View Medical Centers List Button */}
                  <button
                    type="button"
                    onClick={() => window.location.href = '/medicalcenterlist'}
                    className="w-full py-4 px-6 rounded-lg font-semibold text-green-700 bg-green-50 border-2 border-green-200 hover:bg-green-100 hover:border-green-300 transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    View Medical Centers List
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMedicalCenter;