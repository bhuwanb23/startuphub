import React, { useState } from 'react';

const CommercialPotential = () => {
  const [selectedTechnology, setSelectedTechnology] = useState('your-research');

  // Mock data for commercial potential scoring
  const technologies = [
    {
      id: 'your-research',
      name: 'Your Research Technology',
      score: 76,
      marketSize: '₹2,500 Cr',
      growthRate: '15%',
      competitivePosition: 'Strong',
      roiEstimate: '22%'
    },
    {
      id: 'competitor-a',
      name: 'Competitor A Solution',
      score: 68,
      marketSize: '₹1,800 Cr',
      growthRate: '12%',
      competitivePosition: 'Moderate',
      roiEstimate: '18%'
    },
    {
      id: 'competitor-b',
      name: 'Competitor B Platform',
      score: 82,
      marketSize: '₹3,200 Cr',
      growthRate: '18%',
      competitivePosition: 'Very Strong',
      roiEstimate: '25%'
    },
    {
      id: 'emerging-tech',
      name: 'Emerging Alternative',
      score: 45,
      marketSize: '₹800 Cr',
      growthRate: '25%',
      competitivePosition: 'Weak',
      roiEstimate: '12%'
    }
  ];

  const currentTech = technologies.find(tech => tech.id === selectedTechnology);

  // Scoring factors
  const scoringFactors = [
    { factor: 'Market Demand', weight: 25, score: 85 },
    { factor: 'Technical Feasibility', weight: 20, score: 78 },
    { factor: 'Competitive Advantage', weight: 20, score: 82 },
    { factor: 'Regulatory Environment', weight: 15, score: 70 },
    { factor: 'Scalability', weight: 10, score: 90 },
    { factor: 'IP Strength', weight: 10, score: 88 }
  ];

  // Calculate weighted score
  const calculateWeightedScore = () => {
    return scoringFactors.reduce((total, factor) => {
      return total + (factor.score * factor.weight / 100);
    }, 0);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">💰 Commercial Potential Score</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Score Overview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">AI-Generated Commercial Score</h2>
            
            {/* Score Display */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-48 h-48 mb-4">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  {/* Background circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray="565.48"
                    strokeDashoffset={565.48 - (currentTech?.score / 100) * 565.48}
                    transform="rotate(-90 100 100)"
                  />
                  {/* Center text */}
                  <text
                    x="100"
                    y="100"
                    textAnchor="middle"
                    dy="7"
                    fontSize="36"
                    fontWeight="bold"
                    fill="#f97316"
                  >
                    {currentTech?.score}
                  </text>
                  <text
                    x="100"
                    y="130"
                    textAnchor="middle"
                    fontSize="14"
                    fill="#6b7280"
                  >
                    out of 100
                  </text>
                </svg>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900">{currentTech?.name}</h3>
              <p className="text-gray-600 mt-1">Commercial Viability Score</p>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50 rounded-lg p-3 text-center">
                <p className="text-sm text-orange-800">Market Size</p>
                <p className="text-lg font-bold text-orange-600">{currentTech?.marketSize}</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3 text-center">
                <p className="text-sm text-orange-800">Growth Rate</p>
                <p className="text-lg font-bold text-orange-600">{currentTech?.growthRate}</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3 text-center">
                <p className="text-sm text-orange-800">ROI Estimate</p>
                <p className="text-lg font-bold text-orange-600">{currentTech?.roiEstimate}</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3 text-center">
                <p className="text-sm text-orange-800">Position</p>
                <p className="text-lg font-bold text-orange-600">{currentTech?.competitivePosition}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Middle Column - Scoring Factors */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Scoring Factors</h2>
            
            <div className="space-y-4">
              {scoringFactors.map((factor, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{factor.factor}</span>
                    <span className="text-sm font-medium text-gray-700">{factor.score}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full" 
                      style={{ width: `${factor.score}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-gray-500 mt-1">
                    Weight: {factor.weight}%
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Weighted Score Calculation</span>
                <span className="font-bold text-orange-600">{calculateWeightedScore().toFixed(1)}/100</span>
              </div>
            </div>
            
            {/* Scoring Algorithm Explanation */}
            <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h3 className="font-medium text-orange-800 mb-2">How Scoring Works</h3>
              <p className="text-sm text-orange-700">
                Our AI algorithm evaluates your technology across six key dimensions, 
                each weighted based on importance to commercial success. The final score 
                represents the technology's readiness for market entry and potential ROI.
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Column - Comparison and Recommendations */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Market Comparison</h2>
            
            {/* Technology Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Compare With</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={selectedTechnology}
                onChange={(e) => setSelectedTechnology(e.target.value)}
              >
                {technologies.map(tech => (
                  <option key={tech.id} value={tech.id}>{tech.name}</option>
                ))}
              </select>
            </div>
            
            {/* Comparison Bar Chart */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Score Comparison</h3>
              <div className="space-y-3">
                {technologies.map(tech => (
                  <div key={tech.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{tech.name.split(' ')[0]}</span>
                      <span className="font-medium">{tech.score}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          tech.id === selectedTechnology 
                            ? 'bg-orange-500' 
                            : tech.score > currentTech?.score 
                              ? 'bg-red-500' 
                              : 'bg-green-500'
                        }`} 
                        style={{ width: `${tech.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* ROI Estimation */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">ROI Estimation</h3>
              <div className="bg-gradient-to-r from-orange-50 to-saffron-50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-700">Estimated 5-Year ROI</span>
                  <span className="font-bold text-orange-600">{currentTech?.roiEstimate}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-orange-500 h-3 rounded-full" 
                    style={{ width: currentTech?.roiEstimate }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Based on market analysis and comparable technology deployments
                </p>
              </div>
            </div>
            
            {/* Recommendations */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">AI Recommendations</h3>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <ul className="space-y-2 text-sm text-orange-800">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Strengthen IP portfolio to improve competitive position</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Partner with industry leaders to accelerate market entry</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Focus on regulatory compliance in key markets</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialPotential;