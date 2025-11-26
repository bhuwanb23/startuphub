import React, { useState } from 'react';
import SimilaritySearch from './components/SimilaritySearch';
import ClaimDrafting from './components/ClaimDrafting';
import PriorArtMapping from './components/PriorArtMapping';
import IPRWorkflow from './components/IPRWorkflow';
import IPRAnalytics from './components/IPRAnalytics';

const IPR = () => {
  const [activeTab, setActiveTab] = useState('similarity');

  const tabs = [
    { id: 'similarity', name: 'AI Patent Similarity Search' },
    { id: 'claim', name: 'AI Claim Drafting Assistant' },
    { id: 'prior', name: 'Prior-Art Mapping' },
    { id: 'workflow', name: 'IPR Workflow Pages' },
    { id: 'analytics', name: 'IPR Analytics' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">⚖️ IPR Support Suite</h1>
        <p className="text-gray-600 mt-2">AI-powered patent research and intellectual property management</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
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
          {activeTab === 'similarity' && <SimilaritySearch />}
          {activeTab === 'claim' && <ClaimDrafting />}
          {activeTab === 'prior' && <PriorArtMapping />}
          {activeTab === 'workflow' && <IPRWorkflow />}
          {activeTab === 'analytics' && <IPRAnalytics />}
        </div>
      </div>
    </div>
  );
};

export default IPR;