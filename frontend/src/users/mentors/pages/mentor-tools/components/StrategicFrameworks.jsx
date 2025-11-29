import React, { useState } from 'react';

const StrategicFrameworks = () => {
  const [selectedFramework, setSelectedFramework] = useState('swot');

  const frameworks = [
    {
      id: 'swot',
      name: 'SWOT Analysis',
      description: 'Strengths, Weaknesses, Opportunities, Threats analysis',
      icon: '📊'
    },
    {
      id: 'okr',
      name: 'OKRs',
      description: 'Objectives and Key Results framework',
      icon: '🎯'
    },
    {
      id: 'growth',
      name: 'Growth Loops',
      description: 'Customer acquisition and retention loops',
      icon: '🔄'
    },
    {
      id: 'gtm',
      name: 'GTM Canvas',
      description: 'Go-To-Market strategy canvas',
      icon: '🚀'
    }
  ];

  const renderFrameworkContent = () => {
    switch (selectedFramework) {
      case 'swot':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-green-800 mb-2">Strengths</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Strong technical team</li>
                <li>• Proprietary technology</li>
                <li>• Early market entry</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-bold text-red-800 mb-2">Weaknesses</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Limited marketing budget</li>
                <li>• Small customer base</li>
                <li>• Dependency on key personnel</li>
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-800 mb-2">Opportunities</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Emerging market trends</li>
                <li>• Strategic partnerships</li>
                <li>• Government incentives</li>
              </ul>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-bold text-yellow-800 mb-2">Threats</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Intense competition</li>
                <li>• Regulatory changes</li>
                <li>• Economic downturn</li>
              </ul>
            </div>
          </div>
        );
      case 'okr':
        return (
          <div>
            <div className="mb-4">
              <h4 className="font-bold text-gray-800 mb-2">Objective: Achieve Market Leadership</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Key Result 1: Acquire 1000 paying customers by Q4</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Key Result 2: Expand to 3 new geographic markets</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">Key Result 3: Achieve 40% month-over-month growth</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'growth':
        return (
          <div className="text-center py-8">
            <div className="inline-block bg-[#FFF9F0] rounded-full p-4 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Growth Loop Visualization</h4>
            <p className="text-gray-600">Interactive growth loop diagram would appear here</p>
            <button className="mt-4 px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors">
              Edit Growth Loop
            </button>
          </div>
        );
      case 'gtm':
        return (
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-800 mb-2">Target Segments</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• SMBs in healthcare</li>
                <li>• Enterprise clients</li>
                <li>• Government agencies</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-800 mb-2">Value Proposition</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cost reduction</li>
                <li>• Time efficiency</li>
                <li>• Compliance assurance</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-800 mb-2">Channels</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Direct sales</li>
                <li>• Partnerships</li>
                <li>• Online marketing</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Strategic Frameworks</h2>
        <p className="text-gray-600">Interactive visual tools for strategic planning and analysis</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {frameworks.map((framework) => (
          <button
            key={framework.id}
            onClick={() => setSelectedFramework(framework.id)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              selectedFramework === framework.id
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{framework.icon}</span>
            {framework.name}
          </button>
        ))}
      </div>

      <div className="border border-gray-200 rounded-xl p-6 min-h-[300px]">
        {renderFrameworkContent()}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors">
          Save Framework
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Export as PDF
        </button>
      </div>
    </div>
  );
};

export default StrategicFrameworks;