import React, { useState } from 'react';
import PortfolioSidebar from './components/PortfolioSidebar';
import { PORTFOLIO_NAVIGATION } from './constants/navigation';
import PortfolioOverview from './components/overview/PortfolioOverview';
import StartupTracking from './components/tracking/StartupTracking';
import MetricsViewer from './components/metrics/MetricsViewer';
import FollowUpActions from './components/actions/FollowUpActions';
import AlertsCenter from './components/alerts/AlertsCenter';
import InvestmentDocuments from './components/documents/InvestmentDocuments';
import PortfolioHealth from './components/health/PortfolioHealth';
import CapitalTimeline from './components/timeline/CapitalTimeline';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <PortfolioOverview />;
      case 'tracking':
        return <StartupTracking />;
      case 'metrics':
        return <MetricsViewer />;
      case 'actions':
        return <FollowUpActions />;
      case 'alerts':
        return <AlertsCenter />;
      case 'documents':
        return <InvestmentDocuments />;
      case 'health':
        return <PortfolioHealth />;
      case 'timeline':
        return <CapitalTimeline />;
      default:
        return <PortfolioOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-64 flex-shrink-0">
        <PortfolioSidebar 
          navigation={PORTFOLIO_NAVIGATION} 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Management System</h1>
          <p className="text-gray-600 mt-2">Institutional-grade portfolio tracking and management</p>
        </div>
        
        {/* Page Content */}
        <div className="flex-1 overflow-hidden p-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 h-full overflow-y-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;