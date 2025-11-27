import React from 'react';

const StartupReadinessScore = ({ startup }) => {
  // Mock data for readiness scores
  const readinessData = {
    teamQuality: 85,
    marketValidation: 70,
    prototypeMaturity: 75,
    tractionLevel: 60,
    fundingReadiness: 80
  };

  const readinessItems = [
    { name: 'Team Quality', value: readinessData.teamQuality },
    { name: 'Market Validation', value: readinessData.marketValidation },
    { name: 'Prototype Maturity', value: readinessData.prototypeMaturity },
    { name: 'Traction Level', value: readinessData.tractionLevel },
    { name: 'Funding Readiness', value: readinessData.fundingReadiness }
  ];

  // Calculate average score
  const averageScore = Math.round(
    Object.values(readinessData).reduce((sum, score) => sum + score, 0) / 
    Object.values(readinessData).length
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Startup Readiness Score</h2>
        <div className="bg-[#FFF2DC] rounded-full p-2">
          <span className="text-[#FF6A00] font-bold">{averageScore}%</span>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-[#FFF2DC] flex items-center justify-center">
            <div className="text-center">
              <span className="text-2xl font-bold text-[#FF6A00]">{averageScore}%</span>
              <p className="text-gray-600 text-xs">Readiness</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-[#FF6A00] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {readinessItems.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-gray-700 text-sm">{item.name}</span>
              <span className="text-[#FF6A00] font-medium">{item.value}%</span>
            </div>
            <div className="w-full bg-[#FFF2DC] rounded-full h-2">
              <div 
                className="bg-[#FF6A00] h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartupReadinessScore;