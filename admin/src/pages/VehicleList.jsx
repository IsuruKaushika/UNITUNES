// src/pages/ShopList.jsx
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const ShopList = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/shop/list`);
      if (response.data.success) {
        setList(response.data.shops);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeShop = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/shop/remove`, { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">Shop List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_2fr_2fr_2fr_2fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Shop Name</b>
          <b>Owner</b>
          <b>Location</b>
          <b>Contact</b>
          <b className="text-center">Action</b>
        </div>

        {list.map((shop, index) => (
          <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm" key={index}>
            <p>{shop.shopName}</p>
            <p>{shop.ownerName}</p>
            <p>{shop.location}</p>
            <p>{shop.contact}</p>
            <p onClick={() => removeShop(shop._id)} className="text-right md:text-center cursor-pointer text-lg">X</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShopList;
