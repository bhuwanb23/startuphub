import React, { useState } from 'react';
import PaperTemplates from './components/PaperTemplates';
import PatentTemplates from './components/PatentTemplates';
import DataAnalysisTools from './components/DataAnalysisTools';
import ExperimentDesignTools from './components/ExperimentDesignTools';
import SimulationTools from './components/SimulationTools';
import CodeSnippets from './components/CodeSnippets';
import EthicsGuidelines from './components/EthicsGuidelines';
import ComplianceDocuments from './components/ComplianceDocuments';

const Tools = () => {
  const [activeTab, setActiveTab] = useState('landing');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const tabs = [
    { id: 'landing', name: 'Tools Library' },
    { id: 'papers', name: 'Research Paper Templates' },
    { id: 'patents', name: 'Patent Draft Templates' },
    { id: 'data', name: 'Data Analysis Tools' },
    { id: 'experiment', name: 'Experiment Design Tools' },
    { id: 'simulation', name: 'Simulation Tools' },
    { id: 'code', name: 'Code Snippets Repository' },
    { id: 'ethics', name: 'Research Policy & Ethics Guidelines' },
    { id: 'compliance', name: 'Compliance Documents' },
  ];

  const filters = [
    { id: 'all', name: 'All Tools' },
    { id: 'templates', name: 'Templates' },
    { id: 'tools', name: 'Tools' },
    { id: 'simulation', name: 'Simulation' },
    { id: 'ethics', name: 'Ethics' },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'papers':
        return <PaperTemplates />;
      case 'patents':
        return <PatentTemplates />;
      case 'data':
        return <DataAnalysisTools />;
      case 'experiment':
        return <ExperimentDesignTools />;
      case 'simulation':
        return <SimulationTools />;
      case 'code':
        return <CodeSnippets />;
      case 'ethics':
        return <EthicsGuidelines />;
      case 'compliance':
        return <ComplianceDocuments />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🧪 Tools Library for Researchers</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            A complete repository of templates, tools, and resources to accelerate research
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Search templates, tools, and resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 text-sm rounded-full ${
                    selectedFilter === filter.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

// Landing Page Component
const LandingPage = () => {
  const toolsCategories = [
    {
      id: 'papers',
      title: 'Research Paper Templates',
      description: 'Professional templates for academic publishing',
      icon: '📄',
      count: 12
    },
    {
      id: 'patents',
      title: 'Patent Draft Templates',
      description: 'Templates for patent applications and claims',
      icon: '📜',
      count: 8
    },
    {
      id: 'data',
      title: 'Data Analysis Tools',
      description: 'Statistical and ML analysis tools',
      icon: '📊',
      count: 15
    },
    {
      id: 'experiment',
      title: 'Experiment Design Tools',
      description: 'Tools for planning and tracking experiments',
      icon: '🔬',
      count: 7
    },
    {
      id: 'simulation',
      title: 'Simulation Tools',
      description: 'Physics, chemistry, and neural simulators',
      icon: '💻',
      count: 9
    },
    {
      id: 'code',
      title: 'Code Snippets Repository',
      description: 'Reusable code for research projects',
      icon: '⌨️',
      count: 42
    },
    {
      id: 'ethics',
      title: 'Research Policy & Ethics Guidelines',
      description: 'Ethical compliance and policy documents',
      icon: '⚖️',
      count: 6
    },
    {
      id: 'compliance',
      title: 'Compliance Documents',
      description: 'Forms and templates for regulatory compliance',
      icon: '📋',
      count: 11
    }
  ];

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Tools Categories</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {toolsCategories.map((category) => (
          <div key={category.id} className="bg-gradient-to-br from-white to-orange-50 rounded-lg shadow p-6 border border-orange-100 hover:border-orange-300 transition-all duration-200 hover:shadow-md">
            <div className="text-3xl mb-3">{category.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{category.description}</p>
            <div className="flex justify-between items-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {category.count} items
              </span>
              <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                Explore →
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-gradient-to-r from-orange-50 to-saffron-50 rounded-lg p-6 border border-orange-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">🤖 AI-Powered Recommendations</h3>
        <p className="text-gray-700 mb-4">
          Based on your research profile, we recommend these tools to enhance your work:
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-orange-800 border border-orange-200">
            IEEE Paper Template
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-orange-800 border border-orange-200">
            Statistical Analysis Tool
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-orange-800 border border-orange-200">
            Ethics Compliance Guide
          </span>
        </div>
      </div>
    </>
  );
};

export default Tools;