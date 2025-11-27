import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MentorLayout from './components/MentorLayout';

// Import page components
import MentorDashboard from './pages/dashboard';
import StartupMatching from './pages/startup-matching';
import SessionPlanning from './pages/session-planning';
import PerformanceDashboard from './pages/performance-dashboard';
import CollaborationWorkspace from './pages/collaboration-workspace';
import MentorTools from './pages/mentor-tools';
import CommunicationCenter from './pages/communication-center';

const Mentors = () => {
  return (
    <MentorLayout>
      <Routes>
        <Route path="/dashboard" element={<MentorDashboard />} />
        <Route path="/startup-matching" element={<StartupMatching />} />
        <Route path="/session-planning" element={<SessionPlanning />} />
        <Route path="/performance" element={<PerformanceDashboard />} />
        <Route path="/collaboration/*" element={<CollaborationWorkspace />} />
        <Route path="/tools" element={<MentorTools />} />
        <Route path="/communication" element={<CommunicationCenter />} />
        <Route path="/" element={<MentorDashboard />} />
      </Routes>
    </MentorLayout>
  );
};

export default Mentors;