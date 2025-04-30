import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const backendUrl = 'http://localhost:4000';
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // 🔁 Replace this with your actual API key

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};
const defaultCenter = {
  lat: 6.9271, // Colombo as default
  lng: 79.8612,
};

const AddMedicalCenter = ({ token }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [services, setServices] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [availableTime, setAvailableTime] = useState('');
  const [doctorImage, setDoctorImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const handleMapClick = useCallback((event) => {
    setLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('address', address);
      formData.append('contact', contact);
      formData.append('services', services);
      formData.append('doctorName', doctorName);
      formData.append('availableTime', availableTime);
      if (doctorImage) {
        formData.append('doctorImage', doctorImage);
      }
      if (location) {
        formData.append('latitude', location.lat);
        formData.append('longitude', location.lng);
      }

      const response = await axios.post(`${backendUrl}/api/medical-center/add`, formData, {
        headers: {
          token,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setAddress('');
        setContact('');
        setServices('');
        setDoctorName('');
        setAvailableTime('');
        setDoctorImage(null);
        setLocation(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 backdrop-blur-md bg-white/30 p-10 rounded-2xl shadow-2xl w-[90%] max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Medical Center</h1>

        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Medical Center Name" required className="px-4 py-2 border rounded" />
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required className="px-4 py-2 border rounded" />
        <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact Number" required className="px-4 py-2 border rounded" />
        <textarea value={services} onChange={(e) => setServices(e.target.value)} placeholder="Services Offered" className="px-4 py-2 border rounded" />
        <input type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} placeholder="Doctor's Name" required className="px-4 py-2 border rounded" />
        <input type="text" value={availableTime} onChange={(e) => setAvailableTime(e.target.value)} placeholder="Available Time (e.g., 9:00 AM - 5:00 PM)" required className="px-4 py-2 border rounded" />

        {/* Doctor's Image */}
        <div>
          <p className="mb-2 font-medium text-gray-700">Add Doctor's Picture</p>
          <input type="file" accept="image/*" onChange={(e) => setDoctorImage(e.target.files[0])} className="px-4 py-2 border rounded bg-white" />
        </div>

        {/* Location Picker */}
        <div className="w-full">
          <button type="button" onClick={() => setShowLocationModal(true)} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded">
            {location ? `📍 ${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}` : '📍 Select Location on Map'}
          </button>
        </div>

        <button type="submit" className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition duration-300">
          Add Medical Center
        </button>
      </form>

      {/* Google Maps Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-[95%] max-w-3xl relative">
            <h2 className="text-lg font-bold mb-2">Pick Location</h2>
            <div className="border rounded-lg overflow-hidden">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={location || defaultCenter}
                  zoom={10}
                  onClick={handleMapClick}
                >
                  {location && <Marker position={location} />}
                </GoogleMap>
              ) : (
                <p>Loading map...</p>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => setShowLocationModal(false)}>Cancel</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowLocationModal(false)}>Set Location</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMedicalCenter;
