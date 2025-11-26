import React, { useState } from 'react';
import CommunicationSidebar from './components/CommunicationSidebar';
import Inbox from './components/Inbox';
import DealChats from './components/DealChats';
import SharedDocumentRoom from './components/SharedDocumentRoom';
import NDAManager from './components/NDAManager';
import AnnouncementsBoard from './components/AnnouncementsBoard';
import NotificationCenter from './components/NotificationCenter';

const Communication = () => {
  const [activeSection, setActiveSection] = useState('messages');

  const renderActiveComponent = () => {
    switch (activeSection) {
      case 'messages':
        return <Inbox />;
      case 'chats':
        return <DealChats />;
      case 'documents':
        return <SharedDocumentRoom />;
      case 'nda':
        return <NDAManager />;
      case 'announcements':
        return <AnnouncementsBoard />;
      case 'notifications':
        return <NotificationCenter />;
      default:
        return <Inbox />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <CommunicationSidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default Communication;