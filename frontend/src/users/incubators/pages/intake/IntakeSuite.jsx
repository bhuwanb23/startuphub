import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SidebarNavigation from './components/SidebarNavigation';
import IntakePortal from './components/IntakePortal';
import ApplicationSubmissions from './components/ApplicationSubmissions';
import DocumentVerification from './components/DocumentVerification';
import EligibilityChecks from './components/EligibilityChecks';
import AIScreeningSystem from './components/AIScreeningSystem';
import EvaluationWorkspace from './components/EvaluationWorkspace';
import ExpertPanel from './components/ExpertPanel';
import Shortlisting from './components/Shortlisting';
import RejectionReasons from './components/RejectionReasons';
import ProgramEnrollment from './components/ProgramEnrollment';

// Create a component that includes the sidebar and renders the appropriate content
const IntakeLayout = ({ children }) => {
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

const IntakeSuite = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Startup Intake & Screening Suite</h1>
        <p className="text-gray-600">Professional evaluation environment for startup applications</p>
      </div>
      
      {/* Using Routes directly without wrapping in Router since parent Router exists */}
      <Routes>
        <Route index element={
          <IntakeLayout>
            <IntakePortal />
          </IntakeLayout>
        } />
        <Route path="submissions" element={
          <IntakeLayout>
            <ApplicationSubmissions />
          </IntakeLayout>
        } />
        <Route path="documents" element={
          <IntakeLayout>
            <DocumentVerification />
          </IntakeLayout>
        } />
        <Route path="eligibility" element={
          <IntakeLayout>
            <EligibilityChecks />
          </IntakeLayout>
        } />
        <Route path="ai-screening" element={
          <IntakeLayout>
            <AIScreeningSystem />
          </IntakeLayout>
        } />
        <Route path="evaluation" element={
          <IntakeLayout>
            <EvaluationWorkspace />
          </IntakeLayout>
        } />
        <Route path="expert-panel" element={
          <IntakeLayout>
            <ExpertPanel />
          </IntakeLayout>
        } />
        <Route path="shortlisting" element={
          <IntakeLayout>
            <Shortlisting />
          </IntakeLayout>
        } />
        <Route path="rejections" element={
          <IntakeLayout>
            <RejectionReasons />
          </IntakeLayout>
        } />
        <Route path="enrollment" element={
          <IntakeLayout>
            <ProgramEnrollment />
          </IntakeLayout>
        } />
      </Routes>
    </div>
  );
};

export default IntakeSuite;