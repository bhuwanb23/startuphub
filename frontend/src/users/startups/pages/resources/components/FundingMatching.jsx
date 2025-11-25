import React, { useState } from 'react';

const FundingMatching = () => {
  const [matches, setMatches] = useState([
    {
      id: 1,
      name: 'Innovation Grant Program',
      organization: 'National Science Foundation',
      type: 'Grant',
      amount: '$50,000 - $250,000',
      deadline: '2024-03-15',
      stage: 'Early Stage',
      rating: 4.6,
      compatibility: 91,
      matchReason: 'Perfect fit for AI research and development projects',
    },
    {
      id: 2,
      name: 'Women-Led Startup Fund',
      organization: 'Empower Ventures',
      type: 'Equity Free',
      amount: '$25,000 - $100,000',
      deadline: '2024-02-28',
      stage: 'Pre-Seed',
      rating: 4.8,
      compatibility: 87,
      matchReason: 'Your founding team qualifies, strong support program',
    },
    {
      id: 3,
      name: 'Tech Accelerator Program',
      organization: 'StartupHub Accelerator',
      type: 'Accelerator',
      amount: '$100,000 (6% equity)',
      deadline: '2024-04-01',
      stage: 'Seed',
      rating: 4.5,
      compatibility: 83,
      matchReason: 'Industry focus aligns with your product, mentor network',
    },
  ]);

  const [selectedFunding, setSelectedFunding] = useState(null);

  const handleApply = (funding) => {
    alert(`Application initiated for ${funding.name}!`);
  };

  const handleViewDetails = (funding) => {
    setSelectedFunding(funding);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Funding Scheme Matching</h1>
        <p className="text-gray-600 mt-1">AI-powered funding opportunity recommendations</p>
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
              Based on your startup's focus on AI technology, early stage, and funding needs, 
              we've identified funding schemes that align with your profile and have high success rates 
              for similar startups.
            </p>
          </div>
        </div>
      </div>

      {/* Funding Matches */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((funding) => (
          <div key={funding.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#FF8C42]/30 transition-all shadow-sm hover:shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{funding.name}</h3>
                <p className="text-[#FF6A00] font-medium">{funding.organization}</p>
                <p className="text-sm text-gray-600 mt-1">{funding.type}</p>
              </div>
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-bold">{funding.organization.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FF6A00] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{funding.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Amount:</span>
                <span className="ml-1 font-medium">{funding.amount}</span>
              </div>
              <div>
                <span className="text-gray-500">Stage:</span>
                <span className="ml-1 font-medium">{funding.stage}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Compatibility Score</span>
                <span>Deadline: {funding.deadline}</span>
              </div>
              <div className="mt-1 flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] h-2 rounded-full" 
                    style={{ width: `${funding.compatibility}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm font-bold text-[#FF6A00]">{funding.compatibility}%</span>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Why recommended:</span> {funding.matchReason}
              </p>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => handleApply(funding)}
                className="flex-1 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
              >
                Apply
              </button>
              <button
                onClick={() => handleViewDetails(funding)}
                className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Funding Application Assistant */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Funding Application Assistant</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                📄
              </div>
              <h3 className="font-medium text-gray-800">Document Generator</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              AI-powered generation of executive summaries, business plans, and financial projections
            </p>
            <button className="mt-3 text-[#FF6A00] text-sm font-medium hover:underline">
              Generate Documents
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🎯
              </div>
              <h3 className="font-medium text-gray-800">Targeted Applications</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Customized applications for each funding scheme based on their specific requirements
            </p>
            <button className="mt-3 text-[#FF6A00] text-sm font-medium hover:underline">
              Create Application
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                📊
              </div>
              <h3 className="font-medium text-gray-800">Success Analytics</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Track application success rates and receive feedback for improvement
            </p>
            <button className="mt-3 text-[#FF6A00] text-sm font-medium hover:underline">
              View Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Upcoming Deadlines</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <h3 className="font-medium text-gray-800">Innovation Grant Program</h3>
              <span className="text-sm text-gray-500">NSF</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-sm text-gray-600">Application deadline</span>
              <span className="text-sm font-medium text-red-600">March 15, 2024</span>
            </div>
            <button className="mt-3 text-[#FF6A00] text-sm font-medium hover:underline">
              Apply Now
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <h3 className="font-medium text-gray-800">Women-Led Startup Fund</h3>
              <span className="text-sm text-gray-500">Empower Ventures</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-sm text-gray-600">Application deadline</span>
              <span className="text-sm font-medium text-yellow-600">February 28, 2024</span>
            </div>
            <button className="mt-3 text-[#FF6A00] text-sm font-medium hover:underline">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingMatching;