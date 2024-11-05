import React, { useState } from 'react';

function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // This is a placeholder function
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center mt-10">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form className="w-1/2 max-w-xs">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter password"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">My Profile</h1>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">My Goals</h2>
          <p className="text-gray-600">Details about personal goals.</p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Workout Plan</h2>
          <p className="text-gray-600">Details about the workout plan.</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Diet Plan</h2>
          <p className="text-gray-600">Details about the diet plan.</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Google Calendar API</h2>
          <p className="text-gray-600">Integration with Google Calendar.</p>
        </div>
      </div>

    </div>
  );
}

export default Profile;