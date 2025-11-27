import React, { useState } from 'react';

const Filters = ({ filters, onFilterChange }) => {
  const [expandedCategories, setExpandedCategories] = useState({
    domain: true,
    stage: true,
    techStack: true,
    problemType: true,
    location: true,
    traction: true
  });

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const filterCategories = [
    {
      id: 'domain',
      name: 'Domain Expertise',
      options: ['AI', 'Healthcare', 'FinTech', 'Clean Energy', 'E-commerce', 'EdTech']
    },
    {
      id: 'stage',
      name: 'Startup Stage',
      options: ['Idea', 'Pre-seed', 'Seed', 'Series A', 'Series B', 'Growth']
    },
    {
      id: 'techStack',
      name: 'Tech Stack Tags',
      options: ['React', 'Node.js', 'Python', 'AI/ML', 'Blockchain', 'Mobile']
    },
    {
      id: 'problemType',
      name: 'Problem Type',
      options: ['B2B', 'B2C', 'Marketplace', 'SaaS', 'Hardware', 'Social Impact']
    },
    {
      id: 'location',
      name: 'Location / Geography',
      options: ['Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Chennai', 'Pune']
    },
    {
      id: 'traction',
      name: 'Revenue / Traction Level',
      options: ['Pre-revenue', '< $10K', '$10K - $100K', '$100K - $1M', '$1M+']
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        <button 
          onClick={() => onFilterChange({})}
          className="text-[#FF6A00] hover:text-[#FF8C42] text-sm font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {filterCategories.map((category) => (
          <div key={category.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <button
              onClick={() => toggleCategory(category.id)}
              className="flex justify-between items-center w-full text-left"
            >
              <h3 className="font-medium text-gray-800">{category.name}</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${expandedCategories[category.id] ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {expandedCategories[category.id] && (
              <div className="mt-3 space-y-2">
                {category.options.map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      id={`${category.id}-${option}`}
                      name={`${category.id}[]`}
                      type="checkbox"
                      checked={filters[category.id]?.includes(option) || false}
                      onChange={(e) => {
                        const currentFilters = filters[category.id] || [];
                        let newFilters;
                        
                        if (e.target.checked) {
                          newFilters = [...currentFilters, option];
                        } else {
                          newFilters = currentFilters.filter(item => item !== option);
                        }
                        
                        onFilterChange({
                          ...filters,
                          [category.id]: newFilters
                        });
                      }}
                      className="h-4 w-4 text-[#FF6A00] border-gray-300 rounded focus:ring-[#FF6A00]"
                    />
                    <label htmlFor={`${category.id}-${option}`} className="ml-2 text-gray-700 text-sm">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;