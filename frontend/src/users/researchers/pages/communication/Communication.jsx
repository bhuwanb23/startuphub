import React, { useState } from 'react';
import Inbox from './components/Inbox';
import CollaborationChats from './components/CollaborationChats';
import DocumentSharing from './components/DocumentSharing';
import VideoMeetings from './components/VideoMeetings';
import Announcements from './components/Announcements';
import Notifications from './components/Notifications';

const Communication = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'inbox', name: 'Inbox', icon: '✉️' },
    { id: 'chats', name: 'Collaboration Chats', icon: '💬' },
    { id: 'documents', name: 'Document Sharing', icon: '📂' },
    { id: 'meetings', name: 'Video Meetings', icon: '📹' },
    { id: 'announcements', name: 'Announcements', icon: '📢' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'inbox':
        return <Inbox />;
      case 'chats':
        return <CollaborationChats />;
      case 'documents':
        return <DocumentSharing />;
      case 'meetings':
        return <VideoMeetings />;
      case 'announcements':
        return <Announcements />;
      case 'notifications':
        return <Notifications />;
      default:
        return <Inbox />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">📬 Communication Center</h1>
              <p className="text-gray-600">Collaborate, exchange ideas, and manage research discussions</p>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Search messages, documents, people..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
              
              <button className="bg-white hover:bg-gray-50 border border-gray-300 p-2 rounded-lg shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Menu */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4 border border-orange-100">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === tab.id
                        ? 'bg-orange-100 text-orange-800 border border-orange-200'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
              {renderActiveTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;