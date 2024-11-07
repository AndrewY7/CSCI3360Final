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

function HealthAssistant() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const chatContainerRef = useRef(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        await loadUserProfile(user.uid);
      } else {
        setUserId(null);
        setUserProfile(null);
        setMessages([{ role: 'assistant', content: INITIAL_MESSAGE }]);
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

  const isProfileComplete = (profile) => {
    if (!profile) return false;
    const requiredFields = ['age', 'sex', 'height', 'weight', 'activity', 'goals'];
    return requiredFields.every(field => profile[field]);
  };

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
            content: isProfileComplete(userData.profile) ? WELCOME_BACK_MESSAGE : INITIAL_MESSAGE,
            timestamp: new Date().toISOString()
          }]);
        }
      } else {
        await setDoc(doc(db, 'users', uid), {
          createdAt: serverTimestamp(),
          chatHistory: [{
            role: 'assistant',
            content: INITIAL_MESSAGE,
            timestamp: new Date().toISOString()
          }]
        });
        setMessages([{ 
          role: 'assistant', 
          content: INITIAL_MESSAGE,
          timestamp: new Date().toISOString()
        }]);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      setMessages([{ 
        role: 'assistant', 
        content: 'Error loading profile. Please try again.',
        timestamp: new Date().toISOString()
      }]);
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
    
    // Log the message being processed (for debugging)
    console.log('Processing message:', message);

    for (const [key, pattern] of Object.entries(patterns)) {
      const match = message.toLowerCase().match(pattern);
      if (match) {
        profile[key] = key === 'sex' ? match[0].toLowerCase() : match[0];
        console.log(`Matched ${key}:`, profile[key]);
      }
    }

    // Extract goals (everything after "goals:" or numbered list items)
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
      // Profile-related actions only for logged-in users
      if (userId) {
        // Check if user wants to update profile
        if (inputMessage.toLowerCase().includes('update profile')) {
          setIsUpdatingProfile(true);
          const updateMessage = {
            role: 'assistant',
            content: INITIAL_MESSAGE,
            timestamp: new Date().toISOString()
          };
          const finalMessages = [...updatedMessages, updateMessage];
          setMessages(finalMessages);
          await saveChatHistory(finalMessages);
          setIsLoading(false);
          return;
        }
  
        // Process profile information if updating or not set
        if (isUpdatingProfile || !userProfile) {
          const profile = processUserProfile(inputMessage);
          if (profile) {
            await saveUserProfile(profile);
            setUserProfile(profile);
            setIsUpdatingProfile(false);
            const confirmMessage = {
              role: 'assistant',
              content: "Profile updated successfully! How may I help you today?",
              timestamp: new Date().toISOString()
            };
            const finalMessages = [...updatedMessages, confirmMessage];
            setMessages(finalMessages);
            await saveChatHistory(finalMessages);
            setIsLoading(false);
            return;
          }
        }
      }
  
      // Prepare message history with appropriate system message
      const messageHistory = [
        {
          role: 'system',
          content: `You are a helpful health assistant. ${
            userId && userProfile ? 
            `User profile: Age: ${userProfile.age}, Sex: ${userProfile.sex}, Height: ${userProfile.height}cm, Weight: ${userProfile.weight}kg, Activity: ${userProfile.activity}\nGoals: ${userProfile.goals}` 
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
            <button
              onClick={() => setIsUpdatingProfile(true)}
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