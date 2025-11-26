import React, { useState } from 'react';
import InsightsSidebar from './components/InsightsSidebar';
import EmergingTrends from './components/EmergingTrends';
import MarketPredictions from './components/MarketPredictions';
import SectorScoreboard from './components/SectorScoreboard';
import CompetitiveLandscape from './components/CompetitiveLandscape';
import RiskIndicators from './components/RiskIndicators';
import InvestmentReports from './components/InvestmentReports';
import InvestmentHeatmaps from './components/InvestmentHeatmaps';
import ResearchLibrary from './components/ResearchLibrary';

const Insights = () => {
  const [activeSection, setActiveSection] = useState('trends');
  const [searchTerm, setSearchTerm] = useState('');

  const renderActiveComponent = () => {
    switch (activeSection) {
      case 'trends':
        return <EmergingTrends />;
      case 'predictions':
        return <MarketPredictions />;
      case 'sectors':
        return <SectorScoreboard />;
      case 'competitive':
        return <CompetitiveLandscape />;
      case 'risk':
        return <RiskIndicators />;
      case 'reports':
        return <InvestmentReports />;
      case 'heatmap':
        return <InvestmentHeatmaps />;
      case 'library':
        return <ResearchLibrary />;
      default:
        return <EmergingTrends />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <InsightsSidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
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

export default Insights;