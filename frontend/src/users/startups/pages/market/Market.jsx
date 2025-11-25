import React, { useState } from 'react';
import MarketSidebar from './components/MarketSidebar';
import MarketSegmentation from './components/MarketSegmentation';
import CompetitorAnalysis from './components/CompetitorAnalysis';
import TrendInsights from './components/TrendInsights';
import OpportunityScoring from './components/OpportunityScoring';
import PersonaBuilder from './components/PersonaBuilder';
import ProductPositioning from './components/ProductPositioning';
import IndustryReports from './components/IndustryReports';
import { MARKET_NAVIGATION } from './constants/navigation';

const Market = () => {
  const [activeSection, setActiveSection] = useState('market-segmentation');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'market-segmentation':
        return <MarketSegmentation />;
      case 'competitor-analysis':
        return <CompetitorAnalysis />;
      case 'trend-insights':
        return <TrendInsights />;
      case 'opportunity-scoring':
        return <OpportunityScoring />;
      case 'persona-builder':
        return <PersonaBuilder />;
      case 'product-positioning':
        return <ProductPositioning />;
      case 'industry-reports':
        return <IndustryReports />;
      default:
        return <MarketSegmentation />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 border-r border-gray-200">
          <MarketSidebar 
            navigation={MARKET_NAVIGATION} 
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

export default Market;