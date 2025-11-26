import React, { useState } from 'react';
import ProjectLibrary from './components/ProjectLibrary';
import UploadCenter from './components/UploadCenter';
import AITools from './components/AITools';
import CollaborationControls from './components/CollaborationControls';

const Repository = () => {
  const [activeTab, setActiveTab] = useState('library');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const tabs = [
    { id: 'library', name: 'Research Project Library' },
    { id: 'drafts', name: 'Drafts & Manuscripts' },
    { id: 'prototypes', name: 'Prototype Files' },
    { id: 'experiments', name: 'Experiment Logs' },
    { id: 'datasets', name: 'Datasets & Evidence' },
    { id: 'notes', name: 'Research Notes' },
    { id: 'history', name: 'Version History Timeline' },
    { id: 'download', name: 'Download/Share Options' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">📚 Innovation Repository</h1>
        <p className="text-gray-600 mt-2">Manage your research projects, drafts, and documentation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Content Area */}
        <div>
          {/* Tab Navigation */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#FF6A00] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {activeTab === 'library' && <ProjectLibrary viewMode={viewMode} setViewMode={setViewMode} />}
            {activeTab === 'drafts' && <div>Drafts & Manuscripts content</div>}
            {activeTab === 'prototypes' && <div>Prototype Files content</div>}
            {activeTab === 'experiments' && <div>Experiment Logs content</div>}
            {activeTab === 'datasets' && <div>Datasets & Evidence content</div>}
            {activeTab === 'notes' && <div>Research Notes content</div>}
            {activeTab === 'history' && <div>Version History Timeline content</div>}
            {activeTab === 'download' && <div>Download/Share Options content</div>}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <UploadCenter />
          <AITools />
          <CollaborationControls />
        </div>
      </div>
    </div>
  );
};

export default Repository;