import React, { useState } from 'react';

const MarketFitReport = () => {
  const [marketData, setMarketData] = useState({
    title: 'AI-Powered Drug Discovery Platform',
    opportunityScore: 88,
    marketSize: '$2.3B',
    growthRate: '12.5%',
    competitors: 12,
    competitivePosition: 'Strong',
    targetSegments: [
      { name: 'Pharmaceutical Companies', size: '$1.2B', penetration: '15%' },
      { name: 'Biotech Startups', size: '$800M', penetration: '8%' },
      { name: 'Research Institutions', size: '$300M', penetration: '25%' }
    ]
  });

  const [competitorData, setCompetitorData] = useState([
    { name: 'BioAI Solutions', marketShare: 25, strength: 'Strong' },
    { name: 'MediTech Innovations', marketShare: 20, strength: 'Strong' },
    { name: 'LifeSciences AI', marketShare: 15, strength: 'Moderate' },
    { name: 'Our Technology', marketShare: 0, strength: 'New Entrant' }
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Automated Market Fit Report</h1>
        <p className="text-gray-600">Comprehensive market analysis and opportunity assessment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Opportunity Score</h2>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e0e0e0"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#F4A300"
                  strokeWidth="3"
                  strokeDasharray={`${marketData.opportunityScore}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">{marketData.opportunityScore}%</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">Market Opportunity</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Market Overview</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Market Size</span>
                <span className="font-medium text-gray-800">{marketData.marketSize}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Growth Rate</span>
                <span className="font-medium text-green-600">{marketData.growthRate}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Competitors</span>
                <span className="font-medium text-gray-800">{marketData.competitors}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Competitive Position</span>
                <span className="font-medium text-gray-800">{marketData.competitivePosition}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Adoption Forecast</h2>
          <div className="h-32 flex items-end justify-between pt-4">
            {[20, 45, 65, 80, 90].map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="w-8 bg-[#F4A300] rounded-t"
                  style={{ height: `${value}%` }}
                ></div>
                <div className="text-xs text-gray-600 mt-2">Y{index+1}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">5-Year Adoption Projection</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Target Segments */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Target Market Segments</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Segment</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penetration</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {marketData.targetSegments.map((segment, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{segment.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{segment.size}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{segment.penetration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Competitor Mapping */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Competitor Mapping</h2>
          <div className="h-64 relative">
            {/* Scatter plot visualization */}
            <div className="absolute inset-0">
              {/* Grid lines */}
              <div className="absolute inset-0 grid grid-cols-5 grid-rows-5">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className="border border-gray-100"></div>
                ))}
              </div>
              
              {/* Competitor points */}
              {competitorData.map((competitor, index) => (
                <div 
                  key={index}
                  className={`absolute w-4 h-4 rounded-full ${
                    competitor.name === 'Our Technology' 
                      ? 'bg-[#F4A300] ring-2 ring-white' 
                      : competitor.strength === 'Strong' 
                        ? 'bg-red-500' 
                        : 'bg-blue-500'
                  }`}
                  style={{
                    left: `${20 + index * 15}%`,
                    top: `${80 - competitor.marketShare * 0.7}%`
                  }}
                  title={`${competitor.name}: ${competitor.marketShare}% market share`}
                ></div>
              ))}
              
              {/* Axis labels */}
              <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-gray-500">Market Share</div>
              <div className="absolute top-0 bottom-0 left-0 transform -rotate-90 origin-left text-center text-xs text-gray-500">Technology Strength</div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center text-xs">
              <span className="w-3 h-3 bg-[#F4A300] rounded-full mr-1"></span>
              Our Technology
            </span>
            <span className="inline-flex items-center text-xs">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span>
              Strong Competitors
            </span>
            <span className="inline-flex items-center text-xs">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
              Moderate Competitors
            </span>
          </div>
        </div>
      </div>

      {/* Action Panel */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Market Strategy Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="font-medium text-gray-800 mb-2">Focus Segments</div>
            <div className="text-sm text-gray-600">Pharmaceutical Companies and Research Institutions show highest potential</div>
          </div>
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="font-medium text-gray-800 mb-2">Differentiation Strategy</div>
            <div className="text-sm text-gray-600">Emphasize 40% faster drug discovery timeline</div>
          </div>
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="font-medium text-gray-800 mb-2">Entry Timing</div>
            <div className="text-sm text-gray-600">Optimal launch window in Q2 2024</div>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button className="bg-[#F4A300] hover:bg-[#F26B1D] text-white px-4 py-2 rounded-lg transition-colors">
            Export Full Report
          </button>
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
            Generate Presentation Deck
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketFitReport;