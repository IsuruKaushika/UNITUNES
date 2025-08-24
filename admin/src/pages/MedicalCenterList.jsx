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
        setList(response.data.data || [])
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeMedicalCenter = async (id) => {
    if (!window.confirm('Are you sure you want to delete this medical center?')) return
    try {
      const response = await axios.post(
        `${backendUrl}/api/medicare/remove`,
        { id },
        {
          headers: { token },
        }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          🏥 Medical Centers List
        </h1>

        {/* Header row */}
        <div className="hidden md:grid grid-cols-[1fr_2fr_2fr_1.5fr_1.5fr_1fr] bg-gray-100 text-gray-700 font-semibold text-sm px-4 py-2 rounded-t-xl">
          <span>Image</span>
          <span>Center Name</span>
          <span>Doctor</span>
          <span>Contact</span>
          <span>Available Time</span>
          <span className="text-center">Action</span>
        </div>

        <div className="divide-y divide-gray-200">
          {list.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p className="text-lg">No medical centers found</p>
              <p className="text-sm">Add some medical centers to see them here</p>
            </div>
          ) : (
            list.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-2 md:grid-cols-[1fr_2fr_2fr_1.5fr_1.5fr_1fr] items-center gap-4 py-3 px-4 text-sm hover:bg-gray-50 transition"
              >
                {/* Image with backend URL + fallback */}
                <img
                  className="w-16 h-16 object-cover rounded-lg border shadow-sm"
                  src={
                    item.image
                      ? `${backendUrl}/${item.image}`
                      : '/placeholder-medical.jpg'
                  }
                  alt={item.centerName || 'Medical Center'}
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-medical.jpg'
                  }}
                />

                {/* Center Name */}
                <div>
                  <p className="font-medium text-gray-800">{item.centerName || 'Unnamed Center'}</p>
                  <p className="text-xs text-gray-600 line-clamp-2">{item.address || 'No address provided'}</p>
                </div>

                {/* Doctor */}
                <div>
                  <p className="font-medium text-blue-600">{item.doctorName || 'Unknown Doctor'}</p>
                  {item.description && (
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                  )}
                </div>

                {/* Contact */}
                <p className="text-gray-700">{item.contactNumber || 'No contact info'}</p>

                {/* Available Time */}
                <p className="text-green-600 text-xs font-medium">
                  {item.availableTime || 'Not specified'}
                </p>

                {/* Action */}
                <button
                  onClick={() => removeMedicalCenter(item._id)}
                  className="text-red-500 hover:text-red-700 font-bold text-lg text-center transition"
                  title="Delete Medical Center"
                >
                  ✖
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        {list.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            Showing {list.length} medical center{list.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  )
}

export default MedicalCenterList
