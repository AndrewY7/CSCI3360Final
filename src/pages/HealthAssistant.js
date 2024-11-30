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
import InitialProfileForm from '../ProfileForm';

const WELCOME_MESSAGE = "Thanks for providing your information! How can I help you today?";
const WELCOME_BACK_MESSAGE = "Welcome back! How may I help you today?";

function HealthAssistant() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [showInitialForm, setShowInitialForm] = useState(false);
  const [error, setError] = useState('');
  const chatContainerRef = useRef(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists() || !userDoc.data().profile) {
          setShowInitialForm(true);
        } else {
          await loadUserProfile(user.uid);
        }
      } else {
        setUserId(null);
        setUserProfile(null);
        setShowInitialForm(true);
      }
    });

    return () => unsubscribe();
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const loadUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserProfile(userData.profile);
        
        if (userData.chatHistory && userData.chatHistory.length > 0) {
          const formattedHistory = userData.chatHistory.map(msg => ({
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp
          }));
          setMessages(formattedHistory);
        } else {
          setMessages([{
            role: 'assistant',
            content: WELCOME_BACK_MESSAGE,
            timestamp: new Date().toISOString()
          }]);
        }
      } else {
        setShowInitialForm(true);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      setError('Error loading profile. Please try again.');
    }
  };

  const handleProfileSubmit = async (profileData) => {
    try {
      if (userId) {
        await saveUserProfile(profileData);
      }
      setUserProfile(profileData);
      setShowInitialForm(false);
      setMessages([{
        role: 'assistant',
        content: WELCOME_MESSAGE,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('Failed to save profile');
    }
  };

  const saveUserProfile = async (profile) => {
    if (!userId) return;
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      const existingData = userDoc.exists() ? userDoc.data() : {};
      
      const updatedProfile = {
        ...existingData,
        profile: {
          ...(existingData.profile || {}),
          ...profile,
          updatedAt: new Date().toISOString()
        }
      };

      await setDoc(userDocRef, updatedProfile, { merge: true });
      return updatedProfile;
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  };

  const saveChatHistory = async (newMessages) => {
    if (!userId) return;
    try {
      const userDocRef = doc(db, 'users', userId);
      
      const messageHistory = newMessages.slice(-50).map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: new Date().toISOString()
      }));

      await updateDoc(userDocRef, {
        chatHistory: messageHistory,
        lastInteraction: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  const processUserProfile = (message) => {
    const patterns = {
      age: /\b\d{1,2}\b/,
      sex: /\b(male|female)\b/i,
      height: /\b\d{2,3}\b(?=\s*cm)/,
      weight: /\b\d{2,3}\b(?=\s*kg)/,
      activity: /\b(sedentary|light|moderate|heavy|athlete)\b/i,
    };

    const profile = {};
    
    console.log('Processing message:', message);

    for (const [key, pattern] of Object.entries(patterns)) {
      const match = message.toLowerCase().match(pattern);
      if (match) {
        profile[key] = key === 'sex' ? match[0].toLowerCase() : match[0];
        console.log(`Matched ${key}:`, profile[key]);
      }
    }

    const goalsMatch = message.match(/goals:\s*(.+?)(?=\n|$)/i) || 
                    message.match(/6\.\s*(.+?)(?=\n|$)/);
    if (goalsMatch) {
      profile.goals = goalsMatch[1].trim();
      console.log('Matched goals:', profile.goals);
    }

    console.log('Processed profile:', profile);
    return Object.keys(profile).length >= 3 ? profile : null;
  };

  const callOpenAI = async (messageHistory) => {
    try {
      const BACKEND_URL = process.env.NODE_ENV === 'production' 
        ? 'https://healthai-tan2.onrender.com'  
        : 'http://localhost:3001';
  
      const response = await fetch(`${BACKEND_URL}/api/chat`, {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: messageHistory }),
        credentials: 'omit'
      });
  
      if (!response.ok) {
        throw new Error('Failed to get response from OpenAI');
      }
  
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      throw error;
    }
  };

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
      if (userId) {
        if (inputMessage.toLowerCase().includes('update profile')) {
          setShowInitialForm(true);
          setIsLoading(false);
          return;
        }
      }
  
      const messageHistory = [
        {
          role: 'system',
          content: `You are a helpful health assistant. ${
            userId && userProfile ? 
            `User Profile Summary:
              • Demographics: ${userProfile.age} year old ${userProfile.sex}
              • Physical Stats: Height ${userProfile.height}cm | Weight ${userProfile.weight}kg
              • Activity Level: ${userProfile.activity}
              • Personal Goals: ${userProfile.goals}
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

  if (showInitialForm) {
    return (
      <div className="w-[85%] mx-auto px-4 py-8">
        <InitialProfileForm 
          onSubmit={handleProfileSubmit}
          onCancel={userId ? null : () => setShowInitialForm(false)}
          initialData={userProfile}  // Pass existing profile data if updating
        />
      </div>
    );
  }

  return (
    <div className="w-[85%] mx-auto px-4 py-4 font-[Nunito]">
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
            <button
              onClick={() => setShowInitialForm(true)}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Update Profile
            </button>
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
    </div>
  );
}

export default HealthAssistant;