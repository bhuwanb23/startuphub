import React from 'react';

const IPRAnalytics = () => {
  const analyticsData = {
    approvalProbability: 78,
    noveltyScore: 92,
    claimStrength: 84
  };
  
  const domainData = [
    { domain: 'Quantum Computing', score: 95, patents: 12 },
    { domain: 'AI & Machine Learning', score: 87, patents: 8 },
    { domain: 'Biotechnology', score: 76, patents: 15 },
    { domain: 'Clean Energy', score: 82, patents: 6 }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">📊 IPR Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Approval Probability */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-4">Approval Probability</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200 stroke-current"
                  strokeWidth="10"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                ></circle>
                <circle
                  className="text-[#FF6A00]  stroke-current"
                  strokeWidth="10"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * analyticsData.approvalProbability) / 100}
                  transform="rotate(-90 50 50)"
                ></circle>
                <text x="50" y="50" fontFamily="sans-serif" fontSize="20" textAnchor="middle" alignmentBaseline="middle" className="fill-[#FF6A00]">
                  {analyticsData.approvalProbability}%
                </text>
              </svg>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">Based on prior art analysis and claim strength</p>
          </div>
        </div>
        
        {/* Novelty Score */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-4">Novelty Score</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200 stroke-current"
                  strokeWidth="10"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                ></circle>
                <circle
                  className="text-[#FF6A00]  stroke-current"
                  strokeWidth="10"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * analyticsData.noveltyScore) / 100}
                  transform="rotate(-90 50 50)"
                ></circle>
                <text x="50" y="50" fontFamily="sans-serif" fontSize="20" textAnchor="middle" alignmentBaseline="middle" className="fill-[#FF6A00]">
                  {analyticsData.noveltyScore}%
                </text>
              </svg>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">Compared to existing patents in domain</p>
          </div>
        </div>
        
        {/* Claim Strength Score */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-4">Claim Strength Score</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200 stroke-current"
                  strokeWidth="10"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                ></circle>
                <circle
                  className="text-[#FF6A00]  stroke-current"
                  strokeWidth="10"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * analyticsData.claimStrength) / 100}
                  transform="rotate(-90 50 50)"
                ></circle>
                <text x="50" y="50" fontFamily="sans-serif" fontSize="20" textAnchor="middle" alignmentBaseline="middle" className="fill-[#FF6A00]">
                  {analyticsData.claimStrength}%
                </text>
              </svg>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">Based on clarity, scope, and defensibility</p>
          </div>
        </div>
      </div>
      
      {/* Technical Domain Clustering */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-6">Technical Domain Clustering</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Novelty Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patents Filed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {domainData.map((domain, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{domain.domain}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-lg font-bold text-[#FF6A00]">{domain.score}%</div>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#FF6A00] h-2 rounded-full" 
                          style={{ width: `${domain.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {domain.patents}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-green-500 mr-1">↗</span>
                      <span className="text-sm text-gray-600">
                        {domain.domain === 'Quantum Computing' ? '+12%' : 
                         domain.domain === 'AI & Machine Learning' ? '+8%' : 
                         domain.domain === 'Biotechnology' ? '+5%' : '+3%'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IPRAnalytics;