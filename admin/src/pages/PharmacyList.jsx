import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const PharmacyList = ({ token }) => {
  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchList = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${backendUrl}/api/pharmacy/list`)
      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message || 'Failed to fetch pharmacy list')
    } finally {
      setIsLoading(false)
    }
  }

  const removePharmacy = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pharmacy?')) {
      return
    }

    try {
      const response = await axios.post(`${backendUrl}/api/pharmacy/remove`, { id }, {
        headers: { token }
      })
      if (response.data.success) {
        toast.success(response.data.message)
        fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message || 'Failed to delete pharmacy')
    }
  }

  const formatTime = (time) => {
    if (!time) return 'Not specified'
    try {
      const [hours, minutes] = time.split(':')
      const hour12 = hours % 12 || 12
      const ampm = hours >= 12 ? 'PM' : 'AM'
      return `${hour12}:${minutes} ${ampm}`
    } catch {
      return time
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading pharmacies...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6'>
      <div className='max-w-7xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8'>
        
        {/* Header */}
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-2'>
            💊 Pharmacy List
          </h1>
          <button
            onClick={() => window.location.href = '/add-pharmacy'}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center gap-2'
          >
            <span>➕</span>
            Add New Pharmacy
          </button>
        </div>

        {/* Header for larger screens */}
        <div className='hidden md:grid grid-cols-[1fr_2fr_2fr_1.5fr_1fr_1fr] bg-gradient-to-r from-blue-100 to-indigo-100 text-gray-700 font-semibold text-sm px-4 py-3 rounded-t-xl'>
          <span>Image</span>
          <span>Pharmacy Name</span>
          <span>Address</span>
          <span>Contact</span>
          <span>Hours</span>
          <span className='text-center'>Action</span>
        </div>

        <div className='divide-y divide-gray-200 bg-white rounded-b-xl md:rounded-t-none rounded-t-xl'>
          {list.length === 0 ? (
            <div className='text-center py-12 text-gray-500'>
              <div className='text-6xl mb-4'>💊</div>
              <p className='text-lg font-medium mb-2'>No pharmacies found</p>
              <p className='text-sm'>Add some pharmacies to see them here</p>
              <button
                onClick={() => window.location.href = '/add-pharmacy'}
                className='mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200'
              >
                Add First Pharmacy
              </button>
            </div>
          ) : (
            list.map((item, index) => (
              <div
                key={item._id || index}
                className='grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr_1.5fr_1fr_1fr] items-center gap-4 py-4 px-4 text-sm hover:bg-blue-50/50 transition duration-200'
              >
                {/* Image */}
                <div className='flex justify-center md:justify-start'>
                  <div className='relative'>
                    <img
                      className='w-16 h-16 object-cover rounded-lg border shadow-sm'
                      src={item.image || '/placeholder-pharmacy.jpg'}
                      alt={item.pharmacyName}
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iIzMzNzNkYyIvPgo8cGF0aCBkPSJNMzIgMTZWNDhNMTYgMzJINDgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=';
                      }}
                    />
                    <div className='absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                      💊
                    </div>
                  </div>
                </div>

                {/* Pharmacy Name */}
                <div className='md:col-span-1'>
                  <p className='font-semibold text-gray-800 mb-1 text-base'>{item.pharmacyName}</p>
                  {item.description && (
                    <p className='text-xs text-gray-500 line-clamp-2 mt-1'>{item.description}</p>
                  )}
                </div>

                {/* Address */}
                <div className='md:col-span-1'>
                  <p className='text-gray-700 text-sm line-clamp-2'>{item.address}</p>
                </div>

                {/* Contact */}
                <div className='md:col-span-1'>
                  <p className='text-gray-700 font-medium'>{item.contactNumber}</p>
                </div>

                {/* Operating Hours */}
                <div className='md:col-span-1'>
                  <div className='text-xs'>
                    <p className='text-green-600 font-medium'>
                      {formatTime(item.openTime)}
                    </p>
                    <p className='text-red-500 font-medium'>
                      {formatTime(item.closeTime)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className='flex justify-center md:col-span-1 gap-2'>
                  <button
                    onClick={() => removePharmacy(item._id)}
                    className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-medium transition duration-200 flex items-center gap-1 shadow-sm'
                    title='Delete Pharmacy'
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
          <div className='mt-6 flex justify-between items-center text-sm text-gray-500'>
            <span>
              Showing {list.length} pharmac{list.length !== 1 ? 'ies' : 'y'}
            </span>
            <button
              onClick={fetchList}
              className='text-blue-600 hover:text-blue-800 font-medium transition duration-200'
              title='Refresh list'
            >
              🔄 Refresh
            </button>
          </div>
        )}

        {/* Quick Stats */}
        {list.length > 0 && (
          <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='bg-blue-50 p-4 rounded-lg text-center'>
              <p className='text-2xl font-bold text-blue-600'>{list.length}</p>
              <p className='text-sm text-blue-800'>Total Pharmacies</p>
            </div>
            <div className='bg-green-50 p-4 rounded-lg text-center'>
              <p className='text-2xl font-bold text-green-600'>
                {list.filter(item => item.openTime && item.closeTime).length}
              </p>
              <p className='text-sm text-green-800'>With Operating Hours</p>
            </div>
            <div className='bg-purple-50 p-4 rounded-lg text-center'>
              <p className='text-2xl font-bold text-purple-600'>
                {list.filter(item => item.image).length}
              </p>
              <p className='text-sm text-purple-800'>With Images</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PharmacyList