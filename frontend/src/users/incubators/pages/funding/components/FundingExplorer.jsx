import React, { useState } from 'react';

const FundingExplorer = () => {
  const [activeCategory, setActiveCategory] = useState('private');
  const [filters, setFilters] = useState({
    fundingType: '',
    domain: '',
    grantSize: '',
    eligibilityLevel: ''
  });

  // Mock data for private investors
  const privateInvestors = [
    {
      id: 1,
      name: 'VentureCap Partners',
      logo: 'VC',
      description: 'Early-stage venture capital firm focusing on tech startups',
      matchScore: 92,
      eligibility: 'Series A, B',
      amount: '$2M - $10M',
      deadline: 'Rolling',
      tags: ['New']
    },
    {
      id: 2,
      name: 'TechGrowth Fund',
      logo: 'TG',
      description: 'Growth equity fund for scaling technology companies',
      matchScore: 87,
      eligibility: 'Series B, C',
      amount: '$5M - $25M',
      deadline: 'Quarterly',
      tags: ['Urgent']
    },
    {
      id: 3,
      name: 'Innovation Ventures',
      logo: 'IV',
      description: 'Corporate venture arm investing in disruptive technologies',
      matchScore: 78,
      eligibility: 'Pre-seed to Series A',
      amount: '$500K - $3M',
      deadline: 'Monthly',
      tags: []
    }
  ];

  // Mock data for CSR funds
  const csrFunds = [
    {
      id: 1,
      name: 'GreenFuture CSR',
      logo: 'GF',
      description: 'Sustainability-focused corporate social responsibility fund',
      matchScore: 95,
      eligibility: 'Environmental startups',
      amount: '$100K - $1M',
      deadline: 'Dec 15, 2023',
      tags: ['Urgent']
    },
    {
      id: 2,
      name: 'CommunityImpact Fund',
      logo: 'CI',
      description: 'Social impact fund supporting community-driven initiatives',
      matchScore: 88,
      eligibility: 'Non-profit, Social enterprises',
      amount: '$50K - $500K',
      deadline: 'Nov 30, 2023',
      tags: ['New']
    }
  ];

  // Mock data for foundation grants
  const foundationGrants = [
    {
      id: 1,
      name: 'Bill & Melinda Gates Foundation',
      logo: 'BMG',
      description: 'Global health and development foundation grants',
      matchScore: 91,
      eligibility: 'Health, Education, Agriculture',
      amount: '$1M - $10M',
      deadline: 'Rolling',
      tags: []
    },
    {
      id: 2,
      name: 'Ford Foundation',
      logo: 'FF',
      description: 'Social justice and equality advancement grants',
      matchScore: 85,
      eligibility: 'Social impact organizations',
      amount: '$250K - $2M',
      deadline: 'Mar 1, 2024',
      tags: ['Urgent']
    }
  ];

  // Mock data for global innovation grants
  const globalGrants = [
    {
      id: 1,
      name: 'EU Horizon Europe',
      logo: 'EU',
      description: 'European Union research and innovation funding program',
      matchScore: 89,
      eligibility: 'Research institutions, Tech startups',
      amount: '€100K - €5M',
      deadline: 'Ongoing',
      tags: ['New']
    },
    {
      id: 2,
      name: 'Google for Startups',
      logo: 'GFS',
      description: 'Google-supported startup acceleration grants',
      matchScore: 93,
      eligibility: 'AI, Cloud, Sustainability',
      amount: '$50K - $1M',
      deadline: 'Quarterly',
      tags: []
    }
  ];

  // Get current data based on active category
  const getCurrentData = () => {
    switch (activeCategory) {
      case 'private': return privateInvestors;
      case 'csr': return csrFunds;
      case 'foundation': return foundationGrants;
      case 'global': return globalGrants;
      default: return privateInvestors;
    }
  };

  const currentData = getCurrentData();

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Funding Opportunities Explorer</h1>
            <p className="text-gray-600">Discover funding opportunities tailored to your startup</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Funding Type</label>
            <select 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              value={filters.fundingType}
              onChange={(e) => handleFilterChange('fundingType', e.target.value)}
            >
              <option value="">All Types</option>
              <option value="venture">Venture Capital</option>
              <option value="angel">Angel Investment</option>
              <option value="grant">Grants</option>
              <option value="loan">Loans</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
            <select 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              value={filters.domain}
              onChange={(e) => handleFilterChange('domain', e.target.value)}
            >
              <option value="">All Domains</option>
              <option value="tech">Technology</option>
              <option value="health">Healthcare</option>
              <option value="finance">Fintech</option>
              <option value="sustainability">Sustainability</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grant Size</label>
            <select 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              value={filters.grantSize}
              onChange={(e) => handleFilterChange('grantSize', e.target.value)}
            >
              <option value="">Any Size</option>
              <option value="small">Under $100K</option>
              <option value="medium">$100K - $1M</option>
              <option value="large">Over $1M</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility Level</label>
            <select 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              value={filters.eligibilityLevel}
              onChange={(e) => handleFilterChange('eligibilityLevel', e.target.value)}
            >
              <option value="">All Levels</option>
              <option value="preseed">Pre-seed</option>
              <option value="seed">Seed</option>
              <option value="seriesa">Series A</option>
              <option value="seriesb">Series B</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeCategory === 'private'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveCategory('private')}
        >
          Private Investors
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeCategory === 'csr'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveCategory('csr')}
        >
          CSR Funds
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeCategory === 'foundation'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveCategory('foundation')}
        >
          Foundation Grants
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeCategory === 'global'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveCategory('global')}
        >
          Global Innovation Grants
        </button>
      </div>

      {/* Funding Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentData.map((funder) => (
          <div key={funder.id} className="bg-white rounded-2xl shadow-lg border border-[#FFF2DC] p-5 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#FFF9F0] flex items-center justify-center text-[#FF6A00] font-bold">
                {funder.logo}
              </div>
              <div className="flex space-x-2">
                {funder.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      tag === 'Urgent' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
                <div className="bg-[#FF6A00] text-white text-xs font-bold px-2 py-1 rounded-full">
                  {funder.matchScore}%
                </div>
              </div>
            </div>
            
            <h3 className="font-bold text-gray-800 text-lg mb-2">{funder.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{funder.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Eligibility:</span>
                <span className="font-medium">{funder.eligibility}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Amount:</span>
                <span className="font-medium">{funder.amount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Deadline:</span>
                <span className="font-medium">{funder.deadline}</span>
              </div>
            </div>
            
            <button className="w-full bg-[#FF6A00] text-white py-2 rounded-lg font-medium hover:bg-[#e05d00] transition-colors">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundingExplorer;