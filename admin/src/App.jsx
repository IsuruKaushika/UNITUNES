import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Boarding from './pages/Boarding';
import BoardingList from './pages/BoardingList';
import Orders from './pages/Orders';
import Login from './components/Login';
import Taxis from './pages/Taxis';
import AddVehicle from './pages/AddVehicle';
import Medicare from './pages/Medicare';
import AddPharmacy from './pages/AddPharmacy'; // ✅ Add this line
import AddMedicalCenter from './pages/AddMedicalCenter';
import Shops from './pages/Shops';
import AddShop from './pages/AddShop';
import Renting from './pages/Renting';
import AddRentItem from './pages/AddRentItem';
import SkillSharing from './pages/SkillSharing';
import SkillSharingForm from './pages/SkillSharingForm';
import AddSkillItem from './pages/AddSkillItem';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = 'Rs';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/boardings" element={<Boarding token={token} />} />
                <Route path="/boardinglist" element={<BoardingList token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/taxis" element={<Taxis />} />
                <Route path="/add-vehicle/:vehicleType" element={<AddVehicle token={token} />} />
                <Route path="/medicare" element={<Medicare />} />
                <Route path="/add-pharmacy" element={<AddPharmacy token={token} />} /> 
                <Route path="/add-medical-center" element={<AddMedicalCenter token={token} />} />
                <Route path="/shops" element={<Shops />} />
                <Route path="/add-shop/:shopType" element={<AddShop token={token} />} />
                <Route path="/renting" element={<Renting />} />
                <Route path="/add-rent/:rentType" element={<AddRentItem token={token} />} />
                
                <Route path="/skill-sharing" element={<SkillSharing />} />
                <Route path="/add-skill/:skillType" element={<AddSkillItem token={token} />} /></Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
