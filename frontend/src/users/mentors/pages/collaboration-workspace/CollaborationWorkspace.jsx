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

// Create a component that uses useLocation to determine which component to render
const WorkspaceContent = () => {
  const location = useLocation();
  
  // Extract the last part of the path to determine which component to show
  // For paths like /mentors/collaboration/knowledge-sharing, we want 'knowledge-sharing'
  // For paths like /mentors/collaboration, we want 'shared-resource-library' (default)
  const pathParts = location.pathname.split('/').filter(part => part !== '');
  let viewType = 'shared-resource-library';
  
  // Find the collaboration part and get what comes after it
  const collaborationIndex = pathParts.indexOf('collaboration');
  if (collaborationIndex !== -1 && collaborationIndex < pathParts.length - 1) {
    viewType = pathParts[collaborationIndex + 1];
  } else if (collaborationIndex !== -1 && pathParts[pathParts.length - 1] === 'collaboration') {
    viewType = 'shared-resource-library';
  }
  
  const renderComponent = () => {
    switch (viewType) {
      case 'shared-resource-library':
        return <SharedResourceLibrary />;
      case 'knowledge-sharing':
        return <KnowledgeSharingBoard />;
      case 'guidebook-templates':
        return <GuidebookTemplates />;
      case 'co-author-docs':
        return <CoAuthorDocuments />;
      case 'whiteboard':
        return <SharedWhiteboard />;
      case 'discussion-channels':
        return <DiscussionChannels />;
      case 'workspace-rooms':
        return <WorkspaceRooms />;
      case 'best-practices':
        return <BestPractices />;
      default:
        return <SharedResourceLibrary />;
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

const CollaborationWorkspace = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Collaborative Workspace</h1>
        <p className="text-gray-600">Work together with your mentees on projects and documents</p>
      </div>
      
      {/* Using Routes directly without wrapping in Router since parent Router exists */}
      <Routes>
        <Route path="/" element={<WorkspaceContent />} />
      </Routes>
    </div>
  );
};

export default CollaborationWorkspace;