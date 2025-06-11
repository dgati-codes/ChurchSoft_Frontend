import React, { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-blue-600 text-white shadow-sm fixed w-full">
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        {/* Dashboard Title */}
        <div className="flex items-center space-x-2">
          <img className='w-10' src="/images/logo.png" alt="logo" />
          
          <h1 className="text-xl font-semibold">GCCI</h1>
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-6">
          {/* Notification Bell */}
          <button 
            className="p-1 rounded-full hover:bg-blue-500 transition-colors"
            onClick={() => {/* Add notification logic here */}}
          >
            <img className='w-6' src="/images/notification.svg" alt="notification" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center">
                <img src="/images/profile.jpg" alt="profile" className='w-8 h-8 rounded-full' />
              </div>
              <span className="font-medium">Gerald kpelevi</span>
              <svg 
                // xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-50 border border-gray-200">
                <a 
                  href="#" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Your Profile
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Settings
                </a>
                <a 
                  href="#" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;