import React, { useState } from 'react';
import IPRSidebar from './components/IPRSidebar';
import PatentDrafting from './components/PatentDrafting';
import PriorArtSearch from './components/PriorArtSearch';
import PatentFiling from './components/PatentFiling';
import TrademarkTools from './components/TrademarkTools';
import CopyrightTools from './components/CopyrightTools';
import IPRStatusTracker from './components/IPRStatusTracker';
import IPRAnalytics from './components/IPRAnalytics';
import RenewalAlerts from './components/RenewalAlerts';
import { IPR_NAVIGATION } from './constants/navigation';

const IPR = () => {
  const [activeSection, setActiveSection] = useState('patent-drafting');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'patent-drafting':
        return <PatentDrafting />;
      case 'prior-art-search':
        return <PriorArtSearch />;
      case 'patent-filing':
        return <PatentFiling />;
      case 'trademark-tools':
        return <TrademarkTools />;
      case 'copyright-tools':
        return <CopyrightTools />;
      case 'ipr-status-tracker':
        return <IPRStatusTracker />;
      case 'ipr-analytics':
        return <IPRAnalytics />;
      case 'renewal-alerts':
        return <RenewalAlerts />;
      default:
        return <PatentDrafting />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 border-r border-gray-200">
          <IPRSidebar 
            navigation={IPR_NAVIGATION} 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6 bg-white">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default IPR;