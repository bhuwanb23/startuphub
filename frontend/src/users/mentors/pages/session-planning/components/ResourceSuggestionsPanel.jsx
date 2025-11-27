import React, { useState } from 'react';

const ResourceSuggestionsPanel = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState('templates');

  const resources = {
    templates: [
      { id: 1, name: 'Business Model Canvas', type: 'Template', description: 'Standard canvas for business model planning' },
      { id: 2, name: 'Pitch Deck Template', type: 'Presentation', description: 'Professional pitch deck structure for startups' },
      { id: 3, name: 'Financial Projection Template', type: 'Spreadsheet', description: '5-year financial projection model' },
      { id: 4, name: 'Mentoring Session Planner', type: 'Document', description: 'Template for planning mentoring sessions' }
    ],
    guides: [
      { id: 5, name: 'Lean Startup Methodology', type: 'Guide', description: 'Build-Measure-Learn cycle implementation guide' },
      { id: 6, name: 'SWOT Analysis Framework', type: 'Guide', description: 'Structured approach to strategic planning' },
      { id: 7, name: 'Customer Discovery Guide', type: 'Guide', description: 'Step-by-step customer validation process' }
    ],
    snippets: [
      { id: 8, name: 'Market Sizing Calculator', type: 'Code', description: 'Python script for TAM/SAM/SOM calculation' },
      { id: 9, name: 'Financial Metrics Dashboard', type: 'Code', description: 'Excel formulas for key startup metrics' },
      { id: 10, name: 'User Interview Script', type: 'Code', description: 'Template for conducting user interviews' }
    ],
    tools: [
      { id: 11, name: 'Investor Database', type: 'Tool', description: 'Curated list of angel investors and VCs' },
      { id: 12, name: 'Legal Document Repository', type: 'Tool', description: 'Essential legal templates and documents' },
      { id: 13, name: 'Industry Reports Collection', type: 'Tool', description: 'Access to latest market research reports' }
    ],
    checklists: [
      { id: 14, name: 'Pre-Funding Checklist', type: 'Checklist', description: 'Essential steps before fundraising' },
      { id: 15, name: 'Product Launch Checklist', type: 'Checklist', description: 'Go-to-market preparation steps' },
      { id: 16, name: 'Team Building Checklist', type: 'Checklist', description: 'Hiring and onboarding best practices' }
    ]
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Template': return 'bg-blue-100 text-blue-800';
      case 'Guide': return 'bg-green-100 text-green-800';
      case 'Code': return 'bg-purple-100 text-purple-800';
      case 'Tool': return 'bg-yellow-100 text-yellow-800';
      case 'Checklist': return 'bg-pink-100 text-pink-800';
      case 'Presentation': return 'bg-indigo-100 text-indigo-800';
      case 'Spreadsheet': return 'bg-teal-100 text-teal-800';
      case 'Document': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Resource Suggestions</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-1">AI-recommended resources for your session</p>
        </div>

        <div className="p-4">
          <div className="flex space-x-1 mb-4 overflow-x-auto">
            {Object.keys(resources).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-[#FF6A00] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {resources[activeCategory].map((resource) => (
              <div key={resource.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">{resource.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(resource.type)}`}>
                    {resource.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                <div className="flex space-x-2 mt-2">
                  <button className="text-xs px-2 py-1 bg-[#FF6A00] text-white rounded hover:bg-[#FF8C42]">
                    Use
                  </button>
                  <button className="text-xs px-2 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceSuggestionsPanel;