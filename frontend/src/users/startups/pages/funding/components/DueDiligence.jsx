import React, { useState } from 'react';

const DueDiligence = () => {
  const [activeCategory, setActiveCategory] = useState('financial');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for due diligence categories and items
  const categories = [
    { id: 'financial', name: 'Financial Records', icon: '💰' },
    { id: 'legal', name: 'Legal Documents', icon: '⚖️' },
    { id: 'ip', name: 'IP & Patents', icon: '📜' },
    { id: 'team', name: 'Team & HR', icon: '👥' },
    { id: 'product', name: 'Product & Tech', icon: '💻' },
    { id: 'market', name: 'Market & Customers', icon: '📈' },
  ];

  const dueDiligenceItems = {
    financial: [
      { id: 1, name: 'Financial Statements (3 years)', status: 'completed', priority: 'high' },
      { id: 2, name: 'Cash Flow Projections', status: 'in-progress', priority: 'high' },
      { id: 3, name: 'Audit Reports', status: 'pending', priority: 'medium' },
      { id: 4, name: 'Tax Returns', status: 'completed', priority: 'high' },
      { id: 5, name: 'Cap Table History', status: 'in-progress', priority: 'high' },
      { id: 6, name: 'Bank Statements', status: 'pending', priority: 'medium' },
    ],
    legal: [
      { id: 1, name: 'Articles of Incorporation', status: 'completed', priority: 'high' },
      { id: 2, name: 'Bylaws and Resolutions', status: 'completed', priority: 'high' },
      { id: 3, name: 'Shareholder Agreements', status: 'in-progress', priority: 'high' },
      { id: 4, name: 'Material Contracts', status: 'pending', priority: 'high' },
      { id: 5, name: 'Litigation History', status: 'completed', priority: 'medium' },
      { id: 6, name: 'Regulatory Compliance', status: 'in-progress', priority: 'medium' },
    ],
    ip: [
      { id: 1, name: 'Patent Applications', status: 'completed', priority: 'high' },
      { id: 2, name: 'Trademark Registrations', status: 'in-progress', priority: 'medium' },
      { id: 3, name: 'Copyright Documents', status: 'pending', priority: 'medium' },
      { id: 4, name: 'IP Assignment Agreements', status: 'completed', priority: 'high' },
      { id: 5, name: 'Third-party IP Licenses', status: 'pending', priority: 'medium' },
      { id: 6, name: 'Freedom to Operate Analysis', status: 'in-progress', priority: 'high' },
    ],
    team: [
      { id: 1, name: 'Employee Agreements', status: 'completed', priority: 'high' },
      { id: 2, name: 'Advisor Agreements', status: 'in-progress', priority: 'medium' },
      { id: 3, name: 'Equity Grant Documentation', status: 'pending', priority: 'high' },
      { id: 4, name: 'Background Checks', status: 'completed', priority: 'medium' },
      { id: 5, name: 'Non-compete Agreements', status: 'pending', priority: 'medium' },
      { id: 6, name: 'Organizational Chart', status: 'in-progress', priority: 'low' },
    ],
    product: [
      { id: 1, name: 'Product Documentation', status: 'completed', priority: 'high' },
      { id: 2, name: 'Technical Architecture', status: 'in-progress', priority: 'high' },
      { id: 3, name: 'Security Audits', status: 'pending', priority: 'high' },
      { id: 4, name: 'Third-party Dependencies', status: 'completed', priority: 'medium' },
      { id: 5, name: 'Data Privacy Compliance', status: 'pending', priority: 'high' },
      { id: 6, name: 'Product Roadmap', status: 'in-progress', priority: 'medium' },
    ],
    market: [
      { id: 1, name: 'Customer List', status: 'completed', priority: 'high' },
      { id: 2, name: 'Revenue Breakdown', status: 'in-progress', priority: 'high' },
      { id: 3, name: 'Competitive Analysis', status: 'pending', priority: 'medium' },
      { id: 4, name: 'Market Research', status: 'completed', priority: 'medium' },
      { id: 5, name: 'Customer Testimonials', status: 'pending', priority: 'low' },
      { id: 6, name: 'Sales Pipeline', status: 'in-progress', priority: 'high' },
    ],
  };

  const currentItems = dueDiligenceItems[activeCategory] || [];
  const filteredItems = currentItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: currentItems.length,
    completed: currentItems.filter(item => item.status === 'completed').length,
    inProgress: currentItems.filter(item => item.status === 'in-progress').length,
    pending: currentItems.filter(item => item.status === 'pending').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Due Diligence Checklist</h1>
        <p className="text-gray-600 mt-1">Track and manage your due diligence requirements</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Due Diligence Insight</h2>
            <p className="text-gray-700 mt-1">
              Your Financial Records section is 60% complete. High-priority items like Cash Flow Projections 
              and Cap Table History need immediate attention. These are typically investor showstoppers.
            </p>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                activeCategory === category.id
                  ? 'bg-[#FF6A00] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Stats */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search due diligence items..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-[#FF6A00]">{stats.total}</div>
              <div className="text-xs text-gray-600">Total Items</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-yellow-600">{stats.inProgress}</div>
              <div className="text-xs text-gray-600">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-600">{stats.pending}</div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
          </div>
        </div>
      </div>

      {/* Due Diligence Items */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            {categories.find(c => c.id === activeCategory)?.name}
          </h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-sm hover:bg-[#FFE9D7] transition-colors">
              Add Item
            </button>
            <button className="px-3 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-sm hover:bg-[#FFE9D7] transition-colors">
              Export List
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div key={item.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  checked={item.status === 'completed'}
                  onChange={() => {}}
                  className="h-4 w-4 text-[#FF6A00] border-gray-300 rounded focus:ring-[#FF6A00]"
                />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900">{item.name}</span>
                  <span className={`ml-3 px-2 py-1 rounded text-xs font-medium ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
              </div>
              <div className="ml-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              <div className="ml-4">
                <button className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Due Diligence Progress */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Overall Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {categories.map((category) => {
            const items = dueDiligenceItems[category.id] || [];
            const completed = items.filter(item => item.status === 'completed').length;
            const progress = items.length > 0 ? Math.round((completed / items.length) * 100) : 0;
            
            return (
              <div key={category.id} className="text-center">
                <div className="relative w-20 h-20 mx-auto">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#FF6A00"
                      strokeWidth="3"
                      strokeDasharray={`${progress}, 100`}
                    />
                    <text x="18" y="20.5" textAnchor="middle" fill="#FF6A00" fontSize="8" fontWeight="bold">
                      {progress}%
                    </text>
                  </svg>
                </div>
                <div className="text-sm font-medium text-gray-800 mt-2">{category.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DueDiligence;