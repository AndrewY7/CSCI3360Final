import React, { useState, useRef, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc 
} from 'firebase/firestore';

const INITIAL_MESSAGE = `Hi! I'm your personal health assistant. To help you better, I'd like to know a few things about you:
1. Your age
2. Your sex (male/female)
3. Your height (in cm)
4. Your weight (in kg)
5. Your physical activity level (sedentary/light/moderate/heavy/athlete)
6. Your health goals

Please provide these details so I can give you personalized advice.`;

function HealthAssistant() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState(null);
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

  const loadUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserProfile(userData.profile);
        
        if (userData.chatHistory) {
          setMessages(userData.chatHistory);
        } else {
          setMessages([{
            role: 'assistant',
            content: `Welcome back! Here's your current profile:\n\nAge: ${userData.profile.age}\nSex: ${userData.profile.sex}\nHeight: ${userData.profile.height}cm\nWeight: ${userData.profile.weight}kg\nActivity Level: ${userData.profile.activity}\n\nYour Goals:\n${userData.profile.goals}\n\nHow can I help you today?`
          }]);
        }
      } else {
        setMessages([{ role: 'assistant', content: INITIAL_MESSAGE }]);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const saveUserProfile = async (profile) => {
    if (!userId) return;
    try {
      const userDocRef = doc(db, 'users', userId);
      // Get existing user data first
      const userDoc = await getDoc(userDocRef);
      
      const updatedProfile = {
        ...userDoc.exists() ? userDoc.data() : {},
        profile: {
          ...(userDoc.exists() ? userDoc.data().profile : {}),
          age: profile.age,
          sex: profile.sex,
          height: profile.height,
          weight: profile.weight,
          activity: profile.activity,
          goals: profile.goals,
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

  const saveChatHistory = async (messages) => {
    if (!userId) return;
    try {
      await updateDoc(doc(db, 'users', userId), {
        chatHistory: messages.slice(-50), // Keep last 50 messages
        updatedAt: new Date().toISOString()
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
    for (const [key, pattern] of Object.entries(patterns)) {
      const match = message.toLowerCase().match(pattern);
      if (match) {
        profile[key] = match[0];
      }
    }

    const goalsMatch = message.match(/goals:(.+?)(?=\n|$)/i) || 
                      message.match(/\d\.\s(.+?)(?=\n|$)/g);
    if (goalsMatch) {
      profile.goals = goalsMatch[0];
    }

    return Object.keys(profile).length >= 5 ? profile : null;
  };

  const callOpenAI = async (messageHistory) => {
    try {
      const response = await fetch('http://localhost:3001/api/chat', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: messageHistory }),
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
      content: inputMessage
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      if (!userProfile) {
        const profile = processUserProfile(inputMessage);
        if (profile) {
          setUserProfile(profile);
          await saveUserProfile(profile);
        }
      }

      const messageHistory = [
        {
          role: 'system',
          content: `You are a helpful health assistant. ${
            userProfile ? 
            `User profile: Age: ${userProfile.age}, Sex: ${userProfile.sex}, Height: ${userProfile.height}cm, Weight: ${userProfile.weight}kg, Activity: ${userProfile.activity}\nGoals: ${userProfile.goals}` 
            : 'Still collecting user profile information.'
          }
          
          Key responsibilities:
          1. If user profile is not set, focus on collecting missing profile information
          2. Once profile is set, provide personalized health advice
          3. Use Mifflin-St Jeor Formula for caloric calculations when relevant
          4. Focus on evidence-based recommendations
          5. Be encouraging and supportive
          6. For mental health questions, provide general guidance and recommend professional help when appropriate
          
          Always maintain a professional yet friendly tone.`
        },
        ...updatedMessages
      ];

      const response = await callOpenAI(messageHistory);
      const finalMessages = [...updatedMessages, { 
        role: 'assistant', 
        content: response 
      }];
      
      setMessages(finalMessages);
      await saveChatHistory(finalMessages);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but I encountered an error. Please try again."
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
      
      {/* User Profile Display */}
      {userProfile && (
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Your Profile</h2>
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
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthAssistant;