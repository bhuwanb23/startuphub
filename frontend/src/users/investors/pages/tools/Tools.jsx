import React, { useState } from 'react';
import ToolsSidebar from './components/ToolsSidebar';
import ValuationCalculators from './components/ValuationCalculators';
import TermSheetGenerator from './components/TermSheetGenerator';
import RiskAssessmentTools from './components/RiskAssessmentTools';
import PortfolioRiskSimulator from './components/PortfolioRiskSimulator';
import ExitPlanningTools from './components/ExitPlanningTools';
import DueDiligenceTemplates from './components/DueDiligenceTemplates';
import PolicyRegulationGuidelines from './components/PolicyRegulationGuidelines';
import LegalDocsRepository from './components/LegalDocsRepository';

const Tools = () => {
  const [activeSection, setActiveSection] = useState('calculators');
  const [searchTerm, setSearchTerm] = useState('');

  const renderActiveComponent = () => {
    switch (activeSection) {
      case 'calculators':
        return <ValuationCalculators />;
      case 'terms':
        return <TermSheetGenerator />;
      case 'risk':
        return <RiskAssessmentTools />;
      case 'simulator':
        return <PortfolioRiskSimulator />;
      case 'exit':
        return <ExitPlanningTools />;
      case 'templates':
        return <DueDiligenceTemplates />;
      case 'guidelines':
        return <PolicyRegulationGuidelines />;
      case 'legal':
        return <LegalDocsRepository />;
      default:
        return <ValuationCalculators />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <ToolsSidebar 
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

export default Tools;