import React, { useState } from 'react';
import ToolsSidebar from './components/ToolsSidebar';
import Templates from './components/Templates';
import CodeSnippets from './components/CodeSnippets';
import ApiKeys from './components/ApiKeys';
import DesignAssets from './components/DesignAssets';
import Checklists from './components/Checklists';
import Regulatory from './components/Regulatory';
import { TOOLS_NAVIGATION } from './constants/navigation';

const Tools = () => {
  const [activeSection, setActiveSection] = useState('templates');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'templates':
        return <Templates />;
      case 'code-snippets':
        return <CodeSnippets />;
      case 'api-keys':
        return <ApiKeys />;
      case 'design-assets':
        return <DesignAssets />;
      case 'checklists':
        return <Checklists />;
      case 'regulatory':
        return <Regulatory />;
      default:
        return <Templates />;
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-100px)]">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 border-r border-gray-200">
          <ToolsSidebar 
            navigation={TOOLS_NAVIGATION} 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6 bg-white overflow-y-auto">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default Tools;