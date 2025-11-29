import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SidebarNavigation from './components/SidebarNavigation';

// Import all subpage components
import MentorMatching from './components/MentorMatching';
import InvestorMatching from './components/InvestorMatching';
import CoachingLogs from './components/CoachingLogs';

// Create a component that includes the sidebar and renders the appropriate content
const MatchingLayout = ({ children }) => {
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

const MentorInvestorMatching = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mentor & Investor Matching System</h1>
        <p className="text-gray-600">Modern matching system for mentors and investors</p>
      </div>
      
      {/* Using Routes directly without wrapping in Router since parent Router exists */}
      <Routes>
        <Route index element={
          <MatchingLayout>
            <MentorMatching />
          </MatchingLayout>
        } />
        <Route path="mentors" element={
          <MatchingLayout>
            <MentorMatching />
          </MatchingLayout>
        } />
        <Route path="investors" element={
          <MatchingLayout>
            <InvestorMatching />
          </MatchingLayout>
        } />
        <Route path="logs" element={
          <MatchingLayout>
            <CoachingLogs />
          </MatchingLayout>
        } />
      </Routes>
    </div>
  );
};

export default MentorInvestorMatching;