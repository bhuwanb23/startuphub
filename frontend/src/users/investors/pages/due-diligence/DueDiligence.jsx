import React, { useState } from 'react';
import DueDiligenceSidebar from './components/DueDiligenceSidebar';
import { DUE_DILIGENCE_NAVIGATION } from './constants/navigation';
import TractionDashboard from './components/traction/TractionDashboard';
import TechnologyAssessment from './components/technology/TechnologyAssessment';
import IPRStrengthScore from './components/ipr/IPRStrengthScore';
import FinancialHealthCheck from './components/financial/FinancialHealthCheck';
import MarketAnalysis from './components/market/MarketAnalysis';
import TeamEvaluation from './components/team/TeamEvaluation';
import RiskCompliance from './components/risk/RiskCompliance';
import ReportViewer from './components/report/ReportViewer';
import RightRail from './components/right-rail/RightRail';

const DueDiligence = () => {
  const [activeSection, setActiveSection] = useState('traction');

  // Mock data for all sections
  const mockData = {
    traction: {
      revenueData: [10000, 25000, 45000, 80000, 120000, 180000],
      customerData: [500, 1200, 2800, 5200, 8500, 12000],
      kpis: {
        monthlyGrowth: 24.5,
        churnRate: 3.2,
        ltv: 4500,
        cac: 850
      }
    },
    technology: {
      techReadiness: 8.7,
      codeQuality: 92,
      riskRating: 65,
      architecture: 'Microservices'
    },
    ipr: {
      patentCount: 12,
      noveltyScore: 8.9,
      claimsStrength: 7.8,
      expiryYears: 15
    },
    financial: {
      cashflow: [50000, 45000, 60000, 55000, 70000, 65000],
      burnRate: 45000,
      runway: 18,
      profitability: -12
    },
    market: {
      marketSize: 2500000000,
      opportunityIndex: 8.2,
      competitors: 15,
      sentiment: 7.5
    },
    team: {
      founders: [
        { name: 'Alex Johnson', role: 'CEO', experience: 15, score: 92 },
        { name: 'Sam Chen', role: 'CTO', experience: 12, score: 88 },
        { name: 'Maria Garcia', role: 'CMO', experience: 10, score: 85 }
      ],
      skillMatrix: {
        technical: 85,
        business: 90,
        leadership: 88
      },
      cohesion: 87
    },
    risk: {
      legalRisks: 2,
      compliance: 95,
      redFlags: [
        'Minor IP dispute with former employee',
        'Pending regulatory approval in EU'
      ]
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'traction':
        return <TractionDashboard data={mockData.traction} />;
      case 'technology':
        return <TechnologyAssessment data={mockData.technology} />;
      case 'ipr':
        return <IPRStrengthScore data={mockData.ipr} />;
      case 'financial':
        return <FinancialHealthCheck data={mockData.financial} />;
      case 'market':
        return <MarketAnalysis data={mockData.market} />;
      case 'team':
        return <TeamEvaluation data={mockData.team} />;
      case 'risk':
        return <RiskCompliance data={mockData.risk} />;
      case 'report':
        return <ReportViewer />;
      default:
        return <TractionDashboard data={mockData.traction} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-64 flex-shrink-0">
        <DueDiligenceSidebar 
          navigation={DUE_DILIGENCE_NAVIGATION} 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Central Analysis Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-white border-b border-gray-200 p-6">
            <h1 className="text-3xl font-bold text-gray-900">Startup Due Diligence Suite</h1>
            <p className="text-gray-600 mt-2">Advanced investment audit workspace</p>
          </div>
          
          <div className="flex-1 overflow-hidden p-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 h-full overflow-y-auto">
              {renderContent()}
            </div>
          </div>
        </div>
        
        {/* Right Insights Rail */}
        <div className="w-80 flex-shrink-0 border-l border-gray-200 bg-white p-6 overflow-y-auto">
          <RightRail data={mockData} activeSection={activeSection} />
        </div>
      </div>
    </div>
  );
};

export default DueDiligence;