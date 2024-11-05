import React, { useState } from 'react';

function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // This is a placeholder function. You can expand this in the future.
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold">Welcome to Your Profile!</h2>
      <p className="mt-4 text-gray-700">This is your profile page. Here you can view and edit your personal information.</p>
    </div>
  );
}

export default Profile;