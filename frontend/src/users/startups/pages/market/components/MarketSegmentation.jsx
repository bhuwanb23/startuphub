import React, { useState } from 'react';

const MarketSegmentation = () => {
  const [selectedSegment, setSelectedSegment] = useState('all');
  
  // Mock data for market segments
  const segments = [
    { id: 'enterprise', name: 'Enterprise', size: '45%', growth: '+12%', revenue: '$2.4B' },
    { id: 'smb', name: 'Small & Medium Business', size: '35%', growth: '+18%', revenue: '$1.8B' },
    { id: 'startup', name: 'Startups', size: '15%', growth: '+25%', revenue: '$0.9B' },
    { id: 'individual', name: 'Individual Users', size: '5%', growth: '+8%', revenue: '$0.3B' },
  ];

  // Mock data for segmentation heatmap
  const heatmapData = [
    { segment: 'Enterprise', demographic: 'Tech', adoption: 90, revenue: 85 },
    { segment: 'Enterprise', demographic: 'Finance', adoption: 75, revenue: 90 },
    { segment: 'Enterprise', demographic: 'Healthcare', adoption: 60, revenue: 70 },
    { segment: 'SMB', demographic: 'Tech', adoption: 80, revenue: 75 },
    { segment: 'SMB', demographic: 'Retail', adoption: 85, revenue: 80 },
    { segment: 'SMB', demographic: 'Services', adoption: 70, revenue: 65 },
    { segment: 'Startups', demographic: 'Tech', adoption: 95, revenue: 90 },
    { segment: 'Startups', demographic: 'Fintech', adoption: 85, revenue: 85 },
    { segment: 'Startups', demographic: 'Healthtech', adoption: 80, revenue: 75 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Market Segmentation</h1>
        <p className="text-gray-600 mt-1">Detailed analysis of market segments and opportunities</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Market Insight</h2>
            <p className="text-gray-700 mt-1">
              Startups represent the fastest-growing segment with 25% annual growth. 
              Focus on SMB and Startup segments for maximum impact in the next 12 months.
            </p>
          </div>
        </div>
      </div>

      {/* Segment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {segments.map((segment) => (
          <div 
            key={segment.id} 
            className={`bg-white rounded-xl border p-6 cursor-pointer transition-all ${
              selectedSegment === segment.id 
                ? 'border-[#FF6A00] shadow-lg' 
                : 'border-gray-200 hover:border-[#FF8C42]/30'
            }`}
            onClick={() => setSelectedSegment(segment.id)}
          >
            <h3 className="text-lg font-bold text-gray-800">{segment.name}</h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Market Size</span>
                <span className="font-medium">{segment.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Growth Rate</span>
                <span className="font-medium text-green-600">{segment.growth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Revenue</span>
                <span className="font-medium">{segment.revenue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Segmentation Heatmap */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Segmentation Heatmap</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Segment
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Demographic
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Adoption Rate
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue Potential
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {heatmapData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {data.segment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.demographic}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${data.adoption}%`,
                            background: `linear-gradient(to right, #FF8C42, #FF6A00)`
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{data.adoption}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${data.revenue}%`,
                            background: `linear-gradient(to right, #FF8C42, #FF6A00)`
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{data.revenue}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Geographic Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">North America</span>
              <span className="text-[#FF6A00] font-bold">45%</span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-[#FF6A00] rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className="mt-2 text-sm text-gray-600">Growth: +15%</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Europe</span>
              <span className="text-[#FF6A00] font-bold">30%</span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-[#FF6A00] rounded-full" style={{ width: '30%' }}></div>
            </div>
            <div className="mt-2 text-sm text-gray-600">Growth: +12%</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Asia-Pacific</span>
              <span className="text-[#FF6A00] font-bold">25%</span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-[#FF6A00] rounded-full" style={{ width: '25%' }}></div>
            </div>
            <div className="mt-2 text-sm text-gray-600">Growth: +22%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketSegmentation;