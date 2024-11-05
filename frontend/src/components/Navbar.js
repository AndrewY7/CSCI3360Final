import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex justify-center space-x-4">
        <li><Link to="/" className="text-white hover:underline">Home</Link></li>
        <li><Link to="/about" className="text-white hover:underline">About</Link></li>
        <li><Link to="/healthassistant" className="text-white hover:underline">Contact</Link></li>
        <li><Link to="/profile" className="text-white hover:underline">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;