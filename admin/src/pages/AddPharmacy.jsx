import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const backendUrl = 'http://localhost:4000';
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // <-- replace with your key

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};
const defaultCenter = {
  lat: 6.9271, // Colombo latitude
  lng: 79.8612, // Colombo longitude
};

const AddPharmacy = ({ token }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
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
      formData.append('description', description);
      formData.append('openTime', openTime);
      formData.append('closeTime', closeTime);
      formData.append('image', image);
      if (location) {
        formData.append('latitude', location.lat);
        formData.append('longitude', location.lng);
      }

      const response = await axios.post(`${backendUrl}/api/pharmacy/add`, formData, {
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
        setDescription('');
        setOpenTime('');
        setCloseTime('');
        setImage(null);
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <form onSubmit={onSubmitHandler} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg flex flex-col gap-4 items-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Add Pharmacy</h1>

        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Pharmacy Name" required className="w-full px-4 py-2 border rounded" />
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required className="w-full px-4 py-2 border rounded" />
        <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact Number" required className="w-full px-4 py-2 border rounded" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full px-4 py-2 border rounded" />

        <div className="flex w-full gap-4">
          <input type="time" value={openTime} onChange={(e) => setOpenTime(e.target.value)} required className="flex-1 px-4 py-2 border rounded" />
          <input type="time" value={closeTime} onChange={(e) => setCloseTime(e.target.value)} required className="flex-1 px-4 py-2 border rounded" />
        </div>

        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full px-4 py-2 border rounded bg-gray-100" />

        <div className="w-full">
          <button type="button" onClick={() => setShowLocationModal(true)} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded">
            {location ? `📍 ${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}` : '📍 Select Location on Map'}
          </button>
        </div>

        <button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded">
          Add Pharmacy
        </button>
      </form>

      {/* Google Map Modal */}
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

export default AddPharmacy;
