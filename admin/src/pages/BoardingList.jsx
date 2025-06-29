import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const BoardingList = ({ token }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/boarding/list`)
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeBoarding = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/boarding/remove`, { id }, {
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
      <div className='max-w-6xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8'>

        <h1 className='text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
          🏠 Boarding List
        </h1>

        <div className='hidden md:grid grid-cols-[1fr_2fr_2fr_2fr_1fr] bg-gray-100 text-gray-700 font-semibold text-sm px-4 py-2 rounded-t-xl'>
          <span>Image</span>
          <span>Title</span>
          <span>Owner</span>
          <span>Monthly Price</span>
          <span className='text-center'>Action</span>
        </div>

        <div className='divide-y divide-gray-200'>
          {list.map((item, index) => (
            <div
              key={index}
              className='grid grid-cols-2 md:grid-cols-[1fr_2fr_2fr_2fr_1fr] items-center gap-4 py-3 px-4 text-sm hover:bg-gray-50 transition'
            >
              <img
                className='w-16 h-16 object-cover rounded-lg border'
                src={item.image[0]}
                alt={item.Title}
              />
              <p className='font-medium text-gray-800'>{item.Title}</p>
              <p className='text-gray-700'>{item.owner}</p>
              <p className='text-blue-600 font-semibold'>
                {currency} {item.price}
              </p>
              <button
                onClick={() => removeBoarding(item._id)}
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

export default BoardingList
