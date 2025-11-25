import React, { useState } from 'react';

const InvestorMatching = () => {
  const [matches, setMatches] = useState([
    {
      id: 1,
      name: 'VentureCap Partners',
      type: 'Venture Capital',
      focus: 'AI, SaaS, FinTech',
      stage: 'Series A-B',
      checkSize: '$2M - $10M',
      rating: 4.7,
      compatibility: 94,
      matchReason: 'Recently invested in 3 AI startups, strong track record in your sector',
    },
    {
      id: 2,
      name: 'Innovate Ventures',
      type: 'Corporate VC',
      focus: 'Enterprise Tech, AI',
      stage: 'Seed - Series B',
      checkSize: '$500K - $5M',
      rating: 4.5,
      compatibility: 89,
      matchReason: 'Portfolio includes similar B2B SaaS companies, strategic value addition',
    },
    {
      id: 3,
      name: 'Growth Catalyst Fund',
      type: 'Private Equity',
      focus: 'Scaling Tech',
      stage: 'Series B+',
      checkSize: '$10M - $50M',
      rating: 4.8,
      compatibility: 82,
      matchReason: 'Specializes in helping companies scale to $100M+ ARR',
    },
  ]);

  const [selectedInvestor, setSelectedInvestor] = useState(null);

  const handleConnect = (investor) => {
    alert(`Investor introduction request sent to ${investor.name}!`);
  };

  const handleViewProfile = (investor) => {
    setSelectedInvestor(investor);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Investor Matching</h1>
        <p className="text-gray-600 mt-1">AI-powered investor recommendations based on your startup profile</p>
      </div>

      {/* AI Recommendation Summary */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Recommendation</h2>
            <p className="text-gray-700 mt-1">
              Based on your current funding stage (Pre-Seed), traction metrics, and AI focus, 
              we've identified investors with a strong history of early-stage AI investments 
              and follow-on funding capabilities.
            </p>
          </div>
        </div>
      </div>

      {/* Investor Matches */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((investor) => (
          <div key={investor.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#FF8C42]/30 transition-all shadow-sm hover:shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{investor.name}</h3>
                <p className="text-[#FF6A00] font-medium">{investor.type}</p>
                <p className="text-sm text-gray-600 mt-1">{investor.focus}</p>
              </div>
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-bold">{investor.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FF6A00] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{investor.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Stage:</span>
                <span className="ml-1 font-medium">{investor.stage}</span>
              </div>
              <div>
                <span className="text-gray-500">Check Size:</span>
                <span className="ml-1 font-medium">{investor.checkSize}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Compatibility Score</span>
              </div>
              <div className="mt-1 flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] h-2 rounded-full" 
                    style={{ width: `${investor.compatibility}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm font-bold text-[#FF6A00]">{investor.compatibility}%</span>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Why recommended:</span> {investor.matchReason}
              </p>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => handleConnect(investor)}
                className="flex-1 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
              >
                Connect
              </button>
              <button
                onClick={() => handleViewProfile(investor)}
                className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Investment Readiness Checklist */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Investment Readiness Checklist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="ml-2 text-gray-700">Financial projections (12-18 months)</span>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="ml-2 text-gray-700">Traction metrics and KPIs</span>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="ml-2 text-gray-700">Investor pitch deck</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="ml-2 text-gray-700">Cap table and equity structure</span>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="ml-2 text-gray-700">Legal documents (incorporation, IP)</span>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span className="ml-2 text-gray-700">Customer references</span>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-4 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg">
            Generate Readiness Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestorMatching;