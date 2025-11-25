import React, { useState } from 'react';
import ResourcesSidebar from './components/ResourcesSidebar';
import MentorMatching from './components/MentorMatching';
import InvestorMatching from './components/InvestorMatching';
import FundingMatching from './components/FundingMatching';
import SkillGapDetection from './components/SkillGapDetection';
import TeamRoleRecommendations from './components/TeamRoleRecommendations';
import ResourceForecasting from './components/ResourceForecasting';
import { RESOURCES_NAVIGATION } from './constants/navigation';

const Resources = () => {
  const [activeSection, setActiveSection] = useState('mentor-matching');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'mentor-matching':
        return <MentorMatching />;
      case 'investor-matching':
        return <InvestorMatching />;
      case 'funding-matching':
        return <FundingMatching />;
      case 'skill-gap-detection':
        return <SkillGapDetection />;
      case 'team-role-recommendations':
        return <TeamRoleRecommendations />;
      case 'resource-forecasting':
        return <ResourceForecasting />;
      default:
        return <MentorMatching />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 border-r border-gray-200">
          <ResourcesSidebar 
            navigation={RESOURCES_NAVIGATION} 
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

export default Resources;