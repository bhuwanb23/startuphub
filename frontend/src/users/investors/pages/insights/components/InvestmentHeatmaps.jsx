import React, { useState } from 'react';

const InvestmentHeatmaps = () => {
  const [filters, setFilters] = useState({
    sector: 'All Sectors',
    geography: 'All Regions',
    stage: 'All Stages',
    dealSize: 'All Sizes'
  });

  const heatmapData = [
    { sector: 'AI/ML', geography: 'North America', stage: 'Series B', size: '$7.2B', growth: '+33%' },
    { sector: 'Climate Tech', geography: 'Europe', stage: 'Series A', size: '$4.8B', growth: '+42%' },
    { sector: 'FinTech', geography: 'Asia-Pacific', stage: 'Series C', size: '$9.1B', growth: '+28%' },
    { sector: 'HealthTech', geography: 'India', stage: 'Series B', size: '$3.5B', growth: '+51%' }
  ];

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">🔥 Investment Pattern Heatmaps</h2>
        <p className="text-gray-600">Interactive visualization of global investment trends</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
            value={filters.sector}
            onChange={(e) => handleFilterChange('sector', e.target.value)}
          >
            <option>All Sectors</option>
            <option>AI/ML</option>
            <option>Climate Tech</option>
            <option>FinTech</option>
            <option>HealthTech</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Geography</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
            value={filters.geography}
            onChange={(e) => handleFilterChange('geography', e.target.value)}
          >
            <option>All Regions</option>
            <option>North America</option>
            <option>Europe</option>
            <option>Asia-Pacific</option>
            <option>India</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Funding Stage</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
            value={filters.stage}
            onChange={(e) => handleFilterChange('stage', e.target.value)}
          >
            <option>All Stages</option>
            <option>Seed</option>
            <option>Series A</option>
            <option>Series B</option>
            <option>Series C</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deal Size</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
            value={filters.dealSize}
            onChange={(e) => handleFilterChange('dealSize', e.target.value)}
          >
            <option>All Sizes</option>
            <option>$1M - $10M</option>
            <option>$10M - $50M</option>
            <option>$50M+</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {heatmapData.map((data, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5EB] to-[#FFE9D7] opacity-30 rounded-lg"></div>
            <div className="relative">
              <div className="font-bold text-gray-800">{data.sector}</div>
              <div className="text-sm text-gray-600 mt-1">{data.geography}</div>
              <div className="flex justify-between mt-3">
                <div>
                  <div className="text-xs text-gray-600">Stage</div>
                  <div className="text-sm font-medium text-gray-800">{data.stage}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">Invested</div>
                  <div className="text-sm font-bold text-[#FF6A00]">{data.size}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">Growth</div>
                  <div className="text-sm font-bold text-[#FF6A00]">{data.growth}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentHeatmaps;