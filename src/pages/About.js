import React from 'react';

function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">About Healthai Assistant</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
        <p className="text-gray-700 mb-4">
          To make the most of your Healthai experience, please log in or create an account. 
          This allows us to save your profile information and track your progress over time.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
          <p className="text-blue-700">
            💡 Tip: Use Google Sign-In for a quick and seamless login experience!
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Key Features</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-red-600 mb-2">Personalized Caloric Calculations</h3>
            <p className="text-gray-700">
              Using the scientifically-backed Mifflin-St Jeor Formula, we provide accurate 
              daily caloric needs based on your profile and activity level. This helps create 
              realistic and achievable nutrition goals.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-red-600 mb-2">Custom Exercise Plans</h3>
            <p className="text-gray-700">
              Receive tailored workout recommendations based on your:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 text-gray-700">
              <li>Fitness goals</li>
              <li>Available equipment</li>
              <li>Time constraints</li>
              <li>Current fitness level</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-red-600 mb-2">Health & Wellness Guidance</h3>
            <p className="text-gray-700">
              Get evidence-based answers to your health-related questions, including nutrition 
              advice, exercise techniques, and general wellness tips.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-red-600 mb-2">Mental Health Support</h3>
            <p className="text-gray-700">
              Access supportive guidance for mental well-being, stress management, and 
              maintaining a healthy work-life balance. Note: While we provide general support, 
              please consult healthcare professionals for specific mental health concerns.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">How to Use</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li className="ml-4">Sign in or create an account to get started</li>
          <li className="ml-4">Complete your profile with accurate information</li>
          <li className="ml-4">Share your health and fitness goals with the assistant</li>
          <li className="ml-4">Receive personalized recommendations and guidance</li>
          <li className="ml-4">Use the chat interface to ask questions and get real-time advice</li>
        </ol>
        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500">
          <p className="text-yellow-700">
            ⚠️ Important: Always consult with healthcare professionals before starting any new 
            exercise or diet program, especially if you have pre-existing conditions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;