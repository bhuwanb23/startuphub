import React, { useState } from 'react';

const TechEvaluationFrameworks = () => {
  const [evaluations, setEvaluations] = useState({
    scalability: 75,
    maturity: 60,
    security: 80,
    architecture: 70
  });

  const criteria = [
    {
      id: 'scalability',
      name: 'Scalability',
      description: 'System ability to handle growth in users, data, and transactions',
      max: 100
    },
    {
      id: 'maturity',
      name: 'Tech Maturity',
      description: 'Stability and proven track record of technology stack',
      max: 100
    },
    {
      id: 'security',
      name: 'Security',
      description: 'Data protection, encryption, and access control measures',
      max: 100
    },
    {
      id: 'architecture',
      name: 'Architecture Alignment',
      description: 'Fit with industry best practices and future extensibility',
      max: 100
    }
  ];

  const calculateRiskScore = () => {
    const total = Object.values(evaluations).reduce((sum, value) => sum + value, 0);
    return Math.round(total / Object.keys(evaluations).length);
  };

  const getRiskLevel = (score) => {
    if (score >= 80) return { level: 'Low', color: 'bg-green-500' };
    if (score >= 60) return { level: 'Medium', color: 'bg-yellow-500' };
    return { level: 'High', color: 'bg-red-500' };
  };

  const riskScore = calculateRiskScore();
  const riskLevel = getRiskLevel(riskScore);

  const handleSliderChange = (criteriaId, value) => {
    setEvaluations({
      ...evaluations,
      [criteriaId]: parseInt(value)
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tech Evaluation Frameworks</h2>
        <p className="text-gray-600">Comprehensive checklist for technology stack assessment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#FFF9F0] rounded-xl p-5 border border-[#FFDAB9]">
          <h3 className="font-bold text-gray-800 mb-4">Technology Risk Assessment</h3>
          
          {criteria.map((criterion) => (
            <div key={criterion.id} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{criterion.name}</span>
                <span className="text-sm font-medium text-[#FF6A00]">{evaluations[criterion.id]}%</span>
              </div>
              <input
                type="range"
                min="0"
                max={criterion.max}
                value={evaluations[criterion.id]}
                onChange={(e) => handleSliderChange(criterion.id, e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF6A00]"
              />
              <p className="text-xs text-gray-500 mt-1">{criterion.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-center p-6 bg-white border border-gray-200 rounded-xl">
            <h3 className="font-bold text-gray-800 mb-2">Auto-Generated Tech Risk Score</h3>
            <div className="relative inline-block">
              <svg className="w-32 h-32" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#FF6A00"
                  strokeWidth="3"
                  strokeDasharray={`${riskScore}, 100`}
                />
                <text x="18" y="20.5" textAnchor="middle" fill="#FF6A00" fontSize="8" fontWeight="bold">
                  {riskScore}%
                </text>
              </svg>
            </div>
            <div className="mt-4">
              <span className={`inline-block px-3 py-1 rounded-full text-white ${riskLevel.color}`}>
                {riskLevel.level} Risk
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Based on current evaluation, the technology stack presents a <strong>{riskLevel.level.toLowerCase()}</strong> risk profile.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-3">AI Recommendations</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <div className="mt-1 mr-2 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm text-blue-700">Consider implementing microservices architecture to improve scalability</span>
          </li>
          <li className="flex items-start">
            <div className="mt-1 mr-2 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm text-blue-700">Upgrade to the latest stable version of your core framework</span>
          </li>
          <li className="flex items-start">
            <div className="mt-1 mr-2 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm text-blue-700">Implement comprehensive security testing in your CI/CD pipeline</span>
          </li>
        </ul>
      </div>

      <div className="mt-6 flex justify-between">
        <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors">
          Generate Detailed Report
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Save Evaluation
        </button>
      </div>
    </div>
  );
};

export default TechEvaluationFrameworks;