import React, { useState } from 'react';

const InternationalFunding = () => {
  const [filters, setFilters] = useState({
    country: 'all',
    fundingType: 'all'
  });

  const grants = [
    {
      id: 1,
      agency: 'Horizon Europe',
      country: 'EU',
      title: 'European Research Grant',
      type: 'Research Grant',
      description: 'Funding for collaborative research projects across European countries',
      amount: '€2.5 Million',
      deadline: 'Apr 15, 2026',
      link: '#'
    },
    {
      id: 2,
      agency: 'NSF',
      country: 'US',
      title: 'Advanced Technology Research',
      type: 'Research Grant',
      description: 'Support for fundamental research in science and engineering',
      amount: '$500,000',
      deadline: 'May 30, 2026',
      link: '#'
    },
    {
      id: 3,
      agency: 'NIH',
      country: 'US',
      title: 'Biomedical Research Grant',
      type: 'Biomedical Research',
      description: 'Funding for health-related research projects',
      amount: '$1 Million',
      deadline: 'Jun 15, 2026',
      link: '#'
    },
    {
      id: 4,
      agency: 'World Bank',
      country: 'Global',
      title: 'Sustainable Development Grant',
      type: 'Development',
      description: 'Funding for projects addressing global development challenges',
      amount: '$10 Million',
      deadline: 'Jul 30, 2026',
      link: '#'
    }
  ];

  const countries = ['All', 'EU', 'US', 'UK', 'Japan', 'Global'];
  const fundingTypes = ['All', 'Research', 'Prototype', 'Fellowship', 'Development'];

  const handleCompareGrants = () => {
    // Implementation for compare grants popup
    alert('Compare Grants feature would open a popup here');
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">🌍 International Funding Agencies</h2>
      
      {/* Filters */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country/Region</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
              value={filters.country}
              onChange={(e) => setFilters({...filters, country: e.target.value})}
            >
              {countries.map((country, index) => (
                <option key={index} value={country.toLowerCase()}>{country}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Funding Type</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
              value={filters.fundingType}
              onChange={(e) => setFilters({...filters, fundingType: e.target.value})}
            >
              {fundingTypes.map((type, index) => (
                <option key={index} value={type.toLowerCase()}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Grant Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {grants.map((grant) => (
          <div key={grant.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{grant.agency}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{grant.country}</span>
                  <span className="bg-[#FFF5EB] text-[#FF6A00] text-xs px-2 py-1 rounded">{grant.type}</span>
                </div>
              </div>
            </div>
            
            <h4 className="font-medium text-gray-800 mb-2">{grant.title}</h4>
            <p className="text-gray-600 text-sm mb-4">{grant.description}</p>
            
            <div className="flex justify-between items-center">
              <div className="text-lg font-bold text-[#FF6A00]">{grant.amount}</div>
              <div className="text-sm text-gray-500">Deadline: {grant.deadline}</div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button className="text-sm px-3 py-1 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors">
                Apply Now
              </button>
              <button className="text-sm px-3 py-1 border border-[#FF6A00] text-[#FF6A00] rounded-lg hover:bg-[#FFF5EB] transition-colors">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Compare Grants Button */}
      <div className="text-center">
        <button 
          onClick={handleCompareGrants}
          className="px-6 py-3 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors font-medium"
        >
          Compare Grants
        </button>
      </div>
    </div>
  );
};

export default InternationalFunding;