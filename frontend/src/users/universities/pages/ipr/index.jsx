import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { SidebarNavigation } from './components';

// Import all subpage components
import {
  IPRLanding,
  PatentDraftingAssistant,
  PriorArtSearch,
  ClaimGenerationTools,
  IPRFilingWorkflow,
  IPStatusRenewalTracker,
  FacultyResearchIPScore,
  LicensingOpportunities,
  TechTransferReadiness,
  IndustryFitRecommendations,
  MarketFitReport,
  CommercialPotentialScore,
  ResearchPaperUpload,
  PrototypeSubmission,
  ExperimentLogs,
  LabNoteArchive,
  ResearchReviewSystem
} from './pages';

const IPRHub = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route index element={<IPRLanding />} />
            
            {/* IPR Tools & Management Routes */}
            <Route path="ipr-tools/patent-drafting" element={<PatentDraftingAssistant />} />
            <Route path="ipr-tools/prior-art-search" element={<PriorArtSearch />} />
            <Route path="ipr-tools/claim-generation" element={<ClaimGenerationTools />} />
            <Route path="ipr-tools/filing-workflow" element={<IPRFilingWorkflow />} />
            <Route path="ipr-tools/status-renewal" element={<IPStatusRenewalTracker />} />
            <Route path="ipr-tools/faculty-ip-score" element={<FacultyResearchIPScore />} />
            
            {/* Tech Transfer Office Routes */}
            <Route path="tech-transfer/licensing" element={<LicensingOpportunities />} />
            <Route path="tech-transfer/readiness" element={<TechTransferReadiness />} />
            <Route path="tech-transfer/industry-fit" element={<IndustryFitRecommendations />} />
            
            {/* Commercial Potential Reports Routes */}
            <Route path="reports/market-fit" element={<MarketFitReport />} />
            <Route path="reports/commercial-potential" element={<CommercialPotentialScore />} />
            
            {/* Research Repository Routes */}
            <Route path="repository/papers" element={<ResearchPaperUpload />} />
            <Route path="repository/prototypes" element={<PrototypeSubmission />} />
            <Route path="repository/experiments" element={<ExperimentLogs />} />
            <Route path="repository/lab-notes" element={<LabNoteArchive />} />
            <Route path="repository/review-system" element={<ResearchReviewSystem />} />
            
            {/* Redirect to main page if no route matches */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default IPRHub;