import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-10' src={assets.logo} alt="" />

      {/* Tabs */}
      <div className='flex gap-4 text-sm sm:text-base'>
        <Link to="/boardings" className='hover:text-blue-600'>Boardings</Link>
        <Link to="/medicare" className='hover:text-blue-600'>Medicare</Link>
        <Link to="/taxis" className='hover:text-blue-600'>Taxis</Link>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => setToken('')}
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
