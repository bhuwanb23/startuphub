import React, { useState } from 'react';

const DealChats = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  
  const chats = [
    {
      id: 1,
      name: 'TechStart Inc. - Series A',
      avatar: 'TS',
      lastMessage: 'Can we schedule the term sheet review for next week?',
      time: '2:45 PM',
      unread: 2,
      participants: 5
    },
    {
      id: 2,
      name: 'GreenTech Solutions',
      avatar: 'GS',
      lastMessage: 'The due diligence documents are ready for review',
      time: '11:30 AM',
      unread: 0,
      participants: 3
    },
    {
      id: 3,
      name: 'MediCore Ltd. - Board Meeting',
      avatar: 'MC',
      lastMessage: 'Meeting minutes have been uploaded to the shared drive',
      time: 'Yesterday',
      unread: 0,
      participants: 8
    }
  ];
  
  const messages = {
    1: [
      {
        id: 1,
        sender: 'You',
        content: 'Hi team, I\'ve reviewed the term sheet and have a few questions about the liquidation preference.',
        time: '10:30 AM',
        isOwn: true
      },
      {
        id: 2,
        sender: 'Sarah Johnson',
        content: 'Sure, what specifically would you like to discuss?',
        time: '10:32 AM',
        isOwn: false,
        avatar: 'SJ'
      },
      {
        id: 3,
        sender: 'You',
        content: 'I\'m wondering if we can adjust the liquidation preference from 1x to 0.8x to make it more founder-friendly.',
        time: '10:35 AM',
        isOwn: true
      },
      {
        id: 4,
        sender: 'David Chen',
        content: 'That\'s a reasonable request. Let me check with our legal team and get back to you.',
        time: '10:40 AM',
        isOwn: false,
        avatar: 'DC'
      },
      {
        id: 5,
        sender: 'TechStart CEO',
        content: 'We\'re open to discussion on this. What\'s the typical range you\'ve seen in other deals?',
        time: '10:45 AM',
        isOwn: false,
        avatar: 'TC'
      }
    ],
    2: [
      {
        id: 1,
        sender: 'You',
        content: 'Can you share the updated cap table?',
        time: '9:15 AM',
        isOwn: true
      },
      {
        id: 2,
        sender: 'Lisa Wang',
        content: 'Sure, I\'ve uploaded it to the shared documents folder.',
        time: '9:18 AM',
        isOwn: false,
        avatar: 'LW'
      }
    ]
  };
  
  const dealTimeline = [
    { id: 1, date: '2025-11-15', event: 'Term Sheet Sent', status: 'completed' },
    { id: 2, date: '2025-11-20', event: 'Due Diligence Started', status: 'completed' },
    { id: 3, date: '2025-11-25', event: 'Legal Review', status: 'in-progress' },
    { id: 4, date: '2025-12-01', event: 'Final Negotiation', status: 'pending' },
    { id: 5, date: '2025-12-05', event: 'Signing', status: 'pending' }
  ];
  
  const currentMessages = messages[activeChat] || [];
  const currentChat = chats.find(chat => chat.id === activeChat);
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      setNewMessage('');
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'pending': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };
  
  return (
    <div className="flex h-[calc(100vh-200px)] bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Chat List */}
      <div className="w-1/4 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Deal Chats</h2>
          <p className="text-xs text-gray-500 mt-1">Secure messaging with startups</p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                activeChat === chat.id ? 'bg-[#FFF5EB]' : ''
              }`}
            >
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#FF8C42] flex items-center justify-center text-white font-bold">
                    {chat.avatar}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-800">{chat.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{chat.time}</div>
                  {chat.unread > 0 && (
                    <div className="w-5 h-5 rounded-full bg-[#FF6A00] text-white text-xs flex items-center justify-center mt-1">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <span>{chat.participants} participants</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#FF8C42] flex items-center justify-center text-white font-bold">
                  {currentChat.avatar}
                </div>
                <div className="ml-3">
                  <h2 className="font-bold text-gray-800">{currentChat.name}</h2>
                  <p className="text-xs text-gray-500">{currentChat.participants} participants</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                  Call
                </button>
                <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                  Video
                </button>
              </div>
            </div>
            
            <div className="flex flex-1">
              {/* Messages */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  <div className="space-y-4">
                    {currentMessages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        {!message.isOwn && (
                          <div className="w-8 h-8 rounded-full bg-[#FF8C42] flex items-center justify-center text-white text-xs font-bold mr-2 mt-1">
                            {message.avatar}
                          </div>
                        )}
                        <div className={`max-w-xs lg:max-w-md rounded-2xl px-4 py-2 ${
                          message.isOwn 
                            ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-br-none' 
                            : 'bg-white border border-gray-200 rounded-bl-none'
                        }`}>
                          {!message.isOwn && (
                            <div className="font-medium text-sm mb-1">{message.sender}</div>
                          )}
                          <div className="text-sm">{message.content}</div>
                          <div className={`text-xs mt-1 ${message.isOwn ? 'text-[#FFF5EB]' : 'text-gray-500'}`}>
                            {message.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* File Attachments */}
                <div className="p-3 border-t border-gray-200 bg-white">
                  <div className="flex gap-2 overflow-x-auto">
                    <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-lg flex flex-col items-center justify-center">
                      <div className="text-lg">📊</div>
                      <div className="text-xs text-gray-600 mt-1 truncate w-20 text-center">Financials.pdf</div>
                    </div>
                    <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-lg flex flex-col items-center justify-center">
                      <div className="text-lg">📋</div>
                      <div className="text-xs text-gray-600 mt-1 truncate w-20 text-center">CapTable.xlsx</div>
                    </div>
                  </div>
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
                    />
                    <button 
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all"
                    >
                      Send
                    </button>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      📎
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      📷
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      😊
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Deal Timeline */}
              <div className="w-80 border-l border-gray-200 bg-gray-50 p-4">
                <h3 className="font-bold text-gray-800 mb-4">Deal Timeline</h3>
                
                <div className="space-y-4">
                  {dealTimeline.map((item) => (
                    <div key={item.id} className="flex">
                      <div className="flex flex-col items-center mr-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></div>
                        {item.id < dealTimeline.length && (
                          <div className="w-0.5 h-10 bg-gray-300 mt-1"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{item.event}</div>
                        <div className="text-xs text-gray-500">{item.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h3 className="font-bold text-gray-800 mb-3">Participants</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#FF8C42] flex items-center justify-center text-white text-xs font-bold">
                        Y
                      </div>
                      <div className="ml-2">
                        <div className="text-sm font-medium text-gray-800">You (Investor)</div>
                        <div className="text-xs text-gray-500">Online</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                        SJ
                      </div>
                      <div className="ml-2">
                        <div className="text-sm font-medium text-gray-800">Sarah Johnson</div>
                        <div className="text-xs text-gray-500">Advisor</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                        DC
                      </div>
                      <div className="ml-2">
                        <div className="text-sm font-medium text-gray-800">David Chen</div>
                        <div className="text-xs text-gray-500">Startup CFO</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-3">💬</div>
              <p>Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealChats;