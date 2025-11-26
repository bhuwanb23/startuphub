import React, { useState } from 'react';

const GovernmentHub = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    domain: [],
    fundingType: [],
    readinessLevel: []
  });

  const ministries = [
    {
      id: 1,
      name: 'Ministry of Science & Technology',
      domain: 'Technology',
      opportunities: 12,
      funding: '$45M',
      status: 'Ongoing',
      description: 'Supporting innovation in emerging technologies and R&D initiatives'
    },
    {
      id: 2,
      name: 'Ministry of Health',
      domain: 'Healthcare',
      opportunities: 8,
      funding: '$32M',
      status: 'Eligible',
      description: 'Funding healthcare innovations and medical research projects'
    },
    {
      id: 3,
      name: 'Ministry of Energy',
      domain: 'Clean Energy',
      opportunities: 15,
      funding: '$68M',
      status: 'Pending',
      description: 'Promoting sustainable energy solutions and green technologies'
    },
    {
      id: 4,
      name: 'Ministry of Education',
      domain: 'EdTech',
      opportunities: 6,
      funding: '$18M',
      status: 'Ongoing',
      description: 'Supporting educational technology and learning innovations'
    },
    {
      id: 5,
      name: 'Ministry of Agriculture',
      domain: 'AgriTech',
      opportunities: 9,
      funding: '$24M',
      status: 'Eligible',
      description: 'Funding agricultural technology and food security projects'
    }
  ];

  const filterOptions = {
    domain: ['Technology', 'Healthcare', 'Clean Energy', 'EdTech', 'AgriTech', 'Fintech'],
    fundingType: ['Grants', 'Loans', 'Equity', 'Hybrid'],
    readinessLevel: ['TRL 1-3', 'TRL 4-6', 'TRL 7-9']
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ongoing': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Eligible': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => {
      const currentFilters = [...prev[category]];
      const index = currentFilters.indexOf(value);
      
      if (index > -1) {
        currentFilters.splice(index, 1);
      } else {
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
      domain: [],
      fundingType: [],
      readinessLevel: []
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Government Collaboration Hub</h2>
        <p className="text-gray-600">Explore partnership opportunities with government ministries</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">Filters</h3>
          <button 
            onClick={resetFilters}
            className="text-sm text-[#FF6A00] hover:text-[#e05500]"
          >
            Reset All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(filterOptions).map(([category, options]) => (
            <div key={category}>
              <h4 className="font-medium text-gray-700 mb-2 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</h4>
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
      </div>

      {/* Ministry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ministries.map((ministry) => (
          <div key={ministry.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{ministry.name}</h3>
                <div className="flex items-center mt-1">
                  <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                    {ministry.domain}
                  </span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${getStatusColor(ministry.status)}`}>
                {ministry.status}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mt-3">{ministry.description}</p>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <div>
                  <div className="text-gray-500">Opportunities</div>
                  <div className="font-medium text-gray-800">{ministry.opportunities}</div>
                </div>
                <div>
                  <div className="text-gray-500">Funding</div>
                  <div className="font-medium text-[#FF6A00]">{ministry.funding}</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all font-medium">
                Explore Opportunities
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovernmentHub;