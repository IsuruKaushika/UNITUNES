import React from 'react'
import { useNavigate } from 'react-router-dom'

const Medicare = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-10 w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            🏥 Choose Medicare Option
          </h1>
          <p className="text-gray-600 mt-1 text-sm">Add services available for students</p>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => navigate('/add-pharmacy')}
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            Add Pharmacy
          </button>

          <button 
            onClick={() => navigate('/add-medical-center')}
            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition-all duration-200"
          >
            Add Medical Center
          </button>
        </div>
      </div>
    </div>
  )
}

export default Medicare
