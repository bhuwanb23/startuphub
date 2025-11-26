import React from 'react';

const MarketAnalysis = ({ data }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Market & Competition Analysis</h2>
      <p className="text-gray-600">Market sizing, competitor analysis, and opportunity scoring</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Market Size</h3>
        <div className="text-center py-8">
          <div className="text-3xl font-bold text-[#FF6A00]">${(data.marketSize / 1000000000).toFixed(1)}B</div>
          <div className="text-gray-600 mt-2">Total Addressable Market</div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Opportunity Index</h3>
        <div className="flex items-center justify-center py-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-8 border-[#FFF5EB] flex items-center justify-center">
              <div className="text-2xl font-bold text-[#FF6A00]">{data.opportunityIndex}/10</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-bold text-gray-800 mb-4">Competitor Comparison</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Share</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strength</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weakness</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">NeuroSync AI</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">25%</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">Technology</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600">Marketing</td>
            </tr>
            <tr>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">MindBridge</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">18%</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">Brand</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600">Scalability</td>
            </tr>
            <tr>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">CogniTech</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">15%</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">Partnerships</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600">Funding</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-bold text-gray-800 mb-4">Real-time Sentiment Data</h3>
      <div className="h-32 flex items-end space-x-2">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-gradient-to-t from-[#FF8C42] to-[#FF6A00] rounded-t-lg"
              style={{ height: `${Math.random() * 80 + 20}%` }}
            ></div>
            <div className="text-xs text-gray-500 mt-2">W{i + 1}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-sm text-gray-600">
        Current sentiment score: {data.sentiment}/10
      </div>
    </div>
  </div>
);

export default MarketAnalysis;