import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SidebarNavigation from './components/SidebarNavigation';
import CorporatePartnerships from './components/CorporatePartnerships';
import AcademicCollaboration from './components/AcademicCollaboration';
import StartupCollaboration from './components/StartupCollaboration';

const CollaborationLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/4 lg:w-1/5">
        <SidebarNavigation />
      </div>
      <div className="md:w-3/4 lg:w-4/5">
        {children}
      </div>
    </div>
  );
};

const CollaborationHub = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Collaboration & Partnership Hub</h1>
        <p className="text-gray-600">Manage and explore collaboration opportunities</p>
      </div>
      
      <Routes>
        <Route index element={<Navigate to="/incubators/collaboration/corporate" replace />} />
        <Route path="corporate" element={
          <CollaborationLayout>
            <CorporatePartnerships />
          </CollaborationLayout>
        } />
        <Route path="academic" element={
          <CollaborationLayout>
            <AcademicCollaboration />
          </CollaborationLayout>
        } />
        <Route path="startup" element={
          <CollaborationLayout>
            <StartupCollaboration />
          </CollaborationLayout>
        } />
      </Routes>
    </div>
  );
};

export default CollaborationHub;