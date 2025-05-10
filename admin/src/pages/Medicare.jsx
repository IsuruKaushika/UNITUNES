import React from 'react'
import { useNavigate } from 'react-router-dom'

const Medicare = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      {/* Blur Background Overlay */}
      <div className="backdrop-blur-md bg-white/30 p-10 rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-8 w-[90%] max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Choose a Medicare Option</h1>

        <div className="flex flex-col gap-4 w-full">
          <button 
            onClick={() => navigate('/add-pharmacy')}
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 w-full"
          >
            Add Pharmacy
          </button>

          <button 
            onClick={() => navigate('/add-medical-center')}
            className="px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition duration-300 w-full"
          >
            Add Medical Center
          </button>
        </div>
      </div>
    </div>
  )
}

export default Medicare
