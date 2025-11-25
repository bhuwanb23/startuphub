import React, { useState } from 'react';

const OpportunityScoring = () => {
  const [selectedCriteria, setSelectedCriteria] = useState('all');
  
  // Mock data for opportunities
  const opportunities = [
    {
      id: 1,
      name: 'HealthTech Solutions',
      score: 92,
      category: 'Healthcare',
      marketSize: '$120B',
      growthRate: '+18%',
      investment: '$2.5B',
      risk: 'Low',
      timeline: '6-12 months',
      description: 'AI-powered diagnostic tools for early disease detection showing strong market traction.',
    },
    {
      id: 2,
      name: 'FinTech Accessibility',
      score: 88,
      category: 'Finance',
      marketSize: '$85B',
      growthRate: '+22%',
      investment: '$1.8B',
      risk: 'Medium',
      timeline: '3-9 months',
      description: 'Financial services targeting unbanked populations with mobile-first solutions.',
    },
    {
      id: 3,
      name: 'EdTech Personalization',
      score: 85,
      category: 'Education',
      marketSize: '$65B',
      growthRate: '+15%',
      investment: '$1.2B',
      risk: 'Low',
      timeline: '12-18 months',
      description: 'Adaptive learning platforms using machine learning for personalized education.',
    },
    {
      id: 4,
      name: 'AgriTech Innovation',
      score: 82,
      category: 'Agriculture',
      marketSize: '$95B',
      growthRate: '+25%',
      investment: '$800M',
      risk: 'High',
      timeline: '18-24 months',
      description: 'Precision farming solutions using IoT sensors and predictive analytics.',
    },
    {
      id: 5,
      name: 'Green Energy Storage',
      score: 90,
      category: 'Energy',
      marketSize: '$150B',
      growthRate: '+30%',
      investment: '$3.2B',
      risk: 'Medium',
      timeline: '9-15 months',
      description: 'Advanced battery technology for renewable energy storage systems.',
    },
  ];

  const criteriaOptions = [
    { id: 'all', name: 'All Opportunities' },
    { id: 'high-score', name: 'High Score (>85)' },
    { id: 'low-risk', name: 'Low Risk' },
    { id: 'fast-timeline', name: 'Fast Timeline (<12 months)' },
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOpportunities = selectedCriteria === 'all' 
    ? opportunities 
    : selectedCriteria === 'high-score'
    ? opportunities.filter(op => op.score > 85)
    : selectedCriteria === 'low-risk'
    ? opportunities.filter(op => op.risk === 'Low')
    : selectedCriteria === 'fast-timeline'
    ? opportunities.filter(op => parseInt(op.timeline) < 12)
    : opportunities;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Opportunity Scoring</h1>
        <p className="text-gray-600 mt-1">Evaluate and prioritize market opportunities based on multiple factors</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Opportunity Insight</h2>
            <p className="text-gray-700 mt-1">
              HealthTech Solutions presents the highest opportunity score (92/100) with low risk and strong market fundamentals. 
              Green Energy Storage shows exceptional growth potential (+30%) but requires significant capital investment.
            </p>
          </div>
        </div>
      </div>

      {/* Criteria Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Filter Opportunities</h2>
        <div className="flex flex-wrap gap-2">
          {criteriaOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedCriteria(option.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedCriteria === option.id
                  ? 'bg-[#FF6A00] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunity Score Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Opportunity Scores</h2>
        <div className="space-y-4">
          {filteredOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{opportunity.name}</h3>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 mt-1">
                    {opportunity.category}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#FF6A00]">{opportunity.score}/100</div>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${getRiskColor(opportunity.risk)} mt-1`}>
                    {opportunity.risk} Risk
                  </span>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-[#FF6A00]"
                    style={{ width: `${opportunity.score}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <div className="text-xs text-gray-500">Market Size</div>
                  <div className="font-medium">{opportunity.marketSize}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Growth Rate</div>
                  <div className="font-medium text-green-600">{opportunity.growthRate}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Investment</div>
                  <div className="font-medium">{opportunity.investment}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Timeline</div>
                  <div className="font-medium">{opportunity.timeline}</div>
                </div>
              </div>
              
              <p className="mt-3 text-gray-600 text-sm">{opportunity.description}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-sm hover:bg-[#FFE9D7] transition-colors">
                  View Details
                </button>
                <button className="px-3 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-sm hover:bg-[#FFE9D7] transition-colors">
                  Add to Watchlist
                </button>
                <button className="px-3 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-sm hover:bg-[#FFE9D7] transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scoring Matrix */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Opportunity Scoring Matrix</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Scoring Criteria Weight</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Market Size</span>
                  <span>25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Growth Potential</span>
                  <span>20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: '20%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Competitive Landscape</span>
                  <span>15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-purple-500" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Risk Assessment</span>
                  <span>15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-red-500" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Implementation Timeline</span>
                  <span>15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-yellow-500" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Resource Requirements</span>
                  <span>10%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-indigo-500" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Scoring Legend</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                <span className="text-sm">90-100: Exceptional Opportunity</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                <span className="text-sm">80-89: High Potential</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                <span className="text-sm">70-79: Moderate Potential</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                <span className="text-sm">60-69: Low Potential</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                <span className="text-sm">Below 60: Not Recommended</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-[#FFF5EB] rounded-lg border border-[#FFD7B5]">
              <h4 className="font-bold text-[#FF6A00]">Recommendation</h4>
              <p className="text-sm mt-2">
                Focus resources on HealthTech Solutions and Green Energy Storage opportunities. 
                Both present high scores with favorable market conditions and growth trajectories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityScoring;