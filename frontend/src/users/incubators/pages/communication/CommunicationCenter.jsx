import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SidebarNavigation from './components/SidebarNavigation';
import Inbox from './components/Inbox';
import StartupChats from './components/StartupChats';
import MentorChats from './components/MentorChats';
import GroupDiscussions from './components/GroupDiscussions';
import Announcements from './components/Announcements';
import NotificationCenter from './components/NotificationCenter';
import DocumentExchange from './components/DocumentExchange';

const CommunicationLayout = ({ children }) => {
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

const CommunicationCenter = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Communication Center</h1>
        <p className="text-gray-600">Centralized hub for all communication and collaboration</p>
      </div>
      
      <Routes>
        <Route index element={<Navigate to="/incubators/communication/inbox" replace />} />
        <Route path="inbox" element={
          <CommunicationLayout>
            <Inbox />
          </CommunicationLayout>
        } />
        <Route path="startups" element={
          <CommunicationLayout>
            <StartupChats />
          </CommunicationLayout>
        } />
        <Route path="mentors" element={
          <CommunicationLayout>
            <MentorChats />
          </CommunicationLayout>
        } />
        <Route path="groups" element={
          <CommunicationLayout>
            <GroupDiscussions />
          </CommunicationLayout>
        } />
        <Route path="announcements" element={
          <CommunicationLayout>
            <Announcements />
          </CommunicationLayout>
        } />
        <Route path="notifications" element={
          <CommunicationLayout>
            <NotificationCenter />
          </CommunicationLayout>
        } />
        <Route path="documents" element={
          <CommunicationLayout>
            <DocumentExchange />
          </CommunicationLayout>
        } />
      </Routes>
    </div>
  );
};

export default CommunicationCenter;