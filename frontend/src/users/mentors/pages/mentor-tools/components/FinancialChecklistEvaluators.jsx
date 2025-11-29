import React, { useState } from 'react';

const FinancialChecklistEvaluators = () => {
  const [financialMetrics, setFinancialMetrics] = useState({
    cac: { value: 1250, status: 'good' },
    ltv: { value: 4800, status: 'good' },
    revenueModel: { value: 'Subscription', status: 'good' },
    burnRate: { value: 85000, status: 'warning' }
  });

  const checklistItems = [
    {
      id: 'cac',
      name: 'Customer Acquisition Cost (CAC)',
      description: 'Cost to acquire a new customer',
      currentValue: financialMetrics.cac.value,
      target: '< $1,500',
      status: financialMetrics.cac.status
    },
    {
      id: 'ltv',
      name: 'Lifetime Value (LTV)',
      description: 'Total revenue from a customer over their lifetime',
      currentValue: financialMetrics.ltv.value,
      target: '> $4,000',
      status: financialMetrics.ltv.status
    },
    {
      id: 'revenueModel',
      name: 'Revenue Model',
      description: 'Primary source of income',
      currentValue: financialMetrics.revenueModel.value,
      target: 'Diversified',
      status: financialMetrics.revenueModel.status
    },
    {
      id: 'burnRate',
      name: 'Monthly Burn Rate',
      description: 'Monthly cash consumption',
      currentValue: financialMetrics.burnRate.value,
      target: '< $75,000',
      status: financialMetrics.burnRate.status
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good': return '✓';
      case 'warning': return '⚠';
      case 'critical': return '✗';
      default: return '-';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Financial Checklist Evaluators</h2>
        <p className="text-gray-600">Evaluate key financial metrics with automated indicators</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {checklistItems.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(item.status)}`}>
                {getStatusIcon(item.status)}
              </span>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-sm text-gray-600">Current</p>
                <p className="font-bold text-gray-800">
                  {typeof item.currentValue === 'number' ? `$${item.currentValue.toLocaleString()}` : item.currentValue}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Target</p>
                <p className="font-bold text-gray-800">{item.target}</p>
              </div>
            </div>
            
            {item.id === 'cac' && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm mb-1">
                  <span>Efficiency Ratio</span>
                  <span className="font-medium">3.84x</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-[#FFF9F0] rounded-xl p-5 border border-[#FFDAB9]">
        <h3 className="font-bold text-gray-800 mb-3">Financial Health Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-green-600">2</p>
            <p className="text-sm text-gray-600">Good Metrics</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-yellow-600">1</p>
            <p className="text-sm text-gray-600">Needs Attention</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-red-600">1</p>
            <p className="text-sm text-gray-600">Critical Issues</p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
        <div className="flex">
          <div className="mr-3 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-blue-800 mb-1">AI Financial Recommendations</h4>
            <p className="text-sm text-blue-700">
              Focus on reducing your burn rate by 15% through operational efficiencies. 
              Consider introducing a tiered pricing model to increase LTV.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors">
          Generate Financial Report
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Export Checklist
        </button>
      </div>
    </div>
  );
};

export default FinancialChecklistEvaluators;