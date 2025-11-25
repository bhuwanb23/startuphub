import React, { useState } from 'react';
import ProfileSidebar from './components/ProfileSidebar';
import CompanyDetails from './components/CompanyDetails';
import TeamMembers from './components/TeamMembers';
import Documents from './components/Documents';
import BusinessModel from './components/BusinessModel';
import PitchDeck from './components/PitchDeck';
import ComplianceDocs from './components/ComplianceDocs';
import { PROFILE_NAVIGATION } from './constants/navigation';

const Profile = () => {
  const [activeSection, setActiveSection] = useState('company-details');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'company-details':
        return <CompanyDetails />;
      case 'team-members':
        return <TeamMembers />;
      case 'documents':
        return <Documents />;
      case 'business-model':
        return <BusinessModel />;
      case 'pitch-deck':
        return <PitchDeck />;
      case 'compliance':
        return <ComplianceDocs />;
      default:
        return <CompanyDetails />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 border-r border-gray-200">
          <ProfileSidebar 
            navigation={PROFILE_NAVIGATION} 
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

export default Profile;