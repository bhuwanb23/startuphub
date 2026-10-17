import React, { useState } from 'react';

const IndustryFitRecommendations = () => {
  const [recommendations, setRecommendations] = useState([
    { 
      id: 1, 
      title: 'AI-Powered Drug Discovery Platform', 
      department: 'Biotechnology',
      industries: ['Pharmaceuticals', 'Biotech', 'Healthcare'],
      fitScore: 92,
      contact: 'Dr. Sarah Johnson'
    },
    { 
      id: 2, 
      title: 'Sustainable Energy Storage Solution', 
      department: 'Chemical Engineering',
      industries: ['Clean Energy', 'Automotive', 'Electronics'],
      fitScore: 85,
      contact: 'Prof. Michael Chen'
    },
    { 
      id: 3, 
      title: 'Quantum Computing Algorithms', 
      department: 'Computer Science',
      industries: ['Tech', 'Finance', 'Logistics'],
      fitScore: 88,
      contact: 'Dr. Emily Rodriguez'
    },
  ]);

  const [selectedIndustry, setSelectedIndustry] = useState('All');

  const allIndustries = ['All', 'Pharmaceuticals', 'Biotech', 'Healthcare', 'Clean Energy', 'Automotive', 'Electronics', 'Tech', 'Finance', 'Logistics'];

  const filteredRecommendations = selectedIndustry === 'All' 
    ? recommendations 
    : recommendations.filter(rec => rec.industries.includes(selectedIndustry));

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Industry Fit Recommendations</h1>
        <p className="text-gray-600">AI-powered industry recommendations for technology transfer</p>
      </div>

      {/* Industry Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Filter by Industry</h2>
        <div className="flex flex-wrap gap-2">
          {allIndustries.map((industry) => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedIndustry === industry
                  ? 'bg-[#F4A300] text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 gap-6">
        {filteredRecommendations.map((rec) => (
          <div key={rec.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{rec.title}</h2>
                  <p className="text-gray-600 text-sm">{rec.department} • {rec.contact}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800">{rec.fitScore}%</div>
                  <div className="text-sm text-gray-600">Fit Score</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Recommended Industries</h3>
                <div className="flex flex-wrap gap-2">
                  {rec.industries.map((industry, index) => (
                    <span 
                      key={index} 
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedIndustry === industry
                          ? 'bg-[#F4A300] text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Industry Fit</span>
                  <span className="font-medium text-gray-800">{rec.fitScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#F4A300] h-2 rounded-full" 
                    style={{ width: `${rec.fitScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  {rec.fitScore > 90 ? (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Excellent Fit
                    </span>
                  ) : rec.fitScore > 75 ? (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Good Fit
                    </span>
                  ) : (
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      Moderate Fit
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button className="text-[#F4A300] hover:text-[#F26B1D] text-sm font-medium">
                    View Detailed Analysis
                  </button>
                  <button className="bg-[#F4A300] hover:bg-[#F26B1D] text-white px-3 py-1 rounded text-sm transition-colors">
                    Create One-Pager
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Email Intent Generation */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Email Intent Generation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <input 
              type="email" 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-transparent"
              placeholder="industry.contact@company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-transparent"
              placeholder="Technology Transfer Opportunity"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-transparent">
              <option>Introduction Template</option>
              <option>Technical Overview</option>
              <option>Commercial Proposal</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <button className="text-[#F4A300] hover:text-[#F26B1D] font-medium">
            Load Previous Templates
          </button>
          <div className="flex space-x-3">
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
              Save Draft
            </button>
            <button className="bg-[#F4A300] hover:bg-[#F26B1D] text-white px-4 py-2 rounded-lg transition-colors">
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryFitRecommendations;