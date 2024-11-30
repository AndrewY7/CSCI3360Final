import React, { useState } from 'react';

function ProfileForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    height: '',
    weight: '',
    activity: '',
    goals: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md font-[Nunito]">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Let's Get Started!</h2>
      <p className="text-gray-600 mb-6">
        To provide you with personalized health advice, please fill out the following information:
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Age
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData(prev => ({...prev, age: e.target.value}))}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Enter your age"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sex
            </label>
            <select
              value={formData.sex}
              onChange={(e) => setFormData(prev => ({...prev, sex: e.target.value}))}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              required
            >
              <option value="">Select sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => setFormData(prev => ({...prev, height: e.target.value}))}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Enter height in cm"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData(prev => ({...prev, weight: e.target.value}))}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Enter weight in kg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Activity Level
            </label>
            <select
              value={formData.activity}
              onChange={(e) => setFormData(prev => ({...prev, activity: e.target.value}))}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              required
            >
              <option value="">Select activity level</option>
              <option value="sedentary">Sedentary</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="heavy">Heavy</option>
              <option value="athlete">Athlete</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Health Goals
            </label>
            <textarea
              value={formData.goals}
              onChange={(e) => setFormData(prev => ({...prev, goals: e.target.value}))}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              rows={4}
              placeholder="Describe your health and fitness goals"
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Skip for Now
            </button>
          )}
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition-colors"
          >
            Start Chat
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;