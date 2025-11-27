import React, { useState } from 'react';

const MentorTools = () => {
  const [activeCategory, setActiveCategory] = useState('templates');
  
  const categories = [
    { id: 'templates', name: 'Templates', icon: '📄' },
    { id: 'frameworks', name: 'Frameworks', icon: '📐' },
    { id: 'assessment', name: 'Assessment Tools', icon: '📋' },
    { id: 'resources', name: 'Resources', icon: '📚' }
  ];

  const tools = {
    templates: [
      { id: 1, name: 'Business Model Canvas', type: 'Template', description: 'Standard canvas for business model planning' },
      { id: 2, name: 'Pitch Deck Template', type: 'Presentation', description: 'Professional pitch deck structure for startups' },
      { id: 3, name: 'Financial Projection Template', type: 'Spreadsheet', description: '5-year financial projection model' },
      { id: 4, name: 'Mentoring Session Planner', type: 'Document', description: 'Template for planning mentoring sessions' }
    ],
    frameworks: [
      { id: 5, name: 'Lean Startup Methodology', type: 'Framework', description: 'Build-Measure-Learn cycle implementation guide' },
      { id: 6, name: 'SWOT Analysis Framework', type: 'Framework', description: 'Structured approach to strategic planning' },
      { id: 7, name: 'Customer Discovery Guide', type: 'Framework', description: 'Step-by-step customer validation process' }
    ],
    assessment: [
      { id: 8, name: 'Startup Readiness Assessment', type: 'Tool', description: 'Evaluate startup preparedness for funding' },
      { id: 9, name: 'Team Dynamics Evaluation', type: 'Tool', description: 'Assess team strengths and gaps' },
      { id: 10, name: 'Market Opportunity Scorer', type: 'Tool', description: 'Quantitative market evaluation framework' }
    ],
    resources: [
      { id: 11, name: 'Investor Database', type: 'Resource', description: 'Curated list of angel investors and VCs' },
      { id: 12, name: 'Legal Document Repository', type: 'Resource', description: 'Essential legal templates and documents' },
      { id: 13, name: 'Industry Reports Collection', type: 'Resource', description: 'Access to latest market research reports' }
    ]
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mentor Tools Library</h1>
        <p className="text-gray-600">Access templates, frameworks, and resources for effective mentoring</p>
      </div>

      {/* Category Navigation */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex-1 ${
                  activeCategory === category.id
                    ? 'border-[#FF6A00] text-[#FF6A00]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tools Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools[activeCategory].map(tool => (
              <div key={tool.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{tool.name}</h3>
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-[#FFF2DC] text-[#FF6A00] rounded">
                      {tool.type}
                    </span>
                  </div>
                  <button className="text-[#FF6A00] hover:text-[#e05500]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <p className="mt-3 text-gray-600">{tool.description}</p>
                <div className="mt-4 flex space-x-2">
                  <button className="text-sm text-[#FF6A00] hover:text-[#e05500] font-medium">
                    Preview
                  </button>
                  <button className="text-sm text-[#FF6A00] hover:text-[#e05500] font-medium">
                    Use Tool
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Tools */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recommended for You</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="bg-[#FFF2DC] rounded-lg p-3">
                  <span className="text-[#FF6A00] text-xl">🎯</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Goal Setting Framework</h3>
                  <p className="text-sm text-gray-600">For mentee onboarding</p>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="bg-[#FFF2DC] rounded-lg p-3">
                  <span className="text-[#FF6A00] text-xl">📊</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Progress Tracker</h3>
                  <p className="text-sm text-gray-600">Milestone monitoring template</p>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="bg-[#FFF2DC] rounded-lg p-3">
                  <span className="text-[#FF6A00] text-xl">📝</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Feedback Forms</h3>
                  <p className="text-sm text-gray-600">Structured evaluation sheets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorTools;