import React, { useState } from 'react';
import GrowthSidebar from './components/GrowthSidebar';
import InvestorDashboard from './components/InvestorDashboard';
import UserGrowth from './components/UserGrowth';
import RevenueFinancials from './components/RevenueFinancials';
import TractionData from './components/TractionData';
import CacLtv from './components/CacLtv';
import PowerBiReports from './components/PowerBiReports';
import HealthScore from './components/HealthScore';
import { GROWTH_NAVIGATION } from './constants/navigation';

const Growth = () => {
  const [activeSection, setActiveSection] = useState('investor-dashboard');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'investor-dashboard':
        return <InvestorDashboard />;
      case 'user-growth':
        return <UserGrowth />;
      case 'revenue-financials':
        return <RevenueFinancials />;
      case 'traction-data':
        return <TractionData />;
      case 'cac-ltv':
        return <CacLtv />;
      case 'powerbi-reports':
        return <PowerBiReports />;
      case 'health-score':
        return <HealthScore />;
      default:
        return <InvestorDashboard />;
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-100px)]">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 border-r border-gray-200">
          <GrowthSidebar 
            navigation={GROWTH_NAVIGATION} 
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

export default Growth;