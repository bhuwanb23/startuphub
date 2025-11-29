import React, { useState } from 'react';

const AIScreeningSystem = () => {
  const [activeTab, setActiveTab] = useState('radial');

  // Mock data for scores
  const scores = {
    readiness: 85,
    productMaturity: 78,
    teamCapacity: 92,
    marketPotential: 88,
    ip: 75,
    competitiveEdge: 82
  };

  // Mock data for spider chart
  const spiderData = [
    { name: 'Readiness', value: 85 },
    { name: 'Product', value: 78 },
    { name: 'Team', value: 92 },
    { name: 'Market', value: 88 },
    { name: 'IP', value: 75 },
    { name: 'Edge', value: 82 }
  ];

  // Mock data for score comparison
  const comparisonData = [
    { name: 'TechFlow Innovations', scores: [85, 78, 92, 88, 75, 82] },
    { name: 'GreenEnergy Solutions', scores: [92, 85, 88, 90, 80, 85] },
    { name: 'HealthTrack', scores: [78, 70, 85, 80, 70, 75] }
  ];

  const scoreCategories = [
    'Readiness Score',
    'Product Maturity',
    'Team Capacity',
    'Market Potential',
    'IP Score',
    'Competitive Edge'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">AI-Based Screening System</h2>
        <p className="text-gray-600">Comprehensive AI-powered evaluation of startup potential</p>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('radial')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'radial'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Radial Charts
        </button>
        <button
          onClick={() => setActiveTab('spider')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'spider'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Spider Graph
        </button>
        <button
          onClick={() => setActiveTab('comparison')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'comparison'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Score Comparison
        </button>
      </div>

      {/* Radial Charts View */}
      {activeTab === 'radial' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h3 className="font-bold text-gray-800 mb-4">Readiness Score</h3>
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#FF6A00"
                    strokeWidth="8"
                    strokeDasharray={`${scores.readiness * 2.83} 283`}
                    transform="rotate(-90 50 50)"
                  />
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dy="7"
                    fontSize="20"
                    fontWeight="bold"
                    fill="#FF6A00"
                  >
                    {scores.readiness}
                  </text>
                </svg>
              </div>
              <p className="text-gray-600 text-sm mt-2">Overall readiness assessment</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h3 className="font-bold text-gray-800 mb-4">Product Maturity</h3>
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#FF6A00"
                    strokeWidth="8"
                    strokeDasharray={`${scores.productMaturity * 2.83} 283`}
                    transform="rotate(-90 50 50)"
                  />
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dy="7"
                    fontSize="20"
                    fontWeight="bold"
                    fill="#FF6A00"
                  >
                    {scores.productMaturity}
                  </text>
                </svg>
              </div>
              <p className="text-gray-600 text-sm mt-2">Product development stage</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h3 className="font-bold text-gray-800 mb-4">Team Capacity</h3>
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#FF6A00"
                    strokeWidth="8"
                    strokeDasharray={`${scores.teamCapacity * 2.83} 283`}
                    transform="rotate(-90 50 50)"
                  />
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dy="7"
                    fontSize="20"
                    fontWeight="bold"
                    fill="#FF6A00"
                  >
                    {scores.teamCapacity}
                  </text>
                </svg>
              </div>
              <p className="text-gray-600 text-sm mt-2">Team skills and experience</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h3 className="font-bold text-gray-800 mb-4">Market Potential</h3>
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#FF6A00"
                    strokeWidth="8"
                    strokeDasharray={`${scores.marketPotential * 2.83} 283`}
                    transform="rotate(-90 50 50)"
                  />
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dy="7"
                    fontSize="20"
                    fontWeight="bold"
                    fill="#FF6A00"
                  >
                    {scores.marketPotential}
                  </text>
                </svg>
              </div>
              <p className="text-gray-600 text-sm mt-2">Market size and opportunity</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h3 className="font-bold text-gray-800 mb-4">IP Score</h3>
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#FF6A00"
                    strokeWidth="8"
                    strokeDasharray={`${scores.ip * 2.83} 283`}
                    transform="rotate(-90 50 50)"
                  />
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dy="7"
                    fontSize="20"
                    fontWeight="bold"
                    fill="#FF6A00"
                  >
                    {scores.ip}
                  </text>
                </svg>
              </div>
              <p className="text-gray-600 text-sm mt-2">Intellectual property strength</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h3 className="font-bold text-gray-800 mb-4">Competitive Edge</h3>
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#FF6A00"
                    strokeWidth="8"
                    strokeDasharray={`${scores.competitiveEdge * 2.83} 283`}
                    transform="rotate(-90 50 50)"
                  />
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dy="7"
                    fontSize="20"
                    fontWeight="bold"
                    fill="#FF6A00"
                  >
                    {scores.competitiveEdge}
                  </text>
                </svg>
              </div>
              <p className="text-gray-600 text-sm mt-2">Unique advantages</p>
            </div>
          </div>
        </div>
      )}

      {/* Spider Graph View */}
      {activeTab === 'spider' && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-6 text-center">Spider Graph Visualization</h3>
          <div className="flex justify-center">
            <div className="relative w-64 h-64">
              <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* Grid circles */}
                {[0, 25, 50, 75, 100].map((radius, i) => (
                  <circle
                    key={i}
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="0.5"
                  />
                ))}

                {/* Axes */}
                {spiderData.map((_, i) => {
                  const angle = (i * 2 * Math.PI) / spiderData.length - Math.PI / 2;
                  const x = 100 + 100 * Math.cos(angle);
                  const y = 100 + 100 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1="100"
                      y1="100"
                      x2={x}
                      y2={y}
                      stroke="#e5e7eb"
                      strokeWidth="0.5"
                    />
                  );
                })}

                {/* Data polygon */}
                <polygon
                  points={spiderData
                    .map((point, i) => {
                      const angle = (i * 2 * Math.PI) / spiderData.length - Math.PI / 2;
                      const radius = (point.value / 100) * 100;
                      const x = 100 + radius * Math.cos(angle);
                      const y = 100 + radius * Math.sin(angle);
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="rgba(255, 106, 0, 0.2)"
                  stroke="#FF6A00"
                  strokeWidth="2"
                />

                {/* Labels */}
                {spiderData.map((point, i) => {
                  const angle = (i * 2 * Math.PI) / spiderData.length - Math.PI / 2;
                  const x = 100 + 110 * Math.cos(angle);
                  const y = 100 + 110 * Math.sin(angle);
                  return (
                    <text
                      key={i}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dy="5"
                      fontSize="10"
                      fill="#4b5563"
                    >
                      {point.name}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Score Comparison View */}
      {activeTab === 'comparison' && (
        <div>
          <h3 className="font-bold text-gray-800 mb-6">Score Comparison</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Startup
                  </th>
                  {scoreCategories.map((category, index) => (
                    <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {category.split(' ')[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {comparisonData.map((startup, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {startup.name}
                    </td>
                    {startup.scores.map((score, scoreIndex) => (
                      <td key={scoreIndex} className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="mr-2">{score}</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#FF6A00] h-2 rounded-full"
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Reasoning Button */}
      <div className="mt-8 flex justify-center">
        <button className="px-6 py-3 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] font-medium flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          View AI Reasoning & Factors
        </button>
      </div>
    </div>
  );
};

export default AIScreeningSystem;