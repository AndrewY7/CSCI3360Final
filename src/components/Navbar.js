import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-red-500 to-red-600 shadow-lg py-4 px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and brand name */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center text-3xl font-extrabold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <span>Health</span>
            <span className="text-pink-200">ai</span>
            <svg 
              className="w-6 h-6 ml-2 text-pink-200 animate-pulse" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <Link 
            to="/about" 
            className={`${
              location.pathname === '/about' 
                ? 'text-white font-semibold border-b-2 border-white' 
                : 'text-pink-100 hover:text-white hover:border-b-2 hover:border-pink-200'
            } transition-all duration-200 py-1`}
          >
            About
          </Link>
          <Link 
            to="/healthassistant" 
            className={`${
              location.pathname === '/healthassistant' 
                ? 'text-white font-semibold border-b-2 border-white' 
                : 'text-pink-100 hover:text-white hover:border-b-2 hover:border-pink-200'
            } transition-all duration-200 py-1`}
          >
            Health Assistant
          </Link>
          <Link 
            to="/profile" 
            className={`${
              location.pathname === '/profile'
                ? 'bg-white text-red-500'
                : 'bg-pink-100 text-red-500 hover:bg-white'
            } py-2 px-6 rounded-full font-semibold transition-all duration-200 shadow-md hover:shadow-lg`}
          >
            My Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;