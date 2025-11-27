import React from 'react';

const GapBasedMatching = ({ startup }) => {
  // Mock data for gap analysis
  const gapData = {
    skillGap: 75,
    strategyGap: 60,
    productGap: 80,
    techGap: 70
  };

  const gapItems = [
    { name: 'Skill Gap Analysis', value: gapData.skillGap, color: 'bg-blue-500' },
    { name: 'Business Strategy Gap', value: gapData.strategyGap, color: 'bg-green-500' },
    { name: 'Product Development Gap', value: gapData.productGap, color: 'bg-yellow-500' },
    { name: 'Tech Architecture Gap', value: gapData.techGap, color: 'bg-purple-500' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC]">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Gap-Based Matching</h2>
      
      <div className="space-y-4">
        {gapItems.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-gray-700 text-sm">{item.name}</span>
              <span className="text-[#FF6A00] font-medium">{item.value}%</span>
            </div>
            <div className="w-full bg-[#FFF2DC] rounded-full h-2">
              <div 
                className={`${item.color} h-2 rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-[#FFF9F0] rounded-lg">
        <h3 className="font-bold text-gray-800 mb-2">Recommendations</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex items-start">
            <span className="text-[#FF6A00] mr-2">•</span>
            <span>Focus on business model validation with customer discovery</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#FF6A00] mr-2">•</span>
            <span>Improve technical architecture for scalability</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#FF6A00] mr-2">•</span>
            <span>Develop go-to-market strategy for target segments</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GapBasedMatching;