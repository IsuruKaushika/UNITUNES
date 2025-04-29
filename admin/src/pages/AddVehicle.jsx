import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom'; // Import useParams

const AddVehicle = ({ token }) => {
  const { vehicleType } = useParams(); // Capture vehicleType from URL
  const [vehicleDetails, setVehicleDetails] = useState({
    image: '',
    contact: '',
    location: '',
    price: '',
    description: ''
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/vehicle/add`, {
        vehicleType,
        ...vehicleDetails
      }, {
        headers: { token }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setVehicleDetails({ image: '', contact: '', location: '', price: '', description: '' });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 p-8">
      <h1 className="text-xl font-bold">{`Add ${vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)} Details`}</h1>
      <input
        type="file"
        onChange={(e) => setVehicleDetails({ ...vehicleDetails, image: e.target.files[0] })}
        className="px-4 py-2 border"
        required
      />
      <input
        type="text"
        value={vehicleDetails.contact}
        onChange={(e) => setVehicleDetails({ ...vehicleDetails, contact: e.target.value })}
        placeholder="Contact Number"
        className="px-4 py-2 border"
        required
      />
      <input
        type="text"
        value={vehicleDetails.location}
        onChange={(e) => setVehicleDetails({ ...vehicleDetails, location: e.target.value })}
        placeholder="Location"
        className="px-4 py-2 border"
        required
      />
      <input
        type="text"
        value={vehicleDetails.price}
        onChange={(e) => setVehicleDetails({ ...vehicleDetails, price: e.target.value })}
        placeholder="Price"
        className="px-4 py-2 border"
        required
      />
      <textarea
        value={vehicleDetails.description}
        onChange={(e) => setVehicleDetails({ ...vehicleDetails, description: e.target.value })}
        placeholder="Description"
        className="px-4 py-2 border"
      />
      <button type="submit" className="mt-4 px-6 py-3 bg-blue-600 text-white rounded">Submit</button>
    </form>
  );
};

export default AddVehicle;
