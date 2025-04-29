import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const backendUrl = 'http://localhost:4000';

const AddRentItem = ({ token }) => {
  const { rentType } = useParams();
  const [itemName, setItemName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [itemImage, setItemImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('rentType', rentType);
      formData.append('itemName', itemName);
      formData.append('ownerName', ownerName);
      formData.append('contact', contact);
      formData.append('description', description);
      formData.append('price', price);
      if (itemImage) {
        formData.append('itemImage', itemImage);
      }

      const response = await axios.post(`${backendUrl}/api/rent/add`, formData, {
        headers: {
          token,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setItemName('');
        setOwnerName('');
        setContact('');
        setDescription('');
        setPrice('');
        setItemImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Add {rentType.charAt(0).toUpperCase() + rentType.slice(1)} Item</h2>

        <input value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Item Name" required className="input" />
        <input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="Owner's Name" required className="input" />
        <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact Number" required className="input" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required className="input" />

        <div>
          <label className="text-gray-600 block mb-1">Price (LKR) per one day</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="input" />
        </div>

        <div className="my-3">
          <label className="text-gray-600 block mb-1">Upload Item Image</label>
          <input type="file" accept="image/*" onChange={(e) => setItemImage(e.target.files[0])} className="w-full" />
        </div>

        <button type="submit" className="bg-green-600 text-white py-2 rounded mt-4 hover:bg-green-700 w-full">Add Rent Item</button>
      </form>
    </div>
  );
};

export default AddRentItem;
