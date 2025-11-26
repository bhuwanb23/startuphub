import React from 'react';

const RiskProfileAlerts = () => {
  const alerts = [
    {
      id: 1,
      company: 'NeuroSync AI',
      riskType: 'Market Risk',
      severity: 'High',
      description: 'Competitor launched similar product with 30% lower pricing',
      impact: 'Potential revenue decrease of 15-20%',
    },
    {
      id: 2,
      company: 'EcoPack Solutions',
      riskType: 'Regulatory Risk',
      severity: 'Medium',
      description: 'New environmental regulations may impact production costs',
      impact: 'Possible 10% increase in operational expenses',
    },
    {
      id: 3,
      company: 'FinStream Analytics',
      riskType: 'Technology Risk',
      severity: 'Low',
      description: 'Dependency on single cloud provider poses availability risk',
      impact: 'Minor service disruption possible during outages',
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Risk Profile Alerts</h2>
        <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
          Check Alerts
        </button>
      </div>
      
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold text-gray-800">{alert.company}</h3>
                <div className="flex items-center mt-1">
                  <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                    {alert.riskType}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                    {alert.severity} Severity
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-3">
              <p className="text-sm text-gray-700">{alert.description}</p>
              <div className="mt-2 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                <p className="text-sm font-bold text-red-800">Impact:</p>
                <p className="text-sm text-red-700 mt-1">{alert.impact}</p>
              </div>
            </div>
            
            <div className="mt-4 flex gap-2">
              <button className="px-3 py-1 bg-[#FF6A00] text-white rounded text-sm hover:bg-[#e05500] transition-colors">
                Mitigate Risk
              </button>
              <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
              🛡️
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">Portfolio Risk Summary</h3>
              <p className="text-xs text-gray-600">Overall portfolio risk level: Medium (3 high-priority alerts)</p>
            </div>
          </div>
          <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
            View Risk Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskProfileAlerts;