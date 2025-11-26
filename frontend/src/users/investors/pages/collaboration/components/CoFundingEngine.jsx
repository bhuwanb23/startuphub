import React, { useState } from 'react';

const CoFundingEngine = () => {
  const [activeTab, setActiveTab] = useState('recommendations');

  const recommendations = [
    {
      id: 1,
      startup: 'GreenTech Innovations',
      sector: 'Clean Energy',
      matchScore: 94,
      reason: 'Strong alignment with your Clean Energy focus and previous investments in solar technology. Similar stage and traction metrics to successful portfolio companies.',
      fundingStage: 'Series A',
      amount: '$8M',
      leadInvestor: 'Clean Energy Ventures',
      actions: ['Add to Pipeline', 'Bookmark', 'Share']
    },
    {
      id: 2,
      startup: 'HealthAI Diagnostics',
      sector: 'Healthtech',
      matchScore: 89,
      reason: 'Matches your recent expansion into healthcare AI. Strong FDA approval trajectory and experienced founding team with prior exits.',
      fundingStage: 'Series B',
      amount: '$15M',
      leadInvestor: 'MedTech Partners',
      actions: ['Add to Pipeline', 'Bookmark', 'Share']
    },
    {
      id: 3,
      startup: 'AgriDrone Systems',
      sector: 'AgriTech',
      matchScore: 87,
      reason: 'Complements your agritech portfolio with drone-based precision farming. Strong IP position and pilot programs with major agricultural corporations.',
      fundingStage: 'Series A',
      amount: '$5M',
      leadInvestor: 'FarmTech Capital',
      actions: ['Add to Pipeline', 'Bookmark', 'Share']
    },
    {
      id: 4,
      startup: 'Quantum Secure Networks',
      sector: 'Cybersecurity',
      matchScore: 85,
      reason: 'Emerging opportunity in quantum-resistant security. Early mover advantage with Fortune 500 pilot customers and strong advisory board.',
      fundingStage: 'Seed',
      amount: '$3M',
      leadInvestor: 'CyberFuture Fund',
      actions: ['Add to Pipeline', 'Bookmark', 'Share']
    }
  ];

  const pipeline = [
    {
      id: 101,
      startup: 'EduTech Platform',
      sector: 'EdTech',
      stage: 'Due Diligence',
      lastUpdated: '2025-11-20',
      nextStep: 'Partner Reference Calls'
    },
    {
      id: 102,
      startup: 'Logistics AI',
      sector: 'Supply Chain',
      stage: 'Term Sheet',
      lastUpdated: '2025-11-18',
      nextStep: 'Legal Review'
    }
  ];

  const bookmarks = [
    {
      id: 201,
      startup: 'SpaceTech Dynamics',
      sector: 'Aerospace',
      bookmarkedDate: '2025-11-15'
    },
    {
      id: 202,
      startup: 'BioMaterials Inc',
      sector: 'Materials',
      bookmarkedDate: '2025-11-10'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Co-funding Recommendation Engine</h2>
        <p className="text-gray-600">AI-powered investment opportunities matched to your portfolio strategy</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'recommendations'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Recommendations
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pipeline'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Pipeline
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bookmarks'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Bookmarks
          </button>
        </nav>
      </div>

      {/* Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {recommendations.map((rec) => (
              <div key={rec.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{rec.startup}</h3>
                    <div className="flex items-center mt-1">
                      <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                        {rec.sector}
                      </span>
                      <span className="ml-2 text-sm text-gray-600">{rec.fundingStage}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] px-3 py-1 rounded-full">
                      <span className="text-white font-bold">{rec.matchScore}</span>
                      <span className="text-white text-xs ml-1">Match</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Lead: {rec.leadInvestor}</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-800 mb-1">Why this match?</div>
                  <p className="text-gray-600">{rec.reason}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-[#FF6A00]">{rec.amount}</div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                      Add to Pipeline
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm">
                      Bookmark
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pipeline Tab */}
      {activeTab === 'pipeline' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Startup
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Step
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pipeline.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{item.startup}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                      {item.sector}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.stage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.nextStep}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#FF6A00] hover:text-[#e05500]">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Bookmarks Tab */}
      {activeTab === 'bookmarks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-800">{bookmark.startup}</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>
              <div className="flex items-center mt-2">
                <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                  {bookmark.sector}
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Bookmarked on {bookmark.bookmarkedDate}
                </div>
              </div>
              <div className="mt-4">
                <button className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoFundingEngine;