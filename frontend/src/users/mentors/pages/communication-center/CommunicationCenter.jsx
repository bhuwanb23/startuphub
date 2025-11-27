import React, { useState } from 'react';

const CommunicationCenter = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'TechFlow Inc.', subject: 'Follow-up on yesterday\'s session', time: '2 hours ago', read: false },
    { id: 2, sender: 'GreenEnergy Solutions', subject: 'Investor meeting scheduled', time: '1 day ago', read: true },
    { id: 3, sender: 'Mentor Network', subject: 'Monthly mentor meetup', time: '2 days ago', read: true }
  ]);

  const notifications = [
    { id: 1, type: 'session', message: 'Upcoming session with TechFlow Inc.', time: 'Today, 3:00 PM' },
    { id: 2, type: 'document', message: 'New document shared by GreenEnergy Solutions', time: 'Yesterday' },
    { id: 3, type: 'feedback', message: 'Feedback request for yesterday\'s mentoring', time: '2 days ago' }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Communication Center</h1>
        <p className="text-gray-600">Manage all your communications with mentees and the mentor network</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'messages'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'notifications'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('meetings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'meetings'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Meetings
          </button>
        </nav>
      </div>

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Inbox</h2>
            <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-md hover:bg-[#e05500] transition-colors">
              New Message
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {messages.map(message => (
              <div key={message.id} className={`p-6 hover:bg-gray-50 ${!message.read ? 'bg-blue-50' : ''}`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFF2DC] flex items-center justify-center">
                    <span className="text-[#FF6A00] font-medium">
                      {message.sender.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">{message.sender}</h3>
                      {!message.read && (
                        <span className="ml-2 inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#FF6A00]"></span>
                      )}
                    </div>
                    <p className="text-gray-600">{message.subject}</p>
                    <p className="text-sm text-gray-500">{message.time}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Recent Notifications</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {notifications.map(notification => (
              <div key={notification.id} className="p-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    {notification.type === 'session' && (
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600">📅</span>
                      </div>
                    )}
                    {notification.type === 'document' && (
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600">📄</span>
                      </div>
                    )}
                    {notification.type === 'feedback' && (
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <span className="text-yellow-600">💬</span>
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-900">{notification.message}</p>
                    <p className="text-sm text-gray-500">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meetings Tab */}
      {activeTab === 'meetings' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Upcoming Meetings</h2>
            <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-md hover:bg-[#e05500] transition-colors">
              Schedule Meeting
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="p-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">TechFlow Inc. - Business Model Review</h3>
                  <p className="text-gray-600 mt-1">📅 June 15, 2023 | 🕐 10:00 AM - 11:00 AM</p>
                  <p className="text-gray-600 mt-1">📍 Google Meet</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                    Reschedule
                  </button>
                  <button className="px-3 py-1 text-sm bg-[#FF6A00] text-white rounded-md hover:bg-[#e05500]">
                    Join Meeting
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">GreenEnergy Solutions - Funding Prep</h3>
                  <p className="text-gray-600 mt-1">📅 June 18, 2023 | 🕐 2:00 PM - 3:00 PM</p>
                  <p className="text-gray-600 mt-1">📍 Zoom</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                    Reschedule
                  </button>
                  <button className="px-3 py-1 text-sm bg-[#FF6A00] text-white rounded-md hover:bg-[#e05500]">
                    Join Meeting
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationCenter;