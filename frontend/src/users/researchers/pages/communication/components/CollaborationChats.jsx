import React, { useState } from 'react';

const CollaborationChats = () => {
  const [activeChannel, setActiveChannel] = useState('#Joint Research');
  const [message, setMessage] = useState('');
  
  const channels = [
    '#Joint Research',
    '#Prototype Discussions',
    '#Funding Queries',
    '#Tech Transfer'
  ];
  
  // Mock chat data
  const chatData = {
    '#Joint Research': [
      {
        id: 1,
        sender: 'Dr. Sarah Johnson',
        avatar: 'SJ',
        time: '10:24 AM',
        message: 'The quantum algorithm testing results are promising. We\'re seeing a 35% improvement over classical methods.',
        reactions: [{ emoji: '👍', count: 3, users: ['Dr. Michael Chen', 'Dr. Elena Rodriguez'] }],
        isOwn: false
      },
      {
        id: 2,
        sender: 'Dr. Michael Chen',
        avatar: 'MC',
        time: '10:27 AM',
        message: 'That\'s excellent! Should we schedule a meeting to discuss the next phase?',
        reactions: [],
        isOwn: false
      },
      {
        id: 3,
        sender: 'You',
        avatar: 'Y',
        time: '10:30 AM',
        message: 'Yes, let\'s plan for next week. I\'ll send a calendar invite.',
        reactions: [{ emoji: '📅', count: 1, users: ['Dr. Sarah Johnson'] }],
        isOwn: true
      },
      {
        id: 4,
        sender: 'Dr. Elena Rodriguez',
        avatar: 'ER',
        time: '10:32 AM',
        message: 'I can share the materials lab results from our latest experiments. They might be relevant to your findings.',
        reactions: [],
        isOwn: false,
        attachments: [
          { name: 'Materials_Test_Results.pdf', type: 'pdf', size: '1.8 MB' }
        ]
      }
    ],
    '#Prototype Discussions': [
      {
        id: 1,
        sender: 'Dr. James Wilson',
        avatar: 'JW',
        time: 'Yesterday',
        message: 'The new sensor prototype is ready for testing. Who wants to join the validation session?',
        reactions: [{ emoji: '✋', count: 2, users: ['Dr. Priya Sharma', 'You'] }],
        isOwn: false
      }
    ]
  };

  const currentChat = chatData[activeChannel] || [];
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message to the server
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">💬 Collaboration Chats</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Channels */}
        <div className="lg:w-1/4">
          <div className="bg-gray-50 rounded-lg p-4 border border-orange-100">
            <h2 className="font-semibold text-gray-900 mb-4">Channels</h2>
            <div className="space-y-1">
              {channels.map((channel) => (
                <button
                  key={channel}
                  onClick={() => setActiveChannel(channel)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                    activeChannel === channel
                      ? 'bg-orange-100 text-orange-800 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {channel}
                </button>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Direct Messages</h3>
              <div className="space-y-2">
                {['Dr. Sarah Johnson', 'Dr. Michael Chen', 'BioTech Innovations'].map((person, index) => (
                  <div key={index} className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                        {person.charAt(0)}
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="ml-3 text-sm text-gray-700">{person}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Center Panel - Chat */}
        <div className="lg:w-3/4 flex flex-col">
          <div className="bg-gray-50 rounded-lg p-4 border border-orange-100 flex-grow flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-900">{activeChannel}</h2>
              <div className="flex space-x-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto mb-4 space-y-4">
              {currentChat.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-3/4 ${msg.isOwn ? 'bg-orange-500 text-white' : 'bg-white border border-gray-200'} rounded-lg p-3`}>
                    {!msg.isOwn && (
                      <div className="flex items-center mb-1">
                        <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mr-2">
                          {msg.avatar}
                        </div>
                        <span className="text-xs font-medium">{msg.sender}</span>
                        <span className="text-xs text-gray-500 ml-2">{msg.time}</span>
                      </div>
                    )}
                    
                    <p className={`text-sm ${msg.isOwn ? 'text-white' : 'text-gray-700'}`}>{msg.message}</p>
                    
                    {msg.attachments && (
                      <div className="mt-2 pt-2 border-t border-gray-200 border-opacity-20">
                        {msg.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center p-2 bg-black bg-opacity-10 rounded">
                            <div className="flex-shrink-0 w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-xs font-medium text-white text-opacity-90">{attachment.name}</p>
                              <p className="text-xs text-white text-opacity-70">{attachment.size}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {msg.reactions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {msg.reactions.map((reaction, index) => (
                          <button 
                            key={index}
                            className="flex items-center px-2 py-1 bg-gray-200 bg-opacity-30 rounded-full text-xs"
                          >
                            <span className="mr-1">{reaction.emoji}</span>
                            <span>{reaction.count}</span>
                          </button>
                        ))}
                        <button className="px-2 py-1 bg-gray-200 bg-opacity-30 rounded-full text-xs">
                          +
                        </button>
                      </div>
                    )}
                    
                    {msg.isOwn && (
                      <div className="flex justify-end mt-1">
                        <span className="text-xs text-white text-opacity-70">{msg.time}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="border-t border-gray-200 pt-4">
              <div className="flex items-end">
                <div className="flex space-x-2 mr-3">
                  <button type="button" className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <button type="button" className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                <div className="flex-grow">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-16 p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder={`Message ${activeChannel}`}
                  />
                </div>
                <button
                  type="submit"
                  className="ml-3 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <span className="mr-4">Typing: Dr. Sarah Johnson</span>
                <span>Press Enter to send</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationChats;