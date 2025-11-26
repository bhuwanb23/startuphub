import React, { useState } from 'react';

const FundingOpportunities = () => {
  const [filters, setFilters] = useState({
    sector: '',
    region: '',
    fundingType: '',
    minAmount: '',
    maxAmount: ''
  });

  const opportunities = [
    {
      id: 1,
      title: 'Clean Energy Innovation Grant',
      organization: 'Department of Energy',
      sector: 'Clean Energy',
      region: 'Global',
      type: 'Grant',
      amount: '$2M-$5M',
      deadline: '2025-12-15',
      impactScore: 92,
      eligibility: 'Pre-revenue startups with TRL 6+',
      description: 'Funding for innovative clean energy technologies with commercialization potential.'
    },
    {
      id: 2,
      title: 'AI for Healthcare Initiative',
      organization: 'National Health Institute',
      sector: 'Healthtech',
      region: 'North America',
      type: 'Mixed',
      amount: '$1M-$3M',
      deadline: '2025-11-30',
      impactScore: 88,
      eligibility: 'FDA-approved medical devices',
      description: 'Support for AI-driven healthcare solutions improving patient outcomes.'
    },
    {
      id: 3,
      title: 'Sustainable Agriculture Fund',
      organization: 'Ministry of Agriculture',
      sector: 'AgriTech',
      region: 'Europe',
      type: 'Equity',
      amount: '$5M-$15M',
      deadline: '2026-01-20',
      impactScore: 85,
      eligibility: 'Revenue-generating agri-tech companies',
      description: 'Investment in sustainable agriculture technologies increasing yield and reducing environmental impact.'
    },
    {
      id: 4,
      title: 'Smart Cities Development Program',
      organization: 'Urban Development Authority',
      sector: 'Smart Cities',
      region: 'Asia-Pacific',
      type: 'Grant',
      amount: '$3M-$8M',
      deadline: '2025-12-31',
      impactScore: 90,
      eligibility: 'Municipal government partnerships',
      description: 'Funding for smart city solutions improving urban infrastructure and quality of life.'
    },
    {
      id: 5,
      title: 'Ocean Conservation Initiative',
      organization: 'Marine Protection Agency',
      sector: 'Environment',
      region: 'Global',
      type: 'Mixed',
      amount: '$1M-$4M',
      deadline: '2026-02-15',
      impactScore: 94,
      eligibility: 'Non-profit organizations and social enterprises',
      description: 'Support for innovative ocean conservation technologies and initiatives.'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      sector: '',
      region: '',
      fundingType: '',
      minAmount: '',
      maxAmount: ''
    });
  };

  const filteredOpportunities = opportunities.filter(opp => {
    return (
      (filters.sector === '' || opp.sector.includes(filters.sector)) &&
      (filters.region === '' || opp.region.includes(filters.region)) &&
      (filters.fundingType === '' || opp.type.includes(filters.fundingType))
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Public-Private Funding Opportunities</h2>
        <p className="text-gray-600">Explore collaborative funding programs from government and private organizations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 p-6 h-fit">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Filters</h3>
            <button 
              onClick={resetFilters}
              className="text-sm text-[#FF6A00] hover:text-[#e05500]"
            >
              Reset
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
              <select
                name="sector"
                value={filters.sector}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              >
                <option value="">All Sectors</option>
                <option value="Clean Energy">Clean Energy</option>
                <option value="Healthtech">Healthtech</option>
                <option value="AgriTech">AgriTech</option>
                <option value="Smart Cities">Smart Cities</option>
                <option value="Environment">Environment</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                name="region"
                value={filters.region}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              >
                <option value="">All Regions</option>
                <option value="Global">Global</option>
                <option value="North America">North America</option>
                <option value="Europe">Europe</option>
                <option value="Asia-Pacific">Asia-Pacific</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Funding Type</label>
              <select
                name="fundingType"
                value={filters.fundingType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              >
                <option value="">All Types</option>
                <option value="Grant">Grant</option>
                <option value="Equity">Equity</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grant Size</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="minAmount"
                  placeholder="Min"
                  value={filters.minAmount}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
                />
                <input
                  type="text"
                  name="maxAmount"
                  placeholder="Max"
                  value={filters.maxAmount}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Funding Opportunity Cards */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-6">
            {filteredOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-800 text-lg">{opportunity.title}</h3>
                  <div className="flex items-center bg-orange-100 px-2 py-1 rounded">
                    <span className="text-orange-500 mr-1">⭐</span>
                    <span className="text-xs font-bold text-gray-800">{opportunity.impactScore}</span>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="text-gray-600">{opportunity.organization}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                    {opportunity.sector}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{opportunity.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500">Funding Type</div>
                    <div className="font-medium text-gray-800">{opportunity.type}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Amount</div>
                    <div className="font-medium text-[#FF6A00]">{opportunity.amount}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Deadline</div>
                    <div className="font-medium text-gray-800">{opportunity.deadline}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Region</div>
                    <div className="font-medium text-gray-800">{opportunity.region}</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-gray-600">Eligibility: </span>
                    <span className="font-medium text-gray-800">{opportunity.eligibility}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                      Apply Now
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm">
                      Save Opportunity
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingOpportunities;