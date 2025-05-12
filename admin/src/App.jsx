import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Login from './components/Login';

import Boarding from './pages/Boarding';
import BoardingList from './pages/BoardingList';
import Orders from './pages/Orders';

import AddVehicle from './pages/AddVehicle';
import VehicleList from './pages/VehicleList';

import Medicare from './pages/Medicare';
import AddPharmacy from './pages/AddPharmacy';
import AddMedicalCenter from './pages/AddMedicalCenter';

import Shop from './pages/Shops'
import ShopList from './pages/ShopList';

import Renting from './pages/Renting';
import RentingList from './pages/RentingList';


import SkillSharingList from './pages/SkillSharingList';
import SkillSharing from './pages/skillSharing';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = 'Rs';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                {/* Boarding */}
                <Route path="/boardings" element={<Boarding token={token} />} />
                <Route path="/boardinglist" element={<BoardingList token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />

                {/* Vehicle */}
                <Route path="/vehicles" element={<AddVehicle token={token} />} />
                <Route path="/vehiclelist" element={<VehicleList token={token} />} />

                {/* Medicare */}
                <Route path="/medicare" element={<Medicare />} />
                <Route path="/add-pharmacy" element={<AddPharmacy token={token} />} />
                <Route path="/add-medical-center" element={<AddMedicalCenter token={token} />} />

                {/* Shops */}
                <Route path="/shops" element={<Shop token={token} />} />
                <Route path="/shoplist" element={<ShopList token={token} />} />

                {/* Renting */}
                <Route path="/renting" element={<Renting token={token} />} />
                <Route path="/rentinglist" element={<RentingList token={token} />} />

                {/* Skill Sharing */}
                <Route path="/skill-sharing" element={<SkillSharing token={token} />} />
                <Route path="/skillsharinglist" element={<SkillSharingList token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
