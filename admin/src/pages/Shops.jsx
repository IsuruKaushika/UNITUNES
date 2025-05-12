import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const backendUrl = 'http://localhost:4000';

const Shop = ({ token }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [Category, setCategory] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('Category', Category);
      formData.append('name', name);
      formData.append('contact', contact);
      formData.append('address', address); // Corrected typo
      formData.append('description', description);
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post(`${backendUrl}/api/shop/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setCategory('');
        setContact('');
        setAddress('');
        setDescription('');
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div className="w-full">
        <p>Name of The Shop</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Enter Shop Name"
          required
        />
      </div>

      <div className="w-full">
        <p>Shop Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={Category}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select a shop category</option>
          <option value="Bakery">Bakery</option>
          <option value="Grocery">Grocery</option>
          <option value="Meals">Meals</option>
          <option value="Bookshop">Bookshop</option>
          <option value="Communication">Communication</option>
        </select>
      </div>

      <div>
        <p className="mb-2">Upload Image</p>
        <label htmlFor="image">
          <img
            className="w-20"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="Upload"
          />
          <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
        </label>
      </div>

      <div className="w-full">
        <p>Contact Number</p>
        <input
          onChange={(e) => setContact(e.target.value)}
          value={contact}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Enter contact number"
          required
        />
      </div>

      <div className="w-full">
        <p>Location</p>
        <input
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="City or address"
          required
        />
      </div>

      <div className="w-full">
        <p>More Details</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write Content Here"
          required
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button type="submit" className="w-28 py-3 bg-black text-white">ADD</button>
        <button
          type="button"
          className="w-28 py-3 bg-gray-800 text-white"
          onClick={() => navigate('/shoplist')}
        >
          Shop List
        </button>
      </div>
    </form>
  );
};

export default Shop;
