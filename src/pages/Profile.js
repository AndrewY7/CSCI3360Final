import React, { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup 
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState({
    age: '',
    sex: '',
    height: '',
    weight: '',
    activity: '',
    goals: ''
  });
  const [selectedMetrics, setSelectedMetrics] = useState({
    weight: true,
    bmi: true
  });
  const [timeRange, setTimeRange] = useState('all');

  useEffect(() => {
    console.log('Current Firebase Config:', {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    });
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      if (user) {
        setIsLoggedIn(true);
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
            // Initialize editable profile with existing data
            if (userDoc.data().profile) {
              setEditableProfile({
                age: userDoc.data().profile.age || '',
                sex: userDoc.data().profile.sex || '',
                height: userDoc.data().profile.height || '',
                weight: userDoc.data().profile.weight || '',
                activity: userDoc.data().profile.activity || '',
                goals: userDoc.data().profile.goals || ''
              });
            }
          } else {
            // Create a basic profile for new Google Sign-In users
            const basicProfile = {
              profile: {
                email: user.email,
                name: user.displayName,
                photoURL: user.photoURL,
                createdAt: serverTimestamp()
              }
            };
            await setDoc(doc(db, 'users', user.uid), basicProfile);
            setUserProfile(basicProfile);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setError('Error loading profile data');
        }
      } else {
        setIsLoggedIn(false);
        setUserProfile(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const currentDoc = await getDoc(userDocRef);
      const currentData = currentDoc.exists() ? currentDoc.data() : {};
  
      // Calculate BMI
      const newBMI = (editableProfile.weight / Math.pow(editableProfile.height / 100, 2)).toFixed(1);
      
      // Create new history entry with timestamp
      const historyEntry = {
        weight: parseFloat(editableProfile.weight),
        bmi: parseFloat(newBMI),
        date: new Date().toISOString(),
      };
  
      // Get existing history or create new array
      const existingHistory = currentData.metricsHistory || [];
      
      const updatedProfile = {
        ...currentData,
        profile: {
          ...currentData.profile,
          ...editableProfile,
          updatedAt: serverTimestamp()
        },
        // Add new entry to metrics history
        metricsHistory: [...existingHistory, historyEntry].sort((a, b) => 
          new Date(a.date) - new Date(b.date)
        )
      };
  
      await setDoc(userDocRef, updatedProfile);
      setUserProfile(updatedProfile);
      setIsEditing(false);
      setError('');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    }
  };

  const calculateBMR = (profile) => {
    if (!profile?.sex || !profile?.weight || !profile?.height || !profile?.age) return null;
    
    // Mifflin-St Jeor Formula
    const weight = parseFloat(profile.weight);
    const height = parseFloat(profile.height);
    const age = parseFloat(profile.age);
    
    if (isNaN(weight) || isNaN(height) || isNaN(age)) return null;

    return profile.sex.toLowerCase() === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
  };

  const getFilteredData = (history) => {
    if (!history) return [];
    
    const now = new Date();
    const filtered = history.filter(entry => {
      const entryDate = new Date(entry.date);
      switch (timeRange) {
        case 'week':
          return now - entryDate <= 7 * 24 * 60 * 60 * 1000;
        case 'month':
          return now - entryDate <= 30 * 24 * 60 * 60 * 1000;
        case 'year':
          return now - entryDate <= 365 * 24 * 60 * 60 * 1000;
        default:
          return true;
      }
    });
    
    return filtered;
  };

  const getActivityMultiplier = (activity) => {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      heavy: 1.725,
      athlete: 1.9
    };
    return multipliers[activity.toLowerCase()] || 1.2;
  };

  const formatChartData = (history) => {
    if (!history) return [];
    
    return history.map(entry => ({
      ...entry,
      date: new Date(entry.date).toLocaleDateString(),
      weight: parseFloat(entry.weight),
      bmi: parseFloat(entry.bmi)
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center mt-10 font-[Nunito]">
        <h2 className="text-2xl font-bold mb-4">
          {isRegistering ? 'Register' : 'Login'}
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <form className="w-1/2 max-w-xs" onSubmit={isRegistering ? handleRegister : handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full"
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>
            
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="text-center text-gray-500 text-sm my-2">OR</div>
            
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-red-500 hover:text-red-600 text-sm"
            >
              {isRegistering 
                ? 'Already have an account? Login' 
                : "Don't have an account? Register"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 font-[Nunito]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">My Profile</h1>
        <div className="flex gap-4">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleProfileUpdate} className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
              <input
                type="number"
                value={editableProfile.age}
                onChange={(e) => setEditableProfile(prev => ({...prev, age: e.target.value}))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                placeholder="Enter age"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Sex</label>
              <select
                value={editableProfile.sex}
                onChange={(e) => setEditableProfile(prev => ({...prev, sex: e.target.value}))}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
              >
                <option value="">Select sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Height (cm)</label>
              <input
                type="number"
                value={editableProfile.height}
                onChange={(e) => setEditableProfile(prev => ({...prev, height: e.target.value}))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                placeholder="Enter height in cm"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Weight (kg)</label>
              <input
                type="number"
                value={editableProfile.weight}
                onChange={(e) => setEditableProfile(prev => ({...prev, weight: e.target.value}))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                placeholder="Enter weight in kg"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Activity Level</label>
              <select
                value={editableProfile.activity}
                onChange={(e) => setEditableProfile(prev => ({...prev, activity: e.target.value}))}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
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
              <label className="block text-gray-700 text-sm font-bold mb-2">Health Goals</label>
              <textarea
                value={editableProfile.goals}
                onChange={(e) => setEditableProfile(prev => ({...prev, goals: e.target.value}))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                placeholder="Enter your health goals"
                rows={4}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancel
              </button>
          </div>
        </form>
      ) : userProfile?.profile ? (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Profile Information</h2>
            <span className="text-sm text-gray-500">
              {userProfile.profile.updatedAt ? 
                `Last updated: ${new Date(userProfile.profile.updatedAt).toLocaleDateString()}` 
                : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-3">Basic Information</h3>
              <div className="space-y-2">
                {userProfile.profile.name && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{userProfile.profile.name}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{userProfile.profile.email}</span>
                </div>
                {userProfile.profile.age && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span className="font-medium">{userProfile.profile.age}</span>
                  </div>
                )}
                {userProfile.profile.sex && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sex:</span>
                    <span className="font-medium">{userProfile.profile.sex}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Physical Metrics */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-3">Physical Metrics</h3>
              <div className="space-y-2">
                {userProfile.profile.height && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Height:</span>
                    <span className="font-medium">{userProfile.profile.height} cm</span>
                  </div>
                )}
                {userProfile.profile.weight && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium">{userProfile.profile.weight} kg</span>
                  </div>
                )}
                {userProfile.profile.height && userProfile.profile.weight && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">BMI:</span>
                    <span className="font-medium">
                      {(userProfile.profile.weight / Math.pow(userProfile.profile.height / 100, 2)).toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Fitness Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-3">Fitness Information</h3>
              <div className="space-y-2">
                {userProfile.profile.activity && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Activity Level:</span>
                    <span className="font-medium">{userProfile.profile.activity}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Health Goals Section */}
          {userProfile.profile.goals && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-3">Health Goals</h3>
              <p className="text-gray-700">{userProfile.profile.goals}</p>
            </div>
          )}

          {/* Calculated Metrics */}
          {userProfile.profile.weight && userProfile.profile.height && userProfile.profile.age && userProfile.profile.sex && (
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-3">Daily Caloric Needs</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-blue-600">Basal Metabolic Rate (BMR)</div>
                  <div className="font-bold text-lg">
                    {Math.round(calculateBMR(userProfile.profile))} kcal
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Calories burned at complete rest</div>
                </div>

                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-blue-600">Maintenance Calories</div>
                  <div className="font-bold text-lg">
                    {Math.round(calculateBMR(userProfile.profile) * 
                      getActivityMultiplier(userProfile.profile.activity))} kcal
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Daily calories to maintain weight</div>
                </div>

                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-sm text-blue-600">Weight Loss Target</div>
                  <div className="font-bold text-lg">
                    {Math.round(calculateBMR(userProfile.profile) * 
                      getActivityMultiplier(userProfile.profile.activity) - 500)} kcal
                  </div>
                  <div className="text-xs text-gray-500 mt-1">500 calorie deficit for weight loss</div>
                </div>
              </div>
            </div>
          )}

          {/* Progress Chart */}
          {userProfile?.metricsHistory && userProfile.metricsHistory.length > 0 ? (
            <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-blue-800">Progress Tracking</h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Show:</label>
                    <div className="flex gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedMetrics.weight}
                          onChange={() => setSelectedMetrics(prev => ({...prev, weight: !prev.weight}))}
                          className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-sm">Weight</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedMetrics.bmi}
                          onChange={() => setSelectedMetrics(prev => ({...prev, bmi: !prev.bmi}))}
                          className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-sm">BMI</span>
                      </label>
                    </div>
                  </div>
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="year">Last Year</option>
                    <option value="all">All Time</option>
                  </select>
                </div>
              </div>
              
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={formatChartData(getFilteredData(userProfile.metricsHistory))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      type="category"
                      allowDuplicatedCategory={false}
                    />
                    <YAxis 
                      yAxisId="weight" 
                      orientation="left" 
                      stroke="#2563eb"
                      domain={['auto', 'auto']}
                      label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }}
                    />
                    <YAxis 
                      yAxisId="bmi" 
                      orientation="right" 
                      stroke="#dc2626"
                      domain={[15, 35]}
                      label={{ value: 'BMI', angle: 90, position: 'insideRight' }}
                    />
                    <Tooltip
                      labelFormatter={(value) => `Date: ${value}`}
                      formatter={(value, name) => [value.toFixed(1), name]}
                    />
                    <Legend verticalAlign="top" height={36}/>
                    {selectedMetrics.weight && (
                      <Line
                        yAxisId="weight"
                        type="monotone"
                        dataKey="weight"
                        stroke="#2563eb"
                        name="Weight (kg)"
                        dot={true}
                        connectNulls
                      />
                    )}
                    {selectedMetrics.bmi && (
                      <Line
                        yAxisId="bmi"
                        type="monotone"
                        dataKey="bmi"
                        stroke="#dc2626"
                        name="BMI"
                        dot={true}
                        connectNulls
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* BMI Scale Reference */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">BMI Reference Scale:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="text-xs">
                    <span className="font-medium">Underweight:</span> &lt; 18.5
                  </div>
                  <div className="text-xs">
                    <span className="font-medium">Normal:</span> 18.5 - 24.9
                  </div>
                  <div className="text-xs">
                    <span className="font-medium">Overweight:</span> 25 - 29.9
                  </div>
                  <div className="text-xs">
                    <span className="font-medium">Obese:</span> ≥ 30
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                No progress data available yet. Update your profile to start tracking your progress.
              </p>
            </div>
          )}
          
        </div>
      ) : (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Your profile is not complete. Click 'Edit Profile' to add your information.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;