import React, { useState } from 'react';

const ExitPlanningTools = () => {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [milestones, setMilestones] = useState([
    { id: 1, name: 'Achieve Product-Market Fit', date: '2025-12-31', completed: true, type: 'operational' },
    { id: 2, name: 'Reach $10M ARR', date: '2026-06-30', completed: true, type: 'financial' },
    { id: 3, name: 'Expand to International Markets', date: '2026-12-31', completed: false, type: 'operational' },
    { id: 4, name: 'Secure Strategic Partnership', date: '2027-03-31', completed: false, type: 'strategic' },
    { id: 5, name: 'Complete Series C Funding', date: '2027-06-30', completed: false, type: 'financial' },
    { id: 6, name: 'Initiate IPO Process', date: '2028-01-31', completed: false, type: 'exit' }
  ]);
  
  const [newMilestone, setNewMilestone] = useState({
    name: '',
    date: '',
    type: 'operational'
  });
  
  const exitOptions = [
    {
      id: 'ipo',
      name: 'Initial Public Offering (IPO)',
      description: 'Take the company public on a stock exchange',
      timeline: '3-5 years',
      requirements: ['$50M+ revenue', 'Strong governance', 'Regulatory compliance'],
      icon: '🏢'
    },
    {
      id: 'acquisition',
      name: 'Acquisition/M&A',
      description: 'Sell the company to a strategic buyer or private equity firm',
      timeline: '1-3 years',
      requirements: ['Clear value proposition', 'Strong financials', 'Due diligence ready'],
      icon: '🤝'
    },
    {
      id: 'secondary',
      name: 'Secondary Sale',
      description: 'Sell shares to other investors or funds',
      timeline: '6-18 months',
      requirements: ['Established valuation', 'Investor interest', 'Legal documentation'],
      icon: '🔁'
    }
  ];
  
  const addMilestone = () => {
    if (newMilestone.name && newMilestone.date) {
      setMilestones([
        ...milestones,
        {
          id: milestones.length + 1,
          ...newMilestone,
          completed: false
        }
      ]);
      setNewMilestone({ name: '', date: '', type: 'operational' });
    }
  };
  
  const toggleMilestone = (id) => {
    setMilestones(milestones.map(milestone => 
      milestone.id === id ? { ...milestone, completed: !milestone.completed } : milestone
    ));
  };
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'operational': return 'bg-blue-100 text-blue-800';
      case 'financial': return 'bg-green-100 text-green-800';
      case 'strategic': return 'bg-purple-100 text-purple-800';
      case 'exit': return 'bg-[#FF8C42] text-[#FF6A00]';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Exit Planning Tools</h2>
        <p className="text-gray-600">Plan and track your path to liquidity events</p>
      </div>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-4 py-2 rounded-lg transition-all flex items-center ${
            activeTab === 'roadmap'
              ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          🗺️ Roadmap
        </button>
        <button
          onClick={() => setActiveTab('options')}
          className={`px-4 py-2 rounded-lg transition-all flex items-center ${
            activeTab === 'options'
              ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          🔄 Exit Options
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`px-4 py-2 rounded-lg transition-all flex items-center ${
            activeTab === 'analysis'
              ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          📊 Analysis
        </button>
      </div>
      
      {/* Roadmap Tab */}
      {activeTab === 'roadmap' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Exit Planning Roadmap</h3>
          
          {/* Timeline Visualization */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            {/* Milestones */}
            <div className="space-y-6 pl-10">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="relative">
                  {/* Timeline dot */}
                  <div className={`absolute left-[-28px] w-6 h-6 rounded-full border-4 flex items-center justify-center ${
                    milestone.completed 
                      ? 'bg-[#FF6A00] border-[#FF8C42]' 
                      : 'bg-white border-[#FF8C42]'
                  }`}>
                    {milestone.completed && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>
                  
                  {/* Milestone content */}
                  <div className={`p-4 rounded-lg border ${
                    milestone.completed 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`font-medium ${milestone.completed ? 'text-green-800' : 'text-gray-800'}`}>
                          {milestone.name}
                        </h4>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-600">{milestone.date}</span>
                          <span className={`ml-2 px-2 py-1 rounded text-xs ${getTypeColor(milestone.type)}`}>
                            {milestone.type}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleMilestone(milestone.id)}
                        className={`px-3 py-1 rounded text-sm ${
                          milestone.completed
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {milestone.completed ? 'Completed' : 'Mark Complete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Add New Milestone */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-800 mb-3">Add New Milestone</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Milestone name"
                value={newMilestone.name}
                onChange={(e) => setNewMilestone({...newMilestone, name: e.target.value})}
                className="p-2 border border-gray-300 rounded-lg"
              />
              <input
                type="date"
                value={newMilestone.date}
                onChange={(e) => setNewMilestone({...newMilestone, date: e.target.value})}
                className="p-2 border border-gray-300 rounded-lg"
              />
              <select
                value={newMilestone.type}
                onChange={(e) => setNewMilestone({...newMilestone, type: e.target.value})}
                className="p-2 border border-gray-300 rounded-lg"
              >
                <option value="operational">Operational</option>
                <option value="financial">Financial</option>
                <option value="strategic">Strategic</option>
                <option value="exit">Exit</option>
              </select>
              <button
                onClick={addMilestone}
                className="px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all"
              >
                Add Milestone
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Exit Options Tab */}
      {activeTab === 'options' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Exit Strategy Options</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exitOptions.map((option) => (
              <div key={option.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{option.icon}</div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{option.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-1">Typical Timeline</div>
                  <div className="font-medium text-gray-800">{option.timeline}</div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-500 mb-1">Key Requirements</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {option.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#FF6A00] mr-1">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-5">
                  <button className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                    Plan This Exit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Analysis Tab */}
      {activeTab === 'analysis' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Exit Readiness Assessment</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Financial Readiness</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Revenue Growth</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] h-2 rounded-full" 
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Profitability</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] h-2 rounded-full" 
                        style={{ width: '45%' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Cash Flow Stability</span>
                      <span className="font-medium">60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] h-2 rounded-full" 
                        style={{ width: '60%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Operational Readiness</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Governance Structure</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] h-2 rounded-full" 
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Team Scalability</span>
                      <span className="font-medium">70%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] h-2 rounded-full" 
                        style={{ width: '70%' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Process Documentation</span>
                      <span className="font-medium">55%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] h-2 rounded-full" 
                        style={{ width: '55%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Exit Timeline Projection</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Milestone</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Target Date</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {milestones.map((milestone) => (
                    <tr key={milestone.id}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{milestone.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{milestone.date}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${
                          milestone.completed 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {milestone.completed ? 'Completed' : 'In Progress'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] h-2 rounded-full" 
                              style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">
                            {Math.floor(Math.random() * 40) + 60}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6">
              <button className="px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all">
                Download Exit Plan Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExitPlanningTools;