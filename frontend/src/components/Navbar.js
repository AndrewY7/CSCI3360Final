import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex items-center">
      <div className="text-2xl font-bold text-red-500 mr-auto">
        Healthai
      </div>
      
      <div className="flex items-center space-x-6">
        <Link 
          to="/about" 
          className={`${
            location.pathname === '/about' 
              ? 'text-red-500' 
              : 'text-gray-700 hover:text-red-500'
          }`}
        >
          About
        </Link>
        <Link 
          to="/healthassistant" 
          className={`${
            location.pathname === '/healthassistant' 
              ? 'text-red-500' 
              : 'text-gray-700 hover:text-red-500'
          }`}
        >
          Health Assistant
        </Link>
        <Link 
          to="/profile" 
          className={`${
            location.pathname === '/profile'
              ? 'bg-red-600 text-white'
              : 'bg-red-500 text-white hover:bg-red-600'
          } py-2 px-4 rounded transition-colors`}
        >
          My Profile
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;