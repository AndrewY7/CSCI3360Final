import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex items-center">
      {/* Logo on the left */}
      <div className="text-2xl font-bold text-red-500 mr-auto">
        Healthai
      </div>
      
      {/* Navigation items and profile button grouped together */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-700 hover:text-black">
          Home
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-black">
          About
        </Link>
        <Link to="/healthassistant" className="text-gray-700 hover:text-black">
          Health Assistant
        </Link>
        <Link to="/profile" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          My Profile
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;