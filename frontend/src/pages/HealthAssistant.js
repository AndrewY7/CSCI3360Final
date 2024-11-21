import React, { useState, useRef, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';

const INITIAL_MESSAGE = `Hi! I'm your personal health assistant. To help you better, I'd like to know a few things about you:
1. Your age
2. Your sex (male/female)
3. Your height (in cm)
4. Your weight (in kg)
5. Your physical activity level (sedentary/light/moderate/heavy/athlete)
6. Your health goals

Please provide these details so I can give you personalized advice.`;

const WELCOME_BACK_MESSAGE = "Welcome back! How may I help you today? If you need to update your profile information, just say 'update profile' and I'll help you with that.";

// Helper function to calculate BMI
const calculateBMI = (height, weight) => {
  const heightInMeters = height / 100;
  return (weight / (heightInMeters * heightInMeters)).toFixed(1);
};

// Helper function to calculate daily calorie needs using Mifflin-St Jeor Formula
const calculateCalories = (profile) => {
  const { age, sex, height, weight, activity } = profile;
  let bmr;
  
  if (sex === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    heavy: 1.725,
    athlete: 1.9
  };

  return Math.round(bmr * activityFactors[activity.toLowerCase()]);
};

function HealthAssistant() {
  // [Previous state declarations and useEffects remain the same...]
  [... Previous code until handleSend function ...]

  const handleSend = async () => {
    if (!inputMessage.trim()) return;
  
    const newMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };
  
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);
  
    try {
      // Profile-related actions only for logged-in users
      if (userId) {
        // [Previous profile update logic remains the same...]
      }
  
      // Updated system message with refined prompt
      const messageHistory = [
        {
          role: 'system',
          content: `You are a helpful health assistant. ${
            userId && userProfile ? 
            `User Profile Summary:
• Demographics: ${userProfile.age} year old ${userProfile.sex}
• Physical Stats: Height ${userProfile.height}cm | Weight ${userProfile.weight}kg
• BMI: ${calculateBMI(userProfile.height, userProfile.weight)}
• Activity Level: ${userProfile.activity}
• Personal Goals: ${userProfile.goals}
• Calculated Daily Calorie Needs: ${calculateCalories(userProfile)}
Please consider ALL profile elements when providing recommendations.` 
            : 'No profile information available. Provide general health advice and inform user they can save their profile by logging in.'
          }
          
          Key responsibilities:
          1. ${userId ? 'If user profile is not set, focus on collecting missing profile information' : 'Provide general health advice'}
          2. ${userId ? 'Once profile is set, provide personalized health advice' : 'Recommend logging in for personalized advice'}
          3. Use Mifflin-St Jeor Formula for caloric calculations when relevant
          4. Focus on evidence-based recommendations
          5. Be encouraging and supportive
          6. For mental health questions, provide general guidance and recommend professional help when appropriate
          7. ${userId ? 'If user asks to update profile, guide them through the update process' : 'If user asks about profile features, inform them they need to log in'}
          8. ALWAYS include relevant health disclaimers:
             - General advice: "This advice is general in nature and may not suit everyone."
             - Medical concerns: "Please consult healthcare provider for medical advice."
             - Mental health: "For mental health support, contact qualified mental health professional."
          9. Flag emergency situations immediately and provide emergency contact guidance.
          10. Verify calculations twice before including numerical recommendations.

          When providing recommendations, always structure your response as follows:
          1. Profile-Based Context: Reference specific user details
          2. Personalized Recommendation: Tailored to profile and goals
          3. Scientific Basis: Brief evidence-based explanation
          4. Practical Implementation: Step-by-step guidance
          5. Safety Notice: Relevant disclaimers
          6. Progress Tracking: Measurable metrics for success
          
          Always maintain a professional yet friendly tone.`
        },
        ...updatedMessages
      ];
  
      const response = await callOpenAI(messageHistory);
      const finalMessages = [...updatedMessages, { 
        role: 'assistant', 
        content: response,
        timestamp: new Date().toISOString()
      }];
      
      setMessages(finalMessages);
      
      // Only save chat history for logged-in users
      if (userId) {
        await saveChatHistory(finalMessages);
      }
    } catch (error) {
      console.error('Error in chat interaction:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date().toISOString()
      }]);
    }
  
    setIsLoading(false);
  };

  const renderMessage = (content) => {
    return (
      <div className="whitespace-pre-wrap">
        {content.split('\n').map((line, i) => (
          <div key={i} className="mb-2">{line}</div>
        ))}
      </div>
    );
  };

  const clearMessages = async () => {
    if (!userId) return;
    
    const initialMessage = {
      role: 'assistant',
      content: isProfileComplete(userProfile) ? WELCOME_BACK_MESSAGE : INITIAL_MESSAGE,
      timestamp: new Date().toISOString()
    };
    
    setMessages([initialMessage]);
    
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        chatHistory: [initialMessage]
      });
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  };

  return (
    <div className="w-[85%] mx-auto px-4 py-4">
      <h1 className="text-2xl font-bold text-center mb-6">Health Assistant</h1>

      {!userId && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                You're using the chat assistant in guest mode. To save your chat history and get personalized recommendations, please log in or create an account.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* User Profile Display */}
      {userProfile && (
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold mb-2">Your Profile</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setIsUpdatingProfile(true)}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Update Profile
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Age:</span> {userProfile.age}
            </div>
            <div>
              <span className="font-medium">Sex:</span> {userProfile.sex}
            </div>
            <div>
              <span className="font-medium">Height:</span> {userProfile.height}cm
            </div>
            <div>
              <span className="font-medium">Weight:</span> {userProfile.weight}kg
            </div>
            <div>
              <span className="font-medium">Activity Level:</span> {userProfile.activity}
            </div>
          </div>
          <div className="mt-2">
            <span className="font-medium">Goals:</span>
            <p className="text-sm mt-1">{userProfile.goals}</p>
          </div>
        </div>
      )}
      
      <div className="w-full mx-auto bg-gray-100 rounded-lg shadow-lg">
        <div className="p-8">
          {/* Chat container */}
          <div 
            ref={chatContainerRef}
            className="bg-white rounded-lg p-6 h-[600px] overflow-y-auto mb-6 shadow-inner"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div className="flex items-start max-w-[80%]">
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex-shrink-0" />
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {renderMessage(message.content)}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 ml-2 flex-shrink-0" />
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="flex items-center bg-gray-200 rounded-lg p-3">
                  <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </div>
            )}
          </div>

         {/* Input area */}
         <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSend}
              className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                'Send'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Notification for profile updates */}
      {isUpdatingProfile && (
        <div className="fixed bottom-4 right-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded shadow-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">
                Profile update mode active. Please provide your updated information.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HealthAssistant;