import React, { useState } from 'react';
import CollaborationSidebar from './components/CollaborationSidebar';
import GovernmentHub from './components/GovernmentHub';
import ResearchNetwork from './components/ResearchNetwork';
import CoInvestorMarketplace from './components/CoInvestorMarketplace';
import SyndicateBuilder from './components/SyndicateBuilder';
import HighImpactProjects from './components/HighImpactProjects';
import FundingOpportunities from './components/FundingOpportunities';
import CoFundingEngine from './components/CoFundingEngine';

const Collaboration = () => {
  const [activeSection, setActiveSection] = useState('government');

  const renderActiveComponent = () => {
    switch (activeSection) {
      case 'government':
        return <GovernmentHub />;
      case 'research':
        return <ResearchNetwork />;
      case 'investors':
        return <CoInvestorMarketplace />;
      case 'syndicates':
        return <SyndicateBuilder />;
      case 'projects':
        return <HighImpactProjects />;
      case 'funding':
        return <FundingOpportunities />;
      case 'recommendations':
        return <CoFundingEngine />;
      default:
        return <GovernmentHub />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <CollaborationSidebar 
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

export default Collaboration;