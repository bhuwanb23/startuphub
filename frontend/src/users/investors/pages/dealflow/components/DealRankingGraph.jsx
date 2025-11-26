import React from 'react';

const DealRankingGraph = () => {
  // Mock data for the graph
  const rankingData = [
    { name: 'NeuroSync AI', score: 95, risk: 'Low', credibility: 92 },
    { name: 'GreenTech Pro', score: 88, risk: 'Medium', credibility: 85 },
    { name: 'FinStream Analytics', score: 82, risk: 'Low', credibility: 78 },
    { name: 'HealthPulse AI', score: 79, risk: 'Medium', credibility: 82 },
    { name: 'EcoPack Solutions', score: 75, risk: 'High', credibility: 70 },
    { name: 'DataVault Inc', score: 72, risk: 'Low', credibility: 75 },
    { name: 'CloudShift Tech', score: 68, risk: 'Medium', credibility: 65 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Deal Ranking Score Visualizer</h2>
        <p className="text-gray-600 mt-1">AI-generated rankings based on market potential, team strength, and growth metrics</p>
      </div>
      
      <div className="space-y-4 overflow-hidden">
        {rankingData.map((company, index) => (
          <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300">
            <div className="w-8 text-lg font-bold text-gray-800">#{index + 1}</div>
            
            <div className="ml-4 flex-1">
              <h3 className="font-bold text-gray-800">{company.name}</h3>
              <div className="flex items-center mt-1">
                <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                  Score: {company.score}
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  company.risk === 'Low' ? 'bg-green-100 text-green-800' :
                  company.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  Risk: {company.risk}
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-xs text-gray-600">
                  Credibility: {company.credibility}
                </span>
              </div>
            </div>
            
            <div className="w-32">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Ranking</span>
                <span className="font-bold text-gray-800">{company.score}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-[#FF8C42] to-[#FF6A00]"
                  style={{ width: `${company.score}%` }}
                ></div>
              </div>
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
              <h3 className="text-sm font-bold text-gray-800">AI Insight</h3>
              <p className="text-xs text-gray-600">NeuroSync AI ranks highest with a 95 score based on market potential and team strength</p>
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

export default DealRankingGraph;