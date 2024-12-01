import React, { useState } from 'react';

function ProfileForm({ onSubmit, onCancel, initialData = null }) {
  const [unitSystem, setUnitSystem] = useState('metric'); // 'metric' or 'imperial'
  const [formData, setFormData] = useState({
    age: initialData?.age || '',
    sex: initialData?.sex || '',
    height: initialData?.height || '',
    heightFt: '',
    heightIn: '',
    weight: initialData?.weight || '',
    weightLbs: '',
    activity: initialData?.activity || '',
    goals: initialData?.goals || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      // Convert imperial to metric if needed
      height: unitSystem === 'imperial' 
        ? Math.round((parseInt(formData.heightFt) * 30.48) + (parseInt(formData.heightIn) * 2.54))
        : parseInt(formData.height),
      weight: unitSystem === 'imperial'
        ? Math.round(parseInt(formData.weightLbs) * 0.453592)
        : parseInt(formData.weight)
    };
    onSubmit(processedData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
      
      {/* Unit System Toggle */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Unit System</label>
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="unitSystem"
              value="metric"
              checked={unitSystem === 'metric'}
              onChange={(e) => setUnitSystem(e.target.value)}
            />
            <span className="ml-2">Metric (cm/kg)</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="unitSystem"
              value="imperial"
              checked={unitSystem === 'imperial'}
              onChange={(e) => setUnitSystem(e.target.value)}
            />
            <span className="ml-2">Imperial (ft-in/lbs)</span>
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age and Sex fields remain the same */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData(prev => ({...prev, age: e.target.value}))}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Enter age"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Sex</label>
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

          {/* Height fields - conditional based on unit system */}
          {unitSystem === 'metric' ? (
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Height (cm)</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData(prev => ({...prev, height: e.target.value}))}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                placeholder="Enter height in cm"
                required
              />
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2">Height (ft)</label>
                <input
                  type="number"
                  value={formData.heightFt}
                  onChange={(e) => setFormData(prev => ({...prev, heightFt: e.target.value}))}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700"
                  placeholder="Feet"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2">Height (in)</label>
                <input
                  type="number"
                  value={formData.heightIn}
                  onChange={(e) => setFormData(prev => ({...prev, heightIn: e.target.value}))}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700"
                  placeholder="Inches"
                  required
                />
              </div>
            </div>
          )}

          {/* Weight fields - conditional based on unit system */}
          {unitSystem === 'metric' ? (
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Weight (kg)</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({...prev, weight: e.target.value}))}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                placeholder="Enter weight in kg"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Weight (lbs)</label>
              <input
                type="number"
                value={formData.weightLbs}
                onChange={(e) => setFormData(prev => ({...prev, weightLbs: e.target.value}))}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                placeholder="Enter weight in pounds"
                required
              />
            </div>
          )}

          {/* Activity Level */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Activity Level</label>
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

          {/* Goals */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Health Goals</label>
            <textarea
              value={formData.goals}
              onChange={(e) => setFormData(prev => ({...prev, goals: e.target.value}))}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              rows={4}
              placeholder="Enter your health goals"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;