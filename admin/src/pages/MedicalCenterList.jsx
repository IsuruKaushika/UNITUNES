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
        setList(response.data.data || [])   // ✅ backend sends { data }
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error('Fetch Medical Centers Error:', error)
      toast.error(error.message)
    }
  }

  const removeMedicalCenter = async (id) => {
    if (!window.confirm('Are you sure you want to delete this medical center?')) return
    try {
      const response = await axios.delete(`${backendUrl}/api/medicare/${id}`, {
        headers: { token },
      })
      if (response.data.success) {
        toast.success(response.data.message)
        setList((prev) => prev.filter((center) => center._id !== id)) // ✅ update locally
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error('Remove Medical Center Error:', error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6'>
      <div className='max-w-6xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
          🏥 Medical Centers
        </h1>

        <div className='hidden md:grid grid-cols-[1fr_2fr_2fr_2fr_1fr] bg-gray-100 text-gray-700 font-semibold text-sm px-4 py-2 rounded-t-xl'>
          <span>Image</span>
          <span>Center Name</span>
          <span>Doctor</span>
          <span>Contact</span>
          <span className='text-center'>Action</span>
        </div>

        <div className='divide-y divide-gray-200'>
          {list.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p className="text-lg">No medical centers found</p>
              <p className="text-sm">Add some medical centers to see them here</p>
            </div>
          ) : (
            list.map((item) => (
              <div
                key={item._id}
                className='grid grid-cols-2 md:grid-cols-[1fr_2fr_2fr_2fr_1fr] items-center gap-4 py-3 px-4 text-sm hover:bg-gray-50 transition'
              >
                <img
                  className='w-16 h-16 object-cover rounded-lg border'
                  src={item.image ? `${backendUrl}/${item.image}` : '/placeholder-medical.jpg'}
                  alt={item.centerName || 'Medical Center'}
                  onError={(e) => { e.currentTarget.src = '/placeholder-medical.jpg' }}
                />
                <p className='font-medium text-gray-800'>{item.centerName || 'Unnamed Center'}</p>
                <p className='text-gray-700'>{item.doctorName || 'Unknown Doctor'}</p>
                <p className='text-blue-600 font-semibold'>{item.contactNumber || 'No contact info'}</p>
                <button
                  onClick={() => removeMedicalCenter(item._id)}
                  className='text-red-500 hover:text-red-700 font-bold text-lg text-center transition'
                >
                  ✖
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default MedicalCenterList
