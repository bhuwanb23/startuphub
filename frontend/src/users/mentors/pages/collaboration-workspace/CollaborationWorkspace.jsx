import { Routes, Route, useLocation } from 'react-router-dom';
import SidebarNavigation from './components/SidebarNavigation';
import SharedResourceLibrary from './components/SharedResourceLibrary';
import KnowledgeSharingBoard from './components/KnowledgeSharingBoard';
import GuidebookTemplates from './components/GuidebookTemplates';
import CoAuthorDocuments from './components/CoAuthorDocuments';
import SharedWhiteboard from './components/SharedWhiteboard';
import DiscussionChannels from './components/DiscussionChannels';
import WorkspaceRooms from './components/WorkspaceRooms';
import BestPractices from './components/BestPractices';

// Create a component that includes the sidebar and renders the appropriate content
const WorkspaceLayout = ({ children }) => {
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

const CollaborationWorkspace = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Collaborative Workspace</h1>
        <p className="text-gray-600">Work together with your mentees on projects and documents</p>
      </div>
      
      {/* Using Routes directly without wrapping in Router since parent Router exists */}
      <Routes>
        <Route path="/" element={
          <WorkspaceLayout>
            <SharedResourceLibrary />
          </WorkspaceLayout>
        } />
        <Route path="/knowledge-sharing" element={
          <WorkspaceLayout>
            <KnowledgeSharingBoard />
          </WorkspaceLayout>
        } />
        <Route path="/guidebook-templates" element={
          <WorkspaceLayout>
            <GuidebookTemplates />
          </WorkspaceLayout>
        } />
        <Route path="/co-author-docs" element={
          <WorkspaceLayout>
            <CoAuthorDocuments />
          </WorkspaceLayout>
        } />
        <Route path="/whiteboard" element={
          <WorkspaceLayout>
            <SharedWhiteboard />
          </WorkspaceLayout>
        } />
        <Route path="/discussion-channels" element={
          <WorkspaceLayout>
            <DiscussionChannels />
          </WorkspaceLayout>
        } />
        <Route path="/workspace-rooms" element={
          <WorkspaceLayout>
            <WorkspaceRooms />
          </WorkspaceLayout>
        } />
        <Route path="/best-practices" element={
          <WorkspaceLayout>
            <BestPractices />
          </WorkspaceLayout>
        } />
      </Routes>
    </div>
  );
};

export default CollaborationWorkspace;