import React from 'react';

const SectorDealFlow = () => {
  const sectors = [
    { name: 'Fintech', deals: 24, amount: '$42M', change: '+15%' },
    { name: 'HealthTech', deals: 18, amount: '$38M', change: '+22%' },
    { name: 'Clean Energy', deals: 15, amount: '$32M', change: '+35%' },
    { name: 'AI/ML', deals: 22, amount: '$56M', change: '+18%' },
    { name: 'E-commerce', deals: 12, amount: '$18M', change: '+8%' },
    { name: 'EdTech', deals: 9, amount: '$14M', change: '+12%' },
  ];

  const sectorTags = [
    'Fintech', 'HealthTech', 'Clean Energy', 'AI/ML', 'E-commerce', 'EdTech', 
    'Cybersecurity', 'FoodTech', 'PropTech', 'InsurTech', 'RetailTech', 'AutoTech'
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Sector-wise Deal Flow</h2>
        <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
          View All Sectors
        </button>
      </div>
      
      {/* Sector Tags */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {sectorTags.map((sector, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-full text-sm ${
                index === 0 
                  ? 'bg-[#FF6A00] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {sector}
            </button>
          ))}
        </div>
      </div>
      
      {/* Sector Deal Flow Chart */}
      <div className="space-y-4">
        {sectors.map((sector, index) => (
          <div key={index} className="flex items-center">
            <div className="w-32 text-sm font-medium text-gray-700">{sector.name}</div>
            <div className="flex-1 mx-4">
              <div className="flex items-center">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-[#FF8C42] to-[#FF6A00]"
                  style={{ width: `${Math.min(100, sector.deals * 4)}%` }}
                ></div>
                <div className="ml-2 text-xs text-gray-500">{sector.deals} deals</div>
              </div>
            </div>
            <div className="w-24 text-right text-sm font-bold text-gray-800">{sector.amount}</div>
            <div className="w-16 text-right text-xs text-green-600">{sector.change}</div>
          </div>
        ))}
      </div>
      
      {/* Sector Insights */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
              📊
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">Sector Insight</h3>
              <p className="text-xs text-gray-600">AI/ML sector shows highest growth with 18% increase in deal value</p>
            </div>
          </div>
          <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
            View Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectorDealFlow;