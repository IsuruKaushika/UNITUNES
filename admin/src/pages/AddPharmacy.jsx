import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const backendUrl = 'http://localhost:4000';

const AddPharmacy = ({ token }) => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [description, setDescription] = useState('')
  const [openTime, setOpenTime] = useState('')
  const [closeTime, setCloseTime] = useState('')
  const [image, setImage] = useState(null)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('address', address)
      formData.append('contact', contact)
      formData.append('description', description)
      formData.append('openTime', openTime)
      formData.append('closeTime', closeTime)
      formData.append('image', image)

      const response = await axios.post(`${backendUrl}/api/pharmacy/add`, 
        formData,
        { headers: { 
            token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setAddress('')
        setContact('')
        setDescription('')
        setOpenTime('')
        setCloseTime('')
        setImage(null)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <form onSubmit={onSubmitHandler} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg flex flex-col gap-4 items-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Add Pharmacy</h1>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Pharmacy Name"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Contact Number"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex w-full gap-4">
          <input
            type="time"
            value={openTime}
            onChange={(e) => setOpenTime(e.target.value)}
            required
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="time"
            value={closeTime}
            onChange={(e) => setCloseTime(e.target.value)}
            required
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full px-4 py-2 border rounded bg-gray-100"
        />

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition duration-300"
        >
          Add Pharmacy
        </button>
      </form>
    </div>
  )
}

export default AddPharmacy
