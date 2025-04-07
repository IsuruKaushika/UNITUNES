import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {Routes,Route} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'

import Boarding from './pages/Boarding'
import BoardingList from './pages/BoardingList'
import Orders from './pages/Orders'
import Login from './components/Login'
import { useState } from 'react'
import { useEffect } from 'react';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency ='Rs'



const App = () => {

  const[token,setToken] =useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className ='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token===""
      ? <Login setToken={setToken}/>
      : <>
      <Navbar setToken={setToken}/>
      <hr />
      <div className ='flex w-full'>
       
        <div className ='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
  
          <Routes>
            <Route path ="/boardings" element={<Boarding token={token}/>} />
            <Route path ="/boardinglist" element={<BoardingList token={token}/>} />
            <Route path ="/orders" element={<Orders token={token}/>} />
  
          </Routes>
        </div>
        </div>
        </>
      }
   
    </div>
   
    
  )
}

export default App