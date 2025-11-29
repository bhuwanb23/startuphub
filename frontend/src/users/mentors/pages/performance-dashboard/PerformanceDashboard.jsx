import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SidebarNavigation from './components/SidebarNavigation';
import StartupProgressScore from './components/StartupProgressScore';
import SessionImpactMetrics from './components/SessionImpactMetrics';
import MentorContributionAnalytics from './components/MentorContributionAnalytics';
import FeedbackReceived from './components/FeedbackReceived';
import DomainImpactHeatmap from './components/DomainImpactHeatmap';
import MentoringHoursLog from './components/MentoringHoursLog';
import RecognitionBadges from './components/RecognitionBadges';
import MentorLeaderboard from './components/MentorLeaderboard';

// Create a component that uses useLocation to determine which component to render
const DashboardContent = () => {
  const location = useLocation();
  
  // For the root path, show the default component
  if (location.pathname === '/' || location.pathname === '') {
    return (
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4">
          <SidebarNavigation />
        </div>
        <div className="lg:w-3/4">
          <StartupProgressScore />
        </div>
      </div>
    );
  }
  
  // Extract the view type from the path
  // Remove leading slash and get the first segment
  const pathSegments = location.pathname.replace(/^\//, '').split('/');
  const viewType = pathSegments[0] || 'startup-progress';
  
  const renderComponent = () => {
    switch (viewType) {
      case 'startup-progress':
        return <StartupProgressScore />;
      case 'session-impact':
        return <SessionImpactMetrics />;
      case 'contribution-analytics':
        return <MentorContributionAnalytics />;
      case 'feedback':
        return <FeedbackReceived />;
      case 'domain-heatmap':
        return <DomainImpactHeatmap />;
      case 'hours-log':
        return <MentoringHoursLog />;
      case 'recognition':
        return <RecognitionBadges />;
      case 'leaderboard':
        return <MentorLeaderboard />;
      default:
        return <StartupProgressScore />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/4">
        <SidebarNavigation />
      </div>
      <div className="lg:w-3/4">
        {renderComponent()}
      </div>
    </div>
  );
};

const PerformanceDashboard = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mentor Performance & Impact Dashboard</h1>
        <p className="text-gray-600">Track your mentoring effectiveness and startup impact</p>
      </div>
      
      {/* Using Routes directly without wrapping in Router since parent Router exists */}
      <Routes>
        <Route path="/" element={<DashboardContent />} />
        <Route path="*" element={<DashboardContent />} />
      </Routes>
    </div>
  );
};

export default PerformanceDashboard;