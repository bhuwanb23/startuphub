import React, { useState } from 'react';

const CompetitorAnalysis = () => {
  const [timeRange, setTimeRange] = useState('12months');
  
  // Mock data for competitors
  const competitors = [
    {
      id: 1,
      name: 'TechSolutions Inc.',
      marketShare: 25,
      strength: 85,
      weakness: 30,
      trend: 'up',
      products: ['Product A', 'Product B'],
      lastFunding: '$50M Series C',
    },
    {
      id: 2,
      name: 'InnovateCorp',
      marketShare: 18,
      strength: 75,
      weakness: 45,
      trend: 'stable',
      products: ['Product X', 'Product Y', 'Product Z'],
      lastFunding: '$30M Series B',
    },
    {
      id: 3,
      name: 'FutureTech Ltd.',
      marketShare: 15,
      strength: 70,
      weakness: 50,
      trend: 'down',
      products: ['Solution 1', 'Solution 2'],
      lastFunding: '$20M Series B',
    },
    {
      id: 4,
      name: 'DigitalEdge',
      marketShare: 12,
      strength: 65,
      weakness: 55,
      trend: 'up',
      products: ['Platform Alpha', 'Platform Beta'],
      lastFunding: '$15M Series A',
    },
  ];

  // Mock data for competitive positioning
  const positioningData = [
    { competitor: 'TechSolutions Inc.', x: 80, y: 75, size: 25 },
    { competitor: 'InnovateCorp', x: 70, y: 65, size: 18 },
    { competitor: 'FutureTech Ltd.', x: 60, y: 55, size: 15 },
    { competitor: 'DigitalEdge', x: 65, y: 70, size: 12 },
    { competitor: 'Your Company', x: 75, y: 80, size: 20 },
  ];

  const getTrendIcon = (trend) => {
    if (trend === 'up') return '↗️';
    if (trend === 'down') return '↘️';
    return '➡️';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Competitor Analysis</h1>
        <p className="text-gray-600 mt-1">Comprehensive analysis of key competitors and market positioning</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Competitive Insight</h2>
            <p className="text-gray-700 mt-1">
              TechSolutions Inc. is the market leader with 25% share. Your positioning is strong in innovation 
              but needs improvement in customer retention. Consider differentiating on pricing strategy.
            </p>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTimeRange('3months')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              timeRange === '3months'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            3 Months
          </button>
          <button
            onClick={() => setTimeRange('6months')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              timeRange === '6months'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            6 Months
          </button>
          <button
            onClick={() => setTimeRange('12months')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              timeRange === '12months'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            12 Months
          </button>
        </div>
      </div>

      {/* Competitive Positioning Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Competitive Positioning</h2>
        <div className="h-80 relative border border-gray-200 rounded-lg">
          {/* Chart axes */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300"></div>
          <div className="absolute bottom-0 left-0 h-full w-px bg-gray-300"></div>
          
          {/* Axis labels */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
            Market Share →
          </div>
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 rotate-[-90deg] text-sm text-gray-500">
            Innovation →
          </div>
          
          {/* Data points */}
          {positioningData.map((company, index) => (
            <div
              key={index}
              className={`absolute rounded-full flex items-center justify-center ${
                company.competitor === 'Your Company' 
                  ? 'bg-[#FF6A00] text-white border-2 border-white shadow-lg' 
                  : 'bg-blue-500 text-white'
              }`}
              style={{
                left: `${company.x}%`,
                bottom: `${company.y}%`,
                width: `${company.size * 2}px`,
                height: `${company.size * 2}px`,
                transform: 'translate(-50%, 50%)',
              }}
            >
              {company.competitor === 'Your Company' ? 'YC' : company.competitor.charAt(0)}
            </div>
          ))}
          
          {/* Legend */}
          <div className="absolute top-4 right-4 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 rounded-full bg-[#FF6A00] mr-2"></div>
              <span className="text-sm">Your Company</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm">Competitors</span>
            </div>
          </div>
        </div>
      </div>

      {/* Competitor Comparison Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Competitor Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Competitor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market Share
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Strength
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weakness
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Funding
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {competitors.map((competitor) => (
                <tr key={competitor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{competitor.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{competitor.marketShare}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${competitor.strength}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{competitor.strength}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-red-500"
                          style={{ width: `${competitor.weakness}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{competitor.weakness}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getTrendIcon(competitor.trend)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                      {competitor.products.map((product, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {product}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {competitor.lastFunding}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SWOT Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Your Company SWOT</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <h3 className="font-bold text-green-800">Strengths</h3>
              <ul className="mt-2 space-y-1 text-sm text-green-700">
                <li>• Strong innovation capability</li>
                <li>• Agile development process</li>
                <li>• Customer-centric approach</li>
              </ul>
            </div>
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <h3 className="font-bold text-red-800">Weaknesses</h3>
              <ul className="mt-2 space-y-1 text-sm text-red-700">
                <li>• Limited market presence</li>
                <li>• Smaller sales team</li>
                <li>• Brand recognition</li>
              </ul>
            </div>
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <h3 className="font-bold text-blue-800">Opportunities</h3>
              <ul className="mt-2 space-y-1 text-sm text-blue-700">
                <li>• Emerging markets</li>
                <li>• Strategic partnerships</li>
                <li>• Product expansion</li>
              </ul>
            </div>
            <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
              <h3 className="font-bold text-yellow-800">Threats</h3>
              <ul className="mt-2 space-y-1 text-sm text-yellow-700">
                <li>• New entrants</li>
                <li>• Changing regulations</li>
                <li>• Economic downturn</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Competitive Intelligence */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Competitive Intelligence</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-bold text-blue-800">Market Share Trend</h3>
              <p className="text-sm text-blue-700 mt-1">
                Your market share has increased by 3% over the last quarter, indicating successful market penetration.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-bold text-purple-800">Technology Gap</h3>
              <p className="text-sm text-purple-700 mt-1">
                Competitors are investing 20% more in AI technologies. Consider increasing R&D budget in this area.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h3 className="font-bold text-orange-800">Customer Sentiment</h3>
              <p className="text-sm text-orange-700 mt-1">
                Customer satisfaction scores are 15% higher than industry average, a key competitive advantage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorAnalysis;