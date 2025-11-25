import React, { useState } from 'react';
import WorkflowSidebar from './components/WorkflowSidebar';
import ProjectWorkflows from './components/ProjectWorkflows';
import AutoTodos from './components/AutoTodos';
import ComplianceDeadlines from './components/ComplianceDeadlines';
import MilestoneManagement from './components/MilestoneManagement';
import DocumentAutomation from './components/DocumentAutomation';
import StatusReports from './components/StatusReports';
import { WORKFLOW_NAVIGATION } from './constants/navigation';

const Workflow = () => {
  const [activeSection, setActiveSection] = useState('project-workflows');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'project-workflows':
        return <ProjectWorkflows />;
      case 'auto-todos':
        return <AutoTodos />;
      case 'compliance-deadlines':
        return <ComplianceDeadlines />;
      case 'milestone-management':
        return <MilestoneManagement />;
      case 'document-automation':
        return <DocumentAutomation />;
      case 'status-reports':
        return <StatusReports />;
      default:
        return <ProjectWorkflows />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 border-r border-gray-200">
          <WorkflowSidebar 
            navigation={WORKFLOW_NAVIGATION} 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6 bg-white">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default Workflow;