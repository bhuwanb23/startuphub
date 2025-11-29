import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const ReadinessTools = () => {
  const [activeTool, setActiveTool] = useState('pitch');

  // Mock data for pitch deck analyzer
  const pitchAnalysis = [
    { section: 'Problem Statement', score: 90, feedback: 'Clear and compelling' },
    { section: 'Solution', score: 85, feedback: 'Well articulated' },
    { section: 'Market Size', score: 75, feedback: 'Needs more data' },
    { section: 'Business Model', score: 88, feedback: 'Strong monetization strategy' },
    { section: 'Team', score: 92, feedback: 'Experienced founding team' },
    { section: 'Financials', score: 70, feedback: 'Projections need refinement' },
    { section: 'Ask', score: 80, feedback: 'Appropriate funding request' }
  ];

  // Mock data for financial model checker
  const financialData = [
    { month: 'Jan', revenue: 15000, expenses: 12000 },
    { month: 'Feb', revenue: 18000, expenses: 14000 },
    { month: 'Mar', revenue: 22000, expenses: 16000 },
    { month: 'Apr', revenue: 28000, expenses: 18000 },
    { month: 'May', revenue: 35000, expenses: 21000 },
    { month: 'Jun', revenue: 42000, expenses: 25000 }
  ];

  // Mock data for due diligence checklist
  const dueDiligenceItems = [
    { id: 1, category: 'Legal', item: 'IP ownership verified', status: 'completed' },
    { id: 2, category: 'Legal', item: 'Contracts reviewed', status: 'completed' },
    { id: 3, category: 'Legal', item: 'Regulatory compliance', status: 'pending' },
    { id: 4, category: 'Financial', item: 'Audited financials', status: 'completed' },
    { id: 5, category: 'Financial', item: 'Revenue recognition', status: 'in-progress' },
    { id: 6, category: 'Financial', item: 'Tax compliance', status: 'pending' },
    { id: 7, category: 'Operations', item: 'Key partnerships', status: 'completed' },
    { id: 8, category: 'Operations', item: 'Supply chain audit', status: 'in-progress' },
    { id: 9, category: 'Operations', item: 'Employee agreements', status: 'pending' }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Funding Readiness Tools</h1>
            <p className="text-gray-600">AI-powered tools to prepare your startup for funding</p>
          </div>
        </div>
      </div>

      {/* Tool Selection Tabs */}
      <div className="flex flex-wrap border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTool === 'pitch'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTool('pitch')}
        >
          Pitch Deck Analyzer
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTool === 'financial'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTool('financial')}
        >
          Financial Model Checker
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTool === 'due-diligence'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTool('due-diligence')}
        >
          Due Diligence Checklist
        </button>
      </div>

      {/* Pitch Deck Analyzer */}
      {activeTool === 'pitch' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Pitch Deck Analyzer</h2>
          
          {/* AI Insights Panel */}
          <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF2DC] rounded-2xl p-6 border border-[#FF6A00] mb-6">
            <div className="flex items-start">
              <div className="bg-[#FF6A00] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                ⚡
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">AI Insights</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Your problem statement is compelling and clearly articulated</li>
                  <li>Consider adding more market data to strengthen your TAM analysis</li>
                  <li>Your financial projections show healthy growth but could be more conservative</li>
                  <li>Team section is strong - highlight relevant industry experience</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Analysis Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Section Scores</h3>
              <div className="space-y-4">
                {pitchAnalysis.map((section, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{section.section}</h4>
                      <span className="font-bold text-[#FF6A00]">{section.score}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-[#FF6A00] h-2 rounded-full" 
                        style={{ width: `${section.score}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">{section.feedback}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Overall Assessment</h3>
              <div className="border border-gray-200 rounded-xl p-6 text-center">
                <div className="text-5xl font-bold text-[#FF6A00] mb-2">83</div>
                <div className="text-gray-600 mb-4">Overall Score</div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                  <div 
                    className="bg-[#FF6A00] h-4 rounded-full" 
                    style={{ width: '83%' }}
                  ></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-green-800 font-bold">7</div>
                    <div className="text-xs text-green-600">Strong Sections</div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="text-yellow-800 font-bold">1</div>
                    <div className="text-xs text-yellow-600">Needs Work</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="text-red-800 font-bold">0</div>
                    <div className="text-xs text-red-600">Critical Issues</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Financial Model Checker */}
      {activeTool === 'financial' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Financial Model Checker</h2>
          
          {/* Validation Checks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="border border-green-200 bg-green-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                  <span className="text-white text-xs">✓</span>
                </div>
                <h3 className="font-bold text-green-800">Consistency Check</h3>
              </div>
              <p className="text-sm text-green-700">All financial statements are consistent</p>
            </div>
            <div className="border border-green-200 bg-green-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                  <span className="text-white text-xs">✓</span>
                </div>
                <h3 className="font-bold text-green-800">Growth Assumptions</h3>
              </div>
              <p className="text-sm text-green-700">Growth rates are within industry benchmarks</p>
            </div>
            <div className="border border-yellow-200 bg-yellow-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-2">
                  <span className="text-white text-xs">!</span>
                </div>
                <h3 className="font-bold text-yellow-800">Margin Analysis</h3>
              </div>
              <p className="text-sm text-yellow-700">Margins could be more conservative in projections</p>
            </div>
          </div>
          
          {/* Financial Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-4">Revenue vs Expenses</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={financialData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" name="Revenue" fill="#FF6A00" />
                    <Bar dataKey="expenses" name="Expenses" fill="#4A90E2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-4">Cash Flow Projection</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={financialData.map(d => ({
                      ...d,
                      cashFlow: d.revenue - d.expenses
                    }))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cashFlow" name="Cash Flow" stroke="#50C878" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* AI Recommendations */}
          <div className="mt-6 bg-gradient-to-r from-[#FFF9F0] to-[#FFF2DC] rounded-2xl p-6 border border-[#FF6A00]">
            <h3 className="font-bold text-gray-800 mb-3">AI Recommendations</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Consider adding sensitivity analysis for key assumptions</li>
              <li>Your customer acquisition cost projections seem optimistic - validate with pilot data</li>
              <li>Add scenario planning for economic downturns</li>
              <li>Include detailed breakdown of use of funds</li>
            </ul>
          </div>
        </div>
      )}

      {/* Due Diligence Checklist */}
      {activeTool === 'due-diligence' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Due Diligence Checklist</h2>
          
          {/* Smart Checklist */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Legal</h3>
              <div className="space-y-3">
                {dueDiligenceItems.filter(item => item.category === 'Legal').map((item) => (
                  <div key={item.id} className="flex items-start p-3 border border-gray-200 rounded-lg">
                    <input 
                      type="checkbox" 
                      className="mt-1 mr-3 h-4 w-4 text-[#FF6A00] rounded focus:ring-[#FF6A00]"
                      checked={item.status === 'completed'}
                      onChange={() => {}}
                    />
                    <div>
                      <p className="text-gray-800">{item.item}</p>
                      <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${
                        item.status === 'completed' ? 'bg-green-100 text-green-800' :
                        item.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.status === 'completed' ? 'Completed' :
                         item.status === 'in-progress' ? 'In Progress' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Financial</h3>
              <div className="space-y-3">
                {dueDiligenceItems.filter(item => item.category === 'Financial').map((item) => (
                  <div key={item.id} className="flex items-start p-3 border border-gray-200 rounded-lg">
                    <input 
                      type="checkbox" 
                      className="mt-1 mr-3 h-4 w-4 text-[#FF6A00] rounded focus:ring-[#FF6A00]"
                      checked={item.status === 'completed'}
                      onChange={() => {}}
                    />
                    <div>
                      <p className="text-gray-800">{item.item}</p>
                      <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${
                        item.status === 'completed' ? 'bg-green-100 text-green-800' :
                        item.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.status === 'completed' ? 'Completed' :
                         item.status === 'in-progress' ? 'In Progress' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Operations</h3>
              <div className="space-y-3">
                {dueDiligenceItems.filter(item => item.category === 'Operations').map((item) => (
                  <div key={item.id} className="flex items-start p-3 border border-gray-200 rounded-lg">
                    <input 
                      type="checkbox" 
                      className="mt-1 mr-3 h-4 w-4 text-[#FF6A00] rounded focus:ring-[#FF6A00]"
                      checked={item.status === 'completed'}
                      onChange={() => {}}
                    />
                    <div>
                      <p className="text-gray-800">{item.item}</p>
                      <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${
                        item.status === 'completed' ? 'bg-green-100 text-green-800' :
                        item.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.status === 'completed' ? 'Completed' :
                         item.status === 'in-progress' ? 'In Progress' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Progress Summary */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h3 className="font-bold text-gray-800 mb-4">Checklist Progress</h3>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-[#FF6A00] h-4 rounded-full" 
                  style={{ width: '67%' }}
                ></div>
              </div>
              <span className="ml-4 font-bold text-[#FF6A00]">67%</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">6</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">2</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">1</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadinessTools;