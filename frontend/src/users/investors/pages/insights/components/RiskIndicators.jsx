import React from 'react';

const RiskIndicators = () => {
  const riskIndicators = [
    {
      id: 1,
      level: 'Low',
      title: 'Regulatory Compliance',
      triggers: ['GDPR updates', 'Cross-border data'],
      probability: '15%',
      justification: 'Strong compliance frameworks in place with dedicated legal teams monitoring regulatory changes.'
    },
    {
      id: 2,
      level: 'Medium',
      title: 'Market Volatility',
      triggers: ['Interest rates', 'Geopolitical tensions'],
      probability: '45%',
      justification: 'Moderate exposure to volatile sectors with diversified portfolio providing some protection.'
    },
    {
      id: 3,
      level: 'High',
      title: 'Technology Disruption',
      triggers: ['AI breakthroughs', 'Quantum computing'],
      probability: '75%',
      justification: 'Rapid pace of innovation in core sectors poses significant disruption risk to existing investments.'
    }
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">⚠️ Industry-specific Risk Indicators</h2>
        <p className="text-gray-600">AI-assessed risk factors with mitigation recommendations</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {riskIndicators.map((risk) => (
          <div 
            key={risk.id} 
            className={`border rounded-lg p-5 ${getRiskColor(risk.level)}`}
          >
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-gray-800">{risk.title}</h3>
              <span className="px-2 py-1 bg-white rounded text-xs font-bold">
                {risk.level} Risk
              </span>
            </div>
            
            <div className="mt-3 text-sm">
              <div className="font-medium text-gray-800 mb-1">Key Triggers</div>
              <ul className="space-y-1">
                {risk.triggers.map((trigger, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#FF6A00] mr-1">•</span>
                    <span>{trigger}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-3 text-sm">
              <div className="font-medium text-gray-800">Timeline Probability</div>
              <div className="font-bold text-gray-800">{risk.probability}</div>
            </div>
            
            <div className="mt-3 text-sm">
              <div className="font-medium text-gray-800 mb-1">AI Justification</div>
              <p className="text-gray-700">{risk.justification}</p>
            </div>
            
            <div className="mt-4">
              <button className="w-full py-2 bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium">
                View Mitigation Insights
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskIndicators;