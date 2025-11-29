import React, { useState } from 'react';

const StartupChats = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');

  // Mock data for startups
  const startups = [
    { id: 1, name: 'BioTech Innovations', industry: 'Biotechnology', unread: 0, lastMessage: 'Thanks for the feedback!' },
    { id: 2, name: 'Green Energy Solutions', industry: 'Clean Energy', unread: 3, lastMessage: 'Can we schedule a meeting?' },
    { id: 3, name: 'AI Health Diagnostics', industry: 'Health Tech', unread: 0, lastMessage: 'Prototype testing went well' },
    { id: 4, name: 'Sustainable Materials', industry: 'Materials Science', unread: 1, lastMessage: 'Need help with funding' },
    { id: 5, name: 'Quantum Computing', industry: 'Computing', unread: 0, lastMessage: 'Demo day prep is going great' }
  ];

  // Mock data for messages
  const messages = {
    1: [
      { id: 1, sender: 'You', text: 'Hi team, how is the prototype testing going?', time: '10:30 AM', isOwn: true },
      { id: 2, sender: 'Alex Johnson', text: 'Going well! We\'ve completed 75% of the tests.', time: '10:32 AM', isOwn: false },
      { id: 3, sender: 'You', text: 'That\'s great progress. Any issues so far?', time: '10:35 AM', isOwn: true },
      { id: 4, sender: 'Maria Garcia', text: 'Just a minor calibration issue with sensor #3', time: '10:40 AM', isOwn: false },
      { id: 5, sender: 'You', text: 'Thanks for the update!', time: '10:42 AM', isOwn: true }
    ],
    2: [
      { id: 1, sender: 'You', text: 'Hello team, any updates on the solar panel efficiency?', time: '09:15 AM', isOwn: true },
      { id: 2, sender: 'David Kim', text: 'We improved efficiency by 12% this week!', time: '09:20 AM', isOwn: false }
    ]
  };

  const currentMessages = messages[selectedChat] || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message
      alert(`Message sent: ${message}`);
      setMessage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Startup Chats</h2>
        <p className="text-gray-600">Direct communication with startups in your program</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Startup List */}
        <div className="lg:w-1/3">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {startups.map((startup) => (
              <div 
                key={startup.id}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  selectedChat === startup.id ? 'bg-orange-50' : ''
                }`}
                onClick={() => setSelectedChat(startup.id)}
              >
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">{startup.name}</h3>
                  {startup.unread > 0 && (
                    <span className="bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {startup.unread}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{startup.industry}</p>
                <p className="text-sm text-gray-500 truncate mt-1">{startup.lastMessage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:w-2/3 flex flex-col">
          <div className="border border-gray-200 rounded-lg flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-medium text-gray-800">
                {startups.find(s => s.id === selectedChat)?.name}
              </h3>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {currentMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`mb-4 flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
                      msg.isOwn 
                        ? 'bg-orange-500 text-white rounded-br-none' 
                        : 'bg-white border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    {!msg.isOwn && (
                      <p className="text-xs font-medium mb-1">{msg.sender}</p>
                    )}
                    <p>{msg.text}</p>
                    <p 
                      className={`text-xs mt-1 ${
                        msg.isOwn ? 'text-orange-100' : 'text-gray-500'
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupChats;