import React from 'react';

const InvestmentOpportunities = () => {
  const opportunities = [
    {
      id: 1,
      name: 'GreenTech Solutions',
      sector: 'Clean Energy',
      stage: 'Series A',
      investment: '$2.5M',
      roi: '22%',
      matchScore: 92,
      tags: ['AI', 'Sustainability', 'Hardware'],
    },
    {
      id: 2,
      name: 'FinStream Analytics',
      sector: 'Fintech',
      stage: 'Pre-Seed',
      investment: '$800K',
      roi: '35%',
      matchScore: 88,
      tags: ['AI', 'Blockchain', 'Payments'],
    },
    {
      id: 3,
      name: 'HealthPulse AI',
      sector: 'HealthTech',
      stage: 'Seed',
      investment: '$1.2M',
      roi: '28%',
      matchScore: 85,
      tags: ['AI', 'Healthcare', 'IoT'],
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">AI-Based Investment Opportunities</h2>
          <p className="text-sm text-gray-600 mt-1">Curated opportunities based on your investment history</p>
        </div>
        <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
          View Opportunities
        </button>
      </div>
      
      <div className="space-y-4">
        {opportunities.map((opportunity) => (
          <div key={opportunity.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold text-gray-800">{opportunity.name}</h3>
                <div className="flex items-center mt-1">
                  <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                    {opportunity.sector}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-xs text-gray-600">{opportunity.stage}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-xs text-gray-600">{opportunity.investment}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-800">ROI: {opportunity.roi}</div>
                <div className="text-xs text-gray-600">Match: {opportunity.matchScore}%</div>
              </div>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-1">
              {opportunity.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mt-4 flex gap-2">
              <button className="px-3 py-1 bg-[#FF6A00] text-white rounded text-sm hover:bg-[#e05500] transition-colors">
                View Details
              </button>
              <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors">
                Add to Watchlist
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
              🤖
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">AI Recommendation</h3>
              <p className="text-xs text-gray-600">Based on your portfolio, GreenTech Solutions has the highest match score (92%)</p>
            </div>
          </div>
          <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentOpportunities;