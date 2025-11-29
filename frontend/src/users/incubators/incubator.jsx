import React from 'react';
import { Routes, Route } from 'react-router-dom';
import IncubatorLayout from './components/IncubatorLayout';

// Import page components
import IncubatorDashboard from './pages/dashboard';
import StartupIntake from './pages/intake';
import CohortManagement from './pages/cohorts';
import ProgressAnalytics from './pages/analytics';
import MentorInvestorMatching from './pages/matching';
import FundingSupport from './pages/funding';
import ResourceManager from './pages/resources';
import CollaborationHub from './pages/collaboration';
import IncubatorTools from './pages/tools';
import IncubatorCommunication from './pages/communication';

const Incubator = () => {
  return (
    <IncubatorLayout>
      <Routes>
        <Route path="/dashboard" element={<IncubatorDashboard />} />
        <Route path="/intake/*" element={<StartupIntake />} />
        <Route path="/cohorts/*" element={<CohortManagement />} />
        <Route path="/analytics/*" element={<ProgressAnalytics />} />
        <Route path="/matching/*" element={<MentorInvestorMatching />} />
        <Route path="/funding/*" element={<FundingSupport />} />
        <Route path="/resources/*" element={<ResourceManager />} />
        <Route path="/collaboration/*" element={<CollaborationHub />} />
        <Route path="/tools" element={<IncubatorTools />} />
        <Route path="/communication" element={<IncubatorCommunication />} />
        <Route path="/" element={<IncubatorDashboard />} />
      </Routes>
    </IncubatorLayout>
  );
};

export default Incubator;