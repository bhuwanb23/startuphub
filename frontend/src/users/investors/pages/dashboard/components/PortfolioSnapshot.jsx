import React from 'react';

const PortfolioSnapshot = () => {
  const portfolioData = [
    { company: 'TechFlow AI', investment: '$2.4M', valuation: '$18M', roi: '+24%', stage: 'Series A' },
    { company: 'GreenEnergy Pro', investment: '$1.8M', valuation: '$12M', roi: '+18%', stage: 'Series B' },
    { company: 'HealthTrack Systems', investment: '$900K', valuation: '$8M', roi: '+32%', stage: 'Series A' },
    { company: 'FinSecure Labs', investment: '$3.2M', valuation: '$24M', roi: '+15%', stage: 'Series B' },
  ];

  const chartData = [
    { name: 'Fintech', value: 35, color: '#FF6A00' },
    { name: 'HealthTech', value: 25, color: '#F4A300' },
    { name: 'AI/ML', value: 20, color: '#FF8C42' },
    { name: 'Clean Energy', value: 15, color: '#FFA500' },
    { name: 'Others', value: 5, color: '#FFD580' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Portfolio Snapshot</h2>
        <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
          Open Portfolio
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Portfolio Distribution Chart */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-4">Portfolio Distribution</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Pie Chart */}
              <div className="absolute inset-0 rounded-full border-8 border-[#FF6A00]"></div>
              <div className="absolute inset-4 rounded-full border-8 border-[#F4A300]"></div>
              <div className="absolute inset-8 rounded-full border-8 border-[#FF8C42]"></div>
              <div className="absolute inset-12 rounded-full border-8 border-[#FFA500]"></div>
              <div className="absolute inset-16 rounded-full border-8 border-[#FFD580]"></div>
              
              {/* Center Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-gray-800">42</span>
                <span className="text-xs text-gray-600">Companies</span>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-4 space-y-2">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-700 flex-1">{item.name}</span>
                <span className="text-sm font-bold text-gray-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Portfolio Companies */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-4">Top Holdings</h3>
          <div className="space-y-3">
            {portfolioData.map((company, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-bold text-gray-800">{company.company}</h4>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-600">{company.stage}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-xs text-gray-600">Invested: {company.investment}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800">{company.valuation}</div>
                  <div className="text-xs text-green-600">{company.roi}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Portfolio Value</span>
              <span className="font-bold text-gray-800">$86.4M</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Unrealized Gain</span>
              <span className="font-bold text-green-600">+$18.2M (+26.7%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSnapshot;