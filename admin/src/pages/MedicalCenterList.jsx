import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const MedicalCenterList = ({ token }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/medicare/list`)
      if (response.data.success) {
        setList(response.data.centers) // adjust based on backend response
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeMedicalCenter = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/medicare/remove`,
        { id },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success(response.data.message)
        fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (e) {
      console.log(e)
      toast.error(e.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6'>
      <div className='max-w-6xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8'>
        
        <h1 className='text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
          🏥 Medical Centers
        </h1>

        {/* Table Header */}
        <div className='hidden md:grid grid-cols-[1fr_2fr_2fr_2fr_1fr] bg-gray-100 text-gray-700 font-semibold text-sm px-4 py-2 rounded-t-xl'>
          <span>Image</span>
          <span>Center Name</span>
          <span>Doctor</span>
          <span>Contact</span>
          <span className='text-center'>Action</span>
        </div>

        {/* List */}
        <div className='divide-y divide-gray-200'>
          {list.map((item, index) => (
            <div
              key={index}
              className='grid grid-cols-2 md:grid-cols-[1fr_2fr_2fr_2fr_1fr] items-center gap-4 py-3 px-4 text-sm hover:bg-gray-50 transition'
            >
              <img
                className='w-16 h-16 object-cover rounded-lg border'
                src={item.image[0]} // if multiple images, show first
                alt={item.name}
              />
              <p className='font-medium text-gray-800'>{item.name}</p>
              <p className='text-gray-700'>{item.doctorName}</p>
              <p className='text-green-600 font-semibold'>{item.contact}</p>
              <button
                onClick={() => removeMedicalCenter(item._id)}
                className='text-red-500 hover:text-red-700 font-bold text-lg text-center transition'
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MedicalCenterList
