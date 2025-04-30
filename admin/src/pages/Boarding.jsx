import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const backendUrl = 'http://localhost:4000'; // Adjust this if needed

const Boarding = ({ token }) => {
  const navigate = useNavigate()

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [Title, setTitle] = useState('')
  const [owner, setOwner] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [description, setDescription] = useState('')
  const [Rooms, setRooms] = useState('1')
  const [bathRooms, setBathRooms] = useState('1')
  const [price, setPrice] = useState('')
  const [gender, setGender] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append('Title', Title)
      formData.append('description', description)
      formData.append('Rooms', Rooms)
      formData.append('bathRooms', bathRooms)
      formData.append('price', price)
      formData.append('gender', JSON.stringify(gender))
      formData.append('contact', contact)
      formData.append('address', address)
      formData.append('owner', owner)

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      const response = await axios.post(`${backendUrl}/api/boarding/add`, formData, {
        headers: { token },
      })

      if (response.data.success) {
        toast.success(response.data.message)
        setTitle('')
        setOwner('')
        setAddress('')
        setContact('')
        setDescription('')
        setBathRooms('1')
        setRooms('1')
        setPrice('')
        setGender([])
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div className='w-full'>
        <p>Title</p>
        <input onChange={(e) => setTitle(e.target.value)} value={Title} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Type Here' required />
      </div>

      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          {[image1, image2, image3, image4].map((img, idx) => (
            <label key={idx} htmlFor={`image${idx + 1}`}>
              <img className='w-20' src={!img ? assets.upload_area : URL.createObjectURL(img)} alt='' />
              <input
                type='file'
                id={`image${idx + 1}`}
                hidden
                onChange={(e) => {
                  const setter = [setImage1, setImage2, setImage3, setImage4][idx]
                  setter(e.target.files[0])
                }}
              />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p>Owner's Name</p>
        <input onChange={(e) => setOwner(e.target.value)} value={owner} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Type Here' required />
      </div>

      <div className='w-full'>
        <p>Address</p>
        <textarea onChange={(e) => setAddress(e.target.value)} value={address} className='w-full max-w-[500px] px-3 py-2' placeholder='Write Address Here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Rooms</p>
          <select onChange={(e) => setRooms(e.target.value)} value={Rooms} className='w-full max-w-[500px] px-3 py-2' required>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Bathrooms</p>
          <select onChange={(e) => setBathRooms(e.target.value)} value={bathRooms} className='w-full max-w-[500px] px-3 py-2' required>
            {[1, 2, 3].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Boarding Fee Per Student</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full max-w-[180px] px-2 py-2' type='number' placeholder='0' required />
        </div>
      </div>

      <div>
        <p className='mb-2'>For</p>
        <div className='flex gap-3'>
          {["Female", "Male", "Male or Female"].map((label) => (
            <div key={label} onClick={() =>
              setGender((prev) =>
                prev.includes(label)
                  ? prev.filter((item) => item !== label)
                  : [...prev, label]
              )
            }>
              <p className={`${gender.includes(label) ? 'bg-blue-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p>More Details</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' placeholder='Write Content Here' required />
      </div>

      <div className='w-full'>
        <p>Contact Number</p>
        <input onChange={(e) => setContact(e.target.value)} value={contact} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Enter contact number' required />
      </div>

      <div className='flex gap-4 mt-4'>
        <button type='submit' className='w-28 py-3 bg-black text-white'>ADD</button>
        <button
          type='button'
          className='w-28 py-3 bg-gray-800 text-white'
          onClick={() => navigate('/boardinglist')}
        >
          Boarding List
        </button>
      </div>
    </form>
    </div>
  )
}

export default Boarding
