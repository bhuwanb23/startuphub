import React, { useState } from 'react';

const MessagingCenter = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  
  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      avatar: '👩‍🔬',
      lastMessage: 'Thanks for the collaboration proposal. Let\'s schedule a call next week.',
      time: '2:45 PM',
      unread: 0,
      online: true,
      category: 'Researcher',
    },
    {
      id: 2,
      name: 'Alex Thompson',
      avatar: '👨‍💼',
      lastMessage: 'I\'m interested in the co-founder opportunity. Can we discuss details?',
      time: '11:30 AM',
      unread: 3,
      online: false,
      category: 'Co-Founder',
    },
    {
      id: 3,
      name: 'Jennifer Park',
      avatar: '👩‍🚀',
      lastMessage: 'The innovation partnership looks promising. Let\'s move forward.',
      time: 'Yesterday',
      unread: 0,
      online: true,
      category: 'Innovator',
    },
    {
      id: 4,
      name: 'Dr. Amanda Foster',
      avatar: '👩‍🏫',
      lastMessage: 'I can help with the patent filing process. When would you like to meet?',
      time: 'Yesterday',
      unread: 1,
      online: false,
      category: 'Expert',
    },
  ];

  // Mock data for messages
  const messages = {
    1: [
      { id: 1, sender: 'me', content: 'Hi Dr. Johnson, I saw your research on genetic engineering and thought it aligned well with our startup goals.', time: '10:30 AM' },
      { id: 2, sender: 'them', content: 'Hello! I\'d be interested to learn more about your startup. What specific areas are you focusing on?', time: '10:32 AM' },
      { id: 3, sender: 'me', content: 'We\'re developing AI-powered diagnostic tools for early disease detection. Your expertise in CRISPR could be valuable.', time: '10:35 AM' },
      { id: 4, sender: 'them', content: 'That sounds fascinating! I have some relevant research that might be applicable. Let\'s schedule a call.', time: '10:40 AM' },
      { id: 5, sender: 'me', content: 'Thanks for the collaboration proposal. Let\'s schedule a call next week.', time: '2:45 PM' },
    ],
    2: [
      { id: 1, sender: 'them', content: 'I came across your profile and I\'m interested in the co-founder opportunity.', time: '9:15 AM' },
      { id: 2, sender: 'me', content: 'Great to hear! What experience do you bring to the table?', time: '9:20 AM' },
      { id: 3, sender: 'them', content: 'I have 8 years in product management and have helped scale two startups to Series B.', time: '9:25 AM' },
      { id: 4, sender: 'me', content: 'Impressive background. I\'m looking for someone with exactly that expertise.', time: '9:30 AM' },
      { id: 5, sender: 'them', content: 'I\'m interested in the co-founder opportunity. Can we discuss details?', time: '11:30 AM' },
    ],
  };

  const currentMessages = messages[activeChat] || [];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Messaging Center</h1>
        <p className="text-gray-600 mt-1">Connect and communicate with your collaboration network</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Communication Insight</h2>
            <p className="text-gray-700 mt-1">
              Dr. Sarah Johnson has responded to your collaboration proposal. 
              She seems highly interested in your AI diagnostics project. 
              Suggested next step: Schedule a video call within 48 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Messaging Interface */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex flex-col md:flex-row h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800">Conversations</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div 
                  key={conversation.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    activeChat === conversation.id ? 'bg-[#FFF5EB]' : ''
                  }`}
                  onClick={() => setActiveChat(conversation.id)}
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="text-2xl">{conversation.avatar}</div>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-bold text-gray-800 truncate">{conversation.name}</h3>
                        <span className="text-xs text-gray-500">{conversation.time}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-gray-600 truncate">{conversation.lastMessage}</p>
                        {conversation.unread > 0 && (
                          <span className="bg-[#FF6A00] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">{conversation.category}</span>
                        {conversation.online && (
                          <span className="ml-2 text-xs text-green-600">● Online</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat Window */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center">
              <div className="relative">
                <div className="text-2xl">
                  {conversations.find(c => c.id === activeChat)?.avatar || '👤'}
                </div>
                {conversations.find(c => c.id === activeChat)?.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3">
                <h3 className="font-bold text-gray-800">
                  {conversations.find(c => c.id === activeChat)?.name || 'Unknown'}
                </h3>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">
                    {conversations.find(c => c.id === activeChat)?.category || ''}
                  </span>
                  {conversations.find(c => c.id === activeChat)?.online && (
                    <span className="ml-2 text-xs text-green-600">● Online</span>
                  )}
                </div>
              </div>
              <div className="ml-auto flex gap-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {currentMessages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'me' 
                          ? 'bg-[#FF6A00] text-white rounded-br-none' 
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className={`text-xs mt-1 ${message.sender === 'me' ? 'text-[#FFF5EB]' : 'text-gray-500'}`}>
                        {message.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00] resize-none"
                    rows="2"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={`p-2 rounded-lg ${
                    newMessage.trim() 
                      ? 'bg-[#FF6A00] text-white hover:bg-[#e05500]' 
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
              <div className="flex gap-2 mt-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm3-1a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messaging Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Messaging Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">24</div>
            <div className="text-sm text-gray-600">Active Conversations</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">86%</div>
            <div className="text-sm text-gray-600">Response Rate</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">2.4h</div>
            <div className="text-sm text-gray-600">Avg. Response Time</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">142</div>
            <div className="text-sm text-gray-600">Messages This Week</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingCenter;