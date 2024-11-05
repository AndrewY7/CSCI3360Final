import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold text-red-500">Healthai</div>
      <ul className="flex space-x-6">
        <li><Link to="/" className="text-gray-700 hover:text-black">Home</Link></li>
        <li><Link to="/about" className="text-gray-700 hover:text-black">About</Link></li>
        <li><Link to="/health-assistant" className="text-gray-700 hover:text-black">Health Assistant</Link></li>
      </ul>
      <Link to="/profile" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
        My Profile
      </Link>
    </nav>
  );
}

export default Navbar;