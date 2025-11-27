import React, { useState } from 'react';

const DiscussionChannels = () => {
  const [channels] = useState([
    { id: 1, name: 'Product', unread: 3, color: 'bg-blue-500' },
    { id: 2, name: 'Business', unread: 0, color: 'bg-green-500' },
    { id: 3, name: 'Tech', unread: 5, color: 'bg-purple-500' },
    { id: 4, name: 'Legal', unread: 1, color: 'bg-red-500' },
    { id: 5, name: 'UI/UX', unread: 2, color: 'bg-pink-500' },
    { id: 6, name: 'Go-to-Market', unread: 0, color: 'bg-yellow-500' }
  ]);

  const [messages, setMessages] = useState([
    { id: 1, author: 'Alex Morgan', content: 'Has anyone reviewed the latest product mockups?', timestamp: '10:30 AM', channel: 'Product' },
    { id: 2, author: 'TechFlow Inc.', content: 'We\'ve identified a potential performance bottleneck in the API.', timestamp: '10:45 AM', channel: 'Tech' },
    { id: 3, author: 'You', content: 'I can help with that. Let\'s schedule a call to discuss.', timestamp: '11:00 AM', channel: 'Tech' },
    { id: 4, author: 'Sarah Johnson', content: 'The new branding guidelines are ready for review.', timestamp: '11:15 AM', channel: 'UI/UX' }
  ]);

  const [activeChannel, setActiveChannel] = useState(channels[0]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const channelMessages = messages.filter(msg => msg.channel === activeChannel.name);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        author: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        channel: activeChannel.name
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Sharing file: ${file.name}`);
      // In a real implementation, this would upload and share the file
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Discussion Channels</h2>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">3 users online</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4">
          <div className="bg-[#FFF9F0] rounded-xl p-4">
            <h3 className="font-medium text-gray-800 mb-3">Channels</h3>
            <div className="space-y-1">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                    activeChannel.id === channel.id
                      ? 'bg-[#FF6A00] text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 ${channel.color} rounded-full mr-2`}></div>
                    <span className="text-sm">#{channel.name}</span>
                  </div>
                  {channel.unread > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {channel.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-3/4 flex flex-col">
          <div className="bg-[#FFF9F0] rounded-xl p-4 mb-4">
            <div className="flex items-center">
              <div className={`w-3 h-3 ${activeChannel.color} rounded-full mr-2`}></div>
              <h3 className="font-medium text-gray-800">#{activeChannel.name}</h3>
            </div>
          </div>

          <div className="flex-1 border border-gray-200 rounded-xl overflow-hidden flex flex-col">
            <div className="bg-gray-50 border-b border-gray-200 p-3">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-[#FF6A00] rounded-full flex items-center justify-center text-white text-xs">Y</div>
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">A</div>
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">T</div>
                </div>
                <span className="text-sm text-gray-600 ml-2">3 members</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-white">
              <div className="space-y-4">
                {channelMessages.map((message) => (
                  <div key={message.id} className="flex">
                    <div className="mr-3">
                      <div className="w-8 h-8 bg-[#FF6A00] rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {message.author.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline">
                        <span className="font-medium text-gray-900 text-sm">{message.author}</span>
                        <span className="text-xs text-gray-500 ml-2">{message.timestamp}</span>
                      </div>
                      <p className="text-gray-800 text-sm mt-1">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isTyping && (
              <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-2">A</div>
                  <span className="text-sm text-gray-600">Alex Morgan is typing...</span>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 p-3 bg-white">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Message #${activeChannel.name}`}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00] text-sm"
                  onFocus={() => setIsTyping(true)}
                  onBlur={() => setIsTyping(false)}
                />
                <div className="flex items-center ml-2 space-x-1">
                  <label className="p-2 text-gray-500 hover:text-[#FF6A00] cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                    </svg>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileUpload}
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className={`p-2 rounded-lg ${
                      newMessage.trim()
                        ? 'bg-[#FF6A00] text-white hover:bg-[#FF8C42]'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionChannels;