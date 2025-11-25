import React, { useState } from 'react';

const Matchmaking = () => {
  const [activeTab, setActiveTab] = useState('suggestions');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for AI-powered suggestions
  const suggestions = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      avatar: '👩‍🔬',
      type: 'Researcher',
      matchReason: 'Expert in genetic engineering matching your AI diagnostics project',
      matchScore: 94,
      expertise: 'CRISPR, Gene Therapy',
      location: 'Stanford, CA',
      availability: 'Immediate',
      tags: ['Biotech', 'AI Integration', 'Patents'],
    },
    {
      id: 2,
      name: 'Alex Thompson',
      avatar: '👨‍💼',
      type: 'Co-Founder',
      matchReason: 'Product management expert with startup scaling experience',
      matchScore: 91,
      expertise: 'Product Strategy, Go-to-Market',
      location: 'San Francisco, CA',
      availability: '2 weeks',
      tags: ['SaaS', 'B2B', 'Fundraising'],
    },
    {
      id: 3,
      name: 'Jennifer Park',
      avatar: '👩‍🚀',
      type: 'Innovator',
      matchReason: 'Healthcare innovation leader with digital health focus',
      matchScore: 88,
      expertise: 'Digital Health, Telemedicine',
      location: 'Chicago, IL',
      availability: 'Immediate',
      tags: ['HealthTech', 'AI Diagnostics', 'Regulatory'],
    },
    {
      id: 4,
      name: 'Dr. Amanda Foster',
      avatar: '👩‍🏫',
      type: 'Expert',
      matchReason: 'Patent attorney specializing in biotech IP protection',
      matchScore: 85,
      expertise: 'Patent Law, IP Strategy',
      location: 'San Francisco, CA',
      availability: '1 week',
      tags: ['IP Protection', 'Licensing', 'Biotech'],
    },
  ];

  // Mock data for saved matches
  const savedMatches = [
    {
      id: 1,
      name: 'Michael Torres',
      avatar: '👨‍💼',
      type: 'Investor',
      matchReason: 'Venture capitalist focusing on healthtech and AI startups',
      matchScore: 89,
      expertise: 'Venture Capital, Series A-B',
      location: 'New York, NY',
      status: 'Contacted',
    },
    {
      id: 2,
      name: 'Lisa Wang',
      avatar: '👩‍🚀',
      type: 'Advisor',
      matchReason: 'Former CTO with expertise in scaling tech teams to 100+',
      matchScore: 87,
      expertise: 'Tech Leadership, Scaling',
      location: 'Seattle, WA',
      status: 'Pending Response',
    },
  ];

  // Mock data for match history
  const matchHistory = [
    {
      id: 1,
      name: 'Robert Kim',
      avatar: '👨‍🚀',
      type: 'Innovator',
      date: '2024-06-15',
      outcome: 'Connected',
      project: 'Fintech Security Platform',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      avatar: '👩‍💼',
      type: 'Co-Founder',
      date: '2024-06-10',
      outcome: 'Not Interested',
      project: 'SaaS Product Development',
    },
    {
      id: 3,
      name: 'David Rodriguez',
      avatar: '👨‍🚀',
      type: 'Researcher',
      date: '2024-06-05',
      outcome: 'Connected',
      project: 'Autonomous Vehicle Sensors',
    },
  ];

  const filteredSuggestions = suggestions.filter(suggestion => 
    suggestion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    suggestion.expertise.toLowerCase().includes(searchTerm.toLowerCase()) ||
    suggestion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Matchmaking Suggestions</h1>
        <p className="text-gray-600 mt-1">AI-powered recommendations for collaboration opportunities</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Matchmaking Insight</h2>
            <p className="text-gray-700 mt-1">
              Dr. Sarah Johnson has a 94% match score with your AI diagnostics project. 
              She has published 12 papers in genetic engineering and holds 5 relevant patents.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'suggestions'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            AI Suggestions
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'saved'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Saved Matches
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Match History
          </button>
        </div>

        {/* Search */}
        <div className="mt-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search matchmaking suggestions..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* AI Suggestions Tab */}
        {activeTab === 'suggestions' && (
          <div className="mt-6 space-y-4">
            {filteredSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">{suggestion.avatar}</div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-bold text-gray-800">{suggestion.name}</h3>
                        <span className="ml-2 px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                          {suggestion.type}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{suggestion.matchReason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#FF6A00]">{suggestion.matchScore}%</div>
                    <div className="text-sm text-gray-500">Match Score</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {suggestion.expertise}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {suggestion.location}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {suggestion.availability}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1">
                    {suggestion.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
                    Connect Now
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Save for Later
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Saved Matches Tab */}
        {activeTab === 'saved' && (
          <div className="mt-6 space-y-4">
            {savedMatches.map((match) => (
              <div key={match.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">{match.avatar}</div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-bold text-gray-800">{match.name}</h3>
                        <span className="ml-2 px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                          {match.type}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{match.matchReason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#FF6A00]">{match.matchScore}%</div>
                    <div className="text-sm text-gray-500">Match Score</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {match.expertise}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {match.location}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    match.status === 'Contacted' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {match.status}
                  </span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-sm hover:bg-[#FFE9D7] transition-colors">
                      Send Message
                    </button>
                    <button className="px-3 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-sm hover:bg-[#FFE9D7] transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Match History Tab */}
        {activeTab === 'history' && (
          <div className="mt-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Match
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Outcome
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {matchHistory.map((match) => (
                    <tr key={match.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">{match.avatar}</div>
                          <div className="text-sm font-medium text-gray-900">{match.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                          {match.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {match.project}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {match.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          match.outcome === 'Connected' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {match.outcome}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-[#FF6A00] hover:text-[#e05500]">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Matchmaking Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Matchmaking Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">87%</div>
            <div className="text-sm text-gray-600">Match Accuracy</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">42</div>
            <div className="text-sm text-gray-600">Active Suggestions</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">28</div>
            <div className="text-sm text-gray-600">Successful Matches</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">72%</div>
            <div className="text-sm text-gray-600">Connection Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matchmaking;