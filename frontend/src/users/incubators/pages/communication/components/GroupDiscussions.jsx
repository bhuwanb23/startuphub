import React, { useState } from 'react';

const GroupDiscussions = () => {
  const [selectedChannel, setSelectedChannel] = useState(1);
  const [message, setMessage] = useState('');
  const [showNewChannelForm, setShowNewChannelForm] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');

  // Mock data for channels
  const channels = [
    { id: 1, name: 'General Discussion', members: 42, unread: 0 },
    { id: 2, name: 'Tech Support', members: 28, unread: 3 },
    { id: 3, name: 'Funding Opportunities', members: 35, unread: 0 },
    { id: 4, name: 'Mentor Q&A', members: 51, unread: 7 },
    { id: 5, name: 'Demo Day Prep', members: 19, unread: 0 }
  ];

  // Mock data for messages
  const messages = {
    1: [
      { id: 1, sender: 'Alex Johnson', text: 'Welcome everyone to the program!', time: '09:15 AM' },
      { id: 2, sender: 'Maria Garcia', text: 'Excited to be here. Looking forward to learning from everyone.', time: '09:18 AM' },
      { id: 3, sender: 'You', text: 'Great to see such enthusiasm. Let\'s make this a successful cohort!', time: '09:20 AM' }
    ],
    2: [
      { id: 1, sender: 'David Kim', text: 'Having trouble with the API integration. Anyone else facing this?', time: '11:30 AM' },
      { id: 2, sender: 'Lisa Thompson', text: 'Yes, I had the same issue. Try updating to version 2.1.3', time: '11:35 AM' }
    ]
  };

  const currentMessages = messages[selectedChannel] || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message
      alert(`Message sent: ${message}`);
      setMessage('');
    }
  };

  const handleCreateChannel = (e) => {
    e.preventDefault();
    if (newChannelName.trim()) {
      // In a real app, this would create a new channel
      alert(`Channel created: ${newChannelName}`);
      setNewChannelName('');
      setShowNewChannelForm(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Group Discussions</h2>
        <p className="text-gray-600">Collaborate with the community in topic-based channels</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Channel List */}
        <div className="lg:w-1/3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800">Channels</h3>
            <button 
              onClick={() => setShowNewChannelForm(!showNewChannelForm)}
              className="text-orange-500 hover:text-orange-700"
            >
              +
            </button>
          </div>
          
          {showNewChannelForm && (
            <form onSubmit={handleCreateChannel} className="mb-4 p-3 border border-gray-200 rounded-lg">
              <input
                type="text"
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
                placeholder="Channel name"
                className="w-full p-2 mb-2 border border-gray-300 rounded-lg text-sm"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-1 bg-orange-500 text-white rounded text-sm"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewChannelForm(false)}
                  className="flex-1 py-1 bg-gray-200 text-gray-700 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {channels.map((channel) => (
              <div 
                key={channel.id}
                className={`p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  selectedChannel === channel.id ? 'bg-orange-50' : ''
                }`}
                onClick={() => setSelectedChannel(channel.id)}
              >
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-800">#{channel.name}</h4>
                  {channel.unread > 0 && (
                    <span className="bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {channel.unread}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{channel.members} members</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:w-2/3 flex flex-col">
          <div className="border border-gray-200 rounded-lg flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-medium text-gray-800">
                #{channels.find(c => c.id === selectedChannel)?.name}
              </h3>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {currentMessages.map((msg) => (
                <div key={msg.id} className="mb-4">
                  <div className="flex items-center mb-1">
                    <span className="font-medium text-sm text-gray-800">{msg.sender}</span>
                    <span className="text-xs text-gray-500 ml-2">{msg.time}</span>
                  </div>
                  <p className="text-gray-700">{msg.text}</p>
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

export default GroupDiscussions;