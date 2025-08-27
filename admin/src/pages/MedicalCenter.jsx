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
    image4: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e, imageField) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [imageField]: file,
      }));

      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreviews((prev) => ({
          ...prev,
          [imageField]: ev.target.result,
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
      image4: null,
    });
    setImagePreviews({
      image1: null,
      image2: null,
      image3: null,
      image4: null,
    });
    document.querySelectorAll('input[type="file"]').forEach((input) => {
      input.value = '';
    });
  };

  const validateForm = () => {
    const { name, address, contact, doctorName, availableTime } = formData;
    if (!name.trim()) return toast.error('Medical center name is required');
    if (!address.trim()) return toast.error('Address is required');
    if (!contact.trim()) return toast.error('Contact number is required');
    if (!doctorName.trim()) return toast.error('Doctor name is required');
    if (!availableTime.trim()) return toast.error('Available time is required');

    const contactRegex = /^[0-9+\-\s()]+$/;
    if (!contactRegex.test(contact)) {
      toast.error('Please enter a valid contact number');
      return false;
    }
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

      // text fields
      submitData.append('name', formData.name);
      submitData.append('address', formData.address);
      submitData.append('contact', formData.contact);
      submitData.append('doctorName', formData.doctorName);
      submitData.append('description', formData.description);
      submitData.append('availableTime', formData.availableTime);

      // specialties as JSON string
      if (formData.specialties) {
        const specialtiesArray = formData.specialties
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s);
        submitData.append('specialties', JSON.stringify(specialtiesArray));
      }

      // images
      ['image1', 'image2', 'image3', 'image4'].forEach((imageField) => {
        if (formData[imageField]) {
          submitData.append(imageField, formData[imageField]);
        }
      });

      // add required date field
      submitData.append('date', Date.now());

      const response = await axios.post(
        `${backendUrl}/api/medicare/add`,
        submitData,
        {
          headers: {
            token, // or Authorization: `Bearer ${token}`
            'Content-Type': 'multipart/form-data',
          },
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
      toast.error(error.response?.data?.message || error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-teal-700 px-8 py-6">
              <h1 className="text-3xl font-bold text-white text-center">Add New Medical Center</h1>
              <p className="text-green-100 text-center mt-2">Fill in the details to register a new medical center</p>
            </div>

            <form onSubmit={onSubmitHandler} className="p-8 space-y-6">
              {/* name, address, contact, doctorName, availableTime, specialties, description */}
              {/* ... keep your existing input fields unchanged ... */}

              {/* images */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">Medical Center Images *</label>
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

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition duration-300 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-teal-700 hover:from-green-700 hover:to-teal-800 transform hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {isLoading ? 'Adding Medical Center...' : 'Add Medical Center'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMedicalCenter;
