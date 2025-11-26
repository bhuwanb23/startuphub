import React from 'react';
import OverviewSnapshot from '../components/OverviewSnapshot';
import InvestmentOpportunities from '../components/InvestmentOpportunities';
import SectorDealFlow from '../components/SectorDealFlow';
import PortfolioSnapshot from '../components/PortfolioSnapshot';
import DueDiligenceAlerts from '../components/DueDiligenceAlerts';
import RiskProfileAlerts from '../components/RiskProfileAlerts';
import StartupPipeline from '../components/StartupPipeline';
import NotificationsPanel from '../components/NotificationsPanel';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Investor Dashboard</h1>
        <p className="text-gray-600">Welcome back, John. Here's your investment overview.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Snapshot */}
          <OverviewSnapshot />
          
          {/* AI-Based Investment Opportunities */}
          <InvestmentOpportunities />
          
          {/* Sector-wise Deal Flow */}
          <SectorDealFlow />
          
          {/* Portfolio Snapshot */}
          <PortfolioSnapshot />
          
          {/* Pending Due Diligence */}
          <DueDiligenceAlerts />
          
          {/* Risk Profile Alerts */}
          <RiskProfileAlerts />
          
          {/* Startup Pipeline Board */}
          <StartupPipeline />
        </div>
        
        {/* Right Column - Notifications Panel */}
        <div className="lg:col-span-1">
          <NotificationsPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;