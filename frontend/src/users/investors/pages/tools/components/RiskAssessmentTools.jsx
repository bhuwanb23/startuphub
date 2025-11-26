import React, { useState } from 'react';

const RiskAssessmentTools = () => {
  const [activeTab, setActiveTab] = useState('matrix');
  
  // Risk data for matrix
  const [risks, setRisks] = useState([
    { id: 1, name: 'Market Risk', likelihood: 3, impact: 4, category: 'Market' },
    { id: 2, name: 'Technology Risk', likelihood: 2, impact: 5, category: 'Technical' },
    { id: 3, name: 'Regulatory Risk', likelihood: 4, impact: 3, category: 'Compliance' },
    { id: 4, name: 'Financial Risk', likelihood: 3, impact: 4, category: 'Financial' },
    { id: 5, name: 'Team Risk', likelihood: 2, impact: 3, category: 'Operational' },
    { id: 6, name: 'Competitive Risk', likelihood: 4, impact: 4, category: 'Market' },
    { id: 7, name: 'Execution Risk', likelihood: 3, impact: 5, category: 'Operational' },
    { id: 8, name: 'IP Risk', likelihood: 2, impact: 4, category: 'Legal' }
  ]);
  
  // Radar chart data
  const [radarData, setRadarData] = useState({
    market: 7,
    technology: 8,
    financial: 6,
    team: 5,
    competitive: 7,
    regulatory: 4
  });
  
  const getRiskLevel = (likelihood, impact) => {
    const score = likelihood * impact;
    if (score >= 12) return { level: 'High', color: 'bg-[#FF6A00]', textColor: 'text-[#FF6A00]' };
    if (score >= 6) return { level: 'Medium', color: 'bg-[#FF8C42]', textColor: 'text-[#FF8C42]' };
    return { level: 'Low', color: 'bg-gray-400', textColor: 'text-gray-400' };
  };
  
  const getRiskColor = (value) => {
    if (value >= 7) return 'text-[#FF6A00]';
    if (value >= 5) return 'text-[#FF8C42]';
    return 'text-gray-400';
  };
  
  const tabs = [
    { id: 'matrix', name: 'Risk Matrix', icon: '📊' },
    { id: 'radar', name: 'Radar Chart', icon: '📍' },
    { id: 'assessment', name: 'Risk Assessment', icon: '📋' }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Risk Assessment Tools</h2>
        <p className="text-gray-600">Analyze and visualize investment risks</p>
      </div>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg transition-all flex items-center ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>
      
      {/* Risk Matrix */}
      {activeTab === 'matrix' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Risk Matrix</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Risk</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Category</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Likelihood</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Impact</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Risk Level</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {risks.map((risk) => {
                  const riskLevel = getRiskLevel(risk.likelihood, risk.impact);
                  return (
                    <tr key={risk.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{risk.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs">{risk.category}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{risk.likelihood}/5</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{risk.impact}/5</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${riskLevel.color} text-white`}>
                          {riskLevel.level}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button className="text-[#FF6A00] hover:text-[#e05500]">
                          Mitigate
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Matrix Visualization */}
          <div className="mt-8">
            <h4 className="font-medium text-gray-800 mb-4">Risk Matrix Visualization</h4>
            <div className="grid grid-cols-6 gap-0 border border-gray-300">
              {/* Headers */}
              <div className="p-2 bg-gray-100 border-b border-r border-gray-300"></div>
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="p-2 bg-gray-100 border-b border-r border-gray-300 text-center text-xs font-medium text-gray-700">
                  Impact {num}
                </div>
              ))}
              
              {/* Rows */}
              {[1, 2, 3, 4, 5].map((likelihood) => (
                <React.Fragment key={likelihood}>
                  <div className="p-2 bg-gray-100 border-b border-r border-gray-300 text-center text-xs font-medium text-gray-700">
                    Likelihood {likelihood}
                  </div>
                  {[1, 2, 3, 4, 5].map((impact) => {
                    const riskLevel = getRiskLevel(likelihood, impact);
                    const riskCount = risks.filter(r => r.likelihood === likelihood && r.impact === impact).length;
                    return (
                      <div 
                        key={`${likelihood}-${impact}`} 
                        className={`p-2 border-b border-r border-gray-300 flex items-center justify-center ${riskLevel.color.replace('bg-', 'bg-')} bg-opacity-20`}
                      >
                        {riskCount > 0 && (
                          <span className={`text-xs font-bold ${riskLevel.textColor}`}>
                            {riskCount}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Radar Chart */}
      {activeTab === 'radar' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Risk Radar Chart</h3>
          
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64">
              {/* Radar grid */}
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Concentric circles */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                  <circle
                    key={level}
                    cx="100"
                    cy="100"
                    r={level * 10}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="0.5"
                  />
                ))}
                
                {/* Axes */}
                {Object.keys(radarData).map((key, index) => {
                  const angle = (index * 2 * Math.PI) / Object.keys(radarData).length;
                  return (
                    <line
                      key={key}
                      x1="100"
                      y1="100"
                      x2={100 + 100 * Math.cos(angle - Math.PI / 2)}
                      y2={100 + 100 * Math.sin(angle - Math.PI / 2)}
                      stroke="#e5e7eb"
                      strokeWidth="0.5"
                    />
                  );
                })}
                
                {/* Data polygon */}
                <polygon
                  points={
                    Object.keys(radarData).map((key, index) => {
                      const angle = (index * 2 * Math.PI) / Object.keys(radarData).length;
                      const value = radarData[key];
                      return `${100 + value * 10 * Math.cos(angle - Math.PI / 2)},${100 + value * 10 * Math.sin(angle - Math.PI / 2)}`;
                    }).join(' ')
                  }
                  fill="rgba(255, 106, 0, 0.2)"
                  stroke="#FF6A00"
                  strokeWidth="2"
                />
                
                {/* Labels */}
                {Object.keys(radarData).map((key, index) => {
                  const angle = (index * 2 * Math.PI) / Object.keys(radarData).length;
                  const labelX = 100 + 110 * Math.cos(angle - Math.PI / 2);
                  const labelY = 100 + 110 * Math.sin(angle - Math.PI / 2);
                  return (
                    <text
                      key={key}
                      x={labelX}
                      y={labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="8"
                      fill="#4b5563"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </text>
                  );
                })}
              </svg>
            </div>
            
            {/* Legend */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(radarData).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${getRiskColor(value)}`}></div>
                  <div>
                    <div className="text-sm font-medium text-gray-800 capitalize">{key}</div>
                    <div className={`text-sm font-bold ${getRiskColor(value)}`}>{value}/10</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Risk Assessment Form */}
      {activeTab === 'assessment' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Risk Assessment Questionnaire</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Market Risks</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Market size and growth potential</span>
                  <select className="border border-gray-300 rounded-lg p-1 text-sm">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Competition intensity</span>
                  <select className="border border-gray-300 rounded-lg p-1 text-sm">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Technical Risks</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Technology feasibility</span>
                  <select className="border border-gray-300 rounded-lg p-1 text-sm">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">IP protection strength</span>
                  <select className="border border-gray-300 rounded-lg p-1 text-sm">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Financial Risks</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Burn rate sustainability</span>
                  <select className="border border-gray-300 rounded-lg p-1 text-sm">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Funding runway</span>
                  <select className="border border-gray-300 rounded-lg p-1 text-sm">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <button className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all font-medium">
                Generate Risk Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAssessmentTools;