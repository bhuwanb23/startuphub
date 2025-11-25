import React, { useState } from 'react';

const InvestorMatching = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    stage: 'all',
    industry: 'all',
    location: 'all',
    checkSize: 'all',
  });
  
  // Mock data for investors
  const investors = [
    {
      id: 1,
      name: 'Venture Capital Partners',
      avatar: '💼',
      type: 'Venture Capital',
      stage: 'Series A-B',
      industry: 'Tech, Healthcare',
      location: 'San Francisco, CA',
      checkSize: '$2M-$10M',
      portfolio: 42,
      investments: 18,
      matchScore: 92,
      tags: ['AI', 'HealthTech', 'SaaS'],
    },
    {
      id: 2,
      name: 'Innovation Fund',
      avatar: '💰',
      type: 'Private Equity',
      stage: 'Series B-C',
      industry: 'Fintech, Energy',
      location: 'New York, NY',
      checkSize: '$5M-$25M',
      portfolio: 28,
      investments: 12,
      matchScore: 88,
      tags: ['Fintech', 'Clean Energy', 'Enterprise'],
    },
    {
      id: 3,
      name: 'Angel Investor Network',
      avatar: '👨‍💼',
      type: 'Angel Group',
      stage: 'Pre-Seed to A',
      industry: 'Consumer, Retail',
      location: 'Austin, TX',
      checkSize: '$100K-$2M',
      portfolio: 65,
      investments: 32,
      matchScore: 85,
      tags: ['E-commerce', 'Consumer Tech', 'Marketplace'],
    },
    {
      id: 4,
      name: 'Growth Capital Partners',
      avatar: '📈',
      type: 'Growth Fund',
      stage: 'Series C+',
      industry: 'SaaS, AI',
      location: 'Boston, MA',
      checkSize: '$10M-$50M',
      portfolio: 15,
      investments: 8,
      matchScore: 82,
      tags: ['Enterprise SaaS', 'AI/ML', 'B2B'],
    },
  ];

  const stages = ['all', 'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+'];
  const industries = ['all', 'Tech', 'Healthcare', 'Fintech', 'Energy', 'Consumer', 'Retail'];
  const locations = ['all', 'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Boston, MA'];
  const checkSizes = ['all', '$100K-$2M', '$2M-$10M', '$10M-$25M', '$25M+'];

  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStage = selectedFilters.stage === 'all' || investor.stage.includes(selectedFilters.stage);
    const matchesIndustry = selectedFilters.industry === 'all' || investor.industry.includes(selectedFilters.industry);
    const matchesLocation = selectedFilters.location === 'all' || investor.location.includes(selectedFilters.location);
    const matchesCheckSize = selectedFilters.checkSize === 'all' || investor.checkSize === selectedFilters.checkSize;
    
    return matchesSearch && matchesStage && matchesIndustry && matchesLocation && matchesCheckSize;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Investor Matching</h1>
        <p className="text-gray-600 mt-1">Discover and connect with investors aligned with your startup</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Match Insight</h2>
            <p className="text-gray-700 mt-1">
              Venture Capital Partners has a 92% match score with your startup profile. 
              They recently invested in two AI healthcare companies and focus on Series A-B rounds.
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
                placeholder="Search investors, industries, or keywords..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedFilters.stage}
              onChange={(e) => setSelectedFilters({...selectedFilters, stage: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              {stages.map(stage => (
                <option key={stage} value={stage}>
                  {stage === 'all' ? 'All Stages' : stage}
                </option>
              ))}
            </select>
            
            <select
              value={selectedFilters.industry}
              onChange={(e) => setSelectedFilters({...selectedFilters, industry: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>
                  {industry === 'all' ? 'All Industries' : industry}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Investors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInvestors.map((investor) => (
          <div key={investor.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="text-4xl mr-4">{investor.avatar}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{investor.name}</h3>
                  <p className="text-[#FF6A00] text-sm font-medium">{investor.type}</p>
                  <p className="text-gray-600 text-sm">{investor.location}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#FF6A00]">{investor.matchScore}%</div>
                <div className="text-sm text-gray-500">Match Score</div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {investor.stage}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {investor.checkSize}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {investor.portfolio} portfolio
                </span>
              </div>
            </div>
            
            <div className="mt-3">
              <h4 className="text-sm font-semibold text-gray-700">Focus Industries</h4>
              <p className="text-gray-600 text-sm mt-1">{investor.industry}</p>
            </div>
            
            <div className="mt-3">
              <h4 className="text-sm font-semibold text-gray-700">Recent Investments</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {investor.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div>{investor.investments} recent investments</div>
            </div>
            
            <div className="mt-4 flex gap-2">
              <button className="flex-1 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
                Connect
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Funding Pipeline Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Funding Pipeline Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl font-bold text-[#FF6A00]">12</div>
            <div className="text-sm text-gray-600">Matched Investors</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl font-bold text-[#FF6A00]">8</div>
            <div className="text-sm text-gray-600">Outreach Sent</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl font-bold text-[#FF6A00]">5</div>
            <div className="text-sm text-gray-600">Meetings Scheduled</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl font-bold text-[#FF6A00]">2</div>
            <div className="text-sm text-gray-600">LOIs Received</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorMatching;