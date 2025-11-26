import React, { useState } from 'react';

const FiltersPanel = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    sector: [],
    stage: [],
    geography: [],
    valuation: [],
    revenue: [],
    traction: []
  });

  const filterOptions = {
    sector: [
      'Fintech', 'HealthTech', 'Clean Energy', 'AI/ML', 'E-commerce', 
      'EdTech', 'Cybersecurity', 'FoodTech', 'PropTech', 'InsurTech'
    ],
    stage: [
      'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D+'
    ],
    geography: [
      'North America', 'Europe', 'Asia Pacific', 'Latin America', 
      'Middle East & Africa', 'Global'
    ],
    valuation: [
      '< $10M', '$10M - $25M', '$25M - $50M', '$50M - $100M', '> $100M'
    ],
    revenue: [
      '< $1M', '$1M - $5M', '$5M - $10M', '$10M - $25M', '> $25M'
    ],
    traction: [
      '< 1K Users', '1K - 10K Users', '10K - 100K Users', 
      '100K - 1M Users', '> 1M Users'
    ]
  };

  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => {
      const currentFilters = [...prev[category]];
      const index = currentFilters.indexOf(value);
      
      if (index > -1) {
        // Remove filter
        currentFilters.splice(index, 1);
      } else {
        // Add filter
        currentFilters.push(value);
      }
      
      return {
        ...prev,
        [category]: currentFilters
      };
    });
  };

  const resetFilters = () => {
    setSelectedFilters({
      sector: [],
      stage: [],
      geography: [],
      valuation: [],
      revenue: [],
      traction: []
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Smart Filters</h2>
        <button 
          onClick={resetFilters}
          className="text-xs text-[#FF6A00] hover:text-[#e05500]"
        >
          Reset All
        </button>
      </div>
      
      <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
        {Object.entries(filterOptions).map(([category, options]) => (
          <div key={category}>
            <h3 className="font-medium text-gray-700 mb-2 capitalize">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleFilter(category, option)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedFilters[category].includes(option)
                      ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full py-3 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all font-medium">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FiltersPanel;