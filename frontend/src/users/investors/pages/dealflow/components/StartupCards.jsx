import React from 'react';

const StartupCards = () => {
  // Mock data for startup cards
  const startups = [
    {
      id: 1,
      name: 'NeuroSync AI',
      sector: 'AI/ML',
      stage: 'Series A',
      geography: 'San Francisco, CA',
      valuation: '$25M',
      revenue: '$2.4M',
      traction: '120K Users',
      aiScore: 95,
      riskProfile: 'Low',
      credibilityScore: 92,
      description: 'AI-powered neurotechnology platform for cognitive enhancement',
      tags: ['AI', 'Healthcare', 'Neurotech'],
    },
    {
      id: 2,
      name: 'GreenTech Pro',
      sector: 'Clean Energy',
      stage: 'Series B',
      geography: 'Austin, TX',
      valuation: '$42M',
      revenue: '$5.8M',
      traction: '85K Users',
      aiScore: 88,
      riskProfile: 'Medium',
      credibilityScore: 85,
      description: 'Renewable energy solutions for commercial buildings',
      tags: ['Clean Energy', 'Sustainability', 'IoT'],
    },
    {
      id: 3,
      name: 'FinStream Analytics',
      sector: 'Fintech',
      stage: 'Series A',
      geography: 'New York, NY',
      valuation: '$18M',
      revenue: '$1.9M',
      traction: '45K Users',
      aiScore: 82,
      riskProfile: 'Low',
      credibilityScore: 78,
      description: 'Real-time financial data analytics for institutional investors',
      tags: ['Fintech', 'Analytics', 'Big Data'],
    },
    {
      id: 4,
      name: 'HealthPulse AI',
      sector: 'HealthTech',
      stage: 'Seed',
      geography: 'Boston, MA',
      valuation: '$8M',
      revenue: '$400K',
      traction: '22K Users',
      aiScore: 79,
      riskProfile: 'Medium',
      credibilityScore: 82,
      description: 'AI-driven patient monitoring and early diagnosis platform',
      tags: ['Healthcare', 'AI', 'IoT'],
    },
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">AI-Recommended Startups</h2>
        <div className="text-sm text-gray-600">Showing {startups.length} opportunities</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {startups.map((startup) => (
          <div key={startup.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{startup.name}</h3>
                <div className="flex items-center mt-1">
                  <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                    {startup.sector}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-xs text-gray-600">{startup.stage}</span>
                </div>
              </div>
              <div className="flex items-center bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-3 py-1 rounded-full">
                <span className="text-sm font-bold">#{startup.aiScore}</span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mt-3">{startup.description}</p>
            
            <div className="mt-4 flex flex-wrap gap-1">
              {startup.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-gray-500">Geography</div>
                <div className="font-medium text-gray-800">{startup.geography}</div>
              </div>
              <div>
                <div className="text-gray-500">Valuation</div>
                <div className="font-medium text-gray-800">{startup.valuation}</div>
              </div>
              <div>
                <div className="text-gray-500">Revenue</div>
                <div className="font-medium text-gray-800">{startup.revenue}</div>
              </div>
              <div>
                <div className="text-gray-500">Traction</div>
                <div className="font-medium text-gray-800">{startup.traction}</div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(startup.riskProfile)}`}>
                    Risk: {startup.riskProfile}
                  </div>
                  <div className="ml-2 flex items-center bg-yellow-100 px-2 py-1 rounded">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    <span className="text-xs font-bold text-gray-800">{startup.credibilityScore}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-2">
              <button className="flex-1 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
                Save to Pipeline
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Reject
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">AI Investment Insight</h3>
            <p className="text-gray-700 mt-1">
              Based on your investment history and preferences, NeuroSync AI has the highest match score (95) 
              with strong potential in the growing neurotechnology market. GreenTech Pro offers excellent 
              diversification with sustainable growth prospects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupCards;