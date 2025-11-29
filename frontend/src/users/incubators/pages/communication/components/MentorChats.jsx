import React, { useState } from 'react';

const MentorChats = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');

  // Mock data for mentors
  const mentors = [
    { id: 1, name: 'Dr. Sarah Johnson', expertise: 'Biotech & Healthcare', unread: 0, lastMessage: 'Session notes attached' },
    { id: 2, name: 'Michael Chen', expertise: 'Business Strategy', unread: 2, lastMessage: 'Let\'s discuss scaling plans' },
    { id: 3, name: 'Emily Rodriguez', expertise: 'Product Development', unread: 0, lastMessage: 'Prototype feedback sent' },
    { id: 4, name: 'James Wilson', expertise: 'Fundraising', unread: 1, lastMessage: 'VC meeting scheduled' },
    { id: 5, name: 'Lisa Thompson', expertise: 'Marketing & Sales', unread: 0, lastMessage: 'Campaign results look good' }
  ];

  // Mock data for messages
  const messages = {
    1: [
      { id: 1, sender: 'You', text: 'Hi Dr. Johnson, thanks for yesterday\'s session', time: '09:15 AM', isOwn: true },
      { id: 2, sender: 'Dr. Sarah Johnson', text: 'My pleasure! I\'ve attached my notes from the session.', time: '09:20 AM', isOwn: false },
      { id: 3, sender: 'You', text: 'Thank you, I\'ll review them and get back to you.', time: '09:25 AM', isOwn: true }
    ],
    2: [
      { id: 1, sender: 'You', text: 'Hi Michael, do you have time for a quick call?', time: '11:30 AM', isOwn: true },
      { id: 2, sender: 'Michael Chen', text: 'Sure, I\'m free in 15 minutes. Would that work?', time: '11:32 AM', isOwn: false }
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
        <h2 className="text-xl font-bold text-gray-800 mb-2">Mentor Chats</h2>
        <p className="text-gray-600">Dedicated communication space with program mentors</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Mentor List */}
        <div className="lg:w-1/3">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {mentors.map((mentor) => (
              <div 
                key={mentor.id}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  selectedChat === mentor.id ? 'bg-orange-50' : ''
                }`}
                onClick={() => setSelectedChat(mentor.id)}
              >
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">{mentor.name}</h3>
                  {mentor.unread > 0 && (
                    <span className="bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {mentor.unread}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{mentor.expertise}</p>
                <p className="text-sm text-gray-500 truncate mt-1">{mentor.lastMessage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:w-2/3 flex flex-col">
          <div className="border border-gray-200 rounded-lg flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-medium text-gray-800">
                {mentors.find(m => m.id === selectedChat)?.name}
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

export default MentorChats;