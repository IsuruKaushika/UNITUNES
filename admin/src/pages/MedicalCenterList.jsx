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
        setList(response.data.data) // Changed from 'products' to 'data'
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
      const response = await axios.post(`${backendUrl}/api/medicare/remove`, { id }, {
        headers: { token }
      })
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
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6'>
      <div className='max-w-7xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8'>

        <h1 className='text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
          🏥 Medical Centers List
        </h1>

        {/* Header for larger screens */}
        <div className='hidden md:grid grid-cols-[1fr_2fr_2fr_1.5fr_1.5fr_1fr] bg-gray-100 text-gray-700 font-semibold text-sm px-4 py-3 rounded-t-xl'>
          <span>Image</span>
          <span>Center Name</span>
          <span>Doctor</span>
          <span>Contact</span>
          <span>Available Time</span>
          <span className='text-center'>Action</span>
        </div>

        <div className='divide-y divide-gray-200'>
          {list.length === 0 ? (
            <div className='text-center py-12 text-gray-500'>
              <p className='text-lg'>No medical centers found</p>
              <p className='text-sm'>Add some medical centers to see them here</p>
            </div>
          ) : (
            list.map((item, index) => (
              <div
                key={index}
                className='grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr_1.5fr_1.5fr_1fr] items-center gap-4 py-4 px-4 text-sm hover:bg-gray-50 transition'
              >
                {/* Image */}
                <div className='flex justify-center md:justify-start'>
                  <img
                    className='w-16 h-16 object-cover rounded-lg border shadow-sm'
                    src={item.image || '/placeholder-medical.jpg'} // Fallback image
                    alt={item.centerName}
                    onError={(e) => {
                      e.target.src = '/placeholder-medical.jpg'; // Fallback if image fails
                    }}
                  />
                </div>

                {/* Center Name */}
                <div className='md:col-span-1'>
                  <p className='font-semibold text-gray-800 mb-1'>{item.centerName}</p>
                  <p className='text-xs text-gray-600 line-clamp-2'>{item.address}</p>
                </div>

                {/* Doctor */}
                <div className='md:col-span-1'>
                  <p className='font-medium text-blue-600'>{item.doctorName}</p>
                  {item.description && (
                    <p className='text-xs text-gray-500 line-clamp-2 mt-1'>{item.description}</p>
                  )}
                </div>

                {/* Contact */}
                <div className='md:col-span-1'>
                  <p className='text-gray-700 font-medium'>{item.contactNumber}</p>
                </div>

                {/* Available Time */}
                <div className='md:col-span-1'>
                  <p className='text-green-600 text-xs font-medium'>
                    {item.availableTime || 'Not specified'}
                  </p>
                </div>

                {/* Action */}
                <div className='flex justify-center md:col-span-1'>
                  <button
                    onClick={() => removeMedicalCenter(item._id)}
                    className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-medium transition duration-200 flex items-center gap-1'
                    title='Delete Medical Center'
                  >
                    <span>🗑️</span>
                    Delete
                  </button>
                </div>

                {/* Mobile divider */}
                <div className='md:hidden col-span-1 border-b border-gray-200 mt-2'></div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        {list.length > 0 && (
          <div className='mt-6 text-center text-sm text-gray-500'>
            Showing {list.length} medical center{list.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  )
}

export default MedicalCenterList