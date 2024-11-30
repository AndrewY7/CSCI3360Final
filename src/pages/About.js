import React from 'react';

function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12" style={{ fontFamily: 'Nunito, sans-serif' }}>
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
        Welcome to Healthai Assistant
      </h1>
      
      {/* Getting Started Section */}
      <div className="bg-white rounded-2xl shadow-xl p-10 mb-12 transform hover:scale-[1.02] transition-transform duration-300">
        <h2 className="text-2xl font-bold mb-6 text-red-500">Getting Started</h2>
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          To make the most of your Healthai experience, please log in or create an account. 
          This allows us to save your profile information and track your progress over time.
        </p>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-l-4 border-blue-500 p-6">
          <p className="text-blue-700 flex items-center text-lg">
            <span role="img" aria-label="lightbulb" className="mr-2 text-2xl">💡</span>
            Pro Tip: Use Google Sign-In for a quick and seamless login experience!
          </p>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="bg-white rounded-2xl shadow-xl p-10 mb-12">
        <h2 className="text-2xl font-bold mb-8 text-red-500">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-white to-red-50 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-red-600 mb-4">Personalized Caloric Calculations</h3>
            <p className="text-gray-700 leading-relaxed">
              Using the scientifically-backed Mifflin-St Jeor Formula, we provide accurate 
              daily caloric needs based on your profile and activity level. This helps create 
              realistic and achievable nutrition goals.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white to-red-50 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-red-600 mb-4">Custom Exercise Plans</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Receive tailored workout recommendations based on your specific needs:
            </p>
            <ul className="grid grid-cols-2 gap-3 text-gray-700">
              <li className="flex items-center">
                <span className="text-red-500 mr-2">●</span> Fitness goals
              </li>
              <li className="flex items-center">
                <span className="text-red-500 mr-2">●</span> Equipment
              </li>
              <li className="flex items-center">
                <span className="text-red-500 mr-2">●</span> Time available
              </li>
              <li className="flex items-center">
                <span className="text-red-500 mr-2">●</span> Fitness level
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-white to-red-50 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-red-600 mb-4">Health & Wellness Guidance</h3>
            <p className="text-gray-700 leading-relaxed">
              Get evidence-based answers to your health-related questions, including nutrition 
              advice, exercise techniques, and general wellness tips.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white to-red-50 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-red-600 mb-4">Mental Health Support</h3>
            <p className="text-gray-700 leading-relaxed">
              Access supportive guidance for mental well-being, stress management, and 
              maintaining a healthy work-life balance. Note: While we provide general support, 
              please consult healthcare professionals for specific mental health concerns.
            </p>
          </div>
        </div>
      </div>

      {/* How to Use Section */}
      <div className="bg-white rounded-2xl shadow-xl p-10">
        <h2 className="text-2xl font-bold mb-8 text-red-500">How to Use</h2>
        <div className="bg-gradient-to-br from-white to-red-50 rounded-xl p-8">
          <ol className="space-y-4">
            {[
              "Sign in or create an account to get started",
              "Complete your profile with accurate information",
              "Share your health and fitness goals with the assistant",
              "Receive personalized recommendations and guidance",
              "Use the chat interface to ask questions and get real-time advice"
            ].map((step, index) => (
              <li key={index} className="flex items-center text-gray-700 text-lg">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white font-bold mr-4">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <div className="mt-8 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border-l-4 border-yellow-500">
            <p className="text-yellow-800 flex items-center text-lg">
              <span role="img" aria-label="warning" className="mr-2 text-2xl">⚠️</span>
              Important: Always consult with healthcare professionals before starting any new 
              exercise or diet program, especially if you have pre-existing conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;