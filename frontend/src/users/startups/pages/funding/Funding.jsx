import React, { useState } from 'react';
import FundingSidebar from './components/FundingSidebar';
import InvestorMatching from './components/InvestorMatching';
import FundingPrograms from './components/FundingPrograms';
import PitchTools from './components/PitchTools';
import LoiManager from './components/LoiManager';
import DueDiligence from './components/DueDiligence';
import ReadinessScore from './components/ReadinessScore';
import CapTable from './components/CapTable';
import OutreachTracker from './components/OutreachTracker';
import { FUNDING_NAVIGATION } from './constants/navigation';

const Funding = () => {
  const [activeSection, setActiveSection] = useState('investor-matching');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'investor-matching':
        return <InvestorMatching />;
      case 'funding-programs':
        return <FundingPrograms />;
      case 'pitch-tools':
        return <PitchTools />;
      case 'loi-manager':
        return <LoiManager />;
      case 'due-diligence':
        return <DueDiligence />;
      case 'readiness-score':
        return <ReadinessScore />;
      case 'cap-table':
        return <CapTable />;
      case 'outreach-tracker':
        return <OutreachTracker />;
      default:
        return <InvestorMatching />;
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-100px)]">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 border-r border-gray-200">
          <FundingSidebar 
            navigation={FUNDING_NAVIGATION} 
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

export default Funding;