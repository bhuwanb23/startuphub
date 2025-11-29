import React, { useState } from 'react';

const InvestorMatching = () => {
  const [activeTab, setActiveTab] = useState('matching');

  // Mock data for stage & sector matching
  const stageSectorMatching = [
    {
      id: 1,
      startup: 'TechFlow Inc.',
      stage: 'Series A',
      sector: 'Software',
      matchPercentage: 85,
      priority: 'High',
      investors: ['VentureCap', 'TechGrowth Fund']
    },
    {
      id: 2,
      startup: 'EcoPack Solutions',
      stage: 'Seed',
      sector: 'Sustainability',
      matchPercentage: 92,
      priority: 'Urgent',
      investors: ['GreenInvest', 'Impact Ventures']
    },
    {
      id: 3,
      startup: 'HealthTrack Pro',
      stage: 'Pre-Series A',
      sector: 'Healthcare',
      matchPercentage: 78,
      priority: 'Medium',
      investors: ['MedTech Partners', 'LifeSciences VC']
    }
  ];

  // Mock data for investor interest heatmap
  const heatmapData = [
    { investor: 'VentureCap', interest: 90 },
    { investor: 'TechGrowth Fund', interest: 75 },
    { investor: 'GreenInvest', interest: 88 },
    { investor: 'Impact Ventures', interest: 92 },
    { investor: 'MedTech Partners', interest: 70 },
    { investor: 'LifeSciences VC', interest: 85 },
    { investor: 'FutureFund', interest: 65 },
    { investor: 'ScaleUp Capital', interest: 80 },
    { investor: 'Innovation Partners', interest: 72 }
  ];

  // Mock data for outreach timeline
  const outreachTimeline = [
    { id: 1, investor: 'VentureCap', date: '2023-06-01', status: 'Contacted', template: 'Intro Email' },
    { id: 2, investor: 'TechGrowth Fund', date: '2023-06-03', status: 'Meeting Scheduled', template: 'Pitch Deck' },
    { id: 3, investor: 'GreenInvest', date: '2023-06-05', status: 'Proposal Sent', template: 'Executive Summary' },
    { id: 4, investor: 'Impact Ventures', date: '2023-06-07', status: 'Follow-up Sent', template: 'Follow-up Email' }
  ];

  // Mock data for funding alignment scores
  const alignmentScores = [
    { startup: 'TechFlow Inc.', score: 85 },
    { startup: 'EcoPack Solutions', score: 92 },
    { startup: 'HealthTrack Pro', score: 78 },
    { startup: 'FinSecure Systems', score: 88 },
    { startup: 'AgriTech Dynamics', score: 75 }
  ];

  return (
    <div className="space-y-6">
      {/* Header with buttons */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Investor Matching Dashboard</h1>
            <p className="text-gray-600">Stage and sector-based investor matching</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05d00] transition-colors flex items-center">
              <span className="mr-2">+</span> Match Investor
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <span className="mr-2">⚡</span> AI Recommendations
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'matching'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('matching')}
        >
          Stage & Sector Matching
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'heatmap'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('heatmap')}
        >
          Investor Interest Heatmap
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'outreach'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('outreach')}
        >
          Outreach Tools
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'alignment'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('alignment')}
        >
          Funding Alignment
        </button>
      </div>

      {/* Stage & Sector Matching */}
      {activeTab === 'matching' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Stage & Sector Matching</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stageSectorMatching.map((match) => (
              <div key={match.id} className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-800">{match.startup}</h3>
                  <div className="flex flex-col items-end">
                    <div className="bg-[#FF6A00] text-white text-xs font-bold px-2 py-1 rounded-full mb-1">
                      {match.matchPercentage}%
                    </div>
                    <div className={`text-xs font-medium ${
                      match.priority === 'Urgent' ? 'text-red-600' : 
                      match.priority === 'High' ? 'text-orange-600' : 'text-yellow-600'
                    }`}>
                      {match.priority} Priority
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Stage:</span>
                    <span className="font-medium">{match.stage}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sector:</span>
                    <span className="font-medium">{match.sector}</span>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Recommended Investors:</p>
                  <div className="flex flex-wrap gap-1">
                    {match.investors.map((investor, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {investor}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-[#FFF9F0] text-[#FF6A00] py-2 rounded-lg text-sm font-medium hover:bg-[#FF6A00] hover:text-white transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Investor Interest Heatmap */}
      {activeTab === 'heatmap' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Investor Interest Heatmap</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {heatmapData.map((investor, index) => (
              <div key={index} className="text-center">
                <div 
                  className="w-16 h-16 rounded-lg mx-auto mb-2 flex items-center justify-center text-white font-bold"
                  style={{
                    background: `linear-gradient(135deg, #FF6A00 ${investor.interest}%, #FFE5B4 ${investor.interest}%)`
                  }}
                >
                  {investor.interest}%
                </div>
                <p className="text-xs text-gray-700 font-medium">{investor.investor}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="font-medium text-gray-800 mb-2">Interest Level Guide</h3>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#FFE5B4] rounded mr-2"></div>
              <span className="text-xs text-gray-600 mr-4">Low Interest (0-30%)</span>
              <div className="w-4 h-4 bg-[#FFB347] rounded mr-2"></div>
              <span className="text-xs text-gray-600 mr-4">Medium Interest (31-60%)</span>
              <div className="w-4 h-4 bg-[#FF6A00] rounded mr-2"></div>
              <span className="text-xs text-gray-600">High Interest (61-100%)</span>
            </div>
          </div>
        </div>
      )}

      {/* Outreach Tools */}
      {activeTab === 'outreach' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Investor Outreach Tools</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Templates Section */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Email Templates</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gray-800">Introductory Email</h4>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Ready</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Initial introduction to potential investors</p>
                </div>
                <div className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gray-800">Pitch Deck</h4>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Ready</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Comprehensive presentation deck</p>
                </div>
                <div className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gray-800">Executive Summary</h4>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Draft</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Concise overview of business proposition</p>
                </div>
                <div className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gray-800">Follow-up Email</h4>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Ready</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Follow-up after initial contact</p>
                </div>
              </div>
            </div>

            {/* Outreach Timeline */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Outreach Timeline</h3>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Investor</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Template</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outreachTimeline.map((item) => (
                      <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium">{item.investor}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{item.date}</td>
                        <td className="py-3 px-4">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{item.template}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Funding Alignment Scores */}
      {activeTab === 'alignment' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Funding Alignment Scores</h2>
          <div className="space-y-4">
            {alignmentScores.map((startup, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-800">{startup.startup}</h3>
                  <span className="text-sm font-bold text-[#FF6A00]">{startup.score}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-[#FF6A00] h-2.5 rounded-full" 
                    style={{ width: `${startup.score}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Poor Fit</span>
                  <span>Good Fit</span>
                  <span>Excellent Fit</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <h3 className="font-bold text-gray-800 mb-3">Alignment Indicators</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="text-green-800 font-bold text-lg mb-1">80-100</div>
                <div className="text-green-700 text-sm">Excellent Alignment</div>
                <div className="text-green-600 text-xs mt-1">High probability of investment</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="text-yellow-800 font-bold text-lg mb-1">60-79</div>
                <div className="text-yellow-700 text-sm">Good Alignment</div>
                <div className="text-yellow-600 text-xs mt-1">Moderate probability of investment</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="text-red-800 font-bold text-lg mb-1">0-59</div>
                <div className="text-red-700 text-sm">Poor Alignment</div>
                <div className="text-red-600 text-xs mt-1">Low probability of investment</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestorMatching;