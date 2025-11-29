import React, { useState, useRef, useEffect } from 'react';

const MentorStartupChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Alex Morgan',
      senderRole: 'Founder, TechFlow Inc.',
      content: 'Hi Dr. Johnson! Thanks for the feedback on our product demo yesterday. We\'ve started implementing the suggested UI changes.',
      timestamp: '10:30 AM',
      isOwn: false,
      reactions: [{ emoji: '👍', count: 2 }]
    },
    {
      id: 2,
      sender: 'Dr. Sarah Johnson',
      senderRole: 'Mentor',
      content: 'Great to hear, Alex! I\'m glad the feedback was helpful. How are you planning to test the new UI with users?',
      timestamp: '10:32 AM',
      isOwn: true,
      reactions: []
    },
    {
      id: 3,
      sender: 'Alex Morgan',
      senderRole: 'Founder, TechFlow Inc.',
      content: 'We\'re planning to conduct usability tests with 10 participants next week. I\'ll share the results with you once we have them.',
      timestamp: '10:35 AM',
      isOwn: false,
      reactions: [{ emoji: '👏', count: 1 }]
    },
    {
      id: 4,
      sender: 'Dr. Sarah Johnson',
      senderRole: 'Mentor',
      content: 'Sounds like a solid plan. I\'ve also attached a research paper on UI/UX best practices that might be useful for your team.',
      timestamp: '10:40 AM',
      isOwn: true,
      reactions: [],
      attachments: ['UI_UX_Best_Practices.pdf']
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      sender: 'Dr. Sarah Johnson',
      senderRole: 'Mentor',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      reactions: []
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleReaction = (messageId, emoji) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions.find(r => r.emoji === emoji);
        if (existingReaction) {
          return {
            ...msg,
            reactions: msg.reactions.map(r => 
              r.emoji === emoji ? { ...r, count: r.count + 1 } : r
            )
          };
        } else {
          return {
            ...msg,
            reactions: [...msg.reactions, { emoji, count: 1 }]
          };
        }
      }
      return msg;
    }));
  };

  const emojis = ['👍', '👎', '❤️', '😂', '😮', '😢', '👏', '🔥'];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC] flex flex-col h-[calc(100vh-200px)]">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-gray-800">Mentor–Startup Chat</h2>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-500 hover:text-[#FF6A00] rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
              </svg>
            </button>
            <button className="p-2 text-gray-500 hover:text-[#FF6A00] rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <p className="text-gray-600">Real-time chat with your mentees</p>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-xl">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs md:max-w-md lg:max-w-lg ${message.isOwn ? 'bg-[#FF6A00]' : 'bg-white'} rounded-2xl p-4 shadow-sm border ${message.isOwn ? 'border-[#FF6A00]' : 'border-gray-200'}`}>
              {!message.isOwn && (
                <div className="flex items-center mb-1">
                  <span className="font-bold text-gray-800">{message.sender}</span>
                  <span className="text-xs text-gray-500 ml-2">{message.senderRole}</span>
                </div>
              )}
              <p className={`${message.isOwn ? 'text-white' : 'text-gray-800'}`}>{message.content}</p>
              {message.attachments && (
                <div className="mt-2 flex items-center p-2 bg-white bg-opacity-20 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white text-sm ml-2">{message.attachments[0]}</span>
                </div>
              )}
              <div className="flex justify-between items-center mt-2">
                <span className={`text-xs ${message.isOwn ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                  {message.timestamp}
                </span>
                <div className="flex items-center">
                  {message.reactions.map((reaction) => (
                    <span 
                      key={reaction.emoji} 
                      className="text-xs bg-white bg-opacity-20 rounded-full px-1.5 py-0.5 ml-1 cursor-pointer"
                      onClick={() => handleReaction(message.id, reaction.emoji)}
                    >
                      {reaction.emoji} {reaction.count}
                    </span>
                  ))}
                  <button 
                    className={`ml-2 text-xs ${message.isOwn ? 'text-white' : 'text-gray-500'} hover:text-[#FF6A00]`}
                    onClick={() => handleReaction(message.id, '👍')}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 pt-4">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
          <div className="flex-1">
            <div className="relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                rows="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-[#FF6A00] focus:border-[#FF6A00] resize-none"
              />
              <div className="absolute right-2 bottom-2 flex space-x-1">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-1 text-gray-500 hover:text-[#FF6A00]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm3-1a1 1 0 11-2 0 1 1 0 012 0zm4 6a3 3 0 01-6 0h6z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="p-1 text-gray-500 hover:text-[#FF6A00]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="p-1 text-gray-500 hover:text-[#FF6A00]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            {showEmojiPicker && (
              <div className="absolute bottom-full mb-2 bg-white border border-gray-200 rounded-xl shadow-lg p-2">
                <div className="flex flex-wrap gap-1">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => {
                        setNewMessage(newMessage + emoji);
                        setShowEmojiPicker(false);
                      }}
                      className="p-1 hover:bg-gray-100 rounded text-lg"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-3 rounded-2xl ${newMessage.trim() ? 'bg-[#FF6A00] text-white hover:bg-[#FF8C42]' : 'bg-gray-200 text-gray-400'} transition-colors`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MentorStartupChat;