import React, { useState } from 'react';
import CollaborationSidebar from './components/CollaborationSidebar';
import FindResearchers from './components/FindResearchers';
import FindCoFounders from './components/FindCoFounders';
import ConnectInnovators from './components/ConnectInnovators';
import ExpertMarketplace from './components/ExpertMarketplace';
import CollaborationBoard from './components/CollaborationBoard';
import MessagingCenter from './components/MessagingCenter';
import Matchmaking from './components/Matchmaking';
import { COLLABORATION_NAVIGATION } from './constants/navigation';

const Collaboration = () => {
  const [activeSection, setActiveSection] = useState('find-researchers');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'find-researchers':
        return <FindResearchers />;
      case 'find-cofounders':
        return <FindCoFounders />;
      case 'connect-innovators':
        return <ConnectInnovators />;
      case 'expert-marketplace':
        return <ExpertMarketplace />;
      case 'collaboration-board':
        return <CollaborationBoard />;
      case 'messaging-center':
        return <MessagingCenter />;
      case 'matchmaking':
        return <Matchmaking />;
      default:
        return <FindResearchers />;
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-100px)]">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 border-r border-gray-200">
          <CollaborationSidebar 
            navigation={COLLABORATION_NAVIGATION} 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6 bg-white overflow-y-auto">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default Collaboration;