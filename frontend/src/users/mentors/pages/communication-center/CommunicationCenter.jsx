import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SidebarNavigation from './components/SidebarNavigation';
import Inbox from './components/Inbox';
import MentorStartupChat from './components/MentorStartupChat';
import VideoMeetingLinksManager from './components/VideoMeetingLinksManager';
import DocumentExchangeRoom from './components/DocumentExchangeRoom';
import GroupDiscussions from './components/GroupDiscussions';
import AnnouncementsUpdates from './components/AnnouncementsUpdates';
import NotificationCenter from './components/NotificationCenter';

// Create a component that includes the sidebar and renders the appropriate content
const CommunicationLayout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/4">
        <SidebarNavigation />
      </div>
      <div className="lg:w-3/4">
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
        <p className="text-gray-600">Unified communication hub for all mentoring activities</p>
      </div>
      
      {/* Using Routes directly without wrapping in Router since parent Router exists */}
      <Routes>
        <Route path="/" element={
          <CommunicationLayout>
            <Inbox />
          </CommunicationLayout>
        } />
        <Route path="/inbox" element={
          <CommunicationLayout>
            <Inbox />
          </CommunicationLayout>
        } />
        <Route path="/chat" element={
          <CommunicationLayout>
            <MentorStartupChat />
          </CommunicationLayout>
        } />
        <Route path="/video-meetings" element={
          <CommunicationLayout>
            <VideoMeetingLinksManager />
          </CommunicationLayout>
        } />
        <Route path="/documents" element={
          <CommunicationLayout>
            <DocumentExchangeRoom />
          </CommunicationLayout>
        } />
        <Route path="/groups" element={
          <CommunicationLayout>
            <GroupDiscussions />
          </CommunicationLayout>
        } />
        <Route path="/announcements" element={
          <CommunicationLayout>
            <AnnouncementsUpdates />
          </CommunicationLayout>
        } />
        <Route path="/notifications" element={
          <CommunicationLayout>
            <NotificationCenter />
          </CommunicationLayout>
        } />
      </Routes>
    </div>
  );
};

export default CommunicationCenter;