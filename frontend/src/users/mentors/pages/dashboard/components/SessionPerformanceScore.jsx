import React from 'react';

const SessionPerformanceScore = () => {
  // Mock data
  const performanceData = {
    contributionQuality: 92,
    strategyGuidance: 88,
    technicalDepth: 95,
    communication: 90,
    startupProgress: 85
  };

  // Calculate average score
  const scores = Object.values(performanceData);
  const averageScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800">Session Performance Score</h2>
        <div className="bg-[#FFF2DC] rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="w-40 h-40 rounded-full border-8 border-[#FFF2DC] flex items-center justify-center">
            <div className="text-center">
              <span className="text-3xl font-bold text-[#FF6A00]">{averageScore}%</span>
              <p className="text-gray-600 text-sm">AI Score</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-[#FF6A00] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-700">Contribution Quality</span>
            <span className="text-[#FF6A00] font-medium">{performanceData.contributionQuality}%</span>
          </div>
          <div className="w-full bg-[#FFF2DC] rounded-full h-2">
            <div 
              className="bg-[#FF6A00] h-2 rounded-full" 
              style={{ width: `${performanceData.contributionQuality}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-700">Strategy Guidance</span>
            <span className="text-[#FF6A00] font-medium">{performanceData.strategyGuidance}%</span>
          </div>
          <div className="w-full bg-[#FFF2DC] rounded-full h-2">
            <div 
              className="bg-[#FF6A00] h-2 rounded-full" 
              style={{ width: `${performanceData.strategyGuidance}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-700">Technical Depth</span>
            <span className="text-[#FF6A00] font-medium">{performanceData.technicalDepth}%</span>
          </div>
          <div className="w-full bg-[#FFF2DC] rounded-full h-2">
            <div 
              className="bg-[#FF6A00] h-2 rounded-full" 
              style={{ width: `${performanceData.technicalDepth}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-700">Communication</span>
            <span className="text-[#FF6A00] font-medium">{performanceData.communication}%</span>
          </div>
          <div className="w-full bg-[#FFF2DC] rounded-full h-2">
            <div 
              className="bg-[#FF6A00] h-2 rounded-full" 
              style={{ width: `${performanceData.communication}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-700">Startup Progress</span>
            <span className="text-[#FF6A00] font-medium">{performanceData.startupProgress}%</span>
          </div>
          <div className="w-full bg-[#FFF2DC] rounded-full h-2">
            <div 
              className="bg-[#FF6A00] h-2 rounded-full" 
              style={{ width: `${performanceData.startupProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionPerformanceScore;