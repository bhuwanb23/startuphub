import React, { useState } from 'react';

const Checklists = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedChecklist, setExpandedChecklist] = useState(null);
  
  // Mock data for checklists
  const checklists = [
    {
      id: 1,
      name: 'Startup Launch Checklist',
      category: 'Launch',
      items: 24,
      completed: 18,
      progress: 75,
      estimatedTime: '2 weeks',
      tags: ['Launch', 'MVP', 'Go-to-market'],
      itemsList: [
        { id: 1, text: 'Define your value proposition', completed: true },
        { id: 2, text: 'Conduct market research', completed: true },
        { id: 3, text: 'Build MVP prototype', completed: true },
        { id: 4, text: 'Create business plan', completed: true },
        { id: 5, text: 'Register business entity', completed: true },
        { id: 6, text: 'Set up accounting system', completed: true },
        { id: 7, text: 'Develop branding guidelines', completed: true },
        { id: 8, text: 'Create website and landing page', completed: true },
        { id: 9, text: 'Establish social media presence', completed: true },
        { id: 10, text: 'Prepare investor pitch deck', completed: true },
        { id: 11, text: 'Identify first customers', completed: true },
        { id: 12, text: 'Set up customer feedback system', completed: true },
        { id: 13, text: 'Secure initial funding', completed: true },
        { id: 14, text: 'Recruit core team members', completed: true },
        { id: 15, text: 'Finalize product development', completed: true },
        { id: 16, text: 'Test with beta users', completed: true },
        { id: 17, text: 'Refine product based on feedback', completed: true },
        { id: 18, text: 'Plan official launch strategy', completed: true },
        { id: 19, text: 'Execute marketing campaign', completed: false },
        { id: 20, text: 'Monitor initial metrics', completed: false },
        { id: 21, text: 'Gather user testimonials', completed: false },
        { id: 22, text: 'Optimize conversion funnel', completed: false },
        { id: 23, text: 'Scale customer support', completed: false },
        { id: 24, text: 'Plan next phase roadmap', completed: false },
      ]
    },
    {
      id: 2,
      name: 'Fundraising Preparation',
      category: 'Funding',
      items: 18,
      completed: 12,
      progress: 67,
      estimatedTime: '3 weeks',
      tags: ['Funding', 'Investors', 'Pitch'],
      itemsList: [
        { id: 1, text: 'Calculate financial projections', completed: true },
        { id: 2, text: 'Prepare pitch deck', completed: true },
        { id: 3, text: 'Create financial model', completed: true },
        { id: 4, text: 'Develop investor list', completed: true },
        { id: 5, text: 'Craft compelling story', completed: true },
        { id: 6, text: 'Prepare demo or prototype', completed: true },
        { id: 7, text: 'Establish valuation range', completed: true },
        { id: 8, text: 'Create data room', completed: true },
        { id: 9, text: 'Develop term sheet', completed: true },
        { id: 10, text: 'Practice pitch delivery', completed: true },
        { id: 11, text: 'Prepare for due diligence', completed: true },
        { id: 12, text: 'Set up investor meetings', completed: true },
        { id: 13, text: 'Negotiate terms', completed: false },
        { id: 14, text: 'Close investment round', completed: false },
        { id: 15, text: 'Execute legal documents', completed: false },
        { id: 16, text: 'Onboard new investors', completed: false },
        { id: 17, text: 'Announce funding publicly', completed: false },
        { id: 18, text: 'Plan fund utilization', completed: false },
      ]
    },
    {
      id: 3,
      name: 'Product Development',
      category: 'Product',
      items: 20,
      completed: 15,
      progress: 75,
      estimatedTime: '4 weeks',
      tags: ['Product', 'Development', 'Engineering'],
      itemsList: [
        { id: 1, text: 'Define product requirements', completed: true },
        { id: 2, text: 'Create user stories', completed: true },
        { id: 3, text: 'Design wireframes', completed: true },
        { id: 4, text: 'Develop technical architecture', completed: true },
        { id: 5, text: 'Set up development environment', completed: true },
        { id: 6, text: 'Implement core features', completed: true },
        { id: 7, text: 'Create automated tests', completed: true },
        { id: 8, text: 'Conduct code reviews', completed: true },
        { id: 9, text: 'Perform security audit', completed: true },
        { id: 10, text: 'Optimize performance', completed: true },
        { id: 11, text: 'Integrate analytics', completed: true },
        { id: 12, text: 'Prepare release notes', completed: true },
        { id: 13, text: 'Deploy to staging', completed: true },
        { id: 14, text: 'Conduct user acceptance testing', completed: true },
        { id: 15, text: 'Fix critical bugs', completed: true },
        { id: 16, text: 'Deploy to production', completed: false },
        { id: 17, text: 'Monitor system health', completed: false },
        { id: 18, text: 'Gather user feedback', completed: false },
        { id: 19, text: 'Plan next iteration', completed: false },
        { id: 20, text: 'Document technical specs', completed: false },
      ]
    },
    {
      id: 4,
      name: 'Team Onboarding',
      category: 'HR',
      items: 15,
      completed: 9,
      progress: 60,
      estimatedTime: '1 week',
      tags: ['HR', 'Onboarding', 'Team'],
      itemsList: [
        { id: 1, text: 'Prepare offer letter', completed: true },
        { id: 2, text: 'Set up email account', completed: true },
        { id: 3, text: 'Configure development environment', completed: true },
        { id: 4, text: 'Grant system access', completed: true },
        { id: 5, text: 'Schedule orientation meeting', completed: true },
        { id: 6, text: 'Provide company handbook', completed: true },
        { id: 7, text: 'Assign mentor/buddy', completed: true },
        { id: 8, text: 'Introduce to team members', completed: true },
        { id: 9, text: 'Review role expectations', completed: true },
        { id: 10, text: 'Complete compliance training', completed: false },
        { id: 11, text: 'Set up recurring 1:1s', completed: false },
        { id: 12, text: 'Assign first project', completed: false },
        { id: 13, text: 'Schedule 30-day check-in', completed: false },
        { id: 14, text: 'Gather feedback', completed: false },
        { id: 15, text: 'Evaluate onboarding process', completed: false },
      ]
    },
  ];

  const categories = [
    { id: 'all', name: 'All Checklists' },
    { id: 'launch', name: 'Launch' },
    { id: 'funding', name: 'Funding' },
    { id: 'product', name: 'Product' },
    { id: 'hr', name: 'HR' },
  ];

  const filteredChecklists = checklists.filter(checklist => {
    const matchesSearch = checklist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         checklist.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || checklist.category.toLowerCase() === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleItemCompletion = (checklistId, itemId) => {
    // In a real app, this would update the state
    console.log(`Toggled item ${itemId} in checklist ${checklistId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Checklists</h1>
        <p className="text-gray-600 mt-1">Actionable checklists to guide your startup journey</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Progress Insight</h2>
            <p className="text-gray-700 mt-1">
              You're 75% complete on your Startup Launch Checklist. Focus on executing your marketing campaign 
              and monitoring initial metrics to reach 100% completion.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search checklists..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === category.id
                    ? 'bg-[#FF6A00] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Checklists Grid */}
      <div className="space-y-6">
        {filteredChecklists.map((checklist) => (
          <div key={checklist.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div 
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpandedChecklist(expandedChecklist === checklist.id ? null : checklist.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{checklist.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                      {checklist.category}
                    </span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{checklist.items} items</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{checklist.estimatedTime}</span>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1">
                      {checklist.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#FF6A00]">{checklist.progress}%</div>
                  <div className="text-sm text-gray-500">Complete</div>
                  <div className="mt-2 w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-[#FF6A00]"
                      style={{ width: `${checklist.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Expanded Checklist Items */}
            {expandedChecklist === checklist.id && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="space-y-3">
                  {checklist.itemsList.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`item-${checklist.id}-${item.id}`}
                        checked={item.completed}
                        onChange={() => toggleItemCompletion(checklist.id, item.id)}
                        className="h-5 w-5 text-[#FF6A00] border-gray-300 rounded focus:ring-[#FF6A00]"
                      />
                      <label 
                        htmlFor={`item-${checklist.id}-${item.id}`} 
                        className={`ml-3 text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}
                      >
                        {item.text}
                      </label>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex gap-3">
                  <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
                    Mark All Complete
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    Reset Progress
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    Export as PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Checklists Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Checklists Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">18</div>
            <div className="text-sm text-gray-600">Active Checklists</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">67%</div>
            <div className="text-sm text-gray-600">Avg Completion</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">42</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">28</div>
            <div className="text-sm text-gray-600">Completed Tasks</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checklists;