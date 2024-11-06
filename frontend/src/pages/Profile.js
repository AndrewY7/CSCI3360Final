import React, { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      if (user) {
        setIsLoggedIn(true);
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          } else {
            // Create a basic profile for new Google Sign-In users
            const basicProfile = {
              profile: {
                email: user.email,
                name: user.displayName,
                photoURL: user.photoURL
              }
            };
            await setDoc(doc(db, 'users', user.uid), basicProfile);
            setUserProfile(basicProfile);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center mt-10">
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
            
            {/* Google Sign-In Button */}
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
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">My Profile</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

            {userProfile?.profile && (
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
                <div className="text-center">
                    <div className="text-sm text-blue-600">BMR</div>
                    <div className="font-bold text-lg">
                    {Math.round(
                        userProfile.profile.sex === 'male'
                        ? 10 * userProfile.profile.weight + 6.25 * userProfile.profile.height - 5 * userProfile.profile.age + 5
                        : 10 * userProfile.profile.weight + 6.25 * userProfile.profile.height - 5 * userProfile.profile.age - 161
                    )} 
                    kcal
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-sm text-blue-600">Maintenance</div>
                    <div className="font-bold text-lg">
                    {Math.round(
                        (userProfile.profile.sex === 'male'
                        ? 10 * userProfile.profile.weight + 6.25 * userProfile.profile.height - 5 * userProfile.profile.age + 5
                        : 10 * userProfile.profile.weight + 6.25 * userProfile.profile.height - 5 * userProfile.profile.age - 161) *
                        (userProfile.profile.activity === 'sedentary' ? 1.2 :
                        userProfile.profile.activity === 'light' ? 1.375 :
                        userProfile.profile.activity === 'moderate' ? 1.55 :
                        userProfile.profile.activity === 'heavy' ? 1.725 :
                        userProfile.profile.activity === 'athlete' ? 1.9 : 1.2)
                    )} 
                    kcal
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-sm text-blue-600">Weight Loss Target (-500 kcal)</div>
                    <div className="font-bold text-lg">
                    {Math.round(
                        (userProfile.profile.sex === 'male'
                        ? 10 * userProfile.profile.weight + 6.25 * userProfile.profile.height - 5 * userProfile.profile.age + 5
                        : 10 * userProfile.profile.weight + 6.25 * userProfile.profile.height - 5 * userProfile.profile.age - 161) *
                        (userProfile.profile.activity === 'sedentary' ? 1.2 :
                        userProfile.profile.activity === 'light' ? 1.375 :
                        userProfile.profile.activity === 'moderate' ? 1.55 :
                        userProfile.profile.activity === 'heavy' ? 1.725 :
                        userProfile.profile.activity === 'athlete' ? 1.9 : 1.2) - 500
                    )} 
                    kcal
                    </div>
                </div>
                </div>
            </div>
            )}
        </div>
        )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">My Goals</h2>
          <p className="text-gray-600">
            {userProfile?.profile?.goals || 'No goals set yet.'}
          </p>
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