import React, { useState, useRef, useEffect } from 'react';

const INITIAL_MESSAGE = `Hi! I'm your personal health assistant. To help you better, I'd like to know a few things about you:
1. Your age
2. Your sex (male/female)
3. Your height (in cm)
4. Your weight (in kg)
5. Your physical activity level (sedentary/light/moderate/heavy/athlete)
6. Your health goals

Please provide these details so I can give you personalized advice.`;

function HealthAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: INITIAL_MESSAGE }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const callOpenAI = async (messageHistory) => {
    try {
      const response = await fetch('http://localhost:3001/api/chat', {  // Update this URL to match your backend port
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

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Prepare messages for API call
      const messageHistory = [
        {
          role: 'system',
          content: `You are a helpful health assistant. ${
            userProfile ? 
            `User profile: Age: ${userProfile.age}, Sex: ${userProfile.sex}, Height: ${userProfile.height}cm, Weight: ${userProfile.weight}kg, Activity: ${userProfile.activity}` 
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
        ...messages,
        newMessage
      ];

      const response = await callOpenAI(messageHistory);
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response 
      }]);
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Health Assistant</h1>
      
      <div className="max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg">
        <div className="p-6">
          {/* Chat container */}
          <div 
            ref={chatContainerRef}
            className="bg-white rounded-lg p-4 h-[500px] overflow-y-auto mb-4 shadow-inner"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div className="flex items-start max-w-[70%]">
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
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSend}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
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