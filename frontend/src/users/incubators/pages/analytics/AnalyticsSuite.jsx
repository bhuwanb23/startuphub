import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SidebarNavigation from './components/SidebarNavigation';

// Import all subpage components
import StartupPerformance from './components/StartupPerformance';
import KPIMetrics from './components/KPIMetrics';
import ProductReadiness from './components/ProductReadiness';
import TRLScore from './components/TRLScore';
import MarketValidation from './components/MarketValidation';
import CohortPerformance from './components/CohortPerformance';
import GrowthHeatmap from './components/GrowthHeatmap';
import MentorEngagement from './components/MentorEngagement';
import InvestorMetrics from './components/InvestorMetrics';
import MonthlyReports from './components/MonthlyReports';
import CustomReports from './components/CustomReports';
import ExportOptions from './components/ExportOptions';
import AutomatedAlerts from './components/AutomatedAlerts';

// Create a component that includes the sidebar and renders the appropriate content
const AnalyticsLayout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/5">
        <SidebarNavigation />
      </div>
      <div className="lg:w-4/5">
        {children}
      </div>
    </div>
  );
};

const AnalyticsSuite = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Progress Tracking & Startup Analytics</h1>
        <p className="text-gray-600">Data-rich analytics dashboard for startup progress tracking</p>
      </div>
      
      {/* Using Routes directly without wrapping in Router since parent Router exists */}
      <Routes>
        <Route index element={
          <AnalyticsLayout>
            <StartupPerformance />
          </AnalyticsLayout>
        } />
        <Route path="performance" element={
          <AnalyticsLayout>
            <StartupPerformance />
          </AnalyticsLayout>
        } />
        <Route path="kpi" element={
          <AnalyticsLayout>
            <KPIMetrics />
          </AnalyticsLayout>
        } />
        <Route path="readiness" element={
          <AnalyticsLayout>
            <ProductReadiness />
          </AnalyticsLayout>
        } />
        <Route path="trl" element={
          <AnalyticsLayout>
            <TRLScore />
          </AnalyticsLayout>
        } />
        <Route path="validation" element={
          <AnalyticsLayout>
            <MarketValidation />
          </AnalyticsLayout>
        } />
        <Route path="cohort" element={
          <AnalyticsLayout>
            <CohortPerformance />
          </AnalyticsLayout>
        } />
        <Route path="heatmap" element={
          <AnalyticsLayout>
            <GrowthHeatmap />
          </AnalyticsLayout>
        } />
        <Route path="mentors" element={
          <AnalyticsLayout>
            <MentorEngagement />
          </AnalyticsLayout>
        } />
        <Route path="investors" element={
          <AnalyticsLayout>
            <InvestorMetrics />
          </AnalyticsLayout>
        } />
        <Route path="reports" element={
          <AnalyticsLayout>
            <MonthlyReports />
          </AnalyticsLayout>
        } />
        <Route path="custom-reports" element={
          <AnalyticsLayout>
            <CustomReports />
          </AnalyticsLayout>
        } />
        <Route path="export" element={
          <AnalyticsLayout>
            <ExportOptions />
          </AnalyticsLayout>
        } />
        <Route path="alerts" element={
          <AnalyticsLayout>
            <AutomatedAlerts />
          </AnalyticsLayout>
        } />
      </Routes>
    </div>
  );
};

export default AnalyticsSuite;