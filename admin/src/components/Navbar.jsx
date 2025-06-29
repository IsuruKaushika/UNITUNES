import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = ({ setToken }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const activeTab = location.pathname.replace('/', '');

  const navItems = [
    { path: '/boardings', label: 'Boardings', icon: '🏠' },
    { path: '/medicare', label: 'Medicare', icon: '💊' },
    { path: '/vehicles', label: 'Taxis', icon: '🚕' },
    { path: '/shops', label: 'Shops', icon: '🛒' },
    { path: '/renting', label: 'Renting', icon: '📦' },
    { path: '/skill-sharing', label: 'Skill Sharing', icon: '🎓' },
    { path: '/ad', label: 'Advertisement', icon: '📢' }
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setToken('');
    }
  };

  return (
    <nav className='bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>

          {/* Logo Section */}
          <div className='flex items-center space-x-3'>
            <img className='w-10' src={assets.logo} alt="Logo" />
            <div className='hidden sm:block'>
              <h1 className='text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                UniTunes
              </h1>
              <p className='text-xs text-gray-500'>Admin Panel</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center space-x-1'>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === item.path.replace('/', '')
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className='text-base'>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className='flex items-center space-x-4'>

            {/* Admin Avatar */}
            <div className='hidden sm:flex items-center space-x-3'>
              <div className='text-right'>
                <p className='text-sm font-medium text-gray-900'>Admin</p>
                <p className='text-xs text-gray-500'>System Manager</p>
              </div>
              <div className='w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center'>
                <span className='text-white text-sm font-semibold'>A</span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className='bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'></path>
              </svg>
              <span className='hidden sm:inline'>Logout</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='lg:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors'
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                {isMobileMenuOpen ? (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                ) : (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className='lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-3 ${
                    activeTab === item.path.replace('/', '')
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <span className='text-lg'>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Underline */}
      <div className='h-1 bg-gradient-to-r from-blue-600 to-purple-600'></div>
    </nav>
  );
};

export default Navbar;
